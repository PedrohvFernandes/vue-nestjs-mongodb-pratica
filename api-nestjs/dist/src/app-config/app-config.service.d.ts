import { ConfigService } from '@nestjs/config';
export declare class AppConfigService {
    private readonly config;
    constructor(config: ConfigService);
    get starWarsApiUrl(): string;
    get portApi(): number;
    get githubClientId(): string;
    get githubClientSecret(): string;
    get jwtSecret(): string;
    get apiComments(): string;
    get preFix(): string;
}
