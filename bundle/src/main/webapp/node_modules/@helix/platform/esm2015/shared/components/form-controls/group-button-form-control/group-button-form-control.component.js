import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AdaptButtonGroupComponent } from '@bmc-ux/adapt-angular';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { findIndex } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class GroupButtonFormControlComponent extends ValueAccessor {
    constructor(changeDetectorRef) {
        super();
        this.changeDetectorRef = changeDetectorRef;
    }
    onGroupButtonChange(groupButtonValues) {
        const index = findIndex(groupButtonValues, (buttonValue) => buttonValue);
        this.setValue(this.options.items[index]);
    }
    onWriteValue(value) {
        this.updateModel(value);
    }
    updateModel(value) {
        this.model = this.options.items.map((item) => item.value === value);
    }
    setValue(item) {
        if (this.options.beforeValueChange) {
            this.options.beforeValueChange(this.value, item.value).then((response) => {
                if (response) {
                    this.value = item.value;
                }
                else {
                    this.updateModel(this.value);
                    this.adaptButtonGroupComponent.writeValue(this.model);
                    this.changeDetectorRef.detectChanges();
                }
            });
        }
        else {
            this.value = item.value;
        }
    }
}
GroupButtonFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GroupButtonFormControlComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GroupButtonFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: GroupButtonFormControlComponent, selector: "rx-group-button-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: GroupButtonFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "adaptButtonGroupComponent", first: true, predicate: AdaptButtonGroupComponent, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\" [ngClass]=\"{ 'is-required': options.required }\">\n  <adapt-rx-control-label\n    [label]=\"options.label\"\n    [showRequiredLabel]=\"!!options.required\"\n    [tooltip]=\"\n      options.tooltip\n        ? {\n            content: popoverContent,\n            popoverMode: options.tooltip.popoverMode,\n            placement: options.tooltip.placement,\n            iconName: options.tooltip.iconName\n          }\n        : null\n    \"\n  ></adapt-rx-control-label>\n\n  <div class=\"mt-1\">\n    <adapt-button-group\n      [(ngModel)]=\"model\"\n      (ngModelChange)=\"onGroupButtonChange($event)\"\n      [disabled]=\"isDisabled\"\n      [config]=\"options.items\"\n      [size]=\"options.size || 'small'\"\n    >\n    </adapt-button-group>\n  </div>\n</div>\n\n<ng-template #popoverContent>\n  <span [innerHtml]=\"options.tooltip.content\"></span>\n</ng-template>\n", styles: ["label{display:block}\n"], components: [{ type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptButtonGroupComponent, selector: "adapt-button-group", inputs: ["config", "size", "groupType", "isVertical", "multiselectable", "uncheckable", "useCheckboxStyle"], outputs: ["modelArrayChanged"], exportAs: ["adaptBtnGroup"] }], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GroupButtonFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-group-button-form-control',
                    templateUrl: './group-button-form-control.component.html',
                    styleUrls: ['./group-button-form-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: GroupButtonFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { adaptButtonGroupComponent: [{
                type: ViewChild,
                args: [AdaptButtonGroupComponent, { static: true }]
            }], options: [{
                type: Input
            }] } });
//# sourceMappingURL=group-button-form-control.component.js.map