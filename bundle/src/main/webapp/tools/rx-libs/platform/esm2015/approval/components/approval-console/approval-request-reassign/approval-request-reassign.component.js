import { Component, Injector } from '@angular/core';
import { RxNotificationService } from '@helix/platform/shared/api';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxApprovalConsoleService } from '../approval-console.service';
import { map as _map } from 'lodash';
import { ApprovalCommandType } from '../approval-console.types';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "../approval-console.service";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@angular/forms";
export class ApprovalRequestReassignComponent extends RxModalClass {
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
        const commands = _map(this.activeModalRef.getData().selectedRequestInstanceIds, (signatureInstance) => (Object.assign({ assignToApprovers: this.selectedUser[0].value }, this.rxApprovalConsoleService.getCommandPayload(ApprovalCommandType.Reassign, signatureInstance))));
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
ApprovalRequestReassignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestReassignComponent, deps: [{ token: i1.TranslateService }, { token: i2.RxNotificationService }, { token: i3.ActiveModalRef }, { token: i4.RxApprovalConsoleService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestReassignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestReassignComponent, selector: "rx-approval-request-reassign", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.request.reassign-dialog.title' | translate }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <rx-select-with-pagination\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.console.request.reassign.label' | translate }}\"\n    class=\"form-group d-block\"\n    [(ngModel)]=\"selectedUser\"\n    [optionLoader]=\"userLoaderFunc\"\n    [required]=\"true\"\n    [template]=\"optionTemplate\"\n    [optionFormatter]=\"optionFormatter\"\n  ></rx-select-with-pagination>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    [disabled]=\"!selectedUser.length || !allowDismiss\"\n    (click)=\"reassign()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n\n<ng-template #optionTemplate let-option>\n  <strong>{{ option.displayValue }}</strong>\n\n  <div class=\"text-secondary\">\n    {{ option.value }}\n  </div>\n</ng-template>\n", components: [{ type: i5.RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: ["label", "required", "isMultiSelectionMode", "optionLoader", "pageSize", "showDefaultTitle", "showUncheckAll", "readonly", "template", "viewToModelValueAdapter", "modelToViewValueAdapter", "optionFormatter"], outputs: ["toggleDropdown", "selectionChange"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i3.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestReassignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-reassign',
                    templateUrl: './approval-request-reassign.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxNotificationService }, { type: i3.ActiveModalRef }, { type: i4.RxApprovalConsoleService }, { type: i0.Injector }]; } });
//# sourceMappingURL=approval-request-reassign.component.js.map