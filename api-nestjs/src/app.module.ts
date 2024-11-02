import { Module } from '@nestjs/common'
// import { AppService } from './app.service'
import { StarWarsModule } from './star-wars/star-wars.module'
import { AppConfigModule } from './app-config/app-config.module'
import { HttpModule } from '@infra/http/http.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  // Importando todos os modulos necessários para a aplicação. Se alguma outra parte da aplicação precisar de um banco de dados eu posso passar por aqui que ela vai ter acesso, ou eu crio um modulo separada para ela e importa o seu modelo aqui e no seu modulo coloco o que ela precisa. por exe: DatabaseModule, AuthModule...
  imports: [AppConfigModule, StarWarsModule, HttpModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
