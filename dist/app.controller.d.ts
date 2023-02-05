import { AppService } from './app.service';
import { Request } from 'express';
export declare class TesteController {
    private readonly appService;
    constructor(appService: AppService);
    test(): any;
    test_post(): any;
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    get(request: Request): Promise<any>;
    post(request: Request): Promise<any>;
}
