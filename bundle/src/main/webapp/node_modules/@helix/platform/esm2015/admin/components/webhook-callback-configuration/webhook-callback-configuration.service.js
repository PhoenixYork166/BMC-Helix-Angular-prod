import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxWebhookCallbackConfigurationService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.metadataFieldData = this.httpClient.get('/api/rx/application/webhook/processorsmetadata');
    }
    getMetadataFields() {
        return this.metadataFieldData;
    }
}
RxWebhookCallbackConfigurationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebhookCallbackConfigurationService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxWebhookCallbackConfigurationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebhookCallbackConfigurationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebhookCallbackConfigurationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=webhook-callback-configuration.service.js.map