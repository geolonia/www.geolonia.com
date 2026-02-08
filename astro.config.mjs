import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { visit } from 'unist-util-visit';

// ステージング環境（GitHub Pages）用の設定
// 本番環境（www.geolonia.com）では base を設定しない
const isStaging = process.env.STAGING === 'true';
const base = isStaging ? '/www.geolonia.com' : '';

// マークダウン内の画像とリンクパスにbaseパスを追加し、画像を最適化するrehypeプラグイン
function rehypeAddBasePath() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // 画像のsrc属性を処理
      if (node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src;
        if (typeof src === 'string' && src.startsWith('/images/')) {
          node.properties.src = base + src;
        }
        // 遅延読み込みを追加（loading属性が未設定の場合）
        if (!node.properties.loading) {
          node.properties.loading = 'lazy';
        }
        // デコード最適化
        if (!node.properties.decoding) {
          node.properties.decoding = 'async';
        }
      }

      // リンクのhref属性を処理（内部リンクのみ）
      if (node.tagName === 'a' && node.properties?.href) {
        const href = node.properties.href;
        // 内部リンク（/で始まり、http(s)://で始まらない）のみ処理
        if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
          node.properties.href = base + href;
        }
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: isStaging
    ? 'https://geolonia.github.io'
    : 'https://www.geolonia.com',
  base: isStaging ? '/www.geolonia.com/' : '/',
  server: {
    port: 8080,
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
    rehypePlugins: [rehypeAddBasePath],
  },
  // HTML圧縮を有効化
  compressHTML: true,
  build: {
    // インラインスタイルシートも圧縮
    inlineStylesheets: 'auto',
  },
});
