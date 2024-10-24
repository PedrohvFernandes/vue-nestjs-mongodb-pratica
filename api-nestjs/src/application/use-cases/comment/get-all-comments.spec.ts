import { InMemoryCommentRepository } from '@test/repositories/in-memory-comment-repository'
import { GetAllComments } from './get-all-comments'
import { makeComment } from '@test/factories/comment-factory'

describe('GetAllComments', () => {
  it('should return paginated comments', async () => {
    const commentRepository = new InMemoryCommentRepository()
    const getAllComments = new GetAllComments(commentRepository)

    // Cria vários comentários
    for (let i = 0; i < 20; i++) {
      const comment = makeComment()
      await commentRepository.create(comment)
    }

    // Busca a primeira página de 16 comentários
    const commentsPage1 = await getAllComments.execute({ page: 1, perPage: 16 })

    // Verifica se retornou apenas 16 comentários na primeira página
    expect(commentsPage1.comments).toHaveLength(16)

    // Busca a segunda página
    const commentsPage2 = await getAllComments.execute({ page: 2, perPage: 16 })

    // Verifica se a segunda página tem os 4 comentários restantes. Porque possuimos 20 comentários no total, menos 16 na primeira página, sobram 4 na segunda página.
    expect(commentsPage2.comments).toHaveLength(4)
  })
})
