import { env } from '@/types'
import { isDev } from '@/utils'

export default {
  comments: {
    baseUrls: {
      apiProduction: isDev
        ? env.VITE_API_COMMENTS_TEST
        : env.VITE_API_COMMENTS_LIVE,
    },
    gitHub: {
      baseUrls: {
        perfil: 'https://github.com/PedrohvFernandes',
        repositories: 'https://github.com/PedrohvFernandes?tab=repositories',
        link: 'https://github.com/',
      },
      target: {
        blank: '_blank',
        parent: '_parent',
      },
    },
  },
}
