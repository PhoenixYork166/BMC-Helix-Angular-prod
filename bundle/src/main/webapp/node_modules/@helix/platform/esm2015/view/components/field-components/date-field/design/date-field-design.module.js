import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxDatetimeModule } from '@bmc-ux/adapt-angular';
import { DateFieldDesignComponent } from './date-field-design.component';
import * as i0 from "@angular/core";
export class DateFieldDesignModule {
}
DateFieldDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFieldDesignModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DateFieldDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFieldDesignModule, declarations: [DateFieldDesignComponent], imports: [AdaptRxDatetimeModule, CommonModule, FormsModule] });
DateFieldDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFieldDesignModule, imports: [[AdaptRxDatetimeModule, CommonModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFieldDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AdaptRxDatetimeModule, CommonModule, FormsModule],
                    declarations: [DateFieldDesignComponent],
                    entryComponents: [DateFieldDesignComponent]
                }]
        }] });
//# sourceMappingURL=date-field-design.module.js.map