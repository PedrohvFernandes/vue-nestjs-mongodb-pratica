import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '@src/app-config/app-config.service';
import { AxiosService } from '@src/infra/axios/axios.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly config;
    private readonly axiosService;
    constructor(jwtService: JwtService, config: AppConfigService, axiosService: AxiosService);
    validateToken(githubUser: string): Promise<{
        githubUser: string;
        username: string;
        accessToken: string;
        userId: string;
    } | null>;
    generateOrUpdateToken(user: any, existingUser: {
        existingToken: string;
        userId: string;
    }): Promise<{
        githubUser: string;
        username: string;
        accessToken: string;
        userId: string;
    }>;
}
