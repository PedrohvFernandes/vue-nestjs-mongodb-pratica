import { LocalStorageAdapter } from '@/infra/local-storage-adapter'

export function makeLocalStorageAdapter(): LocalStorageAdapter {
  return new LocalStorageAdapter()
}
