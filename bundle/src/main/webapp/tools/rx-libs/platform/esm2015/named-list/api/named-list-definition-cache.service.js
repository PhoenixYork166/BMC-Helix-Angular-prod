import { Injectable } from '@angular/core';
import { RxNamedListDefinitionService } from './named-list-definition.service';
import { shareReplay } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "./named-list-definition.service";
export class RxNamedListDefinitionCacheService {
    constructor(rxNamedListDefinitionService) {
        this.rxNamedListDefinitionService = rxNamedListDefinitionService;
        this.consumers = new Set();
        this.namedListDefinitions = new Map();
    }
    getNamedListDefinition(namedListDefinitionName) {
        if (!this.namedListDefinitions.has(namedListDefinitionName)) {
            const namedListDefinition = this.rxNamedListDefinitionService.get(namedListDefinitionName).pipe(shareReplay(1));
            this.namedListDefinitions.set(namedListDefinitionName, namedListDefinition);
        }
        return this.namedListDefinitions.get(namedListDefinitionName);
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
        this.namedListDefinitions.clear();
    }
}
RxNamedListDefinitionCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionCacheService, deps: [{ token: i1.RxNamedListDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxNamedListDefinitionCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxNamedListDefinitionService }]; } });
//# sourceMappingURL=named-list-definition-cache.service.js.map