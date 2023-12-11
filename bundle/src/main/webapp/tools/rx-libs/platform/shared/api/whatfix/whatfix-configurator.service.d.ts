import { RendererFactory2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RxCurrentUserService } from '../user/current-user.service';
import { RxLogService } from '../logging/log.service';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import { Observable } from 'rxjs';
import { IPlainObject } from '../common-types/plain-object.interface';
import * as i0 from "@angular/core";
export declare class RxWhatfixConfiguratorService {
    private document;
    private rendererFactory;
    private httpClient;
    private rxCurrentUserService;
    private rxLogService;
    private rxGlobalCacheService;
    private isConfigured;
    private renderer;
    private defaultConfig$;
    private isEnabled$;
    constructor(document: any, rendererFactory: RendererFactory2, httpClient: HttpClient, rxCurrentUserService: RxCurrentUserService, rxLogService: RxLogService, rxGlobalCacheService: RxGlobalCacheService);
    setConfig(accountId: string, config?: IPlainObject): void;
    getDefaultConfig(): Observable<IPlainObject>;
    private loadScript;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxWhatfixConfiguratorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxWhatfixConfiguratorService>;
}
