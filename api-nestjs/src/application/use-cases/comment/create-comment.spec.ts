import { faker } from '@faker-js/faker/.'
import { CreateComment } from './create-comment'
import { InMemoryCommentRepository } from '@test/repositories/in-memory-comment-repository'

describe('Create comment use case', () => {
  it('should create a user', async () => {
    const commentRepository = new InMemoryCommentRepository()
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

    expect(commentRepository.comments).toContain(comment)
    expect(commentRepository.comments).toHaveLength(1)
    expect(commentRepository.comments[0]).toEqual(comment)
  })
})
