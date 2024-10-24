import { InMemoryCommentRepository } from '@test/repositories/in-memory-comment-repository'
import { DeleteComment } from './delete-comment'
import { faker } from '@faker-js/faker/.'
import { makeComment } from '@test/factories/comment-factory'

describe('Delete comment use case', () => {
  it('should delete a comment', async () => {
    const commentRepository = new InMemoryCommentRepository()
    const deleteComment = new DeleteComment(commentRepository)

    const userId = faker.string.uuid()

    const comment = makeComment({
      userId
    })

    await commentRepository.create(comment)

    expect(commentRepository.comments).toHaveLength(1)

    await deleteComment.execute({
      id: comment.id,
      userId
    })

    expect(commentRepository.comments).toHaveLength(0)
  })
})
