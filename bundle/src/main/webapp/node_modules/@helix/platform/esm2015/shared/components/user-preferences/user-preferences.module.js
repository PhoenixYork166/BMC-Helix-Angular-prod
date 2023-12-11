import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RxUserPreferencesComponent } from './user-preferences.component';
import { AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { RxLineLoaderModule } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export class RxUserPreferencesModule {
}
RxUserPreferencesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxUserPreferencesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesModule, declarations: [RxUserPreferencesComponent], imports: [CommonModule, FormsModule, TranslateModule, RxLineLoaderModule, AdaptRxSelectModule] });
RxUserPreferencesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesModule, imports: [[CommonModule, FormsModule, TranslateModule, RxLineLoaderModule, AdaptRxSelectModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, TranslateModule, RxLineLoaderModule, AdaptRxSelectModule],
                    declarations: [RxUserPreferencesComponent],
                    entryComponents: [RxUserPreferencesComponent]
                }]
        }] });
//# sourceMappingURL=user-preferences.module.js.map