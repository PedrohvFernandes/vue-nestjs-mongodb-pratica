import { ConfigBases } from '@/config'
import axios from 'axios'

export const api = axios.create({
  baseURL: ConfigBases.comments.baseUrls.comments_api_pre_fix,
  headers: {
    'Content-Type': 'application/json',
  },
})
