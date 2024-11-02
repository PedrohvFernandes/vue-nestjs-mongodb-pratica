import { User } from '@src/application/entities/User'
import { User as RawUser } from '@prisma/client'

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      githubUser: user.githubUser,
      username: user.username,
      accessToken: user.accessToken,
      updatedAt: user.updatedAtUser
    }
  }

  // Ele recebe um objeto do tipo do prisma e retorna um objeto do tipo da aplicação
  static toDomain(raw: RawUser): User {
    const user = new User(
      {
        githubUser: raw.githubUser,
        username: raw.username
        // accessToken: raw.accessToken // Não é bacana retornar o token
      },
      raw.id,
      raw.createdAt,
      raw.updatedAt
    )
    // user.updatedAtUser = raw.updatedAt

    return user
  }

  // Um mapper somente para o token
  static toDomainAccessToken(raw: RawUser): {
    accessToken: string
    userId: string
  } {
    return {
      accessToken: raw.accessToken,
      userId: raw.id
    }
  }
}
