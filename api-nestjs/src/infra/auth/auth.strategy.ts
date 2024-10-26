import { ExtractJwt, Strategy as PassportJwtStrategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AppConfigService } from '@src/app-config/app-config.service'
import { Profile, Strategy } from 'passport-github'

// Ao entrar na rota /api/v1/auth/callback, ele vai no strategy do github, que vai pegar as infos do usuário que retorna no validate, apos ele autenticar no github, e vai passar pra quem ta chamando ele, nesse caso no auth.controller pro jwt
@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(config: AppConfigService) {
    super({
      clientID: config.githubClientId,
      clientSecret: config.githubClientSecret,
      // callbackURL: 'http://localhost:3333/api/v1/auth/callback',  // --> Necessariamente não precisa passar aqui, so de passar Authorization callback URL no github applications já funciona, mais detalhes no readme do front-end
      scope: ['public_profile']
    })
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    // Ele vai retornar o profile do usuário que foi autenticado
    return profile
  }
}

// Ao entrar na rota /api/v1/profile, ele vai validar o token JWT, e retornar as informações do usuário que estão no payload, que virou token JWT
@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {
  constructor(config: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret
    })
  }

  async validate(payload: any) {
    return { githubUser: payload.githubUser, username: payload.username }
  }
}
