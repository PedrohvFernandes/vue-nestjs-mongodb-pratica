import { User } from '@src/application/entities/user';
import { User as RawUser } from '@prisma/client';
export declare class PrismaUserMapper {
    static toPrisma(user: User): {
        githubUser: string;
        username: string;
        accessToken: string;
        updatedAt: Date;
    };
    static toDomain(raw: RawUser): User;
    static toDomainAccessToken(raw: RawUser): {
        accessToken: string;
        userId: string;
    };
}
