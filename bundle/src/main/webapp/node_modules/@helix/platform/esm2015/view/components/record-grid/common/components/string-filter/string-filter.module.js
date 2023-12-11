import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxNamedFilterOptionsListModule } from '../named-filter-options-list/named-filter-options-list.module';
import { FormsModule } from '@angular/forms';
import { RxStringFilterComponent } from './string-filter.component';
import { AdaptMetatagModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class RxStringFilterModule {
}
RxStringFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxStringFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringFilterModule, declarations: [RxStringFilterComponent], imports: [CommonModule, FormsModule, RxNamedFilterOptionsListModule, AdaptMetatagModule], exports: [RxStringFilterComponent] });
RxStringFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringFilterModule, imports: [[CommonModule, FormsModule, RxNamedFilterOptionsListModule, AdaptMetatagModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxStringFilterComponent],
                    exports: [RxStringFilterComponent],
                    imports: [CommonModule, FormsModule, RxNamedFilterOptionsListModule, AdaptMetatagModule]
                }]
        }] });
//# sourceMappingURL=string-filter.module.js.map