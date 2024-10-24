import { Comment } from '@application/entities/comment'
import { User } from '../entities/user'

export abstract class CommentRepository {
  abstract create(comment: Comment): Promise<void>
  abstract update(comment: Comment): Promise<void>
  abstract findById(commentId: string): Promise<Comment | null>
  abstract findAll(
    page: number,
    perPage: number
  ): Promise<{
    comments: {
      comment: Comment
      user: User
    }[]
    total: number
  }>
}
