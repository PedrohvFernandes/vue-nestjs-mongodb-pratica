import { Module } from '@nestjs/common'
import { StarWarsController } from './star-wars.controller'
import { AppConfigModule } from 'prisma/src/app-config/app-config.module'
// import { ConfigModule } from '@nestjs/config'

@Module({
  // Não precisa passar o ConfigutModule para o imports, pois o módulo de configuração já foi importado no AppModule, e lá definimos que ele é global
  // imports: [ConfigModule],
  // Como aqui a referencia é referencia circular, precisamos importar o AppModule com o forwardRef. Porque o AppModule importa o StarWarsModule, então aqui é referencia circular
  // imports: [forwardRef(() => AppModule)],
  imports: [AppConfigModule],
  controllers: [StarWarsController]
})
export class StarWarsModule {}
