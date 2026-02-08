import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { visit } from 'unist-util-visit';

// ステージング環境（GitHub Pages）用の設定
// 本番環境（www.geolonia.com）では base を設定しない
const isStaging = process.env.STAGING === 'true';
const base = isStaging ? '/www.geolonia.com' : '';

// マークダウン内の画像パスにbaseパスを追加するrehypeプラグイン
function rehypeAddBasePath() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src;
        if (typeof src === 'string' && src.startsWith('/images/')) {
          node.properties.src = base + src;
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
});
