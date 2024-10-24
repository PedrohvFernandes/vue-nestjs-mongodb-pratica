import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { Comment } from '@src/application/entities/comment'
import { User } from '@src/application/entities/user'
import { CreateComment } from '@src/application/use-cases/comment/create-comment'
import { GetAllComments } from '@src/application/use-cases/comment/get-all-comments'
import { UpdateComment } from '@src/application/use-cases/comment/update-comment'
import { CreateCommentBody } from '@infra/http/dtos/comment/create-comment-body'
import { UpdateCommentBody } from '@infra/http/dtos/comment/update-comment-body'
import { DeleteCommentBody } from '@infra/http/dtos/comment/delete-comment-body'
import { DeleteComment } from '@src/application/use-cases/comment/delete-comment'

@Controller('comments')
export class CommentController {
  // Injetando dependencias: Em vez de ser o serviço que injeta o controller, é o contrário. Mas não vamos injetar o serviço, mas sim os casos de uso.
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly createComment: CreateComment,
    private readonly getAllComments: GetAllComments,
    private readonly updateComment: UpdateComment,
    private readonly deleteComment: DeleteComment
  ) {}

  @Get()
  async allComments(
    @Query('page') page: string,
    @Query('per_page') perPage: string
  ): Promise<{
    comments: {
      comment: Comment
      user: User
    }[]
    total: number
    totalPerPage: number
  }> {
    const pageNumber = Number(page) || 1
    const perPageNumber = Number(perPage) || 16

    const { comments, total, totalPerPage } = await this.getAllComments.execute(
      {
        page: pageNumber,
        perPage: perPageNumber
      }
    )

    return {
      comments,
      total,
      totalPerPage
    }
  }

  @Post()
  async create(@Body() body: CreateCommentBody): Promise<Comment> {
    const { content, userId, title } = body

    const { comment } = await this.createComment.execute({
      content,
      userId,
      title
    })

    return comment
  }

  @Put()
  async update(@Body() body: UpdateCommentBody): Promise<{ comment: Comment }> {
    const { commentUpdate } = await this.updateComment.execute({
      id: body.id,
      userId: body.userId,
      content: body.content,
      title: body.title
    })

    return {
      comment: commentUpdate
    }
  }

  @Delete()
  async delete(@Body() body: DeleteCommentBody): Promise<void> {
    const { id, userId } = body

    await this.deleteComment.execute({ id, userId })
  }
}
