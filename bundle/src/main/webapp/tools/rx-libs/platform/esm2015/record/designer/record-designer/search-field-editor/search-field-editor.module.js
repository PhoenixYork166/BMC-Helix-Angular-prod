import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RxModalModule } from '@helix/platform/ui-kit';
import { AdaptAccordionModule, AdaptButtonModule, AdaptEmptyStateModule, AdaptRxFormControlModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptTooltipModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SearchFieldEditorControlComponent } from './search-field-editor-control.component';
import { SearchFieldEditorModalComponent } from './search-field-editor-modal.component';
import * as i0 from "@angular/core";
export class SearchFieldEditorModule {
}
SearchFieldEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SearchFieldEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModule, declarations: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent], imports: [CommonModule,
        AdaptTooltipModule,
        AdaptRxSelectModule,
        AdaptButtonModule,
        AdaptRxFormControlModule,
        AdaptRxTextfieldModule,
        AdaptAccordionModule,
        RxModalModule,
        ReactiveFormsModule,
        TranslateModule,
        AdaptEmptyStateModule], exports: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent] });
SearchFieldEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModule, imports: [[
            CommonModule,
            AdaptTooltipModule,
            AdaptRxSelectModule,
            AdaptButtonModule,
            AdaptRxFormControlModule,
            AdaptRxTextfieldModule,
            AdaptAccordionModule,
            RxModalModule,
            ReactiveFormsModule,
            TranslateModule,
            AdaptEmptyStateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent],
                    exports: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent],
                    entryComponents: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent],
                    imports: [
                        CommonModule,
                        AdaptTooltipModule,
                        AdaptRxSelectModule,
                        AdaptButtonModule,
                        AdaptRxFormControlModule,
                        AdaptRxTextfieldModule,
                        AdaptAccordionModule,
                        RxModalModule,
                        ReactiveFormsModule,
                        TranslateModule,
                        AdaptEmptyStateModule
                    ]
                }]
        }] });
//# sourceMappingURL=search-field-editor.module.js.map