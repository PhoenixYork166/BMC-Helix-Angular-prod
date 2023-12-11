import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RX_ISSUE_REPORTING_CONFIGURATION } from './issue-reporting-configuration.constant';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RxSystemConfigurationService, RxCurrentUserService } from '@helix/platform/shared/api';
import { map } from 'rxjs/operators';
import { get } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@helix/platform/shared/api";
export class RxIssueReportingConfigurationService {
    constructor(httpClient, rxRecordInstanceDataPageService, rxCurrentUserService, rxSystemConfigurationService) {
        this.httpClient = httpClient;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
    }
    getOauthConfig() {
        return this.httpClient.get(RX_ISSUE_REPORTING_CONFIGURATION.oauthUrl);
    }
    getSupportId() {
        return this.rxSystemConfigurationService
            .getConfiguration(RX_ISSUE_REPORTING_CONFIGURATION.settingName)
            .pipe(map((result) => JSON.parse(result.value).supportId || ''));
    }
    setSupportId(supportId) {
        return this.rxSystemConfigurationService.setConfiguration(RX_ISSUE_REPORTING_CONFIGURATION.settingName, {
            supportId
        });
    }
    getSupportConfig() {
        return this.rxRecordInstanceDataPageService
            .post({
            params: {
                recorddefinition: RX_ISSUE_REPORTING_CONFIGURATION.supportUserMapping.recordDefinitionName,
                queryExpression: `'${RX_ISSUE_REPORTING_CONFIGURATION.supportUserMapping.fieldIds.loginName}' = "${this.rxCurrentUserService.getName()}"`,
                propertySelection: [
                    RX_RECORD_DEFINITION.coreFieldIds.id,
                    RX_ISSUE_REPORTING_CONFIGURATION.supportUserMapping.fieldIds.loginName,
                    RX_ISSUE_REPORTING_CONFIGURATION.supportUserMapping.fieldIds.supportEmail
                ]
            }
        })
            .pipe(map((result) => get(result, 'data[0]', null)));
    }
}
RxIssueReportingConfigurationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReportingConfigurationService, deps: [{ token: i1.HttpClient }, { token: i2.RxRecordInstanceDataPageService }, { token: i3.RxCurrentUserService }, { token: i3.RxSystemConfigurationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxIssueReportingConfigurationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReportingConfigurationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReportingConfigurationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxRecordInstanceDataPageService }, { type: i3.RxCurrentUserService }, { type: i3.RxSystemConfigurationService }]; } });
//# sourceMappingURL=issue-reporting-configuration.service.js.map