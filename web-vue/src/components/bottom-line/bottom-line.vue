<!--
  Podemos ter varios scripts no mesmo componente, mas somente um com a tag setup. Não é preciso da tag script para conseguir exportar o componente do vue
-->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { spanVariants, type SpanVariants } from '.'
import { cn } from '@/lib'

interface Props extends PrimitiveProps {
  variantBottom?: SpanVariants['variantBottom']
  variantColorBottom?: SpanVariants['variantColorBottom']
  variantOpacity?: SpanVariants['variantOpacity']
  variantHoverBefore?: SpanVariants['variantHoverBefore']
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
        spanVariants({
          variantBottom,
          variantColorBottom,
          variantOpacity,
          variantHoverBefore,
        }),
        props.class,
      )
    "
  >
    <!-- 
      Ele recebe o conteudo que está dentro do componente e coloca no lugar do slot
    -->
    <slot />
  </Primitive>
</template>
