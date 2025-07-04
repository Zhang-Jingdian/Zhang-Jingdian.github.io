<template>
    <div class="fixed inset-0 -z-10 grid place-content-center">
      <InteractiveGridPattern
        :width="40"
        :height="40"
        :squares="[100, 100]"
        squares-class-name="hover:fill-blue-500"
      />
    </div>
  </template>

<script setup lang="ts">
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
</script>