<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	href: string;
	class?: string;
	currentPath?: string; // 从服务器端传入的当前路径
}

const props = defineProps<Props>();

// 使用服务器传入的路径或客户端的路径（保证 SSR 和客户端一致）
const isActive = computed(() => {
	// 优先使用从服务器传入的 currentPath
	const pathname = props.currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
	
	// 首页精确匹配
	if (props.href === '/') {
		return pathname === '/';
	}
	
	// 其他页面匹配
	return pathname === props.href || pathname.startsWith(props.href + '/');
});
</script>

<template>
	<a 
		:href="href" 
		:class="[
			props.class,
			'inline-block transition-colors hover:text-neutral-900',
			isActive 
				? 'font-semibold text-neutral-900 underline decoration-2 underline-offset-4' 
				: 'text-neutral-600'
		]"
	>
		<slot />
	</a>
</template>
