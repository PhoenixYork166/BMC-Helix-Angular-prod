import { Component, Injector } from '@angular/core';
import { RxApprovalConsoleService } from '../approval-console.service';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import { RxNotificationService } from '@helix/platform/shared/api';
import { finalize } from 'rxjs/operators';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "../approval-console.service";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@angular/forms";
export class ApprovalRequestQuestionComponent extends RxModalClass {
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
ApprovalRequestQuestionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestQuestionComponent, deps: [{ token: i1.RxApprovalConsoleService }, { token: i2.RxNotificationService }, { token: i3.TranslateService }, { token: i4.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestQuestionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestQuestionComponent, selector: "rx-approval-request-question", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.questions.new.label' | translate }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <rx-select-with-pagination\n    label=\"{{ 'com.bmc.arsys.rx.client.common.send-to.label' | translate }}\"\n    class=\"form-group d-block\"\n    [(ngModel)]=\"selectedUser\"\n    [optionLoader]=\"userLoaderFunc\"\n    [required]=\"true\"\n    [template]=\"optionTemplate\"\n    [optionFormatter]=\"optionFormatter\"\n  ></rx-select-with-pagination>\n\n  <adapt-rx-textarea\n    label=\"{{ 'com.bmc.arsys.rx.client.common.question.label' | translate }}\"\n    class=\"d-block form-group\"\n    [(ngModel)]=\"question\"\n    [required]=\"true\"\n    [autofocus]=\"true\"\n    rows=\"2\"\n  ></adapt-rx-textarea>\n\n  <adapt-rx-uploader\n    adaptRequired\n    [(ngModel)]=\"attachment\"\n    [enableDnD]=\"true\"\n    [showMaxSizeRestriction]=\"false\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.attachment.label' | translate }}\"\n  >\n  </adapt-rx-uploader>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"!selectedUser.length || !question || !allowDismiss\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    (click)=\"saveQuestion()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n\n<ng-template #optionTemplate let-option>\n  <strong>{{ option.displayValue }}</strong>\n\n  <div class=\"text-secondary\">\n    {{ option.value }}\n  </div>\n</ng-template>\n", components: [{ type: i5.RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: ["label", "required", "isMultiSelectionMode", "optionLoader", "pageSize", "showDefaultTitle", "showUncheckAll", "readonly", "template", "viewToModelValueAdapter", "modelToViewValueAdapter", "optionFormatter"], outputs: ["toggleDropdown", "selectionChange"] }, { type: i4.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestQuestionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-question',
                    templateUrl: './approval-request-question.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxApprovalConsoleService }, { type: i2.RxNotificationService }, { type: i3.TranslateService }, { type: i4.ActiveModalRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=approval-request-question.component.js.map