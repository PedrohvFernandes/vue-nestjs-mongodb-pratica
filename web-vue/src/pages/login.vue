<script setup lang="ts">
import {
  BlueHighlightedSpan,
  BottomLine,
  CardComment,
  Logo,
} from '@/components'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { ConfigBases } from '@/config'
import { useAuth } from '@/contexts/use-auth'
import { cn } from '@/lib'
import { ExternalLinkIcon, GithubIcon, LoaderCircle } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const signInUrl = `https://github.com/login/oauth/authorize?client_id=${ConfigBases.comments.gitHub.oauth.clientId}`

const { isLoading } = useAuth()

const route = useRoute()

toast({
  title: 'Bem-vindo!',
  description:
    'Faça login com sua conta do GitHub para começar a compartilhar curiosidades.',
  variant: 'success',
})

if (route.query.error) {
  toast({
    title: 'Você cancelou o login!',
    description: 'Para continuar, faça login com sua conta do GitHub.',
    variant: 'destructive',
  })
}
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
      <div class="flex flex-col gap-2 items-center">
        <BottomLine
          variant-bottom="bottom12"
          variant-color-bottom="colorTertiary"
          variant-opacity="opacity100"
          class="mt-10"
        >
          <Button
            class="p-6 rounded font-bold flex"
            variant="secondary"
            :disabled="isLoading"
            :as-child="true"
          >
            <a
              :href="signInUrl"
              :class="cn({ 'pointer-events-none opacity-50': isLoading })"
            >
              <LoaderCircle
                v-if="isLoading"
                class="size-5 animate-spin"
                aria-hidden="true"
              />

              <span v-else class="flex justify-center items-center gap-2"
                ><GithubIcon /> Faça login com o GitHub</span
              >
            </a>
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
              :aria-disabled="true"
            >
              <GithubIcon />
              Crie sua conta no GitHub
              <ExternalLinkIcon class="size-5" />
            </a>
          </Button>
        </BottomLine>
      </div>
    </div>

    <CardComment
      :comment="{
        _id: '1',
        comment: {
          title: { title: 'Titulo do comentário' },
          content: {
            content:
              'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in.',
          },
          createdAt: '2021-09-01T00:00:00Z',
          updatedAt: '2021-09-01T00:00:00Z',
          userId: 'user1',
        },
      }"
      :user="{
        _id: 'user1',
        user: {
          githubUser: 'Seu usuário do GitHub',
          username: 'Seu nome',
        },
      }"
    />
  </main>
</template>
