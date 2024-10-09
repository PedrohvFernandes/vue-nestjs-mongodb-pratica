import { cva, VariantProps } from 'class-variance-authority'

export { default as BottomLine } from './bottom-line.vue'

export const spanVariants = cva(
  "transition-all duration-500 ease-in-out before:content-[''] before:w-0 before:h-[3px] before:relative before:-left-0 before:block before:transition-width before:duration-500 before:ease-in-out before:hover:w-full",
  {
    variants: {
      variantOpacity: {
        default: 'opacity-70 hover:opacity-100',
        opacity100: 'opacity-100',
      },
      variantBottom: {
        default: 'before:-bottom-6',
        bottom10: 'before:-bottom-10',
      },
      variantColorBottom: {
        default: 'before:bg-primary',
        colorBottomPrimaryForeground: 'before:bg-primary-foreground',
        colorForeground: 'before:bg-foreground',
      },
    },
    defaultVariants: {
      variantOpacity: 'default',
      variantBottom: 'default',
      variantColorBottom: 'default',
    },
  },
)

export type SpanVariants = VariantProps<typeof spanVariants>
