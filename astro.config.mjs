// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 生产环境的站点 URL（修改为你的实际域名）
  // 开发环境可以保持注释，部署前取消注释
  site: 'http://localhost:4321',
  
  vite: {
      plugins: [tailwindcss()],
	},

  integrations: [vue(), sitemap()],
});