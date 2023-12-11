import { Component, Input, Renderer2, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { AdaptRxTextfieldComponent } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-translate/core";
export class RecordInstanceFormControlComponent extends ValueAccessor {
    constructor(renderer) {
        super();
        this.renderer = renderer;
        this.model = {
            resourceType: RX_RECORD_DEFINITION.resourceTypes.recordInstanceProcessVariable
        };
    }
    focus() {
        this.renderer.selectRootElement(this.editor.inputRef.nativeElement, true).focus();
    }
    onModelChange() {
        this.value = this.model;
    }
}
RecordInstanceFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInstanceFormControlComponent, deps: [{ token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
RecordInstanceFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordInstanceFormControlComponent, selector: "rx-record-instance-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RecordInstanceFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "editor", first: true, predicate: ["editor"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<adapt-rx-control-label class=\"d-block form-group\" [label]=\"options.label\"></adapt-rx-control-label>\n\n<adapt-rx-textfield\n  #editor\n  class=\"d-block form-group\"\n  [label]=\"'com.bmc.arsys.rx.client.record-instance-form-control.id.label' | translate\"\n  [required]=\"options.required\"\n  [(ngModel)]=\"model.id\"\n  [disabled]=\"isDisabled\"\n  [tooltip]=\"options.tooltip\"\n  (ngModelChange)=\"onModelChange()\"\n>\n</adapt-rx-textfield>\n\n<adapt-rx-textfield\n  class=\"d-block form-group\"\n  [label]=\"'com.bmc.arsys.rx.client.record-instance-form-control.record-definition-name.label' | translate\"\n  [required]=\"options.required\"\n  [(ngModel)]=\"model.recordDefinitionName\"\n  [disabled]=\"isDisabled\"\n  [tooltip]=\"options.tooltip\"\n  (ngModelChange)=\"onModelChange()\"\n>\n</adapt-rx-textfield>\n", components: [{ type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInstanceFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-instance-form-control',
                    templateUrl: './record-instance-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RecordInstanceFormControlComponent,
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
//# sourceMappingURL=record-instance-form-control.component.js.map