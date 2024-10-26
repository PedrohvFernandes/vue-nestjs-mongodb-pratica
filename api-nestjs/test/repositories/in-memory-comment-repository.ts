import { Comment } from '@application/entities/comment'
import { CommentRepository } from '@application/repositories/comments-repository'
import { User } from '@src/application/entities/user'
import { makeUser } from '@test/factories/user-factory'

// Repositório de notificações fake, um bd em memória falso
export class InMemoryCommentRepository implements CommentRepository {
  public comments: Comment[] = []
  async create(comment: Comment) {
    this.comments.push(comment)
    return comment
  }

  async update(comment: Comment) {
    const commentIndex = this.comments.findIndex(
      (item) => item.id === comment.id
    )

    if (commentIndex >= 0) {
      this.comments[commentIndex] = comment
    }
  }

  async findById(commentId: string): Promise<Comment | null> {
    const comment = this.comments.find((item) => item.id === commentId)

    if (!comment) {
      return null
    }

    return comment
  }

  async findAll(
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
  }> {
    // const comments = this.comments.slice((page - 1) * perPage, page * perPage)

    // Se eu tenho 20 comentarios e eu quero 16 por página, eu tenho 2 páginas
    // Se eu quero a página 1, eu pego do 0 ao 15. Porque aqui esta sendo por index, então o 16 é o 15.
    const startIndex = (page - 1) * perPage

    // Se o page for 1, o endIndex é 1 * 16 = 16. Se for 2, é 2 * 16 = 32. Então o endIndex é 16.
    const endIndex = page * perPage
    // Com isso fazemos um slice do array de comentários, pegando do startIndex até o endIndex. De quanto até quanto queremos pegar.
    const comments = this.comments.slice(startIndex, endIndex)
    return {
      first: 1,
      prev: page > 1 ? page - 1 : null,
      next: endIndex < this.comments.length ? page + 1 : null,
      last: Math.ceil(this.comments.length / perPage),
      pages: Math.ceil(this.comments.length / perPage),
      items: comments.length,
      total: this.comments.length,

      comments: comments.map((comment) => {
        return {
          comment,
          user: makeUser()
        }
      })
    }
  }

  async delete(commentId: string): Promise<void> {
    const commentIndex = this.comments.findIndex(
      (item) => item.id === commentId
    )

    if (commentIndex >= 0) {
      this.comments.splice(commentIndex, 1)
    }
  }
}
