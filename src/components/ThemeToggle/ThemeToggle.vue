<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDark = ref(false);

// 切换主题
const toggleTheme = () => {
	isDark.value = !isDark.value;
	updateTheme();
};

// 更新主题
const updateTheme = () => {
	if (isDark.value) {
		document.documentElement.classList.add('dark');
		localStorage.setItem('theme', 'dark');
	} else {
		document.documentElement.classList.remove('dark');
		localStorage.setItem('theme', 'light');
	}
};

// 初始化主题
onMounted(() => {
	// 从 localStorage 读取用户偏好
	const savedTheme = localStorage.getItem('theme');
	
	if (savedTheme) {
		isDark.value = savedTheme === 'dark';
	} else {
		// 如果没有保存的偏好，使用系统偏好
		isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	
	updateTheme();
});
</script>

<template>
	<button
		@click="toggleTheme"
		class="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-300 dark:hover:text-neutral-100"
		:aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
		type="button"
	>
		<!-- 太阳图标（浅色模式） -->
		<svg
			v-if="!isDark"
			class="h-5 w-5"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
			/>
		</svg>
		
		<!-- 月亮图标（深色模式） -->
		<svg
			v-else
			class="h-5 w-5"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
			/>
		</svg>
	</button>
</template>
