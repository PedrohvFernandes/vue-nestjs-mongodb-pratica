import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

// import * as dotenv from 'dotenv'
// Da para fazer isso usando a lib dotenv: npm install --save dotenv, mas vou usar a lib  npm i @nestjs/config e criar o arquivo de config
// dotenv.config({ path: process.cwd() + '/.env' })

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3333)
  console.log(`This application is running on: ${await app.getUrl()}`)
}
bootstrap()
