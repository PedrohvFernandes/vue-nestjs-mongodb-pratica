<script setup lang="ts">
import {
  FooterDefault,
  // LoginHeader,
  LoggedHeader,
} from '@/components'
</script>

<template>
  <div class="flex flex-col justify-between min-h-screen pt-20">
    <LoggedHeader />
    <!-- <LoginHeader /> -->
    <!-- <main class="flex-1 flex flex-col justify-center px-4"> -->
    <!-- 
        Com essa tag ela vai renderizar o componente que está na rota, ou seja, o componente que está na rota que o usuário está acessando. Ele renderiza por exemplo filhos de rotas aninhadas, ex: na rota / deve exibir conseguir pegar a /comments e outras rotas que vierem depois
       -->
    <RouterView />
    <!-- </main> -->
    <FooterDefault />
  </div>
</template>
