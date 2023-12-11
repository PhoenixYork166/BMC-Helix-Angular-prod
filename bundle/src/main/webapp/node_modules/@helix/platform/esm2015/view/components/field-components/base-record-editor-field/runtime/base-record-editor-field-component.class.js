import { HostBinding, Injector, Input, Directive } from '@angular/core';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService } from '@helix/platform/record/api';
import { RX_ADMINISTRATION, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { find, includes, isEqual, isNull, isUndefined, values } from 'lodash';
import { Observable, throwError } from 'rxjs';
import { distinctUntilChanged, filter, pluck, skip, startWith, take, takeUntil } from 'rxjs/operators';
import { RecordEditorMode } from '../../../record-editor/common/record-editor.types';
import * as i0 from "@angular/core";
// tslint:disable-next-line:directive-class-suffix
export class BaseRecordEditorFieldComponent extends BaseViewComponent {
    constructor(injector) {
        super();
        this.injector = injector;
        this.isRequired = false;
        this.isDisabled = false;
        this.translateService = this.injector.get(TranslateService);
        this.api = {
            setProperty: this.setProperty.bind(this)
        };
        this.inReadState = false;
        this.isLoading = true;
        this.validationErrorMessage = null;
    }
    ngOnInit() {
        super.ngOnInit();
        this.notifyPropertyChanged('api', this.api);
        this.configReady$ = this.config.pipe(filter((config) => Boolean(config.api && config.recordDefinition)), takeUntil(this.destroyed$));
        this.recordInstance$ = this.configReady$.pipe(pluck('recordInstance'), distinctUntilChanged(), skip(1), takeUntil(this.destroyed$));
        this.recordInstance$.subscribe(this.subscribeOnConfigValueChange.bind(this));
        this.configReady$.pipe(take(1)).subscribe((config) => {
            this.isLoading = false;
            this.onConfigInitialized(config);
            this.onConfigUpdated(config);
        });
        this.configReady$
            .pipe(skip(1), filter((config) => Boolean(config.recordInstance)), takeUntil(this.destroyed$))
            .subscribe(this.onConfigUpdated.bind(this));
    }
    setFieldValue(value, options = {}) {
        if (!isEqual(value, this.formControl.value)) {
            if (options.markAsDirty !== false) {
                this.formControl.markAsDirty();
            }
            if (options.markAsTouched !== false) {
                this.formControl.markAsTouched();
            }
            this.formControl.setValue(value);
        }
    }
    getFieldValue() {
        var _a;
        return (_a = this.formControl) === null || _a === void 0 ? void 0 : _a.value;
    }
    getDisplayValue() {
        return this.getFieldValue();
    }
    onConfigInitialized(config) {
        this.fieldId = Number(config.fieldId);
        this.fieldDefinition = find(config.recordDefinition.fieldDefinitions, { id: this.fieldId });
        this.isRequired = this.fieldDefinition.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required;
        this.recordEditorApi = config.api;
        this.formControl = this.recordEditorApi.getFieldControl(this.fieldId, this.guid, this.getFieldValidators(), config.associatedRecordPath);
        this.associatedRecordPath = config.associatedRecordPath;
        this.permissionType = this.recordEditorApi.getPermissionType(this.fieldId, this.associatedRecordPath);
        this.subscribeOnConfigValueChange();
        this.formControl.valueChanges.pipe(startWith(this.formControl.value), takeUntil(this.destroyed$)).subscribe(() => {
            this.checkValidation();
            this.updateValidationMessage();
        });
        this.isAlwaysDisabled =
            this.permissionType === RX_RECORD_DEFINITION.fieldPermissionTypes.view ||
                this.injector.get(RxFieldDefinitionService).isSystemField(this.fieldDefinition);
        this.isAlwaysHidden = !this.permissionType;
        const recordEditorMode = config.api.getRecordEditorMode();
        if (Number(config.fieldId) === RX_RECORD_DEFINITION.coreFieldIds.createdBy) {
            const submitterMode = this.injector
                .get(RxSystemConfigurationService)
                .getConfigurationSync('Submitter-Mode');
            this.isAlwaysDisabled =
                this.isAlwaysDisabled ||
                    (recordEditorMode === RecordEditorMode.Edit && submitterMode === RX_ADMINISTRATION.submitterModes.locked);
        }
    }
    onConfigUpdated(config) {
        const isDisabled = this.isAlwaysDisabled || Boolean(config.disabled);
        if (this.isDisabled !== isDisabled) {
            // In order to support accessibility for fields, "disabled" control status will be always "false" and will not
            // be synced with "isDisabled" component property. Field might not be focusable when control is disabled.
            this.isDisabled = isDisabled;
            if (!this.isDisabled) {
                // Update validation status of the control after change "isDisabled" status to false.
                this.formControl.updateValueAndValidity();
            }
            this.checkValidation();
        }
        this.isHidden = this.isAlwaysHidden || Boolean(config.hidden);
        this.label = isUndefined(config.label) ? this.fieldDefinition.name : config.label;
        this.inReadState = Boolean(config.inReadState);
    }
    getFieldValidators() {
        return [];
    }
    getRequiredFieldValidationError() {
        return this.translateService.instant('com.bmc.arsys.rx.client.view-components.validation.required.message');
    }
    getFieldInstanceProp(prop, fieldId = this.fieldId, associatedRecordPath = this.associatedRecordPath) {
        return this.recordEditorApi.getFieldInstanceProp(fieldId, prop, associatedRecordPath);
    }
    setFieldInstanceProp(prop, value, fieldId = this.fieldId, associatedRecordPath = this.associatedRecordPath) {
        this.recordEditorApi.setFieldInstanceProp(fieldId, prop, value, associatedRecordPath);
    }
    setProperty(propertyPath, propertyValue) {
        if (includes(['hidden', 'disabled'], propertyPath)) {
            this.notifyPropertyChanged(propertyPath, propertyValue);
        }
        else {
            return throwError(`Field property ${propertyPath} is not settable.`);
        }
    }
    subscribeOnConfigValueChange() {
        const value$ = this.configReady$.pipe(pluck('value'), 
        // Do not update field value if expression gets evaluated to undefined, e.g when:
        // - expression references a removed view component, or
        // - view component hasn't loaded the data yet
        filter((val) => !isUndefined(val)), distinctUntilChanged(), takeUntil(this.recordInstance$), takeUntil(this.destroyed$));
        value$.pipe(take(1)).subscribe((val) => {
            // Only update field with non empty value on first expression change.
            // At this time we don't know if null is a default value or it was evaluated from expression.
            if (!isNull(val)) {
                this.setFieldValue(val, { markAsTouched: false, markAsDirty: false });
            }
        });
        value$.pipe(skip(1)).subscribe((val) => this.setFieldValue(val));
    }
    checkValidation() {
        if (this.isDisabled && this.formControl.invalid) {
            // Remove errors to make control valid when "isDisabled" status is true.
            this.formControl.setErrors(null);
            this.updateValidationMessage();
        }
    }
    updateValidationMessage() {
        if (this.formControl.errors) {
            if (this.formControl.errors.required) {
                this.formControl.errors.required = this.getRequiredFieldValidationError();
            }
            this.validationErrorMessage = values(this.formControl.errors).join(', ');
        }
        else {
            this.validationErrorMessage = null;
        }
    }
}
BaseRecordEditorFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BaseRecordEditorFieldComponent, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Directive });
BaseRecordEditorFieldComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: BaseRecordEditorFieldComponent, inputs: { config: "config" }, host: { properties: { "class.rx-field-required": "this.isRequired", "class.rx-field-disabled": "this.isDisabled" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BaseRecordEditorFieldComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.Injector }]; }, propDecorators: { isRequired: [{
                type: HostBinding,
                args: ['class.rx-field-required']
            }], isDisabled: [{
                type: HostBinding,
                args: ['class.rx-field-disabled']
            }], config: [{
                type: Input
            }] } });
//# sourceMappingURL=base-record-editor-field-component.class.js.map