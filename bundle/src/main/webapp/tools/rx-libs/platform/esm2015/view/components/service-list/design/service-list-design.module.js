import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormControlsModule, RxDefinitionPickerModule } from '@helix/platform/shared/components';
import { ServiceListDesignComponent } from './service-list-design.component';
import { AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class ServiceListDesignModule {
}
ServiceListDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServiceListDesignModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ServiceListDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServiceListDesignModule, declarations: [ServiceListDesignComponent], imports: [CommonModule, RxDefinitionPickerModule, FormControlsModule, AdaptRxSelectModule, FormsModule] });
ServiceListDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServiceListDesignModule, imports: [[CommonModule, RxDefinitionPickerModule, FormControlsModule, AdaptRxSelectModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServiceListDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RxDefinitionPickerModule, FormControlsModule, AdaptRxSelectModule, FormsModule],
                    declarations: [ServiceListDesignComponent],
                    entryComponents: [ServiceListDesignComponent]
                }]
        }] });
//# sourceMappingURL=service-list-design.module.js.map