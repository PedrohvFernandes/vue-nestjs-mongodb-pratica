<script setup lang="ts">
import { formattedDate } from '@/utils'

interface IProps {
  date: string
}

defineProps<IProps>()
</script>

<template>
  <span className="capitalize">{{ formattedDate(date) }}</span>
</template>
