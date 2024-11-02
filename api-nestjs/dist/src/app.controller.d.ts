import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getProfile(req: any): any;
    getMain(res: any): any;
}
