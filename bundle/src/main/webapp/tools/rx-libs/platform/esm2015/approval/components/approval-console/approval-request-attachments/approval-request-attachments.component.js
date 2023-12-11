import { Component, Input, ViewChild } from '@angular/core';
import { iif, of } from 'rxjs';
import { RecordGridComponent } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { RX_APPROVAL_CONSOLE } from '../approval-console.constant';
import { omit, reject } from 'lodash';
import { RX_RECORD_DEFINITION, RxRecordInstanceService, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { ApprovalGridType } from '../approval-console.types';
import { map, switchMap } from 'rxjs/operators';
import { RxApprovalConsoleService } from '../approval-console.service';
import * as i0 from "@angular/core";
import * as i1 from "../approval-console.service";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/view/components";
import * as i6 from "@angular/common";
export class ApprovalRequestAttachmentsComponent {
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
ApprovalRequestAttachmentsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestAttachmentsComponent, deps: [{ token: i1.RxApprovalConsoleService }, { token: i2.TranslateService }, { token: i3.RxRecordInstanceService }, { token: i3.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestAttachmentsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestAttachmentsComponent, selector: "rx-approval-request-attachments", inputs: { approvalRequest: "approvalRequest", gridType: "gridType" }, viewQueries: [{ propertyName: "requestAttachmentsGrid", first: true, predicate: ["requestAttachmentsGrid"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<adapt-empty-state\n  type=\"grid\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<rx-record-grid [config]=\"gridConfig$\" *ngIf=\"approvalRequest\" #requestAttachmentsGrid></rx-record-grid>\n", components: [{ type: i4.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestAttachmentsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-attachments',
                    templateUrl: './approval-request-attachments.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxApprovalConsoleService }, { type: i2.TranslateService }, { type: i3.RxRecordInstanceService }, { type: i3.RxRecordInstanceDataPageService }]; }, propDecorators: { approvalRequest: [{
                type: Input
            }], gridType: [{
                type: Input
            }], requestAttachmentsGrid: [{
                type: ViewChild,
                args: ['requestAttachmentsGrid']
            }] } });
//# sourceMappingURL=approval-request-attachments.component.js.map