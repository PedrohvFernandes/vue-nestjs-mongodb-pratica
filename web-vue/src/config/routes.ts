export default {
  comments: {
    default: {
      source: {
        path: '/',
        routeFragment: '/',
        next: {},
      },
      notFound: '*',
    },
    comments: {
      path: '/comments',
      routeFragment: '/comments',
      next: {},
    },
  },
}
