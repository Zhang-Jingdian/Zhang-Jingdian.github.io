<template>
  <time :datetime="date.toISOString()">
    {{ formattedDate }}
  </time>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatDate as formatDateUtil } from "../lib/utils";

interface Props {
    date: Date;
}

const props = defineProps<Props>();

const formattedDate = computed(() =>
    formatDateUtil(props.date, {
        year: "numeric",
        month: "short",
        day: "numeric",
    }),
);
</script> 