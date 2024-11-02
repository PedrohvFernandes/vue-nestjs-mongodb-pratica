import { UserRepository } from '@application/repositories/users-repository';
interface GetAccessTokenRequest {
    githubUser: string;
}
interface GetAccessTokenResponse {
    token: {
        accessToken: string;
        userId: string;
    };
}
export declare class GetAccessTokenUser {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(request: GetAccessTokenRequest): Promise<GetAccessTokenResponse>;
}
export {};
