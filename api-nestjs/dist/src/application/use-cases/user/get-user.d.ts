import { User } from '@application/entities/user';
import { UserRepository } from '@application/repositories/users-repository';
interface GetUserRequest {
    userId: string;
}
interface GetUserResponse {
    user: User;
}
export declare class GetUser {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(request: GetUserRequest): Promise<GetUserResponse>;
}
export {};
