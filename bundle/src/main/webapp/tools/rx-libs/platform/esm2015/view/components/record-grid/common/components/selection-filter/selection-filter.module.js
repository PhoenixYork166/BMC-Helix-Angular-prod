import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxSelectionFilterComponent } from './selection-filter.component';
import { RxNamedFilterOptionsListModule } from '../named-filter-options-list/named-filter-options-list.module';
import { AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class RxSelectionFilterModule {
}
RxSelectionFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxSelectionFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFilterModule, declarations: [RxSelectionFilterComponent], imports: [CommonModule, FormsModule, RxNamedFilterOptionsListModule, AdaptRxSelectModule], exports: [RxSelectionFilterComponent] });
RxSelectionFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFilterModule, imports: [[CommonModule, FormsModule, RxNamedFilterOptionsListModule, AdaptRxSelectModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxSelectionFilterComponent],
                    exports: [RxSelectionFilterComponent],
                    imports: [CommonModule, FormsModule, RxNamedFilterOptionsListModule, AdaptRxSelectModule]
                }]
        }] });
//# sourceMappingURL=selection-filter.module.js.map