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
    userId: string
  } | null> {
    // Verifica se o usuário já existe, se ele existe, retorna o token do usuário
    try {
      const tokenResponse = await this.axiosService.get<{
        token: {
          accessToken: string
          userId: string
        }
      }>(
        `${this.config.apiComments}${this.config.preFix}/users/accesstoken/${githubUser}`
      )

      // Se existe o usuario e se esta valido o token dele
      if (tokenResponse.data && tokenResponse.data.token.accessToken) {
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
            accessToken: tokenResponse.data.token.accessToken,
            userId: tokenResponse.data.token.userId
          }
        } catch (error) {
          // Se o token não é válido ou expirou, vamos atualizar o token
          error.message = 'Token expirado ou inválido. Gerando um novo token.'
          console.error(error)
          // Se o token não é valido, então retorna null o githubUser e o username, mas retorna o accessToken para atualizar o token que ja exsite do usuario para ser trocado por um novo token
          return {
            githubUser: null,
            username: null,
            userId: tokenResponse.data.token.userId,
            accessToken: tokenResponse.data.token.accessToken
          }
        }
      }
    } catch (error) {
      error.message = 'Usuário não encontrado. Gerando um novo token.'
      console.error(error)
      // Se não existe o usuario, não existe o token, então ele é novo no sistema, vamos criar ele e dar um token
      return {
        githubUser: null,
        username: null,
        userId: null,
        accessToken: null
      }
    }
  }

  // Função para gerar ou atualizar o token do usuário
  async generateOrUpdateToken(
    user: any,
    existingUser: {
      existingToken: string
      userId: string
    }
  ): Promise<{
    githubUser: string
    username: string
    accessToken: string
    userId: string
  }> {
    // Da continuidade ao processo de autenticação
    // Se o token expirou ou o usuário não existe, cria um novo token e o usuário

    // Filtrando as informações que eu quero retornar pro usuário via token JWT, passa isso pro jwt sign que converte em token JWT
    // Ao fazer isso passamos o payload para o jwtService, que vai assinar esse payload e retornar um token JWT. Que na rota atualmente localhost:3333/api/v1/profile --> app.controller.ts valida o token e retorna as informações do usuário que estão no payload, que virou token JWT
    const payload = { githubUser: user.username, username: user.displayName }
    const accessToken = this.jwtService.sign(payload)

    const { githubUser, username } =
      await this.axiosService.resolveTokenJWT(accessToken)

    // Se existe o token do usuario que não esta valido, atualiza o token e envia ele, e o seu id que ja exsite no banco de dados, se não, cria um novo usuario com o token, e pega o id do usuario criado
    if (existingUser && existingUser.existingToken) {
      await this.axiosService.put(
        `${this.config.apiComments}${this.config.preFix}/users/${githubUser}`,
        {
          accessToken
        }
      )

      return { githubUser, username, accessToken, userId: existingUser.userId }
    }

    if (!existingUser.existingToken) {
      const userCreated = await this.axiosService.post<User>(
        `${this.config.apiComments}${this.config.preFix}/users`,
        {
          githubUser,
          username,
          accessToken
        }
      )
      return { githubUser, username, accessToken, userId: userCreated.data.id }
    }
  }
}
