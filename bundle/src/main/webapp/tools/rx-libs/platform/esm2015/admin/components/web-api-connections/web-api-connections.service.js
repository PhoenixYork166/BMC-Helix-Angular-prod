import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, forkJoin } from 'rxjs';
import { castArray, cloneDeep } from 'lodash';
import { RxViewActionUtilsService } from '@helix/platform/view/api';
import { RX_WEB_API_CONNECTIONS } from './web-api-connections.constant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@helix/platform/view/api";
export class RxWebAPIConnectionsService {
    constructor(httpClient, injector, rxViewActionUtilsService) {
        this.httpClient = httpClient;
        this.injector = injector;
        this.rxViewActionUtilsService = rxViewActionUtilsService;
        this.path = '/api/rx/application/webapi/connection';
    }
    getAuthTypeDetails(webApiConnection) {
        const authTypeDetails = cloneDeep(webApiConnection.authTypeDetails);
        if (authTypeDetails.credentials === RX_WEB_API_CONNECTIONS.passwordMask) {
            authTypeDetails.credentials = null;
        }
        delete authTypeDetails.grantType;
        return authTypeDetails;
    }
    save(webApiConnection, id) {
        return this.httpClient.put(this.getUrl(id), this.getWebApiConnectionToSave(webApiConnection));
    }
    create(webApiConnection) {
        return this.httpClient.post(this.path, this.getWebApiConnectionToSave(webApiConnection));
    }
    getWebApiConnectionToSave(webApiConnection) {
        return {
            authTypeCode: webApiConnection.authTypeCode[0].id,
            authTypeDetails: this.getAuthTypeDetails(webApiConnection),
            hostname: webApiConnection.hostname,
            name: webApiConnection.name,
            port: webApiConnection.port,
            secure: webApiConnection.secure[0].id
        };
    }
    getUrl(id) {
        return `${this.path}/${encodeURIComponent(id)}`;
    }
    delete(id) {
        return this.httpClient.delete(this.getUrl(id));
    }
    deleteRecords(recordsApi) {
        const records = castArray(recordsApi.getSelectedRows());
        const recordIds = this.rxViewActionUtilsService.extractRecordIds(records);
        if (recordIds.length) {
            const deleteObservables = recordIds.map((recordId) => this.delete(recordId));
            return forkJoin(deleteObservables);
        }
        return EMPTY;
    }
}
RxWebAPIConnectionsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebAPIConnectionsService, deps: [{ token: i1.HttpClient }, { token: i0.Injector }, { token: i2.RxViewActionUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxWebAPIConnectionsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebAPIConnectionsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebAPIConnectionsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i0.Injector }, { type: i2.RxViewActionUtilsService }]; } });
//# sourceMappingURL=web-api-connections.service.js.map