// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath, URL } from 'node:url';
// import compression from 'vite-plugin-compression';

import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://zhang-jingdian-github-io.vercel.app/',
  integrations: [vue(), mdx(), sitemap()],

  // 优化构建配置
  build: {
    // 内联小于 4KB 的资源
    inlineStylesheets: 'auto',
  },

  // 预取配置
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  vite: {
    plugins: [
      tailwindcss(),
      // 暂时移除压缩插件以避免主线程阻塞
      // compression({
      //   algorithm: 'gzip',
      //   ext: '.gz',
      //   threshold: 1024,
      //   deleteOriginFile: false,
      // }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 构建优化 - 简化配置
    build: {
      // 启用 CSS 代码分割
      cssCodeSplit: true,
      // 使用更快的压缩
      minify: 'esbuild',
      // 设置 chunk 大小警告限制
      chunkSizeWarningLimit: 1000,
    },
    // 开发服务器优化
    optimizeDeps: {
      // 预构建依赖
      force: true,
    },
  }
});