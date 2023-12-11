import { Injectable } from '@angular/core';
import { RX_RESOURCE_URLS } from '@helix/platform/shared/api';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxIpaasBaseApisService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    renameApiGroup(resourceType, oldGroupName, newGroupName) {
        return this.httpClient.post(RX_RESOURCE_URLS.command, {
            resourceType: resourceType,
            oldGroup: oldGroupName,
            newGroup: newGroupName
        });
    }
}
RxIpaasBaseApisService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIpaasBaseApisService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxIpaasBaseApisService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIpaasBaseApisService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIpaasBaseApisService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=ipaas-base-apis.service.js.map