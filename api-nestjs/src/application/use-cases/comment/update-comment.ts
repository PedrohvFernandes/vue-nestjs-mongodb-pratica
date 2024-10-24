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
  commentUpdate: Comment
}

@Injectable()
export class UpdateComment {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(request: UpdateCommentRequest): Promise<UpdateCommentResponse> {
    const comment = await this.commentRepository.findById(request.id)

    if (!comment) {
      throw new CommentNotFound()
    }

    const userIsOwner = comment.userId === request.userId

    if (!userIsOwner) {
      throw new UserNotOwner()
    }

    // Atualizando o comentário com as novas instâncias de Title e Content
    const updatedComment = new Comment(
      {
        ...comment.propsComment, // Pegamos todas as propriedades do comentário que estamos querendo atualizar e passamos para o novo comentário
        content: new Content(request.content),
        title: new Title(request.title),
        updatedAt: new Date()
      },
      comment.id
    )

    await this.commentRepository.update(updatedComment)

    return {
      commentUpdate: updatedComment
    }
  }
}
