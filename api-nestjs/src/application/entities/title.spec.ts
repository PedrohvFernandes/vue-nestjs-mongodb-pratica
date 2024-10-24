import { Title } from './title'
import { faker } from '@faker-js/faker/.'

describe('Comment title', () => {
  it('should be able to create a title in the comment', () => {
    const titleComment = faker.word.adjective(10)

    const content = new Title(titleComment)

    expect(content.value).toBe(titleComment)
  })

  it('should not be able to create a title in the comment with less than 1 characters', () => {
    expect(() => new Title('')).toThrow()
  })

  it('should not be able to create a title in the comment with more than less than 200 characters', () => {
    expect(() => new Title('a'.repeat(241))).toThrow()
  })
})
