import { env } from '@/types'

const isDev = env.VITE_ENVIRONMENT === 'development'

export { isDev }
