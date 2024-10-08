import { createWebHistory, createRouter } from 'vue-router'
// https://router.vuejs.org/guide/
import { ConfigRoutes } from './config'
import { Comments } from './pages/comments'
import { Home } from './pages/home'
import { NotFound } from './pages/not-found'

const routes = [
  {
    path: ConfigRoutes.comments.default.source.path,
    name: ConfigRoutes.comments.default.source.name,
    component: Home,
  },
  {
    path: ConfigRoutes.comments.comments.path,
    name: ConfigRoutes.comments.comments.name,
    component: Comments,
  },
  {
    path: ConfigRoutes.comments.default.notFound.pathMatch,
    name: ConfigRoutes.comments.default.notFound.name,
    component: NotFound,
  },
  {
    path: ConfigRoutes.comments.default.notFound.next.pathMatch,
    name: ConfigRoutes.comments.default.notFound.next.name,
    component: NotFound,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
