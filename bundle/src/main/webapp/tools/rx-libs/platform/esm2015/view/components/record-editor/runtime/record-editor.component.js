import { Component, Inject, Input } from '@angular/core';
import { RX_RECORD_DEFINITION, RxRecordDefinitionService, RxRecordInstanceService, RxRecordInstanceUpdateService, RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RxGlobalEventsService, RxLogService, RxNotificationService } from '@helix/platform/shared/api';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RxStringService } from '@helix/platform/utils';
import { BaseViewComponent, RuntimeViewModelApi } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { compact, forEach, get, includes, isEmpty, isEqual, isNil, set, values } from 'lodash';
import { asapScheduler, asyncScheduler, defer, EMPTY, from, merge, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, filter, finalize, map, observeOn, pluck, switchMap, switchMapTo, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { RxRecordEditorUtilsService } from '../common/record-editor-utils.service';
import { RecordEditorMode, RecordEditorState } from '../common/record-editor.types';
import { RxAssociationManagerService } from './association-manager.class';
import { RecordEditorForm, RecordEditorFormDelimiter } from './record-editor-form.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "../common/record-editor-utils.service";
import * as i5 from "@helix/platform/utils";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "./record-editor-form.class";
import * as i8 from "@bmc-ux/adapt-angular";
import * as i9 from "@helix/platform/view/runtime";
import * as i10 from "@angular/common";
export class RecordEditorComponent extends BaseViewComponent {
    constructor(rxRecordInstanceService, rxRecordInstanceUpdateService, translateService, rxGlobalEventsService, rxNotificationService, rxRecordDefinitionService, rxRecordEditorUtilsService, rxRecordInstanceUtilsService, rxStringService, rxLogService, rxUtilityModalsService, recordEditorForm, rxAssociationManagerServiceFactory) {
        super();
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxRecordInstanceUpdateService = rxRecordInstanceUpdateService;
        this.translateService = translateService;
        this.rxGlobalEventsService = rxGlobalEventsService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxRecordEditorUtilsService = rxRecordEditorUtilsService;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
        this.rxStringService = rxStringService;
        this.rxLogService = rxLogService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxAssociationManagerServiceFactory = rxAssociationManagerServiceFactory;
        this.api = {
            refresh: this.refresh.bind(this),
            isDirty: this.isDirty.bind(this),
            isReady: this.isReady.bind(this),
            isValid: this.isValid.bind(this),
            notifyComponentReady: this.notifyComponentReady.bind(this),
            save: this.save.bind(this),
            setProperty: this.setProperty.bind(this),
            setFieldValue: this.setFieldValue.bind(this),
            getFieldValue: this.getFieldValue.bind(this),
            getAssociationManager: this.getAssociationManager.bind(this),
            getFieldControl: this.getFieldControl.bind(this),
            downloadAttachment: this.downloadAttachment.bind(this),
            getAttachmentDownloadUrl: this.getAttachmentDownloadUrl.bind(this),
            getPermissionType: this.getPermissionType.bind(this),
            getFieldInstanceProp: this.getFieldInstanceProp.bind(this),
            getRecordEditorMode: this.getRecordEditorMode.bind(this),
            setFieldInstanceProp: this.setFieldInstanceProp.bind(this),
            markAsDirty: this.markAsDirty.bind(this)
        };
        this.state = {
            recordInstanceId: '',
            recordDefinitionName: '',
            recordInstance: null,
            recordDefinition: null,
            isDataLoading: false,
            isDirty: false,
            isSaving: false,
            canSave: false,
            mode: null,
            isReadOnlyStateAvailable: false,
            defaultState: null,
            currentState: RecordEditorState.Edit,
            form: null,
            selectionFieldOptionNamesById: {},
            allowEdit: null
        };
        this.recordInstanceChangedSubject = new Subject();
        this.notReadyComponentIds = {};
        this.associationManagers = {};
        this.associationInstances = {};
        this.recordInstanceChanged$ = this.recordInstanceChangedSubject.asObservable();
        this.state.form = recordEditorForm;
        this.state.form.statusChanges.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe(() => {
            this.notifyPropertyChanged('isValid', this.isValid());
        });
    }
    ngOnInit() {
        super.ngOnInit();
        this.notifyPropertyChanged('api', this.api);
        this.notifyPropertyChanged('isDirty', this.state.isDirty);
        this.notifyPropertyChanged('canSave', this.state.canSave);
        const config$ = this.config.pipe(distinctUntilChanged(isEqual), tap((config) => Object.assign(this.state, config)));
        config$.pipe(take(1)).subscribe((config) => {
            if (config.mode === RecordEditorMode.Create) {
                this.notifyPropertyChanged('inReadState', false);
            }
            else if (config.mode === RecordEditorMode.Temporary) {
                this.notifyPropertyChanged('inReadState', false);
                this.updateCanSaveProperty();
            }
            else if (this.state.defaultState) {
                this.state.isReadOnlyStateAvailable = true;
            }
        });
        merge(config$.pipe(takeWhile((config) => config.mode === RecordEditorMode.Edit)), config$.pipe(takeWhile((config) => includes([RecordEditorMode.Create, RecordEditorMode.BulkEdit, RecordEditorMode.Temporary], config.mode)), take(1)))
            .pipe(map((config) => config.recordInstanceId || null), distinctUntilChanged(), switchMap(() => this.initializeRecordInstance().pipe(catchError((error) => {
            if (this.rxRecordInstanceUtilsService.isNoRecordFoundError(error)) {
                this.runtimeViewModelApi.cancel(true).subscribe();
            }
            return throwError(error);
        }))), takeUntil(this.destroyed$))
            .subscribe();
        config$
            .pipe(takeWhile((config) => config.mode === RecordEditorMode.Edit), pluck('allowEdit'), distinctUntilChanged(), takeUntil(this.destroyed$))
            .subscribe((allowEdit) => {
            const state = allowEdit ? this.state.defaultState || RecordEditorState.Edit : RecordEditorState.Read;
            this.setRecordEditorState(state);
        });
    }
    downloadAttachment(fieldId) {
        if (this.isInEditMode() && !this.isNewAttachment(fieldId)) {
            this.rxRecordInstanceService.downloadAttachment(this.state.recordDefinitionName, fieldId, this.state.recordInstanceId, this.state.recordInstance.fieldInstances[fieldId].value);
        }
    }
    getAttachmentDownloadUrl(fieldId) {
        let attachmentDownloadUrl = '';
        if (this.isInEditMode() && !this.isNewAttachment(fieldId)) {
            attachmentDownloadUrl = this.rxRecordInstanceService.getAttachmentDownloadUrl(this.state.recordDefinitionName, fieldId, this.state.recordInstanceId);
        }
        return attachmentDownloadUrl;
    }
    getAssociationManager(options) {
        // Custom roles config:
        // {
        //   useDefaultRoles: 'false',
        //   nodeARole: 'CustomA',
        //   nodeBRole: 'CustomB'
        // }
        // will be converted to 'false_CustomA_CustomB'
        // Default roles config (node roles are null) will be converted to 'true__'
        // Empty roles config will be converted to an empty string
        const rolesConfigValues = values(options.rolesConfig).join('_');
        const associationManagerKey = compact([
            options.associationDefinitionName,
            rolesConfigValues,
            options.associatedRecordNodeSide
        ]).join(':');
        let associationManager = this.associationManagers[associationManagerKey];
        if (!associationManager) {
            options.associationInstances = this.getAssociationInstances(options.associationDefinitionName, options.associatedRecordNodeSide, rolesConfigValues);
            associationManager = this.rxAssociationManagerServiceFactory(options);
            merge(associationManager.pending$, associationManager.existing$)
                .pipe(filter(() => associationManager.deleted.length !== 0 || associationManager.pending.length !== 0), take(1))
                .subscribe(() => this.markAsDirty());
            associationManager.extensions$
                .pipe(
            // Extensions will be an empty array on first emit as initial value and
            // when no extension containers are used in the record editor.
            filter((extensions) => !isEmpty(extensions)), takeUntil(this.destroyed$))
                .subscribe(() => {
                this.syncRecordInstanceWithForm(options.associatedRecordPath);
                this.notifyPropertyChanged('recordInstance', this.state.recordInstance);
            });
            this.associationManagers[associationManagerKey] = associationManager;
        }
        else {
            associationManager.extendOptions(options);
        }
        return associationManager;
    }
    markAsDirty() {
        this.state.form.markAsTouched();
        this.state.form.markAsDirty();
        this.updateIsDirtyProperty();
        this.updateCanSaveProperty();
    }
    refresh() {
        if (this.isInEditMode() && this.state.currentState === RecordEditorState.Read) {
            return this.initializeRecordInstance().pipe(catchError((error) => this.handleNoRecordFoundError(error)));
        }
        else {
            return EMPTY;
        }
    }
    isDirty() {
        return this.isInTemporaryMode() ? false : this.state.form.dirty;
    }
    isReady() {
        return isEmpty(this.notReadyComponentIds);
    }
    notifyComponentReady(componentId, isReady) {
        if (isReady) {
            delete this.notReadyComponentIds[componentId];
        }
        else {
            this.notReadyComponentIds[componentId] = true;
        }
    }
    setProperty(propertyPath, propertyValue) {
        const matchFieldInstanceId = propertyPath.match(/^recordInstance\.fieldInstances\.(\d+)\.value$/);
        const shouldSwitchToReadState = (propertyPath === 'readState' && propertyValue) || (propertyPath === 'editState' && !propertyValue);
        const shouldSwitchToEditState = (propertyPath === 'readState' && !propertyValue) || (propertyPath === 'editState' && propertyValue);
        if (shouldSwitchToReadState) {
            if (this.state.currentState !== RecordEditorState.Read) {
                return this.cancel();
            }
        }
        else if (shouldSwitchToEditState) {
            if (this.state.currentState !== RecordEditorState.Edit) {
                this.switchToEditState();
            }
        }
        else if (matchFieldInstanceId) {
            const fieldId = Number(matchFieldInstanceId[1]);
            this.setFieldValue(fieldId, propertyValue);
        }
        else {
            return throwError(`Record editor: property ${propertyPath} is not settable.`);
        }
    }
    setFieldValue(fieldId, value, associatedRecordPath, options = {}) {
        if (this.state.recordInstance &&
            this.state.recordInstance.getRecordInstance(associatedRecordPath) &&
            this.state.recordInstance.isFieldValueChanged(fieldId, value, associatedRecordPath)) {
            this.state.recordInstance.setFieldValue(fieldId, value, associatedRecordPath);
            this.state.form.syncFormControlValues(String(fieldId), this.state.recordInstance.getFieldValue(fieldId, associatedRecordPath), associatedRecordPath && associatedRecordPath.join(RecordEditorFormDelimiter), options);
            this.updateSelectionFieldOptionNames(this.state.recordInstance);
            this.notifyPropertyChanged('recordInstance', this.state.recordInstance);
            this.updateIsDirtyProperty();
            this.updateCanSaveProperty();
        }
    }
    getFieldValue(fieldId, associatedRecordPath) {
        return this.state.recordInstance && this.state.recordInstance.getFieldValue(fieldId, associatedRecordPath);
    }
    save(closeViewAfterSave = false) {
        if (this.isInTemporaryMode()) {
            this.rxLogService.debug('Record Editor: skip saving record instance in Temporary mode.');
            return EMPTY;
        }
        else if (!this.isValid()) {
            this.state.form.markInvalidControlsAsTouched();
            this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-editor.validation-error.message'));
            return throwError(null);
        }
        else if (this.canSave()) {
            let savingObservable$;
            this.state.isSaving = true;
            this.updateCanSaveProperty();
            if (this.isInCreateMode()) {
                savingObservable$ = this.rxRecordInstanceService.create(this.state.recordInstance).pipe(tap((recordInstance) => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.common.saved-successfully.message'));
                    if (!this.state.recordInstanceId) {
                        set(this.state.recordInstance, `fieldInstances[${RX_RECORD_DEFINITION.coreFieldIds.id}].value`, recordInstance.id);
                        this.state.recordInstance.id = recordInstance.id;
                        this.state.recordInstanceId = recordInstance.id;
                    }
                    this.notifyPropertyChanged('recordInstance', this.state.recordInstance);
                    this.notifyPropertyChanged('recordInstanceId', this.state.recordInstanceId);
                    if (!closeViewAfterSave) {
                        this.rxGlobalEventsService.viewActionsCompleted$
                            .pipe(take(1), switchMap(() => this.initializeRecordInstance()), takeUntil(this.destroyed$))
                            .subscribe();
                    }
                }), switchMapTo(EMPTY));
            }
            else if (this.isInEditMode()) {
                savingObservable$ = this.rxRecordInstanceUpdateService.execute(this.state.recordInstance).pipe(tap(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.common.saved-successfully.message'));
                }), switchMap(() => {
                    return this.initializeRecordInstance().pipe(catchError((error) => this.handleNoRecordFoundError(error)), tap({
                        complete: () => {
                            if (this.state.isReadOnlyStateAvailable) {
                                this.setRecordEditorState(RecordEditorState.Read);
                            }
                        }
                    }));
                }));
            }
            return savingObservable$.pipe(tap({
                complete: () => {
                    // Mark record editor form as pristine due to:
                    // - prevent showing dirty state confirmation dialog when any action after
                    // the save will close current view e.g open view in the same window action.
                    // - we don't have to wait until all extension containers data will be loaded
                    // to reset record editor form while synchronization.
                    this.state.form.markAsPristine();
                }
            }), finalize(() => {
                this.state.isSaving = false;
                this.updateCanSaveProperty();
                this.updateIsDirtyProperty();
            }));
        }
        else {
            this.rxLogService.debug('Record Editor: cannot save unmodified record instance.');
            return throwError(null);
        }
    }
    getFieldControl(fieldId, guid, validator = [], associatedRecordPath) {
        const existingControl = this.state.form.getFormControl(String(fieldId), guid, associatedRecordPath);
        if (existingControl) {
            return existingControl;
        }
        const initialValue = this.state.recordInstance
            ? this.state.recordInstance.getFieldValue(fieldId, associatedRecordPath)
            : null;
        const recordInstanceValidator = this.getFieldInstanceControlValidator(fieldId, associatedRecordPath);
        validator = Array.isArray(validator) ? validator : [validator];
        validator.push(recordInstanceValidator);
        let formControl;
        if (associatedRecordPath) {
            formControl = this.state.form.addAssociatedFieldControl(String(fieldId), guid, associatedRecordPath, initialValue, validator);
        }
        else {
            formControl = this.state.form.addFieldControl(String(fieldId), guid, initialValue, validator);
        }
        formControl.valueChanges
            .pipe(distinctUntilChanged(this.rxRecordInstanceUtilsService.isFieldValueEqual), 
        // Use asyncScheduler to allow all observers to be notified about the original (non-normalized) field value change,
        // before the value gets normalized by `this.setFieldValue` call in the subscription below.
        // This resolves an issue where the subscriptions were executed with the normalized value first, followed by
        // non-normalized value.
        // In the example below, the actual form control value is already normalized but valueChange observer
        // receives a non-normalized value.
        // formControl.valueChange.subscribe(nonNormalizedValue => formControl.value !== nonNormalizedValue);
        observeOn(asyncScheduler), takeUntil(this.destroyed$))
            .subscribe(() => {
            // Use formControl.value instead of the emitted value that comes asynchronously
            // and may be different than the actual value, e.g. when user types quickly
            this.setFieldValue(fieldId, formControl.value, associatedRecordPath, {
                markAsDirty: formControl.dirty,
                markAsTouched: false
            });
        });
        return formControl;
    }
    getPermissionType(fieldId, associatedRecordPath) {
        const fieldInstance = this.state.recordInstance
            ? this.state.recordInstance.getFieldInstance(fieldId, associatedRecordPath)
            : null;
        if (fieldInstance) {
            return get(fieldInstance, 'permissionType') || RX_RECORD_DEFINITION.fieldPermissionTypes.change;
        }
        else {
            return null;
        }
    }
    getFieldInstanceProp(fieldId, prop, associatedRecordPath) {
        return this.state.recordInstance && this.state.recordInstance.getFieldProp(fieldId, prop, associatedRecordPath);
    }
    getRecordEditorMode() {
        return this.state.mode;
    }
    setFieldInstanceProp(fieldId, prop, value, associatedRecordPath) {
        if (this.state.recordInstance) {
            this.state.recordInstance.setFieldProp(fieldId, prop, value, associatedRecordPath);
        }
    }
    isValid() {
        return this.state.form.valid;
    }
    switchToEditState() {
        this.setRecordEditorState(RecordEditorState.Edit);
    }
    isEditStateAvailable() {
        return (this.state.isReadOnlyStateAvailable &&
            this.state.currentState === RecordEditorState.Read &&
            Boolean(this.state.recordInstanceId) &&
            Boolean(this.state.allowEdit));
    }
    isSaveButtonAvailable() {
        return this.state.isReadOnlyStateAvailable && this.state.currentState === RecordEditorState.Edit;
    }
    isSaveButtonDisabled() {
        return !this.canSave();
    }
    isCancelButtonAvailable() {
        return (this.state.isReadOnlyStateAvailable && this.state.currentState === RecordEditorState.Edit && this.isInEditMode());
    }
    cancel() {
        if (this.state.isReadOnlyStateAvailable && this.state.recordInstance) {
            if (this.isDirty()) {
                return defer(() => from(this.rxUtilityModalsService.confirmUnsavedChanges())).pipe(switchMap((isConfirmed) => {
                    if (isConfirmed) {
                        this.restoreRecordEditor();
                        this.setRecordEditorState(RecordEditorState.Read);
                        return EMPTY;
                    }
                    else {
                        return throwError(null);
                    }
                }));
            }
            else {
                this.setRecordEditorState(RecordEditorState.Read);
            }
        }
        return EMPTY;
    }
    canSave() {
        return this.isInTemporaryMode() ? true : !this.state.isSaving && (this.isInCreateMode() || this.isDirty());
    }
    isConfigValid() {
        return this.isInEditMode() ? this.rxStringService.isNonEmptyString(this.state.recordInstanceId) : true;
    }
    onSaveClick() {
        this.save()
            .pipe(take(1), catchError((error) => (error === null ? of(error) : throwError(error))))
            .subscribe();
    }
    onCancelClick() {
        this.cancel().subscribe();
    }
    initializeRecordInstance() {
        let initialize$ = EMPTY;
        if (this.isConfigValid()) {
            this.state.isDataLoading = true;
            initialize$ = this.getRecordInstance().pipe(tap((recordInstance) => {
                this.setRecordInstance(recordInstance);
                this.setRecordDefinition(recordInstance.recordDefinition);
                this.updateSelectionFieldOptionNames(recordInstance);
            }), switchMapTo(EMPTY), catchError((error) => {
                // delay record instance id update to allow throwing an error.
                asapScheduler.schedule(() => {
                    this.setRecordInstance(null);
                    this.setRecordDefinition(null);
                });
                return throwError(error);
            }), finalize(() => {
                this.state.isDataLoading = false;
            }));
        }
        else {
            if (this.state.recordInstanceId !== '' && !isNil(this.state.recordInstanceId)) {
                this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-editor.invalid-record-instance-id.message'));
            }
            if (this.state.recordInstance) {
                this.setRecordInstance(null);
                this.setRecordDefinition(null);
            }
        }
        return initialize$;
    }
    handleNoRecordFoundError(error) {
        const isNoRecordFoundError = this.rxRecordInstanceUtilsService.isNoRecordFoundError(error);
        if (isNoRecordFoundError) {
            this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-editor.no-access-to-record.message'));
            this.runtimeViewModelApi.cancel(true).subscribe();
        }
        return throwError(isNoRecordFoundError ? null : error);
    }
    updateIsDirtyProperty() {
        const isDirty = this.isDirty();
        if (this.state.isDirty !== isDirty) {
            this.state.isDirty = isDirty;
            this.notifyPropertyChanged('isDirty', isDirty);
        }
    }
    updateCanSaveProperty() {
        const canSave = this.canSave();
        if (this.state.canSave !== canSave) {
            this.state.canSave = canSave;
            this.notifyPropertyChanged('canSave', canSave);
        }
    }
    setRecordInstance(recordInstance) {
        forEach(this.associationManagers, (manager) => manager.destroy());
        this.associationInstances = {};
        this.associationManagers = {};
        if (recordInstance && !recordInstance.associationInstances) {
            recordInstance.associationInstances = {};
            this.associationInstances = recordInstance.associationInstances;
        }
        this.state.recordInstance = recordInstance;
        this.state.recordInstanceId = recordInstance && recordInstance.id;
        recordInstance ? this.syncRecordInstanceWithForm() : this.state.form.clearAndReset();
        this.notifyPropertyChanged('recordInstance', this.state.recordInstance);
        this.notifyPropertyChanged('recordInstanceId', this.state.recordInstanceId);
        this.updateIsDirtyProperty();
        this.updateCanSaveProperty();
        if (recordInstance) {
            this.recordInstanceChangedSubject.next();
        }
    }
    getFieldInstanceControlValidator(fieldId, associatedRecordPath) {
        return (control) => this.state.recordInstance &&
            this.state.recordInstance.validateSingleField(fieldId, control.value, associatedRecordPath);
    }
    setRecordDefinition(recordDefinition) {
        if (recordDefinition) {
            if (this.isInBulkEditMode()) {
                recordDefinition = this.rxRecordDefinitionService.setFieldDefinitionsToOptional(recordDefinition);
            }
            recordDefinition.fieldDefinitionsById =
                this.rxRecordDefinitionService.buildFieldDefinitionsByIdMap(recordDefinition);
        }
        this.state.recordDefinition = recordDefinition;
        this.notifyPropertyChanged('recordDefinition', this.state.recordDefinition);
    }
    getRecordInstance() {
        if (this.isInCreateMode() || this.isInTemporaryMode()) {
            if (this.state.recordInstance) {
                this.state.recordInstance = this.state.recordInstance.getOriginalRecordInstance();
                return of(this.state.recordInstance);
            }
            else {
                return this.rxRecordInstanceService.getNew(this.state.recordDefinitionName);
            }
        }
        else if (this.isInBulkEditMode()) {
            return this.rxRecordInstanceService.getEmpty(this.state.recordDefinitionName);
        }
        else if (this.isInEditMode()) {
            return this.rxRecordInstanceService.get(this.state.recordDefinitionName, this.state.recordInstanceId);
        }
    }
    getAssociationInstances(associationDefinitionName, nodeSide, rolesConfigKey) {
        const nodeSideRolesConfigKey = compact([nodeSide, rolesConfigKey]).join(':');
        let associationRecords = get(this.associationInstances, [
            associationDefinitionName,
            nodeSideRolesConfigKey
        ]);
        if (!associationRecords) {
            associationRecords = {
                existing: [],
                pending: [],
                deleted: [],
                extensions: []
            };
            set(this.associationInstances, [associationDefinitionName, nodeSideRolesConfigKey], associationRecords);
        }
        return associationRecords;
    }
    setRecordEditorState(state) {
        this.state.currentState = state;
        this.notifyPropertyChanged('inReadState', state === RecordEditorState.Read);
    }
    isInCreateMode() {
        return this.state.mode === RecordEditorMode.Create;
    }
    isInBulkEditMode() {
        return this.state.mode === RecordEditorMode.BulkEdit;
    }
    isInEditMode() {
        return this.state.mode === RecordEditorMode.Edit;
    }
    isInTemporaryMode() {
        return this.state.mode === RecordEditorMode.Temporary;
    }
    isNewAttachment(fieldId) {
        return Boolean(this.state.recordInstance.fieldInstances[fieldId].file);
    }
    updateSelectionFieldOptionNames(recordInstance) {
        if (recordInstance && get(this.state.recordDefinition, 'fieldDefinitions')) {
            const newSelectionFieldOptionNames = this.rxRecordEditorUtilsService.getSelectionFieldOptionNames(this.state.recordDefinition, recordInstance);
            if (!isEqual(this.state.selectionFieldOptionNamesById, newSelectionFieldOptionNames)) {
                this.notifyPropertyChanged('selectionFieldOptionNamesById', newSelectionFieldOptionNames);
            }
        }
    }
    syncRecordInstanceWithForm(associatedRecordPath) {
        const fieldIds = this.state.form.getFieldIds(associatedRecordPath);
        if (!isEmpty(fieldIds)) {
            const formStateByFieldId = fieldIds.reduce((result, fieldId) => {
                result[fieldId] = this.state.recordInstance.getFieldValue(Number(fieldId), associatedRecordPath);
                return result;
            }, {});
            this.state.form.resetFieldControls(formStateByFieldId, associatedRecordPath);
        }
    }
    restoreRecordEditor() {
        this.state.recordInstance.revertFieldInstances();
        forEach(this.associationManagers, (manager) => manager.restore());
        this.syncRecordInstanceWithForm();
        this.notifyPropertyChanged('recordInstance', this.state.recordInstance);
        this.updateIsDirtyProperty();
        this.updateCanSaveProperty();
    }
}
RecordEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorComponent, deps: [{ token: i1.RxRecordInstanceService }, { token: i1.RxRecordInstanceUpdateService }, { token: i2.TranslateService }, { token: i3.RxGlobalEventsService }, { token: i3.RxNotificationService }, { token: i1.RxRecordDefinitionService }, { token: i4.RxRecordEditorUtilsService }, { token: i1.RxRecordInstanceUtilsService }, { token: i5.RxStringService }, { token: i3.RxLogService }, { token: i6.RxUtilityModalsService }, { token: i7.RecordEditorForm }, { token: RxAssociationManagerService }], target: i0.ɵɵFactoryTarget.Component });
RecordEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordEditorComponent, selector: "rx-record-editor", inputs: { config: "config", runtimeViewModelApi: "runtimeViewModelApi" }, providers: [RecordEditorForm], usesInheritance: true, ngImport: i0, template: "<div class=\"loader-container\" *ngIf=\"state.isDataLoading && !state.recordInstance\">\n  <div class=\"loader-inline mr-1\"></div>\n  <span>{{ 'com.bmc.arsys.rx.client.common.loading-data' | translate }}</span>\n</div>\n\n<div *ngIf=\"!state.isDataLoading && (!isConfigValid() || !state.recordInstance)\">\n  {{ 'com.bmc.arsys.rx.client.view-components.record-editor.invalid-record.message' | translate }}\n</div>\n\n<div *ngIf=\"state.recordInstance && isConfigValid()\" class=\"clearfix\">\n  <div class=\"d-flex justify-content-end\">\n    <button\n      *ngIf=\"isEditStateAvailable()\"\n      class=\"py-0 mb-1\"\n      adapt-button\n      size=\"small\"\n      btn-type=\"tertiary\"\n      (click)=\"switchToEditState()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.edit.label' | translate }}\n    </button>\n  </div>\n\n  <rx-runtime-view-canvas-outlet></rx-runtime-view-canvas-outlet>\n\n  <button\n    *ngIf=\"isSaveButtonAvailable()\"\n    class=\"mr-1 mt-3\"\n    rx-id=\"save-button\"\n    adapt-button\n    btn-type=\"primary\"\n    size=\"small\"\n    [disabled]=\"isSaveButtonDisabled()\"\n    (click)=\"onSaveClick()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    *ngIf=\"isCancelButtonAvailable()\"\n    class=\"mt-3\"\n    rx-id=\"cancel-button\"\n    adapt-button\n    btn-type=\"secondary\"\n    size=\"small\"\n    (click)=\"onCancelClick()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;border:1px solid #d6d7d8;padding:1rem;position:relative}\n"], components: [{ type: i8.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9.RuntimeViewCanvasOutletComponent, selector: "rx-runtime-view-canvas-outlet", inputs: ["name"] }], directives: [{ type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-editor',
                    templateUrl: './record-editor.component.html',
                    styleUrls: ['record-editor.component.scss'],
                    providers: [RecordEditorForm]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceService }, { type: i1.RxRecordInstanceUpdateService }, { type: i2.TranslateService }, { type: i3.RxGlobalEventsService }, { type: i3.RxNotificationService }, { type: i1.RxRecordDefinitionService }, { type: i4.RxRecordEditorUtilsService }, { type: i1.RxRecordInstanceUtilsService }, { type: i5.RxStringService }, { type: i3.RxLogService }, { type: i6.RxUtilityModalsService }, { type: i7.RecordEditorForm }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [RxAssociationManagerService]
                }] }]; }, propDecorators: { config: [{
                type: Input
            }], runtimeViewModelApi: [{
                type: Input
            }] } });
//# sourceMappingURL=record-editor.component.js.map