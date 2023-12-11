import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptModalModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { NgModule } from '@angular/core';
import { RuntimeViewParamsModalComponent } from './runtime-view-params-modal.component';
import * as i0 from "@angular/core";
export class RuntimeViewParamsModalModule {
}
RuntimeViewParamsModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewParamsModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RuntimeViewParamsModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewParamsModalModule, declarations: [RuntimeViewParamsModalComponent], imports: [CommonModule, FormsModule, AdaptButtonModule, AdaptModalModule, AdaptRxTextfieldModule], exports: [RuntimeViewParamsModalComponent] });
RuntimeViewParamsModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewParamsModalModule, imports: [[CommonModule, FormsModule, AdaptButtonModule, AdaptModalModule, AdaptRxTextfieldModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewParamsModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, AdaptButtonModule, AdaptModalModule, AdaptRxTextfieldModule],
                    exports: [RuntimeViewParamsModalComponent],
                    declarations: [RuntimeViewParamsModalComponent],
                    entryComponents: [RuntimeViewParamsModalComponent]
                }]
        }] });
//# sourceMappingURL=runtime-view-params-modal.module.js.map