import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// Foi marcada com o Injectable, pois é uma classe que pode ser injetada em outras classes
@Injectable()
export class AppConfigService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly config: ConfigService) {}

  get databaseUrl(): string {
    return this.config.get<string>('DATABASE_URL')
  }

  get starWarsApiUrl(): string {
    return this.config.get<string>('STAR_WARS_API_URL')
  }
}
