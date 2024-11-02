import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { User } from '@src/application/entities/user'
import { CreateUser } from '@src/application/use-cases/user/create-user'
import { GetUser } from '@src/application/use-cases/user/get-user'
import { CreateUserBody } from '@infra/http/dtos/user/create-user-body'
import { GetUserBody } from '@infra/http/dtos/user/get-user-body'
import { GetUserByName } from '@src/application/use-cases/user/get-user-by-name'
import { UpdateUserToken } from '@src/application/use-cases/user/update-user-token'
import { UpdateAccessTokenUserBody } from '@infra/http/dtos/user/update-access-token-user-body'
import { GetAccessTokenUser } from '@src/application/use-cases/auth/get-access-token-user'

@Controller('users')
export class UserController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly createUser: CreateUser,
    private readonly getUser: GetUser,
    private readonly getUserByName: GetUserByName,
    private readonly updateUserToken: UpdateUserToken,
    private readonly getAccessTokenUser: GetAccessTokenUser
  ) {}

  @Get()
  async get(@Body() body: GetUserBody): Promise<{
    user: User
    messageError?: string
  }> {
    const { userId } = body

    const { user } = await this.getUser.execute({ userId })

    return {
      user
    }
  }

  @Get('/:githubUser')
  async getUserByNameParams(@Param('githubUser') githubUser: string): Promise<{
    user: User
  }> {
    const { user } = await this.getUserByName.execute({
      githubUser
    })

    return {
      user
    }
  }

  @Get('/accesstoken/:githubUser')
  async getAccessToken(@Param('githubUser') githubUser: string): Promise<{
    token: {
      accessToken: string
      userId: string
    }
  }> {
    const { token } = await this.getAccessTokenUser.execute({
      githubUser
    })

    return {
      token
    }
  }

  @Post()
  async create(@Body() body: CreateUserBody): Promise<{
    user: User
  }> {
    const { githubUser, username, accessToken } = body

    const { user } = await this.createUser.execute({
      githubUser,
      username,
      accessToken
    })

    return {
      user
    }
  }

  @Put('/:githubUser')
  async updateToken(
    @Param('githubUser') githubUser: string,
    @Body() body: UpdateAccessTokenUserBody
  ): Promise<{
    user: User
  }> {
    const { accessToken } = body

    const { user } = await this.updateUserToken.execute({
      githubUser,
      accessToken
    })

    return {
      user
    }
  }
}
