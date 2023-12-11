import { NgModule } from '@angular/core';
import { FilterTagsComponent } from './filter-tags.component';
import { CommonModule } from '@angular/common';
import { AdaptDropdownModule, AdaptTagModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class RxFilterTagsModule {
}
RxFilterTagsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFilterTagsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxFilterTagsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFilterTagsModule, declarations: [FilterTagsComponent], imports: [CommonModule, AdaptTagModule, AdaptDropdownModule, TranslateModule], exports: [FilterTagsComponent] });
RxFilterTagsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFilterTagsModule, imports: [[CommonModule, AdaptTagModule, AdaptDropdownModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFilterTagsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptTagModule, AdaptDropdownModule, TranslateModule],
                    declarations: [FilterTagsComponent],
                    exports: [FilterTagsComponent]
                }]
        }] });
//# sourceMappingURL=filter-tags.module.js.map