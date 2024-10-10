<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Label, type LabelProps } from 'radix-vue'
import { cn } from '@/lib/utils'

interface IProps {
  class?: HTMLAttributes['class']
}

// const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()
const props = defineProps<LabelProps & IProps>()

// O computed é uma função que retorna um valor computado com base em outras propriedades reativas.
const delegatedProps = computed(() => {
  // ...delegated é um objeto que contém todas as propriedades de props, exceto a propriedade class. Tipo o spread operator do JavaScript. Ou react ...props ou ...rest.
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Label
    v-bind="delegatedProps"
    :class="
      cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>
