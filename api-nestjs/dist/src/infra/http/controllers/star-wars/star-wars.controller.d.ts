import { AppConfigService } from '@appConfig/app-config.service';
export declare class StarWarsController {
    private readonly apiBaseUrl;
    constructor(config: AppConfigService);
    getCharacters(): Promise<any>;
}
