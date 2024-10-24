import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query', 'info', 'warn']
    })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
    console.log('Database connection closed.')
  }

  async enableShutdownHooks(app: INestApplication) {
    // https://github.com/prisma/prisma/releases/tag/5.0.0
    // this.$on('beforeExit', async () => {
    //   await app.close()
    // })
    process.on('beforeExit', async () => {
      await app.close()
    })
  }
}
