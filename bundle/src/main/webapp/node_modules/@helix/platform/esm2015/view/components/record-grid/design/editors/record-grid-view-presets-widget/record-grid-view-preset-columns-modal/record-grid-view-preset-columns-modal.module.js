import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import { StepperWithUnitsFormControlModule } from '@helix/platform/shared/components';
import { RecordGridViewPresetColumnsModalComponent } from './record-grid-view-preset-columns-modal.component';
import { AdaptAccordionModule, AdaptButtonModule, AdaptRxCheckboxModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class RecordGridViewPresetColumnsModalModule {
}
RecordGridViewPresetColumnsModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridViewPresetColumnsModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordGridViewPresetColumnsModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridViewPresetColumnsModalModule, declarations: [RecordGridViewPresetColumnsModalComponent], imports: [AdaptAccordionModule,
        AdaptButtonModule,
        AdaptRxCheckboxModule,
        AdaptRxTextfieldModule,
        CommonModule,
        DragDropModule,
        FormsModule,
        StepperWithUnitsFormControlModule,
        TranslateModule], exports: [RecordGridViewPresetColumnsModalComponent] });
RecordGridViewPresetColumnsModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridViewPresetColumnsModalModule, imports: [[
            AdaptAccordionModule,
            AdaptButtonModule,
            AdaptRxCheckboxModule,
            AdaptRxTextfieldModule,
            CommonModule,
            DragDropModule,
            FormsModule,
            StepperWithUnitsFormControlModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridViewPresetColumnsModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RecordGridViewPresetColumnsModalComponent],
                    exports: [RecordGridViewPresetColumnsModalComponent],
                    imports: [
                        AdaptAccordionModule,
                        AdaptButtonModule,
                        AdaptRxCheckboxModule,
                        AdaptRxTextfieldModule,
                        CommonModule,
                        DragDropModule,
                        FormsModule,
                        StepperWithUnitsFormControlModule,
                        TranslateModule
                    ]
                }]
        }] });
//# sourceMappingURL=record-grid-view-preset-columns-modal.module.js.map