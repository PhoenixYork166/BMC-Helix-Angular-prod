import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import moment from 'moment-es6';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
const notificationConfigApi = '/api/rx/application/telemetry/notification/config';
export class RxCognitiveConsumptionService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    getCognitiveConsumptionNotificationConfig(params) {
        return this.httpClient.get(notificationConfigApi, {
            params: {
                action: params.action,
                domain: params.domain
            }
        });
    }
    postCognitiveConsumptionNotificationConfigEntity(entity) {
        return this.httpClient.post(notificationConfigApi, entity);
    }
    putCognitiveConsumptionNotificationConfigEntity(entity) {
        return this.httpClient.put(notificationConfigApi, entity);
    }
    getCognitiveConsumptionNotificationHistory(params) {
        return this.httpClient.get('/api/rx/application/telemetry/notification/history', {
            params: {
                action: params.action,
                domain: params.domain
            }
        });
    }
    getCognitiveLicenseUsage(licenseType, id, params) {
        return this.httpClient.get(`/api/rx/application/license/licenseusage/${licenseType}/${id}`, {
            params: {
                countType: params.countType,
                endDate: moment(params.endDate, 'YYYY-MM').endOf('month').format('YYYY-MM-DD') + 'T23:59:59.999Z',
                startDate: moment(params.startDate, 'YYYY-MM').startOf('month').format('YYYY-MM-DD') + 'T00:00:00.000Z'
            }
        });
    }
}
RxCognitiveConsumptionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveConsumptionService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxCognitiveConsumptionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveConsumptionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveConsumptionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=cognitive-consumption.service.js.map