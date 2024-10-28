/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStorage, SetStorage } from '@/data/cache'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: any) {
    if (!value) {
      localStorage.removeItem(key)
      return
    }
    localStorage.setItem(key, value)
  }

  get(key: string): any {
    const objAny = JSON.parse(localStorage.getItem(key) as string)
    return objAny
  }
}
