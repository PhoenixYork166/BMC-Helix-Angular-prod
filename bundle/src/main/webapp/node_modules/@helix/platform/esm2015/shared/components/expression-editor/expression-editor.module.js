import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptButtonModule, AdaptHighlightModule, AdaptIconModule, AdaptModalModule, AdaptPopoverModule, AdaptRxFeedbackModule, AdaptTooltipModule, AdaptTreeModule } from '@bmc-ux/adapt-angular';
import { AdaptSearchModule, AdaptTypeaheadSubModule } from '@bmc-ux/obsolete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { ExpressionEditorComponent } from './expression-editor.component';
import { RichExpressionEditorComponent } from './rich-expression-editor/rich-expression-editor.component';
import { DataDictionaryComponent } from './data-dictionary/data-dictionary.component';
import { DataDictionaryNodeComponent } from './data-dictionary-node/data-dictionary-node.component';
import { RxDataDictionaryItemPluginService } from './data-dictionary-item-plugin.service';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "./data-dictionary-item-plugin.service";
export class ExpressionEditorModule {
    constructor(rxDataDictionaryItemPluginService) { }
}
ExpressionEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionEditorModule, deps: [{ token: i1.RxDataDictionaryItemPluginService }], target: i0.ɵɵFactoryTarget.NgModule });
ExpressionEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionEditorModule, declarations: [ExpressionEditorComponent,
        RichExpressionEditorComponent,
        DataDictionaryComponent,
        DataDictionaryNodeComponent], imports: [CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AdaptButtonModule,
        AdaptHighlightModule,
        AdaptIconModule,
        AdaptModalModule,
        AdaptSearchModule,
        CKEditorModule,
        AdaptTooltipModule,
        AdaptTreeModule,
        AdaptPopoverModule,
        AdaptRxFeedbackModule,
        AdaptTypeaheadSubModule,
        TranslateModule], exports: [ExpressionEditorComponent] });
ExpressionEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionEditorModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            FormsModule,
            AdaptButtonModule,
            AdaptHighlightModule,
            AdaptIconModule,
            AdaptModalModule,
            AdaptSearchModule,
            CKEditorModule,
            AdaptTooltipModule,
            AdaptTreeModule,
            AdaptPopoverModule,
            AdaptRxFeedbackModule,
            AdaptTypeaheadSubModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ExpressionEditorComponent,
                        RichExpressionEditorComponent,
                        DataDictionaryComponent,
                        DataDictionaryNodeComponent
                    ],
                    exports: [ExpressionEditorComponent],
                    entryComponents: [ExpressionEditorComponent],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormsModule,
                        AdaptButtonModule,
                        AdaptHighlightModule,
                        AdaptIconModule,
                        AdaptModalModule,
                        AdaptSearchModule,
                        CKEditorModule,
                        AdaptTooltipModule,
                        AdaptTreeModule,
                        AdaptPopoverModule,
                        AdaptRxFeedbackModule,
                        AdaptTypeaheadSubModule,
                        TranslateModule
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDataDictionaryItemPluginService }]; } });
//# sourceMappingURL=expression-editor.module.js.map