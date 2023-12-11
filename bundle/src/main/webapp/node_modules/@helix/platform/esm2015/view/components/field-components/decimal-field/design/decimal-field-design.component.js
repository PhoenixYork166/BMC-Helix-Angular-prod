import { Component, Input } from '@angular/core';
import { DecimalFieldDesignModel } from './decimal-field-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
export class DecimalFieldDesignComponent {
}
DecimalFieldDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DecimalFieldDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DecimalFieldDesignComponent, selector: "rx-decimal-field-design", inputs: { model: "model" }, ngImport: i0, template: "<adapt-rx-textfield\n  class=\"rx-pointer-events-none\"\n  [required]=\"model.isRequired$ | async\"\n  [label]=\"model.label$ | async\"\n  [disabled]=\"true\"\n  ngModel\n></adapt-rx-textfield>\n", components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-decimal-field-design',
                    templateUrl: './decimal-field-design.component.html'
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=decimal-field-design.component.js.map