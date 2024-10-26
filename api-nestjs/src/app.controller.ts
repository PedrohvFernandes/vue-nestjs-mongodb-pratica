import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller()
export class AppController {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  // Ao acessar essa rota, ele pega o token JWT que está no header da requisição, e valida ele com o JWTStrategy e devolve o req.user que é o usuário que está logado, que foi o token validado, com as informações do usuário que estão no payload que estao no auth controller, na rota /api/v1/auth/callback, usando o metodo sign do jwtService
  @Get('profile')
  @UseGuards(AuthGuard('jwt')) // Ele usa o strategy do jwt
  getProfile(@Req() req) {
    return req.user
  }
}
