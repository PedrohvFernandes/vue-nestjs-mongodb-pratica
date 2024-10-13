<script setup lang="ts">
import { Skeleton } from './ui/skeleton'
</script>

<template>
  <div class="relative p-2">
    <Skeleton
      class="h-[210px] w-[600x] rounded bg-primary-foreground ring ring-primary-foreground/25 drop-shadow-lg"
    />
    <Skeleton class="h-[32px] w-[32px] absolute top-6 right-6 rounded-full" />

    <Skeleton
      class="h-[30px] w-[160px] lg:w-[200px] absolute top-6 left-6 rounded"
    />

    <Skeleton class="h-[20px] w-[200px] absolute top-20 left-6 rounded" />
    <Skeleton
      class="h-[50px] w-[240px] md:w-[180px] lg:w-[280px] sm:w-[450px] absolute top-28 md:left-6 rounded"
    />

    <Skeleton
      class="h-[20px] w-[100px] absolute top-44 right-24 sm:right-72 md:right-6 rounded"
    />
  </div>
</template>
