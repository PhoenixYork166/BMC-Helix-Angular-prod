import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptAccordionModule, AdaptButtonModule, AdaptTagModule } from '@bmc-ux/adapt-angular';
import { RecordGridEditViewPresetsModalComponent } from './record-grid-edit-view-presets-modal.component';
import { RecordGridViewPresetColumnsModalModule } from '../record-grid-view-preset-columns-modal/record-grid-view-preset-columns-modal.module';
import { RecordGridSortEditorControlModule } from '../../record-grid-sort-editor-control/record-grid-sort-editor-control.module';
import { RecordGridFilterSelectControlModule } from '../../record-grid-filter-select-control/record-grid-filter-select-control.module';
import * as i0 from "@angular/core";
export class RecordGridEditViewPresetsModalModule {
}
RecordGridEditViewPresetsModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridEditViewPresetsModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordGridEditViewPresetsModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridEditViewPresetsModalModule, declarations: [RecordGridEditViewPresetsModalComponent], imports: [AdaptAccordionModule,
        AdaptButtonModule,
        AdaptTagModule,
        CommonModule,
        FormsModule,
        RecordGridFilterSelectControlModule,
        RecordGridSortEditorControlModule,
        RecordGridViewPresetColumnsModalModule,
        TranslateModule], exports: [RecordGridEditViewPresetsModalComponent] });
RecordGridEditViewPresetsModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridEditViewPresetsModalModule, imports: [[
            AdaptAccordionModule,
            AdaptButtonModule,
            AdaptTagModule,
            CommonModule,
            FormsModule,
            RecordGridFilterSelectControlModule,
            RecordGridSortEditorControlModule,
            RecordGridViewPresetColumnsModalModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridEditViewPresetsModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RecordGridEditViewPresetsModalComponent],
                    exports: [RecordGridEditViewPresetsModalComponent],
                    imports: [
                        AdaptAccordionModule,
                        AdaptButtonModule,
                        AdaptTagModule,
                        CommonModule,
                        FormsModule,
                        RecordGridFilterSelectControlModule,
                        RecordGridSortEditorControlModule,
                        RecordGridViewPresetColumnsModalModule,
                        TranslateModule
                    ]
                }]
        }] });
//# sourceMappingURL=record-grid-edit-view-presets-modal.module.js.map