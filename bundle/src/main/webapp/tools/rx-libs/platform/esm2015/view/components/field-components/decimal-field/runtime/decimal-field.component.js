import { Component } from '@angular/core';
import { IntegerFieldComponent } from '../../integer-field/runtime/integer-field.component';
import { isNil } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "@ngx-translate/core";
export class DecimalFieldComponent extends IntegerFieldComponent {
    getDisplayValue() {
        const fieldValue = this.getFieldValue();
        const precision = this.fieldDefinition.precision;
        const digitsInfo = precision === -1 ? null : `1.${precision}-${precision}`;
        return isNil(fieldValue) ? fieldValue : this.decimalPipe.transform(String(fieldValue), digitsInfo);
    }
}
DecimalFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
DecimalFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DecimalFieldComponent, selector: "rx-decimal-field", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"!isHidden\">\n  <rx-read-only-field\n    *ngIf=\"inReadState; else editStateElementRef\"\n    [label]=\"label\"\n    [value]=\"getDisplayValue()\"\n  ></rx-read-only-field>\n</ng-container>\n\n<ng-template #editStateElementRef>\n  <adapt-rx-counter\n    class=\"mb-0\"\n    [label]=\"label\"\n    [formControl]=\"counterFormControl\"\n    [required]=\"isRequired\"\n    [min]=\"fieldDefinition.minValue\"\n    [max]=\"fieldDefinition.maxValue\"\n    [adaptMin]=\"fieldDefinition.minValue\"\n    [adaptMax]=\"fieldDefinition.maxValue\"\n    (onBlur)=\"onBlur()\"\n    (onFocus)=\"onFocus()\"\n    [readonly]=\"isDisabled\"\n    [disabledStyleForReadonlyState]=\"true\"\n    [requiredLabel]=\"'com.bmc.arsys.rx.client.common.required-field.label' | translate\"\n  ></adapt-rx-counter>\n</ng-template>\n", components: [{ type: i1.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }, { type: i2.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }, { type: i2.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-decimal-field',
                    templateUrl: './decimal-field.component.html'
                }]
        }] });
//# sourceMappingURL=decimal-field.component.js.map