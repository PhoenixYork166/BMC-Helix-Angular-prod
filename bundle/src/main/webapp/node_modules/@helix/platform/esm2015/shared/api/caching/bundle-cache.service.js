import { Injectable } from '@angular/core';
import { RxLogService } from '../logging/log.service';
import { RxGlobalCacheService } from './global-cache.service';
import { RX_BUNDLE } from '../bundle/bundle.constant';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { RxActionTypeDataPageService } from '../action-type/action-type-data-page.service';
import { RxDefinitionService } from '../definition/definition.service';
import * as i0 from "@angular/core";
import * as i1 from "../action-type/action-type-data-page.service";
import * as i2 from "../logging/log.service";
import * as i3 from "./global-cache.service";
import * as i4 from "../definition/definition.service";
export class RxBundleCacheService {
    constructor(rxActionTypeDataPageService, rxLogService, rxGlobalCacheService, rxDefinitionService) {
        this.rxActionTypeDataPageService = rxActionTypeDataPageService;
        this.rxLogService = rxLogService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxDefinitionService = rxDefinitionService;
        this.actionTypes$ = this.rxActionTypeDataPageService
            .get({ params: { requireDependent: true } })
            .pipe(map((actionTypes) => actionTypes.data), shareReplay(1));
        this.bundleIdSubject$ = new ReplaySubject(1);
        this.bundleId$ = this.bundleIdSubject$.asObservable();
    }
    get bundleId() {
        return this.bundleIdValue;
    }
    set bundleId(value) {
        this.bundleIdValue = value;
        this.bundleIdSubject$.next(value);
        this.rxLogService.debug(`RxBundleCacheService: bundle ID set to ${value}`);
    }
    getActionTypes() {
        return this.actionTypes$;
    }
    getCurrentBundleDescriptor() {
        return this.bundleId$.pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleDescriptor(bundleId)));
    }
    getDefinitionScopeName(definitionScopeType) {
        return this.getCurrentBundleDescriptor().pipe(map((bundleDescriptor) => this.rxDefinitionService.getScopeName(definitionScopeType, bundleDescriptor)));
    }
    getDefinitionScopeSelectionOptions() {
        return this.getCurrentBundleDescriptor().pipe(map((bundleDescriptor) => bundleDescriptor.isApplication
            ? RX_BUNDLE.applicationDefinitionScopeSelectionOptions
            : RX_BUNDLE.libraryDefinitionScopeSelectionOptions));
    }
}
RxBundleCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleCacheService, deps: [{ token: i1.RxActionTypeDataPageService }, { token: i2.RxLogService }, { token: i3.RxGlobalCacheService }, { token: i4.RxDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxBundleCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxActionTypeDataPageService }, { type: i2.RxLogService }, { type: i3.RxGlobalCacheService }, { type: i4.RxDefinitionService }]; } });
//# sourceMappingURL=bundle-cache.service.js.map