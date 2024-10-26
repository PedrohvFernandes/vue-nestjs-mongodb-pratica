import { Comment } from '@application/entities/comment'
import { CommentRepository } from '@application/repositories/comments-repository'
import { Injectable } from '@nestjs/common'
import { User } from '@src/application/entities/user'

interface CommentRequestProps {
  page: number
  perPage: number
}

interface CommentResponseProps {
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
}

@Injectable()
export class GetAllComments {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(request: CommentRequestProps): Promise<CommentResponseProps> {
    const { page, perPage } = request

    const comments = await this.commentRepository.findAll(page, perPage)
    return {
      first: comments.first,
      prev: comments.prev,
      next: comments.next,
      last: comments.last,
      pages: comments.pages,
      items: comments.items,
      total: comments.total,
      comments: comments.comments
    }
  }
}
