import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RxGuidService } from '@helix/platform/utils';
import { forEach, forOwn, includes, reduce } from 'lodash';
import { RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RecordEditorFormControl } from './record-editor-form-control.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@helix/platform/record/api";
export const RecordEditorFormDelimiter = '%';
const BASE_FORM_GROUP_KEY = 'baseFormGroup';
export class RecordEditorForm extends FormGroup {
    constructor(rxGuidService, rxRecordInstanceUtilsService) {
        super({});
        this.rxGuidService = rxGuidService;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
    }
    addFieldControl(fieldId, guid, initialValue = null, validator, asyncValidator) {
        const formControl = new RecordEditorFormControl('', validator, asyncValidator);
        const formGroup = this.controls[BASE_FORM_GROUP_KEY];
        formControl.setValue(initialValue);
        if (!formGroup) {
            this.addControl(BASE_FORM_GROUP_KEY, new FormGroup({
                [this.getControlId(fieldId, guid)]: formControl
            }));
        }
        else {
            formGroup.addControl(this.getControlId(fieldId, guid), formControl);
        }
        return formControl;
    }
    addAssociatedFieldControl(fieldId, guid, associatedRecordPath, initialValue = null, validator, asyncValidator) {
        const associatedFormGroupName = associatedRecordPath.join(RecordEditorFormDelimiter);
        const associatedFormGroup = this.controls[associatedFormGroupName];
        const formControl = new RecordEditorFormControl(initialValue, validator, asyncValidator);
        if (!associatedFormGroup) {
            this.addControl(associatedFormGroupName, new FormGroup({
                [this.getControlId(fieldId, guid)]: formControl
            }));
        }
        else {
            associatedFormGroup.addControl(this.getControlId(fieldId, guid), formControl);
        }
        return formControl;
    }
    resetFieldControls(formStateByFieldId, associatedRecordPath) {
        const formGroup = this.controls[associatedRecordPath ? associatedRecordPath.join(RecordEditorFormDelimiter) : BASE_FORM_GROUP_KEY];
        if (formStateByFieldId) {
            formGroup.reset(this.prepareFormGroupState(formStateByFieldId, formGroup));
        }
        else {
            formGroup.reset();
        }
    }
    syncFormControlValues(fieldId, value, associatedFromGroupName, options = {}) {
        this.getControlsBoundToRecordField(String(fieldId), associatedFromGroupName).forEach((formControl) => {
            if (options.markAsDirty !== false) {
                formControl.markAsDirty();
            }
            if (options.markAsTouched !== false) {
                formControl.markAsTouched();
            }
            if (!this.rxRecordInstanceUtilsService.isFieldValueEqual(formControl.value, value)) {
                formControl.setValue(value);
            }
        });
    }
    getFieldIds(associatedRecordPath) {
        const formGroup = this.controls[associatedRecordPath ? associatedRecordPath.join(RecordEditorFormDelimiter) : BASE_FORM_GROUP_KEY];
        if (formGroup) {
            return reduce(formGroup.controls, (result, control, formControlId) => {
                const fieldId = this.getFieldId(formControlId);
                if (control instanceof FormControl && !includes(result, fieldId)) {
                    result.push(fieldId);
                }
                return result;
            }, []);
        }
        else {
            return [];
        }
    }
    clearAndReset() {
        forOwn(this.controls, (control, name) => this.removeControl(name));
        this.reset();
    }
    markInvalidControlsAsTouched() {
        forEach(this.controls, (formGroup) => {
            forEach(formGroup.controls, (control) => {
                if (control.invalid) {
                    control.markAsTouched();
                }
            });
        });
    }
    getFormControl(fieldId, guid, associatedRecordPath) {
        let control;
        let formGroup;
        formGroup = this.controls[associatedRecordPath ? associatedRecordPath.join(RecordEditorFormDelimiter) : BASE_FORM_GROUP_KEY];
        if (formGroup) {
            control = formGroup.get(this.getControlId(fieldId, guid));
        }
        return control;
    }
    getControlsBoundToRecordField(fieldId, associatedFormGroupName) {
        const formGroup = this.controls[associatedFormGroupName || BASE_FORM_GROUP_KEY];
        return reduce(formGroup.controls, (result, control, formControlId) => {
            if (control instanceof FormControl && this.getFieldId(formControlId) === fieldId) {
                result.push(control);
            }
            return result;
        }, []);
    }
    getControlId(fieldId, guid) {
        return `${fieldId}:${guid || this.rxGuidService.generate()}`;
    }
    getFieldId(formControlId) {
        return formControlId.split(':')[0];
    }
    prepareFormGroupState(formStateByFieldId, formGroup) {
        return reduce(formGroup.controls, (result, control, formControlId) => {
            result[formControlId] = formStateByFieldId[this.getFieldId(formControlId)];
            return result;
        }, {});
    }
}
RecordEditorForm.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorForm, deps: [{ token: i1.RxGuidService }, { token: i2.RxRecordInstanceUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RecordEditorForm.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorForm });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorForm, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxGuidService }, { type: i2.RxRecordInstanceUtilsService }]; } });
//# sourceMappingURL=record-editor-form.class.js.map