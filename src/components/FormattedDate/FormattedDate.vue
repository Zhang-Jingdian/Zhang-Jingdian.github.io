<script setup lang="ts">
import { BLOG_CONFIG } from '@/config';

interface Props {
	date: Date;
}

const { date } = defineProps<Props>();

// 格式化日期
const formattedDate = date.toLocaleDateString(
	BLOG_CONFIG.dateFormat.locale,
	BLOG_CONFIG.dateFormat.options
);
</script>

<template>
	<time :datetime="date.toISOString()">
		{{ formattedDate }}
	</time>
</template>
