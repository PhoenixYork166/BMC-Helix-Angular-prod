import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupButtonFormControlComponent } from './group-button-form-control.component';
import { AdaptButtonModule, AdaptButtonGroupModule, AdaptRxLabelModule, AdaptTooltipModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class GroupButtonFormControlModule {
}
GroupButtonFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GroupButtonFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GroupButtonFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GroupButtonFormControlModule, declarations: [GroupButtonFormControlComponent], imports: [CommonModule,
        AdaptRxLabelModule,
        AdaptButtonModule,
        AdaptButtonGroupModule,
        AdaptTooltipModule,
        FormsModule], exports: [GroupButtonFormControlComponent] });
GroupButtonFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GroupButtonFormControlModule, imports: [[
            CommonModule,
            AdaptRxLabelModule,
            AdaptButtonModule,
            AdaptButtonGroupModule,
            AdaptTooltipModule,
            FormsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GroupButtonFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GroupButtonFormControlComponent],
                    exports: [GroupButtonFormControlComponent],
                    entryComponents: [GroupButtonFormControlComponent],
                    imports: [
                        CommonModule,
                        AdaptRxLabelModule,
                        AdaptButtonModule,
                        AdaptButtonGroupModule,
                        AdaptTooltipModule,
                        FormsModule
                    ]
                }]
        }] });
//# sourceMappingURL=group-button-form-control.module.js.map