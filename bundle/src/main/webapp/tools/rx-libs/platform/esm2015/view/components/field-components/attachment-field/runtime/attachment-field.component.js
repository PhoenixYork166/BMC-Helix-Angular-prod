import { Component, Injector } from '@angular/core';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import { RX_ATTACHMENT_FIELD } from '../attachment-field.constant';
import { first, has, toString } from 'lodash';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, filter, startWith, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
export class AttachmentFieldComponent extends BaseRecordEditorFieldComponent {
    constructor(injector) {
        super(injector);
        // Uploader options
        this.filesCount = RX_ATTACHMENT_FIELD.defaultOptions.filesCount;
        this.mode = RX_ATTACHMENT_FIELD.defaultOptions.mode;
        this.selectionMode = RX_ATTACHMENT_FIELD.defaultOptions.selectionMode;
        this.chunkSize = RX_ATTACHMENT_FIELD.defaultOptions.chunkSize;
        this.maxFileSize = RX_ATTACHMENT_FIELD.defaultOptions.maxFileSize;
        this.showFiles = [];
        this.texts = {};
        this.readStateConfig = {
            fileName: null,
            downloadURL: null
        };
    }
    onConfigInitialized(config) {
        super.onConfigInitialized(config);
        this.attachmentFormControl = new FormControl(this.showFiles);
        this.maxFileSize = this.fieldDefinition.maxSize
            ? toString(this.fieldDefinition.maxSize)
            : RX_ATTACHMENT_FIELD.defaultOptions.maxFileSize;
        this.formControl.valueChanges
            .pipe(startWith(this.formControl.value), 
        // Update ADAPT component only when formControl value will be a file name string.
        // When value comes as a File, it means this file is already attached to ADAPT component.
        filter((value) => !(value instanceof File)), distinctUntilChanged((previous, next) => {
            return (previous === next &&
                // After uploading a file, adapt-rx-uploader component has to be updated with the URL to download the file.
                // This happens when the record editor updates the entire form with values from the saved record instance.
                // valueChange will emit the same value as before, but adapt-rx-uploader will not have a downloadURL yet.
                has(this.attachmentFormControl.value, '[0].downloadURL'));
        }), takeUntil(this.destroyed$))
            .subscribe(() => {
            this.attachmentFormControl.reset();
            this.addAttachedFileToAttachmentList(this.getFieldValue());
        });
        this.formControl.touched$.pipe(takeUntil(this.destroyed$)).subscribe((touched) => {
            touched ? this.attachmentFormControl.markAsTouched() : this.attachmentFormControl.markAsUntouched();
        });
    }
    addAttachedFileToAttachmentList(fileName) {
        if (fileName) {
            const downloadAttachmentUrl = this.recordEditorApi.getAttachmentDownloadUrl(this.fieldId);
            let attachment;
            attachment = {
                data: {
                    name: fileName
                },
                isUploading: true
            };
            if (downloadAttachmentUrl) {
                attachment.downloadURL = downloadAttachmentUrl;
            }
            this.showFiles = [attachment];
        }
        else {
            this.showFiles = [];
        }
        this.attachmentFormControl.setValue(this.showFiles);
    }
    onConfigUpdated(config) {
        super.onConfigUpdated(config);
        if (this.inReadState) {
            this.readStateConfig = {
                fileName: this.getDisplayValue(),
                downloadURL: this.recordEditorApi.getAttachmentDownloadUrl(this.fieldId)
            };
        }
    }
    removeAttachment(attachment) {
        if (attachment) {
            this.attachment = null;
        }
        this.addAttachedFileToAttachmentList();
        this.setFieldValue(this.attachment);
    }
    addAttachment(attachments) {
        const attachment = first(attachments);
        if (attachment) {
            this.attachment = attachment.data;
            this.setFieldValue(this.attachment);
        }
    }
    onBlur() {
        this.formControl.markAsTouched();
    }
}
AttachmentFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldComponent, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
AttachmentFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AttachmentFieldComponent, selector: "rx-attachment-field", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"!isHidden\">\n  <ng-container *ngIf=\"inReadState; else editStateElementRef\">\n    <div *ngIf=\"getDisplayValue(); else emptyReadonlyField\" [attr.aria-label]=\"label\">\n      <label aria-hidden=\"true\">{{ label }}</label>\n\n      <adapt-downloader class=\"d-block\" *ngIf=\"getDisplayValue()\" [config]=\"readStateConfig\"></adapt-downloader>\n    </div>\n  </ng-container>\n</ng-container>\n\n<ng-template #editStateElementRef>\n  <adapt-rx-uploader\n    [ngClass]=\"{ 'attachment-disabled': isDisabled }\"\n    [reusable]=\"true\"\n    [label]=\"label\"\n    [readonly]=\"isDisabled\"\n    [required]=\"isRequired\"\n    [allowDeletion]=\"false\"\n    [uploadMode]=\"mode\"\n    [selectionMode]=\"selectionMode\"\n    [filesCount]=\"filesCount\"\n    [maxFileSize]=\"maxFileSize\"\n    [chunkSize]=\"chunkSize\"\n    [texts]=\"texts\"\n    (removedFileFromQueue)=\"removeAttachment($event)\"\n    (deletedFile)=\"removeAttachment($event)\"\n    (afterFilesAdded)=\"addAttachment($event)\"\n    [formControl]=\"attachmentFormControl\"\n    (onBlur)=\"onBlur()\"\n  >\n  </adapt-rx-uploader>\n</ng-template>\n\n<ng-template #emptyReadonlyField>\n  <rx-read-only-field [label]=\"label\" [value]=\"'-'\"></rx-read-only-field>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}::ng-deep .d-icon-exclamation_triangle{display:none}::ng-deep .adapt-rx-uploader__restrict{display:none}::ng-deep .upload-status{display:none}::ng-deep .adapt-uploader-item{border-top:0;height:37px!important;border-bottom:0}::ng-deep .adapt-rx-uploader-file-attach-btn__wrp{max-width:100%}::ng-deep .adapt-rx-uploader-attach-btn{overflow:hidden;text-overflow:ellipsis;max-width:100%}::ng-deep .adapt-uploader-file{margin-left:0;padding-bottom:10px;padding-left:0!important;flex:auto;height:100%;border-bottom:1px solid #f0f1f1}::ng-deep .adapt-uploader-status{margin-right:20px;width:15px;border-bottom:1px solid #f0f1f1}::ng-deep .attachment-disabled .adapt-uploader-list-files-zone__header{margin:0;display:none}::ng-deep .attachment-disabled .empty-state{display:none}::ng-deep .attachment-disabled .empty-state__container{margin:0;padding:0}::ng-deep .attachment-disabled .empty-state__label{margin-top:0;text-align:left}\n"], components: [{ type: i1.AdaptDownloaderComponent, selector: "adapt-downloader", inputs: ["config", "icons", "width"], outputs: ["downloadLinkPressed"] }, { type: i1.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i2.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-attachment-field',
                    styleUrls: ['./attachment-field.scss'],
                    templateUrl: './attachment-field.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=attachment-field.component.js.map