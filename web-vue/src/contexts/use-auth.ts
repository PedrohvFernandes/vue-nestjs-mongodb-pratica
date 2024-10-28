// import {
//   getUser,
//   keyUser,
//   TEN_HOURS_IN_MS_TIME_AUTH_USER,
// } from '@/http/get-user'
// import { AuthContext, AuthResponse } from '@/types'
// import { useQuery } from '@tanstack/vue-query'
// import {
//   computed,
//   inject,
//   onMounted,
//   provide,
//   reactive,
//   watchEffect,
// } from 'vue'
// import { useRouter } from 'vue-router'

// // Define o estado reativo para autenticação
// const authState = reactive<{
//   user: AuthResponse | null
//   tokenExpiration: number | null
// }>({
//   user: null,
//   tokenExpiration: null,
// })

// // Carregar o cache do localStorage se estiver dentro do tempo de expiração
// const loadCache = () => {
//   // User cacheado
//   const cachedUser = localStorage.getItem('auth_user')
//   // Token de expiração cacheado Data + 10 horas
//   const cachedExpiration = localStorage.getItem('auth_tokenExpiration')
//   // Se Existir o user cacheado e a expiração do token e a data atual for menor que a expiração do token, então carrega o usuário e a expiração do token. Se não, remove o usuário e a expiração do token do localStorage
//   if (cachedUser && cachedExpiration && Date.now() < Number(cachedExpiration)) {
//     authState.user = JSON.parse(cachedUser)
//     authState.tokenExpiration = Number(cachedExpiration)
//   } else {
//     localStorage.removeItem('auth_user')
//     localStorage.removeItem('auth_tokenExpiration')
//   }
// }

// // Função do provedor de autenticação
// export const useAuthProvider = (codeGitHub: string | null): AuthContext => {
//   const router = useRouter()

//   // Carregar cache ao montar. Toda vez que chamarmos o useAuth, ele vai chamar o useAuthProvider via context e assim chama o loadCache, com isso ele valida se o usuário está autenticado ou não e se o token expirou ou não.
//   onMounted(() => loadCache())

//   // A reatividade é usada para que o estado de autenticação seja reativo. A requisição so acontece se o codeGitHub existir, em enabled: !!codeGitHub
//   // Realiza a consulta para obter o usuário
//   const { data, isError, isLoading } = useQuery<AuthResponse>({
//     queryKey: [keyUser, { codeGitHub }], // Chave da consulta
//     queryFn: () => getUser({ codeGitHub }),
//     enabled: !!codeGitHub,
//     staleTime: TEN_HOURS_IN_MS_TIME_AUTH_USER,
//     gcTime: TEN_HOURS_IN_MS_TIME_AUTH_USER,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//     refetchOnReconnect: false,
//   })

//   // Observa mudanças em data e isError
//   watchEffect(() => {
//     try {
//       // Se houver um valor em data, atualiza o estado de autenticação
//       if (data.value) {
//         authState.user = data.value
//         // Define a expiração do token para 10 horas. Pegando a data atual e somando 10 horas em milissegundos
//         authState.tokenExpiration = Date.now() + TEN_HOURS_IN_MS_TIME_AUTH_USER
//         localStorage.setItem('auth_user', JSON.stringify(data.value))
//         localStorage.setItem(
//           'auth_tokenExpiration',
//           String(authState.tokenExpiration),
//         )
//         // Limpa a query da URL
//         router.replace({ query: {} })
//       } else if (isError.value) {
//         // Se houver um erro, limpa o estado de autenticação
//         authState.user = null
//         authState.tokenExpiration = null
//         localStorage.removeItem('auth_user')
//         localStorage.removeItem('auth_tokenExpiration')
//         router.replace({ query: {} })
//       }
//     } catch (error) {
//       console.error('Erro ao observar mudanças na autenticação:', error)
//     }
//   })
//   // Computa se o usuário está autenticado
//   const hasTokenExpired = () => {
//     // Se não houver expiração do token, retorna verdadeiro
//     if (!authState.tokenExpiration) return true
//     // Se a data atual for maior que a expiração do token, retorna verdadeiro, ou seja, ele expirou, porque a data é maior que o token de expiração
//     return Date.now() > authState.tokenExpiration
//   }
//   // se o token expirou, limpa o usuário e a expiração do token
//   const isAuthenticated = computed(() => !hasTokenExpired())

//   // const isAuthenticated = computed(() => {
//   //   if (!authState.tokenExpiration) return false
//   //   const hasTokenExpired = Date.now() > authState.tokenExpiration
//   //   if (hasTokenExpired) {
//   //     authState.user = null // Limpa o usuário se o token expirou
//   //     authState.tokenExpiration = null // Limpa a expiração do token
//   //     return false
//   //   }
//   //   return true
//   // })

//   // Retorna o estado de autenticação
//   return {
//     // Retorna o usuário, se autenticado, com computed, para que seja reativo
//     user: computed(() => authState.user),
//     isAuthenticated,
//     isLoading,
//   }
// }

// // Aqui de fato o contexto de autenticação é criado e fornecido para a aplicação
// // Símbolo do contexto de autenticação
// const authContextSymbol = Symbol('authContext')

// // Função para fornecer o contexto de autenticação
// export const provideAuth = (codeGitHub: string) => {
//   const auth = useAuthProvider(codeGitHub)
//   // O provide é usado para fornecer um valor para um símbolo de contexto. provide para disponibilizar o contexto authContextSymbol.
//   provide(authContextSymbol, auth)
// }

// // Função para usar o contexto de autenticação
// export const useAuth = (): AuthContext => {
//   // O inject é usado para acessar um valor de um símbolo de contexto. inject para acessar o contexto authContextSymbol.  Recupera o contexto usando inject
//   const auth = inject(authContextSymbol) as AuthContext
//   if (!auth) {
//     throw new Error('Auth context not found')
//   }
//   return auth
// }

// Mesmo codigo do que o de cima, so que mais orgnaizado e com comentarios para melhor entendimento
import { ConfigRoutes } from '@/config'
import {
  getUser,
  keyUser,
  TEN_HOURS_IN_MS_TIME_AUTH_USER,
} from '@/http/get-user'
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

// Define o estado reativo para autenticação
const authState = reactive<{
  user: AuthResponse | null
  tokenExpiration: number | null
}>({
  user: null,
  tokenExpiration: null,
})

// Função para carregar o cache de autenticação do localStorage. Se tem carrega o usuário e a expiração do token, se não, remove o usuário e a expiração do token do localStorage caso exista
const loadCache = () => {
  // User cacheado
  const cachedUser = localStorage.getItem('auth_user')
  // Token de expiração cacheado Data + 10 horas
  const cachedExpiration = localStorage.getItem('auth_tokenExpiration')
  // Se Existir o user cacheado e a expiração do token e a data atual for menor que a expiração do token, então carrega o usuário e a expiração do token. Se não, não vai atribuir nada ao authState.user e authState.tokenExpiration e remove o usuário e a expiração do token do localStorage em clearAuthCache
  if (cachedUser && cachedExpiration && Date.now() < Number(cachedExpiration)) {
    authState.user = JSON.parse(cachedUser)
    authState.tokenExpiration = Number(cachedExpiration)
  }
  // Se o token expirou, limpa o cache de autenticação caso exista, se o usuario ja tinha logado alguma vez
  if (hasTokenExpired()) {
    clearAuthCache()
  }
}

// Função para salvar as informações de autenticação no localStorage
const saveAuthToCache = (user: AuthResponse, expiration: number) => {
  // localStorage.setItem('auth_user', JSON.stringify(user))
  // localStorage.setItem('auth_tokenExpiration', String(expiration))
  setAuthUserAdapter(user, expiration)
}

// Função para limpar o cache de autenticação do localStorage
const clearAuthCache = () => {
  // localStorage.removeItem('auth_user')
  // localStorage.removeItem('auth_tokenExpiration')
  removeAuthUserAdapter()
  authState.user = null
  authState.tokenExpiration = null
}

// Função para verificar se o token expirou
// Computa se o usuário está autenticado
const hasTokenExpired = () => {
  return authState.tokenExpiration
    ? // Se a data atual for maior que a expiração do token, retorna verdadeiro, ou seja, ele expirou, porque a data é maior que o token de expiração
      Date.now() > authState.tokenExpiration
    : // Se não houver expiração do token, retorna verdadeiro
      true
}

//   // const isAuthenticated = computed(() => {
//   //   if (!authState.tokenExpiration) return false
//   //   const hasTokenExpired = Date.now() > authState.tokenExpiration
//   //   if (hasTokenExpired) {
//   //     authState.user = null // Limpa o usuário se o token expirou
//   //     authState.tokenExpiration = null // Limpa a expiração do token
//   //     return false
//   //   }
//   //   return true
//   // })

// Função para observar mudanças em `data` e `isError`
const observeAuthChanges = (
  data: Ref<AuthResponse | undefined>,
  isError: Ref<boolean>,
  router: ReturnType<typeof useRouter>,
  isLoggingOut: Ref<boolean, boolean>,
) => {
  // Observa mudanças em data e isError
  watchEffect(() => {
    if (isLoggingOut.value) return // Se estiver fazendo logout, não faz nada
    // Limpa a query da URL, no caso codeGitHub, o estado da autenticação, ou seja, o code e o erro que podem vim na url quando cancelamos o login ou autenticamos o login no github
    router.replace({ query: {} })
    try {
      // Se houver um valor em data, atualiza o estado de autenticação
      if (data.value) {
        console.log('data.value:', data.value)
        authState.user = data.value
        // Define a expiração do token para 10 horas. Pegando a data atual e somando 10 horas em milissegundos
        authState.tokenExpiration = Date.now() + TEN_HOURS_IN_MS_TIME_AUTH_USER
        // Salva as informações de autenticação no localStorage(cache)
        saveAuthToCache(data.value, authState.tokenExpiration)
        router.push(ConfigRoutes.comments.default.source.path)
      } else if (isError.value) {
        // Se houver um erro
        clearAuthCache()
      }
    } catch (error) {
      console.error('Erro ao observar mudanças na autenticação:', error)
    }
  })
}

// Função do provedor de autenticação. A função principal que gerencia a autenticação
export const useAuthProvider = (codeGitHub: string | null): AuthContext => {
  const router = useRouter()

  // Carregar cache ao montar. Toda vez que chamarmos o useAuth, ele vai chamar o useAuthProvider via context e assim chama o loadCache, com isso ele valida se o usuário está autenticado ou não e se o token expirou ou não.
  onMounted(loadCache)

  const isLoggingOut = ref(false) // Variável de controle de logout

  // A reatividade é usada para que o estado de autenticação seja reativo. A requisição so acontece se o codeGitHub existir, em enabled: !!codeGitHub
  // Realiza a consulta para obter o usuário
  const { data, isError, isLoading } = useQuery<AuthResponse>({
    queryKey: [keyUser, { codeGitHub }],
    queryFn: () => getUser({ codeGitHub }),
    enabled: !!codeGitHub,
    staleTime: TEN_HOURS_IN_MS_TIME_AUTH_USER,
    gcTime: TEN_HOURS_IN_MS_TIME_AUTH_USER,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  // Observar mudanças na autenticação, se o usuário tentar se autenticar, e existir um código do GitHub, ele vai observar as mudanças em data e isError
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  codeGitHub && observeAuthChanges(data, isError, router, isLoggingOut)

  // Computa se o usuário está autenticado, so pra saber se o usuário está autenticado ou não, um boolean
  const isAuthenticated = computed(() => !hasTokenExpired())

  const logout = () => {
    isLoggingOut.value = true // Ativa o controle de logout
    clearAuthCache() // Limpa o cache e estado de autenticação

    // Redireciona para a página de login
    router.push(ConfigRoutes.comments.login.path)
  }

  // Retorna o estado de autenticação
  return {
    // Retorna o usuário, se autenticado, com computed, para que seja reativo
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
export const useAuth = (): AuthContext => {
  // O inject é usado para acessar um valor de um símbolo de contexto. inject para acessar o contexto authContextSymbol.  Recupera o contexto usando inject
  const auth = inject(authContextSymbol) as AuthContext
  if (!auth) {
    throw new Error('Auth context not found')
  }
  return auth
}
