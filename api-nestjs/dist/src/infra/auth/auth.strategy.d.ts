import { AppConfigService } from '@src/app-config/app-config.service';
import { Profile } from 'passport-github';
declare const GithubStrategy_base: new (...args: any[]) => any;
export declare class GithubStrategy extends GithubStrategy_base {
    constructor(config: AppConfigService);
    validate(accessToken: string, _refreshToken: string, profile: Profile): Promise<Profile>;
}
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(config: AppConfigService);
    validate(payload: any): Promise<{
        githubUser: any;
        username: any;
    }>;
}
export {};
