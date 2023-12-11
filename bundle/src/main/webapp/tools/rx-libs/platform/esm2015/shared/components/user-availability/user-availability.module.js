import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxUserAvailabilityComponent } from './user-availability.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxCheckboxModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class RxUserAvailabilityModule {
}
RxUserAvailabilityModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserAvailabilityModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxUserAvailabilityModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserAvailabilityModule, declarations: [RxUserAvailabilityComponent], imports: [CommonModule, TranslateModule, FormsModule, AdaptRxCheckboxModule] });
RxUserAvailabilityModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserAvailabilityModule, imports: [[CommonModule, TranslateModule, FormsModule, AdaptRxCheckboxModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserAvailabilityModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxUserAvailabilityComponent],
                    imports: [CommonModule, TranslateModule, FormsModule, AdaptRxCheckboxModule],
                    entryComponents: [RxUserAvailabilityComponent]
                }]
        }] });
//# sourceMappingURL=user-availability.module.js.map