import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxNumberFilterComponent } from './number-filter.component';
import { RxNamedFilterOptionsListModule } from '../named-filter-options-list/named-filter-options-list.module';
import { AdaptRxCounterModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class RxNumberFilterModule {
}
RxNumberFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumberFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxNumberFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumberFilterModule, declarations: [RxNumberFilterComponent], imports: [CommonModule, FormsModule, RxNamedFilterOptionsListModule, AdaptRxCounterModule], exports: [RxNumberFilterComponent] });
RxNumberFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumberFilterModule, imports: [[CommonModule, FormsModule, RxNamedFilterOptionsListModule, AdaptRxCounterModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumberFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxNumberFilterComponent],
                    exports: [RxNumberFilterComponent],
                    imports: [CommonModule, FormsModule, RxNamedFilterOptionsListModule, AdaptRxCounterModule]
                }]
        }] });
//# sourceMappingURL=number-filter.module.js.map