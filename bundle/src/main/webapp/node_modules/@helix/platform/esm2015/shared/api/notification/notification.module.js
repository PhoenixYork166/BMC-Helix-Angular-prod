import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptToastModule } from '@bmc-ux/adapt-angular';
import { RxNotificationComponent } from './notification-component/notification.component';
import { TranslateModule } from '@ngx-translate/core';
import { RxNotificationService } from './notification.service';
import * as i0 from "@angular/core";
import * as i1 from "./notification.service";
export class RxNotificationModule {
    constructor(rxNotificationService) {
        this.rxNotificationService = rxNotificationService;
        this.rxNotificationService.initialize();
    }
}
RxNotificationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationModule, deps: [{ token: i1.RxNotificationService }], target: i0.ɵɵFactoryTarget.NgModule });
RxNotificationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationModule, declarations: [RxNotificationComponent], imports: [AdaptToastModule, CommonModule, TranslateModule], exports: [RxNotificationComponent] });
RxNotificationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationModule, imports: [[AdaptToastModule, CommonModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AdaptToastModule, CommonModule, TranslateModule],
                    declarations: [RxNotificationComponent],
                    exports: [RxNotificationComponent]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxNotificationService }]; } });
//# sourceMappingURL=notification.module.js.map