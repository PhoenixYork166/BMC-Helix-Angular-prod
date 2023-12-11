import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxBooleanFilterComponent } from './boolean-filter.component';
import { RxNamedFilterOptionsListModule } from '../named-filter-options-list/named-filter-options-list.module';
import { AdaptRxRadiobuttonModule, AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class RxBooleanFilterModule {
}
RxBooleanFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxBooleanFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanFilterModule, declarations: [RxBooleanFilterComponent], imports: [CommonModule, RxNamedFilterOptionsListModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, FormsModule], exports: [RxBooleanFilterComponent] });
RxBooleanFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanFilterModule, imports: [[CommonModule, RxNamedFilterOptionsListModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxBooleanFilterComponent],
                    exports: [RxBooleanFilterComponent],
                    imports: [CommonModule, RxNamedFilterOptionsListModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, FormsModule]
                }]
        }] });
//# sourceMappingURL=boolean-filter.module.js.map