<script setup lang="ts">
import { Primitive, PrimitiveProps } from 'radix-vue'
import { HTMLAttributes } from 'vue'
import { cn } from '@/lib'
import { SpanVariants, spanVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: SpanVariants['variant']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'span',
})
</script>

<template>
  <!-- 
    as -> é o elemento que será renderizado, por padrão é um span
    as-child -> é um booleano que define se o elemento será renderizado como filho de outro elemento. Ex: se esse span tiver uma tag <a></a> dentro dele e passarmos as-child="true", o span será renderizado como filho do elemento <a></a> . Igual no React
  -->
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(spanVariants({ variant }), props.class)"
  >
    <slot />
  </Primitive>
</template>
