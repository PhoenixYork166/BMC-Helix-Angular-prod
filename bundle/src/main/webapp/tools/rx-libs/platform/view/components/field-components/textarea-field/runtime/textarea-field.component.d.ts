import { Injector } from '@angular/core';
import { IViewComponent } from '@helix/platform/view/runtime';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import { IBaseRecordEditorFieldComponentConfig } from '../../base-record-editor-field/runtime/base-record-editor-field-component.types';
import { RxFieldDefinitionService } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
export declare class TextareaFieldComponent extends BaseRecordEditorFieldComponent implements IViewComponent {
    private rxFieldDefinitionService;
    maxLength: number;
    constructor(injector: Injector, rxFieldDefinitionService: RxFieldDefinitionService);
    onConfigInitialized(config: IBaseRecordEditorFieldComponentConfig): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextareaFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextareaFieldComponent, "rx-textarea-field", never, {}, {}, never, never>;
}
