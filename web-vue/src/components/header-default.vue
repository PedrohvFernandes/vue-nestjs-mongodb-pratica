<script setup lang="ts">
import { ConfigRoutes } from '@/config'
import { IconCommentComponent } from '@/assets/icons'
import { RouterLink } from 'vue-router'
import { cn } from '@/lib'
</script>

<template>
  <header class="w-full bg-primary p-4 flex flex-col gap-2 fixed">
    <div class="flex gap-2">
      <IconCommentComponent class="size-10" />
      <h1 class="text-2xl font-bold uppercase tracking-widest">Comments</h1>
    </div>

    <nav class="flex gap-2">
      <RouterLink
        :to="ConfigRoutes.comments.default.source.path"
        :class="
          cn(
            'font-medium hover:underline',
            $route.path === ConfigRoutes.comments.default.source.path
              ? 'text-primary-foreground opacity-60'
              : 'text-primary-foreground',
          )
        "
        >Home</RouterLink
      >
      <RouterLink
        :to="ConfigRoutes.comments.comments.path"
        :class="
          cn(
            'font-medium hover:underline',
            $route.path === ConfigRoutes.comments.comments.path
              ? 'text-primary-foreground opacity-60'
              : 'text-primary-foreground',
          )
        "
        >Comments</RouterLink
      >
    </nav>
  </header>
</template>
