import * as i0 from '@angular/core';
import { Injectable, Component, Input, ViewChild, EventEmitter, Output, NgModule } from '@angular/core';
import * as i3$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$4 from '@helix/platform/view/api';
import { RowDataItemIdFieldName } from '@helix/platform/view/api';
import * as i3 from '@helix/platform/shared/api';
import { DataPage, RX_APPLICATION, RX_RESOURCE_URLS, JustificationRequirement, RxDefinitionModule } from '@helix/platform/shared/api';
import { of, Subject, NEVER, combineLatest, EMPTY, iif, forkJoin } from 'rxjs';
import * as i10 from '@helix/platform/view/components';
import { RowSelectionMode, RecordGridModule } from '@helix/platform/view/components';
import * as i2 from '@helix/platform/record/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import * as i1$1 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { map as map$1, some, trim, forEach, omit, includes, noop, reject, isNil, findIndex, cloneDeep, find } from 'lodash';
import * as i1 from '@angular/common/http';
import { map, finalize, switchMap, tap } from 'rxjs/operators';
import * as i6$1 from '@helix/platform/ui-kit';
import { RxModalClass, ReadOnlyFieldsModalComponent, RX_MODAL, ReadOnlyFieldModule, RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import * as i1$2 from '@bmc-ux/adapt-angular';
import { DismissReasons, AdaptButtonModule, AdaptDropdownModule, AdaptTabsModule, AdaptEmptyStateModule, AdaptRxTextareaModule, AdaptRxUploaderModule, AdaptBusyModule, AdaptDownloadModule, AdaptRxLabelModule, AdaptRxSwitchModule, AdaptAlertModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import * as i5 from '@helix/platform/shared/components';
import { RxSelectWithPaginationModule } from '@helix/platform/shared/components';
import * as i6 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import moment from 'moment-es6';
import * as i1$3 from '@helix/platform/utils';
import { BaseViewComponent } from '@helix/platform/view/runtime';

class RxSignatureDetailDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.approval.application.datapage.SignatureDetailDataPageQuery');
        this.injector = injector;
    }
}
RxSignatureDetailDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSignatureDetailDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxSignatureDetailDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSignatureDetailDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSignatureDetailDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

var ApprovalRequestStatus;
(function (ApprovalRequestStatus) {
    ApprovalRequestStatus["Pending"] = "Pending";
    ApprovalRequestStatus["Hold"] = "On Hold";
    ApprovalRequestStatus["MoreInfo"] = "More Information";
    ApprovalRequestStatus["RequestMoreInfo"] = "Request More Information";
    ApprovalRequestStatus["NeedsAttention"] = "Needs Attention";
    ApprovalRequestStatus["Approved"] = "Approved";
    ApprovalRequestStatus["Rejected"] = "Rejected";
    ApprovalRequestStatus["Cancelled"] = "Cancelled";
    ApprovalRequestStatus["Error"] = "Error";
    ApprovalRequestStatus["Closed"] = "Closed";
})(ApprovalRequestStatus || (ApprovalRequestStatus = {}));
var ApprovalGridType;
(function (ApprovalGridType) {
    ApprovalGridType["ApprovalRequests"] = "approvalRequests";
    ApprovalGridType["NeedAttentionRequests"] = "needAttentionRequests";
})(ApprovalGridType || (ApprovalGridType = {}));
var ApprovalCommandType;
(function (ApprovalCommandType) {
    ApprovalCommandType["Approved"] = "Approved";
    ApprovalCommandType["Rejected"] = "Rejected";
    ApprovalCommandType["OnHold"] = "OnHold";
    ApprovalCommandType["Reassign"] = "Reassign";
})(ApprovalCommandType || (ApprovalCommandType = {}));

const RX_APPROVAL_CONSOLE = {
    approvalServerCommand: 'com.bmc.arsys.rx.approval.application.command.ApprovalServerCommand',
    approvalCommandForm: 'AP:Signature',
    approvalUserNameField: 101,
    approvalRequestTypes: {
        pending: {
            status: ApprovalRequestStatus.Pending,
            countType: 'pendingCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'warning',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.pending.label'
        },
        onHold: {
            status: ApprovalRequestStatus.Hold,
            countType: 'holdCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'warning',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.hold.label'
        },
        moreInfo: {
            status: ApprovalRequestStatus.RequestMoreInfo,
            countType: 'moreInformationCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'info',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.more-info.label'
        },
        needAttention: {
            status: ApprovalRequestStatus.NeedsAttention,
            countType: 'needAttentionCount',
            gridType: ApprovalGridType.NeedAttentionRequests,
            badgeType: 'warning',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.needs-attention.label'
        },
        approved: {
            status: ApprovalRequestStatus.Approved,
            countType: 'approvedCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'success',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.approved.label'
        },
        rejected: {
            status: ApprovalRequestStatus.Rejected,
            countType: 'rejectedCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'danger',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.rejected.label'
        },
        cancelled: {
            status: ApprovalRequestStatus.Cancelled,
            countType: 'cancelledCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'secondary',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.canceled.label'
        },
        error: {
            status: ApprovalRequestStatus.Error,
            countType: 'errorCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'danger',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.errored.label'
        },
        closed: {
            status: ApprovalRequestStatus.Closed,
            countType: 'closedCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'secondary',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.closed.label'
        }
    },
    approvalRequestsGrid: {
        fields: {
            application: 'application',
            summary: 'summary',
            requester: 'requester',
            status: 'status',
            request: 'request',
            createDateSig: 'createDateSig',
            process: 'process',
            signatureInstanceID: 'signatureInstanceID',
            justificationReasonField: 'justification',
            sigTermStateDate: 'sigTermStateDate',
            signatureID: 'signatureID',
            otherDetail1: 'otherDetail1',
            otherDetail2: 'otherDetail2',
            otherDetail3: 'otherDetail3',
            otherDetail4: 'otherDetail4',
            justificationRequired: 'justificationRequired',
            canReassign: 'canReassign',
            processInstanceId: 'processInstanceId',
            ifMultipleApprovers: 'ifMultipleApprovers',
            actingAs: 'actingAs'
        }
    },
    needAttentionRequestsGrid: {
        definition: 'AP:More Information',
        fields: {
            fromUser: '2',
            toUser: '4',
            description: '14506',
            application: '10050',
            requestID: '10051',
            attachment: '14893',
            question: '13300',
            response: '13301',
            state: '11016'
        }
    },
    requestDetailsGrid: {
        definition: 'AP:QCI-Detail-Join',
        approverDefinition: 'AP:PreviewInfo',
        questionDefinition: 'AP:Question-Comment-Info',
        questionTypeValue: 0,
        commentTypeValue: 1,
        fields: {
            from: 2,
            to: 4,
            application: 11001,
            type: 11002,
            signatureID: 11003,
            request: 11004,
            requestNumber: 13334,
            process: 10000,
            response: 11005,
            question: 11006,
            attachment: 11011,
            approver: 14201
        }
    }
};

class RxApprovalUsersDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.approval.application.datapage.ApprovalUsersDataPageQuery');
        this.injector = injector;
    }
}
RxApprovalUsersDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalUsersDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxApprovalUsersDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalUsersDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalUsersDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxApprovalConsoleService {
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
RxApprovalConsoleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConsoleService, deps: [{ token: i1.HttpClient }, { token: RxSignatureDetailDataPageService }, { token: i3.RxCurrentUserService }, { token: i2.RxRecordInstanceUtilsService }, { token: RxApprovalUsersDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApprovalConsoleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConsoleService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConsoleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: RxSignatureDetailDataPageService }, { type: i3.RxCurrentUserService }, { type: i2.RxRecordInstanceUtilsService }, { type: RxApprovalUsersDataPageService }]; } });

class ApprovalRequestReassignComponent extends RxModalClass {
    constructor(translateService, rxNotificationService, activeModalRef, rxApprovalConsoleService, injector) {
        super(activeModalRef, injector);
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.activeModalRef = activeModalRef;
        this.rxApprovalConsoleService = rxApprovalConsoleService;
        this.injector = injector;
        this.selectedUser = [];
        this.userLoaderFunc = this.getApprovalUsers.bind(this);
    }
    isDirty() {
        return !!this.selectedUser.length;
    }
    reassign() {
        this.allowDismiss = false;
        const commands = map$1(this.activeModalRef.getData().selectedRequestInstanceIds, (signatureInstance) => (Object.assign({ assignToApprovers: this.selectedUser[0].value }, this.rxApprovalConsoleService.getCommandPayload(ApprovalCommandType.Reassign, signatureInstance))));
        this.rxApprovalConsoleService
            .reassignRequest(commands)
            .pipe(finalize(() => {
            this.allowDismiss = true;
        }))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request.reassigned.message'));
            this.activeModalRef.close(true);
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    getApprovalUsers(startIndex, pageSize, searchQuery) {
        return this.rxApprovalConsoleService.getApprovalUsers(startIndex, pageSize, searchQuery);
    }
    optionFormatter(option) {
        return `${option.value} ${option.displayValue}`;
    }
}
ApprovalRequestReassignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestReassignComponent, deps: [{ token: i1$1.TranslateService }, { token: i3.RxNotificationService }, { token: i1$2.ActiveModalRef }, { token: RxApprovalConsoleService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestReassignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestReassignComponent, selector: "rx-approval-request-reassign", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.request.reassign-dialog.title' | translate }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <rx-select-with-pagination\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.console.request.reassign.label' | translate }}\"\n    class=\"form-group d-block\"\n    [(ngModel)]=\"selectedUser\"\n    [optionLoader]=\"userLoaderFunc\"\n    [required]=\"true\"\n    [template]=\"optionTemplate\"\n    [optionFormatter]=\"optionFormatter\"\n  ></rx-select-with-pagination>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    [disabled]=\"!selectedUser.length || !allowDismiss\"\n    (click)=\"reassign()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n\n<ng-template #optionTemplate let-option>\n  <strong>{{ option.displayValue }}</strong>\n\n  <div class=\"text-secondary\">\n    {{ option.value }}\n  </div>\n</ng-template>\n", components: [{ type: i5.RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: ["label", "required", "isMultiSelectionMode", "optionLoader", "pageSize", "showDefaultTitle", "showUncheckAll", "readonly", "template", "viewToModelValueAdapter", "modelToViewValueAdapter", "optionFormatter"], outputs: ["toggleDropdown", "selectionChange"] }, { type: i1$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1$2.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i1$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestReassignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-reassign',
                    templateUrl: './approval-request-reassign.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.TranslateService }, { type: i3.RxNotificationService }, { type: i1$2.ActiveModalRef }, { type: RxApprovalConsoleService }, { type: i0.Injector }]; } });

class ApprovalRequestQuestionResponseComponent extends RxModalClass {
    constructor(activeModalRef, rxRecordInstanceService, rxNotificationService, translateService, rxApprovalConsoleService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.rxApprovalConsoleService = rxApprovalConsoleService;
        this.injector = injector;
        this.request = this.activeModalRef.getData().selectedRequest;
        this.attachment = [];
        this.enableCustomDownload = true;
        this.existingAttachmentName = this.request[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment];
        this.downloadAttachment = () => {
            this.rxRecordInstanceService.downloadAttachment(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition, Number(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment), this.request[RX_RECORD_DEFINITION.coreFieldIds.id], this.request[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment]);
        };
    }
    isDirty() {
        return !this.isSaveButtonDisabled();
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.existingAttachmentName) {
            this.attachment = this.getExistingFile();
        }
    }
    sendResponse() {
        this.allowDismiss = false;
        this.rxRecordInstanceService
            .get(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition, this.request[RX_RECORD_DEFINITION.coreFieldIds.id])
            .pipe(switchMap((recordInstance) => {
            recordInstance.setFieldValue(Number(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.response), this.response);
            return this.rxRecordInstanceService.save(recordInstance);
        }), tap(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.console.question-response-dialog.response-added.message'));
        }), switchMap(() => {
            if (this.shouldSaveAttachment) {
                const recordInstanceFormData = new FormData();
                recordInstanceFormData.append(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment, this.attachment[0].data, this.attachment[0].data.name);
                return this.rxApprovalConsoleService.saveAttachment(recordInstanceFormData, this.request[RX_RECORD_DEFINITION.coreFieldIds.id]);
            }
            else {
                return of(null);
            }
        }), finalize(() => {
            this.allowDismiss = true;
        }))
            .subscribe(() => {
            this.activeModalRef.close(true);
        });
    }
    onRemovedFileFromQueue() {
        this.enableCustomDownload = false;
    }
    onAfterFilesAdded() {
        this.shouldSaveAttachment = true;
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    getExistingFile() {
        return [
            {
                data: new File([], this.existingAttachmentName),
                inUploading: false,
                inDeleting: false,
                uploaded: 100,
                error: false,
                errorText: '',
                allowDeletion: true
            }
        ];
    }
    isSaveButtonDisabled() {
        var _a;
        return !this.allowDismiss || !this.response || (this.existingAttachmentName && !((_a = this.attachment[0]) === null || _a === void 0 ? void 0 : _a.data));
    }
}
ApprovalRequestQuestionResponseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestQuestionResponseComponent, deps: [{ token: i1$2.ActiveModalRef }, { token: i2.RxRecordInstanceService }, { token: i3.RxNotificationService }, { token: i1$1.TranslateService }, { token: RxApprovalConsoleService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestQuestionResponseComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestQuestionResponseComponent, selector: "rx-approval-request-question-response", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.question-response-dialog.title' | translate }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <rx-read-only-field\n    class=\"d-block form-group\"\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.console.question-response-dialog.to-field.label' | translate }}\"\n    value=\"{{ request['2'] }}\"\n  ></rx-read-only-field>\n\n  <rx-read-only-field\n    class=\"d-block form-group\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.question.label' | translate }}\"\n    value=\"{{ request['13300'] }}\"\n  ></rx-read-only-field>\n\n  <adapt-rx-textarea\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.console.question-response-dialog.response-field.label' | translate }}\"\n    class=\"d-block form-group\"\n    [(ngModel)]=\"response\"\n    [required]=\"true\"\n    [autofocus]=\"true\"\n    rows=\"2\"\n  ></adapt-rx-textarea>\n\n  <adapt-rx-uploader\n    adaptRequired\n    [(ngModel)]=\"attachment\"\n    [required]=\"existingAttachmentName\"\n    [showMaxSizeRestriction]=\"false\"\n    (removedFileFromQueue)=\"onRemovedFileFromQueue()\"\n    (afterFilesAdded)=\"onAfterFilesAdded()\"\n    [enableCustomDownload]=\"enableCustomDownload\"\n    [customDownload]=\"downloadAttachment\"\n    [reusable]=\"true\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.attachment.label' | translate }}\"\n  >\n  </adapt-rx-uploader>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"isSaveButtonDisabled()\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    (click)=\"sendResponse()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [":host ::ng-deep rx-read-only-field .read-only-content{max-height:9em;overflow-y:auto;word-break:break-all;white-space:pre-wrap}:host ::ng-deep adapt-rx-uploader .adapt-uploader-file-uploaded{display:none}\n"], components: [{ type: i6$1.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }, { type: i1$2.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1$2.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i1$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1$2.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i1$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestQuestionResponseComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-question-response',
                    templateUrl: './approval-request-question-response.component.html',
                    styleUrls: ['./approval-request-question-response.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$2.ActiveModalRef }, { type: i2.RxRecordInstanceService }, { type: i3.RxNotificationService }, { type: i1$1.TranslateService }, { type: RxApprovalConsoleService }, { type: i0.Injector }]; } });

class ApprovalRequestActionReasonInputComponent extends RxModalClass {
    constructor(activeModalRef, rxNotificationService, translateService, rxApprovalConsoleService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.rxApprovalConsoleService = rxApprovalConsoleService;
        this.injector = injector;
        this.currentRequestIndex = 0;
        this.requests = [];
        this.title = this.activeModalRef.getData().modalTitle;
        this.commandType = this.activeModalRef.getData().commandType;
    }
    isDirty() {
        return some(this.requests, (request) => request.reason);
    }
    ngOnInit() {
        super.ngOnInit();
        this.requests = map$1(this.activeModalRef.getData().selectedRequests, (request) => ({
            requestId: request[RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.request],
            requestSignatureInstanceId: request[RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureInstanceID],
            reason: null,
            isReasonRequired: request.justificationRequired === 'TO_APPROVE_OR_REJECT' ||
                (this.commandType === ApprovalCommandType.Approved && request.justificationRequired === 'TO_APPROVE') ||
                (this.commandType === ApprovalCommandType.Rejected && request.justificationRequired === 'TO_REJECT')
        }));
    }
    isSaveButtonDisabled() {
        return (!this.allowDismiss ||
            (some(this.requests, (request) => request.isReasonRequired && this.isReasonEmpty(request.reason)) &&
                !this.shouldApplySameReasonToAll));
    }
    goToPreviousRequest() {
        this.currentRequestIndex--;
    }
    goToNextRequest() {
        this.currentRequestIndex++;
    }
    saveRequests() {
        this.allowDismiss = false;
        const commonReason = this.requests[this.currentRequestIndex].reason;
        const commands = [
            ...map$1(this.requests, (request) => (Object.assign({ justificationOrReason: this.shouldApplySameReasonToAll ? commonReason : request.reason }, this.rxApprovalConsoleService.getCommandPayload(this.commandType, request.requestSignatureInstanceId))))
        ];
        this.rxApprovalConsoleService
            .rejectRequest(commands)
            .pipe(finalize(() => {
            this.allowDismiss = true;
        }))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant(this.commandType === ApprovalCommandType.Rejected
                ? 'com.bmc.arsys.rx.client.approval.console.request.rejected.message'
                : 'com.bmc.arsys.rx.client.approval.console.request.approved.message'));
            this.activeModalRef.close(true);
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    isReasonEmpty(reason) {
        return !trim(reason);
    }
}
ApprovalRequestActionReasonInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestActionReasonInputComponent, deps: [{ token: i1$2.ActiveModalRef }, { token: i3.RxNotificationService }, { token: i1$1.TranslateService }, { token: RxApprovalConsoleService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestActionReasonInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestActionReasonInputComponent, selector: "rx-approval-request-action-reason-input", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ title }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <adapt-rx-textfield\n    class=\"form-group d-block\"\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.grid.column.requestId' | translate }}\"\n    [(ngModel)]=\"requests[currentRequestIndex].requestId\"\n    [readonly]=\"true\"\n    rx-id=\"request-id\"\n  >\n  </adapt-rx-textfield>\n\n  <adapt-rx-textarea\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.justification-reason.label' | translate }}\"\n    class=\"d-block form-group\"\n    [(ngModel)]=\"requests[currentRequestIndex].reason\"\n    [required]=\"requests[currentRequestIndex].isReasonRequired\"\n    rx-id=\"justification-reason\"\n    rows=\"2\"\n    [autofocus]=\"true\"\n  ></adapt-rx-textarea>\n\n  <adapt-rx-switch\n    class=\"d-block mb-2\"\n    [(ngModel)]=\"shouldApplySameReasonToAll\"\n    [disabled]=\"isReasonEmpty(requests[currentRequestIndex].reason)\"\n    rx-id=\"all-request-reason\"\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.console.apply-common-justification-reason.label' | translate }}\"\n  ></adapt-rx-switch>\n\n  <div class=\"text-warning\" *ngIf=\"shouldApplySameReasonToAll\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.overwrite-justification-reason.warning' | translate }}\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    type=\"button\"\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"secondary\"\n    rx-id=\"previous-button\"\n    [disabled]=\"currentRequestIndex === 0 || shouldApplySameReasonToAll\"\n    (click)=\"goToPreviousRequest()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.previous-step.label' | translate }}\n  </button>\n\n  <button\n    type=\"button\"\n    adapt-button\n    class=\"mr-auto\"\n    btn-type=\"secondary\"\n    rx-id=\"next-button\"\n    [disabled]=\"currentRequestIndex === requests.length - 1 || shouldApplySameReasonToAll\"\n    (click)=\"goToNextRequest()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.next-step.label' | translate }}\n  </button>\n\n  <button\n    type=\"button\"\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    rx-id=\"save-button\"\n    [disabled]=\"isSaveButtonDisabled()\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    (click)=\"saveRequests()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1$2.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1$2.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1$2.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i1$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$2.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i1$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestActionReasonInputComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-action-reason-input',
                    templateUrl: './approval-request-action-reason-input.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.ActiveModalRef }, { type: i3.RxNotificationService }, { type: i1$1.TranslateService }, { type: RxApprovalConsoleService }, { type: i0.Injector }]; } });

class RxApprovalConsoleHelperService {
    constructor(datePipe) {
        this.datePipe = datePipe;
    }
    formatValue(value) {
        const timeFormat = 'h:mm:ss A';
        const dateFormat = 'M/D/YYYY';
        if (!/^\d+$/.test(value) && moment(value, [`${dateFormat} ${timeFormat}`, moment.ISO_8601], true).isValid()) {
            value = this.datePipe.transform(new Date(value), 'medium');
        }
        else if (moment(value, dateFormat, true).isValid()) {
            value = this.datePipe.transform(new Date(value), 'mediumDate');
        }
        else if (moment(value, timeFormat, true).isValid()) {
            value = moment(value, timeFormat).format('HH:mm A');
        }
        return value;
    }
}
RxApprovalConsoleHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConsoleHelperService, deps: [{ token: i3$1.DatePipe }], target: i0.ɵɵFactoryTarget.Injectable });
RxApprovalConsoleHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConsoleHelperService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConsoleHelperService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i3$1.DatePipe }]; } });

class ApprovalRequestGeneralDetailsComponent {
    constructor(rxApprovalConsoleHelperService, rxDefinitionNameService, datePipe, translateService, rxApprovalConsoleService) {
        this.rxApprovalConsoleHelperService = rxApprovalConsoleHelperService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.datePipe = datePipe;
        this.translateService = translateService;
        this.rxApprovalConsoleService = rxApprovalConsoleService;
        this.approvalRequest$ = new Subject();
        this.allRequestFields$ = this.approvalRequest$.pipe(tap(() => {
            this.busy = NEVER.subscribe();
        }), switchMap((currentRequest) => this.gridType === ApprovalGridType.NeedAttentionRequests
            ? this.rxApprovalConsoleService.getCurrentRequestDetails(currentRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID], currentRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.application])
            : of(currentRequest)), switchMap((approvalRequest) => combineLatest([
            of(approvalRequest),
            this.rxApprovalConsoleService.getRequestLabelDetails(approvalRequest.application, approvalRequest.process)
        ])), map(([approvalRequest, requestLabelDetails]) => {
            const allFields = [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request-id.label'),
                    value: approvalRequest.resolvedDisplayValues.request || approvalRequest.request
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.requester.label'),
                    value: approvalRequest.resolvedDisplayValues.requester || approvalRequest.requester
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request-date.label'),
                    value: this.datePipe.transform(approvalRequest.createDateSig, 'medium')
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                    value: approvalRequest.resolvedDisplayValues.summary || approvalRequest.summary
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.status.label'),
                    value: this.statuses[approvalRequest.status]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.status-date.label'),
                    value: this.datePipe.transform(approvalRequest.sigTermStateDate, 'medium')
                }
            ];
            if (approvalRequest.actionDate) {
                allFields.push({
                    label: '',
                    value: this.datePipe.transform(approvalRequest.actionDate, 'medium')
                });
            }
            if (approvalRequest.justification) {
                allFields.push({
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.justification-reason.label'),
                    value: approvalRequest.justification
                });
            }
            const labelValues = {
                14508: approvalRequest.resolvedDisplayValues.otherDetail1,
                14509: approvalRequest.resolvedDisplayValues.otherDetail2,
                14510: approvalRequest.resolvedDisplayValues.otherDetail3,
                14511: approvalRequest.resolvedDisplayValues.otherDetail4
            };
            forEach(requestLabelDetails, (label, key) => {
                if (label) {
                    allFields.push({
                        label: requestLabelDetails[key],
                        value: this.rxApprovalConsoleHelperService.formatValue(labelValues[key])
                    });
                }
            });
            allFields.push({
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.activity-log.label'),
                value: `${this.rxDefinitionNameService.getDisplayName(approvalRequest.application)} ${approvalRequest.resolvedDisplayValues.request || approvalRequest.request}, ${approvalRequest.resolvedDisplayValues.requester || approvalRequest.requester}`
            });
            return allFields;
        }), tap(() => {
            this.busy = EMPTY.subscribe();
        }));
        this.statuses = {
            [ApprovalRequestStatus.Pending]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.pending.labelKey),
            [ApprovalRequestStatus.RequestMoreInfo]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.moreInfo.labelKey),
            [ApprovalRequestStatus.Hold]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.onHold.labelKey),
            [ApprovalRequestStatus.MoreInfo]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.moreInfo.labelKey),
            [ApprovalRequestStatus.NeedsAttention]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.needAttention.labelKey),
            [ApprovalRequestStatus.Approved]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.approved.labelKey),
            [ApprovalRequestStatus.Rejected]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.rejected.labelKey),
            [ApprovalRequestStatus.Cancelled]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.cancelled.labelKey),
            [ApprovalRequestStatus.Error]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.error.labelKey),
            [ApprovalRequestStatus.Closed]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.closed.labelKey)
        };
    }
    ngOnChanges(changes) {
        var _a;
        if ((_a = changes.approvalRequest) === null || _a === void 0 ? void 0 : _a.currentValue) {
            this.approvalRequest$.next(changes.approvalRequest.currentValue);
        }
    }
}
ApprovalRequestGeneralDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestGeneralDetailsComponent, deps: [{ token: RxApprovalConsoleHelperService }, { token: i3.RxDefinitionNameService }, { token: i3$1.DatePipe }, { token: i1$1.TranslateService }, { token: RxApprovalConsoleService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestGeneralDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestGeneralDetailsComponent, selector: "rx-approval-request-general-details", inputs: { approvalRequest: "approvalRequest", gridType: "gridType" }, usesOnChanges: true, ngImport: i0, template: "<rx-busy-indicator [options]=\"{ busy: busy }\"></rx-busy-indicator>\n\n<adapt-empty-state\n  type=\"alerts\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<div [hidden]=\"!approvalRequest\" *ngIf=\"allRequestFields$ | async as requestFields\" class=\"pt-2 pl-3\">\n  <rx-read-only-field\n    *ngFor=\"let field of requestFields\"\n    class=\"d-block form-group\"\n    label=\"{{ field.label }}\"\n    value=\"{{ field.value }}\"\n  ></rx-read-only-field>\n</div>\n", styles: [":host{display:block;position:relative;min-height:65%}\n"], components: [{ type: i6$1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i1$2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i6$1.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i1$1.TranslatePipe, "async": i3$1.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestGeneralDetailsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-general-details',
                    templateUrl: './approval-request-general-details.component.html',
                    styleUrls: ['./approval-request-general-details.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: RxApprovalConsoleHelperService }, { type: i3.RxDefinitionNameService }, { type: i3$1.DatePipe }, { type: i1$1.TranslateService }, { type: RxApprovalConsoleService }]; }, propDecorators: { approvalRequest: [{
                type: Input
            }], gridType: [{
                type: Input
            }] } });

class ApprovalRequestApproversComponent {
    constructor(translateService, rxApprovalConsoleService, rxRecordInstanceDataPageService) {
        this.translateService = translateService;
        this.rxApprovalConsoleService = rxApprovalConsoleService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
    }
    ngOnInit() {
        this.gridConfig$ = of({
            enableRowSelection: null,
            getData: (queryParams) => this.getApproversData(queryParams),
            columns: this.getColumns(),
            getRecordDefinition: () => of(this.getRecordDefinition()),
            recordDefinitionName: RX_APPROVAL_CONSOLE.requestDetailsGrid.approverDefinition,
            styles: 'flex-fill'
        });
    }
    ngOnChanges(changes) {
        var _a, _b;
        if ((_a = changes.approvalRequest) === null || _a === void 0 ? void 0 : _a.currentValue) {
            (_b = this.requestApproversGrid) === null || _b === void 0 ? void 0 : _b.api.refresh().subscribe();
        }
    }
    getApproversData(queryParams) {
        return iif(() => this.gridType === ApprovalGridType.NeedAttentionRequests, this.rxApprovalConsoleService.getCurrentRequestDetails(this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID], this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.application]), of(this.approvalRequest)).pipe(switchMap((currentRequest) => this.rxRecordInstanceDataPageService.post({
            params: omit(Object.assign(Object.assign({}, queryParams), { shouldIncludeTotalSize: true, [RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.requestNumber]: currentRequest[RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.request], [RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.process]: currentRequest[RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.process] }), ['searchText', 'propertySelection'])
        })));
    }
    getRecordDefinition() {
        return {
            fieldDefinitions: [
                {
                    id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.approver,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.status,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.selection,
                    optionNamesById: {
                        0: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.pending.labelKey),
                        1: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.approved.labelKey),
                        2: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.rejected.labelKey),
                        3: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.onHold.labelKey),
                        4: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.moreInfo.labelKey),
                        5: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.cancelled.labelKey),
                        6: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.error.labelKey),
                        7: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.closed.labelKey)
                    }
                }
            ]
        };
    }
    getColumns() {
        return [
            {
                index: 0,
                fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.approver.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.approvers.grid.approver.title'),
                filterable: false,
                sortable: false
            },
            {
                index: 1,
                fieldId: RX_RECORD_DEFINITION.coreFieldIds.status.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.status.label')
            }
        ];
    }
}
ApprovalRequestApproversComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestApproversComponent, deps: [{ token: i1$1.TranslateService }, { token: RxApprovalConsoleService }, { token: i2.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestApproversComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestApproversComponent, selector: "rx-approval-request-approvers", inputs: { approvalRequest: "approvalRequest", gridType: "gridType" }, viewQueries: [{ propertyName: "requestApproversGrid", first: true, predicate: ["requestApproversGrid"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<adapt-empty-state\n  type=\"objects\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<rx-record-grid [config]=\"gridConfig$\" *ngIf=\"approvalRequest\" #requestApproversGrid></rx-record-grid>\n", styles: [":host ::ng-deep rx-record-grid .adapt-table-search-toolbar-container{display:none}\n"], components: [{ type: i1$2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i10.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestApproversComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-approvers',
                    templateUrl: './approval-request-approvers.component.html',
                    styleUrls: ['./approval-request-approvers.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.TranslateService }, { type: RxApprovalConsoleService }, { type: i2.RxRecordInstanceDataPageService }]; }, propDecorators: { approvalRequest: [{
                type: Input
            }], gridType: [{
                type: Input
            }], requestApproversGrid: [{
                type: ViewChild,
                args: ['requestApproversGrid']
            }] } });

class ApprovalRequestQuestionComponent extends RxModalClass {
    constructor(rxApprovalConsoleService, rxNotificationService, translateService, activeModalRef, injector) {
        super(activeModalRef, injector);
        this.rxApprovalConsoleService = rxApprovalConsoleService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.selectedUser = [];
        this.userLoaderFunc = this.getApprovalUsers.bind(this);
        this.attachment = [];
    }
    isDirty() {
        var _a, _b;
        return !!(this.question || ((_a = this.attachment[0]) === null || _a === void 0 ? void 0 : _a.data) || ((_b = this.selectedUser[0]) === null || _b === void 0 ? void 0 : _b.value));
    }
    saveQuestion() {
        var _a;
        this.allowDismiss = false;
        const formData = new FormData();
        const request = this.activeModalRef.getData().selectedRequest;
        formData.append('to', this.selectedUser[0].value);
        formData.append('question', this.question);
        formData.append('application', request.application);
        formData.append('applicationRequestId', request.resolvedDisplayValues.request);
        formData.append('signatureID', request.signatureID);
        if ((_a = this.attachment[0]) === null || _a === void 0 ? void 0 : _a.data) {
            formData.append('attachment', this.attachment[0].data, this.attachment[0].data.name);
        }
        this.rxApprovalConsoleService
            .saveQuestion(formData, 'question')
            .pipe(finalize(() => {
            this.allowDismiss = true;
        }))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.console.questions.question-added.message'));
            this.activeModalRef.close(true);
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    getApprovalUsers(startIndex, pageSize, searchQuery) {
        return this.rxApprovalConsoleService.getApprovalUsers(startIndex, pageSize, searchQuery);
    }
    optionFormatter(option) {
        return `${option.value} ${option.displayValue}`;
    }
}
ApprovalRequestQuestionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestQuestionComponent, deps: [{ token: RxApprovalConsoleService }, { token: i3.RxNotificationService }, { token: i1$1.TranslateService }, { token: i1$2.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestQuestionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestQuestionComponent, selector: "rx-approval-request-question", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.questions.new.label' | translate }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <rx-select-with-pagination\n    label=\"{{ 'com.bmc.arsys.rx.client.common.send-to.label' | translate }}\"\n    class=\"form-group d-block\"\n    [(ngModel)]=\"selectedUser\"\n    [optionLoader]=\"userLoaderFunc\"\n    [required]=\"true\"\n    [template]=\"optionTemplate\"\n    [optionFormatter]=\"optionFormatter\"\n  ></rx-select-with-pagination>\n\n  <adapt-rx-textarea\n    label=\"{{ 'com.bmc.arsys.rx.client.common.question.label' | translate }}\"\n    class=\"d-block form-group\"\n    [(ngModel)]=\"question\"\n    [required]=\"true\"\n    [autofocus]=\"true\"\n    rows=\"2\"\n  ></adapt-rx-textarea>\n\n  <adapt-rx-uploader\n    adaptRequired\n    [(ngModel)]=\"attachment\"\n    [enableDnD]=\"true\"\n    [showMaxSizeRestriction]=\"false\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.attachment.label' | translate }}\"\n  >\n  </adapt-rx-uploader>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"!selectedUser.length || !question || !allowDismiss\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    (click)=\"saveQuestion()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n\n<ng-template #optionTemplate let-option>\n  <strong>{{ option.displayValue }}</strong>\n\n  <div class=\"text-secondary\">\n    {{ option.value }}\n  </div>\n</ng-template>\n", components: [{ type: i5.RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: ["label", "required", "isMultiSelectionMode", "optionLoader", "pageSize", "showDefaultTitle", "showUncheckAll", "readonly", "template", "viewToModelValueAdapter", "modelToViewValueAdapter", "optionFormatter"], outputs: ["toggleDropdown", "selectionChange"] }, { type: i1$2.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1$2.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i1$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1$2.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i1$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestQuestionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-question',
                    templateUrl: './approval-request-question.component.html'
                }]
        }], ctorParameters: function () { return [{ type: RxApprovalConsoleService }, { type: i3.RxNotificationService }, { type: i1$1.TranslateService }, { type: i1$2.ActiveModalRef }, { type: i0.Injector }]; } });

class ApprovalRequestQuestionsComponent {
    constructor(translateService, rxRecordInstanceService, rxModalService, adaptModalService, rxApprovalConsoleService, rxRecordInstanceDataPageService) {
        this.translateService = translateService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxModalService = rxModalService;
        this.adaptModalService = adaptModalService;
        this.rxApprovalConsoleService = rxApprovalConsoleService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.questionSubmitted = new EventEmitter();
    }
    ngOnInit() {
        this.gridConfig$ = of({
            enableRowSelection: null,
            getData: (queryParams) => this.getQuestionData(queryParams),
            columns: this.getQuestionColumns(),
            getRecordDefinition: () => of(this.getQuestionRecordDefinition()),
            recordDefinitionName: RX_APPROVAL_CONSOLE.requestDetailsGrid.definition,
            styles: 'flex-fill'
        });
    }
    ngOnChanges(changes) {
        var _a, _b;
        if ((_a = changes.approvalRequest) === null || _a === void 0 ? void 0 : _a.currentValue) {
            (_b = this.requestQuestionsGrid) === null || _b === void 0 ? void 0 : _b.api.refresh().subscribe();
        }
    }
    isNewQuestionButtonDisabled() {
        return !includes([ApprovalRequestStatus.Pending, ApprovalRequestStatus.Hold], this.requestsTabStatus);
    }
    askNewQuestion() {
        this.rxModalService
            .openModal({
            content: ApprovalRequestQuestionComponent,
            size: 'sm',
            data: {
                selectedRequest: this.approvalRequest
            }
        })
            .then((result) => {
            if (result) {
                this.questionSubmitted.emit();
            }
        })
            .catch(noop);
    }
    getQuestionData(queryParams) {
        return iif(() => this.gridType === ApprovalGridType.NeedAttentionRequests, this.rxApprovalConsoleService.getCurrentRequestDetails(this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID], this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.application]), of(this.approvalRequest)).pipe(switchMap((currentRequest) => this.rxRecordInstanceDataPageService.post({
            params: omit(Object.assign(Object.assign({}, queryParams), { shouldIncludeTotalSize: true, [RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.application]: currentRequest.application, [RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.type]: RX_APPROVAL_CONSOLE.requestDetailsGrid.questionTypeValue, [RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.request]: currentRequest.request }), ['searchText'])
        })));
    }
    getQuestionColumns() {
        return [
            {
                index: 0,
                fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.to.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.questions.grid.column.question-to.title')
            },
            {
                index: 1,
                fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.from.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.from.label')
            },
            {
                index: 2,
                fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.question.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.question.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousAction, selectedRow) => {
                            this.showQuestionDetails(selectedRow);
                        }
                    }
                ],
                filterable: false,
                sortable: false
            },
            {
                index: 3,
                fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.response.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.questions.grid.column.response.title'),
                filterable: false,
                sortable: false
            },
            {
                index: 4,
                fieldId: RX_RECORD_DEFINITION.coreFieldIds.id.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                visible: false,
                filterable: false
            },
            {
                index: 5,
                fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.attachment.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousAction, selectedRow) => {
                            this.rxRecordInstanceService.downloadAttachment(RX_APPROVAL_CONSOLE.requestDetailsGrid.questionDefinition, Number(RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment), selectedRow[RX_RECORD_DEFINITION.coreFieldIds.id].split('|')[0], selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment]);
                        }
                    }
                ]
            }
        ];
    }
    getQuestionRecordDefinition() {
        return {
            fieldDefinitions: [
                {
                    id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.to,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.from,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.question,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.response,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.attachment
                },
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.id,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
    }
    showQuestionDetails(selectedRow) {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.question-response-dialog.title'),
            content: ReadOnlyFieldsModalComponent,
            size: 'sm',
            data: {
                fields: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.send-to.label'),
                        value: selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.to]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.question.label'),
                        value: selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.question]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.question-response-dialog.response-field.label'),
                        value: selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.response] ||
                            this.translateService.instant('com.bmc.arsys.rx.client.approval.console.question-response-dialog.not-responded.message')
                    }
                ]
            }
        })
            .catch(noop);
    }
}
ApprovalRequestQuestionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestQuestionsComponent, deps: [{ token: i1$1.TranslateService }, { token: i2.RxRecordInstanceService }, { token: i6$1.RxModalService }, { token: i1$2.AdaptModalService }, { token: RxApprovalConsoleService }, { token: i2.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestQuestionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestQuestionsComponent, selector: "rx-approval-request-questions", inputs: { approvalRequest: "approvalRequest", requestsTabStatus: "requestsTabStatus", gridType: "gridType" }, outputs: { questionSubmitted: "questionSubmitted" }, viewQueries: [{ propertyName: "requestQuestionsGrid", first: true, predicate: ["requestQuestionsGrid"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<adapt-empty-state\n  type=\"rules\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<button\n  type=\"button\"\n  class=\"p-0 mb-2 d-icon-plus_circle align-self-start\"\n  adapt-button\n  btn-type=\"tertiary\"\n  rx-id=\"new-question-button\"\n  (click)=\"askNewQuestion()\"\n  *ngIf=\"approvalRequest\"\n  [disabled]=\"isNewQuestionButtonDisabled()\"\n>\n  {{ 'com.bmc.arsys.rx.client.approval.console.questions.new.label' | translate }}\n</button>\n\n<rx-record-grid [config]=\"gridConfig$\" *ngIf=\"approvalRequest\" #requestQuestionsGrid></rx-record-grid>\n", components: [{ type: i1$2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i10.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestQuestionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-questions',
                    templateUrl: './approval-request-questions.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.TranslateService }, { type: i2.RxRecordInstanceService }, { type: i6$1.RxModalService }, { type: i1$2.AdaptModalService }, { type: RxApprovalConsoleService }, { type: i2.RxRecordInstanceDataPageService }]; }, propDecorators: { approvalRequest: [{
                type: Input
            }], requestsTabStatus: [{
                type: Input
            }], gridType: [{
                type: Input
            }], questionSubmitted: [{
                type: Output
            }], requestQuestionsGrid: [{
                type: ViewChild,
                args: ['requestQuestionsGrid']
            }] } });

class ApprovalRequestCommentComponent extends RxModalClass {
    constructor(activeModalRef, translateService, rxNotificationService, rxApprovalConsoleService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.rxApprovalConsoleService = rxApprovalConsoleService;
        this.injector = injector;
        this.attachment = [];
    }
    isDirty() {
        var _a;
        return !!(this.comment || ((_a = this.attachment[0]) === null || _a === void 0 ? void 0 : _a.data));
    }
    saveComment() {
        var _a;
        this.allowDismiss = false;
        const formData = new FormData();
        const request = this.activeModalRef.getData().selectedRequest;
        formData.append('comments', this.comment);
        formData.append('application', request.application);
        formData.append('applicationRequestId', request.resolvedDisplayValues.request);
        formData.append('signatureID', request.signatureID);
        if ((_a = this.attachment[0]) === null || _a === void 0 ? void 0 : _a.data) {
            formData.append('attachment', this.attachment[0].data, this.attachment[0].data.name);
        }
        this.rxApprovalConsoleService
            .saveQuestion(formData, 'comment')
            .pipe(finalize(() => {
            this.allowDismiss = true;
        }))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.console.comments.comment-added.message'));
            this.activeModalRef.close(true);
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    isCommentEmpty() {
        return !trim(this.comment);
    }
}
ApprovalRequestCommentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestCommentComponent, deps: [{ token: i1$2.ActiveModalRef }, { token: i1$1.TranslateService }, { token: i3.RxNotificationService }, { token: RxApprovalConsoleService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestCommentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestCommentComponent, selector: "rx-approval-request-comment", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.comments.new.label' | translate }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <adapt-rx-textarea\n    label=\"{{ 'com.bmc.arsys.rx.client.common.comment.label' | translate }}\"\n    class=\"d-block form-group\"\n    [(ngModel)]=\"comment\"\n    [required]=\"true\"\n    [autofocus]=\"true\"\n    rows=\"3\"\n  ></adapt-rx-textarea>\n\n  <adapt-rx-uploader\n    adaptRequired\n    [(ngModel)]=\"attachment\"\n    [enableDnD]=\"true\"\n    [showMaxSizeRestriction]=\"false\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.attachment.label' | translate }}\"\n  >\n  </adapt-rx-uploader>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"isCommentEmpty() || !allowDismiss\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    (click)=\"saveComment()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1$2.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1$2.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i1$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1$2.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i1$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestCommentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-comment',
                    templateUrl: './approval-request-comment.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.ActiveModalRef }, { type: i1$1.TranslateService }, { type: i3.RxNotificationService }, { type: RxApprovalConsoleService }, { type: i0.Injector }]; } });

class RxApprovalQCIDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.approval.application.datapage.ApprovalQCIDataPageQuery');
        this.injector = injector;
    }
}
RxApprovalQCIDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalQCIDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxApprovalQCIDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalQCIDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalQCIDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class ApprovalRequestCommentsComponent {
    constructor(rxApprovalQCIDataPageService, rxModalService, rxApprovalConsoleService, adaptModalService, rxDataPageService, rxRecordInstanceService, translateService) {
        this.rxApprovalQCIDataPageService = rxApprovalQCIDataPageService;
        this.rxModalService = rxModalService;
        this.rxApprovalConsoleService = rxApprovalConsoleService;
        this.adaptModalService = adaptModalService;
        this.rxDataPageService = rxDataPageService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.translateService = translateService;
    }
    ngOnInit() {
        this.gridConfig$ = of({
            enableRowSelection: null,
            getData: (queryParams) => this.getCommentData(queryParams),
            columns: this.getCommentColumns(),
            getRecordDefinition: () => of(this.getCommentRecordDefinition()),
            recordDefinitionName: RX_APPROVAL_CONSOLE.requestDetailsGrid.definition,
            styles: 'flex-fill'
        });
    }
    ngOnChanges(changes) {
        var _a, _b;
        if ((_a = changes.approvalRequest) === null || _a === void 0 ? void 0 : _a.currentValue) {
            (_b = this.requestCommentsGrid) === null || _b === void 0 ? void 0 : _b.api.refresh().subscribe();
        }
    }
    addNewComment() {
        this.rxModalService
            .openModal({
            content: ApprovalRequestCommentComponent,
            size: 'sm',
            data: {
                selectedRequest: this.selectedRequest
            }
        })
            .then((result) => {
            if (result) {
                this.requestCommentsGrid.api.refresh().subscribe();
            }
        })
            .catch(noop);
    }
    getCommentData(queryParams) {
        return iif(() => this.gridType === ApprovalGridType.NeedAttentionRequests, this.rxApprovalConsoleService.getCurrentRequestDetails(this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID], this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.application]), of(this.approvalRequest)).pipe(tap((currentRequest) => {
            this.selectedRequest = currentRequest;
        }), switchMap((currentRequest) => this.rxApprovalQCIDataPageService.get({
            params: omit(Object.assign(Object.assign({}, queryParams), { shouldIncludeTotalSize: true, [RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.application]: currentRequest.application, [RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.signatureID]: currentRequest.signatureID, [RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.type]: RX_APPROVAL_CONSOLE.requestDetailsGrid.commentTypeValue, [RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.request]: currentRequest.request }), ['searchText'])
        })));
    }
    getCommentColumns() {
        return [
            {
                index: 1,
                fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.from.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.submitter.label')
            },
            {
                index: 2,
                fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.response.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.comment.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousAction, selectedRow) => {
                            this.showCommentDetails(selectedRow);
                        }
                    }
                ],
                sortable: false
            },
            {
                index: 3,
                fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.attachment.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousAction, selectedRow) => {
                            this.rxRecordInstanceService.downloadAttachment(RX_APPROVAL_CONSOLE.requestDetailsGrid.questionDefinition, Number(RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment), selectedRow[RX_RECORD_DEFINITION.coreFieldIds.id].split('|')[0], selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment]);
                        }
                    }
                ]
            },
            {
                index: 4,
                fieldId: RX_RECORD_DEFINITION.coreFieldIds.id.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                visible: false,
                filterable: false
            }
        ];
    }
    getCommentRecordDefinition() {
        return {
            fieldDefinitions: [
                {
                    id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.from,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.response,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.attachment
                },
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.id,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
    }
    showCommentDetails(selectedRow) {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.comment.label'),
            content: ReadOnlyFieldsModalComponent,
            data: {
                fields: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.submitter.label'),
                        value: selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.from]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.comment.label'),
                        value: selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.response]
                    }
                ]
            },
            size: 'sm'
        })
            .catch(noop);
    }
}
ApprovalRequestCommentsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestCommentsComponent, deps: [{ token: RxApprovalQCIDataPageService }, { token: i6$1.RxModalService }, { token: RxApprovalConsoleService }, { token: i1$2.AdaptModalService }, { token: i3.RxDataPageFactoryService }, { token: i2.RxRecordInstanceService }, { token: i1$1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestCommentsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestCommentsComponent, selector: "rx-approval-request-comments", inputs: { approvalRequest: "approvalRequest", gridType: "gridType" }, viewQueries: [{ propertyName: "requestCommentsGrid", first: true, predicate: ["requestCommentsGrid"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<adapt-empty-state\n  type=\"events\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<button\n  type=\"button\"\n  class=\"p-0 mb-2 d-icon-plus_circle align-self-start\"\n  adapt-button\n  btn-type=\"tertiary\"\n  rx-id=\"new-comment-button\"\n  *ngIf=\"approvalRequest\"\n  (click)=\"addNewComment()\"\n>\n  {{ 'com.bmc.arsys.rx.client.approval.console.comments.new.label' | translate }}\n</button>\n\n<rx-record-grid [config]=\"gridConfig$\" *ngIf=\"approvalRequest\" #requestCommentsGrid></rx-record-grid>\n", components: [{ type: i1$2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i10.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestCommentsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-comments',
                    templateUrl: './approval-request-comments.component.html'
                }]
        }], ctorParameters: function () { return [{ type: RxApprovalQCIDataPageService }, { type: i6$1.RxModalService }, { type: RxApprovalConsoleService }, { type: i1$2.AdaptModalService }, { type: i3.RxDataPageFactoryService }, { type: i2.RxRecordInstanceService }, { type: i1$1.TranslateService }]; }, propDecorators: { approvalRequest: [{
                type: Input
            }], gridType: [{
                type: Input
            }], requestCommentsGrid: [{
                type: ViewChild,
                args: ['requestCommentsGrid']
            }] } });

class ApprovalRequestAttachmentsComponent {
    constructor(rxApprovalConsoleService, translateService, rxRecordInstanceService, rxRecordInstanceDataPageService) {
        this.rxApprovalConsoleService = rxApprovalConsoleService;
        this.translateService = translateService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
    }
    ngOnInit() {
        this.gridConfig$ = of({
            enableRowSelection: null,
            getData: (queryParams) => this.getAttachmentData(queryParams),
            columns: this.getAttachmentColumns(),
            getRecordDefinition: () => of(this.getAttachmentRecordDefinition()),
            recordDefinitionName: RX_APPROVAL_CONSOLE.requestDetailsGrid.definition,
            styles: 'flex-fill'
        });
    }
    ngOnChanges(changes) {
        var _a, _b;
        if ((_a = changes.approvalRequest) === null || _a === void 0 ? void 0 : _a.currentValue) {
            (_b = this.requestAttachmentsGrid) === null || _b === void 0 ? void 0 : _b.api.refresh().subscribe();
        }
    }
    getAttachmentData(queryParams) {
        return iif(() => this.gridType === ApprovalGridType.NeedAttentionRequests, this.rxApprovalConsoleService.getCurrentRequestDetails(this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID], this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.application]), of(this.approvalRequest)).pipe(switchMap((currentRequest) => this.rxRecordInstanceDataPageService
            .post({
            params: omit(Object.assign(Object.assign({}, queryParams), { shouldIncludeTotalSize: true, [RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.application]: currentRequest.application, [RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.request]: currentRequest.request }), ['searchText', 'propertySelection'])
        })
            .pipe(map((response) => {
            response.data = reject(response.data, (item) => !item[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment]);
            return response;
        }))));
    }
    getAttachmentColumns() {
        return [
            {
                index: 0,
                fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.from.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.submitter.label')
            },
            {
                index: 1,
                fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.attachments.grid.file-name.title'),
                clickable: true,
                actions: [
                    {
                        name: (previousAction, selectedRow) => {
                            this.rxRecordInstanceService.downloadAttachment(RX_APPROVAL_CONSOLE.requestDetailsGrid.questionDefinition, Number(RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment), selectedRow[RX_RECORD_DEFINITION.coreFieldIds.id].split('|')[0], selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment]);
                        }
                    }
                ]
            },
            {
                index: 2,
                fieldId: RX_RECORD_DEFINITION.coreFieldIds.id.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                visible: false,
                filterable: false
            }
        ];
    }
    getAttachmentRecordDefinition() {
        return {
            fieldDefinitions: [
                {
                    id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.from,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.attachment
                },
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.id,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
    }
}
ApprovalRequestAttachmentsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestAttachmentsComponent, deps: [{ token: RxApprovalConsoleService }, { token: i1$1.TranslateService }, { token: i2.RxRecordInstanceService }, { token: i2.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestAttachmentsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestAttachmentsComponent, selector: "rx-approval-request-attachments", inputs: { approvalRequest: "approvalRequest", gridType: "gridType" }, viewQueries: [{ propertyName: "requestAttachmentsGrid", first: true, predicate: ["requestAttachmentsGrid"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<adapt-empty-state\n  type=\"grid\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<rx-record-grid [config]=\"gridConfig$\" *ngIf=\"approvalRequest\" #requestAttachmentsGrid></rx-record-grid>\n", components: [{ type: i1$2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i10.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestAttachmentsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-attachments',
                    templateUrl: './approval-request-attachments.component.html'
                }]
        }], ctorParameters: function () { return [{ type: RxApprovalConsoleService }, { type: i1$1.TranslateService }, { type: i2.RxRecordInstanceService }, { type: i2.RxRecordInstanceDataPageService }]; }, propDecorators: { approvalRequest: [{
                type: Input
            }], gridType: [{
                type: Input
            }], requestAttachmentsGrid: [{
                type: ViewChild,
                args: ['requestAttachmentsGrid']
            }] } });

class ApprovalConsoleComponent extends BaseViewComponent {
    constructor(rxStringService, rxApprovalConsoleHelperService, rxCurrentUserService, translateService, rxModalService, rxNotificationService, rxApprovalConsoleService, rxRecordInstanceService, adaptModalService, rxSignatureDetailDataPageService, recordGridFilterService, rxRecordInstanceDataPageService, rxDefinitionNameService) {
        super();
        this.rxStringService = rxStringService;
        this.rxApprovalConsoleHelperService = rxApprovalConsoleHelperService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.translateService = translateService;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.rxApprovalConsoleService = rxApprovalConsoleService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.adaptModalService = adaptModalService;
        this.rxSignatureDetailDataPageService = rxSignatureDetailDataPageService;
        this.recordGridFilterService = recordGridFilterService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.selectedApprovalRequestsTab = RX_APPROVAL_CONSOLE.approvalRequestTypes.pending;
        this.approvalRequestTypes = map$1(RX_APPROVAL_CONSOLE.approvalRequestTypes, (request) => (Object.assign(Object.assign({}, request), { label: this.translateService.instant(request.labelKey) })));
        this.dataLoaded$ = new Subject();
        this.attentionGridParams = {
            recorddefinition: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition,
            [RX_RECORD_DEFINITION.coreFieldIds.assignee]: this.rxCurrentUserService.getName(),
            [RX_RECORD_DEFINITION.coreFieldIds.status]: '0',
            [RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.state]: '0'
        };
        this.needAttentionRequestCount$ = this.rxRecordInstanceDataPageService.post({
            params: this.attentionGridParams
        });
        this.availableRequestCount$ = this.dataLoaded$
            .pipe(switchMap(() => forkJoin([this.rxApprovalConsoleService.getApprovalRequestCounts(), this.needAttentionRequestCount$])))
            .pipe(map(([requestCounts, needAttentionResponse]) => (Object.assign(Object.assign({}, requestCounts), { needAttentionCount: needAttentionResponse.totalSize }))));
        this.activeTabIndex = 0;
        this.selectedRecordsInSequence = [];
    }
    ngOnInit() {
        this.updateGridConfig();
    }
    onDataLoaded() {
        var _a;
        (_a = this.gridSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.gridSubscription = this.approvalRequestsGrid.adaptTable.selectionChange.subscribe((selectedRows) => {
            const selectedRecord = isNil(this.selectedApprovalRequest)
                ? selectedRows[0]
                : selectedRows[selectedRows.length - 1];
            this.isReassignButtonDisabled = some(selectedRows, (row) => row.canReassign === 'No');
            this.selectedRecordsInSequence = this.approvalRequestsGrid.api.getSelectedRows(true);
            this.selectedRecordIndex = findIndex(this.selectedRecordsInSequence, {
                [RowDataItemIdFieldName]: selectedRecord === null || selectedRecord === void 0 ? void 0 : selectedRecord[RowDataItemIdFieldName]
            });
            this.selectedApprovalRequest = selectedRecord;
        });
        this.dataLoaded$.next();
    }
    approveRequest() {
        this.rxModalService
            .openModal({
            content: ApprovalRequestActionReasonInputComponent,
            size: 'sm',
            data: {
                commandType: ApprovalCommandType.Approved,
                selectedRequests: this.approvalRequestsGrid.api.getSelectedRows(),
                modalTitle: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.approve-request-dialog.title')
            }
        })
            .then((result) => {
            if (result) {
                this.reloadGridData();
            }
        })
            .catch(noop);
    }
    rejectRequest() {
        this.rxModalService
            .openModal({
            content: ApprovalRequestActionReasonInputComponent,
            size: 'sm',
            data: {
                commandType: ApprovalCommandType.Rejected,
                selectedRequests: this.approvalRequestsGrid.api.getSelectedRows(),
                modalTitle: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.reject-request-dialog.title')
            }
        })
            .then((result) => {
            if (result) {
                this.reloadGridData();
            }
        })
            .catch(noop);
    }
    holdRequest() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request.hold-dialog.message')
        })
            .then((result) => {
            if (result) {
                const commands = map$1(this.approvalRequestsGrid.api.getSelectedRows(), (request) => this.rxApprovalConsoleService.getCommandPayload(ApprovalCommandType.OnHold, request[RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureInstanceID]));
                this.rxApprovalConsoleService.holdRequest(commands).subscribe(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request.hold-success.message'));
                    this.reloadGridData();
                });
            }
        });
    }
    reassignRequest() {
        this.rxModalService
            .openModal({
            content: ApprovalRequestReassignComponent,
            size: 'sm',
            data: {
                selectedRequestInstanceIds: map$1(this.approvalRequestsGrid.api.getSelectedRows(), (request) => request.signatureInstanceID)
            }
        })
            .then((result) => {
            if (result) {
                this.reloadGridData();
            }
        })
            .catch(noop);
    }
    isHoldButtonDisabled() {
        return this.selectedApprovalRequestsTab.status === ApprovalRequestStatus.Hold;
    }
    get currentRequestId() {
        var _a, _b;
        return (((_a = this.selectedApprovalRequest) === null || _a === void 0 ? void 0 : _a.request) ||
            ((_b = this.selectedApprovalRequest) === null || _b === void 0 ? void 0 : _b[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID]));
    }
    get selectedApprovalRequestCount() {
        var _a, _b;
        return ((_b = (_a = this.approvalRequestsGrid) === null || _a === void 0 ? void 0 : _a.api) === null || _b === void 0 ? void 0 : _b.getSelectedRowCount()) || 0;
    }
    fetchApprovalRequests(event) {
        this.approvalRequestsGrid.adaptTableConfig.selectedItems = [];
        this.selectedApprovalRequest = null;
        this.selectedApprovalRequestsTab = this.approvalRequestTypes[event.index];
        this.updateGridConfig();
    }
    showNextRequestDetails() {
        this.selectedApprovalRequest = this.selectedRecordsInSequence[++this.selectedRecordIndex];
    }
    showPreviousRequestDetails() {
        this.selectedApprovalRequest = this.selectedRecordsInSequence[--this.selectedRecordIndex];
    }
    isPreviousButtonDisabled() {
        return this.selectedApprovalRequestCount === 0 || this.selectedRecordIndex <= 0;
    }
    isNextButtonDisabled() {
        return (this.selectedApprovalRequestCount === 0 || this.selectedRecordIndex === this.selectedRecordsInSequence.length - 1);
    }
    isApprovalRequestGrid() {
        return this.selectedApprovalRequestsTab.gridType === ApprovalGridType.ApprovalRequests;
    }
    isNeedAttentionGrid() {
        return this.selectedApprovalRequestsTab.gridType === ApprovalGridType.NeedAttentionRequests;
    }
    onTabChanged(event) {
        if (event.event) {
            this.activeTabIndex = event.index;
        }
    }
    needAttentionGridColumns() {
        return [
            {
                index: 0,
                fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.fromUser,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.from.label')
            },
            {
                index: 1,
                fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.toUser,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.send-to.label')
            },
            {
                index: 2,
                fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.description,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousAction, selectedRow) => {
                            this.openQuestionResponseDialog(selectedRow);
                        }
                    }
                ]
            },
            {
                index: 3,
                fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.application,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.needs-attention.grid.column.application.title'),
                cellTemplate: this.definitionNameCellTemplate
            },
            {
                index: 4,
                fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.needs-attention.grid.column.request.title')
            },
            {
                index: 5,
                fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.attachment.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousAction, selectedRow) => {
                            this.rxRecordInstanceService.downloadAttachment(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition, Number(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment), selectedRow[RX_RECORD_DEFINITION.coreFieldIds.id], selectedRow[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment]);
                        }
                    }
                ]
            },
            {
                index: 6,
                fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.question,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.question.label'),
                visible: false,
                filterable: false,
                sortable: false
            },
            {
                index: 7,
                fieldId: RX_RECORD_DEFINITION.coreFieldIds.id.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                visible: false,
                filterable: false
            }
        ];
    }
    ngOnDestroy() {
        this.dataLoaded$.complete();
        this.gridSubscription.unsubscribe();
    }
    onQuestionSubmitted() {
        this.reloadGridData();
    }
    getData(queryParams) {
        const textSearchQuery = this.recordGridFilterService.generateTextFilterQuery(queryParams.searchText, this.approvalRequestsGrid.adaptTableConfig.columns);
        const clonedSelectedFilters = cloneDeep(this.approvalRequestsGrid.state.advancedFiltering.selectedFilters);
        const clonedDefinitionNameFilters = find(clonedSelectedFilters, {
            filterOptionId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.application
        });
        if (clonedDefinitionNameFilters) {
            const appliedDefinitionNameFilters = find(this.approvalRequestsGrid.state.advancedFiltering.selectedFilters, {
                filterOptionId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.application
            });
            appliedDefinitionNameFilters.value.filterValue = map$1(appliedDefinitionNameFilters.value.filterValue, (filterValue) => this.rxDefinitionNameService.getDisplayName(filterValue));
            clonedDefinitionNameFilters.value.filterValue = map$1(clonedDefinitionNameFilters.value.filterValue, (filterValue) => `%${filterValue}`);
        }
        const resultingQuery = this.recordGridFilterService.addQueries(this.approvalRequestsGrid.buildQueryByAdvancedFilters(clonedSelectedFilters), textSearchQuery);
        if (resultingQuery) {
            queryParams.queryExpression = resultingQuery;
        }
        queryParams.propertySelection.push(RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.ifMultipleApprovers);
        return this.rxSignatureDetailDataPageService
            .get({
            params: omit(Object.assign(Object.assign({}, queryParams), { status: this.selectedApprovalRequestsTab.status, shouldIncludeTotalSize: true, ignoreAlternateUser: false, propertySelection: queryParams.propertySelection.filter((property) => property !== RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.actingAs) }), ['searchText', 'recorddefinition'])
        })
            .pipe(tap((dataPage) => {
            dataPage.data.forEach((row) => {
                row.otherDetail1 = this.rxApprovalConsoleHelperService.formatValue(row.otherDetail1);
                row.otherDetail2 = this.rxApprovalConsoleHelperService.formatValue(row.otherDetail2);
                row.otherDetail3 = this.rxApprovalConsoleHelperService.formatValue(row.otherDetail3);
                row.otherDetail4 = this.rxApprovalConsoleHelperService.formatValue(row.otherDetail4);
            });
        }));
    }
    getNeedAttentionData(queryParams) {
        const params = omit(Object.assign(Object.assign({}, this.attentionGridParams), queryParams), ['searchText']);
        return this.rxRecordInstanceDataPageService.post({
            params
        });
    }
    updateGridConfig() {
        this.shouldShowGrid = false;
        this.gridConfig$ = this.prepareGridConfiguration();
        setTimeout(() => {
            this.shouldShowGrid = true;
        });
    }
    prepareGridConfiguration() {
        const defaultConfig = {
            enableFiltering: true,
            enableRowSelection: RowSelectionMode.Multiple
        };
        if (this.isApprovalRequestGrid()) {
            return of(Object.assign(Object.assign({}, defaultConfig), { actionButtons: this.getActionButtons(), getData: (queryParams) => this.getData(queryParams), columns: this.getColumns(), getRecordDefinition: () => of(this.getRecordDefinition()), recordIdField: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureInstanceID, styles: 'flex-fill', guid: `ap-${this.rxStringService.toRxId(this.selectedApprovalRequestsTab.status)}-grid` }));
        }
        else if (this.isNeedAttentionGrid()) {
            return of(Object.assign(Object.assign({}, defaultConfig), { recordDefinitionName: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition, getData: (queryParams) => this.getNeedAttentionData(queryParams), columns: this.needAttentionGridColumns(), styles: 'flex-fill', guid: 'ap-need-attention-grid' }));
        }
    }
    getActionButtons() {
        return includes([ApprovalRequestStatus.Pending, ApprovalRequestStatus.RequestMoreInfo, ApprovalRequestStatus.Hold], this.selectedApprovalRequestsTab.status)
            ? [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.button.approve.label'),
                    style: 'success',
                    iconCls: 'check_circle_o',
                    size: 'small',
                    actions: [
                        {
                            name: () => this.approveRequest()
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.button.reject.label'),
                    style: 'critical',
                    iconCls: 'cross_circle_o',
                    size: 'small',
                    actions: [
                        {
                            name: () => this.rejectRequest()
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.button.hold.label'),
                    style: 'warning',
                    iconCls: 'pause_circle_o',
                    size: 'small',
                    disabled: () => this.isHoldButtonDisabled(),
                    actions: [
                        {
                            name: () => this.holdRequest()
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.button.reassign.label'),
                    iconCls: 'user_arrow_o',
                    style: 'secondary',
                    size: 'small',
                    disabled: () => this.isReassignButtonDisabled,
                    actions: [
                        {
                            name: () => this.reassignRequest()
                        }
                    ]
                }
            ]
            : [];
    }
    reloadGridData() {
        this.selectedApprovalRequest = null;
        this.approvalRequestsGrid.api.refresh().subscribe();
    }
    openQuestionResponseDialog(selectedRow) {
        this.rxModalService
            .openModal({
            content: ApprovalRequestQuestionResponseComponent,
            size: 'sm',
            data: {
                selectedRequest: selectedRow
            }
        })
            .then((result) => {
            if (result) {
                this.reloadGridData();
            }
        })
            .catch(noop);
    }
    getColumns() {
        return [
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.application,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.record-definition.label'),
                cellTemplate: this.definitionNameCellTemplate
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.summary,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                cellTemplate: this.resolvedFieldCellTemplate,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.requester,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.requester.label'),
                cellTemplate: this.resolvedFieldCellTemplate,
                sortable: true
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.status,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.status.label'),
                filterable: false,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.request,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request-id.label'),
                cellTemplate: this.resolvedFieldCellTemplate,
                sortable: true
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.actingAs,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.acting-as.title'),
                filterable: false,
                searchable: false,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.createDateSig,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request-date.label'),
                visible: false,
                filterable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.process,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.process.title'),
                visible: false,
                filterable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureInstanceID,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.signature-instance-id.title'),
                visible: false,
                filterable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.justificationReasonField,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.justification.title'),
                visible: false,
                filterable: false,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.sigTermStateDate,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.status-updated-on.title'),
                visible: false,
                filterable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureID,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.signature-id.title'),
                visible: false,
                filterable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail1,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.other-detail1.title'),
                visible: false,
                filterable: false,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail2,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.other-detail2.title'),
                visible: false,
                filterable: false,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail3,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.other-detail3.title'),
                visible: false,
                filterable: false,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail4,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.other-detail4.title'),
                visible: false,
                filterable: false,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.justificationRequired,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.justification.require-on.label'),
                visible: false,
                filterable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.processInstanceId,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.process-instance-id.title'),
                visible: false,
                filterable: false,
                sortable: false
            }
        ];
    }
    getRecordDefinition() {
        return {
            fieldDefinitions: [
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.application,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.summary,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.requester,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.status,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.selection,
                    optionNamesById: {
                        [ApprovalRequestStatus.Pending]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.pending.labelKey),
                        [ApprovalRequestStatus.RequestMoreInfo]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.moreInfo.labelKey),
                        [ApprovalRequestStatus.Approved]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.approved.labelKey),
                        [ApprovalRequestStatus.Rejected]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.rejected.labelKey),
                        [ApprovalRequestStatus.Cancelled]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.cancelled.labelKey),
                        [ApprovalRequestStatus.Error]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.error.labelKey),
                        [ApprovalRequestStatus.Hold]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.onHold.labelKey),
                        [ApprovalRequestStatus.Closed]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.closed.labelKey)
                    }
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.request,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.actingAs,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.createDateSig,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.process,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureInstanceID,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.justificationReasonField,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.sigTermStateDate,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureID,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail1,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail2,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail3,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail4,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.justificationRequired,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.selection,
                    optionNamesById: {
                        [JustificationRequirement.RequiredForApproval]: this.translateService.instant('com.bmc.arsys.rx.client.approval.justification.require-on.approval.label'),
                        [JustificationRequirement.RequiredForRejection]: this.translateService.instant('com.bmc.arsys.rx.client.approval.justification.require-on.rejection.label'),
                        [JustificationRequirement.RequiredForApprovalOrRejection]: this.translateService.instant('com.bmc.arsys.rx.client.approval.justification.require-on.approval-rejection.label'),
                        [JustificationRequirement.NotRequired]: this.translateService.instant('com.bmc.arsys.rx.client.common.not-applicable.label')
                    }
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.processInstanceId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
    }
}
ApprovalConsoleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleComponent, deps: [{ token: i1$3.RxStringService }, { token: RxApprovalConsoleHelperService }, { token: i3.RxCurrentUserService }, { token: i1$1.TranslateService }, { token: i6$1.RxModalService }, { token: i3.RxNotificationService }, { token: RxApprovalConsoleService }, { token: i2.RxRecordInstanceService }, { token: i1$2.AdaptModalService }, { token: RxSignatureDetailDataPageService }, { token: i10.RxRecordGridFilterService }, { token: i2.RxRecordInstanceDataPageService }, { token: i3.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalConsoleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalConsoleComponent, selector: "rx-approval-console", viewQueries: [{ propertyName: "requestDetailsTabs", first: true, predicate: ["requestDetailsTabs"], descendants: true }, { propertyName: "resolvedFieldCellTemplate", first: true, predicate: ["resolvedFieldCellTemplate"], descendants: true, static: true }, { propertyName: "definitionNameCellTemplate", first: true, predicate: ["definitionNameCellTemplate"], descendants: true, static: true }, { propertyName: "approvalRequestsGrid", first: true, predicate: ["approvalRequestsGrid"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"row h-100\">\n  <div class=\"col-12 col-md-7 d-flex flex-column flex-fill h-100\">\n    <h2 class=\"mt-0\">{{ 'com.bmc.arsys.rx.client.approval.console.requests.title' | translate }}</h2>\n\n    <adapt-tabset\n      type=\"pills\"\n      [tab-active]=\"0\"\n      *ngIf=\"availableRequestCount$ | async as requestsTypeCounts\"\n      (tab-active-changed)=\"fetchApprovalRequests($event)\"\n      rx-id=\"approval-requests-tabs\"\n    >\n      <adapt-tab-panel\n        *ngFor=\"let requestType of approvalRequestTypes\"\n        adapt-tab-title=\"{{ requestType.label }}\"\n        [badge]=\"requestsTypeCounts[requestType.countType]\"\n        [badge-type]=\"requestType.badgeType\"\n      >\n      </adapt-tab-panel>\n    </adapt-tabset>\n\n    <rx-record-grid\n      #approvalRequestsGrid\n      [config]=\"gridConfig$\"\n      *ngIf=\"shouldShowGrid\"\n      (dataLoaded)=\"onDataLoaded()\"\n    ></rx-record-grid>\n  </div>\n\n  <div class=\"col-12 col-md-5 mt-4 mt-md-0 d-flex flex-column flex-fill h-100\">\n    <div class=\"mb-1\">\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"secondary\"\n        size=\"small\"\n        class=\"d-icon-left-angle_left mr-2\"\n        rx-id=\"prev-button\"\n        [disabled]=\"isPreviousButtonDisabled()\"\n        (click)=\"showPreviousRequestDetails()\"\n      ></button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"secondary\"\n        size=\"small\"\n        class=\"d-icon-left-angle_right mr-3\"\n        rx-id=\"next-button\"\n        [disabled]=\"isNextButtonDisabled()\"\n        (click)=\"showNextRequestDetails()\"\n      ></button>\n\n      <h2 class=\"d-inline-block my-0 align-middle\">\n        {{ 'com.bmc.arsys.rx.client.approval.console.request-details.title' | translate }}\n        <span *ngIf=\"currentRequestId\">({{ currentRequestId }})</span>\n      </h2>\n    </div>\n\n    <adapt-tabset\n      type=\"pills\"\n      [tab-active]=\"0\"\n      #requestDetailsTabs\n      (tab-active-changed)=\"onTabChanged($event)\"\n      class=\"d-flex flex-column flex-fill h-100\"\n      rx-id=\"request-details-tabs\"\n    >\n      <adapt-tab-panel\n        adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.common.general-items.label' | translate }}\"\n        badge-type=\"primary\"\n      >\n        <rx-approval-request-general-details\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n        ></rx-approval-request-general-details>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.console.approvers.title' | translate }}\">\n        <rx-approval-request-approvers\n          class=\"d-flex flex-column flex-fill h-100\"\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n          *ngIf=\"activeTabIndex === 1\"\n        ></rx-approval-request-approvers>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.console.questions.label' | translate }}\">\n        <rx-approval-request-questions\n          class=\"d-flex flex-column flex-fill h-100\"\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n          [requestsTabStatus]=\"selectedApprovalRequestsTab.status\"\n          (questionSubmitted)=\"onQuestionSubmitted()\"\n          *ngIf=\"activeTabIndex === 2\"\n        ></rx-approval-request-questions>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.console.comments.title' | translate }}\">\n        <rx-approval-request-comments\n          class=\"d-flex flex-column flex-fill h-100\"\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n          *ngIf=\"activeTabIndex === 3\"\n        ></rx-approval-request-comments>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.console.attachments.title' | translate }}\">\n        <rx-approval-request-attachments\n          class=\"d-flex flex-column flex-fill h-100\"\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n          *ngIf=\"activeTabIndex === 4\"\n        ></rx-approval-request-attachments>\n      </adapt-tab-panel>\n    </adapt-tabset>\n  </div>\n</div>\n\n<ng-template #definitionNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n\n<ng-template #resolvedFieldCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem.resolvedDisplayValues[column.field] }}\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;padding:1rem;height:100%}:host::ng-deep adapt-tabset .tab-content{padding:.5rem 0 0}:host::ng-deep rx-record-grid{height:100%}:host::ng-deep rx-record-grid .rx-action-button_success button{background:#89c341;border-color:#78ac36}:host::ng-deep rx-record-grid .rx-action-button_success button:hover{background-color:#78ac36}:host::ng-deep rx-record-grid .rx-action-button_critical button{background:#f83200;border-color:#d72b00}:host::ng-deep rx-record-grid .rx-action-button_critical button:hover{background-color:#d72b00}:host::ng-deep rx-record-grid .rx-action-button_warning button{color:#313538;background:#f1b521;border-color:#e3a50e}:host::ng-deep rx-record-grid .rx-action-button_warning button:hover{background-color:#e3a50e}:host::ng-deep rx-record-grid .rx-action-button_warning button:disabled{color:#313538;background-color:#f6cf6f}\n"], components: [{ type: i1$2.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i1$2.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i10.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: ApprovalRequestGeneralDetailsComponent, selector: "rx-approval-request-general-details", inputs: ["approvalRequest", "gridType"] }, { type: ApprovalRequestApproversComponent, selector: "rx-approval-request-approvers", inputs: ["approvalRequest", "gridType"] }, { type: ApprovalRequestQuestionsComponent, selector: "rx-approval-request-questions", inputs: ["approvalRequest", "requestsTabStatus", "gridType"], outputs: ["questionSubmitted"] }, { type: ApprovalRequestCommentsComponent, selector: "rx-approval-request-comments", inputs: ["approvalRequest", "gridType"] }, { type: ApprovalRequestAttachmentsComponent, selector: "rx-approval-request-attachments", inputs: ["approvalRequest", "gridType"] }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i1$1.TranslatePipe, "async": i3$1.AsyncPipe, "rxDefinitionNamePipe": i3.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-console',
                    templateUrl: './approval-console.component.html',
                    styleUrls: ['./approval-console.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$3.RxStringService }, { type: RxApprovalConsoleHelperService }, { type: i3.RxCurrentUserService }, { type: i1$1.TranslateService }, { type: i6$1.RxModalService }, { type: i3.RxNotificationService }, { type: RxApprovalConsoleService }, { type: i2.RxRecordInstanceService }, { type: i1$2.AdaptModalService }, { type: RxSignatureDetailDataPageService }, { type: i10.RxRecordGridFilterService }, { type: i2.RxRecordInstanceDataPageService }, { type: i3.RxDefinitionNameService }]; }, propDecorators: { requestDetailsTabs: [{
                type: ViewChild,
                args: ['requestDetailsTabs']
            }], resolvedFieldCellTemplate: [{
                type: ViewChild,
                args: ['resolvedFieldCellTemplate', { static: true }]
            }], definitionNameCellTemplate: [{
                type: ViewChild,
                args: ['definitionNameCellTemplate', { static: true }]
            }], approvalRequestsGrid: [{
                type: ViewChild,
                args: ['approvalRequestsGrid']
            }] } });

class ApprovalConsoleRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-approval-console',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ApprovalConsoleComponent),
            name: 'Approval console',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.approvalBundleId]
        });
    }
}
ApprovalConsoleRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1$4.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ApprovalConsoleRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleRegistrationModule, declarations: [ApprovalConsoleComponent,
        ApprovalRequestGeneralDetailsComponent,
        ApprovalRequestReassignComponent,
        ApprovalRequestApproversComponent,
        ApprovalRequestQuestionsComponent,
        ApprovalRequestCommentsComponent,
        ApprovalRequestAttachmentsComponent,
        ApprovalRequestQuestionResponseComponent,
        ApprovalRequestQuestionComponent,
        ApprovalRequestCommentComponent,
        ApprovalRequestActionReasonInputComponent], imports: [CommonModule,
        RecordGridModule,
        AdaptButtonModule,
        AdaptDropdownModule,
        FormsModule,
        TranslateModule,
        AdaptTabsModule,
        ReadOnlyFieldModule,
        RxBusyIndicatorModule,
        RxDefinitionModule,
        RxSelectWithPaginationModule,
        AdaptEmptyStateModule,
        AdaptRxTextareaModule,
        AdaptRxUploaderModule,
        AdaptBusyModule,
        AdaptDownloadModule,
        AdaptRxLabelModule,
        AdaptRxSwitchModule,
        AdaptAlertModule,
        AdaptRxTextfieldModule] });
ApprovalConsoleRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleRegistrationModule, providers: [RxApprovalConsoleHelperService], imports: [[
            CommonModule,
            RecordGridModule,
            AdaptButtonModule,
            AdaptDropdownModule,
            FormsModule,
            TranslateModule,
            AdaptTabsModule,
            ReadOnlyFieldModule,
            RxBusyIndicatorModule,
            RxDefinitionModule,
            RxSelectWithPaginationModule,
            AdaptEmptyStateModule,
            AdaptRxTextareaModule,
            AdaptRxUploaderModule,
            AdaptBusyModule,
            AdaptDownloadModule,
            AdaptRxLabelModule,
            AdaptRxSwitchModule,
            AdaptAlertModule,
            AdaptRxTextfieldModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ApprovalConsoleComponent,
                        ApprovalRequestGeneralDetailsComponent,
                        ApprovalRequestReassignComponent,
                        ApprovalRequestApproversComponent,
                        ApprovalRequestQuestionsComponent,
                        ApprovalRequestCommentsComponent,
                        ApprovalRequestAttachmentsComponent,
                        ApprovalRequestQuestionResponseComponent,
                        ApprovalRequestQuestionComponent,
                        ApprovalRequestCommentComponent,
                        ApprovalRequestActionReasonInputComponent
                    ],
                    imports: [
                        CommonModule,
                        RecordGridModule,
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        FormsModule,
                        TranslateModule,
                        AdaptTabsModule,
                        ReadOnlyFieldModule,
                        RxBusyIndicatorModule,
                        RxDefinitionModule,
                        RxSelectWithPaginationModule,
                        AdaptEmptyStateModule,
                        AdaptRxTextareaModule,
                        AdaptRxUploaderModule,
                        AdaptBusyModule,
                        AdaptDownloadModule,
                        AdaptRxLabelModule,
                        AdaptRxSwitchModule,
                        AdaptAlertModule,
                        AdaptRxTextfieldModule
                    ],
                    entryComponents: [ApprovalConsoleComponent],
                    providers: [RxApprovalConsoleHelperService]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1$4.RxViewComponentRegistryService }]; } });

class ApprovalConsoleModule {
}
ApprovalConsoleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ApprovalConsoleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleModule, imports: [ApprovalConsoleRegistrationModule] });
ApprovalConsoleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleModule, providers: [], imports: [[ApprovalConsoleRegistrationModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ApprovalConsoleRegistrationModule],
                    providers: [],
                    declarations: []
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ApprovalConsoleComponent, ApprovalConsoleModule, ApprovalConsoleRegistrationModule };
//# sourceMappingURL=helix-platform-approval-components.js.map
