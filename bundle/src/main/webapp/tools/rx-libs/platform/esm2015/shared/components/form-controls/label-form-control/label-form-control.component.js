import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@bmc-ux/adapt-angular";
export class LabelFormControlComponent extends ValueAccessor {
    constructor(translateService) {
        super();
        this.translateService = translateService;
    }
    ngOnInit() {
        this.label = this.options.labelKey ? this.translateService.instant(this.options.labelKey) : this.options.label;
    }
}
LabelFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LabelFormControlComponent, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
LabelFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: LabelFormControlComponent, selector: "rx-label-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: LabelFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-rx-control-label [label]=\"label\"></adapt-rx-control-label>\n", components: [{ type: i2.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LabelFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-label-form-control',
                    templateUrl: './label-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: LabelFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=label-form-control.component.js.map