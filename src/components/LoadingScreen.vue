<template>
  <Transition name="loading-fade">
    <div v-if="isVisible" class="loading-screen">
      <!-- 背景遮罩 -->
      <div class="loading-backdrop"></div>
      
      <!-- 加载内容 -->
      <div class="loading-content">
        <!-- Logo 动画 -->
        <div class="loading-logo">
          <div class="logo-circle">
            <span class="logo-text">🤓</span>
          </div>
        </div>
        
        <!-- 加载文字 -->
        <div class="loading-text">
          <h2>{{ loadingText }}</h2>
          <p class="loading-subtitle">{{ subtitle }}</p>
        </div>
        
        <!-- 进度条 -->
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <span class="progress-text">{{ Math.round(progress) }}%</span>
        </div>
        
        <!-- 加载动画点 -->
        <div class="loading-dots">
          <span class="dot" v-for="n in 3" :key="n"></span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  isVisible?: boolean
  type?: 'route' | 'theme' | 'general'
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: false,
  type: 'general',
  duration: 2000,
})

const progress = ref(0)

// 根据类型动态设置文字
const loadingText = computed(() => {
  switch (props.type) {
    case 'route':
      return '页面跳转中'
    case 'theme':
      return '主题切换中'
    default:
      return '加载中'
  }
})

const subtitle = computed(() => {
  switch (props.type) {
    case 'route':
      return '正在为您准备精彩内容...'
    case 'theme':
      return '正在切换视觉体验...'
    default:
      return '请稍候片刻...'
  }
})

// 模拟加载进度
const simulateProgress = () => {
  const interval = 50
  const increment = 100 / (props.duration / interval)
  
  const timer = setInterval(() => {
    progress.value += increment
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(timer)
    }
  }, interval)
  
  return timer
}

// 监听可见性变化
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    progress.value = 0
    simulateProgress()
  }
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.loading-content {
  position: relative;
  text-align: center;
  color: white;
  z-index: 1;
}

/* Logo 动画 */
.loading-logo {
  margin-bottom: 2rem;
}

.logo-circle {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: logoSpin 2s linear infinite;
}

.logo-circle::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border: 3px solid transparent;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: logoSpin 1s linear infinite;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 加载文字 */
.loading-text h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  animation: textPulse 2s ease-in-out infinite;
}

.loading-subtitle {
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 2rem;
}

/* 进度条 */
.progress-container {
  margin-bottom: 2rem;
  width: 240px;
  margin-left: auto;
  margin-right: auto;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 2px;
  transition: width 0.3s ease;
  animation: progressGlow 2s ease-in-out infinite;
}

.progress-text {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* 加载点动画 */
.loading-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
  animation: dotBounce 1.4s ease-in-out infinite both;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }
.dot:nth-child(3) { animation-delay: 0s; }

/* 过渡动画 */
.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: all 0.3s ease;
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* 关键帧动画 */
@keyframes logoSpin {
  to { transform: rotate(360deg); }
}

@keyframes textPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes progressGlow {
  0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
  50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
}

@keyframes dotBounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* 深色主题适配 */
:global(.dark) .loading-backdrop {
  background: rgba(0, 0, 0, 0.9);
}

:global(.dark) .logo-circle {
  border-color: rgba(255, 255, 255, 0.2);
}

:global(.dark) .logo-circle::before {
  border-top-color: #60a5fa;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .loading-content {
    padding: 0 1rem;
  }
  
  .logo-circle {
    width: 60px;
    height: 60px;
  }
  
  .logo-text {
    font-size: 1.25rem;
  }
  
  .loading-text h2 {
    font-size: 1.25rem;
  }
  
  .progress-container {
    width: 200px;
  }
}
</style>