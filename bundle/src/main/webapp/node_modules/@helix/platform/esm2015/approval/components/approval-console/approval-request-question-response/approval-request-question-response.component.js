import { Component, Injector } from '@angular/core';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RX_APPROVAL_CONSOLE } from '../approval-console.constant';
import { RX_RECORD_DEFINITION, RxRecordInstanceService } from '@helix/platform/record/api';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RxApprovalConsoleService } from '../approval-console.service';
import { of } from 'rxjs';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "../approval-console.service";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@angular/forms";
export class ApprovalRequestQuestionResponseComponent extends RxModalClass {
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
ApprovalRequestQuestionResponseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestQuestionResponseComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxRecordInstanceService }, { token: i3.RxNotificationService }, { token: i4.TranslateService }, { token: i5.RxApprovalConsoleService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestQuestionResponseComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestQuestionResponseComponent, selector: "rx-approval-request-question-response", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.question-response-dialog.title' | translate }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <rx-read-only-field\n    class=\"d-block form-group\"\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.console.question-response-dialog.to-field.label' | translate }}\"\n    value=\"{{ request['2'] }}\"\n  ></rx-read-only-field>\n\n  <rx-read-only-field\n    class=\"d-block form-group\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.question.label' | translate }}\"\n    value=\"{{ request['13300'] }}\"\n  ></rx-read-only-field>\n\n  <adapt-rx-textarea\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.console.question-response-dialog.response-field.label' | translate }}\"\n    class=\"d-block form-group\"\n    [(ngModel)]=\"response\"\n    [required]=\"true\"\n    [autofocus]=\"true\"\n    rows=\"2\"\n  ></adapt-rx-textarea>\n\n  <adapt-rx-uploader\n    adaptRequired\n    [(ngModel)]=\"attachment\"\n    [required]=\"existingAttachmentName\"\n    [showMaxSizeRestriction]=\"false\"\n    (removedFileFromQueue)=\"onRemovedFileFromQueue()\"\n    (afterFilesAdded)=\"onAfterFilesAdded()\"\n    [enableCustomDownload]=\"enableCustomDownload\"\n    [customDownload]=\"downloadAttachment\"\n    [reusable]=\"true\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.attachment.label' | translate }}\"\n  >\n  </adapt-rx-uploader>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"isSaveButtonDisabled()\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    (click)=\"sendResponse()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [":host ::ng-deep rx-read-only-field .read-only-content{max-height:9em;overflow-y:auto;word-break:break-all;white-space:pre-wrap}:host ::ng-deep adapt-rx-uploader .adapt-uploader-file-uploaded{display:none}\n"], components: [{ type: i6.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }, { type: i1.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestQuestionResponseComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-question-response',
                    templateUrl: './approval-request-question-response.component.html',
                    styleUrls: ['./approval-request-question-response.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxRecordInstanceService }, { type: i3.RxNotificationService }, { type: i4.TranslateService }, { type: i5.RxApprovalConsoleService }, { type: i0.Injector }]; } });
//# sourceMappingURL=approval-request-question-response.component.js.map