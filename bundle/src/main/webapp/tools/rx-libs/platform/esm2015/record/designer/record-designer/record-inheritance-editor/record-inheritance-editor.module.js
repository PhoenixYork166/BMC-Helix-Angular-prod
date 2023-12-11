import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptIconModule, AdaptPopoverModule, AdaptRxCheckboxModule, AdaptRxSelectModule, AdaptTooltipModule } from '@bmc-ux/adapt-angular';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { AdaptCheckbox2Module } from '@bmc-ux/obsolete';
import { TranslateModule } from '@ngx-translate/core';
import { RecordInheritanceEditorComponent } from './record-inheritance-editor.component';
import { RxDefinitionPickerModule } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
export class RecordInheritanceEditorModule {
}
RecordInheritanceEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInheritanceEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordInheritanceEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInheritanceEditorModule, declarations: [RecordInheritanceEditorComponent], imports: [CommonModule,
        FormsModule,
        AdaptTooltipModule,
        AdaptRxSelectModule,
        AdaptButtonModule,
        AdaptCheckbox2Module,
        AdaptPopoverModule,
        AdaptIconModule,
        AdaptRxCheckboxModule,
        ReactiveFormsModule,
        TranslateModule,
        AdaptTableModule,
        RxDefinitionPickerModule], exports: [RecordInheritanceEditorComponent] });
RecordInheritanceEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInheritanceEditorModule, imports: [[
            CommonModule,
            FormsModule,
            AdaptTooltipModule,
            AdaptRxSelectModule,
            AdaptButtonModule,
            AdaptCheckbox2Module,
            AdaptPopoverModule,
            AdaptIconModule,
            AdaptRxCheckboxModule,
            ReactiveFormsModule,
            TranslateModule,
            AdaptTableModule,
            RxDefinitionPickerModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInheritanceEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RecordInheritanceEditorComponent],
                    exports: [RecordInheritanceEditorComponent],
                    entryComponents: [RecordInheritanceEditorComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        AdaptTooltipModule,
                        AdaptRxSelectModule,
                        AdaptButtonModule,
                        AdaptCheckbox2Module,
                        AdaptPopoverModule,
                        AdaptIconModule,
                        AdaptRxCheckboxModule,
                        ReactiveFormsModule,
                        TranslateModule,
                        AdaptTableModule,
                        RxDefinitionPickerModule
                    ]
                }]
        }] });
//# sourceMappingURL=record-inheritance-editor.module.js.map