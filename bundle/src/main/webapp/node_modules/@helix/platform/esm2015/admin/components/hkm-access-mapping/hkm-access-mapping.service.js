import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxHkmAccessMappingService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.knowledgeApi = '/api/rx/application/knowledge';
        this.folderCache = new Map();
    }
    callItsmMappingApi() {
        return this.httpClient.get(`${this.knowledgeApi}/mapping/itsm`);
    }
    callHkmMappingApi() {
        return this.httpClient.get(`${this.knowledgeApi}/mapping/hkm`);
    }
    getFolderAccess(userGroupId, portalId, nodeId) {
        const cacheKey = `${userGroupId}-${portalId}-${nodeId}`;
        if (this.folderCache.has(cacheKey)) {
            return of(this.folderCache.get(cacheKey));
        }
        const request = encodeURIComponent(`v1/contentaccess/${userGroupId}/${portalId}/${nodeId}`);
        return this.httpClient
            .get(`${this.knowledgeApi}?ComAroundRequest=${request}`)
            .pipe(tap((folders) => this.folderCache.set(cacheKey, folders)));
    }
    deleteAccessMappings(hkmGroupMappingIds) {
        return this.httpClient.delete(`${this.knowledgeApi}/mapping/delete/${hkmGroupMappingIds.join(',')}`);
    }
    saveAccessMappings(hkmGroupMappings) {
        return this.httpClient.post(`${this.knowledgeApi}/mapping/save`, hkmGroupMappings);
    }
}
RxHkmAccessMappingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHkmAccessMappingService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxHkmAccessMappingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHkmAccessMappingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHkmAccessMappingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=hkm-access-mapping.service.js.map