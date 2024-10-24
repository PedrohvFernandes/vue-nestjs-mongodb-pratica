import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

import { CreateComment } from '@src/application/use-cases/comment/create-comment'
import { GetAllComments } from '@src/application/use-cases/comment/get-all-comments'
import { UpdateComment } from '@src/application/use-cases/comment/update-comment'
import { CreateUser } from '@src/application/use-cases/user/create-user'
import { GetUser } from '@src/application/use-cases/user/get-user'
import { CommentController } from './controllers/comment/comment.controller'
import { DeleteComment } from '@src/application/use-cases/comment/delete-comment'

@Module({
  imports: [DatabaseModule],
  controllers: [CommentController],
  providers: [
    CreateComment,
    GetAllComments,
    UpdateComment,
    CreateUser,
    DeleteComment,
    GetUser
  ]
})
export class HttpModule {}
