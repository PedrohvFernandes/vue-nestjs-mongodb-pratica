import { Module } from '@nestjs/common'
// import { AppService } from './app.service'
import { StarWarsModule } from './star-wars/star-wars.module'
import { AppConfigModule } from './app-config/app-config.module'
import { DatabaseModule } from '@infra/database/database.module'
import { HttpModule } from '@infra/http/http.module'

@Module({
  imports: [AppConfigModule, StarWarsModule, DatabaseModule, HttpModule]
})
export class AppModule {}
