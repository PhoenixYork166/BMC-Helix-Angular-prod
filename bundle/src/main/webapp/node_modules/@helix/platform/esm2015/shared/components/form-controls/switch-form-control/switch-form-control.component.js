import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class SwitchFormControlComponent extends ValueAccessor {
}
SwitchFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SwitchFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
SwitchFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SwitchFormControlComponent, selector: "rx-switcher-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SwitchFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\">\n  <adapt-rx-control-label\n    *ngIf=\"options.label\"\n    [label]=\"options.label\"\n    [tooltip]=\"\n      options.tooltip\n        ? {\n            content: popoverContent,\n            popoverMode: options.tooltip.popoverMode,\n            placement: options.tooltip.placement,\n            iconName: options.tooltip.iconName\n          }\n        : null\n    \"\n  >\n  </adapt-rx-control-label>\n\n  <ng-template #popoverContent>\n    <span [innerHtml]=\"options.tooltip.content\"></span>\n  </ng-template>\n\n  <adapt-rx-switch [(ngModel)]=\"value\" [label]=\"options.description\" [disabled]=\"isDisabled\"></adapt-rx-switch>\n</div>\n", styles: ["label{display:block}\n"], components: [{ type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SwitchFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-switcher-form-control',
                    templateUrl: './switch-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: SwitchFormControlComponent,
                            multi: true
                        }
                    ],
                    styleUrls: ['./switch-form-control.component.scss']
                }]
        }], propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=switch-form-control.component.js.map