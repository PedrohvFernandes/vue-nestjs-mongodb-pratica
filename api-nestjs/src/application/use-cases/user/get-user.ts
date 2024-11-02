import { User } from '@application/entities/user'
import { UserRepository } from '@application/repositories/users-repository'
import { UserNotFound } from '../errors/user-not-found'
import { Injectable, NotFoundException } from '@nestjs/common'

interface GetUserRequest {
  userId: string
}

interface GetUserResponse {
  user: User
}

@Injectable()
export class GetUser {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userRepository.findById(request.userId)

    if (!user) {
      throw new NotFoundException(new UserNotFound().message)
    }

    return { user }
  }
}
