import { Comment } from '@src/application/entities/comment'

export class CommentViewModel {
  static toHTTP(comment: Comment) {
    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      userId: comment.userId
    }
  }
}
