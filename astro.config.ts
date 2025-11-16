import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import sitemap from '@astrojs/sitemap'

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // 生产环境的站点 URL
  site: 'https://zhang-jingdian.github.io',
  // GitHub Pages 部署时需要设置 base（如果仓库名不是 username.github.io）
  // base: '/blog',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [vue(), sitemap(), mdx()],
})