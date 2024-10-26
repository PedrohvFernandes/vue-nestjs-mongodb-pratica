import { CommentRepository } from '@application/repositories/comments-repository'
import { CommentNotFound } from '../errors/comment-not-found'
import { UserNotOwner } from '../errors/user-not-owner'
import { Title } from '@application/entities/title'
import { Content } from '@application/entities/content'
import { Comment } from '@application/entities/comment'
import { Injectable } from '@nestjs/common'

interface UpdateCommentRequest {
  id: string
  userId: string
  content: string
  title: string
}

interface UpdateCommentResponse {
  comment?: Comment
  messageError?: string
}

@Injectable()
export class UpdateComment {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(request: UpdateCommentRequest): Promise<UpdateCommentResponse> {
    const commentUpdate = await this.commentRepository.findById(request.id)

    if (!commentUpdate) {
      return {
        messageError: new CommentNotFound().message
      }
    }

    const userIsOwner = commentUpdate.userId === request.userId

    if (!userIsOwner) {
      throw new UserNotOwner()
    }

    // Atualizando o comentário com as novas instâncias de Title e Content
    const commentUpdated = new Comment(
      {
        ...commentUpdate.valuesComment, // Pegamos todas as propriedades do comentário que estamos querendo atualizar e passamos para o novo comentário
        content: new Content(request.content ?? commentUpdate.content.value), // Se o content for nulo, mantemos o que já tinha
        title: new Title(request.title ?? commentUpdate.title.value),
        updatedAt: new Date()
      },
      commentUpdate.id
    )

    await this.commentRepository.update(commentUpdated)

    return {
      comment: commentUpdated
    }
  }
}
