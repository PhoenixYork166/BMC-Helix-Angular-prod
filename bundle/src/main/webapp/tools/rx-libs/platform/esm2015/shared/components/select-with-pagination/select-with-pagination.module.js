import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxSelectWithPaginationComponent } from './select-with-pagination.component';
import { AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class RxSelectWithPaginationModule {
}
RxSelectWithPaginationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectWithPaginationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxSelectWithPaginationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectWithPaginationModule, declarations: [RxSelectWithPaginationComponent], imports: [AdaptRxSelectModule, FormsModule, TranslateModule, CommonModule], exports: [RxSelectWithPaginationComponent] });
RxSelectWithPaginationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectWithPaginationModule, imports: [[AdaptRxSelectModule, FormsModule, TranslateModule, CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectWithPaginationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AdaptRxSelectModule, FormsModule, TranslateModule, CommonModule],
                    exports: [RxSelectWithPaginationComponent],
                    declarations: [RxSelectWithPaginationComponent]
                }]
        }] });
//# sourceMappingURL=select-with-pagination.module.js.map