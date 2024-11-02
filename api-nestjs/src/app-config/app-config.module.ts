import { Module } from '@nestjs/common'
import { AppConfigService } from './app-config.service'
import * as joi from 'joi'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    /**
     *
     * @param isGlobal: boolean
     *
        Pode fazer assim em uma classe de um controller, por exemplo:
        const config = new ConfigService()
        console.log(config.get('DATABASE_URL'))

        Ou assim no construtor da classe de um controller, por exemplo:
        private readonly dataBaseUrl: string
        constructor(config: ConfigService) {
          this.dataBaseUrl = config.get('DATABASE_URL')
        }
     */
    // Dessa forma, o módulo de configuração é global e pode ser acessado em qualquer lugar da aplicação. Vou ter acesso as envs, basta chamar o ConfigService que é uma classe do @nestjs/config
    ConfigModule.forRoot({
      isGlobal: true,
      // Definimos o schema de validação das variáveis de ambiente
      validationSchema: joi.object({
        STAR_WARS_API_URL: joi.string().required(), // Com required, a variável de ambiente é obrigatória
        PORT: joi.number().default(3333), // Porta padrão
        GITHUB_CLIENT_ID: joi.string().required(),
        GITHUB_CLIENT_SECRET: joi.string().required(),
        JWT_SECRET: joi.string().required(),
        API_COMMENTS: joi.string().required(),
        FRONT_COMMENTS: joi.string().required(),
        PRE_FIX: joi.string().required()
      })
    })
  ],
  providers: [AppConfigService],
  exports: [AppConfigService]
})
export class AppConfigModule {}
