<script setup lang="ts">
import { SITE_CONFIG } from '../../config'
import HeaderLink from './HeaderLink.vue'
import { SearchBar } from '../SearchBar'

// 接收文章数据用于搜索
interface Post {
  slug: string
  data: {
    title: string
    description: string
    tags: string[]
  }
}

interface Props {
  currentPath?: string
  posts?: Post[]
}

const props = defineProps<Props>()
</script>

<template>
  <!-- 页头导航 -->
  <header class="border-b border-neutral-200 bg-white">
    <nav class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
      <a
        href="/"
        class="text-xl font-bold text-neutral-900 transition-colors hover:text-neutral-600"
      >
        {{ SITE_CONFIG.title }}
      </a>
      
      <!-- 中间区域：导航链接 + 搜索框 -->
      <div class="flex flex-1 items-center justify-end gap-6">
        <ul class="flex gap-6 text-sm">
          <li v-for="item in SITE_CONFIG.nav" :key="item.href">
            <HeaderLink :href="item.href" :currentPath="props.currentPath">
              {{ item.name }}
            </HeaderLink>
          </li>
        </ul>
        
        <!-- 搜索框 -->
        <SearchBar v-if="posts" :posts="posts" client:load />
      </div>
    </nav>
  </header>
</template>


