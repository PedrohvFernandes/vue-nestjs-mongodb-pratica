import { env } from '@/types'

export default {
  comments: {
    baseUrls: {
      comments_api: env.VITE_API_COMMENTS,
      comments_api_pre_fix: `${env.VITE_API_COMMENTS}${env.VITE_PRE_FIX}`,
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

      oauth: {
        clientId: env.VITE_GITHUB_CLIENT_ID,
        clientSecret: env.VITE_GITHUB_CLIENT_SECRET,
      },
    },
  },
}
