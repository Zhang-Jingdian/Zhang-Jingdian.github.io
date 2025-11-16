import { cva } from 'class-variance-authority'

export { default as KanaQuizClient } from './KanaQuizClient.vue'

/**
 * 假名数据类型
 */
export interface Kana {
  hiragana: string  // 平假名
  katakana: string  // 片假名
  romaji: string    // 罗马音
}

/**
 * 完整的五十音图数据
 */
export const kanaData: Kana[] = [
  // あ行
  { hiragana: 'あ', katakana: 'ア', romaji: 'a' },
  { hiragana: 'い', katakana: 'イ', romaji: 'i' },
  { hiragana: 'う', katakana: 'ウ', romaji: 'u' },
  { hiragana: 'え', katakana: 'エ', romaji: 'e' },
  { hiragana: 'お', katakana: 'オ', romaji: 'o' },
  
  // か行
  { hiragana: 'か', katakana: 'カ', romaji: 'ka' },
  { hiragana: 'き', katakana: 'キ', romaji: 'ki' },
  { hiragana: 'く', katakana: 'ク', romaji: 'ku' },
  { hiragana: 'け', katakana: 'ケ', romaji: 'ke' },
  { hiragana: 'こ', katakana: 'コ', romaji: 'ko' },
  
  // さ行
  { hiragana: 'さ', katakana: 'サ', romaji: 'sa' },
  { hiragana: 'し', katakana: 'シ', romaji: 'shi' },
  { hiragana: 'す', katakana: 'ス', romaji: 'su' },
  { hiragana: 'せ', katakana: 'セ', romaji: 'se' },
  { hiragana: 'そ', katakana: 'ソ', romaji: 'so' },
  
  // た行
  { hiragana: 'た', katakana: 'タ', romaji: 'ta' },
  { hiragana: 'ち', katakana: 'チ', romaji: 'chi' },
  { hiragana: 'つ', katakana: 'ツ', romaji: 'tsu' },
  { hiragana: 'て', katakana: 'テ', romaji: 'te' },
  { hiragana: 'と', katakana: 'ト', romaji: 'to' },
  
  // な行
  { hiragana: 'な', katakana: 'ナ', romaji: 'na' },
  { hiragana: 'に', katakana: 'ニ', romaji: 'ni' },
  { hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu' },
  { hiragana: 'ね', katakana: 'ネ', romaji: 'ne' },
  { hiragana: 'の', katakana: 'ノ', romaji: 'no' },
  
  // は行
  { hiragana: 'は', katakana: 'ハ', romaji: 'ha' },
  { hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi' },
  { hiragana: 'ふ', katakana: 'フ', romaji: 'fu' },
  { hiragana: 'へ', katakana: 'ヘ', romaji: 'he' },
  { hiragana: 'ほ', katakana: 'ホ', romaji: 'ho' },
  
  // ま行
  { hiragana: 'ま', katakana: 'マ', romaji: 'ma' },
  { hiragana: 'み', katakana: 'ミ', romaji: 'mi' },
  { hiragana: 'む', katakana: 'ム', romaji: 'mu' },
  { hiragana: 'め', katakana: 'メ', romaji: 'me' },
  { hiragana: 'も', katakana: 'モ', romaji: 'mo' },
  
  // や行
  { hiragana: 'や', katakana: 'ヤ', romaji: 'ya' },
  { hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu' },
  { hiragana: 'よ', katakana: 'ヨ', romaji: 'yo' },
  
  // ら行
  { hiragana: 'ら', katakana: 'ラ', romaji: 'ra' },
  { hiragana: 'り', katakana: 'リ', romaji: 'ri' },
  { hiragana: 'る', katakana: 'ル', romaji: 'ru' },
  { hiragana: 'れ', katakana: 'レ', romaji: 're' },
  { hiragana: 'ろ', katakana: 'ロ', romaji: 'ro' },
  
  // わ行
  { hiragana: 'わ', katakana: 'ワ', romaji: 'wa' },
  { hiragana: 'を', katakana: 'ヲ', romaji: 'wo' },
  { hiragana: 'ん', katakana: 'ン', romaji: 'n' },
]

/**
 * 测试模式
 */
export type QuizMode = 'hiragana-to-romaji' | 'katakana-to-romaji' | 'romaji-to-hiragana' | 'romaji-to-katakana'

export const quizModeLabels: Record<QuizMode, string> = {
  'hiragana-to-romaji': '平假名 → 罗马音',
  'katakana-to-romaji': '片假名 → 罗马音',
  'romaji-to-hiragana': '罗马音 → 平假名',
  'romaji-to-katakana': '罗马音 → 片假名',
}

/**
 * 测试统计
 */
export interface QuizStats {
  correct: number
  wrong: number
  total: number
  accuracy: number
}

/**
 * 组件样式变体
 */
export const kanaQuizVariants = cva(
  'w-full max-w-4xl mx-auto p-8 rounded-lg border transition-all',
  {
    variants: {
      theme: {
        default: 'bg-white border-neutral-200 shadow-lg',
        dark: 'bg-neutral-900 border-neutral-800 shadow-lg',
      },
    },
    defaultVariants: {
      theme: 'default',
    },
  }
)
