import { UserRepository } from '@application/repositories/users-repository'
import { UserNotFound } from '../errors/user-not-found'
import { Injectable } from '@nestjs/common'
import { TokenNotFound } from '../errors/token-not-found'

interface GetAccessTokenRequest {
  githubUser: string
}

interface GetAccessTokenResponse {
  token?: {
    accessToken: string
  }
  messageError?: string
}

@Injectable()
export class GetAccessTokenUser {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    request: GetAccessTokenRequest
  ): Promise<GetAccessTokenResponse> {
    const userExist = await this.userRepository.findByGithubUser(
      request.githubUser
    )

    if (!userExist) {
      return {
        messageError: new UserNotFound().message
      }
    }

    const token = await this.userRepository.tokenIsValid(request.githubUser)

    if (!token) {
      return {
        messageError: new TokenNotFound().message
      }
    }

    return { token }
  }
}
