import { cva, type VariantProps } from 'class-variance-authority'

export { default as MovieScore } from './MovieScore.vue'

/**
 * 评分系统配置参数
 */
export interface MovieScoreConfig {
  // 电影默认权重
  weights: {
    form: number        // 形权重 (w_f)
    substance: number   // 神权重 (w_u)
    originality: number // 创新权重 (w_o)
    enjoyment: number   // 体验权重 (w_e)
  }
  
  // 形内部权重
  formWeights: {
    visual: number  // 视觉权重 (a_v)
    sound: number   // 音效权重 (a_s)
    style: number   // 风格权重 (a_t)
  }
  
  // 神内部权重
  substanceWeights: {
    characters: number // 人物权重 (b_c)
    plot: number       // 剧情权重 (b_p)
    worldview: number  // 世界观权重 (b_w)
  }
  
  // 不确定度参数
  uncertainty: {
    prior: number  // 先验不确定度 (delta_prior)
    min: number    // 最小不确定度 (delta_min)
    max: number    // 最大不确定度 (delta_max)
  }
}

/**
 * 默认配置
 */
export const defaultConfig: MovieScoreConfig = {
  weights: {
    form: 0.35,
    substance: 0.45,
    originality: 0.10,
    enjoyment: 0.10,
  },
  formWeights: {
    visual: 0.5,
    sound: 0.2,
    style: 0.3,
  },
  substanceWeights: {
    characters: 0.4,
    plot: 0.35,
    worldview: 0.25,
  },
  uncertainty: {
    prior: 0.75,
    min: 0.4,
    max: 2.0,
  },
}

/**
 * 评分步骤配置
 */
export interface RatingStep {
  id: number
  title: string
  description: string
  formulas?: {
    title: string
    content: string
    description: string
  }[]
  items: {
    id: string
    label: string
    key: keyof RatingData
  }[]
}

/**
 * 评分数据类型
 */
export interface RatingData {
  visual: number
  sound: number
  style: number
  characters: number
  plot: number
  worldview: number
  originality: number
  enjoyment: number
}

/**
 * 评分步骤数据
 */
export const ratingSteps: RatingStep[] = [
  {
    id: 1,
    title: '视觉评分',
    description: '画面质量、摄影技巧、特效水平',
    formulas: [
      {
        title: '形 (Form) 计算公式',
        content: 'F = a_v × V + a_s × S + a_t × T',
        description: '其中：V = 视觉, S = 音效, T = 风格',
      },
    ],
    items: [
      { id: 'visual', label: '视觉', key: 'visual' },
    ],
  },
  {
    id: 2,
    title: '音效评分',
    description: '配乐、音效设计、配音质量',
    items: [
      { id: 'sound', label: '音效', key: 'sound' },
    ],
  },
  {
    id: 3,
    title: '风格评分',
    description: '导演风格、剪辑、美术设计',
    items: [
      { id: 'style', label: '风格', key: 'style' },
    ],
  },
  {
    id: 4,
    title: '综合评分',
    description: '人物、剧情、世界观、创新性、观影体验',
    formulas: [
      {
        title: '神 (Substance) 计算公式',
        content: 'U = b_c × C + b_p × P + b_w × W',
        description: '其中：C = 人物, P = 剧情, W = 世界观',
      },
      {
        title: '基础总分计算公式',
        content: 'Base = w_f × F + w_u × U + w_o × O + w_e × E',
        description: '其中：F = 形, U = 神, O = 创新性, E = 观影体验',
      },
    ],
    items: [
      { id: 'characters', label: '人物塑造', key: 'characters' },
      { id: 'plot', label: '剧情', key: 'plot' },
      { id: 'worldview', label: '世界观', key: 'worldview' },
      { id: 'originality', label: '创新性', key: 'originality' },
      { id: 'enjoyment', label: '观影体验', key: 'enjoyment' },
    ],
  },
]

/**
 * 等级判定
 */
export const gradeThresholds = [
  { min: 9.0, label: '杰作 (A+)' },
  { min: 8.0, label: '优秀 (A)' },
  { min: 7.0, label: '良好 (B)' },
  { min: 6.0, label: '及格 (C)' },
  { min: 0, label: '不及格 (D/F)' },
]

/**
 * 改进建议文案
 */
export const improvementSuggestions: Record<keyof RatingData, string> = {
  visual: '提升画面质量、摄影技巧和特效水平',
  sound: '改进配乐、音效设计和配音质量',
  style: '加强导演风格、剪辑和美术设计',
  characters: '深化角色发展，使角色更加立体',
  plot: '增强情节连贯性和深度',
  worldview: '丰富背景设定，使世界观更加完整',
  originality: '增加原创元素，避免套路化',
  enjoyment: '提升整体观影感受和情感共鸣',
}

/**
 * 评分系统样式变体
 */
export const movieScoreVariants = cva(
  'w-full max-w-4xl mx-auto p-6 rounded-2xl shadow-2xl backdrop-blur-lg',
  {
    variants: {
      theme: {
        default: 'bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-indigo-900/80 border border-white/20',
        light: 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 border border-gray-200',
        dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700',
      },
    },
    defaultVariants: {
      theme: 'default',
    },
  }
)

export type MovieScoreVariants = VariantProps<typeof movieScoreVariants>
