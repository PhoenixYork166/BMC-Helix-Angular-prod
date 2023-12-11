import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomizationOptionsModule } from '@helix/platform/shared/components';
import { RxViewCustomizationOptionsComponent } from './view-customization-options.component';
import * as i0 from "@angular/core";
export class RxViewCustomizationOptionsModule {
}
RxViewCustomizationOptionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewCustomizationOptionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxViewCustomizationOptionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewCustomizationOptionsModule, declarations: [RxViewCustomizationOptionsComponent], imports: [CommonModule, FormsModule, CustomizationOptionsModule] });
RxViewCustomizationOptionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewCustomizationOptionsModule, imports: [[CommonModule, FormsModule, CustomizationOptionsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewCustomizationOptionsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, CustomizationOptionsModule],
                    declarations: [RxViewCustomizationOptionsComponent]
                }]
        }] });
//# sourceMappingURL=view-customization-options.module.js.map