import { Injector, OnInit } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { IFieldDefinition, IRecordInstance } from '@helix/platform/record/api';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IRecordEditorApi } from '../../../record-editor/runtime/record-editor.types';
import { IBaseRecordEditorFieldComponentConfig } from './base-record-editor-field-component.types';
import { RecordEditorFormControl } from '../../../record-editor/runtime/record-editor-form-control.class';
import * as i0 from "@angular/core";
export declare abstract class BaseRecordEditorFieldComponent extends BaseViewComponent implements OnInit {
    private injector;
    isRequired: boolean;
    isDisabled: boolean;
    translateService: TranslateService;
    api: {
        setProperty: any;
    };
    constructor(injector: Injector);
    config: Observable<IBaseRecordEditorFieldComponentConfig>;
    private configReady$;
    protected recordInstance$: Observable<IRecordInstance>;
    private isAlwaysDisabled;
    private isAlwaysHidden;
    inReadState: boolean;
    fieldDefinition: IFieldDefinition;
    fieldId: number;
    label: string;
    recordEditorApi: IRecordEditorApi;
    isLoading: boolean;
    validationErrorMessage: string;
    permissionType: string;
    associatedRecordPath: string[];
    formControl: RecordEditorFormControl;
    ngOnInit(): void;
    setFieldValue(value: any, options?: {
        markAsDirty?: boolean;
        markAsTouched?: boolean;
    }): void;
    getFieldValue(): any;
    getDisplayValue(): any;
    onConfigInitialized(config: IBaseRecordEditorFieldComponentConfig): void;
    onConfigUpdated(config: IBaseRecordEditorFieldComponentConfig): void;
    getFieldValidators(): ValidatorFn[];
    getRequiredFieldValidationError(): string;
    getFieldInstanceProp(prop: string, fieldId?: number, associatedRecordPath?: string[]): any;
    setFieldInstanceProp(prop: string, value: any, fieldId?: number, associatedRecordPath?: string[]): void;
    setProperty(propertyPath: string, propertyValue: any): void | Observable<never>;
    private subscribeOnConfigValueChange;
    private checkValidation;
    private updateValidationMessage;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseRecordEditorFieldComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseRecordEditorFieldComponent, never, never, { "config": "config"; }, {}, never>;
}
