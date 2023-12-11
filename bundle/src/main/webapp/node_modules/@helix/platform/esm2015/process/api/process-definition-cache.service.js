import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { forEach, isEmpty } from 'lodash';
import { RxProcessDefinitionService } from './process-definition.service';
import * as i0 from "@angular/core";
import * as i1 from "./process-definition.service";
export class RxProcessDefinitionCacheService {
    constructor(rxProcessDefinitionService) {
        this.rxProcessDefinitionService = rxProcessDefinitionService;
        this.consumers = new Set();
        this.processDefinitionCache = new Map();
        this.processDefinitionOutputParamCache = new Map();
    }
    getProcessDefinition(processDefinitionName) {
        if (!this.processDefinitionCache.has(processDefinitionName)) {
            const processDefinition$ = this.rxProcessDefinitionService
                .get(processDefinitionName, {
                headers: new HttpHeaders({ 'Design-Time': 'true' })
            })
                .pipe(shareReplay(1));
            this.processDefinitionCache.set(processDefinitionName, processDefinition$);
        }
        return this.processDefinitionCache.get(processDefinitionName);
    }
    getOutputParams(processDefinitionName) {
        if (!this.processDefinitionOutputParamCache.has(processDefinitionName)) {
            const processDefinitionOutputParams$ = this.rxProcessDefinitionService
                .getOutputParams(processDefinitionName, {
                headers: new HttpHeaders({ 'Design-Time': 'true' })
            })
                .pipe(shareReplay(1));
            this.processDefinitionOutputParamCache.set(processDefinitionName, processDefinitionOutputParams$);
        }
        return this.processDefinitionOutputParamCache.get(processDefinitionName);
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
    clearCache(processDefinitionNames) {
        if (processDefinitionNames) {
            forEach(processDefinitionNames, (processDefinitionName) => {
                this.processDefinitionCache.delete(processDefinitionName);
                this.processDefinitionOutputParamCache.delete(processDefinitionName);
            });
        }
        else {
            this.processDefinitionCache.clear();
            this.processDefinitionOutputParamCache.clear();
        }
    }
}
RxProcessDefinitionCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionCacheService, deps: [{ token: i1.RxProcessDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessDefinitionCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxProcessDefinitionService }]; } });
//# sourceMappingURL=process-definition-cache.service.js.map