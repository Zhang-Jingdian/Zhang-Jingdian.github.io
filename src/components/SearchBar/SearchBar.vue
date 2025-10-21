<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import Fuse from 'fuse.js'
import { Search, X } from 'lucide-vue-next'

interface Post {
  slug: string
  data: {
    title: string
    description: string
    tags: string[]
  }
}

interface SearchResult {
  item: Post
  score?: number
}

const props = defineProps<{
  posts: Post[]
}>()

const searchQuery = ref('')
const isSearchOpen = ref(false)
const searchResults = ref<SearchResult[]>([])
const searchInput = ref<HTMLInputElement | null>(null)

// 配置 Fuse.js
const fuse = computed(() => {
  return new Fuse(props.posts, {
    keys: [
      { name: 'data.title', weight: 0.5 },
      { name: 'data.description', weight: 0.3 },
      { name: 'data.tags', weight: 0.2 },
    ],
    threshold: 0.3, // 模糊匹配阈值（0-1，越小越精确）
    includeScore: true,
  })
})

// 执行搜索
watch(searchQuery, (query) => {
  if (!query.trim()) {
    searchResults.value = []
    return
  }
  searchResults.value = fuse.value.search(query)
})

// 打开搜索框
const openSearch = () => {
  isSearchOpen.value = true
  setTimeout(() => {
    searchInput.value?.focus()
  }, 100)
}

// 关闭搜索框
const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
  searchResults.value = []
}

// 键盘快捷键（Ctrl/Cmd + K）
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      openSearch()
    }
    if (e.key === 'Escape' && isSearchOpen.value) {
      closeSearch()
    }
  }
  window.addEventListener('keydown', handleKeydown)

  return () => {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<template>
  <div class="relative">
    <!-- 搜索按钮 -->
    <button
      @click="openSearch"
      class="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-500 transition hover:border-gray-300 hover:text-gray-700"
      aria-label="搜索"
    >
      <Search :size="16" />
      <span class="hidden sm:inline">搜索</span>
      <kbd
        class="hidden rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-500 sm:inline"
      >
        ⌘/CTRL + SHIFT + K
      </kbd>
    </button>

    <!-- 搜索模态框 -->
    <Teleport to="body">
      <Transition name="search">
        <div
          v-if="isSearchOpen"
          class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20 backdrop-blur-sm"
          @click.self="closeSearch"
        >
          <div
            class="w-full max-w-2xl rounded-lg border border-gray-200 bg-white shadow-2xl"
            @click.stop
          >
            <!-- 搜索输入框 -->
            <div class="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
              <Search :size="20" class="text-gray-400" />
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="搜索文章标题、描述、标签..."
                class="flex-1 bg-transparent text-lg outline-none"
              />
              <button
                @click="closeSearch"
                class="rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                aria-label="关闭"
              >
                <X :size="20" />
              </button>
            </div>

            <!-- 搜索结果 -->
            <div class="max-h-[60vh] overflow-y-auto">
              <div v-if="searchQuery && searchResults.length === 0" class="p-8 text-center">
                <p class="text-gray-500">未找到相关文章</p>
              </div>

              <div v-else-if="searchResults.length > 0" class="divide-y divide-gray-100">
                <a
                  v-for="result in searchResults"
                  :key="result.item.slug"
                  :href="`/blog/${result.item.slug}`"
                  class="block px-4 py-3 transition hover:bg-gray-50"
                  @click="closeSearch"
                >
                  <h3 class="font-medium text-gray-900">
                    {{ result.item.data.title }}
                  </h3>
                  <p class="mt-1 line-clamp-2 text-sm text-gray-600">
                    {{ result.item.data.description }}
                  </p>
                  <div v-if="result.item.data.tags?.length" class="mt-2 flex flex-wrap gap-2">
                    <span
                      v-for="tag in result.item.data.tags.slice(0, 3)"
                      :key="tag"
                      class="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </a>
              </div>

              <div v-else class="p-8 text-center">
                <p class="text-sm text-gray-500">输入关键词开始搜索</p>
                <p class="mt-1 text-xs text-gray-400">支持标题、描述、标签搜索</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* 搜索模态框动画 */
.search-enter-active,
.search-leave-active {
  transition: opacity 0.2s ease;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
}

.search-enter-active > div,
.search-leave-active > div {
  transition: transform 0.2s ease;
}

.search-enter-from > div,
.search-leave-to > div {
  transform: scale(0.95) translateY(-10px);
}

/* 文本截断 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}
</style>
