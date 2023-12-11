import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
export class RadioFormControlComponent extends ValueAccessor {
    constructor(translateService) {
        super();
        this.translateService = translateService;
    }
}
RadioFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RadioFormControlComponent, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RadioFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RadioFormControlComponent, selector: "rx-radio-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RadioFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\">\n  <adapt-rx-radiobutton-group\n    [(ngModel)]=\"value\"\n    [label]=\"options.label\"\n    [tooltip]=\"\n      options.tooltip\n        ? {\n            content: popoverContent,\n            popoverMode: options.tooltip.popoverMode,\n            placement: options.tooltip.placement,\n            iconName: options.tooltip.iconName,\n            maxWidth: options.tooltip.maxWidth\n          }\n        : null\n    \"\n    [disabled]=\"isDisabled\"\n  >\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      *ngFor=\"let item of options.items\"\n      [value]=\"item.value\"\n      [label]=\"item.label\"\n    >\n    </adapt-rx-radiobutton>\n  </adapt-rx-radiobutton-group>\n</div>\n\n<ng-template #popoverContent>\n  <span [innerHtml]=\"options.tooltip.content\"></span>\n</ng-template>\n", styles: [".form-group{width:450px}:host::ng-deep adapt-rx-radiobutton .radio{margin:0}:host::ng-deep adapt-rx-radiobutton.radio-inline{margin-left:0!important;margin-right:20px}\n"], components: [{ type: i2.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i2.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }], directives: [{ type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RadioFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-radio-form-control',
                    templateUrl: './radio-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RadioFormControlComponent,
                            multi: true
                        }
                    ],
                    styleUrls: ['./radio-form-control.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=radio-form-control.component.js.map