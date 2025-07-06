<template>
  <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
    <DockComponent class="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
      <DockIcon v-for="link in DOCK_LINKS" :key="link.to">
        <a :href="link.to" class="flex items-center justify-center w-full h-full text-white hover:text-blue-400 transition-colors">
          <Icon :icon="link.icon" class="size-6" />
        </a>
      </DockIcon>
    </DockComponent>
  </div>
</template>

<script setup lang="ts">
import { Dock as DockComponent, DockIcon } from "@/components/ui/dock";
import { Icon } from '@iconify/vue';
import { DOCK_LINKS } from "@/consts";
</script> 