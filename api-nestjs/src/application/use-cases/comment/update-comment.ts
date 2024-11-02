import { CommentRepository } from '@application/repositories/comments-repository'
import { CommentNotFound } from '../errors/comment-not-found'
import { UserNotOwner } from '../errors/user-not-owner'
import { Title } from '@application/entities/title'
import { Content } from '@application/entities/content'
import { Comment } from '@application/entities/comment'
import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { ErrorContentOrTitle } from '../errors/error-content-or-title'

interface UpdateCommentRequest {
  id: string
  userId: string
  content?: string
  title?: string
}

interface UpdateCommentResponse {
  comment: Comment
}

@Injectable()
export class UpdateComment {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(request: UpdateCommentRequest): Promise<UpdateCommentResponse> {
    if (!request.content && !request.title) {
      throw new BadRequestException(new ErrorContentOrTitle().message)
    }

    if (request.title && request.title.length < 5) {
      throw new BadRequestException(
        new ErrorContentOrTitle(
          'O título deve ter no mínimo 5 caracteres'
        ).message
      )
    }

    if (request.content && request.content.length < 1) {
      throw new BadRequestException(
        new ErrorContentOrTitle(
          'O conteúdo deve ter no mínimo 1 caracteres'
        ).message
      )
    }

    const commentUpdate = await this.commentRepository.findById(request.id)

    if (
      request.title === commentUpdate.title.value &&
      request.content === commentUpdate.content.value
    ) {
      throw new BadRequestException(
        new ErrorContentOrTitle(
          'O conteúdo e o título são iguais ao atual'
        ).message
      )
    }

    if (request.title === commentUpdate.title.value) {
      throw new BadRequestException(
        new ErrorContentOrTitle('O título é igual ao atual').message
      )
    }

    if (request.content === commentUpdate.content.value) {
      throw new BadRequestException(
        new ErrorContentOrTitle('O conteúdo é igual ao atual').message
      )
    }

    if (!commentUpdate) {
      throw new NotFoundException(new CommentNotFound().message)
    }

    const userIsOwner = commentUpdate.userId === request.userId

    if (!userIsOwner) {
      throw new NotFoundException(new UserNotOwner().message)
    }

    // Atualizando o comentário com as novas instâncias de Title e Content
    const commentUpdated = new Comment(
      {
        ...commentUpdate.valuesComment, // Pegamos todas as propriedades do comentário que estamos querendo atualizar e passamos para o novo comentário
        content: new Content(
          !request.content ? commentUpdate.content.value : request.content
        ), // Se o content for nulo, mantemos o que já tinha
        title: new Title(
          !request.title ? commentUpdate.title.value : request.title
        ), // Se o title for nulo ou menor 5, mantemos o que já tinha
        updatedAt: new Date()
      },
      commentUpdate.id
    )

    const comment = await this.commentRepository.update(commentUpdated)

    return {
      comment
    }
  }
}
