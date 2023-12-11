import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@helix/platform/shared/components';
import { RecordFieldOption } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-translate/core";
export class FieldOptionEditorComponent extends ValueAccessor {
    ngOnInit() {
        this.isRequired = this.value === RecordFieldOption.Required || this.value === RecordFieldOption.System;
    }
    onSelectionChange() {
        this.value = this.isRequired ? RecordFieldOption.Required : RecordFieldOption.Optional;
    }
}
FieldOptionEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldOptionEditorComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
FieldOptionEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldOptionEditorComponent, selector: "rx-field-option-editor", providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FieldOptionEditorComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-rx-control-label\n  label=\"{{ 'com.bmc.arsys.rx.client.record-designer.field-properties.required-field.label' | translate }}\"\n>\n</adapt-rx-control-label>\n\n<adapt-rx-switch\n  [(ngModel)]=\"isRequired\"\n  [disabled]=\"isDisabled\"\n  (ngModelChange)=\"onSelectionChange()\"\n></adapt-rx-switch>\n", components: [{ type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i3.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldOptionEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-field-option-editor',
                    templateUrl: './field-option-editor.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: FieldOptionEditorComponent,
                            multi: true
                        }
                    ]
                }]
        }] });
//# sourceMappingURL=field-option-editor.component.js.map