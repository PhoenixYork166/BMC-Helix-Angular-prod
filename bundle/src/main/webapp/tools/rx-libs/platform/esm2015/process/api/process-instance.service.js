import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxProcessInstanceService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    get(processDefinitionName, processInstanceId) {
        return this.httpClient.get(`/api/rx/application/process/processinstance/${encodeURIComponent(processDefinitionName)}/${processInstanceId}`);
    }
    getLog(processDefinitionName, processInstanceId) {
        return this.httpClient.get(`/api/rx/application/process/processinstance/log/${encodeURIComponent(processDefinitionName)}/${processInstanceId}/view`);
    }
    downloadLog(processDefinitionName, processInstanceId) {
        return this.httpClient.get(`/api/rx/application/process/processinstance/log/${encodeURIComponent(processDefinitionName)}/${processInstanceId}/download`, {
            responseType: 'blob'
        });
    }
}
RxProcessInstanceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessInstanceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=process-instance.service.js.map