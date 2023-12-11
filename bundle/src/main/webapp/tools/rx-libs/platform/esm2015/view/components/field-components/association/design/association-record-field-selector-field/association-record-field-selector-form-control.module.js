import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptIconModule } from '@bmc-ux/adapt-angular';
import { AssociationRecordFieldSelectorFormControlComponent } from './association-record-field-selector-form-control.component';
import { AssociationRecordFieldSelectorEditorDialogModule } from './association-record-field-selector-editor-dialog/association-record-field-selector-editor-dialog.module';
import * as i0 from "@angular/core";
export class AssociationRecordFieldSelectorFormControlModule {
}
AssociationRecordFieldSelectorFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRecordFieldSelectorFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AssociationRecordFieldSelectorFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRecordFieldSelectorFormControlModule, declarations: [AssociationRecordFieldSelectorFormControlComponent], imports: [CommonModule,
        FormsModule,
        AdaptButtonModule,
        AdaptIconModule,
        AssociationRecordFieldSelectorEditorDialogModule], exports: [AssociationRecordFieldSelectorFormControlComponent] });
AssociationRecordFieldSelectorFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRecordFieldSelectorFormControlModule, imports: [[
            CommonModule,
            FormsModule,
            AdaptButtonModule,
            AdaptIconModule,
            AssociationRecordFieldSelectorEditorDialogModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRecordFieldSelectorFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AssociationRecordFieldSelectorFormControlComponent],
                    exports: [AssociationRecordFieldSelectorFormControlComponent],
                    entryComponents: [AssociationRecordFieldSelectorFormControlComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        AdaptButtonModule,
                        AdaptIconModule,
                        AssociationRecordFieldSelectorEditorDialogModule
                    ]
                }]
        }] });
//# sourceMappingURL=association-record-field-selector-form-control.module.js.map