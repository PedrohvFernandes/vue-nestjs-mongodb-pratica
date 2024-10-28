import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '@src/infra/auth/auth.service'

@Controller('auth')
export class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly authService: AuthService) {}

  // Não precisamos escrever ?code... na URL, pois o passport-github já faz isso
  @Get('callback')
  @UseGuards(AuthGuard('github'))
  // async authCallback(@Req() req) {
  //   const user = req.user

  //   // Verifica se o usuário já existe
  //   const accessTokenExists = await this.axiosService.get<{
  //     accessToken: string
  //   }>(
  //     `${this.config.apiComments}${this.config.preFix}/users/accesstoken/${user.username}`
  //   )

  //   // Se existe o token do usuario e se esta valido o token
  //   if (accessTokenExists.data && accessTokenExists.data.accessToken) {
  //     // Certifica-se de que o token existe
  //     try {
  //       // Tenta validar o token existente
  //       this.jwtService.verify(accessTokenExists.data.accessToken, {
  //         secret: this.config.jwtSecret,
  //         maxAge: '10h' // Define o tempo máximo de validade como 10 horas
  //       })

  //       const { githubUser, username } =
  //         await this.axiosService.resolveTokenJWT(
  //           accessTokenExists.data.accessToken
  //         )

  //       // Se o token é válido, retorna o usuário com o token existente
  //       return {
  //         githubUser,
  //         username,
  //         accessToken: accessTokenExists.data.accessToken
  //       }
  //     } catch (error) {
  //       // Se o token não é válido ou expirou, vamos atualizar o token
  //       error.message = 'Token expirado ou inválido. Gerando um novo token.'
  //       console.error(error)
  //     }
  //   }

  //   // Da continuidade ao processo de autenticação
  //   // Se o token expirou ou o usuário não existe, cria um novo token e o usuário

  //   // Filtrando as informações que eu quero retornar pro usuário via token JWT, passa isso pro jwt sign que converte em token JWT
  //   // Ao fazer isso passamos o payload para o jwtService, que vai assinar esse payload e retornar um token JWT. Que na rota atualmente localhost:3333/api/v1/profile --> app.controller.ts valida o token e retorna as informações do usuário que estão no payload, que virou token JWT
  //   const payload = { githubUser: user.username, username: user.displayName }
  //   const accessToken = this.jwtService.sign(payload)

  //   const { githubUser, username } =
  //     await this.axiosService.resolveTokenJWT(accessToken)

  //   // Se o usuario ja existe, so atualiza o token
  //   if (accessTokenExists.data && accessTokenExists.data.accessToken) {
  //     // Atualiza o usuário com o novo token
  //     await this.axiosService.put(
  //       `${this.config.apiComments}${this.config.preFix}/users/${githubUser}`,
  //       { accessToken }
  //     )
  //   } else {
  //     // Se não cria um novo usuário com o token
  //     await this.axiosService.post<User>(
  //       `${this.config.apiComments}${this.config.preFix}/users`,
  //       {
  //         githubUser,
  //         username,
  //         accessToken
  //       }
  //     )
  //   }

  //   return {
  //     githubUser,
  //     username,
  //     accessToken
  //   }
  // }
  async authCallback(@Req() req) {
    const user = req.user

    // Usa o serviço para validar o token existente
    const existingUser = await this.authService.validateToken(user.username)
    // Se o usuário já existe e tem um token válido, retorna o usuário, com o nome que foi validado do token, se não voltar o nome do usuário sendo nullo ou é porque o token não é válido ou expirou ou o usuario não existe
    if (existingUser.githubUser) {
      return {
        githubUser: existingUser.githubUser,
        username: existingUser.username
        // accessToken: existingUser.accessToken // Nao quero retornar o token para o usuario
      }
    }

    // Se não existe token válido ou se não existe usuario, gera ou atualiza o token
    const newUser = await this.authService.generateOrUpdateToken(
      user,
      existingUser?.accessToken
    )

    return {
      githubUser: newUser.githubUser,
      username: newUser.username
      // accessToken: newUser.accessToken // Nao quero retornar o token para o usuario
    }
  }
}
