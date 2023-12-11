import { RX_ASSOCIATED_RECORD_NODE_SIDES, RX_ASSOCIATION_DEFINITION, RxAssociationDefinitionCacheService } from '@helix/platform/association/api';
import { RxDefinitionPickerComponent, RxDefinitionPickerType, SelectFormControlComponent, ValidationFormControlComponent } from '@helix/platform/shared/components';
import { RxGuidService } from '@helix/platform/utils';
import { RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE, RxViewComponentType } from '@helix/platform/view/api';
import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { defaults, get, isEqual, isNil, isUndefined, map as _map, omit } from 'lodash';
import { combineLatest, merge, of, Subject } from 'rxjs';
import { concatMap, concatMapTo, distinctUntilChanged, filter, map, mapTo, mergeMap, pairwise, shareReplay, skip, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { RX_ASSOCIATION, RxAssociationEditingMode } from '../association.types';
import { AssociationDesignHelperService } from './association-design-helper.service';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
export class AssociationDesignModel extends ViewDesignerComponentModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.rxAssociationDefinitionCacheService = this.injector.get(RxAssociationDefinitionCacheService);
        this.rxGuidService = this.injector.get(RxGuidService);
        this.rxDefinitionNameService = this.injector.get(RxDefinitionNameService);
        this.associationDesignHelperService = this.injector.get(AssociationDesignHelperService);
        this.updateInspector$ = new Subject();
        this.childComponents$ = this.sandbox.getChildComponentsTree();
        this.associationChildComponentsData$ = this.getChildComponentsData();
        this.associationDefinitions = [];
        this.associationDefinitionFilters = [];
        this.recordDefinitionFields = [];
        this.associatedRecordNodeSide = [];
        this.isManyToManyAssociation = false;
        this.editingMode$ = this.sandbox.getComponentPropertyValue('editingMode');
        this.label$ = this.sandbox.getComponentPropertyValue('label');
        // TODO: performance
        this.updateInspector$
            .pipe(distinctUntilChanged(isEqual), takeUntil(this.sandbox.destroyed$))
            .subscribe((inspector) => {
            this.sandbox.updateInspectorConfig(inspector);
        });
        const recordDefinitionName$ = sandbox.getComponentPropertyValue('recordDefinitionName');
        const recordDefinitionFields$ = recordDefinitionName$.pipe(switchMap((recordDefinitionName) => recordDefinitionName ? this.updateRecordDefinitionFields(recordDefinitionName) : of([])));
        this.displayedFields$ = combineLatest([
            this.sandbox.getChildComponents((component) => component.type === RX_ASSOCIATION.componentTypes.associatedRecordField),
            recordDefinitionFields$
        ]).pipe(map(([components, availableFields]) => this.associationDesignHelperService.getFieldsInChildComponentsWithNames(components, availableFields)));
        this.recordEditorGuid$ = this.sandbox.getParentComponentGuid(RxViewComponentType.RecordEditor).pipe(take(1));
        this.otherAssociationRecordEditorComponentGuids$ = this.recordEditorGuid$.pipe(map((guid) => this.sandbox.getComponentModel(guid)), switchMap((model) => model.associationComponentGuids$.pipe(map((guids) => guids.filter((guid) => guid !== this.sandbox.guid)))), shareReplay(1), takeUntil(this.sandbox.destroyed$));
        this.recordDefinitionNameFromHostRecordEditor$ = this.recordEditorGuid$.pipe(switchMap((recordEditorGuid) => {
            return this.sandbox.getComponentPropertyValue('recordDefinitionName', recordEditorGuid);
        }), shareReplay(1));
        this.recordDefinitionNameFromHostRecordEditor$
            .pipe(switchMap((recordDefinitionRecordEditorName) => recordDefinitionRecordEditorName
            ? combineLatest([this.sandbox.componentProperties$, this.associationChildComponentsData$]).pipe(switchMap(([componentProperties, associationChildComponentsData]) => {
                const updateParameters = recordDefinitionRecordEditorName
                    ? this.generateInitialUpdateParameters(componentProperties)
                    : [];
                const updateParameters$ = updateParameters.length > 0 ? combineLatest(updateParameters) : of(null);
                return updateParameters$.pipe(map(() => ({
                    componentProperties: Object.assign(Object.assign({}, associationChildComponentsData), componentProperties),
                    recordDefinitionRecordEditorName
                })));
            }), take(1))
            : of({
                componentProperties: null,
                recordDefinitionRecordEditorName: null
            })), withLatestFrom(this.recordEditorGuid$), takeUntil(this.sandbox.destroyed$))
            .subscribe(([{ componentProperties, recordDefinitionRecordEditorName }, recordEditorGuid]) => {
            const initialProperties = this.associationDesignHelperService.getInitialProperties();
            const properties = Object.assign(Object.assign(Object.assign({}, initialProperties), componentProperties), { useDefaultRoles: Boolean((componentProperties === null || componentProperties === void 0 ? void 0 : componentProperties.useDefaultRoles) === 'true') });
            this.recordEditorGuid = recordEditorGuid;
            this.sandbox.updateComponentProperties(properties);
            this.updateInspector$.next(this.getInspectorConfig(properties, recordDefinitionRecordEditorName, recordEditorGuid));
        });
        const childComponentGuids$ = this.childComponents$.pipe(map((components) => components.map((component) => component.guid)));
        this.sandbox
            .getComponentPropertyValue('recordDefinitionName')
            .pipe(skip(1), withLatestFrom(childComponentGuids$), takeUntil(this.sandbox.destroyed$))
            .subscribe(([recordDefinitionName, childComponentGuids]) => {
            this.sandbox.updateComponentProperties({
                recordDefinitionName,
                label: null,
                associationDefinitionName: null,
                associatedRecordNodeSide: null,
                editingMode: RxAssociationEditingMode.Views,
                viewDefinitionNameForSelect: null,
                viewDefinitionNameForCreate: null,
                fieldId: null,
                useDefaultRoles: false,
                nodeARole: null,
                nodeBRole: null,
                displayedFields: [],
                filterByAssociation: null,
                recordId: null
            });
            this.sandbox.removeComponents(childComponentGuids);
        });
        this.sandbox
            .getComponentPropertyValue('recordDefinitionName')
            .pipe(skip(1), concatMapTo(this.sandbox.componentProperties$), concatMap((props) => combineLatest([
            this.updateAssociationDefinitionsOptions(props.recordDefinitionName),
            this.updateRecordDefinitionFields(props.recordDefinitionName),
            this.updateAssociationDefinitionsFilterOptions(props.recordDefinitionName),
            this.updateAssociationNodeSideOptions(props.associationDefinitionName),
            this.updatePreviousDropdownFieldDefinition(props.recordDefinitionName, props.fieldId)
        ]).pipe(take(1), mapTo(props))), withLatestFrom(this.recordDefinitionNameFromHostRecordEditor$, this.recordEditorGuid$), takeUntil(this.sandbox.destroyed$))
            .subscribe(([componentProps, recordDefinitionNameFromHostRecordEditor, recordEditorGuid]) => {
            this.updateInspector$.next(this.getInspectorConfig(componentProps, recordDefinitionNameFromHostRecordEditor, recordEditorGuid));
        });
        this.sandbox
            .getComponentPropertyValue('editingMode')
            .pipe(skip(1), withLatestFrom(childComponentGuids$), takeUntil(this.sandbox.destroyed$))
            .subscribe(([editingMode, childComponentGuids]) => {
            this.sandbox.updateComponentProperties({
                editingMode,
                viewDefinitionNameForSelect: null,
                viewDefinitionNameForCreate: null,
                fieldId: null,
                useDefaultRoles: false,
                nodeARole: null,
                nodeBRole: null,
                displayedFields: [],
                filterByAssociation: null,
                recordId: null
            });
            this.sandbox.removeComponents(childComponentGuids);
        });
        this.sandbox.componentProperties$
            .pipe(skip(1), pairwise(), withLatestFrom(this.childComponents$), switchMap(([[previousProperties, properties], children]) => {
            const updatedProperties = Object.assign({}, properties);
            const updatedParametersStreams = [];
            switch (true) {
                case previousProperties.viewDefinitionNameForSelect !== properties.viewDefinitionNameForSelect:
                    this.updateChildActionButtonDefinition(properties, children, RX_ASSOCIATION.actions.associate);
                    break;
                case previousProperties.viewDefinitionNameForCreate !== properties.viewDefinitionNameForCreate:
                    this.updateChildActionButtonDefinition(properties, children, RX_ASSOCIATION.actions.createAndAssociate);
                    break;
                case previousProperties.filterByAssociation !== properties.filterByAssociation:
                case previousProperties.recordId !== properties.recordId:
                    const filterComponent = children.find((component) => component.type === RX_ASSOCIATION.componentTypes.associationFilter);
                    this.updateAssociationFilterComponent(properties, filterComponent);
                    break;
                case !isEqual(previousProperties.displayedFields, properties.displayedFields):
                    this.updateComponentRecordFields(properties.displayedFields, children);
                    break;
                case previousProperties.associationDefinitionName !== properties.associationDefinitionName:
                    updatedProperties.editingMode = RxAssociationEditingMode.Views;
                    this.associationDesignHelperService.cleanEditingModeDependentData(updatedProperties);
                    if (properties.associationDefinitionName) {
                        updatedParametersStreams.push(this.rxAssociationDefinitionCacheService
                            .getAssociationDefinition(properties.associationDefinitionName)
                            .pipe(map((associationDefinition) => {
                            updatedProperties.associatedRecordNodeSide =
                                associationDefinition.nodeAId === properties.recordDefinitionName
                                    ? RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.value
                                    : RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value;
                            this.setIsManyToManyAssociation(associationDefinition);
                            this.sandbox.updateComponentProperties(updatedProperties);
                            if (this.isManyToManyAssociation) {
                                this.associationDesignHelperService.resetRolesData(updatedProperties);
                            }
                        })));
                    }
                    else {
                        this.isManyToManyAssociation = false;
                    }
                    updatedParametersStreams.push(this.updateAssociationNodeSideOptions(properties.associationDefinitionName));
                    break;
                case previousProperties.associatedRecordNodeSide !== properties.associatedRecordNodeSide:
                    updatedProperties.editingMode = RxAssociationEditingMode.Views;
                    this.associationDesignHelperService.cleanEditingModeDependentData(updatedProperties);
                    break;
                case previousProperties.useDefaultRoles !== properties.useDefaultRoles:
                    if (properties.useDefaultRoles === true) {
                        updatedProperties.nodeARole = null;
                        updatedProperties.nodeBRole = null;
                    }
                    break;
                case previousProperties.nodeARole !== properties.nodeARole ||
                    previousProperties.nodeBRole !== properties.nodeBRole:
                    if (isUndefined(properties.useDefaultRoles)) {
                        defaults(updatedProperties, {
                            nodeARole: null,
                            nodeBRole: null,
                            useDefaultRoles: false
                        });
                    }
                    else {
                        updatedProperties.useDefaultRoles = false;
                    }
                    break;
            }
            const updateParameters$ = updatedParametersStreams.length > 0 ? combineLatest(updatedParametersStreams) : of(null);
            return updateParameters$.pipe(map((parameters) => ({ parameters, componentProperties: updatedProperties })), withLatestFrom(this.recordDefinitionNameFromHostRecordEditor$, this.recordEditorGuid$));
        }), takeUntil(this.sandbox.destroyed$))
            .subscribe(([{ parameters, componentProperties }, recordDefinitionNameFromHostRecordEditor, recordEditorGuid]) => {
            const initialProperties = this.associationDesignHelperService.getInitialProperties();
            this.recordEditorGuid = recordEditorGuid;
            this.updateInspector$.next(this.getInspectorConfig(Object.assign(Object.assign({}, initialProperties), componentProperties), recordDefinitionNameFromHostRecordEditor, recordEditorGuid));
        });
        this.sandbox
            .getComponentPropertyValue('fieldId')
            .pipe(
        // transform initial value to null if it is undefined
        map((value) => (isNil(value) ? null : value)), distinctUntilChanged(), pairwise())
            .pipe(withLatestFrom(this.sandbox.componentProperties$), 
        // Check if editing mode is dropdown to prevent label reset after change fieldId to null.
        filter(([fieldIds, props]) => Boolean(props.editingMode === RxAssociationEditingMode.Dropdown)), switchMap(([[prevFieldId, fieldId], props]) => this.associationDesignHelperService.getRecordDefinition(props.recordDefinitionName).pipe(map((recordDefinition) => {
            var _a, _b;
            const prevFieldDefinitionName = (_a = recordDefinition.fieldDefinitions.find((field) => field.id === Number(prevFieldId))) === null || _a === void 0 ? void 0 : _a.name;
            const currentFieldDefinitionName = (_b = recordDefinition.fieldDefinitions.find((field) => field.id === Number(fieldId))) === null || _b === void 0 ? void 0 : _b.name;
            // If the label is changed by user it must not be updated after fieldId change.
            return !props.label || prevFieldDefinitionName === props.label ? currentFieldDefinitionName : props.label;
        }))), distinctUntilChanged(), takeUntil(this.sandbox.destroyed$))
            .subscribe((label) => {
            this.sandbox.updateComponentProperties({ label });
        });
        combineLatest([
            this.sandbox.componentProperties$,
            this.associationChildComponentsData$.pipe(distinctUntilChanged(isEqual))
        ])
            .pipe(switchMap(([componentProperties, childComponents]) => {
            const association$ = componentProperties.associationDefinitionName
                ? this.rxAssociationDefinitionCacheService.getAssociationDefinition(componentProperties.associationDefinitionName)
                : of({});
            return association$.pipe(map((associationDefinition) => {
                return this.associationDesignHelperService.validate(this.sandbox, componentProperties, associationDefinition, childComponents);
            }));
        }), takeUntil(this.sandbox.destroyed$))
            .subscribe((validationIssues) => {
            this.sandbox.setValidationIssues(validationIssues);
        });
        combineLatest([
            this.label$,
            this.sandbox
                .getComponentPropertyValue('associationDefinitionName')
                .pipe(map((associationDefinitionName) => associationDefinitionName ? this.rxDefinitionNameService.getDisplayName(associationDefinitionName) : null))
        ])
            .pipe(map(([label, definitionDisplayName]) => {
            let componentName = this.sandbox.descriptor.name;
            if (definitionDisplayName && label) {
                componentName += ` (${definitionDisplayName}: ${label})`;
            }
            else if (definitionDisplayName || label) {
                componentName += ` (${definitionDisplayName || label})`;
            }
            return componentName;
        }), distinctUntilChanged(), takeUntil(this.sandbox.destroyed$))
            .subscribe((componentName) => {
            this.sandbox.setSettablePropertiesDataDictionary(componentName, [
                {
                    label: 'Disabled',
                    expression: this.getExpressionForProperty('disabled')
                },
                {
                    label: 'Hidden',
                    expression: this.getExpressionForProperty('hidden')
                }
            ]);
        });
    }
    static getInitialProperties(initialProperties) {
        return Object.assign(Object.assign({}, RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE), initialProperties);
    }
    getPropertiesByName(properties) {
        return omit(Object.assign(Object.assign({}, properties), { recordInstance: this.recordEditorGuid
                ? `\${view.components.${this.recordEditorGuid}.recordInstance}`
                : properties.recordInstance, recordDefinition: this.recordEditorGuid
                ? `\${view.components.${this.recordEditorGuid}.recordDefinition}`
                : properties.recordDefinition }), [
            'displayedFields',
            'filterByAssociation',
            'recordId',
            'viewDefinitionNameForSelect',
            'viewDefinitionNameForCreate'
        ]);
    }
    updateAssociationFilterComponent(componentProperties, filterComponent) {
        if (filterComponent) {
            this.sandbox.removeComponents([filterComponent.guid]);
        }
        if (componentProperties.filterByAssociation) {
            const filterNew = {
                guid: this.rxGuidService.generate(),
                type: RX_ASSOCIATION.componentTypes.associationFilter,
                propertiesByName: {
                    associationDefinitionName: componentProperties.filterByAssociation,
                    recordInstanceId: componentProperties.recordId
                }
            };
            this.sandbox.addComponent([filterNew]);
        }
    }
    updateChildActionButtonDefinition(properties, children, action) {
        const actionButtonComponent = children.find((component) => component.type === RxViewComponentType.ActionButton && component.data['action'] === action);
        const viewDefinitionNameToUpdate = action === RX_ASSOCIATION.actions.createAndAssociate
            ? properties.viewDefinitionNameForCreate
            : properties.viewDefinitionNameForSelect;
        if (actionButtonComponent) {
            this.sandbox.removeComponents([actionButtonComponent.guid]);
        }
        if (viewDefinitionNameToUpdate) {
            const button = this.associationDesignHelperService.getActionButtonDefinition(properties, action, this.sandbox['guid']);
            this.sandbox.addComponent([button]);
        }
    }
    updateComponentRecordFields(displayedFields, children) {
        const guids = children
            .filter((component) => component.type === RX_ASSOCIATION.componentTypes.associatedRecordField)
            .map((component) => component.guid);
        const recordFields = displayedFields.map((field) => ({
            type: RX_ASSOCIATION.componentTypes.associatedRecordField,
            guid: this.rxGuidService.generate(),
            propertiesByName: {
                fieldId: field.data.fieldId,
                label: field.data.label || '',
                index: field.data.index
            }
        }));
        if (guids.length > 0) {
            this.sandbox.removeComponents(guids);
        }
        this.sandbox.addComponent(recordFields);
    }
    getChildComponentsData() {
        return this.childComponents$.pipe(map((components) => {
            var _a, _b;
            const associationChildComponentsData = {};
            const associationFilters = components.filter((component) => component.type === RX_ASSOCIATION.componentTypes.associationFilter);
            associationChildComponentsData.displayedFields = components.filter((definition) => definition.type === RX_ASSOCIATION.componentTypes.associatedRecordField);
            if (associationFilters.length > 0) {
                associationChildComponentsData.recordId = (_a = associationFilters[0].data) === null || _a === void 0 ? void 0 : _a.recordInstanceId;
                associationChildComponentsData.filterByAssociation = (_b = associationFilters[0].data) === null || _b === void 0 ? void 0 : _b.associationDefinitionName;
            }
            const createAndAssociateView = this.getViewDefinitionNameForAssociation(components, RX_ASSOCIATION.actions.createAndAssociate);
            if (createAndAssociateView) {
                associationChildComponentsData.viewDefinitionNameForCreate = createAndAssociateView;
            }
            const associateView = this.getViewDefinitionNameForAssociation(components, RX_ASSOCIATION.actions.associate);
            if (associateView) {
                associationChildComponentsData.viewDefinitionNameForSelect = associateView;
            }
            return associationChildComponentsData;
        }));
    }
    generateInitialUpdateParameters(componentProperties) {
        const updateParameters = [];
        if (componentProperties.recordDefinitionName) {
            updateParameters.push(this.updateRecordDefinitionFields(componentProperties.recordDefinitionName));
            if (componentProperties.fieldId) {
                updateParameters.push(this.updatePreviousDropdownFieldDefinition(componentProperties.recordDefinitionName, componentProperties.fieldId));
            }
            updateParameters.push(this.updateAssociationDefinitionsOptions(componentProperties.recordDefinitionName));
        }
        if (componentProperties.associationDefinitionName) {
            updateParameters.push(this.updateAssociationDefinitionsFilterOptions(componentProperties.recordDefinitionName));
            updateParameters.push(this.rxAssociationDefinitionCacheService
                .getAssociationDefinition(componentProperties.associationDefinitionName)
                .pipe(map((associationDefinition) => this.setIsManyToManyAssociation(associationDefinition))));
        }
        if (componentProperties.associatedRecordNodeSide) {
            updateParameters.push(this.updateAssociationNodeSideOptions(componentProperties.associationDefinitionName));
        }
        return updateParameters;
    }
    updatePreviousDropdownFieldDefinition(recordDefinitionToAssociateName, fieldId) {
        return this.updateRecordDefinitionFields(recordDefinitionToAssociateName).pipe(map((fields) => {
            return (this.previousDropdownFieldDefinition = fields.find((field) => field.id === Number(fieldId)));
        }));
    }
    setIsManyToManyAssociation(associationDefinition) {
        if (associationDefinition) {
            this.isManyToManyAssociation =
                associationDefinition.cardinality === RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value;
        }
    }
    getViewDefinitionNameForAssociation(components, action) {
        const actionButton = components.find((definition) => { var _a; return ((_a = definition.data) === null || _a === void 0 ? void 0 : _a.action) === action; });
        return actionButton && actionButton.children ? this.getViewDefinitionNameFromActionButton(actionButton) : null;
    }
    getViewDefinitionNameFromActionButton(actionButton) {
        const actionComponent = actionButton.children.find((children) => children.type === RxViewComponentType.Action);
        return get(actionComponent, 'data.viewDefinitionName', null);
    }
    updateRecordDefinitionFields(recordDefinitionToAssociateName) {
        return (recordDefinitionToAssociateName
            ? this.associationDesignHelperService
                .getRecordDefinition(recordDefinitionToAssociateName)
                .pipe(map((recordDefinition) => recordDefinition.fieldDefinitions))
            : of([])).pipe(tap((fieldDefinitions) => (this.recordDefinitionFields = fieldDefinitions)));
    }
    updateAssociationNodeSideOptions(associationDefinitionName) {
        const associatedRecordNodeSideOptions$ = associationDefinitionName
            ? this.rxAssociationDefinitionCacheService
                .getAssociationDefinition(associationDefinitionName)
                .pipe(map((associationDefinition) => this.associationDesignHelperService.getNodeSideOptions(associationDefinition)))
            : of([]);
        return associatedRecordNodeSideOptions$.pipe(tap((associatedRecordNodeSideOptions) => (this.associatedRecordNodeSide = associatedRecordNodeSideOptions)));
    }
    updateAssociationDefinitionsOptions(recordDefinitionToAssociateName) {
        return this.recordDefinitionNameFromHostRecordEditor$.pipe(switchMap((associatedRecordName) => recordDefinitionToAssociateName && associatedRecordName
            ? this.associationDesignHelperService.getAvailableAssociations(recordDefinitionToAssociateName, associatedRecordName)
            : of([])), tap((associationDefinitionOptions) => (this.associationDefinitions = associationDefinitionOptions)));
    }
    updateAssociationDefinitionsFilterOptions(recordDefinitionToAssociateName) {
        return this.otherAssociationRecordEditorComponentGuids$.pipe(mergeMap((guids) => guids.length
            ? combineLatest(guids.map((guid) => this.sandbox.getComponentPropertyValue('recordDefinitionName', guid))).pipe(take(1))
            : of([])), switchMap((associatedRecordNames) => associatedRecordNames.length && recordDefinitionToAssociateName
            ? merge(...associatedRecordNames.map((associatedRecordName) => this.associationDesignHelperService.getAvailableAssociations(recordDefinitionToAssociateName, associatedRecordName)))
            : of([])), map((associationDefinitionFilters) => (this.associationDefinitionFilters = associationDefinitionFilters)));
    }
    getInspectorConfig(properties, recordDefinitionNameFromHostRecordEditor, recordEditorGuid) {
        const inspectorConfig = {
            inspectorSectionConfigs: [
                {
                    label: 'General',
                    controls: []
                }
            ]
        };
        if (recordDefinitionNameFromHostRecordEditor) {
            const generalSectionControls = inspectorConfig.inspectorSectionConfigs[0].controls;
            generalSectionControls.push({
                name: 'recordDefinitionName',
                component: RxDefinitionPickerComponent,
                options: {
                    label: 'Record definition to associate',
                    definitionType: RxDefinitionPickerType.StandardDataRecord,
                    required: true
                }
            });
            if (properties.recordDefinitionName) {
                generalSectionControls.push({
                    name: 'associationDefinitionName',
                    component: SelectFormControlComponent,
                    options: {
                        label: 'Association to use',
                        options: this.associationDefinitions.map((associationDefinition) => ({
                            id: associationDefinition.name,
                            name: this.rxDefinitionNameService.getDisplayName(associationDefinition.name)
                        })),
                        emptyOption: true,
                        required: true
                    }
                });
            }
            if (properties.recordDefinitionName && this.associatedRecordNodeSide.length > 0) {
                generalSectionControls.push({
                    name: 'associatedRecordNodeSide',
                    component: SelectFormControlComponent,
                    options: {
                        label: 'Associated record node Side',
                        options: this.associatedRecordNodeSide,
                        required: true
                    }
                });
            }
            if (properties.recordDefinitionName &&
                this.associationDesignHelperService.isCardinalityOne(properties, this.associationDefinitions)) {
                generalSectionControls.push({
                    name: 'editingMode',
                    component: SelectFormControlComponent,
                    options: {
                        label: 'Association editing mode',
                        options: _map(RxAssociationEditingMode, (id, name) => ({ id, name })),
                        required: true
                    }
                });
            }
            // View Mode
            if (!properties.editingMode || properties.editingMode === RxAssociationEditingMode.Views) {
                generalSectionControls.push(...this.associationDesignHelperService.getViewModeInspectorControls());
                if (this.isManyToManyAssociation && properties.associationDefinitionName) {
                    generalSectionControls.push(this.associationDesignHelperService.getUseDefaultRolesControl());
                    if (!properties.useDefaultRoles) {
                        generalSectionControls.push(...this.associationDesignHelperService.getNodeABRoleControls());
                    }
                }
                if (properties.recordDefinitionName) {
                    generalSectionControls.push(this.associationDesignHelperService.getDisplayedFieldsControl(this.recordDefinitionFields));
                }
            }
            // Dropdown Mode
            if (properties.editingMode === RxAssociationEditingMode.Dropdown) {
                generalSectionControls.push(...this.associationDesignHelperService.getDropdownModeInspectorControls(this.recordDefinitionFields, this.associationDefinitionFilters));
                if (properties.filterByAssociation) {
                    generalSectionControls.push(this.associationDesignHelperService.getRecordIdControl());
                }
            }
            generalSectionControls.push(...this.associationDesignHelperService.getInitialInspectorControls(this.expressionConfigurator));
        }
        else {
            inspectorConfig.inspectorSectionConfigs[0].controls = [
                {
                    component: ValidationFormControlComponent,
                    options: {
                        text: 'You must select a Record definition before editing field component.',
                        componentGuid: recordEditorGuid,
                        propertyName: 'recordDefinitionName'
                    }
                }
            ];
        }
        return inspectorConfig;
    }
}
//# sourceMappingURL=association-design.model.js.map