import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RichTextDefinitionAdapterService } from '../rich-text-definition-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "./rich-text.component";
import * as i2 from "@angular/common";
import * as i3 from "ckeditor4-angular";
export declare class RichTextModule {
    private rxDefinitionAdapterRegistryService;
    private richTextDefinitionAdapterService;
    constructor(rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, richTextDefinitionAdapterService: RichTextDefinitionAdapterService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTextModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RichTextModule, [typeof i1.RichTextComponent], [typeof i2.CommonModule, typeof i3.CKEditorModule], [typeof i1.RichTextComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RichTextModule>;
}
