<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { Route } from '.'
import { getAuthUserAdapter } from '@/adapter/current-account-adapter'
import { ConfigRoutes } from '@/config'

const authUser = getAuthUserAdapter()
const route = useRouter()

if (!authUser.authTokenExpiration) {
  route.push(ConfigRoutes.comments.login.path)
}
</script>

<template>
  <Route>
    <RouterView />
  </Route>
</template>
