import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

import { CreateComment } from '@src/application/use-cases/comment/create-comment'
import { GetAllComments } from '@src/application/use-cases/comment/get-all-comments'
import { UpdateComment } from '@src/application/use-cases/comment/update-comment'
import { CreateUser } from '@src/application/use-cases/user/create-user'
import { GetUser } from '@src/application/use-cases/user/get-user'
import { CommentController } from './controllers/comment/comment.controller'
import { DeleteComment } from '@src/application/use-cases/comment/delete-comment'
import { UserController } from './controllers/user/user.controller'
import { AuthModule } from '../auth/auth.module'
import { GetUserByName } from '@src/application/use-cases/user/get-user-by-name'
import { UpdateUserToken } from '@src/application/use-cases/user/update-user-token'
import { GetAccessTokenUser } from '@src/application/use-cases/auth/get-access-token-user'

// Módulos
@Module({
  // Importa o módulo de conexão com o banco de dados, para que os controllers possam acessar os repositórios. Ou seja, um module pode importar outro module.
  imports: [DatabaseModule, AuthModule],
  // Controllers que serão utilizados, eles que vão lidar com as requisições HTTP. As rotas são definidas aqui.
  controllers: [CommentController, UserController],
  // O providers é onde são definidos os serviços que serão utilizados. Ou seja, os use-cases, services, etc. Onde fica a nossa logica de negócio.
  providers: [
    CreateComment,
    GetAllComments,
    UpdateComment,
    CreateUser,
    DeleteComment,
    GetUser,
    GetUserByName,
    UpdateUserToken,
    GetAccessTokenUser
  ]
})
export class HttpModule {}
