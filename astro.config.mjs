// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // 开发环境 URL，部署时需要改为你的实际网站 URL
  integrations: [vue(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});