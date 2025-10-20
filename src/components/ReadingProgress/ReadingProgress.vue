<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const progress = ref(0);

// 计算阅读进度
const updateProgress = () => {
	const scrollTop = window.scrollY;
	const docHeight = document.documentElement.scrollHeight - window.innerHeight;
	const scrollPercent = (scrollTop / docHeight) * 100;
	progress.value = Math.min(100, Math.max(0, scrollPercent));
};

onMounted(() => {
	updateProgress();
	window.addEventListener('scroll', updateProgress, { passive: true });
});

onUnmounted(() => {
	window.removeEventListener('scroll', updateProgress);
});
</script>

<template>
	<div class="fixed left-0 top-0 z-50 h-1 w-full bg-neutral-100">
		<div 
			class="h-full bg-neutral-900 transition-all duration-150 ease-out"
			:style="{ width: `${progress}%` }"
		/>
	</div>
</template>
