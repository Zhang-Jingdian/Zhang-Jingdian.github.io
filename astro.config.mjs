// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://zhang-jingdian-github-io.vercel.app/',
  integrations: [vue(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});