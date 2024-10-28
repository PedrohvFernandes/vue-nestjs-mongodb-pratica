import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
// https://router.vuejs.org/guide/
import { ConfigRoutes } from './config'
import { Comments, Home, Login, NotFound } from './pages'
import { DefaultLayoutLoggedIn, DefaultLayoutLoggedOut } from './layouts'
import { PrivateRoute, PublicRoute } from '@/components'

const routes: Array<RouteRecordRaw> = [
  {
    path: ConfigRoutes.comments.default.source.path,
    component: PrivateRoute,
    children: [
      {
        path: ConfigRoutes.comments.default.source.path,
        component: DefaultLayoutLoggedIn,
        children: [
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
        ],
      },
    ],
  },
  {
    path: ConfigRoutes.comments.login.path,
    component: PublicRoute,
    children: [
      {
        path: ConfigRoutes.comments.login.path,
        component: DefaultLayoutLoggedOut,
        children: [
          {
            path: ConfigRoutes.comments.login.path,
            name: ConfigRoutes.comments.login.name,
            component: Login,
          },
        ],
      },
    ],
  },
  {
    path: ConfigRoutes.comments.default.notFound.pathMatch,
    name: ConfigRoutes.comments.default.notFound.name,
    component: NotFound,
    // redirect: ConfigRoutes.comments.login.path,
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
