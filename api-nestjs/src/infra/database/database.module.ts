import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CommentRepository } from '@src/application/repositories/comments-repository'
import { PrismaCommentRepository } from './prisma/repositories/prisma-comment-repository'
import { UserRepository } from '@src/application/repositories/users-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'

@Module({
  exports: [CommentRepository, UserRepository],
  providers: [
    PrismaService,
    {
      provide: CommentRepository,
      useClass: PrismaCommentRepository
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ]
})
export class DatabaseModule {}
