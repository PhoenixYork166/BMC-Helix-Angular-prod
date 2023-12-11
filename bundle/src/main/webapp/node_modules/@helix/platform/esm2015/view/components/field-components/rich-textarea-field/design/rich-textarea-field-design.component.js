import { Component, Input } from '@angular/core';
import { RxCkEditorConfiguratorService } from '@helix/platform/view/api';
import { RichTextareaFieldDesignModel } from './rich-textarea-field-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "ckeditor4-angular";
import * as i3 from "@angular/common";
export class RichTextareaFieldDesignComponent {
    constructor(rxCkEditorConfiguratorService) {
        this.rxCkEditorConfiguratorService = rxCkEditorConfiguratorService;
        this.ckEditorType = "divarea" /* DIVAREA */;
        this.ckEditorConfig = this.rxCkEditorConfiguratorService.getCKEditorConfig();
    }
}
RichTextareaFieldDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextareaFieldDesignComponent, deps: [{ token: i1.RxCkEditorConfiguratorService }], target: i0.ɵɵFactoryTarget.Component });
RichTextareaFieldDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RichTextareaFieldDesignComponent, selector: "rx-rich-textarea-field-design", inputs: { model: "model" }, ngImport: i0, template: "<div>\n  <strong>\n    {{ model.label$ | async }}\n    <span *ngIf=\"model.isRequired$ | async\" class=\"form-control-required\">(required)</span>\n  </strong>\n</div>\n\n<div class=\"mt-1\">\n  <ckeditor [type]=\"ckEditorType\" [config]=\"ckEditorConfig\" [readOnly]=\"true\"></ckeditor>\n</div>\n", styles: ["ckeditor ::ng-deep .cke_inner{box-shadow:none}\n"], components: [{ type: i2.CKEditorComponent, selector: "ckeditor", inputs: ["tagName", "type", "editorUrl", "data", "readOnly", "config"], outputs: ["ready", "dataReady", "change", "dataChange", "dragStart", "dragEnd", "drop", "fileUploadResponse", "fileUploadRequest", "focus", "paste", "afterPaste", "blur"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextareaFieldDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-rich-textarea-field-design',
                    templateUrl: './rich-textarea-field-design.component.html',
                    styleUrls: ['./rich-textarea-field-design.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCkEditorConfiguratorService }]; }, propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=rich-textarea-field-design.component.js.map