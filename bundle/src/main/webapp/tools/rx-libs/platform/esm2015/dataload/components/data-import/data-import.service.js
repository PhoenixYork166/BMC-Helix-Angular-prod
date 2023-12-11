import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class DataImportService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.url = `/api/${RX_APPLICATION.dataloadBundleId}/rx/application/dataload/`;
    }
    runLoadProcess(id) {
        return this.httpClient.post(`${this.url}${id}`, {});
    }
    stopDataProcessing(id) {
        return this.httpClient.post(`${this.url}stop/${id}`, {});
    }
    getDataRecordWorksheet(recordId) {
        return this.httpClient.get(`${this.url}${recordId}/input_file_conf`);
    }
    getEmptyCurrentSheetDataMapConfig(sheetName) {
        return {
            name: sheetName,
            configurations: {
                definitionMappings: {
                    targetDefinition: {
                        type: null,
                        name: null
                    },
                    fieldMappings: []
                },
                dataHandlingOptions: [],
                timeFormatOptions: null,
                duplicateHandlingOptions: {
                    matchDuplicateBy: [],
                    handleDuplicateBy: null
                }
            }
        };
    }
}
DataImportService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
DataImportService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data-import.service.js.map