<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

interface Props {
  href: string
  class?: string
  currentPath?: string // 从服务器端传入的当前路径
}

const props = defineProps<Props>()

// HeaderLink 样式变体
const navLinkVariants = cva(
  'inline-block rounded-sm px-2 py-1 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2',
  {
    variants: {
      active: {
        true: 'font-semibold text-neutral-900 underline decoration-2 underline-offset-4',
        false: 'text-neutral-600 hover:text-neutral-900',
      },
    },
  }
)

// 使用服务器传入的路径或客户端的路径（保证 SSR 和客户端一致）
const isActive = computed(() => {
  // 优先使用从服务器传入的 currentPath
  const pathname =
    props.currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/')

  // 首页精确匹配
  if (props.href === '/') {
    return pathname === '/'
  }

  // 其他页面匹配
  return pathname === props.href || pathname.startsWith(props.href + '/')
})
</script>

<template>
  <a :href="href" :class="cn(navLinkVariants({ active: isActive }), props.class)">
    <slot />
  </a>
</template>
