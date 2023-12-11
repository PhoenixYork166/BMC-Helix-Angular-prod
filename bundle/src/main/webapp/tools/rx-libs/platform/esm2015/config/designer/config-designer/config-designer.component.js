import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AdaptDropdownDirective, AdaptSidebarComponent } from '@bmc-ux/adapt-angular';
import { ImpactRowVisibility } from '@helix/platform/config/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_PERMISSION, RxDefinitionNameService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { BooleanFormControlComponent, LabelFormControlComponent, RxPermissionEditorComponent, SelectFormControlComponent, SwitchFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { chain, filter, find, isEmpty, isNil, isNull, reverse, some, toUpper, trim, uniqBy } from 'lodash';
import { combineLatest, of, ReplaySubject, Subject } from 'rxjs';
import { map, shareReplay, skip, startWith, switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { RX_CONFIG_DESIGNER } from '../config-designer.constant';
import { ConfigDesignerService } from '../config-designer.service';
import { FieldDefinitionManagerService } from '../services/field-definition-manager.service';
import * as ConfigDesignerActions from './+state/config-designer.actions';
import { bundleIdSelector, definitionModelSelector, inspectorTabIndexSelector, isDesignModeSelector, isDirtySelector, parentComponentsSelector, savedDefinitionNameSelector, selectedFieldGuidSelector } from './+state/config-designer.selectors';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../config-designer.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "../services/field-definition-manager.service";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@helix/platform/ui-kit";
import * as i9 from "@bmc-ux/adapt-table";
import * as i10 from "@angular/common";
export class ConfigDesignerComponent {
    constructor(store$, configDesignerService, rxGlobalCacheService, translateService, rxDefinitionNameService, fieldDefinitionManagerService) {
        this.store$ = store$;
        this.configDesignerService = configDesignerService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.translateService = translateService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.fieldDefinitionManagerService = fieldDefinitionManagerService;
        this.definitionSaved = new EventEmitter();
        this.definitionErrorLoading = new EventEmitter();
        this.closeDesigner = new EventEmitter();
        this.newTitle = `<${this.translateService.instant('com.bmc.arsys.rx.client.config-designer.new-configuration.title')}>`;
        this.dataTypes = [
            {
                displayName: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.attachment.labelKey),
                dataType: RX_CONFIG_DESIGNER.dataTypes.attachment.resourceType
            },
            {
                displayName: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.boolean.labelKey),
                dataType: RX_RECORD_DEFINITION.dataTypes.boolean.resourceType
            },
            {
                displayName: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.color.labelKey),
                dataType: RX_CONFIG_DESIGNER.dataTypes.color.resourceType
            },
            {
                displayName: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.character.labelKey),
                dataType: RX_RECORD_DEFINITION.dataTypes.character.resourceType
            },
            {
                displayName: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.dateOnly.labelKey),
                dataType: RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType
            },
            {
                displayName: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.integer.labelKey),
                dataType: RX_RECORD_DEFINITION.dataTypes.integer.resourceType
            },
            {
                displayName: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.selection.labelKey),
                dataType: RX_RECORD_DEFINITION.dataTypes.selection.resourceType
            },
            {
                displayName: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.decimal.labelKey),
                dataType: RX_RECORD_DEFINITION.dataTypes.decimal.resourceType
            },
            {
                displayName: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.secure.labelKey),
                dataType: RX_CONFIG_DESIGNER.dataTypes.secure.resourceType
            }
        ].sort((a, b) => a.displayName.localeCompare(b.displayName));
        this.trueLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.true');
        this.falseLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.false');
        this.yesLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label');
        this.noLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.no.label');
        this.destroyed$ = new ReplaySubject(1);
        this.isApplication$ = this.store$.select(bundleIdSelector).pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleDescriptor(bundleId)), map((bundleDescriptor) => bundleDescriptor.isApplication));
        this.inspectorTabIndexSubject = new Subject();
        this.inspectorTabIndex$ = this.store$.select(inspectorTabIndexSelector);
        this.selectedFieldGuid$ = this.store$.select(selectedFieldGuidSelector);
        this.parentComponents$ = this.store$.select(parentComponentsSelector);
        this.isDirty$ = this.store$.select(isDirtySelector);
        this.bundleFriendlyName$ = this.store$
            .select(bundleIdSelector)
            .pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleFriendlyName(bundleId)));
        this.definitionModel$ = this.store$.select(definitionModelSelector);
        this.definitionDisplayName$ = this.definitionModel$.pipe(map((definitionModel) => definitionModel.componentName), startWith(null));
        this.validationIssues$ = this.definitionModel$.pipe(map((definitionModel) => this.validate(definitionModel)), shareReplay(1));
        this.hasValidationErrors$ = this.validationIssues$.pipe(map((issueSections) => some(issueSections, {
            issues: [{ type: ValidationIssueType.Error }]
        })));
        this.isSaveButtonDisabled$ = combineLatest([this.hasValidationErrors$, this.isDirty$]).pipe(map(([hasValidationErrors, isDirty]) => hasValidationErrors || !isDirty), startWith(true));
        this.definitionInspectorConfig$ = combineLatest([
            this.parentComponents$,
            this.bundleFriendlyName$,
            this.isApplication$,
            this.definitionModel$
        ]).pipe(map(([parentComponents, bundleFriendlyName, isApplication, definitionModel]) => this.getDefinitionInspectorConfig(parentComponents, bundleFriendlyName, isApplication, definitionModel)));
        this.inspectorFocusEditorSubject = new Subject();
        this.inspectorFocusEditor$ = this.inspectorFocusEditorSubject.asObservable();
        this.fieldGridRows$ = this.definitionModel$.pipe(map((model) => model.fields.map((field) => {
            var _a, _b;
            return ({
                id: field.id,
                guid: field.guid,
                required: field.required ? this.yesLabel : this.noLabel,
                defaultValue: field.dataType === RX_RECORD_DEFINITION.dataTypes.boolean.resourceType
                    ? this.getBooleanDisplayValue(field.defaultValue)
                    : field.dataType === RX_CONFIG_DESIGNER.dataTypes.color.resourceType
                        ? toUpper(field.defaultValue)
                        : field.dataType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                            ? (_a = field.selectionFieldOptionProperties.optionNamesById) === null || _a === void 0 ? void 0 : _a[field.selectionFieldOptionProperties.defaultValue]
                            : field.defaultValue,
                keySetting: field.keySetting ? this.yesLabel : this.noLabel,
                dataType: this.getDataTypeName(field.dataType),
                fieldGrouping: (_b = field.localeList[0]) === null || _b === void 0 ? void 0 : _b.fieldGrouping
            });
        })));
        this.selectedFieldGridRows$ = this.selectedFieldGuid$.pipe(withLatestFrom(this.fieldGridRows$), map(([guid, fieldGridRows]) => (guid ? [find(fieldGridRows, { guid })] : [])), startWith([]));
        this.selectedFieldModel$ = combineLatest([
            this.selectedFieldGuid$,
            this.definitionModel$
        ]).pipe(map(([guid, definitionModel]) => find(definitionModel.fields, { guid })), startWith(null), shareReplay(1));
        this.selectedFieldInspectorConfig$ = this.selectedFieldModel$.pipe(map((fieldModel) => fieldModel
            ? this.fieldDefinitionManagerService.getFieldInspectorConfig(fieldModel.dataType, {
                isNew: fieldModel.isNew,
                selectionFieldOptionProperties: fieldModel.selectionFieldOptionProperties
            })
            : null));
        this.breadcrumbItems$ = combineLatest([
            this.definitionDisplayName$,
            this.selectedFieldModel$
        ]).pipe(map(([definitionDisplayName, selectedFieldModel]) => [
            {
                data: null,
                label: this.rxDefinitionNameService.getDisplayName(this.configuration.definitionName) ||
                    definitionDisplayName ||
                    this.newTitle
            },
            { data: null, label: selectedFieldModel === null || selectedFieldModel === void 0 ? void 0 : selectedFieldModel.id }
        ].filter((item) => item.label)));
        this.definitionFromDefinitionModel$ = this.definitionModel$.pipe(map((definitionModel) => this.configDesignerService.getDefinitionFromDefinitionModel(definitionModel)));
        this.isDesignMode$ = this.store$.select(isDesignModeSelector);
        this.definitionForJsonViewer$ = this.isDesignMode$.pipe(switchMap((isDesignMode) => (isDesignMode ? of(null) : this.definitionFromDefinitionModel$)));
        this.vm$ = combineLatest([
            this.breadcrumbItems$,
            this.bundleFriendlyName$,
            this.definitionDisplayName$,
            this.definitionForJsonViewer$,
            this.definitionInspectorConfig$,
            this.definitionModel$,
            this.fieldGridRows$,
            this.hasValidationErrors$,
            this.isSaveButtonDisabled$,
            this.selectedFieldGridRows$,
            this.selectedFieldGuid$,
            this.selectedFieldInspectorConfig$,
            this.selectedFieldModel$,
            this.validationIssues$
        ]).pipe(map(([breadcrumbItems, bundleFriendlyName, definitionDisplayName, definitionForJsonViewer, definitionInspectorConfig, definitionModel, fieldGridRows, hasValidationErrors, isSaveButtonDisabled, selectedFieldGridRows, selectedFieldGuid, selectedFieldInspectorConfig, selectedFieldModel, validationIssues]) => ({
            breadcrumbItems,
            bundleFriendlyName,
            definitionDisplayName,
            definitionForJsonViewer,
            definitionInspectorConfig,
            definitionModel,
            fieldGridRows,
            hasValidationErrors,
            isSaveButtonDisabled,
            selectedFieldGridRows,
            selectedFieldGuid,
            selectedFieldInspectorConfig,
            selectedFieldModel,
            validationIssues
        })));
        this.columns = [
            {
                field: 'id',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label'),
                filterable: false
            },
            {
                field: 'dataType',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.data-type.label'),
                filterable: false
            },
            {
                field: 'required',
                header: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.grid.column.required-field.title'),
                filterable: false
            },
            {
                field: 'defaultValue',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                filterable: false
            },
            {
                field: 'fieldGrouping',
                header: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.grid.column.field-group.title'),
                filterable: false
            },
            {
                field: 'keySetting',
                header: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.grid.column.key-field.title'),
                filterable: false
            }
        ];
    }
    ngOnChanges(changes) {
        if (changes.configuration.currentValue) {
            this.store$.dispatch(ConfigDesignerActions.init({ payload: this.configuration }));
        }
    }
    ngOnInit() {
        this.inspectorTabIndexSubject.pipe(skip(1), takeUntil(this.destroyed$)).subscribe((inspectorTabIndex) => {
            this.store$.dispatch(ConfigDesignerActions.setInspectorTabIndex({ inspectorTabIndex }));
        });
        this.inspectorTabIndex$.pipe(skip(1), takeUntil(this.destroyed$)).subscribe((inspectorTabIndex) => {
            if (!isNull(inspectorTabIndex)) {
                this.adaptSidebarComponent.openPanel(inspectorTabIndex);
            }
        });
        this.store$
            .select(savedDefinitionNameSelector)
            .pipe(skip(1), takeUntil(this.destroyed$))
            .subscribe((savedDefinitionName) => {
            this.definitionSaved.emit(savedDefinitionName);
        });
    }
    onSelectionChange(selectedFieldModel) {
        this.store$.dispatch(ConfigDesignerActions.setSelectedFieldGuid({ guid: selectedFieldModel === null || selectedFieldModel === void 0 ? void 0 : selectedFieldModel.guid }));
    }
    canDeactivate() {
        let canDeactivate = true;
        this.isDirty$.pipe(take(1)).subscribe((isDirty) => {
            canDeactivate = !isDirty;
        });
        return canDeactivate;
    }
    saveDefinition() {
        this.store$.dispatch(ConfigDesignerActions.saveDefinition());
    }
    onCorrectIssue(validationIssue) {
        if (validationIssue.data.noFieldAdded) {
            this.createNewFieldDropdown.open();
        }
        if (validationIssue.data.guid) {
            this.store$.dispatch(ConfigDesignerActions.setSelectedFieldGuid({ guid: validationIssue.data.guid }));
        }
        else {
            this.store$.dispatch(ConfigDesignerActions.setInspectorTabIndex({ inspectorTabIndex: 0 }));
        }
        if (validationIssue.data.editFieldGroups) {
            this.store$.dispatch(ConfigDesignerActions.editFieldGroups());
        }
        setTimeout(() => this.inspectorFocusEditorSubject.next({
            editorName: validationIssue.data.propertyName,
            data: validationIssue.data.data
        }), 10);
    }
    onDefinitionModelChange(newDefinitionModel) {
        this.store$.dispatch(ConfigDesignerActions.updateDefinitionModelFromDesigner({
            definitionModelFromDesigner: newDefinitionModel
        }));
    }
    onSelectedFieldModelChange(newSelectedFieldModel) {
        this.store$.dispatch(ConfigDesignerActions.updateSelectedFieldModel({ selectedFieldModel: newSelectedFieldModel }));
    }
    validate(definitionModel) {
        const duplicateFieldErrorMsg = this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.must-be-unique.message', { propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label') });
        const definitionValidationIssues = [];
        const fieldValidationIssueSections = [];
        chain(definitionModel.fields)
            .clone()
            .reverse()
            .forEach((fieldModel, index, fieldModels) => {
            let issues = [];
            if (find(fieldModels, (model) => fieldModel.id === model.id, index + 1)) {
                issues.push({
                    type: ValidationIssueType.Error,
                    description: duplicateFieldErrorMsg,
                    data: {
                        propertyName: 'id',
                        guid: fieldModel.guid
                    }
                });
            }
            if (!fieldModel.localeList[0].fieldGrouping) {
                issues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.field-has-no-group.message'),
                    data: {
                        editFieldGroups: true,
                        guid: fieldModel.guid
                    }
                });
            }
            issues = issues.concat(this.fieldDefinitionManagerService.validate(fieldModel));
            if (issues.length) {
                fieldValidationIssueSections.push({
                    title: fieldModel.id,
                    issues: issues
                });
            }
        })
            .value();
        if (isEmpty(trim(definitionModel.componentName))) {
            definitionValidationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.component-name.label')
                }),
                data: {
                    propertyName: 'componentName'
                }
            });
        }
        if (isEmpty(trim(definitionModel.componentLabel))) {
            definitionValidationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.component-label.label')
                }),
                data: {
                    propertyName: 'componentLabel'
                }
            });
        }
        if (isNil(definitionModel.parentComponentName) &&
            (definitionModel.isSettingAccessibleInInnovationStudio || definitionModel.isSettingAccessibleInApplication) &&
            !definitionModel.firstMenu) {
            definitionValidationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.first-menu.label')
                }),
                data: {
                    propertyName: 'firstMenu'
                }
            });
        }
        if (!definitionModel.fields.length) {
            definitionValidationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.setting-has-no-fields-error.message'),
                data: { noFieldAdded: true }
            });
        }
        if (definitionModel.impactRowVisibility === ImpactRowVisibility.User) {
            const keySettingsCount = filter(definitionModel.fields, { keySetting: true }).length;
            if (keySettingsCount > 1) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.multiple-key-fields-not-allowed-error.message'),
                    data: {
                        propertyName: 'keySetting'
                    }
                });
            }
        }
        if (!isNil(definitionModel.parentComponentName)) {
            const uniqFieldGroups = uniqBy(definitionModel.fields, 'localeList[0].fieldGrouping');
            if (uniqFieldGroups.length > 1) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.multiple-field-groups-not-allowed-error.message'),
                    data: {
                        propertyName: 'parentComponentName'
                    }
                });
            }
        }
        let issues = [];
        if (definitionValidationIssues.length) {
            issues.push({
                title: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.title'),
                issues: definitionValidationIssues
            });
        }
        issues = issues.concat(reverse(fieldValidationIssueSections));
        return issues;
    }
    addNewField(resourceType, isLoginNameField = false) {
        this.store$.dispatch(ConfigDesignerActions.createNewFieldModel({ resourceType: resourceType, isLoginNameField }));
    }
    editFieldGroups() {
        this.store$.dispatch(ConfigDesignerActions.editFieldGroups());
    }
    getDataTypeName(dataType) {
        return find(this.dataTypes, { dataType }).displayName;
    }
    onBreadcrumbSelected() {
        this.store$.dispatch(ConfigDesignerActions.clearSelectedFieldGuid());
    }
    toggleDesignMode() {
        this.store$.dispatch(ConfigDesignerActions.toggleDesignMode());
    }
    onSidebarToggle(event) {
        this.inspectorTabIndexSubject.next(event.id);
    }
    getDefinitionInspectorConfig(parentComponents, bundleFriendlyName, isApplication, definitionModel) {
        const configs = [];
        const generalControls = [];
        generalControls.push({
            name: 'componentName',
            component: TextFormControlComponent,
            isDisabled: Boolean(this.configuration.definitionName),
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.component-name.label'),
                required: true
            }
        });
        if (isNil(definitionModel.parentComponentName)) {
            generalControls.push({
                name: '',
                component: LabelFormControlComponent,
                options: {
                    labelKey: 'com.bmc.arsys.rx.client.config-designer.config-properties.enable-access-from.label'
                }
            });
            generalControls.push({
                name: 'isSettingAccessibleInInnovationStudio',
                component: BooleanFormControlComponent,
                options: {
                    label: 'Innovation Studio',
                    shouldDisplayAsCheckbox: true
                }
            });
            if (isApplication) {
                generalControls.push({
                    name: 'isSettingAccessibleInApplication',
                    component: BooleanFormControlComponent,
                    options: {
                        label: bundleFriendlyName,
                        shouldDisplayAsCheckbox: true
                    }
                });
            }
        }
        generalControls.push({
            name: 'componentLabel',
            component: TextFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.component-label.label'),
                required: true
            }
        });
        generalControls.push({
            name: 'supportsMultiple',
            component: SwitchFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.repeat-setting.label')
            }
        });
        generalControls.push({
            name: 'parentComponentName',
            component: SelectFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.parent-setting.label'),
                options: parentComponents
                    .filter((componentName) => componentName !== definitionModel.componentName)
                    .map((item) => ({ id: item, name: item })),
                emptyOption: true
            }
        });
        if (isNil(definitionModel.parentComponentName) && definitionModel.supportsMultiple) {
            generalControls.push({
                name: 'impactRowVisibility',
                component: SelectFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.visibility.label'),
                    options: [
                        {
                            id: ImpactRowVisibility.None,
                            name: this.translateService.instant('com.bmc.arsys.rx.client.common.none.label')
                        },
                        {
                            id: ImpactRowVisibility.User,
                            name: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.visibility.options.user.label')
                        }
                    ],
                    beforeValueChange: (oldValue, newValue) => {
                        if (newValue === ImpactRowVisibility.User) {
                            const isLoginNameFieldExists = find(definitionModel.fields, {
                                id: 'LoginName',
                                dataType: RX_RECORD_DEFINITION.dataTypes.character.resourceType
                            });
                            if (!isLoginNameFieldExists) {
                                setTimeout(() => {
                                    this.addNewField(RX_RECORD_DEFINITION.dataTypes.character.resourceType, true);
                                });
                            }
                        }
                        return Promise.resolve(true);
                    }
                }
            });
        }
        if (definitionModel.impactRowVisibility !== ImpactRowVisibility.User) {
            generalControls.push({
                name: 'permissions',
                component: RxPermissionEditorComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.permissions.label'),
                    type: 'config',
                    permissionScope: RX_PERMISSION.permissionScope.all
                }
            });
        }
        configs.push({
            label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
            controls: generalControls
        });
        if (isNil(definitionModel.parentComponentName) &&
            (definitionModel.isSettingAccessibleInApplication || definitionModel.isSettingAccessibleInInnovationStudio)) {
            configs.push({
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.navigation-section.label'),
                controls: [
                    {
                        name: 'firstMenu',
                        component: TextFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.first-menu.label'),
                            required: true
                        }
                    },
                    {
                        name: 'secondMenu',
                        component: TextFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.second-menu.label')
                        }
                    }
                ]
            });
        }
        return configs;
    }
    getBooleanDisplayValue(defaultValue) {
        if (defaultValue === 'true') {
            return this.trueLabel;
        }
        else if (defaultValue === 'false') {
            return this.falseLabel;
        }
        else {
            return null;
        }
    }
    deleteSelectedField() {
        this.store$.dispatch(ConfigDesignerActions.deleteSelectedField());
    }
    onFormInitialized() {
        this.inspectorFocusEditorSubject.next({
            editorName: 'componentName',
            data: {}
        });
    }
    destroyConfigDesigner() {
        this.store$.dispatch(ConfigDesignerActions.destroy());
    }
    ngOnDestroy() {
        this.inspectorTabIndexSubject.complete();
        this.inspectorFocusEditorSubject.complete();
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.destroyConfigDesigner();
    }
}
ConfigDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerComponent, deps: [{ token: i1.Store }, { token: i2.ConfigDesignerService }, { token: i3.RxGlobalCacheService }, { token: i4.TranslateService }, { token: i3.RxDefinitionNameService }, { token: i5.FieldDefinitionManagerService }], target: i0.ɵɵFactoryTarget.Component });
ConfigDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ConfigDesignerComponent, selector: "rx-config-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, viewQueries: [{ propertyName: "adaptSidebarComponent", first: true, predicate: AdaptSidebarComponent, descendants: true }, { propertyName: "createNewFieldDropdown", first: true, predicate: ["createNewFieldDropdown"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (save)=\"saveDefinition()\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    (breadcrumbSelected)=\"onBreadcrumbSelected()\"\n    (toggleDesignMode)=\"toggleDesignMode()\"\n    [isDesignMode]=\"!vm.definitionForJsonViewer\"\n  ></rx-designer-header>\n\n  <adapt-sidebar\n    [openedId]=\"0\"\n    [adjustMainContainerWidth]=\"true\"\n    position=\"right\"\n    class=\"h-100\"\n    [hidden]=\"vm.definitionForJsonViewer\"\n    (isPanelOpenedCurrently)=\"onSidebarToggle($event)\"\n  >\n    <adapt-sidebar-item\n      iconClass=\"d-icon-pencil\"\n      [headerTitle]=\"'com.bmc.arsys.rx.client.config-designer.config-properties.title.label' | translate\"\n      [tooltipText]=\"'com.bmc.arsys.rx.client.config-designer.config-properties.title.label' | translate\"\n    >\n      <rx-form-builder\n        [config]=\"vm.definitionInspectorConfig\"\n        [model]=\"vm.definitionModel\"\n        [focusEditor$]=\"inspectorFocusEditor$\"\n        (modelChange)=\"onDefinitionModelChange($event)\"\n        (formInitialized)=\"onFormInitialized()\"\n      ></rx-form-builder>\n    </adapt-sidebar-item>\n\n    <adapt-sidebar-item\n      iconClass=\"d-icon-gear\"\n      [headerTitle]=\"'com.bmc.arsys.rx.client.common.settings.label' | translate\"\n      [tooltipText]=\"'com.bmc.arsys.rx.client.common.settings.label' | translate\"\n    >\n      <rx-form-builder\n        [config]=\"vm.selectedFieldInspectorConfig\"\n        [model]=\"vm.selectedFieldModel\"\n        (modelChange)=\"onSelectedFieldModelChange($event)\"\n        [guid]=\"vm.selectedFieldGuid\"\n        [focusEditor$]=\"inspectorFocusEditor$\"\n      ></rx-form-builder>\n\n      <adapt-alert\n        [hidden]=\"vm.selectedFieldModel\"\n        class=\"p-3\"\n        [config]=\"{\n          content: 'com.bmc.arsys.rx.client.designer.validation.no-field-selected.message' | translate,\n          variant: 'info',\n          type: 'inline'\n        }\"\n      ></adapt-alert>\n    </adapt-sidebar-item>\n\n    <adapt-sidebar-item\n      [iconClass]=\"vm.hasValidationErrors ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\"\n      headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n    >\n      <rx-validation-issues\n        (correctIssue)=\"onCorrectIssue($event)\"\n        [issueSections]=\"vm.validationIssues\"\n        [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.config-definition.label' | translate\"\n      ></rx-validation-issues>\n    </adapt-sidebar-item>\n\n    <div class=\"main h-100 d-flex flex-column\">\n      <h1 class=\"mt-0\">\n        {{ (configuration.definitionName | rxDefinitionNamePipe) || vm.definitionDisplayName || newTitle }}\n      </h1>\n\n      <section class=\"h-100 d-flex flex-column\">\n        <div class=\"d-flex border border-bottom-0\">\n          <div class=\"dropdown\" adaptDropdown #createNewFieldDropdown>\n            <button\n              adapt-button\n              adaptDropdownToggle\n              type=\"button\"\n              btn-type=\"tertiary\"\n              class=\"d-icon-plus_circle\"\n              rx-id=\"new-field-button\"\n            >\n              {{ 'com.bmc.arsys.rx.client.designer.new-field.button.label' | translate }}\n            </button>\n\n            <div class=\"dropdown-menu\" adaptDropdownMenu>\n              <button *ngFor=\"let dataType of dataTypes\" class=\"dropdown-item\" (click)=\"addNewField(dataType.dataType)\">\n                {{ dataType.displayName }}\n              </button>\n            </div>\n          </div>\n\n          <button\n            adapt-button\n            type=\"button\"\n            btn-type=\"tertiary\"\n            class=\"d-icon-list_ordered\"\n            (click)=\"editFieldGroups()\"\n            rx-id=\"edit-field-groups-button\"\n            [disabled]=\"!vm.fieldGridRows.length\"\n          >\n            {{ 'com.bmc.arsys.rx.client.config-designer.edit-field-groups.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            type=\"button\"\n            btn-type=\"tertiary\"\n            class=\"d-icon-trash\"\n            (click)=\"deleteSelectedField()\"\n            rx-id=\"delete-field-button\"\n            [disabled]=\"!vm.selectedFieldGridRows.length\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.delete.label' | translate }}\n          </button>\n        </div>\n\n        <adapt-table\n          [value]=\"vm.fieldGridRows\"\n          [selection]=\"vm.selectedFieldGridRows\"\n          [columns]=\"columns\"\n          [scrollable]=\"true\"\n          scrollHeight=\"flex\"\n          [sortable]=\"true\"\n          [resizableColumns]=\"false\"\n          [bordered]=\"true\"\n          [dataKey]=\"'guid'\"\n          [selectionMode]=\"'single'\"\n          (selectionChange)=\"onSelectionChange($event)\"\n        >\n        </adapt-table>\n      </section>\n    </div>\n  </adapt-sidebar>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  ></adapt-code-viewer>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper{border-top:0}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper .adapt-sidebar-panel-content{padding:0}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper .card{border-left:0;border-right:0}\n"], components: [{ type: i6.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i7.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i7.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i6.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i7.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i8.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i7.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i7.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i7.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i7.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i10.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i10.AsyncPipe, "translate": i4.TranslatePipe, "rxDefinitionNamePipe": i3.RxDefinitionNamePipe, "json": i10.JsonPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-config-designer',
                    templateUrl: './config-designer.component.html',
                    styleUrls: ['./config-designer.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.ConfigDesignerService }, { type: i3.RxGlobalCacheService }, { type: i4.TranslateService }, { type: i3.RxDefinitionNameService }, { type: i5.FieldDefinitionManagerService }]; }, propDecorators: { adaptSidebarComponent: [{
                type: ViewChild,
                args: [AdaptSidebarComponent, { static: false }]
            }], createNewFieldDropdown: [{
                type: ViewChild,
                args: ['createNewFieldDropdown', { static: false }]
            }], configuration: [{
                type: Input
            }], definitionSaved: [{
                type: Output
            }], definitionErrorLoading: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }] } });
//# sourceMappingURL=config-designer.component.js.map