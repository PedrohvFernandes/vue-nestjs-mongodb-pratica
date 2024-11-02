import { User } from '@application/entities/user';
import { UserRepository } from '@application/repositories/users-repository';
interface GetUserByNameRequest {
    githubUser: string;
}
interface GetUserByNameResponse {
    user: User;
}
export declare class GetUserByName {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(request: GetUserByNameRequest): Promise<GetUserByNameResponse>;
}
export {};
