import { NgModule } from '@angular/core';
import { AdaptBusyModule } from '@bmc-ux/adapt-angular';
import { RxBusyIndicatorComponent } from './busy-indicator.component';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class RxBusyIndicatorModule {
}
RxBusyIndicatorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBusyIndicatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxBusyIndicatorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBusyIndicatorModule, declarations: [RxBusyIndicatorComponent], imports: [CommonModule, i1.AdaptBusyModule], exports: [RxBusyIndicatorComponent] });
RxBusyIndicatorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBusyIndicatorModule, imports: [[CommonModule, AdaptBusyModule.forRoot()]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBusyIndicatorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptBusyModule.forRoot()],
                    declarations: [RxBusyIndicatorComponent],
                    exports: [RxBusyIndicatorComponent]
                }]
        }] });
//# sourceMappingURL=busy-indicator.module.js.map