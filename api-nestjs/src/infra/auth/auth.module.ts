import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AppConfigModule } from '@src/app-config/app-config.module'
import { GithubStrategy, JwtStrategy } from './auth.strategy'
import { AuthController } from '../http/controllers/auth/auth.controller'
import { AxiosModule } from '../axios/axios.module'
import { AuthService } from './auth.service'

@Module({
  providers: [GithubStrategy, JwtStrategy, AuthService],
  imports: [
    AppConfigModule,
    AxiosModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          signOptions: { expiresIn: '10h' }, // 10 hours esse token expira
          secret: configService.get<string>('JWT_SECRET')
          // callbackUrl: configService.get<string>('GITHUB_CALLBACK_URL')
        }
      },
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
