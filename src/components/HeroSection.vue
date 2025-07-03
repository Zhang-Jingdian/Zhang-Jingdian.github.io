<template>
  <section class="min-h-screen flex flex-col items-center justify-center px-8 py-16">
    <!-- Hero 标题区域 -->
    <div class="text-center space-y-8 mb-16">
      <div class="space-y-4">
        <h1 class="text-6xl md:text-8xl font-bold text-white leading-tight">
          我的
          <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            博客世界
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          分享技术见解、生活感悟与创作灵感 ✨<br />
          基于现代化技术栈构建的个人博客空间
        </p>
      </div>

      <!-- CTA 按钮区域 -->
      <div class="flex flex-wrap justify-center gap-6 mt-12">
        <GradientButton 
          class="text-white font-medium text-lg px-8 py-3"
          @click="scrollToBlog">
          📖 开始阅读
        </GradientButton>
        
        <GradientButton 
          :colors="['#667eea', '#764ba2', '#f093fb', '#f5576c']"
          :duration="2000"
          class="text-white font-medium text-lg px-8 py-3"
          @click="goToAbout">
          👋 关于我
        </GradientButton>
      </div>
    </div>

    <!-- 技术栈展示 -->
    <div class="w-full max-w-6xl">
      <h2 class="text-2xl font-bold text-white text-center mb-8">
        🛠️ 技术栈
      </h2>
      <div class="flex flex-wrap justify-center gap-4">
        <div 
          v-for="tech in techStack" 
          :key="tech.name" 
          class="group px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
        >
          <span class="text-white font-medium flex items-center gap-2">
            <span class="text-lg">{{ tech.icon }}</span>
            {{ tech.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- 博客预览区域 -->
    <div class="w-full max-w-6xl mt-20" id="blog-preview">
      <h2 class="text-3xl font-bold text-white text-center mb-12">
        📝 最新文章
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <article 
          v-for="post in featuredPosts" 
          :key="post.id"
          class="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          @click="goToPost(post.slug)"
        >
          <div class="space-y-4">
            <div class="text-sm text-purple-300">{{ formatDate(post.date) }}</div>
            <h3 class="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              {{ post.title }}
            </h3>
            <p class="text-gray-300 text-sm leading-relaxed">{{ post.excerpt }}</p>
            <div class="flex justify-between items-center pt-4">
              <span class="text-xs text-gray-400">{{ post.readTime }}</span>
              <GradientButton 
                :colors="['#667eea', '#764ba2']"
                :duration="3000"
                :border-width="1"
                class="text-white text-sm px-4 py-2">
                阅读更多 →
              </GradientButton>
            </div>
          </div>
        </article>
      </div>
      
      <!-- 查看更多按钮 -->
      <div class="text-center mt-12">
        <GradientButton 
          :colors="['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']"
          class="text-white font-medium text-lg px-8 py-3"
          @click="goToBlogList">
          📚 查看所有文章
        </GradientButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { GradientButton } from '@/components/ui/gradient-button'

const techStack = [
  { name: 'Astro', icon: '🚀' },
  { name: 'Vue 3', icon: '💚' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'TailwindCSS v4', icon: '🎨' },
  { name: 'Inspira UI', icon: '✨' },
  { name: 'shadcn-vue', icon: '🔧' }
]

const featuredPosts = [
  {
    id: 'using-mdx',
    title: 'Using MDX',
    excerpt: 'MDX是一种特殊的Markdown格式，支持嵌入式JavaScript和JSX语法。这解锁了将JavaScript和UI组件混合到Markdown内容中的能力...',
    date: '2024-06-01',
    readTime: '5 分钟阅读',
    slug: 'using-mdx'
  },
  {
    id: 'markdown-style-guide',
    title: 'Markdown Style Guide',
    excerpt: '这里有一些基本的Markdown语法示例，可以在Astro中编写Markdown内容时使用。包括标题、段落、图片、代码块等各种元素的使用方法...',
    date: '2024-06-19',
    readTime: '8 分钟阅读',
    slug: 'markdown-style-guide'
  },
  {
    id: 'third-post',
    title: 'Third post',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    date: '2022-07-22',
    readTime: '6 分钟阅读',
    slug: 'third-post'
  }
]

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 页面跳转函数
const scrollToBlog = () => {
  if (typeof document !== 'undefined') {
    document.getElementById('blog-preview')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }
}

const goToAbout = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/about'
  }
}

const goToBlogList = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/blog'
  }
}

const goToPost = (slug: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = `/blog/${slug}`
  }
}
</script> 