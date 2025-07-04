<template>
    <button @click="toggleTheme" class="theme-toggle" aria-label="切换主题">
        <Icon :icon="isDark ? 'mdi:weather-night' : 'mdi:weather-sunny'" class="size-full" />
    </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';

const isDark = ref(false);

const applyTheme = (theme: 'dark' | 'light') => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        isDark.value = true;
    } else {
        document.documentElement.classList.remove('dark');
        isDark.value = false;
    }
};

const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
};

onMounted(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }
});
</script>

<style scoped>
.theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    width: 2rem; /* 4*8 = 32px */
    height: 2rem;
}
</style>
