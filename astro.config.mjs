import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// ステージング環境（GitHub Pages）用の設定
// 本番環境（www.geolonia.com）では base を設定しない
const isStaging = process.env.STAGING === 'true';

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
  },
});
