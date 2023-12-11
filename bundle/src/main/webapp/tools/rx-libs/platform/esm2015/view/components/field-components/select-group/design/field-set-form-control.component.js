import { Component, Injector, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InspectorWidgetBase } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RxGuidService } from '@helix/platform/utils';
import { omit } from 'lodash';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "./select-group-field.component";
import * as i6 from "@angular/common";
export class FieldSetFormControlComponent extends InspectorWidgetBase {
    constructor(formBuilder, rxGuidService, rxModalService, injector) {
        super(injector);
        this.formBuilder = formBuilder;
        this.rxGuidService = rxGuidService;
        this.rxModalService = rxModalService;
        this.formArray = this.formBuilder.array([]);
        this.maxSelectGroupFieldCount = 6;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.designerItemModel.fieldProperties$
            .pipe(takeUntil(this.destroyed$))
            .subscribe((fieldModels) => this.onWriteValue(fieldModels));
        this.setDisabledState(this.isDisabled);
    }
    onWriteValue(fieldModels) {
        var _a;
        (_a = this.valueChangeSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        const formGroups = fieldModels
            .sort((a, b) => Number(a.index) - Number(b.index))
            .map((model) => this.formBuilder.group(Object.assign(Object.assign({}, omit(model, 'index')), { sourceRecordDefinitionName: { value: null, disabled: true } })));
        this.formArray = this.formBuilder.array(formGroups);
        this.valueChangeSubscription = this.formArray.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe(this.onFormValueChange.bind(this));
    }
    onFormValueChange(formValue) {
        const value = formValue.map((formGroup, index) => {
            const inspectorFieldModel = Object.assign(Object.assign({}, omit(formGroup, ['sourceRecordDefinitionName', 'optionFilterFieldId'])), { index: String(index), fieldId: formGroup.namedListDefinitionName ? formGroup.fieldId : null });
            if (index > 0) {
                inspectorFieldModel.optionFilterFieldId = formGroup.namedListDefinitionName
                    ? formGroup.optionFilterFieldId
                    : null;
            }
            return inspectorFieldModel;
        });
        this.designerItemModel.onFieldPropertiesChange(value);
    }
    addField() {
        this.formArray.push(this.getFieldFormGroup());
    }
    removeField(index) {
        this.rxModalService
            .confirm({
            title: 'Warning',
            modalStyle: RX_MODAL.modalStyles.warning,
            message: 'Are you sure you want to delete this field?'
        })
            .then((response) => {
            if (response) {
                this.formArray.removeAt(index);
            }
        });
    }
    isAddFieldButtonDisabled() {
        return this.isDisabled || this.formArray.length >= this.maxSelectGroupFieldCount;
    }
    trackByFn(index, control) {
        return control.get('guid').value;
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    getFieldFormGroup() {
        return this.formBuilder.group({
            guid: this.rxGuidService.generate(),
            label: null,
            namedListDefinitionName: null,
            fieldId: null,
            sourceRecordDefinitionName: null,
            optionFilterFieldId: null
        });
    }
    setDisabledState(isDisabled) {
        isDisabled ? this.formArray.disable() : this.formArray.enable();
    }
}
FieldSetFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldSetFormControlComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxGuidService }, { token: i3.RxModalService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
FieldSetFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldSetFormControlComponent, selector: "rx-field-set-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, usesInheritance: true, ngImport: i0, template: "<adapt-button\n  btn-type=\"tertiary\"\n  rx-id=\"add-field-button\"\n  class=\"d-icon-plus_circle px-0 py-0\"\n  (click)=\"addField()\"\n  [disabled]=\"isAddFieldButtonDisabled()\"\n>\n  Add dependent field\n</adapt-button>\n\n<div\n  class=\"card mt-2\"\n  *ngFor=\"let formGroupControl of formArray.controls; trackBy: trackByFn; let index = index\"\n  rx-id=\"select-group-field-card\"\n>\n  <div class=\"card-block p-2\">\n    <button\n      (click)=\"removeField(index)\"\n      class=\"close position-relative\"\n      type=\"button\"\n      aria-label=\"Remove\"\n      rx-id=\"remove-field-button\"\n      *ngIf=\"!isDisabled\"\n    ></button>\n\n    <rx-select-group-field\n      [fieldformGroup]=\"formGroupControl\"\n      [index]=\"index\"\n      [targetFieldOptions]=\"options.targetFieldOptions\"\n    ></rx-select-group-field>\n  </div>\n</div>\n", styles: [".close{z-index:1}\n"], components: [{ type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i5.SelectGroupFieldComponent, selector: "rx-select-group-field", inputs: ["fieldformGroup", "index", "targetFieldOptions"] }], directives: [{ type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldSetFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-field-set-form-control',
                    templateUrl: './field-set-form-control.component.html',
                    styleUrls: ['./field-set-form-control.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxGuidService }, { type: i3.RxModalService }, { type: i0.Injector }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });
//# sourceMappingURL=field-set-form-control.component.js.map