<template>
    <Icon :icon="isDark ? THEME_ICON_DARK : THEME_ICON_LIGHT" class="size-full" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import { THEME_ICON_LIGHT, THEME_ICON_DARK } from '../consts';
// import { useLoading } from '@/composables/useLoading';

const isDark = ref(false);

// 防抖函数
const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// 优化的主题应用函数
const applyTheme = (theme: 'dark' | 'light') => {
    if (typeof document === 'undefined') return;
    
    // 使用 requestAnimationFrame 确保在下一帧执行
    requestAnimationFrame(() => {
        const html = document.documentElement;
        const shouldBeDark = theme === 'dark';
        
        // 避免不必要的DOM操作
        if (shouldBeDark !== html.classList.contains('dark')) {
            if (shouldBeDark) {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
        }
        
        isDark.value = shouldBeDark;
    });
};

// 防抖的主题切换函数
const debouncedApplyTheme = debounce(applyTheme, 50);

const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark';
    
    // 触发主题切换加载动画
    const event = new CustomEvent('theme-change', { 
        detail: { theme: newTheme } 
    });
    document.dispatchEvent(event);
    
    // 立即更新本地存储
    if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
    }
    
    // 防抖应用主题
    debouncedApplyTheme(newTheme);
};

// 监听系统主题变化
let mediaQuery: MediaQueryList | null = null;
const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    if (typeof window !== 'undefined' && !localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
};

onMounted(() => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
        
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            // 监听系统主题变化
            mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', handleSystemThemeChange);
            
            applyTheme(mediaQuery.matches ? 'dark' : 'light');
        }
    }
});

onUnmounted(() => {
    if (mediaQuery) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
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
    width: 2rem;
    height: 2rem;
    /* 添加 will-change 优化动画性能 */
    will-change: transform;
}

/* 优化图标过渡效果 */
:deep(.iconify) {
    transition: transform 0.2s ease;
    will-change: transform;
}

:deep(.iconify:hover) {
    transform: scale(1.1);
}
</style>
