<script setup lang="ts">
import { ConfigRoutes } from '@/config'
import { Itens } from '.'
import { ItemMenuLink } from '..'
import { cn } from '@/lib'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <Itens :class="cn(props.class)">
    <ItemMenuLink
      :to="ConfigRoutes.comments.default.source.path"
      :name="ConfigRoutes.comments.default.source.name"
    />
    <ItemMenuLink
      :to="ConfigRoutes.comments.comments.path"
      :name="ConfigRoutes.comments.comments.name"
    />
  </Itens>
</template>
