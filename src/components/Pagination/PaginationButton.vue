<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PaginationButtonVariants } from '.'
import { cn } from '@/lib/utils'
import { paginationButtonVariants } from '.'

interface Props {
  variant?: PaginationButtonVariants['variant']
  href?: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  disabled: false,
})

// 根据 disabled 和 href 决定使用的元素
const component = props.disabled ? 'span' : props.href ? 'a' : 'button'
const finalVariant = props.disabled ? 'disabled' : props.variant
</script>

<template>
  <component
    :is="component"
    :href="!disabled && href ? href : undefined"
    :disabled="component === 'button' && disabled"
    :class="cn(paginationButtonVariants({ variant: finalVariant }), props.class)"
  >
    <slot />
  </component>
</template>
