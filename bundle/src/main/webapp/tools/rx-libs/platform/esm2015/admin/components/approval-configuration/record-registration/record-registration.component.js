import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RxApprovalConfigurationService } from '../approval-configuration.service';
import { cloneDeep, find } from 'lodash';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RxDefinitionPickerScope, RxDefinitionPickerType } from '@helix/platform/shared/components';
import { RX_APPROVAL_CONFIGURATION } from '../approval-configuration.constant';
import { BehaviorSubject, combineLatest, forkJoin, of, ReplaySubject } from 'rxjs';
import { JustificationRequirement, RxDefinitionNameService, RxNotificationService } from '@helix/platform/shared/api';
import { RxFieldDefinitionPickerService } from './field-definition-picker/field-definition-picker.service';
import { finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import { RxRecordGridUtilsService } from '@helix/platform/view/components';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "../approval-configuration.service";
import * as i5 from "@helix/platform/record/api";
import * as i6 from "@helix/platform/view/components";
import * as i7 from "./field-definition-picker/field-definition-picker.service";
import * as i8 from "@bmc-ux/adapt-angular";
import * as i9 from "@helix/platform/shared/components";
import * as i10 from "./field-definition-picker/field-definition-picker.component";
import * as i11 from "@angular/common";
export class RecordRegistrationComponent {
    constructor(formBuilder, changeDetector, translateService, rxDefinitionNameService, rxApprovalConfigurationService, rxRecordDefinitionCacheService, rxRecordInstanceDataPageService, rxNotificationService, rxRecordGridUtilsService, rxFieldDefinitionPickerService) {
        this.formBuilder = formBuilder;
        this.changeDetector = changeDetector;
        this.translateService = translateService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxApprovalConfigurationService = rxApprovalConfigurationService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxFieldDefinitionPickerService = rxFieldDefinitionPickerService;
        this.recordRegistered = new EventEmitter();
        this.recordRegistrationForm = this.createRecordRegistrationForm();
        this.recordDefinitionSecurityLabels = [];
        this.fieldNames = [];
        this.isSaveInProgress = false;
        this.alertConfig = {
            content: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record-registration.info'),
            type: 'inline',
            variant: 'info'
        };
        this.recordDefinitionPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record.definition'),
            definitionType: RxDefinitionPickerType.PublicRegularDataRecord,
            required: true,
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RxDefinitionPickerScope.Rx],
                search: RxDefinitionPickerScope.Rx
            }
        };
        this.permissionTooltip = {
            popoverMode: true,
            iconName: 'question_circle_o',
            placement: 'right',
            content: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record.permissions.tooltip')
        };
        this.justificationTooltip = {
            popoverMode: true,
            iconName: 'question_circle_o',
            placement: 'right',
            content: this.translateService.instant('com.bmc.arsys.rx.client.approval.justification.tooltip')
        };
        this.recordDefinitionName$ = new BehaviorSubject('');
        this.fieldsTree$ = this.recordDefinitionName$.pipe(switchMap((recordDefinitionName) => {
            return recordDefinitionName ? this.rxFieldDefinitionPickerService.getRecordFields(recordDefinitionName) : of([]);
        }));
        this.requesterFieldDefinitionPickerOptions$ = combineLatest([
            this.recordDefinitionName$,
            this.fieldsTree$
        ]).pipe(map(([recordDefinitionName, fieldsTree]) => ({
            recordDefinitionName: recordDefinitionName,
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record.requester'),
            required: true,
            tooltip: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record.requester.tooltip'),
            fieldsTree: fieldsTree
        })));
        this.approverExclusionFieldDefinitionPickerOptions$ = combineLatest([
            this.recordDefinitionName$,
            this.fieldsTree$
        ]).pipe(map(([recordDefinitionName, fieldsTree]) => ({
            recordDefinitionName,
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record.approver-exclusion.label'),
            required: false,
            tooltip: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record.approver-exclusion.tooltip'),
            fieldsTree: fieldsTree
        })));
        this.summaryFieldDefinitionPickerOptions$ = combineLatest([
            this.recordDefinitionName$,
            this.fieldsTree$
        ]).pipe(map(([recordDefinitionName, fieldsTree]) => ({
            recordDefinitionName: recordDefinitionName,
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record.summary'),
            required: true,
            fieldsTree: fieldsTree
        })));
        this.notesFieldDefinitionPickerOptions$ = combineLatest([
            this.recordDefinitionName$,
            this.fieldsTree$
        ]).pipe(map(([recordDefinitionName, fieldsTree]) => ({
            recordDefinitionName: recordDefinitionName,
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record.notes'),
            required: false,
            fieldsTree: fieldsTree
        })));
        this.fieldDefinitionPickerOptions$ = combineLatest([
            this.recordDefinitionName$,
            this.fieldsTree$
        ]).pipe(map(([recordDefinitionName, fieldsTree]) => ({
            recordDefinitionName: recordDefinitionName,
            required: false,
            fieldsTree: fieldsTree
        })));
        this.destroyed$ = new ReplaySubject(1);
        this.isNewConfiguration = true;
    }
    ngOnInit() {
        if (this.isEditMode) {
            this.initializeRecordRegistrationForm();
        }
        this.recordRegistrationForm
            .get('recordDefinition')
            .valueChanges.pipe(takeUntil(this.destroyed$))
            .subscribe((value) => this.onRecordDefinitionChange(value));
        this.recordRegistrationForm
            .get('field3Mapping.fieldID')
            .valueChanges.pipe(takeUntil(this.destroyed$))
            .subscribe((value) => this.onFieldMappingChange('field3Mapping.label', value));
        this.recordRegistrationForm
            .get('field4Mapping.fieldID')
            .valueChanges.pipe(takeUntil(this.destroyed$))
            .subscribe((value) => this.onFieldMappingChange('field4Mapping.label', value));
        this.recordRegistrationForm
            .get('field5Mapping.fieldID')
            .valueChanges.pipe(takeUntil(this.destroyed$))
            .subscribe((value) => this.onFieldMappingChange('field5Mapping.label', value));
        this.recordRegistrationForm
            .get('field6Mapping.fieldID')
            .valueChanges.pipe(takeUntil(this.destroyed$))
            .subscribe((value) => this.onFieldMappingChange('field6Mapping.label', value));
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    createRecordRegistrationForm() {
        return this.formBuilder.group({
            recordDefinition: ['', Validators.required],
            summaryField: ['', Validators.required],
            requestorField: ['', Validators.required],
            approverExclusionField: null,
            permissionsFromSecurityLabels: [[], Validators.nullValidator],
            requestIDField: '',
            notesField: '',
            justificationFieldName: [[], Validators.nullValidator],
            justificationRequired: this.formBuilder.group({
                toApprove: false,
                toReject: false
            }),
            field3Mapping: this.formBuilder.group(this.createAdditionalField()),
            field4Mapping: this.formBuilder.group(this.createAdditionalField()),
            field5Mapping: this.formBuilder.group(this.createAdditionalField()),
            field6Mapping: this.formBuilder.group(this.createAdditionalField())
        });
    }
    initializeRecordRegistrationForm() {
        forkJoin([
            this.rxRecordDefinitionCacheService.getRecordDefinition(this.registeredRecordDefinitionName),
            this.rxApprovalConfigurationService.getRegisteredRecordDetails(this.registeredRecordDefinitionName)
        ]).subscribe(([recordDefinition, registrationRecord]) => {
            this.isNewConfiguration = registrationRecord.isNewConfiguration;
            this.recordDefinition = recordDefinition;
            this.recordRegistrationForm.get('recordDefinition').setValue(registrationRecord.recordDefinition);
            this.recordRegistrationForm.controls['recordDefinition'].disable();
            this.recordRegistrationForm.get('summaryField').setValue(registrationRecord.summaryField);
            this.recordRegistrationForm.get('requestorField').setValue(registrationRecord.requestorField);
            this.recordRegistrationForm.get('requestIDField').setValue(registrationRecord.requestIDField);
            this.recordRegistrationForm.get('notesField').setValue(registrationRecord.notesField);
            this.recordRegistrationForm.get('approverExclusionField').setValue(registrationRecord.approverExclusionField);
            if (registrationRecord.field3Mapping) {
                this.recordRegistrationForm.get('field3Mapping').setValue(registrationRecord.field3Mapping);
            }
            if (registrationRecord.field4Mapping) {
                this.recordRegistrationForm.get('field4Mapping').setValue(registrationRecord.field4Mapping);
            }
            if (registrationRecord.field5Mapping) {
                this.recordRegistrationForm.get('field5Mapping').setValue(registrationRecord.field5Mapping);
            }
            if (registrationRecord.field6Mapping) {
                this.recordRegistrationForm.get('field6Mapping').setValue(registrationRecord.field6Mapping);
            }
            this.recordRegistrationForm
                .get('justificationFieldName')
                .setValue(registrationRecord.justificationFieldName ? [registrationRecord.justificationFieldName] : []);
            this.recordRegistrationForm
                .get('permissionsFromSecurityLabels')
                .setValue(this.getSecurityLabels(registrationRecord));
            this.recordRegistrationForm.get('justificationRequired').setValue({
                toApprove: registrationRecord.justificationRequired === JustificationRequirement.RequiredForApprovalOrRejection ||
                    registrationRecord.justificationRequired === JustificationRequirement.RequiredForApproval,
                toReject: registrationRecord.justificationRequired === JustificationRequirement.RequiredForApprovalOrRejection ||
                    registrationRecord.justificationRequired === JustificationRequirement.RequiredForRejection
            });
        });
    }
    getSecurityLabels(approvalRegistrationRecord) {
        return approvalRegistrationRecord.permissionsFromSecurityLabels.map((parentId) => this.recordDefinition.securityLabels.find((securityLabel) => securityLabel.id === parentId));
    }
    createAdditionalField() {
        return {
            fieldID: '',
            label: ''
        };
    }
    onFieldMappingChange(formControlName, value) {
        if (value && !value.includes('recordContext._associations')) {
            this.recordRegistrationForm.get(formControlName).setValue(value);
        }
        else {
            value
                ? this.setAssociatedRecordFieldLabel(value, formControlName)
                : this.recordRegistrationForm.get(formControlName).setValue('');
        }
    }
    setAssociatedRecordFieldLabel(fieldId, formControlName) {
        this.rxRecordGridUtilsService.getFieldDefinition(fieldId, this.recordDefinition).subscribe((fieldDefinition) => {
            this.recordRegistrationForm.get(formControlName).setValue(fieldDefinition.name);
        });
    }
    onRecordDefinitionChange(newRecordDefinitionName) {
        const oldRecordDefinitionName = this.recordRegistrationForm.value.recordDefinition;
        if (newRecordDefinitionName !== oldRecordDefinitionName) {
            this.reset();
            this.recordDefinitionName$.next(newRecordDefinitionName);
            if (newRecordDefinitionName) {
                this.rxRecordDefinitionCacheService
                    .getRecordDefinition(newRecordDefinitionName)
                    .subscribe((recordDefinition) => {
                    this.recordDefinition = recordDefinition;
                    this.initializeFormControls();
                });
            }
        }
    }
    initializeFormControls() {
        this.recordDefinitionSecurityLabels = cloneDeep(this.recordDefinition.securityLabels);
        this.fieldNames = this.recordDefinition.fieldDefinitions
            ? this.recordDefinition.fieldDefinitions
                .filter((fieldDefinition) => fieldDefinition.resourceType !== RX_RECORD_DEFINITION.resourceTypes.attachment)
                .map((fieldDefinition) => {
                if (fieldDefinition.id === 1) {
                    this.recordRegistrationForm.get('requestIDField').setValue(fieldDefinition.name);
                }
                return fieldDefinition.name;
            })
            : [];
    }
    optionFormatter(securityLabel) {
        return securityLabel.name;
    }
    justificationReasonOptionFormatter(fieldDefinition) {
        return fieldDefinition.name;
    }
    save() {
        this.isSaveInProgress = true;
        if (this.isEditMode) {
            this.updateRecordRegistration();
        }
        else {
            this.saveRecordRegistration();
        }
    }
    canSave() {
        return !this.isSaveInProgress && this.recordRegistrationForm.valid && this.recordRegistrationForm.dirty;
    }
    isFormValid() {
        return this.recordRegistrationForm.valid;
    }
    isFormDirty() {
        return this.recordRegistrationForm.dirty;
    }
    saveRecordRegistration() {
        const registrationRecord = this.transformFormControlData();
        registrationRecord.isNewConfiguration = true;
        this.rxRecordInstanceDataPageService
            .post({
            params: {
                recorddefinition: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.name
            }
        })
            .subscribe((result) => {
            const isRecordRegistered = find(result.data, (record) => record[RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.formName] ===
                registrationRecord.recordDefinition);
            if (!isRecordRegistered) {
                this.rxApprovalConfigurationService
                    .registerRecord(registrationRecord)
                    .pipe(finalize(() => {
                    this.isSaveInProgress = false;
                }))
                    .subscribe(() => {
                    this.isEditMode = true;
                    this.recordRegistrationForm.controls['recordDefinition'].disable();
                    this.recordRegistered.emit(registrationRecord.recordDefinition);
                    this.recordRegistrationForm.markAsPristine();
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record.register.success'));
                });
            }
            else {
                this.isSaveInProgress = false;
                this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record.register.duplicate'));
            }
        });
    }
    updateRecordRegistration() {
        const registrationRecord = this.transformFormControlData();
        registrationRecord.isNewConfiguration = this.isNewConfiguration;
        registrationRecord.recordDefinition = this.recordRegistrationForm.get('recordDefinition').value;
        this.rxApprovalConfigurationService
            .updateRecord(registrationRecord)
            .pipe(finalize(() => {
            this.isSaveInProgress = false;
        }))
            .subscribe(() => {
            this.isEditMode = true;
            this.recordRegistrationForm.markAsPristine();
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record.update', {
                recordDefinitionName: this.rxDefinitionNameService.getDisplayName(registrationRecord.recordDefinition)
            }));
        });
    }
    transformFormControlData() {
        const approvalRecord = cloneDeep(this.recordRegistrationForm.value);
        approvalRecord.justificationFieldName = approvalRecord.justificationFieldName.length
            ? approvalRecord.justificationFieldName.join()
            : null;
        approvalRecord.permissionsFromSecurityLabels = approvalRecord.permissionsFromSecurityLabels
            ? approvalRecord.permissionsFromSecurityLabels.map((securityLabel) => {
                return securityLabel.id;
            })
            : null;
        if (!approvalRecord.permissionsFromSecurityLabels) {
            delete approvalRecord.permissionsFromSecurityLabels;
        }
        if (!approvalRecord.justificationFieldName) {
            delete approvalRecord.justificationFieldName;
        }
        this.updateAdditionalFieldLabel(approvalRecord.field3Mapping);
        this.updateAdditionalFieldLabel(approvalRecord.field4Mapping);
        this.updateAdditionalFieldLabel(approvalRecord.field5Mapping);
        this.updateAdditionalFieldLabel(approvalRecord.field6Mapping);
        if (approvalRecord.justificationRequired.toApprove && approvalRecord.justificationRequired.toReject) {
            approvalRecord.justificationRequired = JustificationRequirement.RequiredForApprovalOrRejection;
        }
        else if (approvalRecord.justificationRequired.toApprove) {
            approvalRecord.justificationRequired = JustificationRequirement.RequiredForApproval;
        }
        else if (approvalRecord.justificationRequired.toReject) {
            approvalRecord.justificationRequired = JustificationRequirement.RequiredForRejection;
        }
        else {
            approvalRecord.justificationRequired = JustificationRequirement.NotRequired;
        }
        return approvalRecord;
    }
    updateAdditionalFieldLabel(fieldMapping) {
        if (fieldMapping.fieldID !== '' &&
            !fieldMapping.fieldID.includes('recordContext._associations') &&
            fieldMapping.label === '') {
            fieldMapping.label = fieldMapping.fieldID;
        }
    }
    reset() {
        this.recordDefinitionSecurityLabels = [];
        this.fieldNames = [];
        this.recordRegistrationForm.get('summaryField').setValue('');
        this.recordRegistrationForm.get('requestorField').setValue('');
        this.recordRegistrationForm.get('approverExclusionField').setValue('');
        this.recordRegistrationForm.get('permissionsFromSecurityLabels').setValue([]);
        this.recordRegistrationForm.get('justificationRequired').setValue({
            toApprove: false,
            toReject: false
        });
        this.recordRegistrationForm.get('justificationFieldName').setValue([]);
        this.recordRegistrationForm.get('requestIDField').setValue('');
        this.recordRegistrationForm.get('notesField').setValue('');
        this.recordRegistrationForm.get('field3Mapping').setValue(this.createAdditionalField());
        this.recordRegistrationForm.get('field4Mapping').setValue(this.createAdditionalField());
        this.recordRegistrationForm.get('field5Mapping').setValue(this.createAdditionalField());
        this.recordRegistrationForm.get('field6Mapping').setValue(this.createAdditionalField());
    }
    handleJustificationField() {
        if (this.recordRegistrationForm.dirty &&
            !this.recordRegistrationForm.get('justificationRequired').value.toApprove &&
            !this.recordRegistrationForm.get('justificationRequired').value.toReject) {
            this.recordRegistrationForm.get('justificationFieldName').setValue([]);
        }
    }
}
RecordRegistrationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordRegistrationComponent, deps: [{ token: i1.FormBuilder }, { token: i0.ChangeDetectorRef }, { token: i2.TranslateService }, { token: i3.RxDefinitionNameService }, { token: i4.RxApprovalConfigurationService }, { token: i5.RxRecordDefinitionCacheService }, { token: i5.RxRecordInstanceDataPageService }, { token: i3.RxNotificationService }, { token: i6.RxRecordGridUtilsService }, { token: i7.RxFieldDefinitionPickerService }], target: i0.ɵɵFactoryTarget.Component });
RecordRegistrationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordRegistrationComponent, selector: "rx-record-registration", inputs: { registeredRecordDefinitionName: "registeredRecordDefinitionName", isEditMode: "isEditMode" }, outputs: { recordRegistered: "recordRegistered" }, ngImport: i0, template: "<adapt-alert [config]=\"alertConfig\"></adapt-alert>\n\n<form [formGroup]=\"recordRegistrationForm\">\n  <div class=\"row\">\n    <div class=\"col-4 form-group\">\n      <rx-definition-picker\n        [options]=\"recordDefinitionPickerOptions\"\n        formControlName=\"recordDefinition\"\n        rx-id=\"definition-field\"\n        required=\"true\"\n      >\n      </rx-definition-picker>\n    </div>\n\n    <div class=\"col-4 form-group\">\n      <rx-field-definition-picker\n        [options]=\"requesterFieldDefinitionPickerOptions$ | async\"\n        formControlName=\"requestorField\"\n        rx-id=\"requester-id-field\"\n      ></rx-field-definition-picker>\n    </div>\n\n    <div class=\"col-4 form-group\">\n      <rx-field-definition-picker\n        [options]=\"approverExclusionFieldDefinitionPickerOptions$ | async\"\n        formControlName=\"approverExclusionField\"\n        rx-id=\"approver-exclusion-field\"\n      ></rx-field-definition-picker>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-4 form-group\">\n      <adapt-rx-select\n        [options]=\"recordDefinitionSecurityLabels\"\n        label=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.record.permissions' | translate }}\"\n        name=\"permissionsFromSecurityLabels\"\n        [optionFormatter]=\"optionFormatter\"\n        [multiple]=\"true\"\n        formControlName=\"permissionsFromSecurityLabels\"\n        [selectAllButton]=\"true\"\n        [deselectAllButton]=\"true\"\n        [disabled]=\"!recordDefinitionSecurityLabels.length\"\n        rx-id=\"permissions-field\"\n        [tooltip]=\"permissionTooltip\"\n      ></adapt-rx-select>\n    </div>\n\n    <div class=\"col-4 form-group\">\n      <adapt-rx-textfield\n        rx-id=\"request-id-field\"\n        label=\"{{ 'com.bmc.arsys.rx.client.approval.console.detail.RequestId' | translate }}\"\n        formControlName=\"requestIDField\"\n        [readonly]=\"true\"\n        [disabledStyleForReadonlyState]=\"true\"\n      >\n      </adapt-rx-textfield>\n    </div>\n\n    <div class=\"col-4 form-group\">\n      <rx-field-definition-picker\n        [options]=\"summaryFieldDefinitionPickerOptions$ | async\"\n        formControlName=\"summaryField\"\n        rx-id=\"summary-field\"\n      ></rx-field-definition-picker>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-4 form-group\">\n      <rx-field-definition-picker\n        [options]=\"notesFieldDefinitionPickerOptions$ | async\"\n        formControlName=\"notesField\"\n        rx-id=\"notes-field\"\n      ></rx-field-definition-picker>\n    </div>\n\n    <div class=\"col-4 form-group\">\n      <adapt-rx-control-label\n        label=\"{{ 'com.bmc.arsys.rx.client.approval.justification.require-on.label' | translate }}\"\n      ></adapt-rx-control-label>\n\n      <div formGroupName=\"justificationRequired\">\n        <adapt-rx-checkbox\n          class=\"checkbox-inline\"\n          formControlName=\"toApprove\"\n          label=\"{{ 'com.bmc.arsys.rx.client.approval.justification.require-on.approval.label' | translate }}\"\n          [disabled]=\"!fieldNames.length\"\n          (ngModelChange)=\"handleJustificationField()\"\n        >\n        </adapt-rx-checkbox>\n\n        <adapt-rx-checkbox\n          class=\"checkbox-inline\"\n          formControlName=\"toReject\"\n          label=\"{{ 'com.bmc.arsys.rx.client.approval.justification.require-on.rejection.label' | translate }}\"\n          [disabled]=\"!fieldNames.length\"\n          (ngModelChange)=\"handleJustificationField()\"\n        >\n        </adapt-rx-checkbox>\n      </div>\n    </div>\n\n    <div class=\"col-4 form-group\">\n      <adapt-rx-select\n        [options]=\"fieldNames\"\n        [emptyOption]=\"true\"\n        label=\"{{ 'com.bmc.arsys.rx.client.approval.justification-reason.label' | translate }}\"\n        formControlName=\"justificationFieldName\"\n        name=\"justificationFieldName\"\n        [selectAllButton]=\"true\"\n        enableFilter=\"true\"\n        closeOnSelect=\"true\"\n        rx-id=\"justification-reason-field\"\n        [deselectAllButton]=\"true\"\n        [disabled]=\"!fieldNames.length\"\n        [tooltip]=\"justificationTooltip\"\n        [required]=\"\n          recordRegistrationForm.get('justificationRequired').value.toApprove ||\n          recordRegistrationForm.get('justificationRequired').value.toReject\n        \"\n      ></adapt-rx-select>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-4\">\n      <adapt-rx-control-label\n        label=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.record.fields' | translate }}\"\n      ></adapt-rx-control-label>\n    </div>\n\n    <div class=\"col-4\">\n      <adapt-rx-control-label\n        label=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.record.fields.labels' | translate }}\"\n      ></adapt-rx-control-label>\n    </div>\n  </div>\n\n  <div class=\"row\" formGroupName=\"field3Mapping\">\n    <div class=\"col-4 form-group\">\n      <rx-field-definition-picker\n        [options]=\"fieldDefinitionPickerOptions$ | async\"\n        formControlName=\"fieldID\"\n        rx-id=\"field3-mapping-field\"\n      ></rx-field-definition-picker>\n    </div>\n\n    <div class=\"col-4 form-group\">\n      <adapt-rx-textfield\n        formControlName=\"label\"\n        name=\"field3MappingLabel\"\n        adaptRequired\n        [disabled]=\"!recordRegistrationForm.get('field3Mapping').get('fieldID').value\"\n      ></adapt-rx-textfield>\n    </div>\n  </div>\n\n  <div class=\"row\" formGroupName=\"field4Mapping\">\n    <div class=\"col-4 form-group\">\n      <rx-field-definition-picker\n        [options]=\"fieldDefinitionPickerOptions$ | async\"\n        formControlName=\"fieldID\"\n        rx-id=\"field4-mapping-field\"\n      ></rx-field-definition-picker>\n    </div>\n\n    <div class=\"col-4 form-group\">\n      <adapt-rx-textfield\n        formControlName=\"label\"\n        name=\"field4MappingLabel\"\n        adaptRequired\n        [disabled]=\"!recordRegistrationForm.get('field4Mapping').get('fieldID').value\"\n      ></adapt-rx-textfield>\n    </div>\n  </div>\n  <div class=\"row\" formGroupName=\"field5Mapping\">\n    <div class=\"col-4 form-group\">\n      <rx-field-definition-picker\n        rx-id=\"field5-mapping-field\"\n        [options]=\"fieldDefinitionPickerOptions$ | async\"\n        formControlName=\"fieldID\"\n      ></rx-field-definition-picker>\n    </div>\n\n    <div class=\"col-4 form-group\">\n      <adapt-rx-textfield\n        formControlName=\"label\"\n        name=\"field5MappingLabel\"\n        adaptRequired\n        [disabled]=\"!recordRegistrationForm.get('field5Mapping').get('fieldID').value\"\n      ></adapt-rx-textfield>\n    </div>\n  </div>\n\n  <div class=\"row\" formGroupName=\"field6Mapping\">\n    <div class=\"col-4 form-group\">\n      <rx-field-definition-picker\n        rx-id=\"field6-mapping-field\"\n        [options]=\"fieldDefinitionPickerOptions$ | async\"\n        formControlName=\"fieldID\"\n      ></rx-field-definition-picker>\n    </div>\n\n    <div class=\"col-4 form-group\">\n      <adapt-rx-textfield\n        formControlName=\"label\"\n        name=\"field6MappingLabel\"\n        adaptRequired\n        [disabled]=\"!recordRegistrationForm.get('field6Mapping').get('fieldID').value\"\n      ></adapt-rx-textfield>\n    </div>\n  </div>\n</form>\n", components: [{ type: i8.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i9.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i10.RxFieldDefinitionPickerComponent, selector: "rx-field-definition-picker", inputs: ["options"] }, { type: i8.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i8.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i8.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i8.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }], pipes: { "async": i11.AsyncPipe, "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordRegistrationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-registration',
                    templateUrl: './record-registration.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }, { type: i3.RxDefinitionNameService }, { type: i4.RxApprovalConfigurationService }, { type: i5.RxRecordDefinitionCacheService }, { type: i5.RxRecordInstanceDataPageService }, { type: i3.RxNotificationService }, { type: i6.RxRecordGridUtilsService }, { type: i7.RxFieldDefinitionPickerService }]; }, propDecorators: { registeredRecordDefinitionName: [{
                type: Input
            }], isEditMode: [{
                type: Input
            }], recordRegistered: [{
                type: Output
            }] } });
//# sourceMappingURL=record-registration.component.js.map