import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository'
import { CreateUser } from './create-user'
import { faker } from '@faker-js/faker/.'

describe('Create user use case', () => {
  it('should create a user', async () => {
    const userRepository = new InMemoryUserRepository()
    const createUser = new CreateUser(userRepository)

    // const { user } = await createUser.execute({
    //   user: userCreate
    // })

    // Por que não usar o makeUser aqui? Porque ele cria um objeto User, e o execute do CreateUser espera um CreateUserRequest, na ideia de ser params de um request, ou seja, não podemos cria um objeto de user diretamente, temos que passar os params para o execute, para ele criar o objeto User e passar para o BD
    const { user } = await createUser.execute({
      username: faker.internet.userName(),
      githubUser: faker.internet.userName()
    })

    expect(userRepository.users).toContain(user)
    expect(userRepository.users).toHaveLength(1)
    expect(userRepository.users[0]).toEqual(user)
  })
})
