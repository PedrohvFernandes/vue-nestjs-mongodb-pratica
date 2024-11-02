import { AuthService } from '@src/infra/auth/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    authCallback(req: any): Promise<{
        githubUser: string;
        username: string;
        userId: string;
    }>;
}
