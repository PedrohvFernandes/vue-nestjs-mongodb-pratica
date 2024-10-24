import { Comment } from '@application/entities/comment'
import { CommentRepository } from '@application/repositories/comments-repository'
import { Injectable } from '@nestjs/common'
import { User } from '@src/application/entities/user'

interface CommentRequestProps {
  page: number
  perPage: number
}

interface CommentResponseProps {
  comments: {
    comment: Comment
    user: User
  }[]
  total: number
}

@Injectable()
export class GetAllComments {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(request: CommentRequestProps): Promise<CommentResponseProps> {
    const { page, perPage } = request

    const comments = await this.commentRepository.findAll(page, perPage)
    return { comments: comments.comments, total: comments.total }
  }
}
