import { AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { RxGuidService } from '@helix/platform/utils';
import { RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RecordEditorFormControl } from './record-editor-form-control.class';
import * as i0 from "@angular/core";
export declare const RecordEditorFormDelimiter = "%";
export declare class RecordEditorForm extends FormGroup {
    private rxGuidService;
    private rxRecordInstanceUtilsService;
    constructor(rxGuidService: RxGuidService, rxRecordInstanceUtilsService: RxRecordInstanceUtilsService);
    addFieldControl(fieldId: string, guid: string, initialValue?: any, validator?: ValidatorFn | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]): FormControl;
    addAssociatedFieldControl(fieldId: string, guid: string, associatedRecordPath: string[], initialValue?: any, validator?: ValidatorFn | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]): FormControl;
    resetFieldControls(formStateByFieldId?: {
        [fieldId: string]: any;
    }, associatedRecordPath?: string[]): void;
    syncFormControlValues(fieldId: string, value: any, associatedFromGroupName?: string, options?: {
        markAsDirty?: boolean;
        markAsTouched?: boolean;
    }): void;
    getFieldIds(associatedRecordPath?: string[]): string[];
    clearAndReset(): void;
    markInvalidControlsAsTouched(): void;
    getFormControl(fieldId: string, guid: string, associatedRecordPath?: string[]): RecordEditorFormControl;
    private getControlsBoundToRecordField;
    private getControlId;
    private getFieldId;
    private prepareFormGroupState;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordEditorForm, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RecordEditorForm>;
}
