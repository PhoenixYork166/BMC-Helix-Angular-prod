import { Observable } from 'rxjs';
import { IDesignerStencilElement, RxActionTypeUtilsService, RxBundleCacheService, RxDefinitionNameService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { RxStringService } from '@helix/platform/utils';
import { ICallActivityElement } from './process-element.types';
import { RxCallActivityRegistryService } from './call-activity-registry.service';
import * as i0 from "@angular/core";
export declare class RxProcessElementsService {
    private rxActionTypeUtilsService;
    private rxBundleCacheService;
    private rxCallActivityRegistryService;
    private rxDefinitionNameService;
    private rxGlobalCacheService;
    private rxStringService;
    constructor(rxActionTypeUtilsService: RxActionTypeUtilsService, rxBundleCacheService: RxBundleCacheService, rxCallActivityRegistryService: RxCallActivityRegistryService, rxDefinitionNameService: RxDefinitionNameService, rxGlobalCacheService: RxGlobalCacheService, rxStringService: RxStringService);
    getActionElements(actionResourceType: string): Observable<IDesignerStencilElement[]>;
    getCallActivityElements(): Observable<IDesignerStencilElement[]>;
    getProcessElements(): Observable<IDesignerStencilElement[]>[];
    getStandardProcessElements(): Observable<IDesignerStencilElement[]>;
    getVisibleCallActivities(): Observable<ICallActivityElement[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxProcessElementsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxProcessElementsService>;
}
