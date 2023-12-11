import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { iif, of } from 'rxjs';
import { RecordGridComponent } from '@helix/platform/view/components';
import { RX_APPROVAL_CONSOLE } from '../approval-console.constant';
import { includes, noop, omit } from 'lodash';
import { RX_RECORD_DEFINITION, RxRecordInstanceService, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalGridType, ApprovalRequestStatus } from '../approval-console.types';
import { ApprovalRequestQuestionComponent } from '../approval-request-question/approval-request-question.component';
import { switchMap } from 'rxjs/operators';
import { RxApprovalConsoleService } from '../approval-console.service';
import { ReadOnlyFieldsModalComponent, RxModalService } from '@helix/platform/ui-kit';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "../approval-console.service";
import * as i6 from "@helix/platform/view/components";
import * as i7 from "@angular/common";
export class ApprovalRequestQuestionsComponent {
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
ApprovalRequestQuestionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestQuestionsComponent, deps: [{ token: i1.TranslateService }, { token: i2.RxRecordInstanceService }, { token: i3.RxModalService }, { token: i4.AdaptModalService }, { token: i5.RxApprovalConsoleService }, { token: i2.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestQuestionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestQuestionsComponent, selector: "rx-approval-request-questions", inputs: { approvalRequest: "approvalRequest", requestsTabStatus: "requestsTabStatus", gridType: "gridType" }, outputs: { questionSubmitted: "questionSubmitted" }, viewQueries: [{ propertyName: "requestQuestionsGrid", first: true, predicate: ["requestQuestionsGrid"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<adapt-empty-state\n  type=\"rules\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<button\n  type=\"button\"\n  class=\"p-0 mb-2 d-icon-plus_circle align-self-start\"\n  adapt-button\n  btn-type=\"tertiary\"\n  rx-id=\"new-question-button\"\n  (click)=\"askNewQuestion()\"\n  *ngIf=\"approvalRequest\"\n  [disabled]=\"isNewQuestionButtonDisabled()\"\n>\n  {{ 'com.bmc.arsys.rx.client.approval.console.questions.new.label' | translate }}\n</button>\n\n<rx-record-grid [config]=\"gridConfig$\" *ngIf=\"approvalRequest\" #requestQuestionsGrid></rx-record-grid>\n", components: [{ type: i4.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i6.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestQuestionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-questions',
                    templateUrl: './approval-request-questions.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxRecordInstanceService }, { type: i3.RxModalService }, { type: i4.AdaptModalService }, { type: i5.RxApprovalConsoleService }, { type: i2.RxRecordInstanceDataPageService }]; }, propDecorators: { approvalRequest: [{
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
//# sourceMappingURL=approval-request-questions.component.js.map