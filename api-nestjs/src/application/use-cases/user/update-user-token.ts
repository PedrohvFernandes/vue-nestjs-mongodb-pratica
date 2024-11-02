import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from '@src/application/repositories/users-repository'
import { UserNotFound } from '../errors/user-not-found'
import { User } from '@src/application/entities/user'

interface UpdateUserTokenRequest {
  githubUser: string
  accessToken: string
}

interface UpdateUserResponse {
  user: User
}

@Injectable()
export class UpdateUserToken {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: UpdateUserTokenRequest): Promise<UpdateUserResponse> {
    const userExist = await this.userRepository.findByGithubUser(
      request.githubUser
    )

    if (!userExist) {
      throw new NotFoundException(new UserNotFound().message)
    }

    const updateUser = new User(
      {
        ...userExist.valuesUser,
        accessToken: request.accessToken
      },
      userExist.id
    )

    updateUser.updatedAtUser = new Date()

    const user = await this.userRepository.updateToken(updateUser)

    return {
      user
    }
  }
}
