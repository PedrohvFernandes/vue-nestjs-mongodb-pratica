import { toast } from '@/components/ui/toast'
import { AuthRequest, AuthResponse } from '../types'
import { api } from '@/lib'
import { ConfigRoutes } from '@/config'
import { errorMessage } from '@/utils/error-message'

export async function getUser({
  codeGitHub,
}: AuthRequest): Promise<AuthResponse> {
  try {
    const { data } = await api.get<AuthResponse>(
      ConfigRoutes.comments.backend.user.auth({ codeGitHub }),
    )

    toast({
      title: 'Usuário autenticado com sucesso',
      description: `Bem-vindo, ${data.data.githubUser}!`,
      variant: 'success',
    })

    return data
  } catch (error) {
    const err = errorMessage(error)

    toast({
      title: 'Erro ao autenticar usuário',
      description: err,
      variant: 'destructive',
    })

    throw error
  }
}

export const userQueryKey = {
  one: ['user'],
  all: ['users'],
  auth: (codeGithub: string | null) => [
    ...userQueryKey.one,
    'auth',
    { codeGithub },
  ],
}

export const TEN_HOURS_IN_MS_TIME_AUTH_USER = 10 * 60 * 60 * 1000

// dois minutos, so para testar o refresh token
export const TWO_MINUTES_IN_MS_TIME_AUTH_USER = 2 * 60 * 1000
