import { NgModule } from '@angular/core';
import { AdaptRxLabelModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { LabelFormControlComponent } from './label-form-control.component';
import * as i0 from "@angular/core";
export class LabelFormControlModule {
}
LabelFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LabelFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LabelFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LabelFormControlModule, declarations: [LabelFormControlComponent], imports: [AdaptRxLabelModule, TranslateModule], exports: [LabelFormControlComponent] });
LabelFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LabelFormControlModule, imports: [[AdaptRxLabelModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LabelFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [LabelFormControlComponent],
                    exports: [LabelFormControlComponent],
                    entryComponents: [LabelFormControlComponent],
                    imports: [AdaptRxLabelModule, TranslateModule]
                }]
        }] });
//# sourceMappingURL=label-form-control.module.js.map