import { ConfigRoutes } from '@/config'
import { getUser, TEN_HOURS_IN_MS_TIME_AUTH_USER, userQueryKey } from '@/http'
import { AuthContext, AuthResponse } from '@/types'
import { useQuery } from '@tanstack/vue-query'
import {
  computed,
  inject,
  onMounted,
  provide,
  reactive,
  ref,
  Ref,
  watchEffect,
} from 'vue'
import { useRouter } from 'vue-router'
import {
  removeAuthUserAdapter,
  setAuthUserAdapter,
} from '@/adapter/current-account-adapter'

// Estado de Autenticação Centralizado
const authState = reactive<{
  user: AuthResponse | null
  tokenExpiration: number | null
}>({
  user: null,
  tokenExpiration: null,
})

// Função que carrega as informações de autenticação do cache local
// Essa função é executada ao montar o componente e verifica
// se há um usuário autenticado armazenado e se o token ainda não expirou.
const loadCache = () => {
  // Usuario cacheado
  const cachedUser = localStorage.getItem('auth_user')
  const cachedExpiration = localStorage.getItem('auth_tokenExpiration')

  // Se houver um usuário autenticado e o token ainda não tiver expirado, carrega o cache e inicializa o estado de autenticação
  if (cachedUser && cachedExpiration && Date.now() < Number(cachedExpiration)) {
    authState.user = JSON.parse(cachedUser)
    authState.tokenExpiration = Number(cachedExpiration)
    return true // Token válido
  } else {
    clearAuthCache()
    return false // Token expirado ou inexistente
  }
}

// Salvar informações de autenticação no cache local
// Essa função armazena o usuário autenticado e a data de expiração do token
// no cache, usando adaptadores para gerenciar o armazenamento. atualiza diretamente authState, mantendo o estado em sincronia com o cache local.
const saveAuthToCache = (user: AuthResponse, expiration: number) => {
  setAuthUserAdapter(user, expiration)
  authState.user = user
  authState.tokenExpiration = expiration
}

// Limpar cache de autenticação
// Essa função remove o usuário autenticado e a expiração do token do cache
// quando a sessão do usuário expira ou é encerrada manualmente.
const clearAuthCache = () => {
  removeAuthUserAdapter()
  authState.user = null
  authState.tokenExpiration = null
}

// Verificar expiração do token
// Computa se o usuário está autenticado, so pra saber se o usuário está autenticado ou não, um boolean
const isAuthenticated = computed(() =>
  // Se houver um token de expiração, verifica se o token ainda não expirou, vendo se a data atual é menor que a data de expiração do token, e ela for menor, o token ainda não expirou(true), se for maior, o token expirou(false)
  authState.tokenExpiration ? Date.now() < authState.tokenExpiration : false,
)

// Função para redirecionar com parâmetros preservados
const redirectWithParams = (
  router: ReturnType<typeof useRouter>,
  path: string,
) => {
  const queryParams = { ...router.currentRoute.value.query }
  router.push({ path, query: queryParams })
}

// Observação de mudanças na autenticação com redirecionamento após expiração do token
// A função observa alterações nos dados de autenticação e, com base nos dados
// recebidos e no status do erro, atualiza o estado do usuário ou limpa o cache.
const observeAuthChanges = (
  data: Ref<AuthResponse | undefined>,
  isError: Ref<boolean>,
  router: ReturnType<typeof useRouter>,
  isLoggingOut: Ref<boolean>,
) => {
  watchEffect(() => {
    if (isLoggingOut.value) return

    // Limpa a query da URL, no caso codeGitHub, o estado da autenticação, ou seja, o code e o erro que podem vim na url quando cancelamos o login ou autenticamos o login no github. Se deixar aqui vai limpar todas as urls da aplicação, onde usar o useAuth, por conta do watchEffect
    // router.replace({ query: {} })

    try {
      // Se houver um valor em data, atualiza o estado de autenticação
      if (data.value) {
        // Limpa apenas o parâmetro codeGitHub sem afetar outros parâmetros da URL
        // router.replace({
        //   query: { ...router.currentRoute.value.query, code: undefined },
        // })
        router.replace({ query: {} })

        authState.user = data.value
        // Define a expiração do token para 10 horas. Pegando a data atual e somando 10 horas em milissegundos
        authState.tokenExpiration = Date.now() + TEN_HOURS_IN_MS_TIME_AUTH_USER
        // Salva as informações de autenticação no localStorage(cache)
        saveAuthToCache(data.value, authState.tokenExpiration)
        // Redireciona para a rota desejada preservando os parâmetros
        redirectWithParams(router, ConfigRoutes.comments.default.source.path)
      } else if (isError.value || !isAuthenticated.value) {
        console.log('Token expirado ou erro ao autenticar')
        clearAuthCache()
        redirectWithParams(router, ConfigRoutes.comments.login.path)
        // router.replace({
        //   query: {
        //     ...router.currentRoute.value.query,
        //     error: undefined,
        //     error_description: undefined,
        //   },
        // })
        router.replace({ query: {} })
      }
    } catch (error) {
      console.error('Erro ao observar mudanças na autenticação:', error)
    }
  })
}

// Função do provedor de autenticação
// `useAuthProvider` é responsável por configurar o estado inicial de autenticação,
// verificar o cache ao montar o componente, e definir o comportamento para autenticação do usuário
export const useAuthProvider = (codeGitHub: string | null): AuthContext => {
  const router = useRouter()
  const isLoggingOut = ref(false)

  onMounted(() => {
    const isTokenValid = loadCache()
    // Somente redireciona se o token estiver inválido
    if (!isTokenValid) {
      router.push(ConfigRoutes.comments.login.path)
    }
  })

  // Realiza consulta para verificar o status de autenticação do usuário no GitHub
  // A reatividade é usada para que o estado de autenticação seja reativo. A requisição so acontece se o codeGitHub existir, em enabled: !!codeGitHub
  const { data, isError, isLoading } = useQuery<AuthResponse>({
    queryKey: userQueryKey.auth(codeGitHub),
    queryFn: () => getUser({ codeGitHub }),
    enabled: !!codeGitHub,
    staleTime: TEN_HOURS_IN_MS_TIME_AUTH_USER,
    gcTime: TEN_HOURS_IN_MS_TIME_AUTH_USER,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  // Inicia a observação das mudanças de autenticação se o codeGitHub estiver presente
  if (codeGitHub) {
    observeAuthChanges(data, isError, router, isLoggingOut)
  }

  // Redireciona para a página de login e limpa o cache
  const logout = () => {
    isLoggingOut.value = true
    clearAuthCache()
    router.push(ConfigRoutes.comments.login.path)
  }

  return {
    user: computed(() => authState.user),
    isAuthenticated,
    isLoading,
    logout,
  }
}

// Aqui de fato o contexto de autenticação é criado e fornecido para a aplicação
// Símbolo do contexto de autenticação
const authContextSymbol = Symbol('authContext')

// Função para fornecer o contexto de autenticação
export const provideAuth = (codeGitHub: string) => {
  const auth = useAuthProvider(codeGitHub)
  // O provide é usado para fornecer um valor para um símbolo de contexto. provide para disponibilizar o contexto authContextSymbol e fornecer o contexto de autenticação para a aplicação.
  provide(authContextSymbol, auth)
}

// Função para usar o contexto de autenticação --> const { user } = useAuth(). Lembrando que a camada acima dele de um componente deve ter o provideAuth
// O inject é usado para acessar um valor de um símbolo de contexto. inject para acessar o contexto authContextSymbol.  Recupera o contexto usando inject
export const useAuth = (): AuthContext => {
  const auth = inject(authContextSymbol) as AuthContext
  if (!auth) {
    throw new Error('Auth context not found')
  }
  return auth
}
