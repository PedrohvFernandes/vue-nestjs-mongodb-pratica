import { cva, VariantProps } from 'class-variance-authority'

export { default as BlueHighlightedSpan } from './blue-highlighted-span.vue'

export const spanVariants = cva(
  'text-tertiary underline underline-offset-3 decoration-4 md:decoration-8 decoration-blue-400',
  {
    variants: {
      variant: {
        default: 'animate-pulse',
        notAnimated: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type SpanVariants = VariantProps<typeof spanVariants>
