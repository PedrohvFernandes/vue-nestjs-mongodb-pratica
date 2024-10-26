import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { AxiosService } from './axios.service'
import { AppConfigModule } from '@src/app-config/app-config.module'

@Module({
  imports: [HttpModule, AppConfigModule],
  providers: [AxiosService],
  exports: [AxiosService]
})
export class AxiosModule {}
