import { Component, Injector } from '@angular/core';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import { RxFieldDefinitionService } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@ngx-translate/core";
export class TextareaFieldComponent extends BaseRecordEditorFieldComponent {
    constructor(injector, rxFieldDefinitionService) {
        super(injector);
        this.rxFieldDefinitionService = rxFieldDefinitionService;
    }
    onConfigInitialized(config) {
        super.onConfigInitialized(config);
        if (this.fieldDefinition.maxLength && !this.rxFieldDefinitionService.isSystemField(this.fieldDefinition)) {
            this.maxLength = this.fieldDefinition.maxLength;
        }
    }
}
TextareaFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFieldComponent, deps: [{ token: i0.Injector }, { token: i1.RxFieldDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
TextareaFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TextareaFieldComponent, selector: "rx-textarea-field", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"!isHidden\">\n  <rx-read-only-field\n    *ngIf=\"inReadState; else editStateElementRef\"\n    [label]=\"label\"\n    [value]=\"getDisplayValue()\"\n  ></rx-read-only-field>\n</ng-container>\n\n<ng-template #editStateElementRef>\n  <adapt-rx-textarea\n    [formControl]=\"formControl\"\n    [required]=\"isRequired\"\n    [maxlength]=\"maxLength\"\n    [rows]=\"3\"\n    [readonly]=\"isDisabled\"\n    [disabledStyleForReadonlyState]=\"true\"\n    [label]=\"label\"\n    [requiredLabel]=\"'com.bmc.arsys.rx.client.common.required-field.label' | translate\"\n  >\n  </adapt-rx-textarea>\n</ng-template>\n", styles: [":host ::ng-deep textarea{resize:none}:host ::ng-deep rx-read-only-field .read-only-content{max-height:6em;overflow-y:auto;word-break:break-all;white-space:pre-wrap}\n"], components: [{ type: i2.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }, { type: i3.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i5.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }], pipes: { "translate": i6.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFieldComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-textarea-field',
                    templateUrl: './textarea-field.component.html',
                    styleUrls: ['./textarea-field.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxFieldDefinitionService }]; } });
//# sourceMappingURL=textarea-field.component.js.map