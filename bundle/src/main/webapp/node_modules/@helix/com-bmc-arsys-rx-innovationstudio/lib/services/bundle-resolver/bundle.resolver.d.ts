import { Observable } from 'rxjs';
import { IBundleContext, RxBundleService, RxGlobalCacheService, RxLogService } from '@helix/platform/shared/api';
import { RxViewActionRegistryService, RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class AxBundleResolver {
    private rxBundleService;
    private rxLogService;
    private rxGlobalCacheService;
    private rxViewActionRegistryService;
    private rxViewComponentRegistryService;
    constructor(rxBundleService: RxBundleService, rxLogService: RxLogService, rxGlobalCacheService: RxGlobalCacheService, rxViewActionRegistryService: RxViewActionRegistryService, rxViewComponentRegistryService: RxViewComponentRegistryService);
    resolve(): Observable<IBundleContext[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AxBundleResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AxBundleResolver>;
}
