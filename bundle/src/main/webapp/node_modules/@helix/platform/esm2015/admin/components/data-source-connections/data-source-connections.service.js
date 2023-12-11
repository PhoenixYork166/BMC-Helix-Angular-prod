import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'lodash';
import { RX_DATA_SOURCE_CONNECTIONS } from './data-source-connections.constant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxDataSourceConnectionsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    getDataSourceConnection(connectionId) {
        return this.httpClient.get(`${RX_DATA_SOURCE_CONNECTIONS.dataSourceConnectionUrl}/${connectionId}`);
    }
    createDataSourceConnection(dataSourceConnection) {
        return this.httpClient.post(RX_DATA_SOURCE_CONNECTIONS.dataSourceConnectionUrl, dataSourceConnection);
    }
    updateDataSourceConnection(connectionId, dataSourceConnection) {
        return this.httpClient.put(`${RX_DATA_SOURCE_CONNECTIONS.dataSourceConnectionUrl}/${connectionId}`, dataSourceConnection);
    }
    deleteDataSourceConnections(recordInstanceIds) {
        return forkJoin(map(recordInstanceIds, (id) => this.httpClient.delete(`${RX_DATA_SOURCE_CONNECTIONS.dataSourceConnectionUrl}/${id}`)));
    }
}
RxDataSourceConnectionsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataSourceConnectionsService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxDataSourceConnectionsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataSourceConnectionsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataSourceConnectionsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data-source-connections.service.js.map