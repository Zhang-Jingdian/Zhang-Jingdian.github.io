<template>
  <div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
    <Dock direction="bottom">
    <DockIcon>
      <Icon
        icon="mdi:github"
        class="size-full"
      />
    </DockIcon>
    <DockSeparator />
    <DockIcon>
      <Icon
        icon="logos:google-drive"
        class="size-full"
      />
    </DockIcon>
    <DockIcon>
      <Icon
        icon="logos:notion-icon"
        class="size-full"
      />
    </DockIcon>
    <DockIcon>
      <Icon
        icon="logos:whatsapp-icon"
        class="size-full"
      />
    </DockIcon>
  </Dock>
  </div>
</template>

<script setup lang="ts">
import { Dock, DockIcon, DockSeparator } from '@/components/ui/dock'
import { Icon } from '@iconify/vue'
</script>