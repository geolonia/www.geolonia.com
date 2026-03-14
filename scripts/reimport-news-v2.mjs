#!/usr/bin/env node
/**
 * Re-import news articles from www.geolonia.com (v2 - using turndown)
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import https from 'https';
import http from 'http';
import TurndownService from 'turndown';

const NEWS_DIR = 'src/content/news';
const IMG_DIR = 'public/images/news';
const BASE_URL = 'https://www.geolonia.com';
const DELAY_MS = 300;
const CONCURRENCY = 5;

mkdirSync(IMG_DIR, { recursive: true });

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location.startsWith('http') ? res.headers.location : BASE_URL + res.headers.location;
        return fetchUrl(loc).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function downloadImage(url, destPath) {
  const fullUrl = url.startsWith('http') ? url : BASE_URL + url;
  return new Promise((resolve, reject) => {
    const mod = fullUrl.startsWith('https') ? https : http;
    mod.get(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location.startsWith('http') ? res.headers.location : BASE_URL + res.headers.location;
        return downloadImage(loc, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${fullUrl}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => { writeFileSync(destPath, Buffer.concat(chunks)); resolve(); });
      res.on('error', reject);
    }).on('error', reject);
  });
}

function extractArticleData(html) {
  const titleMatch = html.match(/<h1[^>]*class="entry-title"[^>]*>([\s\S]*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  const dateMatch = html.match(/published">\s*(\d{4})年(\d{1,2})月(\d{1,2})日/);
  let pubDate = '';
  if (dateMatch) pubDate = `${dateMatch[1]}-${dateMatch[2].padStart(2, '0')}-${dateMatch[3].padStart(2, '0')}`;

  const catMatch = html.match(/entry-meta-data-list[\s\S]*?<dd><a[^>]*>(.*?)<\/a><\/dd>/);
  const category = catMatch ? catMatch[1].trim() : 'お知らせ';

  const bodyStart = html.indexOf('<div class="entry-body">');
  if (bodyStart === -1) return null;
  const bodySection = html.substring(bodyStart + 24);
  const entryFooter = bodySection.indexOf('<div class="entry-footer">');
  const articleEnd = bodySection.indexOf('</article>');
  const endIdx = entryFooter > 0 ? entryFooter : articleEnd;
  let bodyHtml = bodySection.substring(0, endIdx).trim().replace(/\s*<\/div>\s*$/, '');

  return { title, pubDate, category, bodyHtml };
}

function convertHtml(bodyHtml, slug) {
  const images = [];
  let imgIndex = 0;

  // Pre-process: rewrite image srcs to local paths and collect for download
  let processed = bodyHtml.replace(
    /<img[^>]*\ssrc="([^"]*)"[^>]*>/g,
    (match, src) => {
      // Use original (non-resized) image
      const origSrc = src.replace(/-\d+x\d+(?=\.\w+$)/, '');
      imgIndex++;
      const ext = origSrc.match(/\.\w+$/)?.[0] || '.png';
      const imgFilename = `${slug}-${imgIndex}${ext}`;
      images.push({ src: origSrc, filename: imgFilename });
      // Rewrite img tag with local src and preserve alt
      const altMatch = match.match(/alt="([^"]*)"/);
      const alt = altMatch ? altMatch[1] : '';
      return `<img src="/images/news/${imgFilename}" alt="${alt}" />`;
    }
  );

  // Don't remove divs or decode &lt;/&gt; before turndown - it handles them correctly
  // Only decode &amp; for proper text display and escape literal > to prevent blockquotes
  processed = processed.replace(/&amp;/g, '&');
  processed = processed.replace(/<p>>\s*/g, '<p>＞');

  // Configure turndown
  const td = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    hr: '---',
    strongDelimiter: '**',
    emDelimiter: '*',
  });

  // Custom rule for figures - just pass through the img
  td.addRule('figure', {
    filter: 'figure',
    replacement: (content) => '\n\n' + content.trim() + '\n\n',
  });

  // Custom rule for figcaption
  td.addRule('figcaption', {
    filter: 'figcaption',
    replacement: (content) => '\n*' + content.trim() + '*\n',
  });

  // Custom table rule for wp-block-table
  td.addRule('table', {
    filter: 'table',
    replacement: (content, node) => {
      const rows = [];
      const trs = node.querySelectorAll ? [] : []; // turndown uses a simple DOM
      // Fallback: extract from the HTML string
      const tableHtml = node.outerHTML || '';
      const rowMatches = tableHtml.match(/<tr>([\s\S]*?)<\/tr>/g) || [];
      for (const row of rowMatches) {
        const cells = [];
        const cellMatches = row.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g) || [];
        for (const cell of cellMatches) {
          const cellContent = cell.replace(/<\/?t[dh][^>]*>/g, '').replace(/<[^>]+>/g, '').trim();
          cells.push(cellContent);
        }
        rows.push(cells);
      }
      if (rows.length === 0) return content;
      const maxCols = Math.max(...rows.map(r => r.length));
      let table = '\n\n| ' + rows[0].join(' | ') + ' |\n';
      table += '| ' + Array(maxCols).fill('---').join(' | ') + ' |\n';
      for (let i = 1; i < rows.length; i++) {
        // Pad rows with fewer cells
        while (rows[i].length < maxCols) rows[i].push('');
        table += '| ' + rows[i].join(' | ') + ' |\n';
      }
      return table + '\n';
    },
  });

  let markdown = td.turndown(processed);

  // Post-process cleanup
  // Fix bold markers with trailing spaces: **text ** → **text**
  // Use [^*\n] to prevent matching across newlines
  markdown = markdown.replace(/\*\*([^*\n]+?) +\*\*/g, '**$1**');
  // Fix empty bold
  markdown = markdown.replace(/\*\*\s*\*\*/g, '');
  // Unescape square brackets (turndown escapes them)
  markdown = markdown.replace(/\\\[/g, '[');
  markdown = markdown.replace(/\\\]/g, ']');
  // Fix list items missing space: -**text → - **text
  markdown = markdown.replace(/^-\*\*/gm, '- **');
  // Fix headings missing space before content: ###**text → ### **text
  markdown = markdown.replace(/^(#{1,6})\*\*/gm, '$1 **');
  // Fix numbered list with escaped dot: 1\. → 1.
  markdown = markdown.replace(/^(\d+)\\\./gm, '$1.');
  // Clean up excessive newlines
  markdown = markdown.replace(/\n{3,}/g, '\n\n');
  markdown = markdown.trim();

  return { markdown, images };
}

async function main() {
  const existingFiles = readdirSync(NEWS_DIR).filter(f => f.endsWith('.md'));
  console.log(`Found ${existingFiles.length} existing news files`);

  const urlFile = readFileSync('/tmp/all-article-urls.txt', 'utf-8');
  const archiveIds = urlFile.match(/\d+/g);
  console.log(`Found ${archiveIds.length} archive IDs`);

  // Group existing files by date
  const dateToFiles = {};
  for (const file of existingFiles) {
    const date = file.substring(0, 10);
    if (!dateToFiles[date]) dateToFiles[date] = [];
    dateToFiles[date].push(file);
  }

  let processed = 0, updated = 0;
  const errors = [];

  for (let i = 0; i < archiveIds.length; i += CONCURRENCY) {
    const batch = archiveIds.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map(async (id) => {
      try {
        const res = await fetchUrl(`${BASE_URL}/archives/${id}/`);
        if (res.status !== 200) return { id, error: `HTTP ${res.status}` };
        const html = res.body.toString('utf-8');
        const data = extractArticleData(html);
        if (!data || !data.pubDate || !data.title) return { id, error: 'no data' };
        return { id, data };
      } catch (e) { return { id, error: e.message }; }
    }));

    for (const result of results) {
      processed++;
      if (result.error) { errors.push(`${result.id}: ${result.error}`); continue; }

      const { id, data } = result;
      const candidates = dateToFiles[data.pubDate];
      if (!candidates || candidates.length === 0) {
        errors.push(`${id}: no file for ${data.pubDate}`);
        continue;
      }

      // Match file
      let matchFile;
      if (candidates.length === 1) {
        matchFile = candidates[0];
      } else {
        matchFile = candidates.find(f => {
          const existing = readFileSync(join(NEWS_DIR, f), 'utf-8');
          const tm = existing.match(/title:\s*"([^"]*)"/);
          if (!tm) return false;
          return tm[1] === data.title || tm[1].includes(data.title.substring(0, 10)) || data.title.includes(tm[1].substring(0, 10));
        }) || candidates[0];
      }

      const slug = matchFile.replace('.md', '');
      const { markdown, images } = convertHtml(data.bodyHtml, slug);

      // Download images
      for (const img of images) {
        const destPath = join(IMG_DIR, img.filename);
        if (!existsSync(destPath)) {
          try {
            await downloadImage(img.src, destPath);
            console.log(`  IMG: ${img.filename}`);
          } catch (e) {
            console.error(`  IMG FAIL: ${img.src} - ${e.message}`);
          }
        }
      }

      // Read existing description
      const existingContent = readFileSync(join(NEWS_DIR, matchFile), 'utf-8');
      const existingDesc = existingContent.match(/description:\s*"([^"]*)"/)?.[1] || data.title;

      const escapedTitle = data.title.replace(/"/g, '\\"');
      const escapedDesc = existingDesc.replace(/"/g, '\\"');
      const cat = data.category === 'ニュースリリース' ? 'ニュースリリース' : 'お知らせ';

      const content = `---
title: "${escapedTitle}"
description: "${escapedDesc}"
pubDate: ${data.pubDate}
category: "${cat}"
---

${markdown}
`;

      writeFileSync(join(NEWS_DIR, matchFile), content);
      updated++;
      console.log(`[${processed}/${archiveIds.length}] ${matchFile}`);

      const idx = candidates.indexOf(matchFile);
      if (idx > -1) candidates.splice(idx, 1);
    }

    await sleep(DELAY_MS);
  }

  console.log(`\nDone: ${updated} updated, ${errors.length} errors`);
  if (errors.length) errors.forEach(e => console.log(`  ${e}`));
}

main().catch(console.error);
