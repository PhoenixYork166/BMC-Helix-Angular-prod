import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { assign, castArray, fromPairs, isEmpty } from 'lodash';
import { RxAssociationDefinitionDataPageService, RxAssociationNodeTreeDataPageService } from '@helix/platform/association/api';
import { RxRecordDefinitionService } from './record-definition.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/association/api";
import * as i2 from "./record-definition.service";
export class RxRecordDefinitionCacheService {
    constructor(rxAssociationDefinitionDataPageService, rxAssociationNodeTreeDataPageService, rxRecordDefinitionService) {
        this.rxAssociationDefinitionDataPageService = rxAssociationDefinitionDataPageService;
        this.rxAssociationNodeTreeDataPageService = rxAssociationNodeTreeDataPageService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.consumers = new Set();
        this.recordDefinitions = new Map();
        this.recordAssociationDefinitions = new Map();
        this.recordAssociationTrees = new Map();
    }
    getRecordAssociationDefinitions(recordDefinitionNames) {
        recordDefinitionNames = castArray(recordDefinitionNames);
        const requestedAssociationDefinitions = [];
        recordDefinitionNames.forEach((recordDefinitionName) => {
            if (!this.recordAssociationDefinitions.has(recordDefinitionName)) {
                const recordAssociationDefinition$ = this.rxAssociationDefinitionDataPageService
                    .getRecordAssociationDefinitions(recordDefinitionName)
                    .pipe(map((result) => fromPairs([[recordDefinitionName, result[0].data]])), shareReplay(1));
                this.recordAssociationDefinitions.set(recordDefinitionName, recordAssociationDefinition$);
            }
            requestedAssociationDefinitions.push(this.recordAssociationDefinitions.get(recordDefinitionName));
        });
        return forkJoin(requestedAssociationDefinitions).pipe(map((recordAssociationDefinitionData) => {
            return assign({}, ...recordAssociationDefinitionData);
        }));
    }
    getRecordAssociationTree(recordDefinitionName) {
        if (!this.recordAssociationTrees.has(recordDefinitionName)) {
            this.recordAssociationTrees.set(recordDefinitionName, this.rxAssociationNodeTreeDataPageService
                .get({
                params: {
                    startIndex: 0,
                    pageSize: -1,
                    depth: 2,
                    recorddefinition: recordDefinitionName
                }
            })
                .pipe(map((dataPage) => dataPage.data), shareReplay(1)));
        }
        return this.recordAssociationTrees.get(recordDefinitionName);
    }
    getRecordAssociationTrees(recordDefinitionNames) {
        return forkJoin(recordDefinitionNames.map((recordDefinitionName) => this.getRecordAssociationTree(recordDefinitionName)));
    }
    getRecordDefinition(recordDefinitionName, options) {
        if (!this.recordDefinitions.has(recordDefinitionName)) {
            const recordDefinition$ = this.rxRecordDefinitionService.get(recordDefinitionName, options).pipe(shareReplay(1));
            this.recordDefinitions.set(recordDefinitionName, recordDefinition$);
        }
        return this.recordDefinitions.get(recordDefinitionName);
    }
    getRecordDefinitions(recordDefinitionNames, options) {
        return forkJoin(recordDefinitionNames.map((recordDefinitionName) => this.getRecordDefinition(recordDefinitionName, options)));
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
        this.recordDefinitions.clear();
        this.recordAssociationDefinitions.clear();
    }
}
RxRecordDefinitionCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionCacheService, deps: [{ token: i1.RxAssociationDefinitionDataPageService }, { token: i1.RxAssociationNodeTreeDataPageService }, { token: i2.RxRecordDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordDefinitionCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxAssociationDefinitionDataPageService }, { type: i1.RxAssociationNodeTreeDataPageService }, { type: i2.RxRecordDefinitionService }]; } });
//# sourceMappingURL=record-definition-cache.service.js.map