import { HttpClient } from '@angular/common/http';
import { Compiler, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import { IHttpGetParams } from '../http/http.interfaces';
import { RxLogService } from '../logging/log.service';
import { IBundleContext, IBundleDescriptor } from './bundle.interfaces';
import * as i0 from "@angular/core";
export declare class RxBundleService {
    private document;
    private compiler;
    private httpClient;
    private injector;
    private rxGlobalCacheService;
    private rxLogService;
    private baseUrl;
    private bundleJs;
    private bundleCss;
    constructor(document: any, compiler: Compiler, httpClient: HttpClient, injector: Injector, rxGlobalCacheService: RxGlobalCacheService, rxLogService: RxLogService);
    get(bundleId: string, options?: IHttpGetParams): Observable<IBundleDescriptor>;
    getFromJsonp(bundleId: string): Observable<IBundleDescriptor>;
    loadBundles(bundleIds: string[], force: boolean): Observable<IBundleContext[]>;
    private loadBundle;
    private compileBundle;
    private loadBundleJs;
    private loadBundleCss;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxBundleService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxBundleService>;
}
