<template>
  <div
      class="fixed inset-x-0 bottom-4 z-50"
      style="
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
      "
  >
      <div style="pointer-events: auto">
          <Dock
              class="bg-background/80 text-foreground backdrop-blur-md"
              direction="bottom"
          >
              <!-- 内部导航链接 -->
              <HeaderLink v-for="link in DOCK_LINKS" :key="link.to" :to="link.to">
                  <DockIcon :tooltip="link.label">
                      <Icon :icon="link.icon" class="size-full" />
                  </DockIcon>
              </HeaderLink>

              <DockSeparator />

              <!-- 社交媒体链接 -->
              <a
                  v-for="link in SOCIAL_LINKS"
                  :key="link.name"
                  :href="link.url"
                  target="_blank"
                  rel="noopener"
              >
                  <DockIcon :tooltip="link.srText">
                      <Icon :icon="link.icon" class="size-full" />
                  </DockIcon>
              </a>

              <DockSeparator />

              <!-- 主题切换按钮 -->
              <DockIcon
                  tooltip="切换主题"
                  @click="themeToggleRef?.toggleTheme()"
              >
                  <ThemeToggle ref="themeToggleRef"/>
              </DockIcon>
          </Dock>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Dock,
  DockIcon,
  DockSeparator,
} from "@/components/ui/dock/index";
import { Icon } from "@iconify/vue";
import HeaderLink from "./HeaderLink.vue";
import ThemeToggle from './ThemeToggle.vue';
import { DOCK_LINKS, SOCIAL_LINKS } from "@/consts";

const themeToggleRef = ref<InstanceType<typeof ThemeToggle> | null>(null);

</script>

<style scoped>
.sr-only {
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip: rect(0, 0, 0, 0);
white-space: nowrap;
border-width: 0;
}
</style>