import { Component, Input } from '@angular/core';
import { AttachmentFieldDesignModel } from './attachment-field-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
export class AttachmentFieldDesignComponent {
}
AttachmentFieldDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AttachmentFieldDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AttachmentFieldDesignComponent, selector: "rx-attachment-field-design", inputs: { model: "model" }, ngImport: i0, template: "<adapt-rx-uploader\n  class=\"rx-pointer-events-none\"\n  [required]=\"model.isRequired$ | async\"\n  [ngModel]=\"[]\"\n  [disabled]=\"true\"\n  [label]=\"model.label$ | async\"\n></adapt-rx-uploader>\n", styles: ["adapt-rx-uploader ::ng-deep .adapt-rx-uploader__restrict{display:none}\n"], components: [{ type: i1.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-attachment-field-design',
                    templateUrl: './attachment-field-design.component.html',
                    styleUrls: ['./attachment-field-design.component.scss']
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=attachment-field-design.component.js.map