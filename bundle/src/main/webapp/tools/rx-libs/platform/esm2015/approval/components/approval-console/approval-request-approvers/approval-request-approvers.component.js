import { Component, Input, ViewChild } from '@angular/core';
import { iif, of } from 'rxjs';
import { RecordGridComponent } from '@helix/platform/view/components';
import { RX_APPROVAL_CONSOLE } from '../approval-console.constant';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { omit } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalGridType } from '../approval-console.types';
import { switchMap } from 'rxjs/operators';
import { RxApprovalConsoleService } from '../approval-console.service';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "../approval-console.service";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/view/components";
import * as i6 from "@angular/common";
export class ApprovalRequestApproversComponent {
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
ApprovalRequestApproversComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestApproversComponent, deps: [{ token: i1.TranslateService }, { token: i2.RxApprovalConsoleService }, { token: i3.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestApproversComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestApproversComponent, selector: "rx-approval-request-approvers", inputs: { approvalRequest: "approvalRequest", gridType: "gridType" }, viewQueries: [{ propertyName: "requestApproversGrid", first: true, predicate: ["requestApproversGrid"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<adapt-empty-state\n  type=\"objects\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<rx-record-grid [config]=\"gridConfig$\" *ngIf=\"approvalRequest\" #requestApproversGrid></rx-record-grid>\n", styles: [":host ::ng-deep rx-record-grid .adapt-table-search-toolbar-container{display:none}\n"], components: [{ type: i4.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestApproversComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-approvers',
                    templateUrl: './approval-request-approvers.component.html',
                    styleUrls: ['./approval-request-approvers.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxApprovalConsoleService }, { type: i3.RxRecordInstanceDataPageService }]; }, propDecorators: { approvalRequest: [{
                type: Input
            }], gridType: [{
                type: Input
            }], requestApproversGrid: [{
                type: ViewChild,
                args: ['requestApproversGrid']
            }] } });
//# sourceMappingURL=approval-request-approvers.component.js.map