import { User } from '@application/entities/user'
import { UserRepository } from '@application/repositories/users-repository'
import { UserNotFound } from '../errors/user-not-found'

interface GetUserRequest {
  userId: string
}

interface GetUserResponse {
  user: User
}

export class GetUser {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userRepository.findById(request.userId)

    if (!user) {
      throw new UserNotFound()
    }

    return { user }
  }
}
