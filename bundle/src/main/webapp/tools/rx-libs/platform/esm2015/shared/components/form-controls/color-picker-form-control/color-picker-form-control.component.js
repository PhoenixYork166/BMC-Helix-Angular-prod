import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RxColorUtilsService } from '@helix/platform/utils';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/forms";
export class ColorPickerFormControlComponent extends ValueAccessor {
    constructor(rxColorUtilsService) {
        super();
        this.rxColorUtilsService = rxColorUtilsService;
    }
    get color() {
        return this.colorValue;
    }
    set color(color) {
        if (!this.rxColorUtilsService.isSameColor(color, this.value)) {
            this.value = this.rxColorUtilsService.normalize(color);
            this.colorValue = color;
        }
    }
    onWriteValue(value) {
        if (!this.color || !this.rxColorUtilsService.isSameColor(this.color, value)) {
            this.colorValue = this.rxColorUtilsService.normalize(value);
        }
    }
    setColor(color) {
        this.color = (color === null || color === void 0 ? void 0 : color.value) || 'null';
    }
}
ColorPickerFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorPickerFormControlComponent, deps: [{ token: i1.RxColorUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ColorPickerFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ColorPickerFormControlComponent, selector: "rx-color-picker-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ColorPickerFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\">\n  <adapt-rx-control-label [showRequiredLabel]=\"options.required\" [label]=\"options.label\"></adapt-rx-control-label>\n\n  <adapt-color-picker\n    [disabled]=\"isDisabled\"\n    [(ngModel)]=\"color\"\n    [showEmptyOption]=\"!options.required\"\n    [showRecentlyUsedColors]=\"false\"\n    (onSelectColor)=\"setColor($event)\"\n  ></adapt-color-picker>\n</div>\n", components: [{ type: i2.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i2.AdaptColorPickerComponent, selector: "adapt-color-picker, adapt-colorpicker", inputs: ["showThemeColors", "showRecentlyUsedColors", "colorType", "label", "mobileView", "placement", "appendToBody", "disabled", "readonly", "showEmptyOption", "disabledStyleForReadonlyState", "recentlyUsedColors"], outputs: ["onChange", "onSelectColor", "open", "close", "focus", "blur", "recentlyUsedColorsChanged"] }], directives: [{ type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorPickerFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-color-picker-form-control',
                    templateUrl: './color-picker-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ColorPickerFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxColorUtilsService }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });
//# sourceMappingURL=color-picker-form-control.component.js.map