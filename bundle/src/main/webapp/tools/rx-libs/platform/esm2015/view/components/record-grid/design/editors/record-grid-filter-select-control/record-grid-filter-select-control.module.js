import { NgModule } from '@angular/core';
import { RecordGridFilterSelectControlComponent } from './record-grid-filter-select-control.component';
import { AdaptAccordionModule, AdaptAdvancedFilteringModule, AdaptRxRadiobuttonModule } from '@bmc-ux/adapt-angular';
import { RecordGridCommonModule } from '../../../common/record-grid-common.module';
import { FormsModule } from '@angular/forms';
import { RxAdvancedFilteringFieldsProviderModule } from '../../../common/components/advanced-filtering-fields-provider/advanced-filtering-fields-provider.module';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class RecordGridFilterSelectControlModule {
}
RecordGridFilterSelectControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridFilterSelectControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordGridFilterSelectControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridFilterSelectControlModule, declarations: [RecordGridFilterSelectControlComponent], imports: [CommonModule,
        AdaptAdvancedFilteringModule,
        RecordGridCommonModule,
        AdaptAccordionModule,
        AdaptRxRadiobuttonModule,
        FormsModule,
        RxAdvancedFilteringFieldsProviderModule], exports: [RecordGridFilterSelectControlComponent] });
RecordGridFilterSelectControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridFilterSelectControlModule, imports: [[
            CommonModule,
            AdaptAdvancedFilteringModule,
            RecordGridCommonModule,
            AdaptAccordionModule,
            AdaptRxRadiobuttonModule,
            FormsModule,
            RxAdvancedFilteringFieldsProviderModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridFilterSelectControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RecordGridFilterSelectControlComponent],
                    exports: [RecordGridFilterSelectControlComponent],
                    entryComponents: [RecordGridFilterSelectControlComponent],
                    imports: [
                        CommonModule,
                        AdaptAdvancedFilteringModule,
                        RecordGridCommonModule,
                        AdaptAccordionModule,
                        AdaptRxRadiobuttonModule,
                        FormsModule,
                        RxAdvancedFilteringFieldsProviderModule
                    ]
                }]
        }] });
//# sourceMappingURL=record-grid-filter-select-control.module.js.map