import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AdaptSidebarComponent } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService, RxRecordDefinitionCacheService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { ExpressionOperatorGroup, ExpressionOperatorRowsByGroup, RxDefinitionNameService, RxGlobalCacheService, RxNotificationService, RxOverlayService } from '@helix/platform/shared/api';
import { RxModalService, ValidationIssueType } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { capitalize, chain, find, includes, intersectionBy, invert, isEmpty, isNull, isNumber, map as _map, noop, some } from 'lodash';
import { combineLatest, from, of, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck, scan, shareReplay, skip, startWith, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { RxFieldDefinitionManagerService } from './services/field-definition-manager.service';
import * as RecordDesignerActions from './+state/record-designer.actions';
import { Store } from '@ngrx/store';
import { bundleIdSelector, definitionModelFromDefinitionSelector, definitionModelSelector, inspectorTabIndexSelector, isDesignModeSelector, isDirtySelector, savedDefinitionNameSelector, selectedFieldGuidSelector } from './+state/record-designer.selectors';
import { RxRecordDefinitionValidatorService } from './record-definition-validator.service';
import { RxRecordDesignerInspectorService } from './record-designer-inspector.service';
import { InheritanceIssueInfoComponent } from './inheritance-issue-info/inheritance-issue-info.component';
import { RxRecordDesignerService } from './record-designer.service';
import { RX_EXPRESSION_EDITOR, RxExpressionEditorService } from '@helix/platform/shared/components';
import { RecordDesignerExpressionConfigurator } from './record-designer-expression-configurator.class';
import { RX_RECORD_DESIGNER } from './record-designer.constant';
import { AddJoinFieldsEditorComponent } from './add-join-fields-editor/add-join-fields-editor.component';
import { RxGuidService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "./record-definition-validator.service";
import * as i4 from "./record-designer-inspector.service";
import * as i5 from "./services/field-definition-manager.service";
import * as i6 from "@helix/platform/record/api";
import * as i7 from "@ngx-translate/core";
import * as i8 from "@angular/common";
import * as i9 from "@helix/platform/ui-kit";
import * as i10 from "./record-designer.service";
import * as i11 from "@helix/platform/shared/components";
import * as i12 from "@helix/platform/utils";
import * as i13 from "@bmc-ux/adapt-angular";
import * as i14 from "@bmc-ux/adapt-table";
export class RecordDesignerComponent {
    constructor(store$, rxNotificationService, rxOverlayService, rxRecordDefinitionValidatorService, rxRecordDesignerInspectorService, rxDefinitionNameService, rxFieldDefinitionManagerService, rxRecordDefinitionService, rxGlobalCacheService, translateService, datePipe, rxModalService, rxFieldDefinitionService, rxRecordDesignerService, rxExpressionEditorService, rxRecordDefinitionCacheService, rxGuidService, injector) {
        this.store$ = store$;
        this.rxNotificationService = rxNotificationService;
        this.rxOverlayService = rxOverlayService;
        this.rxRecordDefinitionValidatorService = rxRecordDefinitionValidatorService;
        this.rxRecordDesignerInspectorService = rxRecordDesignerInspectorService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxFieldDefinitionManagerService = rxFieldDefinitionManagerService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.translateService = translateService;
        this.datePipe = datePipe;
        this.rxModalService = rxModalService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxRecordDesignerService = rxRecordDesignerService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxGuidService = rxGuidService;
        this.injector = injector;
        this.definitionSaved = new EventEmitter();
        this.definitionErrorLoading = new EventEmitter();
        this.closeDesigner = new EventEmitter();
        this.newTitle = `<${this.translateService.instant('com.bmc.arsys.rx.client.record-designer.new-record.title')}>`;
        this.definition = null;
        this.isInheritColumnHidden = true;
        this.isJoinRecordDefinition = false;
        this.dataTypes = [
            RX_RECORD_DEFINITION.dataTypes.attachment,
            RX_RECORD_DEFINITION.dataTypes.boolean,
            RX_RECORD_DEFINITION.dataTypes.character,
            RX_RECORD_DEFINITION.dataTypes.dateOnly,
            RX_RECORD_DEFINITION.dataTypes.dateTime,
            RX_RECORD_DEFINITION.dataTypes.localizedCharacter,
            RX_RECORD_DEFINITION.dataTypes.timeOnly,
            RX_RECORD_DEFINITION.dataTypes.integer,
            RX_RECORD_DEFINITION.dataTypes.selection,
            RX_RECORD_DEFINITION.dataTypes.decimal,
            RX_RECORD_DEFINITION.dataTypes.real
        ].sort((a, b) => a.displayName.localeCompare(b.displayName));
        this.inspectorTabIndexSubject = new Subject();
        this.inspectorTabIndex$ = this.store$.select(inspectorTabIndexSelector);
        this.selectedFieldGuid$ = this.store$.select(selectedFieldGuidSelector);
        this.destroyed$ = new ReplaySubject(1);
        this.inspectorFocusEditorSubject = new Subject();
        this.inspectorFocusEditor$ = this.inspectorFocusEditorSubject.asObservable();
        this.bundleId$ = this.store$.select(bundleIdSelector);
        this.isDesignMode$ = this.store$.select(isDesignModeSelector);
        this.definitionModel$ = this.store$.select(definitionModelSelector);
        this.isDirty$ = this.store$.select(isDirtySelector);
        this.bundleFriendlyName$ = this.bundleId$.pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleFriendlyName(bundleId)));
        this.definitionDisplayName$ = this.definitionModel$.pipe(map((updatedModel) => this.rxDefinitionNameService.getDisplayName(updatedModel.name)), startWith(null));
        this.definitionModelFromDefinition$ = this.store$
            .select(definitionModelFromDefinitionSelector)
            .pipe(shareReplay(1));
        this.primaryRecordDefinition$ = this.definitionModelFromDefinition$.pipe(pluck('primaryRecordDefinitionName'), distinctUntilChanged(), filter(Boolean), switchMap((primaryRecordDefinitionName) => this.rxRecordDefinitionCacheService.getRecordDefinition(primaryRecordDefinitionName)));
        this.secondaryRecordDefinition$ = this.definitionModelFromDefinition$.pipe(pluck('secondaryRecordDefinitionName'), distinctUntilChanged(), filter(Boolean), switchMap((secondaryRecordDefinitionName) => this.rxRecordDefinitionCacheService.getRecordDefinition(secondaryRecordDefinitionName)));
        this.joinRecordDataDictionary$ = combineLatest([
            this.primaryRecordDefinition$,
            this.secondaryRecordDefinition$
        ]).pipe(map(([primaryRecordDefinition, secondaryRecordDefinition]) => [
            {
                recordDefinitionName: this.rxDefinitionNameService.getDisplayName(primaryRecordDefinition.name),
                label: `(${this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.primary.label')})`,
                type: RX_RECORD_DEFINITION.sourceRecordTypes.primary,
                fieldDefinitions: primaryRecordDefinition.fieldDefinitions
            },
            {
                recordDefinitionName: this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinition.name),
                label: `(${this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.secondary.label')})`,
                type: RX_RECORD_DEFINITION.sourceRecordTypes.secondary,
                fieldDefinitions: secondaryRecordDefinition.fieldDefinitions
            }
        ]), map((records) => {
            return records.map((record) => ({
                label: `${record.recordDefinitionName} ${record.label}`,
                expanded: true,
                children: chain(record.fieldDefinitions)
                    .map((fieldDefinition) => {
                    if (fieldDefinition.resourceType !== RX_RECORD_DEFINITION.dataTypes.attachment.resourceType) {
                        return {
                            label: `${record.recordDefinitionName}.${fieldDefinition.name}`,
                            icon: 'd-icon-field_text',
                            expression: `\${${record.recordDefinitionName}.${record.type}.${fieldDefinition.name}}`
                        };
                    }
                })
                    .compact()
                    .sortBy((item) => item.label.toLocaleLowerCase())
                    .value()
            }));
        }));
        this.isNewDefinition$ = this.definitionModelFromDefinition$.pipe(map((definitionModel) => !Boolean(definitionModel.lastUpdateTime)));
        this.isJoinRecordDefinition$ = this.definitionModelFromDefinition$.pipe(map((definitionModel) => this.rxRecordDefinitionService.isJoinRecord(definitionModel)), shareReplay(1));
        this.definitionFromDefinitionModel$ = combineLatest([
            this.definitionModel$,
            this.bundleId$
        ]).pipe(map(([definitionModel, bundleId]) => this.rxRecordDesignerService.getDefinitionFromDefinitionModel(definitionModel, bundleId)));
        this.isFieldsCustomizationAllowed$ = this.definitionFromDefinitionModel$.pipe(map((recordDefinition) => this.rxOverlayService.isCustomizationEnabled('allowFieldsOverlay', recordDefinition)), distinctUntilChanged(), shareReplay(1));
        this.isPropertiesCustomizationAllowed$ = this.definitionFromDefinitionModel$.pipe(map((recordDefinition) => this.rxOverlayService.isCustomizationEnabled('allowOtherPropertiesOverlay', recordDefinition)), distinctUntilChanged(), shareReplay(1));
        this.isPermissionsCustomizationAllowed$ = this.definitionFromDefinitionModel$.pipe(map((recordDefinition) => this.rxOverlayService.isCustomizationEnabled('allowPermissionsOverlay', recordDefinition)), distinctUntilChanged(), shareReplay(1));
        this.isIndexCustomizationAllowed$ = this.definitionFromDefinitionModel$.pipe(map((recordDefinition) => this.rxOverlayService.isCustomizationEnabled('allowIndexesOverlay', recordDefinition)), distinctUntilChanged(), shareReplay(1));
        this.areNewDefinitionsAllowed$ = this.bundleId$.pipe(switchMap((bundleId) => this.rxOverlayService.areNewDefinitionsAllowed(bundleId)));
        this.isReadOnly$ = this.definitionFromDefinitionModel$.pipe(filter((definition) => !!definition.lastUpdateTime), withLatestFrom(this.areNewDefinitionsAllowed$, this.isFieldsCustomizationAllowed$, this.isPropertiesCustomizationAllowed$, this.isPermissionsCustomizationAllowed$, this.isIndexCustomizationAllowed$), map(([definition, areNewDefinitionsAllowed, isFieldsCustomizationAllowed, isPropertiesCustomizationAllowed, isPermissionsCustomizationAllowed, isIndexCustomizationAllowed]) => !areNewDefinitionsAllowed ||
            (!isFieldsCustomizationAllowed &&
                !isPropertiesCustomizationAllowed &&
                !isPermissionsCustomizationAllowed &&
                !isIndexCustomizationAllowed)), tap((isReadOnly) => {
            if (isReadOnly) {
                this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.read-only-definition-warning.message'));
            }
        }), startWith(false), shareReplay(1));
        this.definitionInspectorConfig$ = combineLatest([
            this.isNewDefinition$,
            this.definitionModel$,
            this.definitionModelFromDefinition$,
            this.bundleId$,
            this.isPropertiesCustomizationAllowed$,
            this.isIndexCustomizationAllowed$,
            this.isPermissionsCustomizationAllowed$,
            this.isFieldsCustomizationAllowed$,
            this.isReadOnly$
        ]).pipe(map(([isNewDefinition, definitionModel, definitionModelFromDefinition, bundleId, isPropertiesCustomizationAllowed, isIndexCustomizationAllowed, isPermissionsCustomizationAllowed, isFieldsCustomizationAllowed, isReadOnly]) => this.rxRecordDesignerInspectorService.getDefinitionInspectorConfig(isNewDefinition, definitionModel, definitionModelFromDefinition, bundleId, isPropertiesCustomizationAllowed, isIndexCustomizationAllowed, isPermissionsCustomizationAllowed, isFieldsCustomizationAllowed, isReadOnly, this.expressionConfigurator)));
        this.fieldGridRows$ = this.definitionModel$.pipe(map((model) => model.fields.map((field) => {
            var _a, _b;
            const invertedSourceRecordTypes = invert(RX_RECORD_DEFINITION.sourceRecordTypes);
            const type = invertedSourceRecordTypes[(_a = field.fieldMapping) === null || _a === void 0 ? void 0 : _a.source];
            return {
                guid: field.guid,
                name: field.name,
                id: isNumber(field.id) ? field.id : '',
                isInherited: field.isInherited,
                fieldOption: field.fieldOption,
                defaultValue: field.resourceType === RX_RECORD_DEFINITION.resourceTypes.selection
                    ? (_b = field.selectionFieldOptionProperties.optionNamesById) === null || _b === void 0 ? void 0 : _b[field.selectionFieldOptionProperties.defaultValue]
                    : field.resourceType === RX_RECORD_DEFINITION.resourceTypes.dateOnly
                        ? this.datePipe.transform(field.defaultValue)
                        : field.resourceType === RX_RECORD_DEFINITION.resourceTypes.dateTime
                            ? this.datePipe.transform(field.defaultValue, 'medium')
                            : field.defaultValue,
                resourceType: this.translateService.instant(find(RX_RECORD_DEFINITION.dataTypes, { resourceType: field.resourceType }).labelKey),
                isCoreField: this.rxFieldDefinitionService.isCoreField(field),
                sourceRecord: includes(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds, field.id)
                    ? ''
                    : this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.source-record.label', {
                        recordName: this.rxDefinitionNameService.getDisplayName(model[type + 'RecordDefinitionName']),
                        recordType: capitalize(type)
                    })
            };
        })));
        this.isExternalRecordDefinition$ = this.definitionModel$.pipe(map((definitionModel) => this.rxRecordDefinitionService.isExternalRecord(definitionModel)));
        this.selectedFieldGridRows$ = this.selectedFieldGuid$.pipe(withLatestFrom(this.fieldGridRows$), map(([guid, fieldGridRows]) => (guid ? [find(fieldGridRows, { guid })] : [])), startWith([]));
        this.selectedFieldModel$ = combineLatest([
            this.selectedFieldGuid$,
            this.definitionModel$
        ]).pipe(map(([guid, definitionModel]) => find(definitionModel.fields, { guid })), startWith(null), shareReplay(1));
        this.selectedFieldInspectorConfig$ = this.selectedFieldModel$.pipe(withLatestFrom(this.definitionModel$, this.isReadOnly$), map(([fieldModel, definitionModel, isReadOnly]) => fieldModel
            ? this.rxFieldDefinitionManagerService.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly)
            : null));
        this.isJoinOrExternalRecord$ = combineLatest([
            this.isJoinRecordDefinition$,
            this.isExternalRecordDefinition$
        ]).pipe(map(([isJoinRecordDefinition, isExternalRecordDefinition]) => isJoinRecordDefinition || isExternalRecordDefinition));
        this.validationIssues$ = this.definitionModel$.pipe(map((definitionModel) => this.rxRecordDefinitionValidatorService.validate(definitionModel)));
        this.hasValidationErrors$ = this.validationIssues$.pipe(map((issueSections) => some(issueSections, {
            issues: [{ type: ValidationIssueType.Error }]
        })), distinctUntilChanged());
        this.hasValidationWarnings$ = this.validationIssues$.pipe(map((issueSections) => some(issueSections, {
            issues: [{ type: ValidationIssueType.Warning }]
        })), distinctUntilChanged());
        this.isSaveButtonDisabled$ = combineLatest([
            this.hasValidationErrors$,
            this.isDirty$,
            this.isReadOnly$
        ]).pipe(map(([hasValidationErrors, isDirty, isReadOnly]) => hasValidationErrors || !isDirty || isReadOnly), startWith(true));
        this.breadcrumbItems$ = combineLatest([
            this.definitionDisplayName$,
            this.selectedFieldModel$
        ]).pipe(map(([definitionDisplayName, selectedFieldModel]) => {
            var _a;
            return [
                {
                    data: null,
                    label: this.rxDefinitionNameService.getDisplayName((_a = this.definition) === null || _a === void 0 ? void 0 : _a.name) || definitionDisplayName || this.newTitle
                },
                { data: null, label: selectedFieldModel === null || selectedFieldModel === void 0 ? void 0 : selectedFieldModel.name }
            ].filter((item) => item.label);
        }));
        this.definitionForJsonViewer$ = this.isDesignMode$.pipe(switchMap((isDesignMode) => (isDesignMode ? of(null) : this.definitionFromDefinitionModel$)));
        this.overriddenRecordProperties$ = combineLatest([
            this.definitionModelFromDefinition$,
            this.definitionModel$
        ]).pipe(scan((acc, [definitionModelFromDefinition, definitionModel]) => {
            const overriddenRecordFields = intersectionBy(definitionModelFromDefinition.fields, definitionModel.recordInheritanceSelector.inheritedFieldDefinitions, 'id');
            acc = Object.assign(Object.assign({}, acc), { fields: _map(overriddenRecordFields, 'name').join(', ') });
            return acc;
        }, {}));
        this.isDeleteFieldButtonDisabled$ = this.selectedFieldModel$.pipe(withLatestFrom(this.definitionModel$), map(([selectedFieldModel, definitionModel]) => !selectedFieldModel ||
            definitionModel.isAuditRecordDefinition ||
            this.rxFieldDefinitionService.isCoreField(selectedFieldModel) ||
            selectedFieldModel.isInherited ||
            !this.rxFieldDefinitionService.isFieldInUserOverlay(selectedFieldModel)));
        this.isCopyFieldButtonDisabled$ = this.selectedFieldModel$.pipe(withLatestFrom(this.isFieldsCustomizationAllowed$, this.bundleId$), map(([selectedFieldModel, isFieldsCustomizationAllowed, bundleId]) => !selectedFieldModel ||
            this.rxFieldDefinitionService.isCoreField(selectedFieldModel) ||
            selectedFieldModel.isInherited ||
            !isFieldsCustomizationAllowed ||
            !this.rxOverlayService.isBundleEditable(bundleId)));
        this.expressionConfigurator = new RecordDesignerExpressionConfigurator(this.injector);
        this.dataDictionary$ = this.definitionModelFromDefinition$.pipe(withLatestFrom(this.store$.select(bundleIdSelector)), takeUntil(this.destroyed$), switchMap(([definitionModel, bundleId]) => this.expressionConfigurator.recordExpressionDataDictionary(definitionModel, bundleId)));
        this.isInheritColumnHidden$ = this.definitionModel$.pipe(map((definitionModel) => { var _a; return isEmpty((_a = definitionModel.recordInheritanceSelector) === null || _a === void 0 ? void 0 : _a.inheritedFieldDefinitions); }), distinctUntilChanged(), startWith(true));
        this.vm$ = combineLatest([
            this.breadcrumbItems$,
            this.bundleFriendlyName$,
            this.definitionDisplayName$,
            this.definitionInspectorConfig$,
            this.definitionModel$,
            this.hasValidationErrors$,
            this.hasValidationWarnings$,
            this.validationIssues$,
            this.isSaveButtonDisabled$,
            this.fieldGridRows$,
            this.selectedFieldGridRows$,
            this.definitionForJsonViewer$,
            this.isDesignMode$,
            this.selectedFieldModel$,
            this.selectedFieldInspectorConfig$,
            this.selectedFieldGuid$,
            this.isFieldsCustomizationAllowed$,
            this.isDeleteFieldButtonDisabled$,
            this.isCopyFieldButtonDisabled$,
            this.isJoinOrExternalRecord$,
            this.isReadOnly$
        ]).pipe(map(([breadcrumbItems, bundleFriendlyName, definitionDisplayName, definitionInspectorConfig, definitionModel, hasValidationErrors, hasValidationWarnings, validationIssues, isSaveButtonDisabled, fieldGridRows, selectedFieldGridRows, definitionForJsonViewer, isDesignMode, selectedFieldModel, selectedFieldInspectorConfig, selectedFieldGuid, isFieldsCustomizationAllowed, isDeleteFieldButtonDisabled, isCopyFieldButtonDisabled, isJoinOrExternalRecord, isReadOnly]) => ({
            breadcrumbItems,
            bundleFriendlyName,
            definitionDisplayName,
            definitionInspectorConfig,
            definitionModel,
            hasValidationErrors,
            hasValidationWarnings,
            validationIssues,
            isSaveButtonDisabled,
            fieldGridRows,
            selectedFieldGridRows,
            definitionForJsonViewer,
            isDesignMode,
            selectedFieldModel,
            selectedFieldInspectorConfig,
            selectedFieldGuid,
            isFieldsCustomizationAllowed,
            isDeleteFieldButtonDisabled,
            isCopyFieldButtonDisabled,
            isJoinOrExternalRecord,
            isReadOnly
        })));
        this.rxRecordDefinitionCacheService.registerConsumer(this.destroyed$);
    }
    ngOnInit() {
        this.inspectorTabIndex$.pipe(skip(1), takeUntil(this.destroyed$)).subscribe((inspectorTabIndex) => {
            if (!isNull(inspectorTabIndex)) {
                this.adaptSidebarComponent.openPanel(inspectorTabIndex);
            }
        });
        this.inspectorTabIndexSubject.pipe(skip(1), takeUntil(this.destroyed$)).subscribe((inspectorTabIndex) => {
            this.store$.dispatch(RecordDesignerActions.setInspectorTabIndex({ inspectorTabIndex }));
        });
        this.store$
            .select(savedDefinitionNameSelector)
            .pipe(skip(1), takeUntil(this.destroyed$))
            .subscribe((savedDefinitionName) => {
            this.definitionSaved.emit(savedDefinitionName);
        });
        this.expressionConfigurator.configureForProperty({
            propertyPath: RX_RECORD_DESIGNER.archiveDataCriteriaPath,
            dataDictionary$: this.dataDictionary$,
            operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.All)
        });
        this.expressionConfigurator.configureForProperty({
            propertyPath: RX_RECORD_DESIGNER.joinCriteriaPath,
            dataDictionary$: this.joinRecordDataDictionary$,
            operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.All)
        });
        combineLatest([this.isInheritColumnHidden$, this.isJoinRecordDefinition$])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(([isInheritColumnHidden, isJoinRecordDefinition]) => {
            this.isInheritColumnHidden = isInheritColumnHidden;
            this.isJoinRecordDefinition = isJoinRecordDefinition;
        });
        this.columns = [
            {
                field: 'name',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label')
            },
            {
                field: 'sourceRecord',
                header: this.translateService.instant('Source Record'),
                hidden: () => !this.isJoinRecordDefinition
            },
            {
                field: 'id',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.field-id.label')
            },
            {
                field: 'isInherited',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.inherited.title'),
                hidden: () => this.isInheritColumnHidden,
                cellTemplate: this.inheritedCellTemplate
            },
            {
                field: 'resourceType',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.data-type.title'),
                cellTemplate: this.dataTypeCellTemplate
            },
            {
                field: 'fieldOption',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.is-required-field.title'),
                cellTemplate: this.requiredCellTemplate
            },
            {
                field: 'defaultValue',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.default-value.title')
            }
        ];
    }
    ngOnChanges(changes) {
        if (changes.configuration.currentValue) {
            this.store$.dispatch(RecordDesignerActions.init({ payload: this.configuration }));
        }
    }
    onEditorEvent(event) {
        if (event.type === RX_EXPRESSION_EDITOR.events.openExpressionEditor &&
            event.payload.propertyPath === RX_RECORD_DESIGNER.archiveDataCriteriaPath) {
            this.definitionModel$.pipe(take(1)).subscribe((definitionModel) => {
                this.rxExpressionEditorService
                    .openEditor({
                    property: {
                        path: RX_RECORD_DESIGNER.archiveDataCriteriaPath,
                        value: definitionModel.archiveDataCriteria,
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.record-filter.label')
                    },
                    isReadOnly: event.payload.isReadOnly,
                    expressionConfigurator: this.expressionConfigurator,
                    legend: [
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field-name.label'),
                            icon: 'd-icon-arrow_right_square_input'
                        }
                    ]
                })
                    .subscribe((expression) => {
                    this.store$.dispatch(RecordDesignerActions.updateDefinitionModelFromDesigner({
                        definitionModelFromDesigner: { archiveDataCriteria: expression.value }
                    }));
                });
            });
        }
        if (event.type === RX_EXPRESSION_EDITOR.events.openExpressionEditor &&
            event.payload.propertyPath === RX_RECORD_DESIGNER.joinCriteriaPath) {
            this.definitionModel$.pipe(take(1)).subscribe((definitionModel) => {
                this.rxExpressionEditorService
                    .openEditor({
                    property: {
                        path: RX_RECORD_DESIGNER.joinCriteriaPath,
                        value: definitionModel.joinCriteria,
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.on-statement.label')
                    },
                    isReadOnly: event.payload.isReadOnly,
                    expressionConfigurator: this.expressionConfigurator,
                    legend: [
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field-name.label'),
                            icon: 'd-icon-arrow_right_square_input'
                        }
                    ]
                })
                    .subscribe((expression) => {
                    this.store$.dispatch(RecordDesignerActions.updateDefinitionModelFromDesigner({
                        definitionModelFromDesigner: { joinCriteria: expression.value }
                    }));
                });
            });
        }
    }
    onSelectionChange(selectedFieldModel) {
        this.store$.dispatch(RecordDesignerActions.setSelectedFieldGuid({ guid: selectedFieldModel === null || selectedFieldModel === void 0 ? void 0 : selectedFieldModel.guid }));
    }
    onDefinitionModelChange(newDefinitionModel) {
        this.store$.dispatch(RecordDesignerActions.updateDefinitionModelFromDesigner({
            definitionModelFromDesigner: newDefinitionModel
        }));
    }
    onSelectedFieldModelChange(newSelectedFieldModel) {
        this.store$.dispatch(RecordDesignerActions.updateSelectedFieldModel({ selectedFieldModel: newSelectedFieldModel }));
    }
    toggleDesignMode() {
        this.store$.dispatch(RecordDesignerActions.toggleDesignMode());
    }
    onSidebarToggle(event) {
        this.inspectorTabIndexSubject.next(event.id);
    }
    addNewField(resourceType) {
        this.store$.dispatch(RecordDesignerActions.createNewFieldModel({ resourceType: resourceType }));
    }
    openAddNewField() {
        this.definitionModel$.pipe(take(1)).subscribe((definitionModel) => {
            this.rxModalService
                .openModal({
                title: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.add-fields.title'),
                content: AddJoinFieldsEditorComponent,
                size: 'rx-md',
                blockKeyboard: false,
                data: {
                    primaryRecordDefinitionName: definitionModel.primaryRecordDefinitionName,
                    secondaryRecordDefinitionName: definitionModel.secondaryRecordDefinitionName,
                    addedFields: definitionModel.fields
                }
            })
                .then((fieldModels) => {
                const newFieldModels = fieldModels.map((newField) => (Object.assign(Object.assign({}, newField), { guid: this.rxGuidService.generate(), id: null, defaultValueByLocale: {}, selectionFieldOptionProperties: newField.resourceType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                        ? {
                            defaultValue: newField.defaultValue,
                            optionNamesById: newField.optionNamesById,
                            optionLabelsById: newField.optionLabelsById
                        }
                        : null })));
                this.store$.dispatch(RecordDesignerActions.addNewFieldModels({ newFieldModels: newFieldModels }));
            })
                .catch(noop);
        });
    }
    copySelectedField() {
        this.store$.dispatch(RecordDesignerActions.copySelectedField());
    }
    deleteSelectedField() {
        this.store$.dispatch(RecordDesignerActions.deleteSelectedField());
    }
    onBreadcrumbSelected() {
        this.store$.dispatch(RecordDesignerActions.clearSelectedFieldGuid());
    }
    canDeactivate() {
        let canDeactivate = true;
        this.isDirty$.pipe(take(1)).subscribe((isDirty) => {
            canDeactivate = !isDirty;
        });
        return canDeactivate;
    }
    saveDefinition() {
        combineLatest([this.definitionFromDefinitionModel$, this.isNewDefinition$, this.overriddenRecordProperties$])
            .pipe(take(1), switchMap(([definition, isNewDefinition, overriddenRecordProperties]) => {
            if (isNewDefinition) {
                return this.rxRecordDefinitionService.create(definition);
            }
            else if (!isNewDefinition && !isEmpty(overriddenRecordProperties.fields)) {
                return from(this.rxModalService.openModal({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.inheritance-issue-modal.title'),
                    content: InheritanceIssueInfoComponent,
                    data: { overriddenRecordProperties },
                    size: 'sm'
                })).pipe(filter((result) => result === 'continue'), switchMap(() => this.rxRecordDefinitionService.update(definition)));
            }
            else {
                return this.rxRecordDefinitionService.update(definition);
            }
        }), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(bundleIdSelector)))
            .subscribe(([response, definitionModel, bundleId]) => {
            this.store$.dispatch(RecordDesignerActions.saveDefinitionSuccess({
                savedDefinitionName: `${bundleId}:${definitionModel.name}`
            }));
        });
    }
    onCorrectIssue(validationIssue) {
        if (validationIssue.data.guid) {
            this.store$.dispatch(RecordDesignerActions.setSelectedFieldGuid({ guid: validationIssue.data.guid }));
        }
        else {
            this.store$.dispatch(RecordDesignerActions.setInspectorTabIndex({ inspectorTabIndex: 0 }));
        }
        setTimeout(() => this.inspectorFocusEditorSubject.next({
            editorName: validationIssue.data.propertyName,
            data: validationIssue.data
        }), 10);
    }
    onFormInitialized() {
        this.inspectorFocusEditorSubject.next({
            editorName: 'name',
            data: {}
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.inspectorTabIndexSubject.complete();
        this.inspectorFocusEditorSubject.complete();
        this.store$.dispatch(RecordDesignerActions.destroy());
    }
}
RecordDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerComponent, deps: [{ token: i1.Store }, { token: i2.RxNotificationService }, { token: i2.RxOverlayService }, { token: i3.RxRecordDefinitionValidatorService }, { token: i4.RxRecordDesignerInspectorService }, { token: i2.RxDefinitionNameService }, { token: i5.RxFieldDefinitionManagerService }, { token: i6.RxRecordDefinitionService }, { token: i2.RxGlobalCacheService }, { token: i7.TranslateService }, { token: i8.DatePipe }, { token: i9.RxModalService }, { token: i6.RxFieldDefinitionService }, { token: i10.RxRecordDesignerService }, { token: i11.RxExpressionEditorService }, { token: i6.RxRecordDefinitionCacheService }, { token: i12.RxGuidService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RecordDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordDesignerComponent, selector: "rx-record-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, viewQueries: [{ propertyName: "adaptSidebarComponent", first: true, predicate: AdaptSidebarComponent, descendants: true }, { propertyName: "requiredCellTemplate", first: true, predicate: ["requiredCellTemplate"], descendants: true, static: true }, { propertyName: "dataTypeCellTemplate", first: true, predicate: ["dataTypeCellTemplate"], descendants: true, static: true }, { propertyName: "inheritedCellTemplate", first: true, predicate: ["inheritedCellTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container class=\"p-0\" *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (save)=\"saveDefinition()\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    (breadcrumbSelected)=\"onBreadcrumbSelected()\"\n    (toggleDesignMode)=\"toggleDesignMode()\"\n    [isDesignMode]=\"vm.isDesignMode\"\n  ></rx-designer-header>\n\n  <adapt-sidebar\n    [openedId]=\"0\"\n    [adjustMainContainerWidth]=\"true\"\n    position=\"right\"\n    class=\"h-100\"\n    [hidden]=\"vm.definitionForJsonViewer\"\n    (isPanelOpenedCurrently)=\"onSidebarToggle($event)\"\n  >\n    <adapt-sidebar-item\n      iconClass=\"d-icon-pencil\"\n      [headerTitle]=\"'com.bmc.arsys.rx.client.common.properties.label' | translate\"\n      [tooltipText]=\"'com.bmc.arsys.rx.client.common.properties.label' | translate\"\n    >\n      <rx-form-builder\n        [config]=\"vm.definitionInspectorConfig\"\n        [model]=\"vm.definitionModel\"\n        [focusEditor$]=\"inspectorFocusEditor$\"\n        (modelChange)=\"onDefinitionModelChange($event)\"\n        (formInitialized)=\"onFormInitialized()\"\n        (editorEvent)=\"onEditorEvent($event)\"\n      ></rx-form-builder>\n    </adapt-sidebar-item>\n\n    <adapt-sidebar-item\n      iconClass=\"d-icon-gear\"\n      [headerTitle]=\"'com.bmc.arsys.rx.client.common.settings.label' | translate\"\n      [tooltipText]=\"'com.bmc.arsys.rx.client.common.settings.label' | translate\"\n    >\n      <rx-form-builder\n        [config]=\"vm.selectedFieldInspectorConfig\"\n        [model]=\"vm.selectedFieldModel\"\n        (modelChange)=\"onSelectedFieldModelChange($event)\"\n        [guid]=\"vm.selectedFieldGuid\"\n        [focusEditor$]=\"inspectorFocusEditor$\"\n      ></rx-form-builder>\n\n      <adapt-alert\n        [hidden]=\"vm.selectedFieldModel\"\n        class=\"p-3\"\n        [config]=\"{\n          content: 'com.bmc.arsys.rx.client.designer.validation.no-field-selected.message' | translate,\n          variant: 'info',\n          type: 'inline'\n        }\"\n      ></adapt-alert>\n    </adapt-sidebar-item>\n\n    <adapt-sidebar-item\n      [iconClass]=\"\n        vm.hasValidationErrors\n          ? 'd-icon-exclamation_triangle text-danger'\n          : vm.hasValidationWarnings\n          ? 'd-icon-exclamation_triangle text-warning-icon'\n          : 'd-icon-exclamation_triangle'\n      \"\n      headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n    >\n      <rx-validation-issues\n        (correctIssue)=\"onCorrectIssue($event)\"\n        [issueSections]=\"vm.validationIssues\"\n        [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.record-definition.label' | translate\"\n      ></rx-validation-issues>\n    </adapt-sidebar-item>\n\n    <div class=\"main h-100 d-flex flex-column\">\n      <h1 class=\"mt-0 mb-2\">\n        {{ (configuration.definitionName | rxDefinitionNamePipe) || vm.definitionDisplayName || newTitle }}\n      </h1>\n\n      <div *ngIf=\"vm.isJoinOrExternalRecord\" class=\"d-flex border border-bottom-0\">\n        <button\n          adapt-button\n          type=\"button\"\n          btn-type=\"tertiary\"\n          class=\"d-icon-plus_circle align-self-start\"\n          rx-id=\"new-field-button\"\n          (click)=\"openAddNewField()\"\n          [disabled]=\"vm.isReadOnly\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n        </button>\n\n        <button\n          adapt-button\n          btn-type=\"tertiary\"\n          type=\"button\"\n          class=\"d-icon-trash\"\n          rx-id=\"delete-field-button\"\n          (click)=\"deleteSelectedField()\"\n          [disabled]=\"vm.isDeleteFieldButtonDisabled\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.delete.label' | translate }}\n        </button>\n      </div>\n\n      <div *ngIf=\"!vm.isJoinOrExternalRecord\" class=\"d-flex border border-bottom-0\">\n        <div class=\"dropdown\" adaptDropdown>\n          <button\n            adapt-button\n            type=\"button\"\n            adaptDropdownToggle\n            btn-type=\"tertiary\"\n            class=\"d-icon-plus_circle\"\n            rx-id=\"new-field-button\"\n          >\n            {{ 'com.bmc.arsys.rx.client.designer.new-field.button.label' | translate }}\n          </button>\n\n          <div class=\"dropdown-menu\" adaptDropdownMenu>\n            <button\n              *ngFor=\"let dataType of dataTypes\"\n              class=\"dropdown-item\"\n              (click)=\"addNewField(dataType.resourceType)\"\n              [attr.rx-id]=\"'field-data-type-' + dataType.shortName\"\n              [disabled]=\"!vm.isFieldsCustomizationAllowed || vm.isReadOnly\"\n            >\n              {{ dataType.displayName }}\n            </button>\n          </div>\n        </div>\n\n        <button\n          adapt-button\n          btn-type=\"tertiary\"\n          type=\"button\"\n          class=\"d-icon-trash\"\n          rx-id=\"delete-field-button\"\n          (click)=\"deleteSelectedField()\"\n          [disabled]=\"vm.isDeleteFieldButtonDisabled || vm.isReadOnly\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.delete.label' | translate }}\n        </button>\n\n        <button\n          adapt-button\n          btn-type=\"tertiary\"\n          type=\"button\"\n          class=\"d-icon-list_ordered\"\n          (click)=\"copySelectedField()\"\n          rx-id=\"copy-field-button\"\n          [disabled]=\"vm.isCopyFieldButtonDisabled || vm.isReadOnly\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.copy.label' | translate }}\n        </button>\n      </div>\n\n      <adapt-table\n        [value]=\"vm.fieldGridRows\"\n        [selection]=\"vm.selectedFieldGridRows\"\n        [columns]=\"columns\"\n        [scrollable]=\"true\"\n        scrollHeight=\"flex\"\n        [sortable]=\"true\"\n        [resizableColumns]=\"true\"\n        [bordered]=\"true\"\n        [filterable]=\"false\"\n        [dataKey]=\"'guid'\"\n        [disableRowSelection]=\"false\"\n        [selectionMode]=\"'single'\"\n        (selectionChange)=\"onSelectionChange($event)\"\n      >\n      </adapt-table>\n    </div>\n  </adapt-sidebar>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  ></adapt-code-viewer>\n</ng-container>\n\n<ng-template #dataTypeCellTemplate let-dataItem=\"dataItem\">\n  <span\n    class=\"icon d-icon-lock pr-2\"\n    *ngIf=\"dataItem.isCoreField\"\n    [adaptPopover]=\"'com.bmc.arsys.rx.client.record-designer.core-field.tooltip' | translate\"\n  ></span>\n  {{ dataItem.resourceType }}\n</ng-template>\n\n<ng-template #requiredCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.fieldOption | rxRecordDefinitionFieldOption }}\n</ng-template>\n\n<ng-template #inheritedCellTemplate let-dataItem=\"dataItem\">\n  <span *ngIf=\"dataItem.isInherited\" class=\"icon d-icon-check pr-2\"></span>\n</ng-template>\n\n<ng-template #sourceFieldCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.sourceRecord }}\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-component-designer{display:flex;flex-grow:1;height:calc(100% - 50px);overflow:hidden}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;overflow:auto;padding:1rem}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper{border-top:0}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper .adapt-sidebar-panel-content{padding:0}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper .card{border-left:0;border-right:0}\n"], components: [{ type: i11.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i13.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i13.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i11.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i13.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i9.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i13.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i13.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i14.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i13.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i13.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i13.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i13.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "async": i8.AsyncPipe, "translate": i7.TranslatePipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe, "json": i8.JsonPipe, "rxRecordDefinitionFieldOption": i6.RxRecordDefinitionFieldOptionPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-designer',
                    templateUrl: './record-designer.component.html',
                    styleUrls: ['./record-designer.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.RxNotificationService }, { type: i2.RxOverlayService }, { type: i3.RxRecordDefinitionValidatorService }, { type: i4.RxRecordDesignerInspectorService }, { type: i2.RxDefinitionNameService }, { type: i5.RxFieldDefinitionManagerService }, { type: i6.RxRecordDefinitionService }, { type: i2.RxGlobalCacheService }, { type: i7.TranslateService }, { type: i8.DatePipe }, { type: i9.RxModalService }, { type: i6.RxFieldDefinitionService }, { type: i10.RxRecordDesignerService }, { type: i11.RxExpressionEditorService }, { type: i6.RxRecordDefinitionCacheService }, { type: i12.RxGuidService }, { type: i0.Injector }]; }, propDecorators: { adaptSidebarComponent: [{
                type: ViewChild,
                args: [AdaptSidebarComponent, { static: false }]
            }], requiredCellTemplate: [{
                type: ViewChild,
                args: ['requiredCellTemplate', { static: true }]
            }], dataTypeCellTemplate: [{
                type: ViewChild,
                args: ['dataTypeCellTemplate', { static: true }]
            }], inheritedCellTemplate: [{
                type: ViewChild,
                args: ['inheritedCellTemplate', { static: true }]
            }], configuration: [{
                type: Input
            }], definitionSaved: [{
                type: Output
            }], definitionErrorLoading: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }] } });
//# sourceMappingURL=record-designer.component.js.map