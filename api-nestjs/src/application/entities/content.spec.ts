import { Content } from './content'
import { faker } from '@faker-js/faker/.'

describe('Comment content', () => {
  it('should be able to create a comment content', () => {
    const contentComment = faker.word.adjective()

    const content = new Content(contentComment)

    expect(content.value).toBe(contentComment)
  })

  it('should not be able to create a comment content with less than 1 characters', () => {
    expect(() => new Content('')).toThrow()
  })

  it('should not be able to create a comment content with more than less than 200 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow()
  })
})
