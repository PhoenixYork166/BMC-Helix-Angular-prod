import { Injectable } from '@angular/core';
import { RxViewDefinitionService } from './view-definition.service';
import { RxViewDefinitionDataPageService } from './view-definition-data-page.service';
import { map, pluck, shareReplay } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "./view-definition.service";
import * as i2 from "./view-definition-data-page.service";
export class RxViewDefinitionCacheService {
    constructor(rxViewDefinitionService, viewDefinitionDataPageService) {
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.viewDefinitionDataPageService = viewDefinitionDataPageService;
        this.viewDefinitionCache = new Map();
        this.viewDefinitionNamesCache = new Map();
        this.consumers = new Set();
    }
    getViewDefinitionNames(bundleId) {
        if (!this.viewDefinitionNamesCache.has(bundleId)) {
            const viewDefinitionNames$ = this.viewDefinitionDataPageService
                .get({
                headers: { 'default-bundle-scope': bundleId },
                params: { propertySelection: ['name'], viewType: 'REGULAR' }
            })
                .pipe(pluck('data'), map((viewDefinitionsNames) => viewDefinitionsNames.map((viewDefinition) => viewDefinition.name)), shareReplay(1));
            this.viewDefinitionNamesCache.set(bundleId, viewDefinitionNames$);
        }
        return this.viewDefinitionNamesCache.get(bundleId);
    }
    getViewDefinition(viewDefinitionName, options) {
        if (!this.viewDefinitionCache.has(viewDefinitionName)) {
            const viewDefinition$ = this.rxViewDefinitionService.get(viewDefinitionName, options).pipe(shareReplay(1));
            this.viewDefinitionCache.set(viewDefinitionName, viewDefinition$);
        }
        return this.viewDefinitionCache.get(viewDefinitionName);
    }
    registerConsumer(consumerDestroy$) {
        this.consumers.add(consumerDestroy$);
        consumerDestroy$.subscribe(() => {
            this.consumers.delete(consumerDestroy$);
            if (isEmpty(this.consumers)) {
                this.clearCache();
            }
        });
    }
    clearCache() {
        this.viewDefinitionCache.clear();
        this.viewDefinitionNamesCache.clear();
    }
}
RxViewDefinitionCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionCacheService, deps: [{ token: i1.RxViewDefinitionService }, { token: i2.RxViewDefinitionDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDefinitionCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewDefinitionService }, { type: i2.RxViewDefinitionDataPageService }]; } });
//# sourceMappingURL=view-definition-cache.service.js.map