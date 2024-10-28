<script setup lang="ts">
import { provideAuth } from '@/contexts/use-auth'
import { useRoute } from 'vue-router'

const route = useRoute()

const gitHubCode = route.query.code as string

provideAuth(gitHubCode)
</script>

<template>
  <slot />
</template>
