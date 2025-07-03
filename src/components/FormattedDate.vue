<template>
  <time :datetime="date.toISOString()">
    {{ formattedDate }}
  </time>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  date: Date
}

const props = defineProps<Props>()

const formattedDate = computed(() => 
  props.date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
)
</script> 