import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE, RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService } from '@helix/platform/record/api';
import { combineLatest, forkJoin, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, mergeMap, pairwise, shareReplay, skip, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { flow, isEqual, map as _map, reject, uniq } from 'lodash';
import { RecordEditorMode, RecordEditorState } from '../common/record-editor.types';
import { RxRecordEditorDesignHelpersService } from './record-editor-design-helpers.service';
export class RecordEditorDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.rxFieldDefinitionService = this.injector.get(RxFieldDefinitionService);
        this.rxViewComponentRegistryService = this.injector.get(RxViewComponentRegistryService);
        this.rxRecordEditorDesignHelpersService = this.injector.get(RxRecordEditorDesignHelpersService);
        this.rxDefinitionNameService = this.injector.get(RxDefinitionNameService);
        this.updateInspector$ = new Subject();
        this.recordDefinitionName$ = this.sandbox.getComponentPropertyValue('recordDefinitionName');
        this.mode$ = this.sandbox.getComponentPropertyValue('mode');
        this.showReadOnlyState$ = this.sandbox.getComponentPropertyValue('showReadOnlyState');
        this.targetExtensionContainerGuid$ = this.sandbox.getViewPropertyValue('targetExtensionContainerGuid');
        this.targetViewDefinitionName$ = this.sandbox.getViewPropertyValue('targetViewDefinitionName');
        this.recordDefinition$ = this.recordDefinitionName$.pipe(switchMap((name) => this.rxRecordEditorDesignHelpersService.getRecordDefinition(name)), shareReplay(1));
        this.childComponentGuids$ = this.sandbox.getChildComponentGuids().pipe(shareReplay(1));
        this.allChildFieldComponentGuids$ = this.sandbox
            .getChildComponentGuids((component) => this.rxRecordEditorDesignHelpersService.isFieldComponent(component), true)
            .pipe(distinctUntilChanged(isEqual), shareReplay(1));
        this.isExtensionView$ = this.targetViewDefinitionName$.pipe(map(Boolean), shareReplay(1));
        this.childFieldIds$ = this.allChildFieldComponentGuids$.pipe(switchMap((guids) => guids.length
            ? combineLatest(guids.map((guid) => this.sandbox.getComponentPropertyValue('fieldId', guid))).pipe(map(uniq))
            : of([])), shareReplay(1));
        this.selectedFieldComponents$ = this.allChildFieldComponentGuids$.pipe(switchMap((guids) => guids.length
            ? combineLatest(guids.map((guid) => combineLatest([
                this.sandbox.getComponent(guid).pipe(take(1), map((component) => this.rxViewComponentRegistryService.get(component.type).name)),
                this.sandbox.getComponentPropertyValue('fieldId', guid),
                this.sandbox.getComponentPropertyValue('label', guid)
            ]).pipe(map(([componentName, fieldId, label]) => ({
                fieldId,
                label: label || '<No field selected>',
                componentName,
                guid
            })))))
            : of([])), shareReplay(1));
        this.associationComponentGuids$ = this.sandbox
            .getChildComponentGuids((component) => component.type === RxViewComponentType.Association, true)
            .pipe(shareReplay(1), takeUntil(this.sandbox.destroyed$));
        this.associationDefinitionName$ = this.sandbox.getComponentPropertyValue('associationDefinitionName');
        this.hasChildren$ = this.childComponentGuids$.pipe(map((guids) => Boolean(guids.length)), distinctUntilChanged(), shareReplay(1));
        this.systemFieldComponentGuids$ = this.recordDefinition$.pipe(mergeMap((recordDefinition) => recordDefinition
            ? this.selectedFieldComponents$.pipe(map((components) => components
                .filter((component) => {
                const fieldDefinition = recordDefinition.fieldDefinitions.find((definition) => String(definition.id) === component.fieldId);
                return this.rxFieldDefinitionService.isSystemField(fieldDefinition);
            })
                .map((component) => component.guid)), take(1))
            : of([])));
        this.recordFieldDefinitionItems$ = this.recordDefinition$.pipe(map((recordDefinition) => recordDefinition ? this.rxRecordEditorDesignHelpersService.getRecordFieldDefinitionItems(recordDefinition) : []), shareReplay(1));
    }
    static getInitialProperties(initialProps) {
        const result = Object.assign(Object.assign({ name: null, label: null, mode: RecordEditorMode.Edit, recordInstanceId: null, recordDefinitionName: null, associationDefinitionName: null, defaultState: initialProps.defaultState || null, allowEdit: '1', styles: null }, RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE), initialProps);
        return Object.assign(Object.assign({}, result), { showReadOnlyState: Boolean(result.defaultState), allowEdit: result.mode === RecordEditorMode.Edit ? result.allowEdit : null });
    }
    rxInit() {
        const targetRecordEditorProperties$ = combineLatest([
            this.targetViewDefinitionName$.pipe(switchMap((targetViewDefinitionName) => this.rxRecordEditorDesignHelpersService.getViewDefinition(targetViewDefinitionName))),
            this.targetExtensionContainerGuid$
        ]).pipe(map(([viewDefinition, targetExtensionContainerGuid]) => this.rxRecordEditorDesignHelpersService.getTargetRecordEditorProperties(viewDefinition, targetExtensionContainerGuid)));
        this.associationOptions$ = combineLatest([targetRecordEditorProperties$, this.recordDefinitionName$]).pipe(switchMap(([targetRecordEditorProperties, extensionRecordDefinitionName]) => this.rxRecordEditorDesignHelpersService.getAssociationOptions(targetRecordEditorProperties.recordDefinitionName, extensionRecordDefinitionName)));
        this.isAssociationRequired$ = combineLatest([
            this.isExtensionView$,
            this.recordDefinitionName$,
            targetRecordEditorProperties$
        ]).pipe(map(([isExtensionView, recordDefinitionName, targetRecordEditorProperties]) => isExtensionView && recordDefinitionName !== targetRecordEditorProperties.recordDefinitionName));
        this.updateInspector$.pipe(takeUntil(this.sandbox.destroyed$)).subscribe((inspector) => {
            this.sandbox.updateInspectorConfig(inspector);
        });
        // initial set of inspector
        combineLatest([
            this.sandbox.componentProperties$,
            this.isExtensionView$,
            this.associationOptions$,
            this.isAssociationRequired$,
            targetRecordEditorProperties$
        ])
            .pipe(first(), takeUntil(this.sandbox.destroyed$))
            .subscribe(([{ recordDefinitionName, mode, showReadOnlyState }, isExtensionView, associationOptions, isAssociationRequired, targetRecordEditorProperties]) => {
            if (isExtensionView && !recordDefinitionName) {
                recordDefinitionName = targetRecordEditorProperties.recordDefinitionName;
                mode = targetRecordEditorProperties.mode;
                this.sandbox.updateComponentProperties({ mode, recordDefinitionName });
            }
            this.updateInspector$.next(this.rxRecordEditorDesignHelpersService.getInspector(recordDefinitionName, mode, showReadOnlyState, [], isExtensionView, associationOptions, isAssociationRequired, this._onBeforeModeChange.bind(this)));
        });
        this.mode$
            .pipe(skip(1), withLatestFrom(this.sandbox.componentProperties$), takeUntil(this.sandbox.destroyed$))
            .subscribe(([mode, props]) => {
            this.sandbox.updateComponentProperties(mode === RecordEditorMode.Create || mode === RecordEditorMode.Temporary
                ? Object.assign(Object.assign({}, props), { recordInstanceId: null, defaultState: null, allowEdit: null, showReadOnlyState: null }) : Object.assign(Object.assign({}, props), { defaultState: null, allowEdit: '1', showReadOnlyState: false }));
        });
        this.showReadOnlyState$
            .pipe(skip(1), withLatestFrom(this.sandbox.componentProperties$), takeUntil(this.sandbox.destroyed$))
            .subscribe(([showReadOnlyState, props]) => {
            this.sandbox.updateComponentProperties(Object.assign(Object.assign({}, props), { defaultState: showReadOnlyState ? RecordEditorState.Read : null }));
        });
        combineLatest([
            combineLatest([
                this.sandbox.getComponentPropertyValue('recordDefinitionName'),
                this.sandbox.getComponentPropertyValue('mode'),
                this.showReadOnlyState$
            ]).pipe(skip(1)),
            this.recordFieldDefinitionItems$,
            this.isExtensionView$,
            this.associationOptions$,
            this.isAssociationRequired$
        ])
            .pipe(map(([[recordDefinitionName, mode, showReadOnlyState], recordFieldDefinitionItems, isExtensionView, associationOptions, isAssociationRequired]) => this.rxRecordEditorDesignHelpersService.getInspector(recordDefinitionName, mode, showReadOnlyState, recordFieldDefinitionItems, isExtensionView, associationOptions, isAssociationRequired, this._onBeforeModeChange.bind(this))), takeUntil(this.sandbox.destroyed$))
            .subscribe(this.updateInspector$);
        // clear child components after changing of record definition
        this.recordDefinitionName$
            .pipe(pairwise(), takeUntil(this.sandbox.destroyed$))
            .subscribe(([prevName, currentName]) => {
            if (prevName) {
                this.sandbox.setChildren([]);
                this.sandbox.updateComponentProperties({ associationDefinitionName: null });
            }
        });
        this.associationOptions$
            .pipe(skip(1), filter((associationOptions) => associationOptions.length === 1), withLatestFrom(this.isAssociationRequired$), filter(([, isAssociationRequired]) => isAssociationRequired), takeUntil(this.sandbox.destroyed$))
            .subscribe(([[{ id: associationDefinitionName }]]) => this.sandbox.updateComponentProperties({ associationDefinitionName }));
        // TODO: performance
        // validation
        combineLatest([
            this.sandbox.componentProperties$,
            this.recordDefinition$,
            this.childFieldIds$,
            this.isAssociationRequired$,
            this.isExtensionView$
        ])
            .pipe(map(([componentProperties, recordDefinition, childFieldIds, isAssociationRequired, isExtensionView]) => {
            return this.rxRecordEditorDesignHelpersService.validate(this.sandbox, componentProperties, recordDefinition, childFieldIds, isAssociationRequired, isExtensionView);
        }), distinctUntilChanged(isEqual), takeUntil(this.sandbox.destroyed$))
            .subscribe((validationIssues) => {
            this.sandbox.setValidationIssues(validationIssues);
        });
        combineLatest([
            this.sandbox.getComponentPropertyValue('name').pipe(map((name) => name || null), distinctUntilChanged()),
            this.recordDefinition$
        ])
            .pipe(takeUntil(this.sandbox.destroyed$))
            .subscribe(([name, recordDefinition]) => {
            this._setSettableProperties(name, recordDefinition);
            this._setCommonDataDictionary(name, recordDefinition);
        });
    }
    removeComponent(guids) {
        this.sandbox.removeComponents(guids);
    }
    updateSelectedFieldComponents(fieldIds) {
        this.selectedFieldComponents$
            .pipe(take(1), mergeMap((components) => {
            const fieldIdsToAdd = fieldIds.filter((fieldId) => !components.find((component) => component.fieldId === fieldId));
            const fieldComponentsToAdd$ = fieldIdsToAdd.length
                ? this.recordFieldDefinitionItems$.pipe(map((items) => fieldIdsToAdd.map((fieldId) => {
                    const { viewComponentType: type, name: label } = items.find((item) => item.id === fieldId);
                    return {
                        type,
                        propertiesByName: {
                            fieldId,
                            label
                        }
                    };
                })), take(1))
                : of([]);
            const fieldIdsSet = new Set(fieldIds);
            const componentGuidsToRemove = components
                .filter((component) => component.fieldId)
                .filter((component) => !fieldIdsSet.has(component.fieldId))
                .map((component) => component.guid);
            return forkJoin([fieldComponentsToAdd$, of(componentGuidsToRemove)]);
        }), takeUntil(this.sandbox.destroyed$))
            .subscribe(([fieldComponentsToAdd, fieldGuidsToRemove]) => {
            if (fieldComponentsToAdd.length) {
                this.sandbox.addComponent(fieldComponentsToAdd);
            }
            if (fieldGuidsToRemove.length) {
                this.sandbox.removeComponents(fieldGuidsToRemove);
            }
        });
    }
    getPropertiesByName(properties) {
        return this.rxRecordEditorDesignHelpersService.getComponentProperties(properties);
    }
    _dropPredicate(data) {
        var _a;
        return (_a = data.draggedViewComponentDescriptor.options) === null || _a === void 0 ? void 0 : _a.canBeEmbeddedInRecordEditor;
    }
    _onBeforeModeChange(prevMode, currentMode) {
        if (prevMode !== RecordEditorMode.Create && currentMode === RecordEditorMode.Create) {
            return this.systemFieldComponentGuids$
                .pipe(mergeMap((systemFieldComponentGuids) => systemFieldComponentGuids.length
                ? this.rxRecordEditorDesignHelpersService.confirmSystemFieldRemoval().pipe(tap((isConfirmed) => {
                    if (isConfirmed) {
                        this.sandbox.removeComponents(systemFieldComponentGuids);
                    }
                }))
                : of(true)), take(1))
                .toPromise();
        }
        else {
            return Promise.resolve(true);
        }
    }
    dropPredicate(data) {
        var _a;
        return (_a = data.draggedViewComponentDescriptor.options) === null || _a === void 0 ? void 0 : _a.canBeEmbeddedInRecordEditor;
    }
    _setCommonDataDictionary(name, recordDefinition) {
        const componentName = this._getComponentName(name, recordDefinition);
        this.sandbox.setCommonDataDictionary(this._getCommonProps(componentName, recordDefinition));
    }
    _setSettableProperties(name, recordDefinition) {
        const componentName = this._getComponentName(name, recordDefinition);
        this.sandbox.setSettablePropertiesDataDictionary(componentName, [
            {
                label: 'Edit state',
                expression: this.getExpressionForProperty('editState')
            },
            {
                label: 'Read state',
                expression: this.getExpressionForProperty('readState')
            },
            ...(recordDefinition
                ? [
                    {
                        label: 'Record instance',
                        children: recordDefinition.fieldDefinitions.map((definition) => ({
                            label: definition.name,
                            expression: this.getExpressionForProperty(`recordInstance.fieldInstances.${definition.id}.value`)
                        }))
                    }
                ]
                : [])
        ]);
    }
    _getCommonProps(componentName, recordDefinition) {
        return {
            label: componentName,
            expression: this.getExpressionForProperty('api'),
            children: [
                {
                    label: 'Can save',
                    expression: this.getExpressionForProperty('canSave')
                },
                {
                    label: 'In read state',
                    expression: this.getExpressionForProperty('inReadState')
                },
                {
                    label: 'Is dirty',
                    expression: this.getExpressionForProperty('isDirty')
                },
                {
                    label: 'Is valid',
                    expression: this.getExpressionForProperty('isValid')
                },
                {
                    label: 'Record definition name',
                    expression: this.getExpressionForProperty('recordDefinitionName')
                },
                {
                    label: 'Record instance',
                    expression: this.getExpressionForProperty('recordInstance'),
                    children: recordDefinition ? this._getRecordInstanceChildProps(recordDefinition) : []
                },
                {
                    label: 'Record instance ID',
                    expression: this.getExpressionForProperty('recordInstanceId')
                }
            ]
        };
    }
    _getRecordInstanceChildProps(recordDefinition) {
        return flow((fieldDefinitions) => reject(fieldDefinitions, { resourceType: RX_RECORD_DEFINITION.resourceTypes.attachment }), (fieldDefinitions) => _map(fieldDefinitions, (fieldDefinition) => {
            const child = {
                label: fieldDefinition.name,
                expression: this.getExpressionForProperty(`recordInstance.fieldInstances.${fieldDefinition.id}.value`)
            };
            if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.selection) {
                const children = (child.autocompleteOptions = _map(fieldDefinition.optionNamesById, (optionName, optionValue) => ({
                    label: optionName,
                    expression: this.getExpressionForProperty(`recordDefinition.fieldDefinitionsById[${fieldDefinition.id}].optionsById[${optionValue}].id`)
                })));
                child.children = [
                    {
                        label: `${fieldDefinition.name} (Option name)`,
                        expression: this.getExpressionForProperty(`selectionFieldOptionNamesById.${fieldDefinition.id}`)
                    },
                    {
                        label: 'Options',
                        children
                    }
                ];
            }
            return child;
        }))(recordDefinition.fieldDefinitions);
    }
    _getComponentName(name, recordDefinition) {
        let componentName = this.sandbox.descriptor.name;
        const recordDefinitionName = recordDefinition
            ? this.rxDefinitionNameService.getDisplayName(recordDefinition.name)
            : null;
        if (recordDefinitionName && name) {
            componentName += ` (${recordDefinitionName}: ${name})`;
        }
        else if (recordDefinitionName) {
            componentName += ` (${recordDefinitionName})`;
        }
        else if (name) {
            componentName += ` (${name})`;
        }
        return componentName;
    }
}
//# sourceMappingURL=record-editor-design.model.js.map