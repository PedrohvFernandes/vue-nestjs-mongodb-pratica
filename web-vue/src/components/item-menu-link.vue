<script setup lang="ts">
import { cn } from '@/lib'
import { RouterLink } from 'vue-router'

interface IProps {
  to: string
  name: string
  class?: string
}

const props = defineProps<IProps>()
</script>

<template>
  <RouterLink
    :to="to"
    :class="
      cn(
        'font-medium hover:underline',
        $route.path === to
          ? 'text-primary-foreground underline opacity-60'
          : 'text-primary-foreground',
        props.class,
      )
    "
    >{{ name }}</RouterLink
  >
</template>
