import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getMain() {
    return {
      name: 'comments-api',
      version: '0.0.1',
      description: 'An REST API with NESTJS and MONGODB',
      author: 'Github: PedrohvFernandes'
    }
  }
}
