import { User } from '@src/application/entities/user';
import { CreateUser } from '@src/application/use-cases/user/create-user';
import { GetUser } from '@src/application/use-cases/user/get-user';
import { CreateUserBody } from '@infra/http/dtos/user/create-user-body';
import { GetUserBody } from '@infra/http/dtos/user/get-user-body';
import { GetUserByName } from '@src/application/use-cases/user/get-user-by-name';
import { UpdateUserToken } from '@src/application/use-cases/user/update-user-token';
import { UpdateAccessTokenUserBody } from '@infra/http/dtos/user/update-access-token-user-body';
import { GetAccessTokenUser } from '@src/application/use-cases/auth/get-access-token-user';
export declare class UserController {
    private readonly createUser;
    private readonly getUser;
    private readonly getUserByName;
    private readonly updateUserToken;
    private readonly getAccessTokenUser;
    constructor(createUser: CreateUser, getUser: GetUser, getUserByName: GetUserByName, updateUserToken: UpdateUserToken, getAccessTokenUser: GetAccessTokenUser);
    get(body: GetUserBody): Promise<{
        user: User;
        messageError?: string;
    }>;
    getUserByNameParams(githubUser: string): Promise<{
        user: User;
    }>;
    getAccessToken(githubUser: string): Promise<{
        token: {
            accessToken: string;
            userId: string;
        };
    }>;
    create(body: CreateUserBody): Promise<{
        user: User;
    }>;
    updateToken(githubUser: string, body: UpdateAccessTokenUserBody): Promise<{
        user: User;
    }>;
}
