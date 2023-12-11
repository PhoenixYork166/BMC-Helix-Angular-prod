import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextComponent } from './rich-text.component';
import { RxRichTextExpressionEvaluatorService } from './rich-text-expression-evaluator.service';
import { CKEditorModule } from 'ckeditor4-angular';
import { RxViewComponentType } from '@helix/platform/view/api';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RichTextDefinitionAdapterService } from '../rich-text-definition-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "../rich-text-definition-adapter.service";
export class RichTextModule {
    constructor(rxDefinitionAdapterRegistryService, richTextDefinitionAdapterService) {
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.richTextDefinitionAdapterService = richTextDefinitionAdapterService;
        rxDefinitionAdapterRegistryService.registerRuntimeAdapter(RxViewComponentType.RichText, this.richTextDefinitionAdapterService);
    }
}
RichTextModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextModule, deps: [{ token: i1.RxDefinitionAdapterRegistryService }, { token: i2.RichTextDefinitionAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
RichTextModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextModule, declarations: [RichTextComponent], imports: [CommonModule, CKEditorModule], exports: [RichTextComponent] });
RichTextModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextModule, providers: [RxRichTextExpressionEvaluatorService], imports: [[CommonModule, CKEditorModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RichTextComponent],
                    imports: [CommonModule, CKEditorModule],
                    exports: [RichTextComponent],
                    entryComponents: [RichTextComponent],
                    providers: [RxRichTextExpressionEvaluatorService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionAdapterRegistryService }, { type: i2.RichTextDefinitionAdapterService }]; } });
//# sourceMappingURL=rich-text.module.js.map