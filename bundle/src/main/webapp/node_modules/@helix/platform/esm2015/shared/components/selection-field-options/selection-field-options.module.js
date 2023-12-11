import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptAlertModule, AdaptButtonModule, AdaptRxCounterModule, AdaptRxLabelModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptRxValidatorsModule, AdaptTagModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SelectionFieldOptionsEditorComponent } from './selection-field-options-editor.component';
import { SelectionFieldOptionsComponent } from './selection-field-options.component';
import * as i0 from "@angular/core";
export class RxSelectionFieldOptionsModule {
}
RxSelectionFieldOptionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFieldOptionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxSelectionFieldOptionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFieldOptionsModule, declarations: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent], imports: [AdaptAccordionModule,
        AdaptButtonModule,
        AdaptRxCounterModule,
        AdaptRxLabelModule,
        AdaptRxSelectModule,
        AdaptRxTextfieldModule,
        AdaptTagModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        AdaptAlertModule,
        AdaptRxValidatorsModule], exports: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent] });
RxSelectionFieldOptionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFieldOptionsModule, imports: [[
            AdaptAccordionModule,
            AdaptButtonModule,
            AdaptRxCounterModule,
            AdaptRxLabelModule,
            AdaptRxSelectModule,
            AdaptRxTextfieldModule,
            AdaptTagModule,
            CommonModule,
            FormsModule,
            TranslateModule,
            AdaptAlertModule,
            AdaptRxValidatorsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFieldOptionsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptAccordionModule,
                        AdaptButtonModule,
                        AdaptRxCounterModule,
                        AdaptRxLabelModule,
                        AdaptRxSelectModule,
                        AdaptRxTextfieldModule,
                        AdaptTagModule,
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        AdaptAlertModule,
                        AdaptRxValidatorsModule
                    ],
                    declarations: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent],
                    exports: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent],
                    entryComponents: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent]
                }]
        }] });
//# sourceMappingURL=selection-field-options.module.js.map