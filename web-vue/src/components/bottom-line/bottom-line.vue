<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { spanVariants, type SpanVariants } from '.'
import { cn } from '@/lib'

interface Props extends PrimitiveProps {
  variantBottom?: SpanVariants['variantBottom']
  variantColorBottom?: SpanVariants['variantColorBottom']
  variantOpacity?: SpanVariants['variantOpacity']
  class?: HTMLAttributes['class']
}

// withDefaults -> Define valores padrões
// defineProps -> Define as propriedades que o componente pode receber
const props = withDefaults(defineProps<Props>(), {
  as: 'span', // Valor padrão para a propriedade "as"
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        spanVariants({ variantBottom, variantColorBottom, variantOpacity }),
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
