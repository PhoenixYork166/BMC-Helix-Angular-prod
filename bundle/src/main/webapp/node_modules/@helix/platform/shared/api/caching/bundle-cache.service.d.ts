import { RxLogService } from '../logging/log.service';
import { RxGlobalCacheService } from './global-cache.service';
import { Observable } from 'rxjs';
import { IBundleDescriptor } from '../bundle';
import { IScopeSelectionOption } from '../common-types';
import { RxActionTypeDataPageService } from '../action-type/action-type-data-page.service';
import { IActionType } from '../action-type/action-type.interfaces';
import { RxDefinitionService } from '../definition/definition.service';
import * as i0 from "@angular/core";
export declare class RxBundleCacheService {
    private rxActionTypeDataPageService;
    private rxLogService;
    private rxGlobalCacheService;
    private rxDefinitionService;
    private actionTypes$;
    private bundleIdValue;
    private bundleIdSubject$;
    bundleId$: Observable<string>;
    constructor(rxActionTypeDataPageService: RxActionTypeDataPageService, rxLogService: RxLogService, rxGlobalCacheService: RxGlobalCacheService, rxDefinitionService: RxDefinitionService);
    get bundleId(): string;
    set bundleId(value: string);
    getActionTypes(): Observable<IActionType[]>;
    getCurrentBundleDescriptor(): Observable<IBundleDescriptor>;
    getDefinitionScopeName(definitionScopeType: string): Observable<string>;
    getDefinitionScopeSelectionOptions(): Observable<IScopeSelectionOption[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxBundleCacheService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxBundleCacheService>;
}
