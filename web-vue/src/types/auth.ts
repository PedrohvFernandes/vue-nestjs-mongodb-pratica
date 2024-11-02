import { ComputedRef, Ref } from 'vue'

interface AuthResponse {
  data: {
    githubUser: string
    username: string
    userId: string
    // accessToken: string // Não vou usar o accessToken por enquanto aqui no front, não acho seguro
  }
}

interface AuthRequest {
  codeGitHub: string | null
}

interface AuthContext {
  user: ComputedRef<AuthResponse | null>
  isAuthenticated: ComputedRef<boolean>
  isLoading: Ref<false, false> | Ref<true, true> | Ref<boolean, boolean>
  logout(): void
}

interface AuthCache {
  authUser: AuthResponse
  authTokenExpiration: number
}

export type { AuthResponse, AuthRequest, AuthContext, AuthCache }
