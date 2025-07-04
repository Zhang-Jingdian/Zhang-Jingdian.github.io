<template>
    <div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <Dock direction="bottom">
            <!-- 内部导航链接 -->
            <HeaderLink v-for="link in DOCK_LINKS" :key="link.to" :to="link.to">
                <DockIcon>
                    <Icon :icon="link.icon" class="size-full" />
                    <span class="sr-only">{{ link.label }}</span>
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
                <DockIcon>
                    <Icon :icon="link.icon" class="size-full" />
                    <span class="sr-only">{{ link.name }}</span>
                </DockIcon>
            </a>
        </Dock>
    </div>
</template>

<script setup lang="ts">
import { Dock, DockIcon, DockSeparator } from "@/components/ui/dock";
import { Icon } from "@iconify/vue";
import HeaderLink from "./HeaderLink.vue";
import { DOCK_LINKS, SOCIAL_LINKS } from "../consts";
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