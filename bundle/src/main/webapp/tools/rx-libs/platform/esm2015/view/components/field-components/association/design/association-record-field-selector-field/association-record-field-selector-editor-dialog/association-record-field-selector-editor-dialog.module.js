import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptButtonModule, AdaptEmptyStateModule, AdaptRxSearchModule, AdaptRxTextfieldModule, AdaptTreeModule } from '@bmc-ux/adapt-angular';
import { AssociationRecordFieldSelectorEditorDialogComponent } from './association-record-field-selector-editor-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class AssociationRecordFieldSelectorEditorDialogModule {
}
AssociationRecordFieldSelectorEditorDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRecordFieldSelectorEditorDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AssociationRecordFieldSelectorEditorDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRecordFieldSelectorEditorDialogModule, declarations: [AssociationRecordFieldSelectorEditorDialogComponent], imports: [CommonModule,
        AdaptRxSearchModule,
        AdaptButtonModule,
        AdaptAccordionModule,
        FormsModule,
        AdaptRxTextfieldModule,
        DragDropModule,
        AdaptTreeModule,
        AdaptEmptyStateModule,
        TranslateModule], exports: [AssociationRecordFieldSelectorEditorDialogComponent] });
AssociationRecordFieldSelectorEditorDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRecordFieldSelectorEditorDialogModule, imports: [[
            CommonModule,
            AdaptRxSearchModule,
            AdaptButtonModule,
            AdaptAccordionModule,
            FormsModule,
            AdaptRxTextfieldModule,
            DragDropModule,
            AdaptTreeModule,
            AdaptEmptyStateModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRecordFieldSelectorEditorDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AssociationRecordFieldSelectorEditorDialogComponent],
                    exports: [AssociationRecordFieldSelectorEditorDialogComponent],
                    entryComponents: [AssociationRecordFieldSelectorEditorDialogComponent],
                    imports: [
                        CommonModule,
                        AdaptRxSearchModule,
                        AdaptButtonModule,
                        AdaptAccordionModule,
                        FormsModule,
                        AdaptRxTextfieldModule,
                        DragDropModule,
                        AdaptTreeModule,
                        AdaptEmptyStateModule,
                        TranslateModule
                    ]
                }]
        }] });
//# sourceMappingURL=association-record-field-selector-editor-dialog.module.js.map