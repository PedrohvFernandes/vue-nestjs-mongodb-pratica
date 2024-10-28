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
      :to="ConfigRoutes.comments.login.path"
      :name="ConfigRoutes.comments.login.name"
    />
  </Itens>
</template>
