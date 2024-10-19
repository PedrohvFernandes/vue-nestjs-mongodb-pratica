import { Module } from '@nestjs/common'
// import { AppService } from './app.service'
import { StarWarsModule } from './star-wars/star-wars.module'
import { AppConfigModule } from './app-config/app-config.module'

@Module({
  imports: [AppConfigModule, StarWarsModule],
  controllers: [],
  // providers: [AppService]
  providers: []
})
export class AppModule {}
