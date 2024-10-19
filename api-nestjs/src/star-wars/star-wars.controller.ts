import { AppConfigService } from '@/app-config/app-config.service'
import { Controller, Get } from '@nestjs/common'
import axios from 'axios'

// Decoramos a classe com o controller e definimos o path para a rota /star-wars/characters
@Controller('star-wars')
export class StarWarsController {
  private readonly apiBaseUrl: string

  constructor(config: AppConfigService) {
    this.apiBaseUrl = config.starWarsApiUrl
  }

  // Criamos um método que é decorado com o metodo http Get, na rota /star-wars/characters
  @Get('characters')
  getCharacters() {
    // const config = new ConfigService()
    // console.log(config.get('DATABASE_URL'))
    return axios.get(`${this.apiBaseUrl}/people`).then((response) => {
      return response.data
    })
  }
}
