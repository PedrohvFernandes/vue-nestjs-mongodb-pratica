import { Injectable } from '@nestjs/common'
import { CommentRepository } from '@src/application/repositories/comments-repository'
import { CommentNotFound } from '../errors/comment-not-found'
import { UserNotOwner } from '../errors/user-not-owner'

interface DeleteCommentRequest {
  id: string
  userId: string
}

@Injectable()
export class DeleteComment {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(request: DeleteCommentRequest): Promise<void> {
    const comment = await this.commentRepository.findById(request.id)

    if (!comment) {
      throw new CommentNotFound()
    }

    const userIsOwner = comment.userId === request.userId

    if (!userIsOwner) {
      throw new UserNotOwner()
    }

    await this.commentRepository.delete(request.id)
  }
}