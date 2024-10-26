import { makeUser } from '@test/factories/user-factory'
import { faker } from '@faker-js/faker/.'

describe('Comments user', () => {
  it('must be able to create a user in the comment content', () => {
    // Aqui eu preciso criar um usuário para poder somente comparar o valor. Desse objeto com o makeUser
    const createUser = {
      username: faker.internet.userName(),
      githubUser: faker.internet.userName(),
      accessToken: faker.string.uuid() // imitando um jwt
    }
    const sut = makeUser(createUser)

    expect(sut.valuesUser).toEqual(createUser)
  })

  it('should not be able to create a user in the comment content with an invalid username', () => {
    expect(() =>
      makeUser({
        username: ''
      })
    ).toThrow()
  })
})
