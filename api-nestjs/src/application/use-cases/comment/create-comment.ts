import { Comment } from '@application/entities/comment'
import { Content } from '@application/entities/content'
import { Title } from '@application/entities/title'
import { CommentRepository } from '@application/repositories/comments-repository'
import { Injectable } from '@nestjs/common'
import { ErrorCreateComment } from '../errors/error-create-comment'

interface CreateCommentRequest {
  // comment: Comment
  content: string
  title: string
  userId: string
}

interface CreateCommentResponse {
  comment: Comment
}

@Injectable()
export class CreateComment {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(request: CreateCommentRequest): Promise<CreateCommentResponse> {
    const { content, title, userId } = request

    const comment = new Comment({
      userId,
      content: new Content(content),
      title: new Title(title)
    })

    const commentCreated = await this.commentRepository.create(comment)

    if (!commentCreated) {
      throw new ErrorCreateComment()
    }

    return {
      comment
    }
  }
}