import { cva, VariantProps } from 'class-variance-authority'

export { default as BottomLine } from './bottom-line.vue'

export const spanVariants = cva(
  "transition-all duration-500 ease-in-out before:content-[''] before:w-0 before:h-[3px] before:relative before:-left-0 before:block before:transition-width before:duration-500 before:ease-in-out rounded hover:opacity-100 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:opacity-60",
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
        bottom12: 'before:-bottom-12',
        bottom16: 'before:-bottom-16',
        bottom20: 'before:-bottom-20',
        bottom24: 'before:-bottom-24',
        bottom28: 'before:-bottom-28',
        bottom32: 'before:-bottom-32',
      },
      variantColorBottom: {
        default: 'before:bg-primary',
        colorBottomPrimaryForeground: 'before:bg-primary-foreground',
        colorForeground: 'before:bg-foreground',
        colorTertiary: 'before:bg-tertiary',
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
