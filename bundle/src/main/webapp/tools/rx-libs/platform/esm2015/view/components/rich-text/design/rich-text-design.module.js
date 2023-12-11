import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextDesignComponent } from './rich-text-design.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RxExpressionEditorPluginService } from './expression-editor-plugin.service';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RichTextDefinitionAdapterService } from '../rich-text-definition-adapter.service';
import { RxViewComponentType } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./expression-editor-plugin.service";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "../rich-text-definition-adapter.service";
export class RichTextDesignModule {
    constructor(rxExpressionEditorPluginService, rxDefinitionAdapterRegistryService, richTextDefinitionAdapterService) {
        this.rxExpressionEditorPluginService = rxExpressionEditorPluginService;
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.richTextDefinitionAdapterService = richTextDefinitionAdapterService;
        rxDefinitionAdapterRegistryService.registerDesignAdapter(RxViewComponentType.RichText, this.richTextDefinitionAdapterService);
    }
}
RichTextDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextDesignModule, deps: [{ token: i1.RxExpressionEditorPluginService }, { token: i2.RxDefinitionAdapterRegistryService }, { token: i3.RichTextDefinitionAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
RichTextDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextDesignModule, declarations: [RichTextDesignComponent], imports: [CommonModule, CKEditorModule, ReactiveFormsModule] });
RichTextDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextDesignModule, imports: [[CommonModule, CKEditorModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RichTextDesignComponent],
                    entryComponents: [RichTextDesignComponent],
                    imports: [CommonModule, CKEditorModule, ReactiveFormsModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxExpressionEditorPluginService }, { type: i2.RxDefinitionAdapterRegistryService }, { type: i3.RichTextDefinitionAdapterService }]; } });
//# sourceMappingURL=rich-text-design.module.js.map