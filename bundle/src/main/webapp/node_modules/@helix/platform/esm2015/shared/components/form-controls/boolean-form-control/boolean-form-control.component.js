import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
import * as i1 from "../../boolean/boolean.component";
import * as i2 from "@angular/forms";
export class BooleanFormControlComponent extends ValueAccessor {
}
BooleanFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
BooleanFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: BooleanFormControlComponent, selector: "rx-checkbox-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: BooleanFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<rx-boolean\n  [label]=\"options.label || options.description\"\n  [required]=\"options.required\"\n  [isDisabled]=\"isDisabled\"\n  [shouldDisplayAsCheckbox]=\"options.shouldDisplayAsCheckbox\"\n  [(ngModel)]=\"value\"\n  [tooltip]=\"options.tooltip\"\n></rx-boolean>\n", components: [{ type: i1.RxBooleanComponent, selector: "rx-boolean", inputs: ["shouldDisplayAsCheckbox", "required", "isDisabled", "label", "tooltip"], outputs: ["rxBlur"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-checkbox-form-control',
                    templateUrl: './boolean-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: BooleanFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });
//# sourceMappingURL=boolean-form-control.component.js.map