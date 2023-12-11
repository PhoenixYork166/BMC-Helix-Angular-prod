import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RX_SERVER_LOGS } from './server-logs.constant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxServerLogsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    getConfig() {
        return this.httpClient.get(RX_SERVER_LOGS.configUrl);
    }
    save(logsConfig) {
        return this.httpClient.post(RX_SERVER_LOGS.configUrl, logsConfig);
    }
    downloadServerLogs(logFileNames) {
        return this.httpClient.post(RX_SERVER_LOGS.downloadUrl, logFileNames, {
            observe: 'response',
            responseType: 'arraybuffer'
        });
    }
}
RxServerLogsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerLogsService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxServerLogsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerLogsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerLogsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=server-logs.service.js.map