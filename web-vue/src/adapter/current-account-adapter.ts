import { makeLocalStorageAdapter } from '@/factories/local-storage-adapter-factory'

import { AuthCache } from '@/types'

export const setAuthUserAdapter = (
  user: AuthCache['authUser'],
  expiration: AuthCache['authTokenExpiration'],
): void => {
  makeLocalStorageAdapter().set('auth_user', JSON.stringify(user))
  makeLocalStorageAdapter().set('auth_tokenExpiration', String(expiration))
}

export const getAuthUserAdapter = (): AuthCache => {
  return {
    authUser: makeLocalStorageAdapter().get('auth_user'),
    authTokenExpiration: makeLocalStorageAdapter().get('auth_tokenExpiration'),
  }
}

export const removeAuthUserAdapter = (): void => {
  makeLocalStorageAdapter().set('auth_user', null)
  makeLocalStorageAdapter().set('auth_tokenExpiration', null)
}

export const isAuthUserAdapter = (): boolean => {
  return !!makeLocalStorageAdapter().get('auth_user')
}
