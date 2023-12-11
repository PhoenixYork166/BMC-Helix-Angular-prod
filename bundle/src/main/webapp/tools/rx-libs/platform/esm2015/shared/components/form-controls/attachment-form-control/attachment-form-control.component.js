import { Component, Input, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { saveAs } from 'file-saver';
import { map } from 'lodash';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
export class AttachmentFormControlComponent extends ValueAccessor {
    constructor(ngZone) {
        super();
        this.ngZone = ngZone;
        this.customDownload = this.downloadFile.bind(this);
    }
    ngOnInit() {
        if (!this.options.maxFileSize) {
            this.options.maxFileSize = Number.MAX_SAFE_INTEGER.toString();
        }
        if (!this.options.filesCount) {
            this.options.filesCount = '1';
        }
    }
    onModelChange(files) {
        this.value = files.length ? files.map((file) => file.data) : null;
    }
    onWriteValue(value) {
        this.fileObjects = map(value, (fileData) => {
            const defaultFileObject = {
                data: fileData,
                allowDeletion: true,
                inUploading: false,
                inDeleting: false,
                uploaded: 100,
                error: false,
                errorText: ''
            };
            const updatedFileObject = (this.fileObjects || []).find(({ data }) => data === fileData) || defaultFileObject;
            updatedFileObject.uploaded = 100;
            return updatedFileObject;
        });
    }
    downloadFile(fileObj) {
        this.ngZone.runOutsideAngular(() => {
            saveAs(fileObj.data, fileObj.data.name);
        });
    }
}
AttachmentFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFormControlComponent, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
AttachmentFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AttachmentFormControlComponent, selector: "rx-attachment-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AttachmentFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\">\n  <adapt-rx-uploader\n    [required]=\"options.required\"\n    [disabled]=\"isDisabled\"\n    (ngModelChange)=\"onModelChange($event)\"\n    [(ngModel)]=\"fileObjects\"\n    [label]=\"options.label\"\n    [filesCount]=\"options.filesCount\"\n    [maxFileSize]=\"options.maxFileSize\"\n    [enableCustomDownload]=\"true\"\n    [customDownload]=\"customDownload\"\n    [reusable]=\"true\"\n  ></adapt-rx-uploader>\n</div>\n", styles: [":host adapt-rx-uploader ::ng-deep .adapt-uploader-file-uploaded,:host adapt-rx-uploader ::ng-deep .adapt-rx-uploader__restrict{display:none}\n"], components: [{ type: i1.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-attachment-form-control',
                    templateUrl: './attachment-form-control.component.html',
                    styleUrls: ['./attachment-form-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: AttachmentFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });
//# sourceMappingURL=attachment-form-control.component.js.map