import { ConfigBases } from '@/config'
import axios from 'axios'

export const api = axios.create({
  baseURL: ConfigBases.comments.baseUrls.apiProduction,
})
