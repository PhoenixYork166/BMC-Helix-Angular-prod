import { CKEditor4 } from 'ckeditor4-angular';
import { RxCkEditorConfiguratorService } from '@helix/platform/view/api';
import { RichTextareaFieldDesignModel } from './rich-textarea-field-design.model';
import * as i0 from "@angular/core";
export declare class RichTextareaFieldDesignComponent {
    private rxCkEditorConfiguratorService;
    model: RichTextareaFieldDesignModel;
    ckEditorType: CKEditor4.EditorType;
    ckEditorConfig: any;
    constructor(rxCkEditorConfiguratorService: RxCkEditorConfiguratorService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTextareaFieldDesignComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RichTextareaFieldDesignComponent, "rx-rich-textarea-field-design", never, { "model": "model"; }, {}, never, never>;
}
