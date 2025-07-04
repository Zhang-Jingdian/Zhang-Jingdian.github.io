<template>
    <Icon :icon="isDark ? THEME_ICON_DARK : THEME_ICON_LIGHT" class="size-full" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { THEME_ICON_LIGHT, THEME_ICON_DARK } from '../consts';

const isDark = ref(false);

const applyTheme = (theme: 'dark' | 'light') => {
    if (typeof document !== 'undefined') {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            isDark.value = true;
        } else {
            document.documentElement.classList.remove('dark');
            isDark.value = false;
        }
    }
};

const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
    }
    applyTheme(newTheme);
};

onMounted(() => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }
    }
});

// Expose the toggleTheme function to be used by the parent component
defineExpose({
    toggleTheme
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
