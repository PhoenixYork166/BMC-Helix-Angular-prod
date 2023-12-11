import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxAdvancedFilteringFieldsProviderComponent } from './advanced-filtering-fields-provider.component';
import { RxStringFilterModule } from '../string-filter/string-filter.module';
import { RxNumberFilterModule } from '../number-filter/number-filter.module';
import { RxDateTimeRangeFilterModule } from '../date-time-range-filter/date-time-range-filter.module';
import { RxSelectionFilterModule } from '../selection-filter/selection-filter.module';
import { RxBooleanFilterModule } from '../boolean-filter/boolean-filter.module';
import { RxStringWithTypeAheadFilterModule } from '../string-with-type-ahead-filter/string-with-type-ahead-filter.module';
import * as i0 from "@angular/core";
export class RxAdvancedFilteringFieldsProviderModule {
}
RxAdvancedFilteringFieldsProviderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdvancedFilteringFieldsProviderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxAdvancedFilteringFieldsProviderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdvancedFilteringFieldsProviderModule, declarations: [RxAdvancedFilteringFieldsProviderComponent], imports: [CommonModule,
        RxStringFilterModule,
        RxNumberFilterModule,
        RxDateTimeRangeFilterModule,
        RxSelectionFilterModule,
        RxBooleanFilterModule,
        RxStringWithTypeAheadFilterModule], exports: [RxAdvancedFilteringFieldsProviderComponent] });
RxAdvancedFilteringFieldsProviderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdvancedFilteringFieldsProviderModule, imports: [[
            CommonModule,
            RxStringFilterModule,
            RxNumberFilterModule,
            RxDateTimeRangeFilterModule,
            RxSelectionFilterModule,
            RxBooleanFilterModule,
            RxStringWithTypeAheadFilterModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdvancedFilteringFieldsProviderModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxAdvancedFilteringFieldsProviderComponent],
                    exports: [RxAdvancedFilteringFieldsProviderComponent],
                    imports: [
                        CommonModule,
                        RxStringFilterModule,
                        RxNumberFilterModule,
                        RxDateTimeRangeFilterModule,
                        RxSelectionFilterModule,
                        RxBooleanFilterModule,
                        RxStringWithTypeAheadFilterModule
                    ]
                }]
        }] });
//# sourceMappingURL=advanced-filtering-fields-provider.module.js.map