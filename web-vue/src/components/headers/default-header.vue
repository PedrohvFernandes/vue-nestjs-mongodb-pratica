<script setup lang="ts">
import { DarkModeSwitch, Logo } from '..'
</script>

<template>
  <!-- 
   class="w-full fixed top-0 z-10 p-4 backdrop-blur-sm bg-primary/30 ring-1 ring-primary-foreground/25 shadow-lg drop-shadow-lg"
  -->
  <header
    class="w-full fixed top-0 z-10 p-4 backdrop-blur-sm bg-primary/30 shadow-lg drop-shadow-lg"
  >
    <div className="container flex items-center justify-between gap-2">
      <Logo />
      <nav class="flex items-center justify-center gap-2">
        <!-- 
          Se colocarmos o nome no slot, podemos passar um template dentro do template pai com a propriedade #nomeDoSlot(ex: #itens-menu) dentro do componente filho que recebe esse DefaultHeader, dessa forma esse slot com o mesmo nome do template pai, vai renderizar nesse slot somente o que esta nesse template. Ex: no logged-header e login-header que usa esse componente default-header, como componente padrão e dentro dele passamos um template com #nomeDoSlot(ex: #itens-menu), com isso, nesse slot, vai renderizar somente o que esta nesse template com esse nome https://vuejs.org/guide/components/slots.html#named-slots
        -->
        <div class="flex items-center justify-center gap-2">
          <slot name="itens-menu" />
        </div>
        <DarkModeSwitch class="hidden lg:flex" />
      </nav>

      <!-- 
        Aqui vai vim o que vier de restante por exemplo no logged-header, onde pegamos esse default-header como pai e passamos o template com o #itens-menu e o conteudo que queremos renderizar nesse slot abaixo.
      -->
      <slot />
    </div>
    <!-- 
      O que da o brilho no meio é o bg-gradient-to-r e via-primary-foreground que tem a cor diferente do bg-primary/5 e to-primary/5.  O to e bg tem que ter a mesma cor do bg do header, para dar o efeito de escuro no inicio e no final do header, e no meio o brilho, ou seja, uma cor mais forte, no via. Formando então um degradê(gradiente) de cores.
    -->
    <div
      class="fixed bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/5 to-primary/5 via-primary-foreground"
    ></div>
  </header>
</template>
