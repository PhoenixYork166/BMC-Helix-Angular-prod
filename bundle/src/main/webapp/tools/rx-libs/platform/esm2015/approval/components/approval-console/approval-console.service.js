import { HttpClient } from '@angular/common/http';
import { RX_APPLICATION, RX_RESOURCE_URLS, RxCurrentUserService } from '@helix/platform/shared/api';
import { RX_APPROVAL_CONSOLE } from './approval-console.constant';
import { RX_RECORD_DEFINITION, RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { map } from 'rxjs/operators';
import { RxApprovalUsersDataPageService } from './approval-request-reassign/approval-users-data-page.service';
import { RxSignatureDetailDataPageService } from './signature-detail-data-page.service';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./signature-detail-data-page.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "./approval-request-reassign/approval-users-data-page.service";
export class RxApprovalConsoleService {
    constructor(httpClient, rxSignatureDetailDataPageService, rxCurrentUserService, rxRecordInstanceUtilsService, rxApprovalUsersDataPageService) {
        this.httpClient = httpClient;
        this.rxSignatureDetailDataPageService = rxSignatureDetailDataPageService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
        this.rxApprovalUsersDataPageService = rxApprovalUsersDataPageService;
    }
    getApprovalRequestCounts() {
        return this.httpClient.get(`/api/${RX_APPLICATION.approvalBundleId}/rx/application/approval/counts?ignoreAlternateUser=false`);
    }
    getRequestLabelDetails(registeredDefinitionName, approvalFlowName) {
        return this.httpClient.get(`/api/${RX_APPLICATION.approvalBundleId}/rx/application/approval/labels/${encodeURIComponent(registeredDefinitionName)}/${encodeURIComponent(approvalFlowName)}`);
    }
    getCurrentRequestDetails(requestId, application) {
        return this.rxSignatureDetailDataPageService
            .get({
            params: {
                request: requestId,
                application,
                ignoreAssignedUser: true
            }
        })
            .pipe(map((response) => response.data[0]));
    }
    approveRequest(approvalCommands) {
        return this.httpClient.post(RX_RESOURCE_URLS.command, {
            resourceType: RX_APPROVAL_CONSOLE.approvalServerCommand,
            commands: approvalCommands
        });
    }
    rejectRequest(approvalCommands) {
        return this.httpClient.post(RX_RESOURCE_URLS.command, {
            resourceType: RX_APPROVAL_CONSOLE.approvalServerCommand,
            commands: approvalCommands
        });
    }
    holdRequest(approvalCommands) {
        return this.httpClient.post(RX_RESOURCE_URLS.command, {
            resourceType: RX_APPROVAL_CONSOLE.approvalServerCommand,
            commands: approvalCommands
        });
    }
    reassignRequest(approvalCommands) {
        return this.httpClient.post(RX_RESOURCE_URLS.command, {
            resourceType: RX_APPROVAL_CONSOLE.approvalServerCommand,
            commands: approvalCommands
        });
    }
    getCommandPayload(commandType, requestSignatureInstanceId) {
        return {
            formName: RX_APPROVAL_CONSOLE.approvalCommandForm,
            requestID: requestSignatureInstanceId,
            command: commandType
        };
    }
    saveQuestion(formData, type) {
        return this.httpClient.post(`/api/${RX_APPLICATION.approvalBundleId}/rx/application/approval/moreinformation/${type}`, formData);
    }
    saveAttachment(formData, guid) {
        return this.httpClient.post(`${RX_RECORD_DEFINITION.recordInstanceAttachment}/${encodeURIComponent(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition)}/${guid}`, formData);
    }
    getApprovalUsers(startIndex, pageSize, searchQuery) {
        const queryParams = {
            startIndex: startIndex,
            pageSize: pageSize,
            propertySelection: ['loginName', 'fullName']
        };
        queryParams.queryExpression = `'${RX_APPROVAL_CONSOLE.approvalUserNameField}'!="${this.rxCurrentUserService.getName()}"`;
        if (searchQuery) {
            queryParams.queryExpression +=
                ` AND ('${RX_RECORD_DEFINITION.coreFieldIds.description}' LIKE "%${this.rxRecordInstanceUtilsService.escapeTextWildcards(searchQuery)}%"` +
                    ` OR '${RX_APPROVAL_CONSOLE.approvalUserNameField}' LIKE "%${this.rxRecordInstanceUtilsService.escapeTextWildcards(searchQuery)}%")`;
        }
        return this.rxApprovalUsersDataPageService
            .get({
            params: Object.assign({ startIndex, pageSize }, queryParams)
        })
            .pipe(map((response) => ({
            totalSize: response.totalSize,
            options: response.data.map(({ fullName, loginName }) => ({
                displayValue: fullName,
                value: loginName
            }))
        })));
    }
}
RxApprovalConsoleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConsoleService, deps: [{ token: i1.HttpClient }, { token: i2.RxSignatureDetailDataPageService }, { token: i3.RxCurrentUserService }, { token: i4.RxRecordInstanceUtilsService }, { token: i5.RxApprovalUsersDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApprovalConsoleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConsoleService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConsoleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxSignatureDetailDataPageService }, { type: i3.RxCurrentUserService }, { type: i4.RxRecordInstanceUtilsService }, { type: i5.RxApprovalUsersDataPageService }]; } });
//# sourceMappingURL=approval-console.service.js.map