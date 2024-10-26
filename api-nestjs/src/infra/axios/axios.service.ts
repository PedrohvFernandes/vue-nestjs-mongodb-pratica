import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { AppConfigService } from '@src/app-config/app-config.service'
import { AxiosResponse } from 'axios'

@Injectable()
export class AxiosService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly httpService: HttpService,
    private readonly config: AppConfigService
  ) {}

  // Dessa forma esta retornando genericamente, ou seja, eu defino o tipo de retorno no momento que eu chamo o método, mas o metodo toPromise() esta depreciado
  // async get<T>(url: string, config?: any): Promise<AxiosResponse<T>> {
  //   const { data } = await this.httpService.get(url, config).toPromise()

  //   return data
  // }

  // Dessa forma esta retornando genericamente, ou seja, eu defino o tipo de retorno no momento que eu chamo o método
  async get<T>(url: string, config?: any): Promise<AxiosResponse<T>> {
    return this.httpService.axiosRef
      .get(url, config)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(
          err?.message + ': ' + JSON.stringify(err?.response?.data)
        )
      })
  }

  async post<T>(
    url: string,
    data: any,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return this.httpService.axiosRef
      .post(url, data, config)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(
          err?.message + ': ' + JSON.stringify(err?.response?.data)
        )
      })
  }

  async put<T>(
    url: string,
    data: any,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return this.httpService.axiosRef
      .put(url, data, config)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(
          err?.message + ': ' + JSON.stringify(err?.response?.data)
        )
      })
  }

  async resolveTokenJWT(accessToken: string): Promise<{
    githubUser: string
    username: string
  }> {
    const { data } = await this.httpService.axiosRef.get<{
      data: {
        githubUser: string
        username: string
      }
    }>(`${this.config.apiComments}${this.config.preFix}/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const { githubUser, username } = data.data

    return {
      githubUser,
      username
    }
  }

  // Ou se quiser padronizar fixamente o retorno, ex: Ele sempre vai retornar um array de Cat
  // findAll(): Observable<AxiosResponse<Cat[]>> {
  //   return this.httpService.get('http://localhost:3000/cats')
  // }
}
