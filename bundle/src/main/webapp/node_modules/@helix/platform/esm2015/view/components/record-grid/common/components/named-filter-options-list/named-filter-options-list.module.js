import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxNamedFilterOptionsListComponent } from './named-filter-options-list.component';
import { AdaptRxCheckboxModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class RxNamedFilterOptionsListModule {
}
RxNamedFilterOptionsListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedFilterOptionsListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxNamedFilterOptionsListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedFilterOptionsListModule, declarations: [RxNamedFilterOptionsListComponent], imports: [CommonModule, AdaptRxCheckboxModule, FormsModule], exports: [RxNamedFilterOptionsListComponent] });
RxNamedFilterOptionsListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedFilterOptionsListModule, imports: [[CommonModule, AdaptRxCheckboxModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedFilterOptionsListModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxNamedFilterOptionsListComponent],
                    exports: [RxNamedFilterOptionsListComponent],
                    imports: [CommonModule, AdaptRxCheckboxModule, FormsModule]
                }]
        }] });
//# sourceMappingURL=named-filter-options-list.module.js.map