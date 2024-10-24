import { Controller, Get, Query } from '@nestjs/common'
import { Comment } from '@src/application/entities/comment'
import { User } from '@src/application/entities/user'
import { CreateComment } from '@src/application/use-cases/comment/create-comment'
import { GetAllComments } from '@src/application/use-cases/comment/get-all-comments'
import { UpdateComment } from '@src/application/use-cases/comment/update-comment'

@Controller('comments')
export class CommentController {
  // Injetando dependencias: Em vez de ser o serviço que injeta o controller, é o contrário. Mas não vamos injetar o serviço, mas sim os casos de uso.
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly createComment: CreateComment,
    private readonly getAllComments: GetAllComments,
    private readonly updateComment: UpdateComment
  ) {}

  @Get()
  async allComments(
    @Query('page') page: number,
    @Query('per_page') perPage: number
  ): Promise<{
    comments: {
      comment: Comment
      user: User
    }[]
    total: number
  }> {
    const { comments, total } = await this.getAllComments.execute({
      page,
      perPage
    })

    return {
      comments,
      total
    }
  }

  // @Post()
  // async create(@Body('content') content: string) {}
}
