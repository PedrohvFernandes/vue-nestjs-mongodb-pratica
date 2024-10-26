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

  async create(comment: Comment): Promise<Comment> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: comment.userId
      }
    })

    if (!user) {
      return
    }

    const raw = PrismaCommentMapper.toPrisma(comment)

    const commentCreated = await this.prisma.comment.create({
      data: raw
    })

    if (!commentCreated) {
      return
    }

    return PrismaCommentMapper.toDomain(commentCreated)
  }

  async update(comment: Comment): Promise<void> {
    const raw = PrismaCommentMapper.toPrisma(comment)

    await this.prisma.comment.update({
      where: {
        id: comment.id
      },
      data: {
        title: raw.title,
        content: raw.content,
        updatedAt: raw.updatedAt
      }
    })
  }

  async findById(commentId: string): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId
      }
    })

    if (!comment) {
      return
    }

    return PrismaCommentMapper.toDomain(comment)
  }

  async findAll(
    page: number,
    perPage: number
  ): Promise<{
    first: number
    prev: number | null
    next: number | null
    last: number
    pages: number
    items: number
    total: number
    comments: {
      comment: Comment
      user: User
    }[]
  }> {
    const total = await this.prisma.comment.count() // Total de comentários no banco

    // Calcular número de páginas
    const pages = Math.ceil(total / perPage)

    const offset = (page - 1) * perPage

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
            createdAt: true,
            updatedAt: true,
            id: true
          }
        }
      },
      // Criando sistema de paginação, para retornar por exemplo de 10 registro por pargina
      take: perPage,
      skip: offset, // Pula os registros, ex: se eu quero pegar os registros de 16 em 16(perPage), eu pego o page - 1 * perPage, se o usuario manda 1 no page ou 0, eu pego 0 * 16 = 0, ou seja não pulada nada, me envia os 16 primeiros, se ele manda 2, eu pego 1 * 16 = 16, pula 16 primeiros, se ele manda 3, eu pego 2 * 16 = 32 pula os 16 da segunda fileira...
      orderBy: {
        createdAt: 'desc'
      }
    })
    // Definir navegação de páginas
    const first = 1
    const last = pages
    const prev = page > 1 ? page - 1 : null
    const next = page < pages ? page + 1 : null
    return {
      first,
      prev,
      next,
      last,
      pages,
      items: perPage, // O items é o número de itens por página
      total,
      comments: comments.map((comment) => ({
        comment: PrismaCommentMapper.toDomain(comment),
        user: PrismaUserMapper.toDomain({
          id: comment.user.id,
          githubUser: comment.user.githubUser,
          username: comment.user.username,
          createdAt: comment.user.createdAt,
          updatedAt: comment.user.updatedAt,
          accessToken: ''
        })
      }))
    }
  }

  async delete(commentId: string): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: commentId
      }
    })
  }
}
