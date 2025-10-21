<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TagVariants } from '.'
import { cn } from '@/lib/utils'
import { tagVariants } from '.'

interface Props {
  variant?: TagVariants['variant']
  interactive?: TagVariants['interactive']
  href?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  interactive: true,
})

// 根据是否有 href 决定使用 a 还是 span
const component = props.interactive && props.href ? 'a' : 'span'
</script>

<template>
  <component
    :is="component"
    :href="href"
    :class="cn(tagVariants({ variant, interactive }), props.class)"
  >
    <slot />
  </component>
</template>
