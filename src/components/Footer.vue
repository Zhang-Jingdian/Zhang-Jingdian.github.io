<template>
  <footer>
    &copy; {{ currentYear }} {{ AUTHOR_NAME }}. {{ COPYRIGHT_TEXT }}
    <div class="social-links">
      <a
        v-for="link in SOCIAL_LINKS"
        :key="link.name"
        :href="link.url"
        target="_blank"
      >
        <span class="sr-only">{{ link.srText }}</span>
        <Icon :icon="link.icon" class="size-8" />
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import {
    AUTHOR_NAME,
    COPYRIGHT_TEXT,
    SOCIAL_LINKS,
} from "../consts";

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