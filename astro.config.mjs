// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 生产环境的站点 URL
  site: 'https://zhang-jingdian-github-5drsehnc3-zjds-projects-6160e985.vercel.app',
  
  vite: {
      plugins: [tailwindcss()],
	},

  integrations: [vue(), sitemap()],
});