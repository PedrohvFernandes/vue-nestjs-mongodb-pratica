import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository'
import { GetUserByName } from './get-user-by-name'
import { makeUser } from '@test/factories/user-factory'
import { faker } from '@faker-js/faker/.'

describe('Get user by name use case', () => {
  it('should be able to get by name user', async () => {
    const userRepository = new InMemoryUserRepository()
    const getUserByName = new GetUserByName(userRepository)

    const userOne = makeUser({
      id: faker.string.uuid()
    })

    await userRepository.create(userOne)

    const userTwo = makeUser({
      id: faker.string.uuid()
    })

    await userRepository.create(userTwo)

    const { user } = await getUserByName.execute({
      githubUser: userOne.githubUser
    })

    expect(user).toEqual(userOne)
    expect(userRepository.users).toHaveLength(2)
  })
})
