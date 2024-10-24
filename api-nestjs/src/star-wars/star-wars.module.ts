import { Module } from '@nestjs/common'
import { StarWarsController } from '@src/infra/http/controllers/star-wars/star-wars.controller'
import { AppConfigModule } from '@appConfig/app-config.module'

// import { ConfigModule } from '@nestjs/config'

// Module que criei para entender o nestjs, ela não faz parte da aplicação em si
@Module({
  // Não precisa passar o ConfigutModule para o imports, pois o módulo de configuração já foi importado no AppModule, e lá definimos que ele é global
  // imports: [ConfigModule],
  // Como aqui a referencia é referencia circular, precisamos importar o AppModule com o forwardRef. Porque o AppModule importa o StarWarsModule, então aqui é referencia circular
  // imports: [forwardRef(() => AppModule)],
  imports: [AppConfigModule],
  controllers: [StarWarsController]
})
export class StarWarsModule {}
