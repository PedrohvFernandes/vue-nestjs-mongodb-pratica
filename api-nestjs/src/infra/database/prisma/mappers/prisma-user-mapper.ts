import { User } from '@src/application/entities/User'
import { User as RawUser } from '@prisma/client'

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      githubUser: user.githubUser,
      username: user.username
    }
  }

  // Ele recebe um objeto do tipo do prisma e retorna um objeto do tipo da aplicação
  static toDomain(raw: RawUser): User {
    return new User(
      {
        githubUser: raw.githubUser,
        username: raw.username
      },
      raw.id
    )
  }
}
