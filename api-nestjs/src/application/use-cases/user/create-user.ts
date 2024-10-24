import { User } from '@application/entities/user'
import { UserRepository } from '@application/repositories/users-repository'
import { ErrorCreateUser } from '../errors/error-create-user'

interface CreateUserRequest {
  // user: User
  username: string
  githubUser: string
}

interface CreateUserResponse {
  user: User
}

export class CreateUser {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    // const { user } = request

    // const userCreate = new User({
    //   githubUser: user.githubUser,
    //   username: user.username
    // })

    const { githubUser, username } = request

    const user = new User({
      githubUser,
      username
    })

    const userCreated = await this.userRepository.create(user)

    if (!userCreated) {
      throw new ErrorCreateUser()
    }

    return {
      user: userCreated
    }
  }
}
