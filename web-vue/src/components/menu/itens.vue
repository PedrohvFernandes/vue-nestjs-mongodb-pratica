<script setup lang="ts">
import { cn } from '@/lib'

interface IProps {
  class?: string
}

const props = defineProps<IProps>()
</script>

<template>
  <div :class="cn('flex flex-wrap items-center gap-2', props.class)">
    <slot />
  </div>
</template>
