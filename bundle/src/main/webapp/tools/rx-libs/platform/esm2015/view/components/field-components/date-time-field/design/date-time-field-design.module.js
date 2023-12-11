import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeFieldDesignComponent } from './date-time-field-design.component';
import { AdaptRxDatetimeModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class DateTimeFieldDesignModule {
}
DateTimeFieldDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFieldDesignModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DateTimeFieldDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFieldDesignModule, declarations: [DateTimeFieldDesignComponent], imports: [AdaptRxDatetimeModule, CommonModule, FormsModule] });
DateTimeFieldDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFieldDesignModule, imports: [[AdaptRxDatetimeModule, CommonModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFieldDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AdaptRxDatetimeModule, CommonModule, FormsModule],
                    declarations: [DateTimeFieldDesignComponent],
                    entryComponents: [DateTimeFieldDesignComponent]
                }]
        }] });
//# sourceMappingURL=date-time-field-design.module.js.map