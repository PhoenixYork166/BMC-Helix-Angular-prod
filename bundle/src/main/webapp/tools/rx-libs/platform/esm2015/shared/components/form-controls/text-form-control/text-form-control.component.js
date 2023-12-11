import { Component, Input, Renderer2, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { AdaptRxTextfieldComponent } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@helix/platform/utils";
export class TextFormControlComponent extends ValueAccessor {
    constructor(renderer) {
        super();
        this.renderer = renderer;
    }
    focus() {
        this.renderer.selectRootElement(this.editor.inputRef.nativeElement, true).focus();
    }
}
TextFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFormControlComponent, deps: [{ token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
TextFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TextFormControlComponent, selector: "rx-text-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TextFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "editor", first: true, predicate: ["editor"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<adapt-rx-textfield\n  #editor\n  [isPassword]=\"options.isPassword\"\n  [label]=\"options.label\"\n  [required]=\"options.required\"\n  [(ngModel)]=\"value\"\n  [disabled]=\"isDisabled\"\n  [tooltip]=\"options.tooltip\"\n  [maxlength]=\"options.maxLength\"\n  [minlength]=\"options.minLength\"\n  [rxNoWhitespace]=\"!!(options.allowWhitespace === false || (options.required && options.allowWhitespace !== true))\"\n>\n</adapt-rx-textfield>\n", components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i2.MinLengthValidator, selector: "[minlength][formControlName],[minlength][formControl],[minlength][ngModel]", inputs: ["minlength"] }, { type: i3.RxNoWhitespaceValidator, selector: "[rxNoWhitespace]", inputs: ["rxNoWhitespace"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-text-form-control',
                    templateUrl: './text-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: TextFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }]; }, propDecorators: { options: [{
                type: Input
            }], editor: [{
                type: ViewChild,
                args: ['editor', { static: true }]
            }] } });
//# sourceMappingURL=text-form-control.component.js.map