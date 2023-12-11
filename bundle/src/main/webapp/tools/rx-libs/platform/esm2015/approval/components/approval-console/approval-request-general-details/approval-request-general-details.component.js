import { Component, Input } from '@angular/core';
import { RX_APPROVAL_CONSOLE } from '../approval-console.constant';
import { ApprovalGridType, ApprovalRequestStatus } from '../approval-console.types';
import { combineLatest, EMPTY, NEVER, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { RxApprovalConsoleService } from '../approval-console.service';
import { forEach } from 'lodash';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxApprovalConsoleHelperService } from '../approval-console-helper.service';
import * as i0 from "@angular/core";
import * as i1 from "../approval-console-helper.service";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@angular/common";
import * as i4 from "@ngx-translate/core";
import * as i5 from "../approval-console.service";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@bmc-ux/adapt-angular";
export class ApprovalRequestGeneralDetailsComponent {
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
ApprovalRequestGeneralDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestGeneralDetailsComponent, deps: [{ token: i1.RxApprovalConsoleHelperService }, { token: i2.RxDefinitionNameService }, { token: i3.DatePipe }, { token: i4.TranslateService }, { token: i5.RxApprovalConsoleService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestGeneralDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestGeneralDetailsComponent, selector: "rx-approval-request-general-details", inputs: { approvalRequest: "approvalRequest", gridType: "gridType" }, usesOnChanges: true, ngImport: i0, template: "<rx-busy-indicator [options]=\"{ busy: busy }\"></rx-busy-indicator>\n\n<adapt-empty-state\n  type=\"alerts\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<div [hidden]=\"!approvalRequest\" *ngIf=\"allRequestFields$ | async as requestFields\" class=\"pt-2 pl-3\">\n  <rx-read-only-field\n    *ngFor=\"let field of requestFields\"\n    class=\"d-block form-group\"\n    label=\"{{ field.label }}\"\n    value=\"{{ field.value }}\"\n  ></rx-read-only-field>\n</div>\n", styles: [":host{display:block;position:relative;min-height:65%}\n"], components: [{ type: i6.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i7.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i6.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i4.TranslatePipe, "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestGeneralDetailsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-general-details',
                    templateUrl: './approval-request-general-details.component.html',
                    styleUrls: ['./approval-request-general-details.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxApprovalConsoleHelperService }, { type: i2.RxDefinitionNameService }, { type: i3.DatePipe }, { type: i4.TranslateService }, { type: i5.RxApprovalConsoleService }]; }, propDecorators: { approvalRequest: [{
                type: Input
            }], gridType: [{
                type: Input
            }] } });
//# sourceMappingURL=approval-request-general-details.component.js.map