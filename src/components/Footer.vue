<template>
  <footer>
    &copy; {{ currentYear }} Your name here. All rights reserved.
    <div class="social-links">
      <a href="https://m.webtoo.ls/@astro" target="_blank">
        <span class="sr-only">Follow Astro on Mastodon</span>
        <Icon icon="mdi:mastodon" class="size-8" />
      </a>
      <a href="https://twitter.com/astrodotbuild" target="_blank">
        <span class="sr-only">Follow Astro on Twitter</span>
        <Icon icon="mdi:twitter" class="size-8" />
      </a>
      <a href="https://github.com/withastro/astro" target="_blank">
        <span class="sr-only">Go to Astro's GitHub repo</span>
        <Icon icon="mdi:github" class="size-8" />
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
footer {
  padding: 2em 1em 6em 1em;
  background: linear-gradient(var(--gray-gradient)) no-repeat;
  color: rgb(var(--gray));
  text-align: center;
}
.social-links {
  display: flex;
  justify-content: center;
  gap: 1em;
  margin-top: 1em;
}
.social-links a {
  text-decoration: none;
  color: rgb(var(--gray));
}
.social-links a:hover {
  color: rgb(var(--gray-dark));
}
</style> 