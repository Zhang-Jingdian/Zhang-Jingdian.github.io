<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	href: string;
	class?: string;
}

const props = defineProps<Props>();

// 在客户端获取当前路径
const isActive = computed(() => {
	if (typeof window === 'undefined') return false;
	
	const pathname = window.location.pathname;
	const subpath = pathname.match(/[^/]+/g);
	
	// 精确匹配或首层路径匹配
	return props.href === pathname || props.href === '/' + (subpath?.[0] || '');
});
</script>

<template>
	<a 
		:href="href" 
		:class="[
			props.class,
			isActive 
				? 'font-semibold text-neutral-900 underline decoration-2 underline-offset-4' 
				: 'text-neutral-600'
		]"
		class="inline-block transition-colors hover:text-neutral-900"
	>
		<slot />
	</a>
</template>
