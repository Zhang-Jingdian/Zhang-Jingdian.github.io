import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Tag } from './Tag.vue'

export const tagVariants = cva(
  'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-1',
  {
    variants: {
      variant: {
        default:
          'bg-neutral-100 text-neutral-600 hover:bg-neutral-900 hover:text-white',
        outline:
          'border border-neutral-200 bg-transparent text-neutral-600 hover:border-neutral-900 hover:bg-neutral-50',
        ghost: 'bg-transparent text-neutral-400',
        counter: 'bg-neutral-100 text-neutral-400 pointer-events-none',
      },
      interactive: {
        true: 'cursor-pointer',
        false: 'cursor-default',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: true,
    },
  }
)

export type TagVariants = VariantProps<typeof tagVariants>
