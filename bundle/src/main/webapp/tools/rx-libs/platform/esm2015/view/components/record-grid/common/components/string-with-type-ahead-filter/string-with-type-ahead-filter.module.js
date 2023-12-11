import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxStringWithTypeAheadFilterComponent } from './string-with-type-ahead-filter.component';
import { RxNamedFilterOptionsListModule } from '../named-filter-options-list/named-filter-options-list.module';
import { AdaptMetatagModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class RxStringWithTypeAheadFilterModule {
}
RxStringWithTypeAheadFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringWithTypeAheadFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxStringWithTypeAheadFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringWithTypeAheadFilterModule, declarations: [RxStringWithTypeAheadFilterComponent], imports: [CommonModule, RxNamedFilterOptionsListModule, AdaptMetatagModule, FormsModule, TranslateModule], exports: [RxStringWithTypeAheadFilterComponent] });
RxStringWithTypeAheadFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringWithTypeAheadFilterModule, imports: [[CommonModule, RxNamedFilterOptionsListModule, AdaptMetatagModule, FormsModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringWithTypeAheadFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxStringWithTypeAheadFilterComponent],
                    exports: [RxStringWithTypeAheadFilterComponent],
                    imports: [CommonModule, RxNamedFilterOptionsListModule, AdaptMetatagModule, FormsModule, TranslateModule]
                }]
        }] });
//# sourceMappingURL=string-with-type-ahead-filter.module.js.map