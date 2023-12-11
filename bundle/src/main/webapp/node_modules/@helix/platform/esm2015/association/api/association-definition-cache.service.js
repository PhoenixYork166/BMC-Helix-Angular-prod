import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { RxAssociationDefinitionService } from './association-definition.service';
import * as i0 from "@angular/core";
import * as i1 from "./association-definition.service";
export class RxAssociationDefinitionCacheService {
    constructor(rxAssociationDefinitionService) {
        this.rxAssociationDefinitionService = rxAssociationDefinitionService;
        this.associationDefinitions = new Map();
        this.consumers = new Set();
    }
    getAssociationDefinition(associationDefinitionName, options) {
        if (!this.associationDefinitions.has(associationDefinitionName)) {
            const associationDefinition$ = this.rxAssociationDefinitionService
                .get(associationDefinitionName, options)
                .pipe(shareReplay(1));
            this.associationDefinitions.set(associationDefinitionName, associationDefinition$);
        }
        return this.associationDefinitions.get(associationDefinitionName);
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
        this.associationDefinitions.clear();
    }
}
RxAssociationDefinitionCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionCacheService, deps: [{ token: i1.RxAssociationDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociationDefinitionCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxAssociationDefinitionService }]; } });
//# sourceMappingURL=association-definition-cache.service.js.map