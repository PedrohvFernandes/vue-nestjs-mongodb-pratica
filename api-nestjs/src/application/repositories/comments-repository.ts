import { Comment } from '@application/entities/comment'
import { User } from '../entities/user'

export abstract class CommentRepository {
  abstract create(comment: Comment): Promise<Comment>
  abstract update(comment: Comment): Promise<void>
  abstract findById(commentId: string): Promise<Comment | null>
  abstract findAll(
    page: number,
    perPage: number
  ): Promise<{
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
  }>

  abstract delete(commentId: string): Promise<void>
}
