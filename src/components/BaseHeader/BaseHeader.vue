<script setup lang="ts">
import { SITE_CONFIG } from '../../config';
import HeaderLink from './HeaderLink.vue';

// 接收从 Astro 传入的当前路径
interface Props {
	currentPath?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <!-- 页头导航 -->
  <header class="border-b border-neutral-200 bg-white">
    <nav class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
      <a 
        href="/" 
        class="text-xl font-bold text-neutral-900 transition-colors hover:text-neutral-600"
      >
        {{ SITE_CONFIG.title }}
      </a>
      <ul class="flex gap-6 text-sm">
        <li v-for="item in SITE_CONFIG.nav" :key="item.href">
          <HeaderLink :href="item.href" :currentPath="props.currentPath">
            {{ item.name }}
          </HeaderLink>
        </li>
      </ul>
    </nav>
  </header>
</template>


