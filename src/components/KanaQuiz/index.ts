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
  
  // 浊音 - が行
  { hiragana: 'が', katakana: 'ガ', romaji: 'ga' },
  { hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi' },
  { hiragana: 'ぐ', katakana: 'グ', romaji: 'gu' },
  { hiragana: 'げ', katakana: 'ゲ', romaji: 'ge' },
  { hiragana: 'ご', katakana: 'ゴ', romaji: 'go' },
  
  // 浊音 - ざ行
  { hiragana: 'ざ', katakana: 'ザ', romaji: 'za' },
  { hiragana: 'じ', katakana: 'ジ', romaji: 'ji' },
  { hiragana: 'ず', katakana: 'ズ', romaji: 'zu' },
  { hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze' },
  { hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo' },
  
  // 浊音 - だ行
  { hiragana: 'だ', katakana: 'ダ', romaji: 'da' },
  { hiragana: 'ぢ', katakana: 'ヂ', romaji: 'di' },
  { hiragana: 'づ', katakana: 'ヅ', romaji: 'du' },
  { hiragana: 'で', katakana: 'デ', romaji: 'de' },
  { hiragana: 'ど', katakana: 'ド', romaji: 'do' },
  
  // 浊音 - ば行
  { hiragana: 'ば', katakana: 'バ', romaji: 'ba' },
  { hiragana: 'び', katakana: 'ビ', romaji: 'bi' },
  { hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu' },
  { hiragana: 'べ', katakana: 'ベ', romaji: 'be' },
  { hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo' },
  
  // 半浊音 - ぱ行
  { hiragana: 'ぱ', katakana: 'パ', romaji: 'pa' },
  { hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi' },
  { hiragana: 'ぷ', katakana: 'プ', romaji: 'pu' },
  { hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe' },
  { hiragana: 'ぽ', katakana: 'ポ', romaji: 'po' },
  
  // 拗音 - きゃ行
  { hiragana: 'きゃ', katakana: 'キャ', romaji: 'kya' },
  { hiragana: 'きゅ', katakana: 'キュ', romaji: 'kyu' },
  { hiragana: 'きょ', katakana: 'キョ', romaji: 'kyo' },
  
  // 拗音 - しゃ行
  { hiragana: 'しゃ', katakana: 'シャ', romaji: 'sha' },
  { hiragana: 'しゅ', katakana: 'シュ', romaji: 'shu' },
  { hiragana: 'しょ', katakana: 'ショ', romaji: 'sho' },
  
  // 拗音 - ちゃ行
  { hiragana: 'ちゃ', katakana: 'チャ', romaji: 'cha' },
  { hiragana: 'ちゅ', katakana: 'チュ', romaji: 'chu' },
  { hiragana: 'ちょ', katakana: 'チョ', romaji: 'cho' },
  
  // 拗音 - にゃ行
  { hiragana: 'にゃ', katakana: 'ニャ', romaji: 'nya' },
  { hiragana: 'にゅ', katakana: 'ニュ', romaji: 'nyu' },
  { hiragana: 'にょ', katakana: 'ニョ', romaji: 'nyo' },
  
  // 拗音 - ひゃ行
  { hiragana: 'ひゃ', katakana: 'ヒャ', romaji: 'hya' },
  { hiragana: 'ひゅ', katakana: 'ヒュ', romaji: 'hyu' },
  { hiragana: 'ひょ', katakana: 'ヒョ', romaji: 'hyo' },
  
  // 拗音 - みゃ行
  { hiragana: 'みゃ', katakana: 'ミャ', romaji: 'mya' },
  { hiragana: 'みゅ', katakana: 'ミュ', romaji: 'myu' },
  { hiragana: 'みょ', katakana: 'ミョ', romaji: 'myo' },
  
  // 拗音 - りゃ行
  { hiragana: 'りゃ', katakana: 'リャ', romaji: 'rya' },
  { hiragana: 'りゅ', katakana: 'リュ', romaji: 'ryu' },
  { hiragana: 'りょ', katakana: 'リョ', romaji: 'ryo' },
  
  // 拗音浊音 - ぎゃ行
  { hiragana: 'ぎゃ', katakana: 'ギャ', romaji: 'gya' },
  { hiragana: 'ぎゅ', katakana: 'ギュ', romaji: 'gyu' },
  { hiragana: 'ぎょ', katakana: 'ギョ', romaji: 'gyo' },
  
  // 拗音浊音 - じゃ行
  { hiragana: 'じゃ', katakana: 'ジャ', romaji: 'ja' },
  { hiragana: 'じゅ', katakana: 'ジュ', romaji: 'ju' },
  { hiragana: 'じょ', katakana: 'ジョ', romaji: 'jo' },
  
  // 拗音浊音 - びゃ行
  { hiragana: 'びゃ', katakana: 'ビャ', romaji: 'bya' },
  { hiragana: 'びゅ', katakana: 'ビュ', romaji: 'byu' },
  { hiragana: 'びょ', katakana: 'ビョ', romaji: 'byo' },
  
  // 拗音半浊音 - ぴゃ行
  { hiragana: 'ぴゃ', katakana: 'ピャ', romaji: 'pya' },
  { hiragana: 'ぴゅ', katakana: 'ピュ', romaji: 'pyu' },
  { hiragana: 'ぴょ', katakana: 'ピョ', romaji: 'pyo' },
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
 * 难度级别
 */
export type DifficultyLevel = 'basic' | 'dakuten' | 'yoon' | 'all'

export const difficultyLabels: Record<DifficultyLevel, string> = {
  'basic': '基础（清音）',
  'dakuten': '浊音/半浊音',
  'yoon': '拗音',
  'all': '全部',
}

export const difficultyDescriptions: Record<DifficultyLevel, string> = {
  'basic': '46个基础假名（あ～ん）',
  'dakuten': '浊音（が～ぼ）+ 半浊音（ぱ～ぽ）',
  'yoon': '拗音（きゃ～ぴょ）',
  'all': '全部假名（104个）',
}

/**
 * 根据难度获取假名数据
 */
export function getKanaByDifficulty(difficulty: DifficultyLevel): Kana[] {
  const basicCount = 46
  const dakutenCount = 71 // 基础 + 浊音/半浊音
  
  switch (difficulty) {
    case 'basic':
      return kanaData.slice(0, basicCount)
    case 'dakuten':
      return kanaData.slice(basicCount, dakutenCount)
    case 'yoon':
      return kanaData.slice(dakutenCount)
    case 'all':
      return kanaData
    default:
      return kanaData.slice(0, basicCount)
  }
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
