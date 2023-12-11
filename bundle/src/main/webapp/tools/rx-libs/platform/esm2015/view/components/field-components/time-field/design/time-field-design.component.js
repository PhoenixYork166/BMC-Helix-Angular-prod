import { Component, Input } from '@angular/core';
import { TimeFieldDesignModel } from './time-field-design.model';
import { RxDatetimePickerMode } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
export class TimeFieldDesignComponent {
    constructor() {
        this.pickerMode = RxDatetimePickerMode.Time;
    }
}
TimeFieldDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFieldDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TimeFieldDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TimeFieldDesignComponent, selector: "rx-time-field-design", inputs: { model: "model" }, ngImport: i0, template: "<adapt-rx-datetime\n  class=\"rx-pointer-events-none\"\n  [(ngModel)]=\"timeValue\"\n  [required]=\"model.isRequired$ | async\"\n  [disabled]=\"true\"\n  [mode]=\"pickerMode\"\n  [label]=\"model.label$ | async\"\n></adapt-rx-datetime>\n", components: [{ type: i1.AdaptRxDatetimeComponent, selector: "adapt-rx-datetime", inputs: ["placeholder", "inline", "placement", "appendToBody", "inlineLight", "inlineCompact", "dayFilter", "disableWizard", "mode", "hasSeconds", "use12HoursTime", "firstDayOfWeek", "initialDatetime", "defaultDatetime", "disabledStyleForReadonlyState", "popupClass", "texts", "inputFormat"], outputs: ["onPopupOpenChange", "onDatetimeChange"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFieldDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-time-field-design',
                    templateUrl: './time-field-design.component.html'
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=time-field-design.component.js.map