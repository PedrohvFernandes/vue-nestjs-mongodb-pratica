import { cva, VariantProps } from 'class-variance-authority'

export { default as BottomLine } from './bottom-line.vue'

export const spanVariants = cva(
  "transition-all duration-500 ease-in-out before:content-[''] before:w-0 before:h-[3px] before:relative before:-left-0 before:block before:transition-width before:duration-500 before:ease-in-out rounded hover:opacity-100",
  {
    variants: {
      variantOpacity: {
        default: 'opacity-70',
        opacity60: 'opacity-60',
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
      variantHoverBefore: {
        default: 'before:hover:w-full',
        beforeEmpty: 'before:w-0',
      },
      // variantBackground: {
      //   default:
      //     'p-1 bg-foreground hover:bg-primary-foreground hover:text-foreground before:bg-foreground',
      //   backgroundOutline: 'bg-transparent ring-1 ring-primary-foreground',
      // },
    },
    defaultVariants: {
      variantOpacity: 'default',
      variantBottom: 'default',
      variantColorBottom: 'default',
      variantHoverBefore: 'default',
    },
  },
)

export type SpanVariants = VariantProps<typeof spanVariants>
