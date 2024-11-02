import { User } from '@src/application/entities/user';
export declare class UserViewModel {
    static toHTTP(user: User): {
        id: string;
        username: string;
        githubUser: string;
    };
}
