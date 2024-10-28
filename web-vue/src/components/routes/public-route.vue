<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { Route } from '.'
import { getAuthUserAdapter } from '@/adapter/current-account-adapter'
import { ConfigRoutes } from '@/config'

const authUser = getAuthUserAdapter()
const route = useRouter()

if (authUser.authTokenExpiration) {
  route.push(ConfigRoutes.comments.default.source.path)
}
</script>

<template>
  <Route>
    <RouterView />
  </Route>
</template>
