import { UserRepository } from '@application/repositories/users-repository'
import { PrismaService } from '../prisma.service'
import { User } from '@src/application/entities/user'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { Injectable } from '@nestjs/common'

// Não esquece desse Injectable, ele é importante para o nestjs passar o prisma como dependencia
@Injectable()
export class PrismaUserRepository implements UserRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const userExist = await this.prisma.user.findFirst({
      where: {
        username: user.username
      }
    })

    if (userExist) {
      return
    }

    const raw = PrismaUserMapper.toPrisma(user)

    const userCreate = await this.prisma.user.create({
      data: raw
    })

    return PrismaUserMapper.toDomain(userCreate)
  }

  async findById(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      return
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByGithubUser(githubUser: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        githubUser
      }
    })

    if (!user) {
      return
    }

    return PrismaUserMapper.toDomain(user)
  }

  async updateToken(user: User): Promise<User> {
    const raw = PrismaUserMapper.toPrisma(user)

    const userUpdated = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        accessToken: raw.accessToken,
        updatedAt: raw.updatedAt
      }
    })

    return PrismaUserMapper.toDomain(userUpdated)
  }

  async tokenIsValid(githubUser: string): Promise<{
    accessToken: string
    userId: string
  }> {
    const user = await this.prisma.user.findFirst({
      where: {
        githubUser
      }
    })

    // Deixei para fazer essa validação no usecase usando findByGithubUser
    // if (!user) {
    //   return
    // }

    if (!user.accessToken) {
      return
    }

    return PrismaUserMapper.toDomainAccessToken(user)
  }
}
