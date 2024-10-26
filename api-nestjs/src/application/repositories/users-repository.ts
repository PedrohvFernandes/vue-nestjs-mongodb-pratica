import { User } from '@application/entities/user'

// Repository é para fazer a comunicação com o banco de dados
export abstract class UserRepository {
  abstract create(user: User): Promise<User>
  abstract findById(userId: string): Promise<User>
  abstract findByGithubUser(githubUser: string): Promise<User>
  abstract updateToken(user: User): Promise<User>
  abstract tokenIsValid(githubUser: string): Promise<{ accessToken: string }>
}
