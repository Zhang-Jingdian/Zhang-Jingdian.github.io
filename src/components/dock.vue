<template>
  <div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
    <Dock direction="bottom">
      <HeaderLink to="/">
        <DockIcon>
          <Icon
            icon="mdi:home"
            class="size-full"
          />
          <span class="sr-only">首页</span>
        </DockIcon>
      </HeaderLink>

      <HeaderLink to="/blog">
        <DockIcon>
          <Icon
            icon="mdi:book-open-page-variant"
            class="size-full"
          />
          <span class="sr-only">博客</span>
        </DockIcon>
      </HeaderLink>

      <HeaderLink to="/about">
        <DockIcon>
          <Icon
            icon="mdi:account"
            class="size-full"
          />
          <span class="sr-only">关于</span>
        </DockIcon>
      </HeaderLink>

      <DockSeparator />

      <a href="https://github.com/withastro/astro" target="_blank" rel="noopener">
        <DockIcon>
          <Icon
            icon="mdi:github"
            class="size-full"
          />
          <span class="sr-only">GitHub</span>
        </DockIcon>
      </a>

      <a href="https://twitter.com/astrodotbuild" target="_blank" rel="noopener">
        <DockIcon>
          <Icon
            icon="mdi:twitter"
            class="size-full"
          />
          <span class="sr-only">Twitter</span>
        </DockIcon>
      </a>

      <a href="https://m.webtoo.ls/@astro" target="_blank" rel="noopener">
        <DockIcon>
          <Icon
            icon="mdi:mastodon"
            class="size-full"
          />
          <span class="sr-only">Mastodon</span>
        </DockIcon>
      </a>
    </Dock>
  </div>
</template>

<script setup lang="ts">
import { Dock, DockIcon, DockSeparator } from '@/components/ui/dock'
import { Icon } from '@iconify/vue'
import HeaderLink from './HeaderLink.vue'
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