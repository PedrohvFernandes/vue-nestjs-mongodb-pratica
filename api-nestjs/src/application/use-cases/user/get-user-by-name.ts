import { User } from '@application/entities/user'
import { UserRepository } from '@application/repositories/users-repository'
import { UserNotFound } from '../errors/user-not-found'
import { Injectable, NotFoundException } from '@nestjs/common'

interface GetUserByNameRequest {
  githubUser: string
}

interface GetUserByNameResponse {
  user: User
}

@Injectable()
export class GetUserByName {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: GetUserByNameRequest): Promise<GetUserByNameResponse> {
    const user = await this.userRepository.findByGithubUser(request.githubUser)

    if (!user) {
      throw new NotFoundException(new UserNotFound().message)
    }

    return { user }
  }
}
