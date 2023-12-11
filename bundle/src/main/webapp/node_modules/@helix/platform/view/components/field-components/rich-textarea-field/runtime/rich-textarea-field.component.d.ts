import { Injector, OnInit } from '@angular/core';
import { RxCkEditorConfiguratorService } from '@helix/platform/view/api';
import { IViewComponent } from '@helix/platform/view/runtime';
import { CKEditor4 } from 'ckeditor4-angular';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import * as i0 from "@angular/core";
export declare class RichTextareaFieldComponent extends BaseRecordEditorFieldComponent implements IViewComponent, OnInit {
    private rxCkEditorConfiguratorService;
    ckEditorType: CKEditor4.EditorType;
    ckEditorConfig: any;
    constructor(injector: Injector, rxCkEditorConfiguratorService: RxCkEditorConfiguratorService);
    setFieldValue(value: any, options?: {
        markAsDirty?: boolean;
        markAsTouched?: boolean;
    }): void;
    onBlur(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTextareaFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RichTextareaFieldComponent, "rx-rich-textarea-field", never, {}, {}, never, never>;
}
