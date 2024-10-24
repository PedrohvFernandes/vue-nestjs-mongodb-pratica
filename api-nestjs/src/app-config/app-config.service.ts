import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// Foi marcada com o Injectable, pois é uma classe que pode ser injetada em outras classes
@Injectable()
export class AppConfigService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly config: ConfigService) {}

  get starWarsApiUrl(): string {
    return this.config.get<string>('STAR_WARS_API_URL')
  }

  get portApi(): number {
    // return this.config.get<number>('PORT') ?? 3333
    return this.config.get<number>('PORT') // Como deixamos a porta padrão no schema de validação, não precisamos mais do operador de coalescência nula
  }
}
