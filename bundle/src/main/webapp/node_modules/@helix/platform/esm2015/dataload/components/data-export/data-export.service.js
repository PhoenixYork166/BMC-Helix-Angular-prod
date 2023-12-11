import { Injectable } from '@angular/core';
import { isUndefined } from 'lodash';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class DataExportService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.url = `/api/${RX_APPLICATION.dataloadBundleId}/rx/application/dataexport/`;
    }
    isRecordDefinitionResponse(definitionResponse) {
        return !isUndefined(definitionResponse.fieldDefinitions);
    }
    startDataExport(instanceId) {
        return this.httpClient.post(`${this.url}${instanceId}`, {});
    }
}
DataExportService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
DataExportService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data-export.service.js.map