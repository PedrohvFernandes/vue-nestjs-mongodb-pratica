import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { TransformInterceptor } from './interceptors/transform.interceptor'
import { AppConfigService } from './app-config/app-config.service'
import { ConfigService } from '@nestjs/config'

// import * as dotenv from 'dotenv'
// Da para fazer isso usando a lib dotenv: npm install --save dotenv, mas vou usar a lib  npm i @nestjs/config e criar o arquivo de config
// dotenv.config({ path: process.cwd() + '/.env' })

async function bootstrap() {
  // Cria uma instância do módulo principal
  const app = await NestFactory.create(AppModule)

  const config = app.get(ConfigService)
  const configService = new AppConfigService(config)

  // Prefixo global para todas as rotas, ex:  http://localhost:3333/api/v1/rotasCriadas
  app.setGlobalPrefix(configService.preFix)

  // Pipe de validação, que valida o corpo da requisição de acordo com o schema/interface/type
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())

  app.enableCors()
  // await app.listen(Number(process.env.PORT) || 3333)
  await app.listen(configService.portApi)
  console.log(`This application is running on: ${await app.getUrl()}`)
}
bootstrap()
