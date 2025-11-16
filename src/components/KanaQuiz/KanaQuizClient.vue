<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import {
  kanaData,
  quizModeLabels,
  difficultyLabels,
  difficultyDescriptions,
  getKanaByDifficulty,
  kanaQuizVariants,
  type QuizMode,
  type DifficultyLevel,
  type Kana,
  type QuizStats,
} from './index'

interface Props {
  theme?: 'default' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'default',
})

// 测试模式和难度
const quizMode = ref<QuizMode>('hiragana-to-romaji')
const difficulty = ref<DifficultyLevel>('basic')
const isStarted = ref(false)

// 当前题目
const currentKana = ref<Kana | null>(null)
const options = ref<string[]>([])
const selectedAnswer = ref<string>('')
const isAnswered = ref(false)
const isCorrect = ref(false)

// 统计数据
const stats = ref<QuizStats>({
  correct: 0,
  wrong: 0,
  total: 0,
  accuracy: 0,
})

// 获取问题文本
const questionText = computed(() => {
  if (!currentKana.value) return ''
  
  switch (quizMode.value) {
    case 'hiragana-to-romaji':
      return currentKana.value.hiragana
    case 'katakana-to-romaji':
      return currentKana.value.katakana
    case 'romaji-to-hiragana':
      return currentKana.value.romaji
    case 'romaji-to-katakana':
      return currentKana.value.romaji
    default:
      return ''
  }
})

// 获取正确答案
const correctAnswer = computed(() => {
  if (!currentKana.value) return ''
  
  switch (quizMode.value) {
    case 'hiragana-to-romaji':
    case 'katakana-to-romaji':
      return currentKana.value.romaji
    case 'romaji-to-hiragana':
      return currentKana.value.hiragana
    case 'romaji-to-katakana':
      return currentKana.value.katakana
    default:
      return ''
  }
})

// 获取当前难度的假名数据
const currentKanaData = computed(() => getKanaByDifficulty(difficulty.value))

// 生成随机选项
function generateOptions(correct: string, count: number = 4): string[] {
  const allOptions = currentKanaData.value.map(k => {
    switch (quizMode.value) {
      case 'hiragana-to-romaji':
      case 'katakana-to-romaji':
        return k.romaji
      case 'romaji-to-hiragana':
        return k.hiragana
      case 'romaji-to-katakana':
        return k.katakana
      default:
        return k.romaji
    }
  })
  
  // 去重并排除正确答案
  const uniqueOptions = [...new Set(allOptions)].filter(opt => opt !== correct)
  
  // 随机选择
  const shuffled = uniqueOptions.sort(() => Math.random() - 0.5)
  const wrongOptions = shuffled.slice(0, count - 1)
  
  // 加入正确答案并打乱
  const finalOptions = [...wrongOptions, correct].sort(() => Math.random() - 0.5)
  
  return finalOptions
}

// 生成新题目
function generateQuestion() {
  const kanaList = currentKanaData.value
  const randomIndex = Math.floor(Math.random() * kanaList.length)
  currentKana.value = kanaList[randomIndex]
  options.value = generateOptions(correctAnswer.value)
  selectedAnswer.value = ''
  isAnswered.value = false
  isCorrect.value = false
}

// 开始测试
function startQuiz() {
  isStarted.value = true
  stats.value = {
    correct: 0,
    wrong: 0,
    total: 0,
    accuracy: 0,
  }
  generateQuestion()
}

// 选择答案
function selectAnswer(answer: string) {
  if (isAnswered.value) return
  
  selectedAnswer.value = answer
  isAnswered.value = true
  isCorrect.value = answer === correctAnswer.value
  
  // 更新统计
  stats.value.total++
  if (isCorrect.value) {
    stats.value.correct++
  } else {
    stats.value.wrong++
  }
  stats.value.accuracy = Math.round((stats.value.correct / stats.value.total) * 100)
}

// 下一题
function nextQuestion() {
  generateQuestion()
}

// 重新开始
function restart() {
  isStarted.value = false
  currentKana.value = null
}

// 切换模式
function changeMode(mode: QuizMode) {
  quizMode.value = mode
  if (isStarted.value) {
    generateQuestion()
  }
}
</script>

<template>
  <div :class="cn(kanaQuizVariants({ theme }), 'text-neutral-900 dark:text-neutral-100')">
    <!-- 未开始状态 -->
    <div v-if="!isStarted" class="text-center space-y-8">
      <div>
        <h2 class="text-3xl font-semibold mb-2">🇯🇵 日语五十音测试</h2>
        <p class="text-neutral-600 dark:text-neutral-400">
          选择测试模式和难度，开始练习假名记忆
        </p>
      </div>

      <!-- 难度选择 -->
      <div>
        <h3 class="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">选择难度</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          <button
            v-for="(label, level) in difficultyLabels"
            :key="level"
            @click="difficulty = level as DifficultyLevel"
            :class="[
              'p-4 rounded-lg border-2 transition-all',
              difficulty === level
                ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-100 dark:bg-neutral-800'
                : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
            ]"
          >
            <div class="font-semibold mb-1">{{ label }}</div>
            <div class="text-xs text-neutral-600 dark:text-neutral-400">
              {{ difficultyDescriptions[level as DifficultyLevel] }}
            </div>
          </button>
        </div>
      </div>

      <!-- 模式选择 -->
      <div>
        <h3 class="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">选择测试模式</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <button
            v-for="(label, mode) in quizModeLabels"
            :key="mode"
            @click="quizMode = mode as QuizMode"
            :class="[
              'p-4 rounded-lg border-2 transition-all font-medium',
              quizMode === mode
                ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-100 dark:bg-neutral-800'
                : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
            ]"
          >
            {{ label }}
          </button>
        </div>
      </div>

      <button
        @click="startQuiz"
        class="px-8 py-3 rounded-lg font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-md hover:shadow-lg"
      >
        开始测试
      </button>
    </div>

    <!-- 测试中状态 -->
    <div v-else class="space-y-6">
      <!-- 顶部信息栏 -->
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <span class="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {{ difficultyLabels[difficulty] }} · {{ quizModeLabels[quizMode] }}
          </span>
          <button
            @click="restart"
            class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            切换设置
          </button>
        </div>
        <div class="flex items-center gap-4 text-sm">
          <span class="text-green-600 dark:text-green-400">✓ {{ stats.correct }}</span>
          <span class="text-red-600 dark:text-red-400">✗ {{ stats.wrong }}</span>
          <span class="font-semibold">正确率: {{ stats.accuracy }}%</span>
        </div>
      </div>

      <!-- 题目卡片 -->
      <div class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-12 text-center border border-neutral-200 dark:border-neutral-700">
        <div class="text-8xl font-bold mb-4">
          {{ questionText }}
        </div>
        <div class="text-sm text-neutral-500 dark:text-neutral-400">
          请选择对应的 {{ quizMode.includes('romaji-to') ? '假名' : '罗马音' }}
        </div>
      </div>

      <!-- 选项 -->
      <div class="grid grid-cols-2 gap-4">
        <button
          v-for="option in options"
          :key="option"
          @click="selectAnswer(option)"
          :disabled="isAnswered"
          :class="[
            'p-6 rounded-lg border-2 transition-all font-semibold text-2xl',
            !isAnswered
              ? 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              : selectedAnswer === option
                ? isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                : option === correctAnswer
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'border-neutral-200 dark:border-neutral-700 opacity-50',
            isAnswered && 'cursor-not-allowed'
          ]"
        >
          {{ option }}
        </button>
      </div>

      <!-- 结果提示 -->
      <div v-if="isAnswered" class="text-center space-y-4">
        <div :class="[
          'text-xl font-semibold',
          isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        ]">
          {{ isCorrect ? '✓ 回答正确！' : '✗ 回答错误' }}
        </div>
        <div v-if="!isCorrect" class="text-neutral-600 dark:text-neutral-400">
          正确答案是: <span class="font-semibold text-neutral-900 dark:text-neutral-100">{{ correctAnswer }}</span>
        </div>
        <button
          @click="nextQuestion"
          class="px-6 py-3 rounded-lg font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-md"
        >
          下一题 →
        </button>
      </div>
    </div>
  </div>
</template>
