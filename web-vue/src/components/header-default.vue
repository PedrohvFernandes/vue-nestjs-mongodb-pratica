<script setup lang="ts">
import { ConfigRoutes } from '@/config'
import { IconCommentComponent } from '@/assets/icons'
import { Slash } from 'lucide-vue-next'
import { ItemMenuLink } from '.'
</script>

<template>
  <header
    class="w-full fixed top-0 z-10 p-4 backdrop-blur-sm bg-primary/30 ring-1 ring-primary-foreground/25 shadow-lg drop-shadow-lg"
  >
    <div className="container flex items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <IconCommentComponent class="size-10" />
        <Slash class="text-primary-foreground/25" />
        <h1 class="text-2xl font-bold uppercase tracking-widest">Comments</h1>
      </div>

      <nav class="flex gap-2">
        <ItemMenuLink
          :to="ConfigRoutes.comments.default.source.path"
          :name="ConfigRoutes.comments.default.source.name"
        />
        <ItemMenuLink
          :to="ConfigRoutes.comments.comments.path"
          :name="ConfigRoutes.comments.comments.name"
        />
      </nav>
    </div>
  </header>
</template>
