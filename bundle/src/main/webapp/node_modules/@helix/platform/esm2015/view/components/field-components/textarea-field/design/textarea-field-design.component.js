import { Component, Input } from '@angular/core';
import { TextareaFieldDesignModel } from './textarea-field-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
export class TextareaFieldDesignComponent {
}
TextareaFieldDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFieldDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TextareaFieldDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TextareaFieldDesignComponent, selector: "rx-textarea-field-design", inputs: { model: "model" }, ngImport: i0, template: "<adapt-rx-textarea\n  class=\"rx-pointer-events-none\"\n  [label]=\"model.label$ | async\"\n  [required]=\"model.isRequired$ | async\"\n  [disabled]=\"true\"\n  ngModel\n  rows=\"3\"\n></adapt-rx-textarea>\n", components: [{ type: i1.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFieldDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-textarea-field-design',
                    templateUrl: './textarea-field-design.component.html'
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=textarea-field-design.component.js.map