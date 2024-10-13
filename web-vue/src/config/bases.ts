import { env } from '@/types'
import { isDev } from '@/utils'

export default {
  comments: {
    baseUrls: {
      apiProduction: isDev
        ? (env.VITE_API_COMMENTS_TEST as string) // Como ela pode ser null/undefined em produção, eu preciso fazer um cast para string, para não dar problema de tipagem no axios.create
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
