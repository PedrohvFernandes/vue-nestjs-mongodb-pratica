import { User } from '@application/entities/user';
import { UserRepository } from '@application/repositories/users-repository';
interface CreateUserRequest {
    username: string;
    githubUser: string;
    accessToken: string;
}
interface CreateUserResponse {
    user: User;
}
export declare class CreateUser {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(request: CreateUserRequest): Promise<CreateUserResponse>;
}
export {};
