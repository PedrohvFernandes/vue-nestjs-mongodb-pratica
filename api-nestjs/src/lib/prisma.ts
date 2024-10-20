import { PrismaService } from '@/prisma/prisma.service'

export const prisma = new PrismaService()

prisma.onModuleInit().then(() => {
  console.log('Database connected!')
})
