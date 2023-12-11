import { Component, Injector } from '@angular/core';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxApprovalConsoleService } from '../approval-console.service';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { RxModalClass } from '@helix/platform/ui-kit';
import { trim } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "../approval-console.service";
import * as i5 from "@angular/forms";
export class ApprovalRequestCommentComponent extends RxModalClass {
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
ApprovalRequestCommentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestCommentComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.TranslateService }, { token: i3.RxNotificationService }, { token: i4.RxApprovalConsoleService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ApprovalRequestCommentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestCommentComponent, selector: "rx-approval-request-comment", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.comments.new.label' | translate }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <adapt-rx-textarea\n    label=\"{{ 'com.bmc.arsys.rx.client.common.comment.label' | translate }}\"\n    class=\"d-block form-group\"\n    [(ngModel)]=\"comment\"\n    [required]=\"true\"\n    [autofocus]=\"true\"\n    rows=\"3\"\n  ></adapt-rx-textarea>\n\n  <adapt-rx-uploader\n    adaptRequired\n    [(ngModel)]=\"attachment\"\n    [enableDnD]=\"true\"\n    [showMaxSizeRestriction]=\"false\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.attachment.label' | translate }}\"\n  >\n  </adapt-rx-uploader>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"isCommentEmpty() || !allowDismiss\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    (click)=\"saveComment()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalRequestCommentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-request-comment',
                    templateUrl: './approval-request-comment.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.TranslateService }, { type: i3.RxNotificationService }, { type: i4.RxApprovalConsoleService }, { type: i0.Injector }]; } });
//# sourceMappingURL=approval-request-comment.component.js.map