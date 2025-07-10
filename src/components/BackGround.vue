<template>
  <!-- 使用绝对定位的背景层，确保在所有内容之下 -->
  <div 
    class="absolute top-0 left-0 w-full bg-background pointer-events-none"
    :style="{ 
      height: `${backgroundHeight}px`,
      zIndex: -10,
      minHeight: '100vh'
    }"
  >
    <InteractiveGridPattern
      :width="40"
      :height="40"
      :squares="gridSquares"
      squares-class-name="hover:fill-blue-500/30 dark:hover:fill-blue-400/30"
      class="w-full h-full pointer-events-auto"
    />
  </div>
</template>

<script setup lang="ts">
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { ref, onMounted, onUnmounted } from "vue";

// 响应式网格尺寸和背景高度
const gridSquares = ref<[number, number]>([50, 50]);
const backgroundHeight = ref(0);

onMounted(() => {
  // 初始化背景高度
  const updateGridSize = () => {
    if (typeof window !== 'undefined') {
      const cols = Math.ceil(window.innerWidth / 40) + 5;
      const contentHeight = Math.max(
        window.innerHeight, 
        document.documentElement.scrollHeight, 
        document.body.scrollHeight
      );
      const rows = Math.ceil(contentHeight / 40) + 5;
      
      gridSquares.value = [cols, rows];
      backgroundHeight.value = Math.max(contentHeight, window.innerHeight);
      
      console.log('Grid updated:', { cols, rows, height: backgroundHeight.value });
    }
  };

  // 立即更新一次
  updateGridSize();
  
  // 延迟再更新一次，确保DOM完全加载
  setTimeout(updateGridSize, 100);
  
  // 监听窗口大小变化
  window.addEventListener('resize', updateGridSize);
  
  // 监听内容变化
  const observer = new MutationObserver(() => {
    setTimeout(updateGridSize, 50); // 稍微延迟以确保DOM更新完成
  });
  
  observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });
  
  // 清理事件监听器
  onUnmounted(() => {
    window.removeEventListener('resize', updateGridSize);
    observer.disconnect();
  });
});
</script>