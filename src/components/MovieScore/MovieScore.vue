<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import {
  defaultConfig,
  ratingSteps,
  gradeThresholds,
  improvementSuggestions,
  movieScoreVariants,
  type MovieScoreConfig,
  type RatingData,
  type MovieScoreVariants,
} from './index'

interface Props extends MovieScoreVariants {
  config?: Partial<MovieScoreConfig>
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'default',
})

// 合并配置
const finalConfig = computed<MovieScoreConfig>(() => ({
  weights: { ...defaultConfig.weights, ...props.config?.weights },
  formWeights: { ...defaultConfig.formWeights, ...props.config?.formWeights },
  substanceWeights: { ...defaultConfig.substanceWeights, ...props.config?.substanceWeights },
  uncertainty: { ...defaultConfig.uncertainty, ...props.config?.uncertainty },
}))

// 当前步骤
const currentStep = ref(1)
const totalSteps = ratingSteps.length

// 评分数据
const ratings = ref<RatingData>({
  visual: 5,
  sound: 5,
  style: 5,
  characters: 5,
  plot: 5,
  worldview: 5,
  originality: 5,
  enjoyment: 5,
})

// 显示结果
const showResult = ref(false)

// 当前步骤数据
const currentStepData = computed(() => 
  ratingSteps.find(step => step.id === currentStep.value)
)

// 进度百分比
const progressPercent = computed(() => 
  (currentStep.value / totalSteps) * 100
)

// 计算评分
function calculateScore() {
  const { weights, formWeights, substanceWeights, uncertainty } = finalConfig.value

  // 计算形 (Form) - F = a_v*V + a_s*S + a_t*T
  const F = formWeights.visual * ratings.value.visual +
            formWeights.sound * ratings.value.sound +
            formWeights.style * ratings.value.style

  // 计算神 (Substance) - U = b_c*C + b_p*P + b_w*W
  const U = substanceWeights.characters * ratings.value.characters +
            substanceWeights.plot * ratings.value.plot +
            substanceWeights.worldview * ratings.value.worldview

  // 计算基础总分 - Base = clamp(w_f*F + w_u*U + w_o*O + w_e*E, 0, 10)
  let base = weights.form * F +
             weights.substance * U +
             weights.originality * ratings.value.originality +
             weights.enjoyment * ratings.value.enjoyment

  // 限制在0-10范围内
  base = Math.max(0, Math.min(10, base))

  // 计算不确定度 δ（单评审情形）
  const delta = uncertainty.prior

  // 计算置信区间
  const lower = Math.max(0, Math.min(10, base - delta))
  const upper = Math.max(0, Math.min(10, base + delta))

  // 计算等级
  const grade = gradeThresholds.find(g => base >= g.min)?.label || '不及格 (D/F)'

  // 计算星级 (5星制)
  const stars = Math.round((base / 2) * 10) / 10
  const starsDisplay = '★'.repeat(Math.floor(stars)) + '☆'.repeat(5 - Math.floor(stars))

  // 计算优先改进项
  const gaps = Object.entries(ratings.value)
    .map(([key, value]) => ({
      key: key as keyof RatingData,
      gap: 10 - value,
    }))
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3)

  // 生成改进建议
  const suggestions = gaps.map((item, index) => {
    const label = ratingSteps
      .flatMap(step => step.items)
      .find(i => i.key === item.key)?.label || item.key
    
    return {
      index: index + 1,
      label,
      suggestion: improvementSuggestions[item.key],
    }
  })

  return {
    base: base.toFixed(2),
    grade,
    stars: starsDisplay,
    interval: `[${lower.toFixed(2)}, ${upper.toFixed(2)}]`,
    delta: delta.toFixed(2),
    suggestions,
  }
}

// 计算结果
const result = computed(() => calculateScore())

// 导航函数
function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function nextStep() {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  } else {
    showResult.value = true
  }
}

function restart() {
  currentStep.value = 1
  showResult.value = false
  
  // 重置评分
  Object.keys(ratings.value).forEach(key => {
    ratings.value[key as keyof RatingData] = 5
  })
}

// 是否禁用按钮
const isPrevDisabled = computed(() => currentStep.value === 1)
const nextButtonText = computed(() => 
  currentStep.value === totalSteps ? '完成评分' : '下一步'
)
</script>

<template>
  <div :class="cn(movieScoreVariants({ theme }), 'text-white')">
    <!-- 进度条 -->
    <div v-if="!showResult" class="mb-8">
      <div class="h-2 bg-white/20 rounded-full overflow-hidden mb-2">
        <div
          class="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ease-out"
          :style="{ width: `${progressPercent}%` }"
        />
      </div>
      <p class="text-center text-sm text-white/80">
        步骤 {{ currentStep }} / {{ totalSteps }}: {{ currentStepData?.title }}
      </p>
    </div>

    <!-- 评分步骤 -->
    <div v-if="!showResult && currentStepData" class="space-y-6">
      <div>
        <h2 class="text-3xl font-bold text-center mb-2">
          {{ currentStepData.title }}
        </h2>
        <p class="text-center text-white/70 text-sm">
          {{ currentStepData.description }}
        </p>
      </div>

      <!-- 公式展示 -->
      <div v-if="currentStepData.formulas" class="space-y-4">
        <div
          v-for="formula in currentStepData.formulas"
          :key="formula.title"
          class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
        >
          <h3 class="text-lg font-semibold mb-2 text-blue-300">
            {{ formula.title }}
          </h3>
          <p class="font-mono text-center text-xl my-3 text-white">
            {{ formula.content }}
          </p>
          <p class="text-sm text-white/70 text-center">
            {{ formula.description }}
          </p>
        </div>
      </div>

      <!-- 评分项 -->
      <div class="space-y-6 mt-8">
        <div
          v-for="item in currentStepData.items"
          :key="item.id"
          class="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 transition-all hover:bg-white/10"
        >
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-semibold">{{ item.label }}</span>
            <span class="text-2xl font-bold text-blue-300">
              {{ ratings[item.key].toFixed(1) }}
            </span>
          </div>
          
          <input
            v-model.number="ratings[item.key]"
            type="range"
            min="0"
            max="10"
            step="0.1"
            class="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          
          <div class="flex justify-between text-sm text-white/60 mt-2">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>

      <!-- 导航按钮 -->
      <div class="flex justify-between gap-4 mt-8">
        <button
          @click="prevStep"
          :disabled="isPrevDisabled"
          class="flex-1 py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white/10 hover:bg-white/20 border border-white/20"
        >
          上一步
        </button>
        <button
          @click="nextStep"
          class="flex-1 py-3 px-6 rounded-lg font-semibold transition-all bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl"
        >
          {{ nextButtonText }}
        </button>
      </div>
    </div>

    <!-- 结果展示 -->
    <div v-if="showResult" class="space-y-6">
      <h2 class="text-3xl font-bold text-center mb-8">评分结果</h2>

      <!-- 公式说明 -->
      <div class="space-y-4 mb-8">
        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <h3 class="text-lg font-semibold mb-2 text-blue-300">不确定度计算公式</h3>
          <p class="font-mono text-center text-lg my-2">
            δ = clamp(δ_prior × (1 - (Base - 5)²/25), δ_min, δ_max)
          </p>
          <p class="text-sm text-white/70 text-center">
            其中：δ_prior = {{ finalConfig.uncertainty.prior }}, 
            δ_min = {{ finalConfig.uncertainty.min }}, 
            δ_max = {{ finalConfig.uncertainty.max }}
          </p>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <h3 class="text-lg font-semibold mb-2 text-blue-300">置信区间计算公式</h3>
          <p class="font-mono text-center text-lg my-2">
            [Lower, Upper] = [clamp(Base - δ, 0, 10), clamp(Base + δ, 0, 10)]
          </p>
          <p class="text-sm text-white/70 text-center">
            其中：Base = 基础总分, δ = 不确定度
          </p>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <h3 class="text-lg font-semibold mb-2 text-blue-300">星级评分计算公式</h3>
          <p class="font-mono text-center text-lg my-2">
            Stars = round(Base × 0.5)
          </p>
          <p class="text-sm text-white/70 text-center">
            将基础总分(0-10)转换为星级(0-5)
          </p>
        </div>
      </div>

      <!-- 评分结果 -->
      <div class="text-center space-y-4 bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/20">
        <div class="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {{ result.base }}
        </div>
        <div class="text-2xl font-semibold text-blue-300">
          {{ result.grade }}
        </div>
        <div class="text-4xl text-yellow-400">
          {{ result.stars }}
        </div>
        <div class="text-lg text-white/70">
          置信区间: {{ result.interval }} (δ = {{ result.delta }})
        </div>
      </div>

      <!-- 改进建议 -->
      <div class="mt-8 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <h3 class="text-xl font-semibold mb-4 text-center text-blue-300">
          优先改进项
        </h3>
        <div class="space-y-3">
          <div
            v-for="item in result.suggestions"
            :key="item.index"
            class="bg-white/5 rounded-lg p-4 border border-white/10"
          >
            <span class="font-semibold text-blue-300">{{ item.index }}. {{ item.label }}</span>
            <span class="text-white/70"> - {{ item.suggestion }}</span>
          </div>
        </div>
      </div>

      <!-- 重新评分按钮 -->
      <button
        @click="restart"
        class="w-full py-3 px-6 rounded-lg font-semibold transition-all bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl mt-6"
      >
        重新评分
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 自定义滑块样式 */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: none;
  transition: all 0.2s ease;
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

/* Firefox 滑轨样式 */
.slider::-moz-range-track {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  height: 0.75rem;
}
</style>
