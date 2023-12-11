import { IViewActionDescriptor, IViewActionDesignManager } from './view-action.interfaces';
import { RxBundleCacheService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { RxStringService } from '@helix/platform/utils';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxViewActionRegistryService {
    private rxGlobalCacheService;
    private rxStringService;
    private rxBundleCacheService;
    constructor(rxGlobalCacheService: RxGlobalCacheService, rxStringService: RxStringService, rxBundleCacheService: RxBundleCacheService);
    private viewActionDescriptors;
    private designManagers;
    private ownerBundleIds$;
    register(viewActionDescriptor: IViewActionDescriptor): void;
    get(actionName: string): IViewActionDescriptor;
    getRegisteredActions(): Map<string, IViewActionDescriptor>;
    getLicensedActions(): Observable<IViewActionDescriptor[]>;
    getActionOwnerBundleId(viewActionName: string): Observable<string>;
    private isBundleLicensed;
    private isActionAvailableInCurrentBundle;
    registerUnknownAction(unknownActionName: string): IViewActionDescriptor;
    registerDesignManager(actionName: string, designManagerService: IViewActionDesignManager): void;
    getDesignManager(actionName: string): IViewActionDesignManager;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewActionRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewActionRegistryService>;
}
