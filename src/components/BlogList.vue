<template>
  <div class="w-full">
    <!-- 搜索和筛选区域 -->
    <div class="mb-12 max-w-2xl mx-auto">
      <div class="relative">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="🔍 搜索文章标题或内容..."
          class="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
        />
        <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          {{ filteredPosts.length }} 篇文章
        </div>
      </div>
    </div>

    <!-- 文章网格 -->
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article 
        v-for="post in paginatedPosts" 
        :key="post.id"
        class="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
        @click="goToPost(post.slug)"
      >
        <!-- 文章封面 -->
        <div class="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden">
          <img 
            v-if="post.heroImage" 
            :src="post.heroImage" 
            :alt="post.title"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div 
            v-else 
            class="w-full h-full flex items-center justify-center text-6xl text-white/30"
          >
            📝
          </div>
          
          <!-- 阅读时间标签 -->
          <div class="absolute top-4 right-4">
            <span class="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
              {{ calculateReadTime(post.description) }} 分钟阅读
            </span>
          </div>
        </div>

        <!-- 文章内容 -->
        <div class="p-6 space-y-4">
          <div class="text-sm text-purple-300">
            {{ formatDate(post.pubDate) }}
            <span v-if="post.updatedDate" class="text-gray-400 ml-2">
              (已更新: {{ formatDate(post.updatedDate) }})
            </span>
          </div>
          
          <h3 class="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
            {{ post.title }}
          </h3>
          
          <p class="text-gray-300 text-sm leading-relaxed line-clamp-3">
            {{ post.description }}
          </p>

          <!-- 底部操作区域 -->
          <div class="flex justify-between items-center pt-4 border-t border-white/10">
            <GradientButton 
              :colors="['#667eea', '#764ba2']"
              :duration="3000"
              :border-width="1"
              class="text-white text-sm px-4 py-2">
              阅读全文 →
            </GradientButton>
            
            <div class="flex space-x-2">
              <button 
                class="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                @click.stop="sharePost(post)"
                title="分享文章"
              >
                <Icon icon="mdi:share-variant" class="w-4 h-4 text-white" />
              </button>
              <button 
                class="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                @click.stop="toggleFavorite(post.id)"
                title="收藏文章"
              >
                <Icon 
                  :icon="favorites.includes(post.id) ? 'mdi:heart' : 'mdi:heart-outline'" 
                  class="w-4 h-4"
                  :class="favorites.includes(post.id) ? 'text-red-400' : 'text-white'"
                />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- 没有找到文章 -->
    <div 
      v-if="filteredPosts.length === 0" 
      class="text-center py-16"
    >
      <div class="text-6xl text-white/30 mb-4">🔍</div>
      <h3 class="text-2xl font-bold text-white mb-2">没有找到相关文章</h3>
      <p class="text-gray-400">试试调整搜索关键词吧</p>
    </div>

    <!-- 分页 -->
    <div 
      v-if="totalPages > 1" 
      class="flex justify-center items-center space-x-4 mt-12"
    >
      <button 
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
      >
        ← 上一页
      </button>
      
      <div class="flex space-x-2">
        <button 
          v-for="page in visiblePages" 
          :key="page"
          @click="typeof page === 'number' ? currentPage = page : null"
          :class="[
            'px-3 py-2 rounded-lg text-white transition-colors',
            currentPage === page 
              ? 'bg-purple-500' 
              : 'bg-white/10 hover:bg-white/20'
          ]"
          :disabled="typeof page !== 'number'"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
      >
        下一页 →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { GradientButton } from '@/components/ui/gradient-button'
import { Icon } from '@iconify/vue'

interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  pubDate: string
  updatedDate?: string
  heroImage?: string
}

interface Props {
  posts: BlogPost[]
}

const props = defineProps<Props>()

// 响应式数据
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(6)
const favorites = ref<string[]>([])

// 计算属性
const filteredPosts = computed(() => {
  if (!searchQuery.value) return props.posts
  
  const query = searchQuery.value.toLowerCase()
  return props.posts.filter(post => 
    post.title.toLowerCase().includes(query) ||
    post.description.toLowerCase().includes(query)
  )
})

const totalPages = computed(() => 
  Math.ceil(filteredPosts.value.length / pageSize.value)
)

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredPosts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const delta = 2
  const range = []
  const rangeWithDots = []
  
  for (let i = Math.max(2, currentPage.value - delta); 
       i <= Math.min(totalPages.value - 1, currentPage.value + delta); 
       i++) {
    range.push(i)
  }
  
  if (currentPage.value - delta > 2) {
    rangeWithDots.push(1, '...')
  } else {
    rangeWithDots.push(1)
  }
  
  rangeWithDots.push(...range)
  
  if (currentPage.value + delta < totalPages.value - 1) {
    rangeWithDots.push('...', totalPages.value)
  } else {
    rangeWithDots.push(totalPages.value)
  }
  
  return rangeWithDots.filter((item, index, array) => array.indexOf(item) === index)
})

// 工具函数
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const calculateReadTime = (content: string) => {
  // 按照中文平均阅读速度计算（约300字/分钟）
  const wordsPerMinute = 300
  const words = content.length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

const goToPost = (slug: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = `/blog/${slug}`
  }
}

const sharePost = (post: BlogPost) => {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: `/blog/${post.slug}`
      })
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`)
      alert('链接已复制到剪贴板！')
    }
  }
}

const toggleFavorite = (postId: string) => {
  const index = favorites.value.indexOf(postId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(postId)
  }
  // 保存到 localStorage（仅在浏览器环境中）
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('blog-favorites', JSON.stringify(favorites.value))
  }
}

// 初始化收藏列表
const initFavorites = () => {
  try {
    // 检查是否在浏览器环境中
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('blog-favorites')
      if (saved) {
        favorites.value = JSON.parse(saved)
      }
    }
  } catch (error) {
    console.error('Failed to load favorites:', error)
  }
}

// 组件挂载时初始化
initFavorites()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 