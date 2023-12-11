import { RxExpressionEditorPluginService } from './expression-editor-plugin.service';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RichTextDefinitionAdapterService } from '../rich-text-definition-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "./rich-text-design.component";
import * as i2 from "@angular/common";
import * as i3 from "ckeditor4-angular";
import * as i4 from "@angular/forms";
export declare class RichTextDesignModule {
    private rxExpressionEditorPluginService;
    private rxDefinitionAdapterRegistryService;
    private richTextDefinitionAdapterService;
    constructor(rxExpressionEditorPluginService: RxExpressionEditorPluginService, rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, richTextDefinitionAdapterService: RichTextDefinitionAdapterService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTextDesignModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RichTextDesignModule, [typeof i1.RichTextDesignComponent], [typeof i2.CommonModule, typeof i3.CKEditorModule, typeof i4.ReactiveFormsModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RichTextDesignModule>;
}
