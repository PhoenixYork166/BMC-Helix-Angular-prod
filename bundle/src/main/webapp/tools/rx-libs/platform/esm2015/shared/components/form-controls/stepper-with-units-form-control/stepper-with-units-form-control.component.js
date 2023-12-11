import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { find, head, isNaN, isNil, isUndefined, map, size } from 'lodash';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class StepperWithUnitsFormControlComponent extends ValueAccessor {
    constructor() {
        super(...arguments);
        this.stepperOptions = {};
        this.stepperValue = null;
        this.unitValue = [];
        this.stepperValueByUnitsCache = {};
    }
    get unit() {
        return this.unitValue;
    }
    set unit(value) {
        const unitValueId = head(value).id;
        this.unitValue = value;
        this.updateStepperConfig(unitValueId);
        this.stepperValue = this.stepperValueByUnitsCache.hasOwnProperty(unitValueId)
            ? this.stepperValueByUnitsCache[unitValueId]
            : this.stepperOptions.defaultValue;
        this.value = this.stepperValue ? this.stepperValue + unitValueId : null;
    }
    get stepper() {
        return this.stepperValue;
    }
    set stepper(value) {
        this.stepperValue = value;
        this.stepperValueByUnitsCache[head(this.unit).id] = value;
        this.value = !isNil(value) && !isNaN(value) && this.unitValue.length ? value + head(this.unitValue).id : null;
    }
    writeValue(value) {
        var _a;
        if (value) {
            const numberValue = value.match(/^[+-]?\d+(\.\d+)?/);
            this.stepperValue = numberValue ? Number(head(numberValue)) : null;
            if (size(this.options.units)) {
                const regExpString = map(this.options.units, 'id').join('|');
                const unitId = head(value.match(new RegExp(regExpString)));
                if (unitId) {
                    this.unitValue = [find(this.options.units, { id: unitId })];
                    this.stepperValueByUnitsCache[unitId] = this.stepperValue;
                    this.updateStepperConfig(unitId);
                }
            }
            else {
                this.unitValue = [];
            }
        }
        else {
            if (this.unitValue.length) {
                this.stepperValue = null;
            }
            else {
                const defaultUnit = (_a = find(this.options.units, { id: this.options.defaultUnit })) !== null && _a !== void 0 ? _a : head(this.options.units);
                this.unitValue = [defaultUnit];
                this.updateStepperConfig(defaultUnit.id);
                this.stepperValue = this.stepperOptions.defaultValue;
            }
        }
    }
    optionFormatter(option) {
        return option.name;
    }
    updateStepperConfig(unitId) {
        this.stepperOptions = this.options.stepperOptionByUnits ? this.options.stepperOptionByUnits[unitId] : {};
        this.maxValue = isUndefined(this.stepperOptions.maxValue) ? Number.MAX_SAFE_INTEGER : this.stepperOptions.maxValue;
        this.minValue = isUndefined(this.stepperOptions.minValue) ? Number.MIN_SAFE_INTEGER : this.stepperOptions.minValue;
    }
}
StepperWithUnitsFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StepperWithUnitsFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
StepperWithUnitsFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: StepperWithUnitsFormControlComponent, selector: "rx-stepper-with-units-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: StepperWithUnitsFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\" [ngClass]=\"{ 'is-required': options.required }\">\n  <label class=\"form-control-label\" *ngIf=\"options.label\">{{ options.label }}</label>\n\n  <div class=\"d-flex flex-row\">\n    <div class=\"control\">\n      <adapt-rx-counter\n        [min]=\"minValue\"\n        [max]=\"maxValue\"\n        [adaptMin]=\"minValue\"\n        [adaptMax]=\"maxValue\"\n        [required]=\"options.required\"\n        [disabled]=\"isDisabled\"\n        [(ngModel)]=\"stepper\"\n        [step]=\"options.step || 1\"\n        adaptIntegerNumber\n      >\n      </adapt-rx-counter>\n    </div>\n\n    <div class=\"control ml-1\">\n      <adapt-rx-select\n        [options]=\"options.units\"\n        [disabled]=\"isDisabled\"\n        [(ngModel)]=\"unit\"\n        [optionFormatter]=\"optionFormatter\"\n      >\n      </adapt-rx-select>\n    </div>\n  </div>\n</div>\n", styles: [".control{flex:1}\n"], components: [{ type: i1.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.AdaptIntegerNumberValidatorDirective, selector: "[adaptIntegerNumber][ngModel], [adaptIntegerNumber][formControl]", inputs: ["adaptIntegerNumberMessageFn"] }, { type: i1.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }, { type: i1.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }, { type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StepperWithUnitsFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-stepper-with-units-form-control',
                    templateUrl: './stepper-with-units-form-control.component.html',
                    styleUrls: ['./stepper-with-units-form-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: StepperWithUnitsFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=stepper-with-units-form-control.component.js.map