import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxDateTimeRangeFilterComponent } from './date-time-range-filter.component';
import { RxNamedFilterOptionsListModule } from '../named-filter-options-list/named-filter-options-list.module';
import { AdaptRxDatetimeModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class RxDateTimeRangeFilterModule {
}
RxDateTimeRangeFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateTimeRangeFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxDateTimeRangeFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateTimeRangeFilterModule, declarations: [RxDateTimeRangeFilterComponent], imports: [CommonModule, FormsModule, RxNamedFilterOptionsListModule, AdaptRxDatetimeModule], exports: [RxDateTimeRangeFilterComponent] });
RxDateTimeRangeFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateTimeRangeFilterModule, imports: [[CommonModule, FormsModule, RxNamedFilterOptionsListModule, AdaptRxDatetimeModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateTimeRangeFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxDateTimeRangeFilterComponent],
                    exports: [RxDateTimeRangeFilterComponent],
                    imports: [CommonModule, FormsModule, RxNamedFilterOptionsListModule, AdaptRxDatetimeModule]
                }]
        }] });
//# sourceMappingURL=date-time-range-filter.module.js.map