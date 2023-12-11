import { Component, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNil } from 'lodash';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { RX_NUMBER } from '@helix/platform/utils';
import { AdaptRxCounterComponent } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class CounterFormControlComponent extends ValueAccessor {
    ngOnInit() {
        if (isNil(this.options.maxValue)) {
            this.options.maxValue = this.options.allowIntegerOnly ? RX_NUMBER.maxInteger : Number.MAX_SAFE_INTEGER;
        }
        if (isNil(this.options.minValue)) {
            this.options.minValue = this.options.allowIntegerOnly ? RX_NUMBER.minInteger : Number.MIN_SAFE_INTEGER;
        }
    }
    focus() {
        this.adaptRxCounterComponent.inputEl.nativeElement.focus();
    }
}
CounterFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CounterFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
CounterFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CounterFormControlComponent, selector: "rx-counter-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CounterFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "adaptRxCounterComponent", first: true, predicate: AdaptRxCounterComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<adapt-rx-counter\n  *ngIf=\"options.allowIntegerOnly\"\n  [label]=\"options.label\"\n  [required]=\"options.required\"\n  [disabled]=\"isDisabled\"\n  [(ngModel)]=\"value\"\n  [max]=\"options.maxValue\"\n  [min]=\"options.minValue\"\n  [adaptMax]=\"options.maxValue\"\n  [adaptMin]=\"options.minValue\"\n  adaptIntegerNumber\n  [tooltip]=\"\n    options.tooltip\n      ? {\n          content: tooltipContent,\n          iconName: 'question_circle_o'\n        }\n      : null\n  \"\n>\n</adapt-rx-counter>\n\n<adapt-rx-counter\n  *ngIf=\"!options.allowIntegerOnly\"\n  [label]=\"options.label\"\n  [required]=\"options.required\"\n  [disabled]=\"isDisabled\"\n  [(ngModel)]=\"value\"\n  [max]=\"options.maxValue\"\n  [min]=\"options.minValue\"\n  [adaptMax]=\"options.maxValue\"\n  [adaptMin]=\"options.minValue\"\n  adaptScientificNumber\n  [tooltip]=\"\n    options.tooltip\n      ? {\n          content: tooltipContent,\n          iconName: 'question_circle_o'\n        }\n      : null\n  \"\n>\n</adapt-rx-counter>\n\n<ng-template #tooltipContent>\n  <div [innerHTML]=\"options.tooltip\"></div>\n</ng-template>\n", components: [{ type: i1.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.AdaptIntegerNumberValidatorDirective, selector: "[adaptIntegerNumber][ngModel], [adaptIntegerNumber][formControl]", inputs: ["adaptIntegerNumberMessageFn"] }, { type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }, { type: i1.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }, { type: i1.AdaptScientificNumberValidatorDirective, selector: "[adaptScientificNumber][ngModel], [adaptScientificNumber][formControl]", inputs: ["adaptScientificNumberMessageFn"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CounterFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-counter-form-control',
                    templateUrl: './counter-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: CounterFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], adaptRxCounterComponent: [{
                type: ViewChild,
                args: [AdaptRxCounterComponent]
            }] } });
//# sourceMappingURL=counter-form-control.component.js.map