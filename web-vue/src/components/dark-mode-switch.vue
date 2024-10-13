<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-vue-next'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <Button variant="secondary" @click="toggleDark()" class="flex-1">
    <!-- v-if e v-else tipo um ternario -->
    <Moon v-if="isDark" class="size-5" />
    <Sun v-else class="size-5" />
    <!-- Da para fazer ternario assim -->
    <!-- {{ isDark ? '🌙' : '☀️' }} -->
  </Button>
</template>
