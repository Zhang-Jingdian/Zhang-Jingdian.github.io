<template>
  <div class="flex items-center justify-center text-xl">
    <span class="hidden md:block">Move your mouse around</span>
    <span class="block md:hidden">Tap anywhere to see the cursor</span>
      <SmoothCursor />
  </div>
</template>
<script setup lang="ts">
import { SmoothCursor } from '@/components/ui/smooth-cursor';
</script>
