import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository'
import { makeUser } from '@test/factories/user-factory'
import { faker } from '@faker-js/faker/.'
import { GetAccessTokenUser } from './get-access-token-user'

describe('Get access token user use case', () => {
  it('should be able to get accessToken', async () => {
    const userRepository = new InMemoryUserRepository()
    const getAccessTokenUser = new GetAccessTokenUser(userRepository)

    const userOne = makeUser({
      id: faker.string.uuid()
    })

    await userRepository.create(userOne)

    const userTwo = makeUser({
      id: faker.string.uuid()
    })

    await userRepository.create(userTwo)

    const { token } = await getAccessTokenUser.execute({
      githubUser: userOne.githubUser
    })

    expect(token).toEqual({ accessToken: userOne.accessToken })
  })
})
