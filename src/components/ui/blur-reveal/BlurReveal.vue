<template>
    <div
      ref="container"
      :class="props.class"
    >
      <Motion
        v-for="(child, index) in children"
        :key="index"
        ref="childElements"
        as="div"
        :initial="getInitial()"
        :while-in-view="getAnimate()"
        :transition="{
          duration: props.duration,
          type: 'tween',
          ease: 'easeInOut',
          delay: props.delay * index,
        }"
      >
        <component :is="child" />
      </Motion>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Motion } from "motion-v";
  import { ref, onMounted, watchEffect, useSlots } from "vue";
  
  interface Props {
    duration?: number;
    delay?: number;
    blur?: string;
    yOffset?: number;
    class?: string;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    duration: 0.3,
    delay: 0.1,
    blur: "8px",
    yOffset: 10,
  });
  
  const container = ref(null);
  const childElements = ref([]);
  const slots = useSlots();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children = ref<any>([]);
  
  onMounted(() => {
    // This will reactively capture all content provided in the default slot
    watchEffect(() => {
      children.value = slots.default ? slots.default() : [];
    });
  });
  
  function getInitial() {
    return {
      opacity: 0,
      filter: `blur(${props.blur})`,
      transform: `translate3d(0, ${props.yOffset}px, 0)`,
    };
  }
  
  function getAnimate() {
    return {
      opacity: 1,
      filter: `blur(0px)`,
      transform: `translate3d(0, 0, 0)`,
    };
  }
  </script>