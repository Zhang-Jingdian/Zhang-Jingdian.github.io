<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

export interface TocHeading {
	text: string;
	id: string;
	level: number;
}

interface Props {
	headings: TocHeading[];
}

const props = defineProps<Props>();
const activeId = ref<string>('');

// 监听滚动，更新当前激活的标题
const updateActiveHeading = () => {
	const headingElements = props.headings
		.map((heading) => document.getElementById(heading.id))
		.filter((el): el is HTMLElement => el !== null);

	if (headingElements.length === 0) return;

	const scrollTop = window.scrollY;
	const windowHeight = window.innerHeight;
	const documentHeight = document.documentElement.scrollHeight;
	
	// 检查是否在页面顶部（滚动距离小于 100px）
	if (scrollTop < 100) {
		activeId.value = '';
		return;
	}
	
	// 检查是否滚动到接近底部（距离底部小于 100px）
	const isNearBottom = scrollTop + windowHeight >= documentHeight - 100;
	if (isNearBottom) {
		activeId.value = '';
		return;
	}

	// 找到当前视口中最靠上的标题
	const scrollTopWithOffset = scrollTop + 100; // 偏移量
	
	for (let i = headingElements.length - 1; i >= 0; i--) {
		const el = headingElements[i];
		if (el.offsetTop <= scrollTopWithOffset) {
			activeId.value = el.id;
			return;
		}
	}
	
	// 没有找到匹配的标题，清空高亮
	activeId.value = '';
};

// 平滑滚动到指定标题
const scrollToHeading = (id: string) => {
	const element = document.getElementById(id);
	if (element) {
		// 立即更新激活状态
		activeId.value = id;
		
		const offset = 80; // 距离顶部的偏移量
		const elementPosition = element.offsetTop;
		const offsetPosition = elementPosition - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	}
};

onMounted(() => {
	updateActiveHeading();
	window.addEventListener('scroll', updateActiveHeading, { passive: true });
});

onUnmounted(() => {
	window.removeEventListener('scroll', updateActiveHeading);
});
</script>

<template>
	<nav
		v-if="props.headings && props.headings.length > 0"
		class="toc-container sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-neutral-200 bg-white p-4"
	>
		<h2 class="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-700">
			目录
		</h2>
		<ul class="space-y-2 text-sm">
			<li
				v-for="heading in props.headings"
				:key="heading.id"
				:style="{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }"
			>
				<a
					:href="`#${heading.id}`"
					@click.prevent="scrollToHeading(heading.id)"
					:class="[
						'block rounded px-2 py-1 transition-colors',
						activeId === heading.id
							? 'bg-neutral-100 font-medium text-neutral-900'
							: 'text-neutral-600 hover:text-neutral-900'
					]"
				>
					{{ heading.text }}
				</a>
			</li>
		</ul>
	</nav>
</template>

<style scoped>
/* 隐藏滚动条但保留滚动功能 */
.toc-container {
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE/Edge */
}

.toc-container::-webkit-scrollbar {
	display: none; /* Chrome/Safari/Opera */
}
</style>
