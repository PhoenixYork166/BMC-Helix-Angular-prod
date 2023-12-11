import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ChangeDetectionStrategy, Input, Output, ViewChild, NgModule } from '@angular/core';
import * as i9 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$1 from '@angular/router';
import * as i3 from '@helix/platform/shared/api';
import { Tooltip, RX_APPLICATION, RxDefinitionNamePipe } from '@helix/platform/shared/api';
import * as i3$1 from '@helix/platform/ui-kit';
import { ValidationIssueType, RxValidationIssuesModule } from '@helix/platform/ui-kit';
import * as i5 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import * as i10 from '@angular/forms';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i4 from '@helix/platform/association/api';
import { RX_ASSOCIATION_DEFINITION, RxModalityType, RxCardinalityType, RxAssociationPipesModule, RxAssociationCardinalityPipe } from '@helix/platform/association/api';
import * as i2 from '@helix/platform/record/api';
import { RX_RECORD_DEFINITION, RecordFieldOption } from '@helix/platform/record/api';
import * as i6 from '@helix/platform/shared/components';
import { RxDefinitionPickerScope, RxDefinitionPickerType, RX_REVERT_CUSTOMIZATION, RxDesignerHeaderModule, RxDefinitionPickerModule, CustomizationOptionsModule, RxRevertCustomizationModule } from '@helix/platform/shared/components';
import * as i1 from '@ngrx/store';
import { createAction, props, createFeatureSelector, createSelector, createReducer, on, StoreModule } from '@ngrx/store';
import { find, some, isEqual, isEmpty, trim, reject, cloneDeep, last } from 'lodash';
import { ReplaySubject, BehaviorSubject, combineLatest, of, forkJoin } from 'rxjs';
import { map, switchMap, tap, shareReplay, filter, withLatestFrom, startWith, takeUntil, distinctUntilChanged, skip, take, catchError } from 'rxjs/operators';
import * as i7 from '@bmc-ux/adapt-angular';
import { AdaptSidebarModule, AdaptTabsModule, AdaptRxFormsModule, AdaptCodeViewerModule } from '@bmc-ux/adapt-angular';
import * as i2$1 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';

class AssociationDesignerService {
    constructor(rxDefinitionNameService, rxRecordDefinitionService, rxRecordDefinitionCacheService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
    }
    getDefinitionModelFromDefinition(definition) {
        return {
            cardinality: [find(Object.values(RX_ASSOCIATION_DEFINITION.cardinality), { value: definition.cardinality })],
            customizationOptions: {
                scope: definition.scope,
                allowOverlay: definition.allowOverlay
            },
            description: definition.description,
            guid: definition.guid,
            isEnabled: definition.isEnabled,
            lastChangedBy: definition.lastChangedBy,
            lastUpdateTime: definition.lastUpdateTime,
            name: definition.name,
            nodeAId: definition.nodeAId,
            nodeAKeys: definition.nodeAKeys,
            nodeAModality: definition.nodeAModality,
            nodeAName: definition.nodeAName,
            nodeBId: definition.nodeBId,
            nodeBKeys: definition.nodeBKeys,
            nodeBName: definition.nodeBName,
            overlayDescriptor: definition.overlayDescriptor,
            overlayGroupId: definition.overlayGroupId,
            shouldCascadeDelete: definition.shouldCascadeDelete,
            tags: definition.tags
        };
    }
    getDefinitionFromDefinitionModel(model) {
        return {
            allowOverlay: model.customizationOptions.allowOverlay,
            cardinality: model.cardinality[0].value,
            description: model.description,
            guid: model.guid,
            isEnabled: model.isEnabled,
            name: model.name,
            lastUpdateTime: model.lastUpdateTime,
            nodeAId: model.nodeAId,
            nodeAKeys: model.nodeAKeys,
            nodeAModality: model.cardinality[0].value === RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value
                ? RxModalityType.Optional
                : model.nodeAModality,
            nodeAName: model.nodeAName,
            nodeBId: model.nodeBId,
            nodeBKeys: model.cardinality[0].value === RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value
                ? [RX_RECORD_DEFINITION.coreFieldIds.id]
                : model.nodeBKeys,
            nodeBName: model.nodeBName,
            scope: model.customizationOptions.scope,
            shouldCascadeDelete: model.cardinality[0].value === RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value
                ? false
                : model.shouldCascadeDelete,
            overlayDescriptor: model.overlayDescriptor,
            overlayGroupId: model.overlayGroupId,
            tags: model.tags
        };
    }
    getRecordDefinition(name, forceReload = false) {
        return forceReload
            ? this.rxRecordDefinitionService.get(name, {}, true)
            : this.rxRecordDefinitionCacheService.getRecordDefinition(name);
    }
    getForeignKeyFieldName(definitionModel) {
        const fieldNameBase = definitionModel.nodeAName || this.rxDefinitionNameService.getDisplayName(definitionModel.nodeAId);
        return fieldNameBase.toUpperCase() + '_ID';
    }
    getForeignKeyFieldId(definitionModel, forceReload = false) {
        return this.getRecordDefinition(definitionModel.nodeBId, forceReload).pipe(map((recordDefinition) => {
            var _a;
            const foreignKeyFieldName = this.getForeignKeyFieldName(definitionModel);
            return (_a = recordDefinition.fieldDefinitions.find((field) => field.name === foreignKeyFieldName)) === null || _a === void 0 ? void 0 : _a.id;
        }));
    }
}
AssociationDesignerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignerService, deps: [{ token: i3.RxDefinitionNameService }, { token: i2.RxRecordDefinitionService }, { token: i2.RxRecordDefinitionCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
AssociationDesignerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i3.RxDefinitionNameService }, { type: i2.RxRecordDefinitionService }, { type: i2.RxRecordDefinitionCacheService }]; } });

const init = createAction('[Association Designer] Init', props());
const loadDefinition = createAction('[Association Designer] Load Definition');
const loadDefinitionSuccess = createAction('[Association Designer] Load Definition Success', props());
const initDefinitionData = createAction('[Association Designer] Init Definition Model', props());
const updateDefinitionModelFromDesigner = createAction('[Association Designer] Update Definition Model From Designer', props());
const markDesignerPristine = createAction('[Association Designer] Mark Designer Pristine');
const markDesignerDirty = createAction('[Association Designer] Mark Designer Dirty');
const toggleDesignMode = createAction('[Association Designer] Toggle Design Mode');
const revertCustomization = createAction('[Association Designer] Revert Customization');
const saveDefinition = createAction('[Association Designer] Save Definition');
const getRecordDefinition = createAction('[Association Designer] Get Record Definition', props());
const getRecordDefinitionError = createAction('[Association Designer] Get Record Definition Error');
const getForeignKeyFieldIdError = createAction('[Association Designer] Get Foreign Key Field ID Error');
const checkForMissingForeignKeyField = createAction('[Association Designer] Check For Missing Foreign Key Field', props());
const foreignKeyFieldMissingCheckSuccess = createAction('[Association Designer] Foreign Key Field Missing Check Success', props());
const createForeignKeyField = createAction('[Association Designer] Create Foreign Key Field', props());
const createForeignKeyFieldSuccess = createAction('[Association Designer] Create Foreign Key Field Success');
const createForeignKeyFieldError = createAction('[Association Designer] Create Foreign Key Field Error');
const getCreatedForeignKeyFieldId = createAction('[Association Designer] Get Created Foreign Key Field ID');
const getCreatedForeignKeyFieldIdSuccess = createAction('[Association Designer] Get Created Foreign Key Field ID Success', props());
const getCreatedForeignKeyFieldIdError = createAction('[Association Designer] Get Created Foreign Key Field ID Error');
const createOrUpdateDefinition = createAction('[Association Designer] Create Or Update Definition');
const getCreatedForeignKeyField = createAction('[Association Designer] Get Created Foreign Key Field');
const getCreatedForeignKeyFieldError = createAction('[Association Designer] Get Created Foreign Key Field Error');
const removeCreatedForeignKeyField = createAction('[Association Designer] Remove Created Foreign Key Field', props());
const removeCreatedForeignKeyFieldSuccess = createAction('[Association Designer] Remove Created Foreign Key Field Success');
const removeCreatedForeignKeyFieldError = createAction('[Association Designer] Remove Created Foreign Key Field Error');
const saveDefinitionSuccess = createAction('[Association Designer] Save Definition Success', props());
const createDefinitionError = createAction('[Association Designer] Create Definition Error');
const updateDefinitionError = createAction('[Association Designer] Update Definition Error');
const destroy = createAction('[Association Designer] Destroy');

const RX_ASSOCIATION_DESIGNER = {
    featureSelector: 'associationDesigner'
};

const associationDesignerStateSelector = createFeatureSelector(RX_ASSOCIATION_DESIGNER.featureSelector);
const associationDesignerModelSelector = createSelector(associationDesignerStateSelector, (associationDesignerState) => associationDesignerState.model);
const isDesignModeSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.isDesignMode);
const bundleIdSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.bundleId);
const definitionNameSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.definitionName);
const definitionModelSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.definitionModel);
const definitionModelFromDefinitionSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.definitionModelFromDefinition);
const isDirtySelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.isDirty);
const isForeignKeyCreatedSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.isForeignKeyCreated);
const isForeignKeyMissingSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.isForeignKeyMissing);
const savedDefinitionNameSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.savedDefinitionName);
const originalDefinitionSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.originalDefinition);

class RxAssociationDesignerComponent {
    constructor(store$, associationDesignerService, rxGlobalCacheService, rxAssociationCardinalityPipe, rxDefinitionNameService, translateService, rxOverlayService, rxNotificationService, renderer) {
        this.store$ = store$;
        this.associationDesignerService = associationDesignerService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxAssociationCardinalityPipe = rxAssociationCardinalityPipe;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.translateService = translateService;
        this.rxOverlayService = rxOverlayService;
        this.rxNotificationService = rxNotificationService;
        this.renderer = renderer;
        this.definitionSaved = new EventEmitter();
        this.definitionErrorLoading = new EventEmitter();
        this.closeDesigner = new EventEmitter();
        this.destroyed$ = new ReplaySubject(1);
        this.firstRecordDefinitionPickerOptions = {
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RxDefinitionPickerScope.Bundle, RxDefinitionPickerScope.All],
                search: RxDefinitionPickerScope.All
            },
            definitionType: RxDefinitionPickerType.RegularDataRecord,
            label: this.translateService.instant('com.bmc.arsys.rx.client.association-designer.first-record-field.label'),
            required: true,
            tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.association-designer.first-record-field.tooltip'))
        };
        this.secondRecordDefinitionPickerOptions = {
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RxDefinitionPickerScope.Bundle, RxDefinitionPickerScope.Rx],
                search: RxDefinitionPickerScope.Rx
            },
            definitionType: RxDefinitionPickerType.RegularDataRecord,
            label: this.translateService.instant('com.bmc.arsys.rx.client.association-designer.second-record-field.label'),
            required: true,
            tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.association-designer.second-record-field.tooltip'))
        };
        this.firstRecordDefinitionRoleTooltip = new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.association-designer.first-record-role-field.tooltip'));
        this.secondRecordDefinitionRoleTooltip = new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.association-designer.second-record-role-field.tooltip'));
        this.cascadeDeleteTooltip = new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.association-designer.should-cascade-delete.tooltip'));
        this.cardinalities = Object.values(RX_ASSOCIATION_DEFINITION.cardinality);
        this.validDefinitionNameRegex = RX_RECORD_DEFINITION.validDefinitionNameRegex;
        this.associationForm = new FormGroup({
            name: new FormControl(''),
            description: new FormControl(),
            nodeAId: new FormControl(),
            nodeBId: new FormControl(),
            nodeAName: new FormControl(),
            nodeBName: new FormControl(),
            nodeAModality: new FormControl(),
            cardinality: new FormControl([RX_ASSOCIATION_DEFINITION.cardinality.oneToOne]),
            shouldCascadeDelete: new FormControl(),
            isEnabled: new FormControl(true),
            customizationOptions: new FormControl()
        });
        this.isSavingInProgressSubject = new BehaviorSubject(false);
        this.isDesignMode$ = this.store$.select(isDesignModeSelector);
        this.isDirty$ = this.store$.select(isDirtySelector);
        this.originalDefinition$ = this.store$.select(originalDefinitionSelector);
        this.bundleFriendlyName$ = this.store$
            .select(bundleIdSelector)
            .pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleFriendlyName(bundleId)));
        this.definitionModelFromDefinition$ = this.store$.select(definitionModelFromDefinitionSelector);
        this.definitionModel$ = this.store$.select(definitionModelSelector).pipe(tap((definitionModel) => {
            this.associationForm.patchValue({
                name: this.rxDefinitionNameService.getDisplayName(definitionModel.name),
                description: definitionModel.description,
                nodeAId: definitionModel.nodeAId,
                nodeBId: definitionModel.nodeBId,
                nodeAName: definitionModel.nodeAName,
                nodeBName: definitionModel.nodeBName,
                nodeAModality: definitionModel.nodeAModality === RX_ASSOCIATION_DEFINITION.modality.required,
                cardinality: [this.getCardinalityByValue(definitionModel.cardinality[0].value)],
                shouldCascadeDelete: definitionModel.shouldCascadeDelete,
                isEnabled: definitionModel.isEnabled,
                customizationOptions: {
                    allowOverlay: definitionModel.customizationOptions.allowOverlay,
                    scope: definitionModel.customizationOptions.scope
                }
            }, { emitEvent: false });
        }), shareReplay(1));
        this.isExistingDefinition$ = this.definitionModelFromDefinition$.pipe(map((definitionModel) => Boolean(definitionModel.lastUpdateTime)), shareReplay(1));
        this.isCustomizationEnabled$ = this.definitionModelFromDefinition$.pipe(map((definitionModel) => this.rxOverlayService.isCustomizationEnabled(null, definitionModel)));
        this.scopeCustomizationControlOptions$ = this.definitionModelFromDefinition$.pipe(map((definitionModel) => ({
            allowOverlay: definitionModel.customizationOptions.allowOverlay,
            scope: definitionModel.customizationOptions.scope,
            overlayGroupId: definitionModel.overlayGroupId,
            overlayDescriptor: definitionModel.overlayDescriptor,
            isDisabled: !this.rxOverlayService.isCustomizationEnabled('allowOverlay', definitionModel),
            definitionTypeDisplayName: this.translateService
                .instant('com.bmc.arsys.rx.client.common.association-definition.label')
                .toLowerCase()
        })));
        this.revertCustomizationControlOptions$ = this.definitionModelFromDefinition$.pipe(map((definitionModel) => ({
            allowOverlay: definitionModel.customizationOptions.allowOverlay,
            scope: definitionModel.customizationOptions.scope,
            overlayGroupId: definitionModel.overlayGroupId,
            overlayDescriptor: definitionModel.overlayDescriptor
        })));
        this.validationIssues$ = combineLatest([
            this.definitionModel$,
            this.isExistingDefinition$
        ]).pipe(map(([definitionModel, isExistingDefinition]) => this.validate(definitionModel, isExistingDefinition)), shareReplay(1));
        this.definitionFromDefinitionModel$ = this.definitionModel$.pipe(map((definitionModel) => this.associationDesignerService.getDefinitionFromDefinitionModel(definitionModel)));
        this.definitionForJsonViewer$ = this.isDesignMode$.pipe(switchMap((isDesignMode) => isDesignMode
            ? of(null)
            : combineLatest([this.definitionFromDefinitionModel$, this.originalDefinition$]).pipe(map(([definitionFromDefinitionModel, originalDefinition]) => (Object.assign(Object.assign({}, originalDefinition), definitionFromDefinitionModel))))));
        this.areNewDefinitionsAllowed$ = this.store$
            .select(bundleIdSelector)
            .pipe(switchMap((bundleId) => this.rxOverlayService.areNewDefinitionsAllowed(bundleId)));
        this.isReadOnly$ = this.definitionFromDefinitionModel$.pipe(filter((definition) => !!definition.lastUpdateTime), withLatestFrom(this.areNewDefinitionsAllowed$), map(([definition, areNewDefinitionsAllowed]) => !areNewDefinitionsAllowed || !this.rxOverlayService.isCustomizationEnabled('allowOverlay', definition)), tap((isReadOnly) => {
            if (isReadOnly) {
                this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.read-only-definition-warning.message'));
            }
        }), startWith(false), shareReplay(1));
        this.hasValidationErrors$ = this.validationIssues$.pipe(map((issueSections) => some(issueSections, {
            issues: [{ type: ValidationIssueType.Error }]
        })));
        this.cascadeDeleteLabel$ = this.definitionModel$.pipe(map((model) => this.translateService.instant('com.bmc.arsys.rx.client.association-designer.should-cascade-delete.label', {
            firstRecordDefinitionName: this.rxDefinitionNameService.getDisplayName(model.nodeAId),
            firstRecordDefinitionRole: model.nodeAName
                ? this.translateService.instant('com.bmc.arsys.rx.client.association-designer.node-name.label', {
                    nodeName: model.nodeAName
                })
                : '',
            secondRecordDefinitionName: this.rxDefinitionNameService.getDisplayName(model.nodeBId),
            secondRecordDefinitionRole: model.nodeBName
                ? this.translateService.instant('com.bmc.arsys.rx.client.association-designer.node-name.label', {
                    nodeName: model.nodeBName
                })
                : ''
        })));
        this.recordAssociationLabel$ = this.definitionModel$.pipe(map((model) => this.translateService.instant('com.bmc.arsys.rx.client.association-designer.require-record-association.label', {
            firstRecordDefinitionName: this.rxDefinitionNameService.getDisplayName(model.nodeAId),
            firstRecordDefinitionRole: model.nodeAName
                ? this.translateService.instant('com.bmc.arsys.rx.client.association-designer.node-name.label', {
                    nodeName: model.nodeAName
                })
                : '',
            secondRecordDefinitionName: this.rxDefinitionNameService.getDisplayName(model.nodeBId),
            secondRecordDefinitionRole: model.nodeBName
                ? this.translateService.instant('com.bmc.arsys.rx.client.association-designer.node-name.label', {
                    nodeName: model.nodeBName
                })
                : ''
        })));
        this.isModalityDisabled$ = this.definitionModel$.pipe(withLatestFrom(this.isCustomizationEnabled$), map(([{ shouldCascadeDelete, nodeAId, nodeBId }, isCustomizationEnabled]) => !isCustomizationEnabled || !(shouldCascadeDelete && nodeAId && nodeBId)));
        this.isSaveButtonDisabled$ = combineLatest([
            this.isDirty$,
            this.hasValidationErrors$,
            this.isReadOnly$,
            this.isSavingInProgressSubject
        ]).pipe(map(([isDirty, hasValidationErrors, isReadOnly, isSavingInProgress]) => !isDirty || hasValidationErrors || isReadOnly || isSavingInProgress));
        this.breadcrumbItems$ = this.definitionModel$.pipe(filter(Boolean), map((definitionModel) => {
            const definitionName = this.rxDefinitionNameService.getDisplayName(definitionModel.name);
            return [
                {
                    label: definitionName ||
                        `<${this.translateService.instant('com.bmc.arsys.rx.client.association-designer.new-association.label')}>`,
                    data: {}
                }
            ];
        }));
        this.canCascadeDelete$ = this.definitionModel$.pipe(takeUntil(this.destroyed$), map((definitionModel) => 
        // If association type is many to many shouldCascadeDelete should be set to false
        definitionModel.cardinality[0].value !== RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value));
        this.vm$ = combineLatest([
            this.breadcrumbItems$,
            this.bundleFriendlyName$,
            this.canCascadeDelete$,
            this.cascadeDeleteLabel$,
            this.hasValidationErrors$,
            this.isExistingDefinition$,
            this.isModalityDisabled$,
            this.isSaveButtonDisabled$,
            this.recordAssociationLabel$,
            this.revertCustomizationControlOptions$,
            this.scopeCustomizationControlOptions$,
            this.validationIssues$,
            this.definitionForJsonViewer$,
            this.isReadOnly$
        ]).pipe(map(([breadcrumbItems, bundleFriendlyName, canCascadeDelete, cascadeDeleteLabel, hasValidationErrors, isExistingDefinition, isModalityDisabled, isSaveButtonDisabled, recordAssociationLabel, revertCustomizationControlOptions, scopeCustomizationControlOptions, validationIssues, definitionForJsonViewer, isReadOnly]) => ({
            breadcrumbItems,
            bundleFriendlyName,
            canCascadeDelete,
            cascadeDeleteLabel,
            hasValidationErrors,
            isExistingDefinition,
            isModalityDisabled,
            isSaveButtonDisabled,
            recordAssociationLabel,
            revertCustomizationControlOptions,
            scopeCustomizationControlOptions,
            validationIssues,
            definitionForJsonViewer,
            isReadOnly
        })));
        this.cardinalityOptionsFormatter = (option) => {
            return this.rxAssociationCardinalityPipe.transform(option.value);
        };
    }
    ngOnInit() {
        this.associationForm.valueChanges
            .pipe(distinctUntilChanged(isEqual), withLatestFrom(this.store$.select(bundleIdSelector)), tap(([formValue, bundleId]) => {
            this.store$.dispatch(updateDefinitionModelFromDesigner({
                definitionModelFromDesigner: {
                    customizationOptions: formValue.customizationOptions,
                    description: formValue.description,
                    isEnabled: formValue.isEnabled,
                    nodeAId: formValue.nodeAId,
                    nodeAName: formValue.nodeAName,
                    nodeBId: formValue.nodeBId,
                    nodeBName: formValue.nodeBName,
                    shouldCascadeDelete: formValue.shouldCascadeDelete,
                    name: this.rxDefinitionNameService.getDefinitionName(bundleId, formValue.name),
                    cardinality: formValue.cardinality,
                    nodeAModality: formValue.nodeAModality
                        ? RX_ASSOCIATION_DEFINITION.modality.required
                        : RX_ASSOCIATION_DEFINITION.modality.optional
                }
            }));
        }))
            .subscribe();
        this.definitionModel$
            .pipe(distinctUntilChanged((prev, cur) => prev.nodeBId === cur.nodeBId &&
            prev.nodeAName === cur.nodeAName &&
            prev.shouldCascadeDelete === cur.shouldCascadeDelete &&
            prev.nodeAModality === cur.nodeAModality), filter((definitionModel) => !definitionModel.lastUpdateTime &&
            !!definitionModel.nodeBId &&
            definitionModel.cardinality[0].value !== RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value), switchMap((definitionModel) => this.associationDesignerService.getForeignKeyFieldId(definitionModel)), withLatestFrom(this.definitionModel$), tap(([fieldId, definitionModel]) => {
            if (fieldId) {
                this.store$.dispatch(updateDefinitionModelFromDesigner({
                    definitionModelFromDesigner: Object.assign(Object.assign({}, definitionModel), { nodeBKeys: [fieldId] })
                }));
            }
            else {
                this.store$.dispatch(updateDefinitionModelFromDesigner({
                    definitionModelFromDesigner: Object.assign(Object.assign({}, definitionModel), { nodeBKeys: [RX_RECORD_DEFINITION.coreFieldIds.id] })
                }));
            }
        }), takeUntil(this.destroyed$))
            .subscribe();
        this.associationForm
            .get('shouldCascadeDelete')
            .valueChanges.pipe(takeUntil(this.destroyed$), tap((shouldCascadeDelete) => {
            if (!shouldCascadeDelete) {
                this.associationForm.patchValue({
                    nodeAModality: false
                });
            }
        }))
            .subscribe();
        this.store$
            .select(savedDefinitionNameSelector)
            .pipe(skip(1), takeUntil(this.destroyed$))
            .subscribe((savedDefinitionName) => {
            this.definitionSaved.emit(savedDefinitionName);
        });
    }
    ngOnChanges(changes) {
        if (changes.configuration.currentValue) {
            this.store$.dispatch(init({ payload: this.configuration }));
        }
    }
    canDeactivate() {
        let canDeactivate = true;
        this.isDirty$.pipe(take(1)).subscribe((isDirty) => {
            canDeactivate = !isDirty;
        });
        return canDeactivate;
    }
    toggleDesignMode() {
        this.store$.dispatch(toggleDesignMode());
    }
    onCorrectIssue(validationIssue) {
        if (validationIssue.data.type === 'input') {
            this.renderer.selectRootElement(`[rx-id="${validationIssue.data.id}"] input`, true).focus();
        }
        else {
            this.renderer.selectRootElement(`[rx-id="${validationIssue.data.id}"] [rx-id="toggle-button"]`, true).click();
        }
    }
    validate(definitionModel, isExistingDefinition) {
        const validationIssues = [];
        if (!isExistingDefinition) {
            if (isEmpty(trim(this.rxDefinitionNameService.getDisplayName(definitionModel.name)))) {
                validationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.association-designer.name-field.label')
                    }),
                    data: {
                        id: 'name',
                        type: 'input'
                    }
                });
            }
            if (definitionModel.name && !RX_RECORD_DEFINITION.validFullDefinitionName.test(definitionModel.name)) {
                validationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.association-designer.name-field.label')
                    }),
                    data: {
                        id: 'name',
                        type: 'input'
                    }
                });
            }
            if (isEmpty(definitionModel.nodeAId)) {
                validationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.association-designer.first-record-field.label')
                    }),
                    data: {
                        id: 'first-record',
                        type: 'definition-picker'
                    }
                });
            }
            if (isEmpty(definitionModel.nodeBId)) {
                validationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.association-designer.second-record-field.label')
                    }),
                    data: {
                        id: 'second-record',
                        type: 'definition-picker'
                    }
                });
            }
        }
        return validationIssues.length
            ? [
                {
                    title: this.translateService.instant('com.bmc.arsys.rx.client.association-designer.new-association.label'),
                    issues: validationIssues
                }
            ]
            : [];
    }
    onRevertCustomization(event) {
        if (event.type === RX_REVERT_CUSTOMIZATION.events.revertCustomization) {
            this.store$.dispatch(revertCustomization());
        }
    }
    getCardinalityByValue(value) {
        return find(this.cardinalities, { value: value });
    }
    saveDefinition() {
        this.store$.dispatch(saveDefinition());
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.isSavingInProgressSubject.complete();
        this.store$.dispatch(destroy());
    }
}
RxAssociationDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerComponent, deps: [{ token: i1.Store }, { token: AssociationDesignerService }, { token: i3.RxGlobalCacheService }, { token: i4.RxAssociationCardinalityPipe }, { token: i3.RxDefinitionNameService }, { token: i5.TranslateService }, { token: i3.RxOverlayService }, { token: i3.RxNotificationService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
RxAssociationDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxAssociationDesignerComponent, selector: "rx-association-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    [isDesignMode]=\"!vm.definitionForJsonViewer\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (toggleDesignMode)=\"toggleDesignMode()\"\n    (save)=\"saveDefinition()\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n  ></rx-designer-header>\n\n  <div class=\"rx-designer-component\" [hidden]=\"vm.definitionForJsonViewer\">\n    <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\">\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        rx-id=\"validation-issues\"\n        [iconClass]=\"vm.hasValidationErrors ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\"\n      >\n        <rx-validation-issues\n          [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.common.association-definition.label' | translate\"\n          (correctIssue)=\"onCorrectIssue($event)\"\n          [issueSections]=\"vm.validationIssues\"\n        ></rx-validation-issues>\n      </adapt-sidebar-item>\n\n      <div class=\"main rx-designer-container h-100\">\n        <h1 class=\"mt-0\">\n          {{\n            vm.isExistingDefinition\n              ? ('com.bmc.arsys.rx.client.association-designer.edit-association.title' | translate)\n              : ('com.bmc.arsys.rx.client.association-designer.create-association.title' | translate)\n          }}\n        </h1>\n\n        <form class=\"rx-association-designer-form d-block\" [formGroup]=\"associationForm\">\n          <adapt-rx-textfield\n            class=\"d-block form-group\"\n            formControlName=\"name\"\n            label=\"{{ 'com.bmc.arsys.rx.client.association-designer.name-field.label' | translate }}\"\n            id=\"association-name\"\n            rx-id=\"name\"\n            [disabledStyleForReadonlyState]=\"true\"\n            [readonly]=\"vm.isExistingDefinition\"\n            [required]=\"true\"\n          ></adapt-rx-textfield>\n\n          <adapt-rx-textarea\n            rx-id=\"description\"\n            class=\"d-block form-group\"\n            [label]=\"'com.bmc.arsys.rx.client.common.description.label' | translate\"\n            formControlName=\"description\"\n            [disabled]=\"vm.isReadOnly\"\n          ></adapt-rx-textarea>\n\n          <div class=\"d-flex justify-center align-items-center w-100\">\n            <rx-definition-picker\n              rx-id=\"first-record\"\n              [options]=\"firstRecordDefinitionPickerOptions\"\n              [formControl]=\"associationForm.get('nodeAId')\"\n              [isDisabled]=\"vm.isExistingDefinition\"\n              required=\"true\"\n              class=\"form-group d-block flex-grow-1 rx-association-input\"\n            ></rx-definition-picker>\n\n            <div class=\"rx-association-designer-arrow-1\"></div>\n\n            <adapt-rx-select\n              rx-id=\"cardinality\"\n              [label]=\"'com.bmc.arsys.rx.client.association-designer.cardinality-field.label' | translate\"\n              [options]=\"cardinalities\"\n              [formControl]=\"associationForm.get('cardinality')\"\n              [optionFormatter]=\"cardinalityOptionsFormatter\"\n              [disabled]=\"vm.isExistingDefinition\"\n              class=\"form-group d-block flex-grow-1 rx-association-input\"\n            ></adapt-rx-select>\n\n            <div class=\"rx-association-designer-arrow-2\"></div>\n\n            <rx-definition-picker\n              rx-id=\"second-record\"\n              [options]=\"secondRecordDefinitionPickerOptions\"\n              [formControl]=\"associationForm.get('nodeBId')\"\n              [isDisabled]=\"vm.isExistingDefinition\"\n              required=\"true\"\n              class=\"form-group d-block flex-grow-1 rx-association-input\"\n            ></rx-definition-picker>\n          </div>\n\n          <div class=\"d-flex justify-center align-items-center w-100\">\n            <adapt-rx-textfield\n              rx-id=\"first-record-role\"\n              class=\"d-block form-group w-100\"\n              [label]=\"'com.bmc.arsys.rx.client.association-designer.first-record-role-field.label' | translate\"\n              formControlName=\"nodeAName\"\n              [disabled]=\"vm.isReadOnly\"\n              [tooltip]=\"firstRecordDefinitionRoleTooltip\"\n            ></adapt-rx-textfield>\n\n            <div class=\"rx-association-designer-arrow-placeholder\"></div>\n\n            <div class=\"flex-grow-1 w-100\"></div>\n\n            <div class=\"rx-association-designer-arrow-placeholder\"></div>\n\n            <adapt-rx-textfield\n              rx-id=\"second-record-role\"\n              class=\"d-block form-group w-100\"\n              [label]=\"'com.bmc.arsys.rx.client.association-designer.second-record-role-field.label' | translate\"\n              formControlName=\"nodeBName\"\n              [disabled]=\"vm.isReadOnly\"\n              [tooltip]=\"secondRecordDefinitionRoleTooltip\"\n            ></adapt-rx-textfield>\n          </div>\n\n          <div *ngIf=\"vm.canCascadeDelete\">\n            <adapt-rx-control-label\n              rx-id=\"add-constraints\"\n              [label]=\"'com.bmc.arsys.rx.client.association-designer.add-constraints-field.label' | translate\"\n              [tooltip]=\"cascadeDeleteTooltip\"\n            ></adapt-rx-control-label>\n\n            <adapt-rx-checkbox\n              rx-id=\"cascade-delete\"\n              formControlName=\"shouldCascadeDelete\"\n              [label]=\"vm.cascadeDeleteLabel\"\n              [readonly]=\"vm.isExistingDefinition\"\n            ></adapt-rx-checkbox>\n\n            <adapt-rx-checkbox\n              rx-id=\"required-association\"\n              formControlName=\"nodeAModality\"\n              [label]=\"vm.recordAssociationLabel\"\n              [readonly]=\"vm.isModalityDisabled || vm.isReadOnly\"\n            ></adapt-rx-checkbox>\n          </div>\n\n          <hr />\n\n          <rx-revert-customization\n            *ngIf=\"vm.revertCustomizationControlOptions\"\n            [options]=\"vm.revertCustomizationControlOptions\"\n            (events)=\"onRevertCustomization($event)\"\n          ></rx-revert-customization>\n\n          <rx-scope-customization-control\n            class=\"d-block mb-5\"\n            *ngIf=\"vm.scopeCustomizationControlOptions\"\n            [options]=\"vm.scopeCustomizationControlOptions\"\n            formControlName=\"customizationOptions\"\n          ></rx-scope-customization-control>\n\n          <adapt-rx-checkbox\n            rx-id=\"is-enabled\"\n            formControlName=\"isEnabled\"\n            [disabled]=\"vm.isReadOnly\"\n            [label]=\"'com.bmc.arsys.rx.client.association-designer.enable-association.label' | translate\"\n          ></adapt-rx-checkbox>\n        </form>\n      </div>\n    </adapt-sidebar>\n  </div>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  ></adapt-code-viewer>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-designer-component{height:calc(100% - 50px)}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;padding:1rem}.rx-association-designer-form{max-width:700px}.rx-association-designer-arrow-1,.rx-association-designer-arrow-2,.rx-association-designer-arrow-placeholder{margin-top:8px;width:30px;height:2px;position:relative;flex-shrink:0}.rx-association-designer-arrow-1:before,.rx-association-designer-arrow-2:before{content:\"\";display:block;position:absolute;background-color:#959899;top:0;left:0;width:100%;height:100%}.rx-association-designer-arrow-2:after{content:\"\";display:block;position:absolute;right:0;top:-3px;border-top:4px solid transparent;border-bottom:4px solid transparent;border-left:10px solid #959899}.rx-association-input{width:213px}adapt-rx-textarea ::ng-deep textarea{resize:none}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}:host ::ng-deep .adapt-sidebar-main{overflow:auto}\n"], components: [{ type: i6.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i7.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i7.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i3$1.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i7.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i7.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i6.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i7.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i7.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i7.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i6.RxRevertCustomizationComponent, selector: "rx-revert-customization", inputs: ["options", "isDisabled"], outputs: ["events"] }, { type: i6.CustomizationOptionsComponent, selector: "rx-scope-customization-control", inputs: ["options"] }, { type: i7.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i10.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i10.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i10.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i10.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i10.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "async": i9.AsyncPipe, "translate": i5.TranslatePipe, "json": i9.JsonPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-association-designer',
                    templateUrl: './association-designer.component.html',
                    styleUrls: ['./association-designer.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: AssociationDesignerService }, { type: i3.RxGlobalCacheService }, { type: i4.RxAssociationCardinalityPipe }, { type: i3.RxDefinitionNameService }, { type: i5.TranslateService }, { type: i3.RxOverlayService }, { type: i3.RxNotificationService }, { type: i0.Renderer2 }]; }, propDecorators: { configuration: [{
                type: Input
            }], definitionSaved: [{
                type: Output
            }], definitionErrorLoading: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }] } });

class RxAssociationDesignerPageComponent {
    constructor(activatedRoute, router, rxBundleCacheService, rxComponentCanDeactivateGuard, rxDefinitionNameService, rxPageTitleService, rxUtilityModalsService, translateService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.translateService = translateService;
        this.isInitialized = false;
        this.definitionsRoute = 'association-definitions';
        this.pageTitle = this.translateService.instant('com.bmc.arsys.rx.client.association-designer.title');
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.subscription = this.activatedRoute.params.subscribe(({ definitionName, bundleId }) => {
            this.rxBundleCacheService.bundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
            this.isInitialized = true;
            this.isNewDefinition = !definitionName;
            this.configuration = Object.assign(Object.assign({}, this.configuration), { bundleId: this.rxBundleCacheService.bundleId, definitionName });
            this.rxPageTitleService.set([this.rxDefinitionNameService.getDisplayName(definitionName), this.pageTitle]);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    canDeactivate() {
        var _a, _b;
        return (_b = (_a = this.designerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges();
    }
    onCloseDesigner() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            this.definitionsRoute
        ]);
    }
    onDefinitionSaved(definitionName) {
        if (this.isNewDefinition) {
            this.router.navigate(['edit2', definitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
    onDefinitionErrorLoading() {
        this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
}
RxAssociationDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerPageComponent, deps: [{ token: i1$1.ActivatedRoute }, { token: i1$1.Router }, { token: i3.RxBundleCacheService }, { token: i3.RxComponentCanDeactivateGuard }, { token: i3.RxDefinitionNameService }, { token: i3.RxPageTitleService }, { token: i3$1.RxUtilityModalsService }, { token: i5.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxAssociationDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxAssociationDesignerPageComponent, selector: "rx-association-designer-page", viewQueries: [{ propertyName: "designerComponent", first: true, predicate: RxAssociationDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-association-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-association-designer>\n", components: [{ type: RxAssociationDesignerComponent, selector: "rx-association-designer", inputs: ["configuration"], outputs: ["definitionSaved", "definitionErrorLoading", "closeDesigner"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-association-designer-page',
                    templateUrl: './association-designer-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActivatedRoute }, { type: i1$1.Router }, { type: i3.RxBundleCacheService }, { type: i3.RxComponentCanDeactivateGuard }, { type: i3.RxDefinitionNameService }, { type: i3.RxPageTitleService }, { type: i3$1.RxUtilityModalsService }, { type: i5.TranslateService }]; }, propDecorators: { designerComponent: [{
                type: ViewChild,
                args: [RxAssociationDesignerComponent]
            }] } });

class AssociationDesignerEffects {
    constructor(store$, actions$, errorHandler, rxDefinitionUpdateService, associationDesignerService, rxRecordDefinitionService, rxComponentCanDeactivateGuard, rxAssociationDefinitionService, rxModalService, rxNotificationService, translateService) {
        this.store$ = store$;
        this.actions$ = actions$;
        this.errorHandler = errorHandler;
        this.rxDefinitionUpdateService = rxDefinitionUpdateService;
        this.associationDesignerService = associationDesignerService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxAssociationDefinitionService = rxAssociationDefinitionService;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.initAssociationDesigner$ = createEffect(() => this.actions$.pipe(ofType(init), map(() => loadDefinition())));
        this.loadDefinition$ = createEffect(() => this.actions$.pipe(ofType(loadDefinition), withLatestFrom(this.store$.select(definitionNameSelector)), switchMap(([_, definitionName]) => definitionName
            ? this.rxAssociationDefinitionService.get(definitionName)
            : this.rxAssociationDefinitionService.getNew()), map((definition) => loadDefinitionSuccess({ definition }))));
        this.loadDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(loadDefinitionSuccess), map((action) => initDefinitionData({
            definition: action.definition,
            definitionModel: this.associationDesignerService.getDefinitionModelFromDefinition(action.definition)
        }))));
        this.saveDefinition$ = createEffect(() => this.actions$.pipe(ofType(saveDefinition), withLatestFrom(this.store$.select(definitionModelSelector)), map(([action, definitionModel]) => definitionModel.cardinality[0].value === RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value
            ? createOrUpdateDefinition()
            : getRecordDefinition({ checkForMissingFieldAction: true }))));
        this.getRecordDefinition$ = createEffect(() => this.actions$.pipe(ofType(getRecordDefinition), withLatestFrom(this.store$.select(definitionModelSelector)), switchMap(([action, definitionModel]) => this.associationDesignerService.getRecordDefinition(definitionModel.nodeBId, true).pipe(map((definition) => {
            if (action.checkForMissingFieldAction) {
                return checkForMissingForeignKeyField({ definition });
            }
            else if (action.createForeignKeyFieldAction) {
                return createForeignKeyField({ definition });
            }
        }), catchError((error) => {
            this.errorHandler.handleError(error);
            return of(getRecordDefinitionError());
        })))));
        this.checkForMissingForeignKeyField$ = createEffect(() => this.actions$.pipe(ofType(checkForMissingForeignKeyField), withLatestFrom(this.store$.select(definitionModelSelector)), switchMap(([action, definitionModel]) => {
            if (!definitionModel.lastUpdateTime) {
                return this.associationDesignerService.getForeignKeyFieldId(definitionModel, true).pipe(map((foreignKeyFieldId) => 
                // Update nodeBKeys again in case we get new foreign key field ID in force reload definition
                foreignKeyFieldMissingCheckSuccess({
                    payload: {
                        updatedForeignKeyFieldId: foreignKeyFieldId,
                        isForeignKeyFieldMissing: !foreignKeyFieldId
                    }
                })), catchError((error) => {
                    this.errorHandler.handleError(error);
                    return of(getForeignKeyFieldIdError());
                }));
            }
            else if (definitionModel.lastUpdateTime) {
                const missingForeignKeyFields = reject(definitionModel.nodeBKeys, (fieldId) => some(action.definition.fieldDefinitions, { id: fieldId }));
                return [
                    foreignKeyFieldMissingCheckSuccess({
                        payload: {
                            updatedForeignKeyFieldId: null,
                            isForeignKeyFieldMissing: missingForeignKeyFields.length > 0
                        }
                    })
                ];
            }
            else {
                return [
                    foreignKeyFieldMissingCheckSuccess({
                        payload: {
                            updatedForeignKeyFieldId: null,
                            isForeignKeyFieldMissing: false
                        }
                    })
                ];
            }
        })));
        this.foreignKeyFieldMissingCheckSuccess$ = createEffect(() => this.actions$.pipe(ofType(foreignKeyFieldMissingCheckSuccess), withLatestFrom(this.store$.select(isForeignKeyMissingSelector)), map(([action, isForeignKeyMissing]) => isForeignKeyMissing
            ? getRecordDefinition({ createForeignKeyFieldAction: true })
            : createOrUpdateDefinition())));
        this.createForeignKeyField$ = createEffect(() => this.actions$.pipe(ofType(createForeignKeyField), withLatestFrom(this.store$.select(definitionModelSelector)), switchMap(([action, definitionModel]) => {
            const definition = cloneDeep(action.definition);
            definition.fieldDefinitions.push({
                resourceType: RX_RECORD_DEFINITION.dataTypes.character.resourceType,
                name: this.associationDesignerService.getForeignKeyFieldName(definitionModel),
                description: null,
                fieldOption: RecordFieldOption.Optional,
                maxLength: 254,
                defaultValue: null
            });
            return this.rxRecordDefinitionService.update(definition).pipe(map(() => createForeignKeyFieldSuccess()), catchError((error) => {
                this.errorHandler.handleError(error);
                return of(createForeignKeyFieldError());
            }));
        })));
        this.createForeignKeyFieldSuccess$ = createEffect(() => this.actions$.pipe(ofType(createForeignKeyFieldSuccess), map(() => getCreatedForeignKeyFieldId())));
        this.getCreatedForeignKeyFieldId$ = createEffect(() => this.actions$.pipe(ofType(getCreatedForeignKeyFieldId), withLatestFrom(this.store$.select(definitionModelSelector)), switchMap(([action, definitionModel]) => this.associationDesignerService.getForeignKeyFieldId(definitionModel, true).pipe(map((fieldId) => getCreatedForeignKeyFieldIdSuccess({ fieldId })), catchError((error) => {
            this.errorHandler.handleError(error);
            return of(getCreatedForeignKeyFieldIdError());
        })))));
        this.getCreatedForeignKeyFieldIdSuccess$ = createEffect(() => this.actions$.pipe(ofType(getCreatedForeignKeyFieldIdSuccess), map(() => createOrUpdateDefinition())));
        this.createOrUpdateDefinition$ = createEffect(() => this.actions$.pipe(ofType(createOrUpdateDefinition), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(originalDefinitionSelector)), switchMap(([action, definitionModel, originalDefinition]) => {
            const definition = this.associationDesignerService.getDefinitionFromDefinitionModel(definitionModel);
            return definitionModel.lastUpdateTime
                ? this.rxDefinitionUpdateService
                    .execute(this.rxAssociationDefinitionService.update.bind(this.rxAssociationDefinitionService, Object.assign(Object.assign({}, originalDefinition), definition)))
                    .pipe(map(() => saveDefinitionSuccess({
                    savedDefinitionName: definitionModel.name
                })), catchError((error) => {
                    this.errorHandler.handleError(error);
                    return of(updateDefinitionError());
                }))
                : this.rxAssociationDefinitionService.create(definition).pipe(map((response) => {
                    var _a;
                    const savedDefinitionName = decodeURIComponent(last((_a = response === null || response === void 0 ? void 0 : response.headers) === null || _a === void 0 ? void 0 : _a.get('location').split('/')) || '') || definitionModel.name;
                    return saveDefinitionSuccess({
                        savedDefinitionName
                    });
                }), catchError((error) => {
                    this.errorHandler.handleError(error);
                    // If POST of AssociationDefinition fails and the foreign key field has been added,
                    // that field will be removed via createDefinitionError action.
                    return of(createDefinitionError());
                }));
        })));
        this.createDefinitionError$ = createEffect(() => this.actions$.pipe(ofType(createDefinitionError), map(() => getCreatedForeignKeyField())));
        this.getCreatedForeignKeyField$ = createEffect(() => this.actions$.pipe(ofType(getCreatedForeignKeyField), withLatestFrom(this.store$.select(isForeignKeyCreatedSelector)), filter(([action, isForeignKeyCreated]) => isForeignKeyCreated), withLatestFrom(this.store$.select(definitionModelSelector)), switchMap(([action, definitionModel]) => forkJoin([
            this.associationDesignerService.getForeignKeyFieldId(definitionModel, true),
            this.associationDesignerService.getRecordDefinition(definitionModel.nodeBId, true)
        ]).pipe(map(([foreignKeyFieldId, definition]) => {
            definition.fieldDefinitions = reject(definition.fieldDefinitions, {
                id: foreignKeyFieldId
            });
            return removeCreatedForeignKeyField({ foreignKeyFieldId, definition });
        }), catchError((error) => {
            this.errorHandler.handleError(error);
            return of(getCreatedForeignKeyFieldError());
        })))));
        this.removeCreatedForeignKeyField$ = createEffect(() => this.actions$.pipe(ofType(removeCreatedForeignKeyField), withLatestFrom(this.store$.select(isForeignKeyCreatedSelector)), filter(([action, isForeignKeyCreated]) => isForeignKeyCreated), switchMap(([action]) => {
            const definition = Object.assign(Object.assign({}, action.definition), { fieldDefinitions: reject(action.definition.fieldDefinitions, {
                    id: action.foreignKeyFieldId
                }) });
            return this.rxRecordDefinitionService.update(definition).pipe(map(() => removeCreatedForeignKeyFieldSuccess()), catchError((error) => {
                this.errorHandler.handleError(error);
                return of(removeCreatedForeignKeyFieldError());
            }));
        })));
        this.saveDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(saveDefinitionSuccess), withLatestFrom(this.store$.select(definitionNameSelector)), tap(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-saved-successfully.message', {
                definitionTypeDisplayName: this.translateService.instant('com.bmc.arsys.rx.client.common.association-definition.label')
            }));
        }), filter(([_, definitionName]) => !!definitionName), map(() => loadDefinition())));
        this.revertCustomization$ = createEffect(() => this.actions$.pipe(ofType(revertCustomization), withLatestFrom(this.store$.select(definitionModelSelector)), switchMap(([_, definitionModel]) => this.rxAssociationDefinitionService.revertCustomization(definitionModel.name)), tap(() => {
            this.rxComponentCanDeactivateGuard.disable();
            window.location.reload();
        })), { dispatch: false });
        this.markPristine$ = createEffect(() => this.actions$.pipe(ofType(initDefinitionData, saveDefinition, saveDefinitionSuccess), map(() => markDesignerPristine())));
        this.markDirty$ = createEffect(() => this.actions$.pipe(ofType(updateDefinitionModelFromDesigner, getRecordDefinitionError, getForeignKeyFieldIdError, createForeignKeyFieldError, getCreatedForeignKeyFieldError, createDefinitionError, updateDefinitionError, removeCreatedForeignKeyFieldError), map(() => markDesignerDirty())));
    }
}
AssociationDesignerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignerEffects, deps: [{ token: i1.Store }, { token: i2$1.Actions }, { token: i0.ErrorHandler }, { token: i3.RxDefinitionUpdateService }, { token: AssociationDesignerService }, { token: i2.RxRecordDefinitionService }, { token: i3.RxComponentCanDeactivateGuard }, { token: i4.RxAssociationDefinitionService }, { token: i3$1.RxModalService }, { token: i3.RxNotificationService }, { token: i5.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
AssociationDesignerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignerEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2$1.Actions }, { type: i0.ErrorHandler }, { type: i3.RxDefinitionUpdateService }, { type: AssociationDesignerService }, { type: i2.RxRecordDefinitionService }, { type: i3.RxComponentCanDeactivateGuard }, { type: i4.RxAssociationDefinitionService }, { type: i3$1.RxModalService }, { type: i3.RxNotificationService }, { type: i5.TranslateService }]; } });

const initialDefinitionModel = {
    cardinality: [
        {
            value: RxCardinalityType.OneToOne,
            labelKey: 'com.bmc.arsys.rx.client.association.cardinality.one-to-one.label'
        }
    ],
    description: null,
    guid: null,
    isEnabled: true,
    name: null,
    nodeAId: null,
    nodeAKeys: [RX_RECORD_DEFINITION.coreFieldIds.id],
    nodeBKeys: [RX_RECORD_DEFINITION.coreFieldIds.id],
    nodeAModality: RxModalityType.Optional,
    nodeAName: null,
    nodeBId: null,
    nodeBName: null,
    shouldCascadeDelete: false,
    customizationOptions: { allowOverlay: true, scope: 'PUBLIC' }
};
const initialState = {
    bundleId: null,
    definitionName: null,
    isDesignMode: true,
    definitionModel: initialDefinitionModel,
    definitionModelFromDefinition: initialDefinitionModel,
    isDirty: false,
    isForeignKeyMissing: false,
    isForeignKeyCreated: false,
    savedDefinitionName: null,
    originalDefinition: null
};
const reducer = createReducer(initialState, on(init, (state, { payload }) => (Object.assign(Object.assign({}, initialState), { bundleId: payload.bundleId, definitionName: payload.definitionName, isForeignKeyCreated: false }))), on(initDefinitionData, (state, { definition, definitionModel }) => (Object.assign(Object.assign({}, state), { definitionModel, definitionModelFromDefinition: definitionModel, originalDefinition: definition }))), on(updateDefinitionModelFromDesigner, (state, { definitionModelFromDesigner }) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner) }))), on(toggleDesignMode, (state) => (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode }))), on(foreignKeyFieldMissingCheckSuccess, (state, { payload }) => (Object.assign(Object.assign({}, state), { isForeignKeyMissing: payload.isForeignKeyFieldMissing, definitionModel: Object.assign(Object.assign({}, state.definitionModel), { nodeBKeys: payload.updatedForeignKeyFieldId
            ? [payload.updatedForeignKeyFieldId]
            : state.definitionModel.nodeBKeys }) }))), on(createForeignKeyFieldError, (state) => (Object.assign(Object.assign({}, state), { isForeignKeyCreated: false }))), on(createForeignKeyFieldSuccess, (state) => (Object.assign(Object.assign({}, state), { isForeignKeyCreated: true }))), on(getCreatedForeignKeyFieldIdSuccess, (state, { fieldId }) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { nodeBKeys: [fieldId] }) }))), on(saveDefinitionSuccess, (state, { savedDefinitionName }) => (Object.assign(Object.assign({}, state), { savedDefinitionName }))), on(markDesignerPristine, (state) => (Object.assign(Object.assign({}, state), { isDirty: false }))), on(markDesignerDirty, (state) => (Object.assign(Object.assign({}, state), { isDirty: true }))), on(destroy, (state) => (Object.assign({}, initialState))));
function associationDesignerModelReducer(state, action) {
    return reducer(state, action);
}

class RxAssociationDesignerModule {
}
RxAssociationDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxAssociationDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerModule, declarations: [RxAssociationDesignerComponent], imports: [AdaptSidebarModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RxDesignerHeaderModule,
        RxValidationIssuesModule,
        RxDefinitionPickerModule,
        RxAssociationPipesModule,
        CustomizationOptionsModule,
        RxRevertCustomizationModule,
        AdaptTabsModule,
        AdaptRxFormsModule,
        AdaptCodeViewerModule,
        TranslateModule, i1.StoreFeatureModule, i2$1.EffectsFeatureModule], exports: [RxAssociationDesignerComponent] });
RxAssociationDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerModule, providers: [RxAssociationCardinalityPipe, RxDefinitionNamePipe], imports: [[
            AdaptSidebarModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RxDesignerHeaderModule,
            RxValidationIssuesModule,
            RxDefinitionPickerModule,
            RxAssociationPipesModule,
            CustomizationOptionsModule,
            RxRevertCustomizationModule,
            AdaptTabsModule,
            AdaptRxFormsModule,
            AdaptCodeViewerModule,
            TranslateModule,
            StoreModule.forFeature(RX_ASSOCIATION_DESIGNER.featureSelector, {
                model: associationDesignerModelReducer
            }),
            EffectsModule.forFeature([AssociationDesignerEffects])
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxAssociationDesignerComponent],
                    imports: [
                        AdaptSidebarModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RxDesignerHeaderModule,
                        RxValidationIssuesModule,
                        RxDefinitionPickerModule,
                        RxAssociationPipesModule,
                        CustomizationOptionsModule,
                        RxRevertCustomizationModule,
                        AdaptTabsModule,
                        AdaptRxFormsModule,
                        AdaptCodeViewerModule,
                        TranslateModule,
                        StoreModule.forFeature(RX_ASSOCIATION_DESIGNER.featureSelector, {
                            model: associationDesignerModelReducer
                        }),
                        EffectsModule.forFeature([AssociationDesignerEffects])
                    ],
                    exports: [RxAssociationDesignerComponent],
                    providers: [RxAssociationCardinalityPipe, RxDefinitionNamePipe]
                }]
        }] });

class RxAssociationDesignerPageModule {
}
RxAssociationDesignerPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxAssociationDesignerPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerPageModule, declarations: [RxAssociationDesignerPageComponent], imports: [CommonModule, RxAssociationDesignerModule], exports: [RxAssociationDesignerPageComponent] });
RxAssociationDesignerPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerPageModule, imports: [[CommonModule, RxAssociationDesignerModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxAssociationDesignerPageComponent],
                    imports: [CommonModule, RxAssociationDesignerModule],
                    exports: [RxAssociationDesignerPageComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { RxAssociationDesignerComponent, RxAssociationDesignerModule, RxAssociationDesignerPageComponent, RxAssociationDesignerPageModule };
//# sourceMappingURL=helix-platform-association-designer.js.map
