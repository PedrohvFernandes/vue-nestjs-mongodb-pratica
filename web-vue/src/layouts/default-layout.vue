<script setup lang="ts">
import { ConfigRoutes } from '@/config'
</script>

<template>
  <div class="flex flex-col h-screen">
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-2xl">Default Layout</h1>
      <nav class="flex gap-2">
        <RouterLink :to="ConfigRoutes.comments.default.source.path"
          >Home</RouterLink
        >
        <RouterLink :to="ConfigRoutes.comments.comments.path"
          >Comments</RouterLink
        >
      </nav>
    </header>
    <main class="flex-1 p-4">
      <!-- 
        Com essa tag ela vai renderizar o componente que está na rota, ou seja, o componente que está na rota que o usuário está acessando. Ele renderiza por exemplo filhos de rotas aninhadas, ex: na rota / deve exibir conseguir pegar a /comments e outras rotas que vierem depois
       -->
      <RouterView />
    </main>
    <footer class="bg-gray-800 text-white p-4">
      <p>Footer</p>
    </footer>
  </div>
</template>
