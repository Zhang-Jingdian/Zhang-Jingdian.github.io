<template>
  <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
    <DockComponent class="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
      <!-- 导航链接 -->
      <DockIcon v-for="link in DOCK_LINKS" :key="link.to">
        <a 
          :href="link.to" 
          class="flex items-center justify-center w-full h-full text-white hover:text-blue-400 transition-colors"
          :title="link.label"
        >
          <Icon :icon="link.icon" class="size-6" />
        </a>
      </DockIcon>

      <!-- 分隔符 -->
      <DockSeparator />

      <!-- 社交链接 -->
      <DockIcon v-for="social in SOCIAL_LINKS" :key="social.name">
        <a 
          :href="social.url" 
          target="_blank"
          class="flex items-center justify-center w-full h-full text-white hover:text-green-400 transition-colors"
          :title="social.srText"
        >
          <Icon :icon="social.icon" class="size-6" />
        </a>
      </DockIcon>

      <!-- 分隔符 -->
      <DockSeparator />

      <!-- 主题切换按钮 -->
      <DockIcon>
        <button 
          @click="toggleTheme"
          class="flex items-center justify-center w-full h-full text-white hover:text-yellow-400 transition-colors"
          :title="isDark ? '切换到亮色主题' : '切换到暗色主题'"
        >
          <Icon :icon="isDark ? THEME_ICON_DARK : THEME_ICON_LIGHT" class="size-6" />
        </button>
      </DockIcon>
    </DockComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Dock as DockComponent, DockIcon, DockSeparator } from "@/components/ui/dock";
import { Icon } from '@iconify/vue';
import { 
  DOCK_LINKS, 
  SOCIAL_LINKS, 
  THEME_ICON_LIGHT, 
  THEME_ICON_DARK 
} from "@/consts";

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
</script> 