import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxCheckboxModule, AdaptRxSwitchModule } from '@bmc-ux/adapt-angular';
import { BooleanFieldDesignComponent } from './boolean-field-design.component';
import * as i0 from "@angular/core";
export class BooleanFieldDesignModule {
}
BooleanFieldDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldDesignModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BooleanFieldDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldDesignModule, declarations: [BooleanFieldDesignComponent], imports: [CommonModule, FormsModule, AdaptRxSwitchModule, AdaptRxCheckboxModule], exports: [BooleanFieldDesignComponent] });
BooleanFieldDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldDesignModule, imports: [[CommonModule, FormsModule, AdaptRxSwitchModule, AdaptRxCheckboxModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, AdaptRxSwitchModule, AdaptRxCheckboxModule],
                    declarations: [BooleanFieldDesignComponent],
                    exports: [BooleanFieldDesignComponent],
                    entryComponents: [BooleanFieldDesignComponent]
                }]
        }] });
//# sourceMappingURL=boolean-field-design.module.js.map