import { Comment } from '@src/application/entities/comment'
import { Content } from '@src/application/entities/content'
import { Comment as RawComment } from '@prisma/client'
import { Title } from '@src/application/entities/title'

export class PrismaCommentMapper {
  // Conversão para camada de persistencia, Prisma
  static toPrisma(comment: Comment) {
    return {
      // id: comment.id, // Como o id é gerado pelo banco de dados, não precisamos passar ele
      title: comment.title.value,
      content: comment.content.value,
      // createdAt: comment.createdAt, // O mesmo aqui
      updatedAt: comment.updatedAt,
      userId: comment.userId
    }
  }

  // Conversão para camada de dominio, que é a camada de aplicação
  static toDomain(raw: RawComment): Comment {
    return new Comment(
      {
        content: new Content(raw.content),
        title: new Title(raw.title), // Assuming Title is a class similar to Content
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        userId: raw.userId
      },
      raw.id // Pegamos o id do banco de dados
    )
  }
}
