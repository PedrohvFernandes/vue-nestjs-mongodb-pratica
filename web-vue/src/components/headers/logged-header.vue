<script setup lang="ts">
import { useAuth } from '@/contexts/use-auth'
import { DefaultHeader } from '.'
import { Menu, ItensLogged } from '@/components/menu'
import ButtonLogout from '../button-logout.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const { user, logout } = useAuth()

const width = ref(window.innerWidth)

const nameResize = () => {
  const name = user.value?.data.githubUser

  if (name) {
    if (width.value < 331) {
      return `${name.slice(0, 0)}` // Não exibe o nome
    }

    if (width.value < 340) {
      return `${name.slice(0, 1)}...` // Não exibe o nome
    }

    if (width.value < 377) {
      return `${name.slice(0, 3)}...` // Exibe até 4 letras seguidas de '...'
    }

    if (width.value < 372) {
      return `${name.slice(0, 6)}...` // Exibe até 6 letras seguidas de '...'
    }

    if (width.value < 425) {
      return `${name.slice(0, 8)}...` // Exibe até 8 letras seguidas de '...'
    }

    if (width.value < 768) {
      return `${name.slice(0, 10)}...` // Exibe até 10 letras seguidas de '...'
    } else return name // Retorna o nome completo para telas maiores
  }
}

// Atualize o width quando a janela for redimensionada
const updateWidth = () => {
  width.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<template>
  <DefaultHeader>
    <template #itens-menu>
      <ItensLogged class="hidden lg:flex" />
      <Menu>
        <ItensLogged />
      </Menu>
    </template>
    <div class="flex items-center gap-2">
      <p class="text-xs sm:text-sm md:text-md lg:text-lg font-bold">
        {{ nameResize() }}
      </p>
      <ButtonLogout :logout="logout" />
    </div>
  </DefaultHeader>
</template>
