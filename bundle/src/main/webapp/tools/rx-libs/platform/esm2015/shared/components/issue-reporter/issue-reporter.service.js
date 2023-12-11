import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { forEach } from 'lodash';
import { RxRecordInstanceService } from '@helix/platform/record/api';
import { RxBundleCacheService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { RX_ISSUE_REPORTER } from './issue-reporter.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@helix/platform/shared/api";
export class RxIssueReporterService {
    constructor(rxRecordInstanceService, rxGlobalCacheService, rxBundleCacheService) {
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxBundleCacheService = rxBundleCacheService;
    }
    reportIssue(message, data) {
        return this.prepareIssueDetails(message, data).pipe(switchMap((issueDetails) => {
            return this.rxRecordInstanceService.getNew(RX_ISSUE_REPORTER.recordDefinitionName).pipe(map((recordInstance) => {
                forEach(RX_ISSUE_REPORTER.recordFields, (field) => {
                    let fieldValue = issueDetails[field.name] || null;
                    if (field.id === RX_ISSUE_REPORTER.recordFields.messageType.id) {
                        fieldValue = RX_ISSUE_REPORTER.messageTypeOptions[fieldValue];
                    }
                    recordInstance.setFieldValue(field.id, fieldValue);
                });
                return recordInstance;
            }));
        }), switchMap((recordInstance) => this.rxRecordInstanceService.create(recordInstance)));
    }
    prepareIssueDetails(message, error = {}) {
        return this.rxGlobalCacheService.getBundleDescriptor(this.rxBundleCacheService.bundleId).pipe(map((bundleDescriptor) => ({
            details: message,
            applicationName: bundleDescriptor.friendlyName || null,
            messageType: error.messageType || null,
            messageNumber: error.messageNumber || null,
            operationId: error.operationId || null,
            messageText: error.messageText || error.appendedText ? `${error.messageText} ${error.appendedText}` : null
        })));
    }
}
RxIssueReporterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterService, deps: [{ token: i1.RxRecordInstanceService }, { token: i2.RxGlobalCacheService }, { token: i2.RxBundleCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxIssueReporterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceService }, { type: i2.RxGlobalCacheService }, { type: i2.RxBundleCacheService }]; } });
//# sourceMappingURL=issue-reporter.service.js.map