import { UserRepository } from '@application/repositories/users-repository';
import { PrismaService } from '../prisma.service';
import { User } from '@src/application/entities/user';
export declare class PrismaUserRepository implements UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(user: User): Promise<User>;
    findById(userId: string): Promise<User>;
    findByGithubUser(githubUser: string): Promise<User>;
    updateToken(user: User): Promise<User>;
    tokenIsValid(githubUser: string): Promise<{
        accessToken: string;
        userId: string;
    }>;
}
