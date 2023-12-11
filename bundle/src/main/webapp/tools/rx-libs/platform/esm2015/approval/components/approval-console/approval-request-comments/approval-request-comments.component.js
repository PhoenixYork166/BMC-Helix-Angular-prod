import { Component, Input, ViewChild } from '@angular/core';
import { iif, of } from 'rxjs';
import { RecordGridComponent } from '@helix/platform/view/components';
import { RxDataPageFactoryService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RX_APPROVAL_CONSOLE } from '../approval-console.constant';
import { RX_RECORD_DEFINITION, RxRecordInstanceService } from '@helix/platform/record/api';
import { noop, omit } from 'lodash';
import { ApprovalGridType } from '../approval-console.types';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { ApprovalRequestCommentComponent } from '../approval-request-comment/approval-request-comment.component';
import { switchMap, tap } from 'rxjs/operators';
import { RxApprovalConsoleService } from '../approval-console.service';
import { ReadOnlyFieldsModalComponent, RxModalService } from '@helix/platform/ui-kit';
import { RxApprovalQCIDataPageService } from '../approval-qci-data-page.service';
import * as i0 from "@angular/core";
import * as i1 from "../approval-qci-data-page.service";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "../approval-console.service";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/shared/api";
import * as i6 from "@helix/platform/record/api";
import * as i7 from "@ngx-translate/core";
import * as i8 from "@helix/platform/view/components";
import * as i9 from "@angular/common";
export class ApprovalRequestCommentsComponent {
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
ApprovalRequestCommentsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestCommentsComponent, deps: [{ token: i1.RxApprovalQCIDataPageService }, { token: i2.RxModalService }, { token: i3.RxApprovalConsoleService }, { token: i4.AdaptModalService }, { token: i5.RxDataPageFactoryService }, { token: i6.RxRecordInstanceService }, { token: i7.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestCommentsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestCommentsComponent, selector: "rx-approval-request-comments", inputs: { approvalRequest: "approvalRequest", gridType: "gridType" }, viewQueries: [{ propertyName: "requestCommentsGrid", first: true, predicate: ["requestCommentsGrid"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<adapt-empty-state\n  type=\"events\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<button\n  type=\"button\"\n  class=\"p-0 mb-2 d-icon-plus_circle align-self-start\"\n  adapt-button\n  btn-type=\"tertiary\"\n  rx-id=\"new-comment-button\"\n  *ngIf=\"approvalRequest\"\n  (click)=\"addNewComment()\"\n>\n  {{ 'com.bmc.arsys.rx.client.approval.console.comments.new.label' | translate }}\n</button>\n\n<rx-record-grid [config]=\"gridConfig$\" *ngIf=\"approvalRequest\" #requestCommentsGrid></rx-record-grid>\n", components: [{ type: i4.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i8.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i7.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestCommentsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-comments',
                    templateUrl: './approval-request-comments.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxApprovalQCIDataPageService }, { type: i2.RxModalService }, { type: i3.RxApprovalConsoleService }, { type: i4.AdaptModalService }, { type: i5.RxDataPageFactoryService }, { type: i6.RxRecordInstanceService }, { type: i7.TranslateService }]; }, propDecorators: { approvalRequest: [{
                type: Input
            }], gridType: [{
                type: Input
            }], requestCommentsGrid: [{
                type: ViewChild,
                args: ['requestCommentsGrid']
            }] } });
//# sourceMappingURL=approval-request-comments.component.js.map