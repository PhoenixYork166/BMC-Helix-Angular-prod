import { Title } from '@angular/platform-browser';
import { RxBundleCacheService } from '../../caching/bundle-cache.service';
import { RxGlobalCacheService } from '../../caching/global-cache.service';
import { RxLogService } from '../../logging/log.service';
import * as i0 from "@angular/core";
export declare class RxPageTitleService {
    private title;
    private rxBundleCacheService;
    private rxGlobalCacheService;
    private rxLogService;
    constructor(title: Title, rxBundleCacheService: RxBundleCacheService, rxGlobalCacheService: RxGlobalCacheService, rxLogService: RxLogService);
    set(title?: string | string[], bundleId?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxPageTitleService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxPageTitleService>;
}
