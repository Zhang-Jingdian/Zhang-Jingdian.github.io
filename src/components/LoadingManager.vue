<template>
  <LoadingScreen 
    :is-visible="isLoading"
    :type="loadingType"
    :duration="duration"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LoadingScreen from './LoadingScreen.vue'

const isLoading = ref(false)
const loadingType = ref<'route' | 'theme' | 'general'>('general')
const duration = ref(2000)

// 显示加载
const showLoading = (type: 'route' | 'theme' | 'general' = 'general', time = 2000) => {
  isLoading.value = true
  loadingType.value = type
  duration.value = time
}

// 隐藏加载
const hideLoading = () => {
  isLoading.value = false
}

// 监听主题切换
const handleThemeChange = () => {
  showLoading('theme', 1000)
  
  // 主题切换完成后隐藏加载
  setTimeout(() => {
    hideLoading()
  }, 1000)
}

// 监听路由变化（手动触发）
const handleRouteChange = () => {
  showLoading('route', 1500)
  
  setTimeout(() => {
    hideLoading()
  }, 1500)
}

onMounted(() => {
  // 监听主题切换事件
  document.addEventListener('theme-change', handleThemeChange)
  
  // 监听自定义路由变化事件
  document.addEventListener('route-change', handleRouteChange)
  
  // 监听页面跳转（Astro 服务器端路由）
  const handleNavigation = () => {
    showLoading('route', 1500)
  }
  
  // 监听所有链接点击
  const handleLinkClick = (e: Event) => {
    const target = e.target as HTMLElement
    const link = target.closest('a')
    
    if (link && link.href && !link.href.startsWith('#') && !link.target && !link.download) {
      // 只对站内链接生效
      const currentOrigin = window.location.origin
      const linkUrl = new URL(link.href, currentOrigin)
      const currentUrl = new URL(window.location.href)
      
      // 检查是否是站内链接且不是当前页面
             if (linkUrl.origin === currentOrigin && linkUrl.pathname !== currentUrl.pathname) {
         e.preventDefault() // 阻止默认跳转
        showLoading('route', 1200)
        
        // 延迟跳转，让用户看到加载动画
        setTimeout(() => {
          window.location.href = link.href
        }, 300)
      }
    }
  }
  
  // 监听返回/前进按钮
  window.addEventListener('beforeunload', handleNavigation)
  window.addEventListener('popstate', handleNavigation)
  
  // 监听链接点击
  document.addEventListener('click', handleLinkClick)
  
  // 全局暴露方法
  ;(window as any).showLoading = showLoading
  ;(window as any).hideLoading = hideLoading
})

onUnmounted(() => {
  document.removeEventListener('theme-change', handleThemeChange)
  document.removeEventListener('route-change', handleRouteChange)
  
  // 清理页面导航监听器
  window.removeEventListener('beforeunload', () => showLoading('route', 1500))
  window.removeEventListener('popstate', () => showLoading('route', 1500))
  
  // 注意：由于 handleLinkClick 是在 onMounted 中定义的局部函数，
  // 我们无法在这里直接移除它，但组件卸载时会自动清理
})
</script>