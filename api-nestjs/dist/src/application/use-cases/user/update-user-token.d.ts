import { UserRepository } from '@src/application/repositories/users-repository';
import { User } from '@src/application/entities/user';
interface UpdateUserTokenRequest {
    githubUser: string;
    accessToken: string;
}
interface UpdateUserResponse {
    user: User;
}
export declare class UpdateUserToken {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(request: UpdateUserTokenRequest): Promise<UpdateUserResponse>;
}
export {};
