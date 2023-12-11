import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptDropdownModule, AdaptMetatagModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, AdaptTagModule } from '@bmc-ux/adapt-angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RxFilterTagsModule } from './components/filter-tags/filter-tags.module';
import { RxNamedFilterOptionsListModule } from './components/named-filter-options-list/named-filter-options-list.module';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class RecordGridCommonModule {
}
RecordGridCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordGridCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridCommonModule, imports: [CommonModule,
        AdaptRxRadiobuttonModule,
        AdaptRxSelectModule,
        TranslateModule,
        AdaptTagModule,
        FormsModule, i1.AdaptDropdownModule, AdaptMetatagModule,
        RxNamedFilterOptionsListModule,
        RxFilterTagsModule], exports: [RxFilterTagsModule, RxNamedFilterOptionsListModule] });
RecordGridCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridCommonModule, imports: [[
            CommonModule,
            AdaptRxRadiobuttonModule,
            AdaptRxSelectModule,
            TranslateModule,
            AdaptTagModule,
            FormsModule,
            AdaptDropdownModule.forRoot(),
            AdaptMetatagModule,
            RxNamedFilterOptionsListModule,
            RxFilterTagsModule
        ], RxFilterTagsModule, RxNamedFilterOptionsListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AdaptRxRadiobuttonModule,
                        AdaptRxSelectModule,
                        TranslateModule,
                        AdaptTagModule,
                        FormsModule,
                        AdaptDropdownModule.forRoot(),
                        AdaptMetatagModule,
                        RxNamedFilterOptionsListModule,
                        RxFilterTagsModule
                    ],
                    exports: [RxFilterTagsModule, RxNamedFilterOptionsListModule]
                }]
        }] });
//# sourceMappingURL=record-grid-common.module.js.map