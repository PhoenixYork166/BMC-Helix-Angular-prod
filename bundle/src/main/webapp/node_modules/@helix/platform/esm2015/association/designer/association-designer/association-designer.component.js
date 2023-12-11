import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RX_ASSOCIATION_DEFINITION, RxAssociationCardinalityPipe } from '@helix/platform/association/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxDefinitionNameService, RxGlobalCacheService, RxNotificationService, RxOverlayService, Tooltip } from '@helix/platform/shared/api';
import { RX_REVERT_CUSTOMIZATION, RxDefinitionPickerScope, RxDefinitionPickerType } from '@helix/platform/shared/components';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { find, isEmpty, isEqual, some, trim } from 'lodash';
import { BehaviorSubject, combineLatest, of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, skip, startWith, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { AssociationDesignerService } from '../association-designer.service';
import * as AssociationDesignerActions from './+state/association-designer.actions';
import { bundleIdSelector, definitionModelFromDefinitionSelector, definitionModelSelector, isDesignModeSelector, isDirtySelector, originalDefinitionSelector, savedDefinitionNameSelector } from './+state/association-designer.selectors';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../association-designer.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/association/api";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@helix/platform/ui-kit";
import * as i9 from "@angular/common";
import * as i10 from "@angular/forms";
export class RxAssociationDesignerComponent {
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
            this.store$.dispatch(AssociationDesignerActions.updateDefinitionModelFromDesigner({
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
                this.store$.dispatch(AssociationDesignerActions.updateDefinitionModelFromDesigner({
                    definitionModelFromDesigner: Object.assign(Object.assign({}, definitionModel), { nodeBKeys: [fieldId] })
                }));
            }
            else {
                this.store$.dispatch(AssociationDesignerActions.updateDefinitionModelFromDesigner({
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
            this.store$.dispatch(AssociationDesignerActions.init({ payload: this.configuration }));
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
        this.store$.dispatch(AssociationDesignerActions.toggleDesignMode());
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
            this.store$.dispatch(AssociationDesignerActions.revertCustomization());
        }
    }
    getCardinalityByValue(value) {
        return find(this.cardinalities, { value: value });
    }
    saveDefinition() {
        this.store$.dispatch(AssociationDesignerActions.saveDefinition());
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.isSavingInProgressSubject.complete();
        this.store$.dispatch(AssociationDesignerActions.destroy());
    }
}
RxAssociationDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerComponent, deps: [{ token: i1.Store }, { token: i2.AssociationDesignerService }, { token: i3.RxGlobalCacheService }, { token: i4.RxAssociationCardinalityPipe }, { token: i3.RxDefinitionNameService }, { token: i5.TranslateService }, { token: i3.RxOverlayService }, { token: i3.RxNotificationService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
RxAssociationDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxAssociationDesignerComponent, selector: "rx-association-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    [isDesignMode]=\"!vm.definitionForJsonViewer\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (toggleDesignMode)=\"toggleDesignMode()\"\n    (save)=\"saveDefinition()\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n  ></rx-designer-header>\n\n  <div class=\"rx-designer-component\" [hidden]=\"vm.definitionForJsonViewer\">\n    <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\">\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        rx-id=\"validation-issues\"\n        [iconClass]=\"vm.hasValidationErrors ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\"\n      >\n        <rx-validation-issues\n          [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.common.association-definition.label' | translate\"\n          (correctIssue)=\"onCorrectIssue($event)\"\n          [issueSections]=\"vm.validationIssues\"\n        ></rx-validation-issues>\n      </adapt-sidebar-item>\n\n      <div class=\"main rx-designer-container h-100\">\n        <h1 class=\"mt-0\">\n          {{\n            vm.isExistingDefinition\n              ? ('com.bmc.arsys.rx.client.association-designer.edit-association.title' | translate)\n              : ('com.bmc.arsys.rx.client.association-designer.create-association.title' | translate)\n          }}\n        </h1>\n\n        <form class=\"rx-association-designer-form d-block\" [formGroup]=\"associationForm\">\n          <adapt-rx-textfield\n            class=\"d-block form-group\"\n            formControlName=\"name\"\n            label=\"{{ 'com.bmc.arsys.rx.client.association-designer.name-field.label' | translate }}\"\n            id=\"association-name\"\n            rx-id=\"name\"\n            [disabledStyleForReadonlyState]=\"true\"\n            [readonly]=\"vm.isExistingDefinition\"\n            [required]=\"true\"\n          ></adapt-rx-textfield>\n\n          <adapt-rx-textarea\n            rx-id=\"description\"\n            class=\"d-block form-group\"\n            [label]=\"'com.bmc.arsys.rx.client.common.description.label' | translate\"\n            formControlName=\"description\"\n            [disabled]=\"vm.isReadOnly\"\n          ></adapt-rx-textarea>\n\n          <div class=\"d-flex justify-center align-items-center w-100\">\n            <rx-definition-picker\n              rx-id=\"first-record\"\n              [options]=\"firstRecordDefinitionPickerOptions\"\n              [formControl]=\"associationForm.get('nodeAId')\"\n              [isDisabled]=\"vm.isExistingDefinition\"\n              required=\"true\"\n              class=\"form-group d-block flex-grow-1 rx-association-input\"\n            ></rx-definition-picker>\n\n            <div class=\"rx-association-designer-arrow-1\"></div>\n\n            <adapt-rx-select\n              rx-id=\"cardinality\"\n              [label]=\"'com.bmc.arsys.rx.client.association-designer.cardinality-field.label' | translate\"\n              [options]=\"cardinalities\"\n              [formControl]=\"associationForm.get('cardinality')\"\n              [optionFormatter]=\"cardinalityOptionsFormatter\"\n              [disabled]=\"vm.isExistingDefinition\"\n              class=\"form-group d-block flex-grow-1 rx-association-input\"\n            ></adapt-rx-select>\n\n            <div class=\"rx-association-designer-arrow-2\"></div>\n\n            <rx-definition-picker\n              rx-id=\"second-record\"\n              [options]=\"secondRecordDefinitionPickerOptions\"\n              [formControl]=\"associationForm.get('nodeBId')\"\n              [isDisabled]=\"vm.isExistingDefinition\"\n              required=\"true\"\n              class=\"form-group d-block flex-grow-1 rx-association-input\"\n            ></rx-definition-picker>\n          </div>\n\n          <div class=\"d-flex justify-center align-items-center w-100\">\n            <adapt-rx-textfield\n              rx-id=\"first-record-role\"\n              class=\"d-block form-group w-100\"\n              [label]=\"'com.bmc.arsys.rx.client.association-designer.first-record-role-field.label' | translate\"\n              formControlName=\"nodeAName\"\n              [disabled]=\"vm.isReadOnly\"\n              [tooltip]=\"firstRecordDefinitionRoleTooltip\"\n            ></adapt-rx-textfield>\n\n            <div class=\"rx-association-designer-arrow-placeholder\"></div>\n\n            <div class=\"flex-grow-1 w-100\"></div>\n\n            <div class=\"rx-association-designer-arrow-placeholder\"></div>\n\n            <adapt-rx-textfield\n              rx-id=\"second-record-role\"\n              class=\"d-block form-group w-100\"\n              [label]=\"'com.bmc.arsys.rx.client.association-designer.second-record-role-field.label' | translate\"\n              formControlName=\"nodeBName\"\n              [disabled]=\"vm.isReadOnly\"\n              [tooltip]=\"secondRecordDefinitionRoleTooltip\"\n            ></adapt-rx-textfield>\n          </div>\n\n          <div *ngIf=\"vm.canCascadeDelete\">\n            <adapt-rx-control-label\n              rx-id=\"add-constraints\"\n              [label]=\"'com.bmc.arsys.rx.client.association-designer.add-constraints-field.label' | translate\"\n              [tooltip]=\"cascadeDeleteTooltip\"\n            ></adapt-rx-control-label>\n\n            <adapt-rx-checkbox\n              rx-id=\"cascade-delete\"\n              formControlName=\"shouldCascadeDelete\"\n              [label]=\"vm.cascadeDeleteLabel\"\n              [readonly]=\"vm.isExistingDefinition\"\n            ></adapt-rx-checkbox>\n\n            <adapt-rx-checkbox\n              rx-id=\"required-association\"\n              formControlName=\"nodeAModality\"\n              [label]=\"vm.recordAssociationLabel\"\n              [readonly]=\"vm.isModalityDisabled || vm.isReadOnly\"\n            ></adapt-rx-checkbox>\n          </div>\n\n          <hr />\n\n          <rx-revert-customization\n            *ngIf=\"vm.revertCustomizationControlOptions\"\n            [options]=\"vm.revertCustomizationControlOptions\"\n            (events)=\"onRevertCustomization($event)\"\n          ></rx-revert-customization>\n\n          <rx-scope-customization-control\n            class=\"d-block mb-5\"\n            *ngIf=\"vm.scopeCustomizationControlOptions\"\n            [options]=\"vm.scopeCustomizationControlOptions\"\n            formControlName=\"customizationOptions\"\n          ></rx-scope-customization-control>\n\n          <adapt-rx-checkbox\n            rx-id=\"is-enabled\"\n            formControlName=\"isEnabled\"\n            [disabled]=\"vm.isReadOnly\"\n            [label]=\"'com.bmc.arsys.rx.client.association-designer.enable-association.label' | translate\"\n          ></adapt-rx-checkbox>\n        </form>\n      </div>\n    </adapt-sidebar>\n  </div>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  ></adapt-code-viewer>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-designer-component{height:calc(100% - 50px)}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;padding:1rem}.rx-association-designer-form{max-width:700px}.rx-association-designer-arrow-1,.rx-association-designer-arrow-2,.rx-association-designer-arrow-placeholder{margin-top:8px;width:30px;height:2px;position:relative;flex-shrink:0}.rx-association-designer-arrow-1:before,.rx-association-designer-arrow-2:before{content:\"\";display:block;position:absolute;background-color:#959899;top:0;left:0;width:100%;height:100%}.rx-association-designer-arrow-2:after{content:\"\";display:block;position:absolute;right:0;top:-3px;border-top:4px solid transparent;border-bottom:4px solid transparent;border-left:10px solid #959899}.rx-association-input{width:213px}adapt-rx-textarea ::ng-deep textarea{resize:none}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}:host ::ng-deep .adapt-sidebar-main{overflow:auto}\n"], components: [{ type: i6.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i7.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i7.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i8.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i7.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i7.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i6.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i7.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i7.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i7.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i6.RxRevertCustomizationComponent, selector: "rx-revert-customization", inputs: ["options", "isDisabled"], outputs: ["events"] }, { type: i6.CustomizationOptionsComponent, selector: "rx-scope-customization-control", inputs: ["options"] }, { type: i7.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i10.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i10.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i10.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i10.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i10.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "async": i9.AsyncPipe, "translate": i5.TranslatePipe, "json": i9.JsonPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-association-designer',
                    templateUrl: './association-designer.component.html',
                    styleUrls: ['./association-designer.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.AssociationDesignerService }, { type: i3.RxGlobalCacheService }, { type: i4.RxAssociationCardinalityPipe }, { type: i3.RxDefinitionNameService }, { type: i5.TranslateService }, { type: i3.RxOverlayService }, { type: i3.RxNotificationService }, { type: i0.Renderer2 }]; }, propDecorators: { configuration: [{
                type: Input
            }], definitionSaved: [{
                type: Output
            }], definitionErrorLoading: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }] } });
//# sourceMappingURL=association-designer.component.js.map