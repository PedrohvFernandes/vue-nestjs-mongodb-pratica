import { HttpService } from '@nestjs/axios';
import { AppConfigService } from '@src/app-config/app-config.service';
import { AxiosResponse } from 'axios';
export declare class AxiosService {
    private readonly httpService;
    private readonly config;
    constructor(httpService: HttpService, config: AppConfigService);
    get<T>(url: string, config?: any): Promise<AxiosResponse<T>>;
    post<T>(url: string, data: any, config?: any): Promise<AxiosResponse<T>>;
    put<T>(url: string, data: any, config?: any): Promise<AxiosResponse<T>>;
    resolveTokenJWT(accessToken: string): Promise<{
        githubUser: string;
        username: string;
    }>;
}
