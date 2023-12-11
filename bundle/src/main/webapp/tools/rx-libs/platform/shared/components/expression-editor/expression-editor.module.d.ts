import { RxDataDictionaryItemPluginService } from './data-dictionary-item-plugin.service';
import * as i0 from "@angular/core";
import * as i1 from "./expression-editor.component";
import * as i2 from "./rich-expression-editor/rich-expression-editor.component";
import * as i3 from "./data-dictionary/data-dictionary.component";
import * as i4 from "./data-dictionary-node/data-dictionary-node.component";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@bmc-ux/obsolete";
import * as i9 from "ckeditor4-angular";
import * as i10 from "@ngx-translate/core";
export declare class ExpressionEditorModule {
    constructor(rxDataDictionaryItemPluginService: RxDataDictionaryItemPluginService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpressionEditorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ExpressionEditorModule, [typeof i1.ExpressionEditorComponent, typeof i2.RichExpressionEditorComponent, typeof i3.DataDictionaryComponent, typeof i4.DataDictionaryNodeComponent], [typeof i5.CommonModule, typeof i6.ReactiveFormsModule, typeof i6.FormsModule, typeof i7.AdaptButtonModule, typeof i7.AdaptHighlightModule, typeof i7.AdaptIconModule, typeof i7.AdaptModalModule, typeof i8.AdaptSearchModule, typeof i9.CKEditorModule, typeof i7.AdaptTooltipModule, typeof i7.AdaptTreeModule, typeof i7.AdaptPopoverModule, typeof i7.AdaptRxFeedbackModule, typeof i8.AdaptTypeaheadSubModule, typeof i10.TranslateModule], [typeof i1.ExpressionEditorComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ExpressionEditorModule>;
}
