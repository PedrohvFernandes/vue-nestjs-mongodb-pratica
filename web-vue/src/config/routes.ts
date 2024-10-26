export default {
  comments: {
    default: {
      source: {
        path: '/',
        routeFragment: '/',
        next: {},
        name: 'Home',
      },
      // Esse pathMatch é um recurso do Vue 3 https://stackoverflow.com/questions/40193634/vue-router-redirect-on-page-not-found-404 https://router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes
      notFound: {
        pathMatch: '/:pathMatch(.*)*',
        routeFragment: '/:pathMatch(.*)*',
        name: 'NotFound',
        next: {
          pathMatch: '/:pathMatch(.*)',
          routeFragment: '/:pathMatch(.*)',
          name: 'BadNotFound',
        },
      },
    },
    comments: {
      path: '/comments',
      routeFragment: '/comments',
      next: {},
      name: 'Comments',
    },
    login: {
      path: '/login',
      routeFragment: '/login',
      next: {},
      name: 'Login',
    },
    backend: {
      comments(page: number, perPage: number) {
        // // Se for dev retorna a url com a paginação do JSON Server, senão retorna a url com paginação
        // return isDev
        //   ? `/comments?_page=${page}&_per_page=${perPage}` // Retorna a paginação do JSON Server
        //   : `/comments?page=${page}&per_page=${perPage}`

        // Como o nosso backend já está configurado para retornar a paginação correta, não precisamos mais dessa verificação. Porque antes usávamos o JSON Server para simular um backend, agora temos um backend real
        return `/comments?page=${page}&perPage=${perPage}`
      },
    },
  },
}
