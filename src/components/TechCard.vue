<template>
  <div class="flex items-center justify-center rounded-lg border bg-background text-foreground p-4 mx-4 w-48 h-24 transition-colors duration-200">
    <Icon :icon="icon" class="size-10" />
    <p class="ml-4 text-lg font-semibold">{{ name }}</p>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  icon: string;
  name: string;
}>();
</script> 