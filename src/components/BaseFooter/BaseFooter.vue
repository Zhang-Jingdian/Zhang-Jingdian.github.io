<script setup lang="ts">
import { SITE_CONFIG } from '@/config';

// 计算当前年份
const currentYear = new Date().getFullYear();

// 判断是否有社交链接
const hasSocial = SITE_CONFIG.social.github || 
                  SITE_CONFIG.social.email;
</script>

<template>
  <!-- 页脚 -->
  <footer class="mt-16 border-t border-neutral-200 bg-neutral-50">
    <div class="mx-auto max-w-5xl px-4 py-8">
      <div class="flex flex-col items-center justify-between gap-4 text-sm text-neutral-600 md:flex-row">
        <!-- 版权信息 -->
        <p>
          &copy; {{ SITE_CONFIG.copyrightYear }}-{{ currentYear }} {{ SITE_CONFIG.author }}. 保留所有权利。
        </p>
        
        <!-- 社交链接（可选） -->
        <div v-if="hasSocial" class="flex gap-4">
          <a 
            v-if="SITE_CONFIG.social.github"
            :href="SITE_CONFIG.social.github"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors hover:text-neutral-900"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a 
            v-if="SITE_CONFIG.social.email"
            :href="`mailto:${SITE_CONFIG.social.email}`"
            class="transition-colors hover:text-neutral-900"
            aria-label="Email"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
