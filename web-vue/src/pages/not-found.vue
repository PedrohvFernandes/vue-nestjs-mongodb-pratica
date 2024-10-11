<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ConfigRoutes } from '@/config'
</script>

<script lang="ts">
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goHome() {
      this.$router.push(ConfigRoutes.comments.default.source.path)
    },
  },
}
</script>

<template>
  <div
    className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center lg:flex-row flex-col gap-16"
  >
    <div className="animate-pulse w-52 lg:w-96">
      <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="fundo do 404" />
      <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt="404" />
    </div>
    <div className="xl:pt-24 w-full xl:w-1/2  pb-12 lg:pb-0">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="my-2 text-foreground font-bold text-2xl">
          Oops! Página não encontrada
        </h1>
        <p className="my-2 text-foreground">
          Parece que você encontrou a porta para o grande nada
        </p>
        <div className="flex flex-col items-center">
          <Button @click="goHome" variant="secondary">
            Voltar para a página inicial
          </Button>
          <p className="my-2 text-foreground font-bold text-2xl">ou</p>
          <Button @click="goBack" variant="secondary">
            Voltar para a página anterior
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
