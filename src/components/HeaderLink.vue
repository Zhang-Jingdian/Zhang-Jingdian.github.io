<template>
  <a
    :href="to"
    :class="['nav-link', { active: isActive }]"
    v-bind="$attrs"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

interface Props {
  to: string
}

const props = defineProps<Props>()
const currentPath = ref('')

onMounted(() => {
  const updatePath = () => {
    currentPath.value = window.location.pathname.replace(import.meta.env.BASE_URL, '')
  }
  updatePath()
  window.addEventListener('popstate', updatePath)
})

const isActive = computed(() => {
  if (!currentPath.value) return false
  const subpath = currentPath.value.match(/[^/]+/g)
  return props.to === currentPath.value || props.to === '/' + (subpath?.[0] || '')
})
</script>

<style scoped>
.nav-link {
  display: inline-block;
  text-decoration: none;
}
.nav-link.active {
  font-weight: bolder;
  text-decoration: underline;
}
</style> 