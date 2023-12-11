import { RxGlobalCacheService } from '../caching/global-cache.service';
import { IRxApplicationInitializer } from './application-initializer.interface';
import * as i0 from "@angular/core";
export declare class RxApplicationRegistryService {
    private rxGlobalCacheService;
    constructor(rxGlobalCacheService: RxGlobalCacheService);
    register(applicationId: string, initializer: IRxApplicationInitializer): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxApplicationRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxApplicationRegistryService>;
}
