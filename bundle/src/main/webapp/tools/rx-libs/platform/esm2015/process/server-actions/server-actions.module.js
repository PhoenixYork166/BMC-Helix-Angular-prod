import { NgModule } from '@angular/core';
import { RxCreateListRegistrationModule } from './create-list/create-list-registration.module';
import { RxRecordServerActionModule } from './record/record-server-action.module';
import * as i0 from "@angular/core";
export class RxServerActionsModule {
}
RxServerActionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerActionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxServerActionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerActionsModule, imports: [RxCreateListRegistrationModule, RxRecordServerActionModule] });
RxServerActionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerActionsModule, imports: [[RxCreateListRegistrationModule, RxRecordServerActionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerActionsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RxCreateListRegistrationModule, RxRecordServerActionModule]
                }]
        }] });
//# sourceMappingURL=server-actions.module.js.map