<script setup lang="ts">
import { cn } from '@/lib'
import { RouterLink } from 'vue-router'
import { BottomLine } from './bottom-line'

interface IProps {
  to: string
  name: string
  class?: string
}

const props = defineProps<IProps>()
</script>

<template>
  <BottomLine
    variant-color-bottom="colorBottomPrimaryForeground"
    variant-hover-before="beforeEmpty"
    variant-opacity="opacity60"
    :class="
      cn(
        'flex-1 font-medium',
        $route.path === to && 'before:w-full opacity-100 pointer-events-none',
        // ? 'before:w-full opacity-100 pointer-events-none'
        // : 'opacity-60',
        props.class,
      )
    "
  >
    <RouterLink :to="props.to">
      {{ props.name }}
    </RouterLink>
  </BottomLine>
</template>
