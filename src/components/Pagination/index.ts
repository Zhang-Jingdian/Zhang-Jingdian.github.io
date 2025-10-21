import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as PaginationButton } from './PaginationButton.vue'

export const paginationButtonVariants = cva(
  'rounded-lg px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border border-neutral-200 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900',
        active: 'bg-neutral-900 text-white',
        disabled: 'cursor-not-allowed border border-neutral-100 text-neutral-400',
        ghost: 'text-neutral-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type PaginationButtonVariants = VariantProps<typeof paginationButtonVariants>
