<script setup lang="ts">
import { ConfigRoutes } from '@/config'
import { ItemMenuLink } from '..'
import { cn } from '@/lib'

interface IProps {
  class?: string
}

const props = defineProps<IProps>()
</script>

<template>
  <div :class="cn('flex flex-wrap items-center gap-2', props.class)">
    <ItemMenuLink
      :to="ConfigRoutes.comments.default.source.path"
      :name="ConfigRoutes.comments.default.source.name"
    />
    <ItemMenuLink
      :to="ConfigRoutes.comments.comments.path"
      :name="ConfigRoutes.comments.comments.name"
    />
  </div>
</template>
