<script setup lang="ts">
import { ConfigBases } from '@/config'

import useGetDateFormatted from '@/utils/get-date-formatted'

import { BottomLine } from '.'
import { IconCommentComponent } from '@/assets/icons'
import { Github } from 'lucide-vue-next'

const { formattedCurrentYear } = useGetDateFormatted()
</script>

<template>
  <footer
    className="w-full bg-primary ring-1 ring-primary-foreground/25 p-5 text-xs md:text-base"
  >
    <div className="container flex items-center justify-between gap-2">
      <div className="flex items-center opacity-70 gap-2">
        <IconCommentComponent />
        <span className="font-bold ">
          © {{ formattedCurrentYear().year }}
          <span class="tracking-widest">Comments</span> Inc.
        </span>
      </div>
      <BottomLine variant-color-bottom="colorBottomPrimaryForeground">
        <a
          className="flex items-center gap-2"
          :target="ConfigBases.comments.gitHub.target.blank"
          :href="ConfigBases.comments.gitHub.baseUrls.perfil"
        >
          <Github />
          <span>Meu GitHub</span>
        </a>
      </BottomLine>
    </div>
  </footer>
</template>
