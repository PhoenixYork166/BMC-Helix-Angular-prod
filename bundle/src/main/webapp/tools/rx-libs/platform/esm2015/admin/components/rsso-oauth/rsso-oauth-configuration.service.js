import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RxRecordInstanceService, RxRecordInstanceDataPageService, RX_RECORD_DEFINITION, RxRecordInstanceUpdateService } from '@helix/platform/record/api';
import { RX_RSSO_OAUTH } from './rsso-oauth.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
export class RxRssoOAuthConfigurationService {
    constructor(rxRecordInstanceService, rxRecordInstanceUpdateService, rxRecordInstanceDataPageService) {
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxRecordInstanceUpdateService = rxRecordInstanceUpdateService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
    }
    getConfigs() {
        return this.rxRecordInstanceDataPageService
            .post({
            params: {
                recorddefinition: RX_RSSO_OAUTH.recordDefinitionName,
                queryExpression: `('${RX_RECORD_DEFINITION.coreFieldIds.description}'="${RX_RSSO_OAUTH.oAuthConfigurationDescription}")`,
                propertySelection: [RX_RECORD_DEFINITION.coreFieldIds.id, RX_RSSO_OAUTH.fieldIds.oAuthProvider]
            }
        })
            .pipe(map((response) => {
            return response.data.map((rssoConfiguration) => {
                return Object.keys(rssoConfiguration).map(function (key) {
                    return { id: key, value: rssoConfiguration[key] };
                });
            });
        }));
    }
    saveConfigRecordInstance(recordInstance) {
        if (recordInstance.id) {
            return this.rxRecordInstanceUpdateService.execute(recordInstance);
        }
        else {
            return this.rxRecordInstanceService.create(recordInstance);
        }
    }
    getConfigRecordInstance(recordInstanceId) {
        if (recordInstanceId) {
            return this.rxRecordInstanceService.get(RX_RSSO_OAUTH.recordDefinitionName, recordInstanceId);
        }
        else {
            return this.rxRecordInstanceService.getNew(RX_RSSO_OAUTH.recordDefinitionName);
        }
    }
}
RxRssoOAuthConfigurationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRssoOAuthConfigurationService, deps: [{ token: i1.RxRecordInstanceService }, { token: i1.RxRecordInstanceUpdateService }, { token: i1.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRssoOAuthConfigurationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRssoOAuthConfigurationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRssoOAuthConfigurationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceService }, { type: i1.RxRecordInstanceUpdateService }, { type: i1.RxRecordInstanceDataPageService }]; } });
//# sourceMappingURL=rsso-oauth-configuration.service.js.map