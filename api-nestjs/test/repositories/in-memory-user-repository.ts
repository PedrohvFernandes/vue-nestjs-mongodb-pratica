import { User } from '@application/entities/user'
import { UserRepository } from '@application/repositories/users-repository'
import { UserNotFound } from '@application/use-cases/errors/user-not-found'

// Repositório de notificações fake, um bd em memória falso
export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []

  async create(User: User): Promise<User> {
    this.users.push(User)
    return User
  }

  async findById(userId: string): Promise<User> {
    const user = this.users.find((item) => item.id === userId)

    if (!user) {
      throw new UserNotFound()
    }

    return user
  }

  async findByGithubUser(githubUser: string): Promise<User> {
    const user = this.users.find((item) => item.githubUser === githubUser)
    if (!user) {
      throw new UserNotFound()
    }

    return user
  }

  async updateToken(User: User): Promise<User> {
    const index = this.users.findIndex((item) => item.id === User.id)

    this.users[index] = User

    const user = this.users.find((item) => item.id === User.id)

    return user
  }

  async tokenIsValid(githubUser: string): Promise<{
    accessToken: string
  }> {
    const user = this.users.find((item) => item.githubUser === githubUser)

    if (!user) {
      return { accessToken: '' }
    }

    return { accessToken: user.accessToken }
  }
}
