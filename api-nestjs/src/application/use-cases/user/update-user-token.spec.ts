import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository'
import { UpdateUserToken } from './update-user-token'
import { makeUser } from '@test/factories/user-factory'
import { faker } from '@faker-js/faker/.'

describe('Update user token use case', () => {
  it('should be able to update user', async () => {
    const userRepository = new InMemoryUserRepository()
    const updateUserToken = new UpdateUserToken(userRepository)

    const userOne = makeUser({
      id: faker.string.uuid()
    })

    await userRepository.create(userOne)

    const userUpdated = await updateUserToken.execute({
      githubUser: userOne.githubUser,
      accessToken: faker.string.uuid()
    })

    expect(userUpdated.user).toEqual(userRepository.users[0])
  })
})
