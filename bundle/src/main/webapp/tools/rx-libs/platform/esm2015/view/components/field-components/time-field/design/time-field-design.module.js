import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxDatetimeModule } from '@bmc-ux/adapt-angular';
import { TimeFieldDesignComponent } from './time-field-design.component';
import * as i0 from "@angular/core";
export class TimeFieldDesignModule {
}
TimeFieldDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFieldDesignModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TimeFieldDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFieldDesignModule, declarations: [TimeFieldDesignComponent], imports: [AdaptRxDatetimeModule, CommonModule, FormsModule] });
TimeFieldDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFieldDesignModule, imports: [[AdaptRxDatetimeModule, CommonModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFieldDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AdaptRxDatetimeModule, CommonModule, FormsModule],
                    declarations: [TimeFieldDesignComponent],
                    entryComponents: [TimeFieldDesignComponent]
                }]
        }] });
//# sourceMappingURL=time-field-design.module.js.map