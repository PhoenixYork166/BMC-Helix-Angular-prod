import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { head, isNull } from 'lodash';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class OptionalSelectFormControlComponent extends ValueAccessor {
    constructor() {
        super(...arguments);
        this.switcherValue = false;
        this.selectValue = [];
    }
    onSwitcherChange(newValue) {
        this.switcherValue = newValue;
        if (newValue) {
            const option = head(this.options.options);
            if (option && !this.value) {
                this.value = option.id;
            }
        }
        else {
            this.value = null;
        }
    }
    onWriteValue(value) {
        this.switcherValue = !isNull(value);
        this.selectValue = this.value ? [this.options.options.find((option) => option.id === value)] : [];
    }
    onSelectionChange(value) {
        this.value = head(value).id;
    }
    optionFormatter(option) {
        return option.name;
    }
}
OptionalSelectFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalSelectFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
OptionalSelectFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OptionalSelectFormControlComponent, selector: "rx-optional-select-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: OptionalSelectFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\" [ngClass]=\"{ 'is-required': options.required }\">\n  <label class=\"form-control-label\" *ngIf=\"options.label\">{{ options.label }}</label>\n\n  <div class=\"d-flex\">\n    <div class=\"mr-2\">\n      <adapt-rx-switch\n        [ngModel]=\"switcherValue\"\n        (ngModelChange)=\"onSwitcherChange($event)\"\n        [disabled]=\"isDisabled\"\n      ></adapt-rx-switch>\n    </div>\n\n    <adapt-rx-select\n      class=\"mb-0 w-100\"\n      *ngIf=\"switcherValue\"\n      [disabled]=\"isDisabled\"\n      [options]=\"options.options\"\n      [required]=\"options.required\"\n      [ngModel]=\"selectValue\"\n      (ngModelChange)=\"onSelectionChange($event)\"\n      [optionFormatter]=\"optionFormatter\"\n    >\n    </adapt-rx-select>\n  </div>\n</div>\n", components: [{ type: i1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalSelectFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-optional-select-form-control',
                    templateUrl: './optional-select-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: OptionalSelectFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=optional-select-form-control.component.js.map