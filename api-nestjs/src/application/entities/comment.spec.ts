import { makeComment } from '@test/factories/comment-factory'

describe('Comment', () => {
  it('should be able to create a comment', () => {
    // Posso fazer isso, caso queria comparar o id do usuário, expect
    // const userId = faker.string.uuid()
    // const comment = makeComment({
    //   userId
    // })

    // Ou fazer assim, caso não queira comparar o id do usuário
    const comment = makeComment()

    expect(comment).toBeTruthy()
  })
})
