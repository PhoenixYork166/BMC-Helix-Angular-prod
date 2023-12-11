import { RX_ASSOCIATED_RECORD_NODE_SIDES } from '@helix/platform/association/api';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE, RX_AVAILABLE_ON_DEVICES_PROP_NAME, RxViewComponentType } from '@helix/platform/view/api';
import { RxViewActionValidatorService, validateAvailableOnDevicesProp, validateCssClassNames, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { cloneDeep, compact, filter as _filter, find, flatten, head, includes, isEmpty, isEqual, pick, pull } from 'lodash';
import { combineLatest, merge, of, Subject, zip } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, mergeMap, shareReplay, skip, skipWhile, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { RX_RECORD_GRID } from '../record-grid.constant';
import { RecordGridFilterMode } from './editors/record-grid-filter-select-control/record-grid-filter-select-control.types';
import { RxRecordGridDesignUtilsService } from './record-grid-design-utils.service';
import { RecordGridDesignDefinitionMode } from './record-grid-design.types';
import { RxGuidService } from '@helix/platform/utils';
export class RecordGridDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.rxViewActionValidatorService = this.injector.get(RxViewActionValidatorService);
        this.rxRecordGridDesignUtilsService = this.injector.get(RxRecordGridDesignUtilsService);
        this.rxGuidService = this.injector.get(RxGuidService);
        this.rxDefinitionNameService = this.injector.get(RxDefinitionNameService);
        this.preservedRecordDefinition = null;
        this.preservedRecordAssociationDefinitions = [];
        this.currentGridDesignProperties = null;
        this.componentPropertiesChangeFromCanvas$ = new Subject();
        this.columns$ = this.sandbox.getComponentPropertyValue('columns');
        this.enableFiltering$ = this.sandbox.getComponentPropertyValue('enableFiltering');
        this.recordDefinitionName$ = this.sandbox.getComponentPropertyValue('recordDefinitionName');
        this.associationDefinitionName$ = this.sandbox.getComponentPropertyValue('associationDefinitionName');
        this.associatedRecordNodeSide$ = this.sandbox.getComponentPropertyValue('associatedRecordNodeSide');
        this.childComponentsTree$ = this.sandbox.getChildComponentsTree();
        this.viewPresetSelectors$ = this.sandbox.getComponentsByType(RxViewComponentType.ViewPresetSelector);
        this.gridViewPresets$ = this.childComponentsTree$.pipe(map((components) => this.rxRecordGridDesignUtilsService.getGridViewPresetsFromChildData(components)));
        this.viewPresetSelectorGuid$ = this.sandbox.getComponentPropertyValue('viewPresetSelector').pipe(map((val) => this.extractViewPresetSelectorGuid(val)), shareReplay({ refCount: true, bufferSize: 1 }));
        this.selectedPresetsList$ = this.viewPresetSelectorGuid$.pipe(switchMap((guid) => this.rxRecordGridDesignUtilsService.getPresetsList(guid)), distinctUntilChanged(isEqual), takeUntil(this.sandbox.destroyed$));
        this.rowActionButtonGuids$ = this.sandbox.getLayout(this.sandbox.guid).pipe(filter(Boolean), map((layout) => {
            const rowActionsOutlet = find(layout.outlets, { name: RX_RECORD_GRID.rowActionsOutletName });
            return head(rowActionsOutlet.columns).children;
        }), shareReplay(1));
    }
    static getInitialProperties(initialProperties) {
        return Object.assign(Object.assign({}, RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE), initialProperties);
    }
    rxInit() {
        const initialProps = Object.assign({ bordered: true, expandable: false, name: null, mode: RecordGridDesignDefinitionMode.Record, recordDefinitionName: null, showDataForAllLocales: false, associationDefinitionName: null, associatedRecordId: null, associatedRoleName: null, enableRowSelection: RX_RECORD_GRID.selectionTypes.multiple, styles: null, cardLayoutWidth: null, enableFiltering: true, getDataForHiddenColumns: true, requiredFilters: 0, enableFilterPresets: true, defaultFilterPreset: null, initialSortColumn: null, columns: [], filterMode: RecordGridFilterMode.Basic, filters: { basicFilters: [], filtersJson: null }, filterExpression: null, filterPresets: [], striped: false }, RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE);
        this.recordDefinition$ = this.recordDefinitionName$.pipe(switchMap((recordDefinitionName) => this.getRecordDefinition(recordDefinitionName)), shareReplay(1));
        this.recordAssociationDefinitions$ = this.recordDefinitionName$.pipe(mergeMap((recordDefinitionName) => this.getRecordAssociationDefinitions(recordDefinitionName)), shareReplay(1));
        const columnComponents$ = this.childComponentsTree$.pipe(map((components) => components.filter((component) => component.type === RX_RECORD_GRID.components.column)), 
        // ignore child action button component updates
        distinctUntilChanged(isEqual));
        const basicRecordGridFilters$ = this.childComponentsTree$.pipe(map((components) => this.rxRecordGridDesignUtilsService.getBasicRecordGridFiltersFromChildData(components)), distinctUntilChanged(isEqual));
        const filterPresets$ = this.childComponentsTree$.pipe(map((components) => this.rxRecordGridDesignUtilsService.getFilterPresetDescriptorsFromChildData(components)), distinctUntilChanged(isEqual));
        this.actionButtonComponents$ = this.childComponentsTree$.pipe(withLatestFrom(this.rowActionButtonGuids$), map(([definitions, rowActionButtonGuids]) => this.rxRecordGridDesignUtilsService
            .getActionButtonDescriptorsFromChildData(definitions)
            .filter((definition) => !includes(rowActionButtonGuids, definition.guid))));
        this.rowActionButtonComponents$ = this.childComponentsTree$.pipe(withLatestFrom(this.rowActionButtonGuids$), map(([definitions, rowActionButtonGuids]) => this.rxRecordGridDesignUtilsService
            .getActionButtonDescriptorsFromChildData(definitions)
            .filter((definition) => includes(rowActionButtonGuids, definition.guid))));
        // remove grid view presets in case if bound preset selector is removed
        this.viewPresetSelectors$
            .pipe(map((viewPresetSelectors) => viewPresetSelectors.map((selector) => selector.guid).sort()), distinctUntilChanged(isEqual), withLatestFrom(this.viewPresetSelectorGuid$), filter(([viewPresetSelectors, viewPresetSelectorGuid]) => viewPresetSelectorGuid && !viewPresetSelectors.includes(viewPresetSelectorGuid)), switchMap(() => this.childComponentsTree$.pipe(take(1))), map((components) => components.filter((comp) => comp.type !== RX_RECORD_GRID.components.viewPreset)), takeUntil(this.sandbox.destroyed$))
            .subscribe((components) => {
            this.sandbox.setChildren(components);
            this.sandbox.updateComponentProperties({ viewPresetSelector: null });
        });
        this.sandbox.viewModelsInitialized$
            .pipe(withLatestFrom(this.rowActionButtonComponents$), map(([viewModelsInitialized, rowActionButtons]) => rowActionButtons), filter((rowActionButtons) => !!rowActionButtons.length))
            .subscribe((rowActionButtons) => {
            rowActionButtons.forEach((rowActionButton) => {
                const model = this.sandbox.getComponentModel(rowActionButton.guid);
                model.setValidationIssues([]);
            });
        });
        merge(this.sandbox.componentProperties$.pipe(skip(1)), this.componentPropertiesChangeFromCanvas$)
            .pipe(distinctUntilChanged((oldValue, newValue) => isEqual(this.currentGridDesignProperties, newValue)), mergeMap((componentDesignProperties) => {
            const previousComponentDesignProperties = this.currentGridDesignProperties;
            if (previousComponentDesignProperties.recordDefinitionName !== componentDesignProperties.recordDefinitionName) {
                return zip(this.getRecordDefinition(componentDesignProperties.recordDefinitionName), this.getRecordAssociationDefinitions(componentDesignProperties.recordDefinitionName)).pipe(map(() => [previousComponentDesignProperties, componentDesignProperties]));
            }
            else {
                return of([previousComponentDesignProperties, componentDesignProperties]);
            }
        }), withLatestFrom(this.actionButtonComponents$, this.rowActionButtonComponents$, this.gridViewPresets$), takeUntil(this.sandbox.destroyed$))
            .subscribe(([[previousComponentDesignProperties, componentDesignProperties], actionButtonComponents, rowActionButtonComponents, gridViewPresets]) => {
            const recordDefinition = this.preservedRecordDefinition;
            const recordAssociationDefinitions = this.preservedRecordAssociationDefinitions;
            let propertiesToUpdate;
            if (!componentDesignProperties.enableFiltering) {
                propertiesToUpdate = {
                    enableFilterPresets: false
                };
            }
            else if (!previousComponentDesignProperties.enableFiltering && componentDesignProperties.enableFiltering) {
                propertiesToUpdate = {
                    enableFilterPresets: true
                };
            }
            if (previousComponentDesignProperties.recordDefinitionName !== componentDesignProperties.recordDefinitionName) {
                propertiesToUpdate = {
                    filterPresets: [],
                    filters: { basicFilters: [], filtersJson: null },
                    initialSortColumn: null,
                    associationDefinitionName: null,
                    filterExpression: null
                };
                if (recordDefinition) {
                    const columns = this.rxRecordGridDesignUtilsService.getDefaultColumns(recordDefinition);
                    const payloads = this.rxRecordGridDesignUtilsService.getColumnComponentPayloads(columns, null);
                    payloads.push(...actionButtonComponents);
                    this.sandbox.setChildren(payloads);
                    propertiesToUpdate.columns = columns;
                }
                else {
                    this.sandbox.setChildren(actionButtonComponents);
                    propertiesToUpdate.columns = [];
                }
            }
            else {
                const childrenModels = pick(componentDesignProperties, 'columns', 'initialSortColumn', 'filters', 'filterPresets');
                const previousChildrenModels = pick(previousComponentDesignProperties, 'columns', 'initialSortColumn', 'filters', 'filterPresets');
                if (!isEqual(previousChildrenModels, childrenModels)) {
                    const payloads = this.rxRecordGridDesignUtilsService.getColumnComponentPayloads(childrenModels.columns, childrenModels.initialSortColumn);
                    const newInspectorColumns = this.rxRecordGridDesignUtilsService.getInspectorColumnsFromDesignData(payloads);
                    payloads.push(...this.rxRecordGridDesignUtilsService.getGridFilterComponentPayloads(childrenModels.filters.basicFilters || []));
                    const filterPresetComponentPayloads = this.rxRecordGridDesignUtilsService.getGridFilterPresetComponentPayloads(childrenModels.filterPresets, newInspectorColumns.filter((column) => column.filterable));
                    payloads.push(...filterPresetComponentPayloads);
                    childrenModels.filterPresets =
                        this.rxRecordGridDesignUtilsService.getFilterPresetDescriptorsFromChildData(filterPresetComponentPayloads);
                    payloads.push(...actionButtonComponents, ...rowActionButtonComponents, ...gridViewPresets);
                    this.sandbox.setChildren(payloads);
                    propertiesToUpdate = {
                        columns: newInspectorColumns,
                        initialSortColumn: this.rxRecordGridDesignUtilsService.getInitialSortColumnModel(newInspectorColumns),
                        filterPresets: childrenModels.filterPresets
                    };
                }
            }
            if (previousComponentDesignProperties.filterMode !== componentDesignProperties.filterMode) {
                if (componentDesignProperties.filterMode === RecordGridFilterMode.Basic) {
                    propertiesToUpdate = {
                        filterExpression: null
                    };
                }
                else {
                    propertiesToUpdate = {
                        filters: { basicFilters: [], filtersJson: null }
                    };
                }
            }
            if (previousComponentDesignProperties.associationDefinitionName !==
                componentDesignProperties.associationDefinitionName) {
                propertiesToUpdate = Object.assign(Object.assign({}, (propertiesToUpdate || {})), { associatedRecordNodeSide: this.getAssociatedRecordNodeSide(componentDesignProperties, recordAssociationDefinitions) });
            }
            if (previousComponentDesignProperties.mode !== componentDesignProperties.mode) {
                propertiesToUpdate = {
                    associationDefinitionName: null,
                    associatedRecordId: null,
                    associatedRoleName: null,
                    associatedRecordNodeSide: null
                };
            }
            componentDesignProperties = Object.assign(Object.assign({}, componentDesignProperties), propertiesToUpdate);
            if (previousComponentDesignProperties.enableFiltering && !componentDesignProperties.enableFiltering) {
                propertiesToUpdate = Object.assign(Object.assign({}, propertiesToUpdate), { requiredFilters: 0 });
            }
            this.updateComponentPropertiesAndConfig(componentDesignProperties, propertiesToUpdate, recordDefinition, recordAssociationDefinitions);
        });
        combineLatest([
            this.recordDefinitionName$.pipe(map((recordDefinitionName) => recordDefinitionName
                ? null
                : this.sandbox.createError('Record definition name cannot be blank.', 'recordDefinitionName'))),
            columnComponents$.pipe(switchMap((columns) => this.validateColumns(columns))),
            this.sandbox.getComponentPropertyValue('styles').pipe(map(validateCssClassNames)),
            this.sandbox
                .getComponentPropertyValue('mode')
                .pipe(switchMap((mode) => mode === RecordGridDesignDefinitionMode.Association
                ? this.validateAssociationModeProps()
                : this.actionButtonComponents$.pipe(switchMap((components) => this.validateActionButtons(components))))),
            this.rowActionButtonComponents$.pipe(switchMap((rowActionButtons) => this.validateRowActions(rowActionButtons))),
            this.sandbox
                .getComponentPropertyValue(RX_AVAILABLE_ON_DEVICES_PROP_NAME)
                .pipe(map(validateAvailableOnDevicesProp))
        ])
            .pipe(map(compact), map(flatten), takeUntil(this.sandbox.destroyed$))
            .subscribe((issues) => {
            this.sandbox.setValidationIssues(issues);
        });
        // set initial properties and inspector config
        combineLatest([
            this.sandbox.componentProperties$,
            this.recordDefinition$,
            this.recordAssociationDefinitions$,
            columnComponents$,
            basicRecordGridFilters$,
            filterPresets$
        ])
            .pipe(take(1), takeUntil(this.sandbox.destroyed$))
            .subscribe(([componentProperties, recordDefinition, recordAssociationDefinitions, columnComponents, basicRecordGridFilters, filterPresets]) => {
            const componentDesignProperties = this.rxRecordGridDesignUtilsService.getComponentDesignProperties(componentProperties, initialProps, columnComponents, basicRecordGridFilters, filterPresets);
            this.updateComponentPropertiesAndConfig(componentDesignProperties, componentDesignProperties, recordDefinition, recordAssociationDefinitions);
        });
        const name$ = this.sandbox
            .getComponentPropertyValue('name')
            .pipe(shareReplay(1), takeUntil(this.sandbox.destroyed$));
        const associationDefinitionDisplayName$ = this.associationDefinitionName$.pipe(map((name) => this.rxDefinitionNameService.getDisplayName(name)), shareReplay(1), takeUntil(this.sandbox.destroyed$));
        this.rxRecordGridDesignUtilsService
            .getColumnDataDictionaryBranch(this.sandbox.guid, this.sandbox.descriptor.name, name$, columnComponents$, this.recordDefinition$, associationDefinitionDisplayName$)
            .pipe(skipWhile(isEmpty), takeUntil(this.sandbox.destroyed$))
            .subscribe((dataDictionaryBranch) => {
            this.sandbox.setCommonDataDictionary(dataDictionaryBranch);
        });
        combineLatest([
            this.recordDefinitionName$.pipe(map((name) => this.rxDefinitionNameService.getDisplayName(name))),
            associationDefinitionDisplayName$,
            name$
        ])
            .pipe(map((names) => this.rxRecordGridDesignUtilsService.getComponentName(this.sandbox.descriptor.name, ...names)), takeUntil(this.sandbox.destroyed$))
            .subscribe((name) => {
            // Set name to be used in the data dictionary for set property action if record grid will have child action buttons.
            this.sandbox.setSettablePropertiesDataDictionary(name, []);
        });
        // updates grid view presets when view preset changes
        this.selectedPresetsList$
            .pipe(skip(1), withLatestFrom(this.childComponentsTree$, this.columns$), takeUntil(this.sandbox.destroyed$))
            .subscribe(([selectedPresetsList, childComponents, columns]) => {
            this.updatePresetViewComponents(childComponents, selectedPresetsList, columns);
        });
    }
    updatePresetViewComponents(childComponents, selectedPresetsList, columns) {
        const gridViewPresetComponents = childComponents.filter((c) => c.type === RX_RECORD_GRID.components.viewPreset);
        const gridViewPresetPayloads = selectedPresetsList.map(({ guid }) => {
            const existing = gridViewPresetComponents.find((c) => c.data.viewPresetGuid === guid);
            return existing !== null && existing !== void 0 ? existing : this.rxRecordGridDesignUtilsService.getGridViewPresetPayload(guid, columns);
        });
        this.sandbox.setChildrenByType(gridViewPresetPayloads, [RX_RECORD_GRID.components.viewPreset]);
    }
    getAssociatedRecordNodeSide(componentDesignProperties, recordAssociationDefinitions) {
        const selectedAssociationDefinition = componentDesignProperties.associationDefinitionName
            ? recordAssociationDefinitions.find(({ name }) => name === componentDesignProperties.associationDefinitionName)
            : null;
        return selectedAssociationDefinition
            ? selectedAssociationDefinition.nodeAId === componentDesignProperties.recordDefinitionName
                ? RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.value
                : RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value
            : null;
    }
    actionButtonDropPredicate(data) {
        return data.draggedViewComponentDescriptor.type === RxViewComponentType.ActionButton;
    }
    getPropertiesByName(properties) {
        return this.rxRecordGridDesignUtilsService.getComponentProperties(properties);
    }
    setRowActions(rowActions) {
        this.rowActionButtonGuids$
            .pipe(take(1), withLatestFrom(this.childComponentsTree$))
            .subscribe(([rowActionButtonGuids, childComponentsTree]) => {
            const childComponentPayloads = childComponentsTree.filter((childComponent) => !includes(rowActionButtonGuids, childComponent.guid));
            childComponentPayloads.push(...this.rxRecordGridDesignUtilsService.getRowActionButtonPayloads(rowActions));
            this.sandbox.setChildren(childComponentPayloads);
            this.toggleActionsColumn(rowActions.length > 0);
        });
    }
    extractViewPresetSelectorGuid(val) {
        var _a;
        const matches = val === null || val === void 0 ? void 0 : val.match(/^\${view\.components\.([0-9a-z-]+)\.api}$/);
        return (_a = (matches && matches[1])) !== null && _a !== void 0 ? _a : null;
    }
    toggleActionsColumn(showActionsColumn) {
        this.sandbox.componentProperties$.pipe(take(1)).subscribe((componentProperties) => {
            const columns = cloneDeep(componentProperties.columns);
            const actionsColumn = find(columns, { fieldId: RX_RECORD_GRID.actionsColumnFieldDefinition.id });
            if (showActionsColumn && !actionsColumn) {
                columns.push({
                    fieldId: RX_RECORD_GRID.actionsColumnFieldDefinition.id,
                    guid: this.rxGuidService.generate(),
                    title: RX_RECORD_GRID.actionsColumnFieldDefinition.name,
                    visible: true,
                    index: columns.length,
                    filterable: false,
                    sortable: false,
                    searchable: false
                });
            }
            else if (!showActionsColumn) {
                pull(columns, actionsColumn);
                columns.forEach((column, index) => {
                    column.index = index;
                });
            }
            this.updateComponentPropertiesAndConfig(componentProperties, {
                columns
            }, this.preservedRecordDefinition, this.preservedRecordAssociationDefinitions);
        });
    }
    updateComponentPropertiesAndConfig(componentDesignProperties, propertiesToUpdate, recordDefinition, recordAssociationDefinitions) {
        this.currentGridDesignProperties = componentDesignProperties;
        if (propertiesToUpdate) {
            this.sandbox.updateComponentProperties(propertiesToUpdate);
        }
        this.sandbox.updateInspectorConfig(this.rxRecordGridDesignUtilsService.getInspector(componentDesignProperties, recordDefinition, recordAssociationDefinitions));
    }
    getRecordDefinition(recordDefinitionName) {
        if (recordDefinitionName) {
            return this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName).pipe(catchError((error) => of(null)), tap((recordDefinition) => (this.preservedRecordDefinition = recordDefinition)));
        }
        else {
            this.preservedRecordDefinition = null;
            return of(null);
        }
    }
    getRecordAssociationDefinitions(recordDefinitionName) {
        if (recordDefinitionName) {
            return this.rxRecordDefinitionCacheService.getRecordAssociationDefinitions(recordDefinitionName).pipe(map((result) => result[recordDefinitionName] || []), catchError((error) => of([])), tap((recordAssociationDefinitions) => (this.preservedRecordAssociationDefinitions = recordAssociationDefinitions)));
        }
        else {
            this.preservedRecordAssociationDefinitions = [];
            return of([]);
        }
    }
    validateColumns(columns) {
        return columns.length
            ? this.validateColumnActions(columns)
            : of([this.sandbox.createError('Record grid must have at least one column.', 'columns')]);
    }
    validateColumnActions(columns) {
        return combineLatest(columns.map((column) => {
            const actionViewComponents = _filter(column.children, { type: RxViewComponentType.Action });
            return this.rxViewActionValidatorService.validate(actionViewComponents, 'columns').pipe(map((issues) => issues.map((issue) => (Object.assign(Object.assign({}, issue), { data: Object.assign(Object.assign({}, issue.data), { columnGuid: column.guid }) })))));
        })).pipe(map(flatten));
    }
    validateRowActions(rowActionButtons) {
        return rowActionButtons.length
            ? combineLatest(rowActionButtons.map((rowActionButton, index) => this.rxViewActionValidatorService.validate(rowActionButton.children, 'rowActions').pipe(map((issues) => issues.map((issue) => (Object.assign(Object.assign({}, issue), { data: Object.assign(Object.assign({}, issue.data), { rowActionIndex: index }) }))))))).pipe(map(flatten))
            : of([]);
    }
    validateAssociationModeProps() {
        return combineLatest([
            combineLatest([this.associationDefinitionName$, this.associatedRecordNodeSide$]).pipe(map(([associationDefinitionName, associatedRecordNodeSide]) => {
                if (associationDefinitionName) {
                    return associatedRecordNodeSide
                        ? null
                        : this.sandbox.createError('Associated record node side cannot be blank.', 'associatedRecordNodeSide');
                }
                else {
                    return this.sandbox.createError('Association definition name cannot be blank.', 'associationDefinitionName');
                }
            })),
            this.sandbox
                .getComponentPropertyValue('associatedRecordId')
                .pipe(map((associatedRecordId) => associatedRecordId
                ? null
                : this.sandbox.createError('Associated record ID cannot be blank.', 'associatedRecordId')))
        ]).pipe(map(compact));
    }
    validateActionButtons(components) {
        const deleteActions = flatten(components.map((component) => component.children)).filter(({ data }) => data.name === 'rxDeleteRecordsAction' && data.recordDefinitionName);
        return deleteActions.length
            ? combineLatest(deleteActions.map(({ data }) => this.rxRecordDefinitionCacheService
                .getRecordDefinition(data.recordDefinitionName)
                .pipe(map(({ resourceType }) => resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType
                ? this.sandbox.createWarning('You have configured a Record grid action to delete Join records. Please ensure that one or more processes or rules have been defined to perform the deletion of the selected Join record instances.')
                : null)))).pipe(map(compact))
            : of([]);
    }
}
//# sourceMappingURL=record-grid-design.model.js.map