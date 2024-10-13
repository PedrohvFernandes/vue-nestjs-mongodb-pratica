<script setup lang="ts">
import {
  BlueHighlightedSpan,
  BottomLine,
  CardComment,
  Logo,
} from '@/components'
import { Button } from '@/components/ui/button'
import { ConfigBases } from '@/config'
import { ExternalLinkIcon, GithubIcon } from 'lucide-vue-next'
</script>

<template>
  <main
    class="flex-1 flex flex-col lg:flex-row items-center justify-center gap-16 p-6"
  >
    <div
      class="flex flex-col items-center lg:items-start gap-2 max-w-[520px] text-center lg:text-left"
    >
      <Logo />
      <strong
        class="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight mt-12"
      >
        Crie sua conta e comece a compartilhar
        <BlueHighlightedSpan variant="notAnimated"
          >curiosidades
        </BlueHighlightedSpan>
        🙂‍↔️
      </strong>

      <BottomLine
        variant-bottom="bottom12"
        variant-color-bottom="colorTertiary"
        variant-opacity="opacity100"
        class="mt-10"
      >
        <Button
          href="{signInUrl}"
          class="flex justify-center items-center gap-2 p-6 rounded font-bold"
          variant="secondary"
        >
          <GithubIcon />
          Faça login com GitHub
        </Button>
      </BottomLine>

      <BottomLine
        variant-bottom="bottom12"
        variant-color-bottom="colorTertiary"
        variant-opacity="opacity100"
      >
        <Button
          class="flex justify-center items-center gap-2 p-6 rounded font-bold"
          :as-child="true"
          variant="ghost"
        >
          <a
            :href="ConfigBases.comments.gitHub.baseUrls.link"
            :target="ConfigBases.comments.gitHub.target.blank"
          >
            <GithubIcon />
            Crie sua conta no GitHub
            <ExternalLinkIcon class="size-5" />
          </a>
        </Button>
      </BottomLine>
    </div>

    <CardComment
      id="1"
      comment="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in."
      created-at="2021-09-01T00:00:00Z"
      github-user="Seu usuário do GitHub"
      title="Titulo do comentário"
      updated-at="2021-09-01T00:00:00Z"
      username="Seu nome"
    />
  </main>
</template>
