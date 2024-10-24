import { InMemoryCommentRepository } from '@test/repositories/in-memory-comment-repository'
import { UpdateComment } from './update-comment'
import { faker } from '@faker-js/faker/.'
import { CreateComment } from './create-comment'

describe('Update comment use case', () => {
  it('should be able to update a comment', async () => {
    const commentRepository = new InMemoryCommentRepository()
    const updateComment = new UpdateComment(commentRepository)
    const createComment = new CreateComment(commentRepository)
    const { comment } = await createComment.execute({
      content: faker.word.adjective({
        length: {
          min: 1,
          max: 200
        }
      }),
      title: faker.word.adjective({
        length: {
          min: 5,
          max: 20
        }
      }),
      userId: faker.string.uuid()
    })

    const { commentUpdate } = await updateComment.execute({
      id: comment.id,
      userId: comment.userId,
      content: faker.word.adjective({
        length: {
          min: 1,
          max: 200
        }
      }),
      title: faker.word.adjective({
        length: {
          min: 5,
          max: 20
        }
      })
    })

    expect(commentRepository.comments).toContain(commentUpdate)
  })
})
