import { User } from '@src/application/entities/User'

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      username: user.username,
      githubUser: user.githubUser
    }
  }
}
