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
  },
}
