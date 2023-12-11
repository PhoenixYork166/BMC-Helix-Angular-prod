import { Component, Injector } from '@angular/core';
import { ApprovalCommandType } from '../approval-console.types';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { map, some, trim } from 'lodash';
import { RX_APPROVAL_CONSOLE } from '../approval-console.constant';
import { RxApprovalConsoleService } from '../approval-console.service';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "../approval-console.service";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/common";
export class ApprovalRequestActionReasonInputComponent extends RxModalClass {
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
        this.requests = map(this.activeModalRef.getData().selectedRequests, (request) => ({
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
            ...map(this.requests, (request) => (Object.assign({ justificationOrReason: this.shouldApplySameReasonToAll ? commonReason : request.reason }, this.rxApprovalConsoleService.getCommandPayload(this.commandType, request.requestSignatureInstanceId))))
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
ApprovalRequestActionReasonInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestActionReasonInputComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxNotificationService }, { token: i3.TranslateService }, { token: i4.RxApprovalConsoleService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestActionReasonInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestActionReasonInputComponent, selector: "rx-approval-request-action-reason-input", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ title }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <adapt-rx-textfield\n    class=\"form-group d-block\"\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.grid.column.requestId' | translate }}\"\n    [(ngModel)]=\"requests[currentRequestIndex].requestId\"\n    [readonly]=\"true\"\n    rx-id=\"request-id\"\n  >\n  </adapt-rx-textfield>\n\n  <adapt-rx-textarea\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.justification-reason.label' | translate }}\"\n    class=\"d-block form-group\"\n    [(ngModel)]=\"requests[currentRequestIndex].reason\"\n    [required]=\"requests[currentRequestIndex].isReasonRequired\"\n    rx-id=\"justification-reason\"\n    rows=\"2\"\n    [autofocus]=\"true\"\n  ></adapt-rx-textarea>\n\n  <adapt-rx-switch\n    class=\"d-block mb-2\"\n    [(ngModel)]=\"shouldApplySameReasonToAll\"\n    [disabled]=\"isReasonEmpty(requests[currentRequestIndex].reason)\"\n    rx-id=\"all-request-reason\"\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.console.apply-common-justification-reason.label' | translate }}\"\n  ></adapt-rx-switch>\n\n  <div class=\"text-warning\" *ngIf=\"shouldApplySameReasonToAll\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.overwrite-justification-reason.warning' | translate }}\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    type=\"button\"\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"secondary\"\n    rx-id=\"previous-button\"\n    [disabled]=\"currentRequestIndex === 0 || shouldApplySameReasonToAll\"\n    (click)=\"goToPreviousRequest()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.previous-step.label' | translate }}\n  </button>\n\n  <button\n    type=\"button\"\n    adapt-button\n    class=\"mr-auto\"\n    btn-type=\"secondary\"\n    rx-id=\"next-button\"\n    [disabled]=\"currentRequestIndex === requests.length - 1 || shouldApplySameReasonToAll\"\n    (click)=\"goToNextRequest()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.next-step.label' | translate }}\n  </button>\n\n  <button\n    type=\"button\"\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    rx-id=\"save-button\"\n    [disabled]=\"isSaveButtonDisabled()\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    (click)=\"saveRequests()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestActionReasonInputComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-action-reason-input',
                    templateUrl: './approval-request-action-reason-input.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxNotificationService }, { type: i3.TranslateService }, { type: i4.RxApprovalConsoleService }, { type: i0.Injector }]; } });
//# sourceMappingURL=approval-request-action-reason-input.component.js.map