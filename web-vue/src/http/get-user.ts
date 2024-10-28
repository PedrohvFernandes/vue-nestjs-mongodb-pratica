import { toast } from '@/components/ui/toast'
import { AuthRequest, AuthResponse } from '../types'
import { api } from '@/lib'
import { ConfigRoutes } from '@/config'

export async function getUser({
  codeGitHub,
}: AuthRequest): Promise<AuthResponse> {
  try {
    const { data } = await api.get<AuthResponse>(
      ConfigRoutes.comments.backend.user.auth(codeGitHub),
    )

    toast({
      title: 'Usuário autenticado com sucesso',
      description: `Bem-vindo, ${data.data.githubUser}!`,
      variant: 'success',
    })

    return data
  } catch (error) {
    toast({
      title: 'Erro ao autenticar usuário',
      description: error instanceof Error ? error.message : String(error),
      variant: 'destructive',
    })
    return Promise.reject(
      new Error(error instanceof Error ? error.message : String(error)),
    )
  }
}

export const keyUser = 'user'

export const TEN_HOURS_IN_MS_TIME_AUTH_USER = 10 * 60 * 60 * 1000
