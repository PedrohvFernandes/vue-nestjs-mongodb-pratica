import { Module } from '@nestjs/common'
// import { AppService } from './app.service'
import { StarWarsModule } from './star-wars/star-wars.module'
import { AppConfigModule } from './app-config/app-config.module'
import { PrismaModule } from './prisma/prisma.module'
import { AppService } from './app.service'

@Module({
  imports: [AppConfigModule, StarWarsModule, PrismaModule, AppService],
  controllers: [],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
