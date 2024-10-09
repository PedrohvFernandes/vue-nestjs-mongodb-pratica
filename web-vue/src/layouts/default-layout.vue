<script setup lang="ts">
import { FooterDefault, HeaderDefault } from '@/components'
</script>

<template>
  <div class="flex flex-col min-h-screen pt-20">
    <HeaderDefault />
    <main class="flex-1 p-4">
      <!-- 
        Com essa tag ela vai renderizar o componente que está na rota, ou seja, o componente que está na rota que o usuário está acessando. Ele renderiza por exemplo filhos de rotas aninhadas, ex: na rota / deve exibir conseguir pegar a /comments e outras rotas que vierem depois
       -->
      <RouterView />
    </main>
    <FooterDefault />
  </div>
</template>
