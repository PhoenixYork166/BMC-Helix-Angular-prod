import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ServiceListComponent } from './service-list.component';
import { AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class ServiceListModule {
}
ServiceListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServiceListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ServiceListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServiceListModule, declarations: [ServiceListComponent], imports: [CommonModule, AdaptRxSelectModule, FormsModule], exports: [ServiceListComponent] });
ServiceListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServiceListModule, imports: [[CommonModule, AdaptRxSelectModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServiceListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptRxSelectModule, FormsModule],
                    declarations: [ServiceListComponent],
                    entryComponents: [ServiceListComponent],
                    exports: [ServiceListComponent]
                }]
        }] });
//# sourceMappingURL=service-list.module.js.map