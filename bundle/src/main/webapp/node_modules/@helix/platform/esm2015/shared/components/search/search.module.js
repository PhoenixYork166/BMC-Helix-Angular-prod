import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdaptButtonModule, AdaptDropdownModule, AdaptHighlightModule, AdaptRxCheckboxModule, AdaptRxSearchModule } from '@bmc-ux/adapt-angular';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import { RxSearchComponent } from './search.component';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-table";
export class RxSearchModule {
}
RxSearchModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxSearchModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchModule, declarations: [RxSearchComponent], imports: [AdaptButtonModule,
        AdaptDropdownModule,
        AdaptHighlightModule,
        AdaptRxCheckboxModule,
        AdaptRxSearchModule, i1.AdaptTableModule, CommonModule,
        FormsModule,
        TranslateModule,
        RouterModule,
        RxDefinitionModule] });
RxSearchModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchModule, imports: [[
            AdaptButtonModule,
            AdaptDropdownModule,
            AdaptHighlightModule,
            AdaptRxCheckboxModule,
            AdaptRxSearchModule,
            AdaptTableModule.forRoot(),
            CommonModule,
            FormsModule,
            TranslateModule,
            RouterModule,
            RxDefinitionModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxSearchComponent],
                    imports: [
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        AdaptHighlightModule,
                        AdaptRxCheckboxModule,
                        AdaptRxSearchModule,
                        AdaptTableModule.forRoot(),
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        RouterModule,
                        RxDefinitionModule
                    ]
                }]
        }] });
//# sourceMappingURL=search.module.js.map