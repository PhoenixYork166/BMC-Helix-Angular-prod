import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { RxSystemConfigurationService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@helix/platform/shared/api";
export class RxApplicationIssuesService {
    constructor(httpClient, rxSystemConfigurationService) {
        this.httpClient = httpClient;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
    }
    getIssueReportingInfo() {
        return this.httpClient.get('/api/rx/application/oauth/token/IssueReporting');
    }
    getIssuesResource() {
        return forkJoin({
            issueReportingInfo: this.getIssueReportingInfo(),
            errorReportingInfo: this.rxSystemConfigurationService.getConfiguration('Error-Reporting-Service-Saas-Configuration')
        }).pipe(map((data) => {
            const errorReportingValue = JSON.parse(data.errorReportingInfo.value);
            const issuesResource = {
                issueReportingInfo: data.issueReportingInfo,
                errorReportingValue: errorReportingValue
            };
            return issuesResource;
        }));
    }
}
RxApplicationIssuesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationIssuesService, deps: [{ token: i1.HttpClient }, { token: i2.RxSystemConfigurationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplicationIssuesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationIssuesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationIssuesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxSystemConfigurationService }]; } });
//# sourceMappingURL=application-issues.service.js.map