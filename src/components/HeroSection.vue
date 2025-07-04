<template>
  <section class="min-h-screen flex flex-col items-center justify-center px-8 py-16">
    <!-- Hero 标题区域 -->
    <div class="text-center space-y-8 mb-16">
      <div class="space-y-4">
        <h1 class="text-6xl md:text-8xl font-bold text-white leading-tight">
          {{ HERO_TITLE }}
          <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            {{ HERO_TITLE_SPAN }}
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed" v-html="HERO_SUBTITLE"></p>
      </div>

      <!-- CTA 按钮区域 -->
      <div class="flex flex-wrap justify-center gap-6 mt-12">
        <GradientButton 
          class="text-white font-medium text-lg px-8 py-3"
          @click="scrollToBlog">
          {{ HERO_CTA_PRIMARY_TEXT }}
        </GradientButton>
        
        <GradientButton 
          :colors="['#667eea', '#764ba2', '#f093fb', '#f5576c']"
          :duration="2000"
          class="text-white font-medium text-lg px-8 py-3"
          @click="goToAbout">
          {{ HERO_CTA_SECONDARY_TEXT }}
        </GradientButton>
      </div>
    </div>

    <!-- 技术栈展示 -->
    <div class="w-full max-w-6xl">
      <h2 class="text-2xl font-bold text-white text-center mb-8">
        {{ TECH_STACK_TITLE }}
      </h2>
      <div class="flex flex-wrap justify-center gap-4">
        <div 
          v-for="tech in TECH_STACK_ITEMS" 
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
        {{ BLOG_PREVIEW_TITLE }}
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
                {{ READ_MORE_TEXT }}
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
          {{ VIEW_ALL_POSTS_TEXT }}
        </GradientButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { GradientButton } from '@/components/ui/gradient-button'
import {
    HERO_TITLE,
    HERO_TITLE_SPAN,
    HERO_SUBTITLE,
    HERO_CTA_PRIMARY_TEXT,
    HERO_CTA_SECONDARY_TEXT,
    TECH_STACK_TITLE,
    TECH_STACK_ITEMS,
    BLOG_PREVIEW_TITLE,
    READ_MORE_TEXT,
    VIEW_ALL_POSTS_TEXT,
    PATH_ABOUT,
    PATH_BLOG,
} from "../consts";
import { formatDate } from '../lib/utils';

interface Post {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    slug: string;
}

interface Props {
    featuredPosts: Post[];
}

defineProps<Props>();

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
    window.location.href = PATH_ABOUT
  }
}

const goToBlogList = () => {
  if (typeof window !== 'undefined') {
    window.location.href = PATH_BLOG
  }
}

const goToPost = (slug: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = `${PATH_BLOG}/${slug}`
  }
}
</script> 