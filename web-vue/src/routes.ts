import { createWebHistory, createRouter } from 'vue-router'
// https://router.vuejs.org/guide/
import { ConfigRoutes } from './config'
import { Comments } from './pages/comments'
import { Home } from './pages/home'

const routes = [
  {
    path: ConfigRoutes.comments.default.source.path,
    component: Home,
  },
  {
    path: ConfigRoutes.comments.comments.path,
    component: Comments,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
