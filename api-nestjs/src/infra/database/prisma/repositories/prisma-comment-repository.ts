import { CommentRepository } from '@src/application/repositories/comments-repository'
import { Comment } from '@src/application/entities/comment'
import { PrismaCommentMapper } from '../mappers/prisma-comment-mapper'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { User } from '@src/application/entities/user'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaCommentRepository implements CommentRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly prisma: PrismaService) {}

  async create(comment: Comment): Promise<void> {
    const raw = PrismaCommentMapper.toPrisma(comment)

    await this.prisma.comment.create({
      data: raw
    })
  }

  async update(comment: Comment): Promise<void> {
    const raw = PrismaCommentMapper.toPrisma(comment)

    const commentUpdate = await this.prisma.comment.findUnique({
      where: {
        id: comment.id
      }
    })

    await this.prisma.comment.update({
      where: {
        id: commentUpdate.id
      },
      data: {
        ...raw, // Pegamos todos os campos do objeto raw, o que já tinha: Id, createdAt, etc
        title: raw.title ?? commentUpdate.title, // Se o title for nulo, mantemos o que já tinha
        content: raw.content ?? commentUpdate.content, // Se o content for nulo, mantemos o que já tinha
        updatedAt: new Date() // Atualizamos a data de atualização
      }
    })
  }

  async findById(commentId: string): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId
      }
    })

    return PrismaCommentMapper.toDomain(comment)
  }

  async findAll(
    page: number,
    perPage: number
  ): Promise<{
    comments: {
      comment: Comment
      user: User
    }[]
    total: number
  }> {
    const comments = await this.prisma.comment.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: {
          select: {
            githubUser: true,
            username: true,
            id: true
          }
        }
      },
      // Criando sistema de paginação, para retornar por exemplo de 10 registro por pargina
      take: page * perPage,
      // Quantos registros eu vou pular, de quanto em quanto(10 em 10 por exemplo), se eu tenho uma lista de 20 registros(participantes) e quero retornar os ultimos 10, eu vou pular os 10 primeiros. Ex: 20/10 = 2, 2 * 10 = 20, então eu pulei os 10 primeiros registros. Logo o pageIndex precisa ser 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12... para eu conseguir pegar todos os registros. Então o pageIndex multiplica por 10 para pular os registros, se ele for 3 pegamos os registros de 30 a 40. 0 * 10 = 0, logo não pulamos nenhum registro, 1 * 10 = 10, logo pulamos 10 registros, 2 * 10 = 20, logo pulamos 20 registros...
      skip: page * perPage,
      orderBy: {
        createdAt: 'desc'
      }
    })
    return {
      comments: comments.map((comment) => ({
        comment: PrismaCommentMapper.toDomain(comment),
        user: PrismaUserMapper.toDomain(comment.user)
      })),
      total: comments.length
    }
  }
}
