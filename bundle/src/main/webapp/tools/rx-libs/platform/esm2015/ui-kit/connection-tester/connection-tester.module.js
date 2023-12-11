import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptAlertModule, AdaptBusyModule, AdaptButtonModule } from '@bmc-ux/adapt-angular';
import { RxConnectionTesterComponent } from './connection-tester.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class RxConnectionTesterModule {
}
RxConnectionTesterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionTesterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxConnectionTesterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionTesterModule, declarations: [RxConnectionTesterComponent], imports: [CommonModule, i1.AdaptBusyModule, i1.AdaptAlertModule, AdaptButtonModule, TranslateModule], exports: [RxConnectionTesterComponent] });
RxConnectionTesterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionTesterModule, imports: [[CommonModule, AdaptBusyModule.forRoot(), AdaptAlertModule.forRoot(), AdaptButtonModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionTesterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptBusyModule.forRoot(), AdaptAlertModule.forRoot(), AdaptButtonModule, TranslateModule],
                    declarations: [RxConnectionTesterComponent],
                    exports: [RxConnectionTesterComponent]
                }]
        }] });
//# sourceMappingURL=connection-tester.module.js.map