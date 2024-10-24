import { Body, Controller, Get, Post } from '@nestjs/common'
import { User } from '@src/application/entities/user'
import { CreateUser } from '@src/application/use-cases/user/create-user'
import { GetUser } from '@src/application/use-cases/user/get-user'
import { CreateUserBody } from '@infra/http/dtos/user/create-user-body'
import { GetUserBody } from '@infra/http/dtos/user/get-user-body'

@Controller('users')
export class UserController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly createUser: CreateUser,
    private readonly getUser: GetUser
  ) {}

  @Get()
  async get(@Body() body: GetUserBody): Promise<User> {
    const { userId } = body

    const { user } = await this.getUser.execute({ userId })

    return user
  }

  @Post()
  async create(@Body() body: CreateUserBody): Promise<User> {
    const { githubUser, username } = body

    const { user } = await this.createUser.execute({ githubUser, username })

    return user
  }
}
