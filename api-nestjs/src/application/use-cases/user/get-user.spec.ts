import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository'
import { GetUser } from './get-user'
import { makeUser } from '@test/factories/user-factory'
import { faker } from '@faker-js/faker/.'

describe('Get user use case', () => {
  it('should be able to get user', async () => {
    const userRepository = new InMemoryUserRepository()
    const getUser = new GetUser(userRepository)

    const userOne = makeUser({
      id: faker.string.uuid()
    })

    await userRepository.create(userOne)

    const userTwo = makeUser({
      id: faker.string.uuid()
    })

    await userRepository.create(userTwo)

    const { user } = await getUser.execute({
      userId: userOne.id
    })

    expect(user).toEqual(userOne)
    expect(userRepository.users).toHaveLength(2)
  })
})
