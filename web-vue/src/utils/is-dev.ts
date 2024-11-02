import { env } from '@/types'

const isDev = env.VITE_DEV_MODE === 'development'

export { isDev }
