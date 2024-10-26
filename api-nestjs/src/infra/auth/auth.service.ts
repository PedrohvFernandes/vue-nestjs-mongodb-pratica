import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AppConfigService } from '@src/app-config/app-config.service'
import { AxiosService } from '@src/infra/axios/axios.service'
import { User } from '@src/application/entities/user'

@Injectable()
export class AuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: AppConfigService,
    private readonly axiosService: AxiosService
  ) {}

  // Função para validar o token do usuário
  async validateToken(githubUser: string): Promise<{
    githubUser: string
    username: string
    accessToken: string
  } | null> {
    const tokenResponse = await this.axiosService.get<{
      token: {
        accessToken: string
      }
      messageError?: string
    }>(
      `${this.config.apiComments}${this.config.preFix}/users/accesstoken/${githubUser}`
    )
    // Se existe o token do usuario e se esta valido o token
    if (
      !tokenResponse.data.messageError &&
      tokenResponse.data &&
      tokenResponse.data.token.accessToken
    ) {
      // Certifica-se de que o token existe
      try {
        // Tenta validar o token existente
        this.jwtService.verify(tokenResponse.data.token.accessToken, {
          secret: this.config.jwtSecret,
          maxAge: '10h' // Define o tempo máximo de validade como 10 horas
        })
        // Resolve o token e retorna as informações do usuário
        const { githubUser, username } =
          await this.axiosService.resolveTokenJWT(
            tokenResponse.data.token.accessToken
          )

        // Se o token é válido, retorna o usuário com o token existente
        return {
          githubUser,
          username,
          accessToken: tokenResponse.data.token.accessToken
        }
      } catch (error) {
        // Se o token não é válido ou expirou, vamos atualizar o token
        error.message = 'Token expirado ou inválido. Gerando um novo token.'
        console.error(error)
        return {
          githubUser: null,
          username: null,
          accessToken: tokenResponse.data.token.accessToken
        }
      }
    }

    return null
  }

  // Função para gerar ou atualizar o token do usuário
  async generateOrUpdateToken(
    user: any,
    existingToken?: string
  ): Promise<{ githubUser: string; username: string; accessToken: string }> {
    // Da continuidade ao processo de autenticação
    // Se o token expirou ou o usuário não existe, cria um novo token e o usuário

    // Filtrando as informações que eu quero retornar pro usuário via token JWT, passa isso pro jwt sign que converte em token JWT
    // Ao fazer isso passamos o payload para o jwtService, que vai assinar esse payload e retornar um token JWT. Que na rota atualmente localhost:3333/api/v1/profile --> app.controller.ts valida o token e retorna as informações do usuário que estão no payload, que virou token JWT
    const payload = { githubUser: user.username, username: user.displayName }
    const accessToken = this.jwtService.sign(payload)

    const { githubUser, username } =
      await this.axiosService.resolveTokenJWT(accessToken)

    if (existingToken) {
      await this.axiosService.put(
        `${this.config.apiComments}${this.config.preFix}/users/${githubUser}`,
        {
          accessToken
        }
      )
    } else {
      await this.axiosService.post<User>(
        `${this.config.apiComments}${this.config.preFix}/users`,
        {
          githubUser,
          username,
          accessToken
        }
      )
    }

    return { githubUser, username, accessToken }
  }
}
