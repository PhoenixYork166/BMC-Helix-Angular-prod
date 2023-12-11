import { Injectable } from '@angular/core';
import { RX_ASSOCIATED_RECORD_NODE_SIDES, RX_ASSOCIATION_DEFINITION } from '@helix/platform/association/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxDefinitionNameService, RxFeatureService, Tooltip } from '@helix/platform/shared/api';
import { ExpressionInspectorControlComponent, GroupButtonFormControlComponent, OptionalSelectFormControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType, SelectFormControlComponent, SwitchFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RxGuidService, RxJsonParserService } from '@helix/platform/utils';
import { RecordGridNamedFilterOptionKey, RX_AVAILABLE_ON_DEVICES_PROP_NAME, RX_VIEW_DEFINITION, RxViewComponentType } from '@helix/platform/view/api';
import { getAvailableOnDevicesInspectorConfig, getStylesFieldInspectorConfig, ViewDesignerFacade } from '@helix/platform/view/designer';
import { defaults, filter as _filter, find, forEach, isEmpty, isObject, isUndefined, map as _map, omit, pick, reduce, sortBy } from 'lodash';
import { combineLatest, forkJoin, of } from 'rxjs';
import { debounceTime, filter, map, switchMap, take } from 'rxjs/operators';
import { RxRecordGridUtilsService } from '../common/services/record-grid-utils.service';
import { RX_RECORD_GRID } from '../record-grid.constant';
import { RxRecordGridConfigUtilsService } from '../runtime/services/record-grid-config-utils.service';
import { RecordGridColumnEditorControlComponent } from './editors/record-grid-column-editor-control/record-grid-column-editor-control.component';
import { RecordGridFilterPresetEditorControlComponent } from './editors/record-grid-filter-preset-editor-control/record-grid-filter-preset-editor-control.component';
import { RecordGridFilterMode } from './editors/record-grid-filter-select-control/record-grid-filter-select-control.types';
import { RecordGridFilterSelectControlComponent } from './editors/record-grid-filter-select-control/record-grid-filter-select-control.component';
import { RxRecordGridRowActionEditorWidgetComponent } from './editors/record-grid-row-action-editor-control/record-grid-row-action-editor-widget.component';
import { RecordGridSortEditorControlComponent } from './editors/record-grid-sort-editor-control/record-grid-sort-editor-control.component';
import { RecordGridDesignDefinitionMode } from './record-grid-design.types';
import { RecordGridViewPresetsWidgetComponent } from './editors/record-grid-view-presets-widget/record-grid-view-presets-widget.component';
import { RxRecordGridFilterHelperService } from '../common/services/record-grid-filter-helper.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "../runtime/services/record-grid-config-utils.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "../common/services/record-grid-utils.service";
import * as i6 from "../common/services/record-grid-filter-helper.service";
import * as i7 from "@ngx-translate/core";
import * as i8 from "@helix/platform/view/designer";
export class RxRecordGridDesignUtilsService {
    constructor(rxGuidService, rxRecordGridConfigUtilsService, rxDefinitionNameService, rxFeatureService, rxModalService, rxRecordGridUtilsService, rxRecordGridFilterHelperService, translateService, viewDesignerFacade, rxJsonParserService) {
        this.rxGuidService = rxGuidService;
        this.rxRecordGridConfigUtilsService = rxRecordGridConfigUtilsService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxFeatureService = rxFeatureService;
        this.rxModalService = rxModalService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxRecordGridFilterHelperService = rxRecordGridFilterHelperService;
        this.translateService = translateService;
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxJsonParserService = rxJsonParserService;
    }
    getColumnActionComponentPayloads(actions) {
        return _map(actions, (action) => (Object.assign(Object.assign({}, action), { type: RxViewComponentType.Action })));
    }
    getNamedFilterOptionPayloads(namedFilterOptions) {
        return _map(namedFilterOptions, (namedFilterOption) => (Object.assign(Object.assign({}, namedFilterOption), { type: RX_RECORD_GRID.components.filterPreset })));
    }
    getGridFilterComponentPayloads(gridFilters) {
        return _map(gridFilters, (gridFilter) => ({
            guid: gridFilter.guid,
            type: RX_RECORD_GRID.components.filter,
            data: Object.assign({ fieldId: gridFilter.fieldId, value: gridFilter.value }, (gridFilter.$DISPLAYVALUE$ && { $DISPLAYVALUE$: gridFilter.$DISPLAYVALUE$ }))
        }));
    }
    getColumnComponentPayloads(columns, initialSortColumn) {
        return _map(columns, (inspectorColumn, index) => {
            let sortable = 'false';
            if ((initialSortColumn === null || initialSortColumn === void 0 ? void 0 : initialSortColumn.fieldId) === inspectorColumn.fieldId && inspectorColumn.sortable !== false) {
                sortable = JSON.stringify({
                    direction: initialSortColumn.direction
                });
            }
            else if (isObject(inspectorColumn.sortable) || inspectorColumn.sortable === true) {
                sortable = 'true';
            }
            const columnDesignModel = {
                alignment: inspectorColumn.alignment,
                fieldId: inspectorColumn.fieldId,
                filterable: inspectorColumn.filterable,
                filterType: inspectorColumn.filterType,
                index: String(inspectorColumn.index),
                sortable,
                title: inspectorColumn.title,
                searchable: inspectorColumn.searchable,
                visible: inspectorColumn.visible,
                cellDisplayProperties: inspectorColumn.cellDisplayProperties,
                width: inspectorColumn.width,
                wrapText: inspectorColumn.wrapText,
                typeaheadKeystrokeCount: inspectorColumn.typeaheadKeystrokeCount,
                additionalQueryCriteria: inspectorColumn.additionalQueryCriteria
            };
            return {
                type: RX_RECORD_GRID.components.column,
                guid: inspectorColumn.guid,
                insertIndex: index,
                outletName: RX_VIEW_DEFINITION.defaultOutletName,
                data: columnDesignModel,
                children: [
                    ...this.getColumnActionComponentPayloads(inspectorColumn.actions),
                    ...this.getNamedFilterOptionPayloads(inspectorColumn.namedFilterOptions)
                ]
            };
        });
    }
    getGridFilterPresetComponentPayloads(filterPresets, columns) {
        const namedFilterGuids = columns.reduce((result, column) => result.concat(...column.namedFilterOptions.map((namedFilter) => namedFilter.guid)), []);
        const selectedFieldIds = columns.map((column) => column.fieldId);
        return _map(filterPresets, (filterPreset) => {
            const newRecordGridFilters = filterPreset.recordGridFilters
                .filter((filter) => selectedFieldIds.includes(filter.fieldId))
                .filter((filter) => {
                const value = isObject(filter.value) ? filter.value : this.rxJsonParserService.tryParseJson(filter.value);
                return (!(value === null || value === void 0 ? void 0 : value[RecordGridNamedFilterOptionKey]) ||
                    namedFilterGuids.includes(value[RecordGridNamedFilterOptionKey]));
            });
            const newFilterData = this.rxRecordGridFilterHelperService.getRecordGridFilterDataFromPredefinedFilter(filterPreset.filters, newRecordGridFilters);
            return {
                guid: filterPreset.guid,
                type: RX_RECORD_GRID.components.filterPreset,
                data: {
                    title: filterPreset.title,
                    filters: newFilterData
                        ? this.rxRecordGridFilterHelperService.denormalizeFilterString(JSON.stringify(newFilterData), newRecordGridFilters)
                        : null
                },
                children: _map(newRecordGridFilters, (recordGridFilter) => ({
                    guid: recordGridFilter.guid,
                    type: RX_RECORD_GRID.components.filter,
                    data: Object.assign({ fieldId: recordGridFilter.fieldId, value: recordGridFilter.value }, (recordGridFilter.$DISPLAYVALUE$ && { $DISPLAYVALUE$: recordGridFilter.$DISPLAYVALUE$ }))
                }))
            };
        });
    }
    getFilterPresetDescriptorsFromChildData(definitions) {
        return _map(definitions.filter((definition) => definition.type === RX_RECORD_GRID.components.filterPreset), (filterPresetsDescriptor) => ({
            filters: filterPresetsDescriptor.data.filters,
            recordGridFilters: _map(_filter(filterPresetsDescriptor.children, (definition) => definition.type === RX_RECORD_GRID.components.filter), (presetFilter) => ({
                fieldId: presetFilter.data.fieldId,
                value: presetFilter.data.value,
                guid: presetFilter.guid,
                $DISPLAYVALUE$: presetFilter.data.$DISPLAYVALUE$
            })),
            title: filterPresetsDescriptor.data.title,
            guid: filterPresetsDescriptor.guid
        })).filter((filterPreset) => { var _a; return ((_a = filterPreset.recordGridFilters) === null || _a === void 0 ? void 0 : _a.length) > 0; });
    }
    getActionsFromComponent(componentDesignData) {
        return _map(_filter(componentDesignData.children, (definition) => definition.type === RxViewComponentType.Action), (columnAction) => (Object.assign(Object.assign({}, columnAction), { data: Object.assign({}, columnAction.data) })));
    }
    getNamedFilterOptionsFromComponent(componentDesignData) {
        return componentDesignData.children
            .filter((definition) => definition.type === RX_RECORD_GRID.components.filterPreset)
            .map((namedFilterOptionData) => (Object.assign(Object.assign({}, namedFilterOptionData), { data: Object.assign({}, namedFilterOptionData.data) })));
    }
    getDefaultColumns(recordDefinition) {
        let columns = [];
        if (recordDefinition) {
            const fieldDefinitions = recordDefinition.fieldDefinitions;
            const coreFieldIds = RX_RECORD_DEFINITION.coreFieldIds;
            columns = [
                {
                    title: find(fieldDefinitions, (fieldDefinition) => fieldDefinition.id === coreFieldIds.displayId).name,
                    fieldId: String(coreFieldIds.displayId),
                    searchable: true
                }
            ];
            if (recordDefinition.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType) {
                columns.push({
                    title: find(fieldDefinitions, (fieldDefinition) => fieldDefinition.id === coreFieldIds.modifiedDate).name,
                    fieldId: String(coreFieldIds.modifiedDate),
                    searchable: false
                });
                columns.push({
                    title: find(fieldDefinitions, (fieldDefinition) => fieldDefinition.id === coreFieldIds.description).name,
                    fieldId: String(coreFieldIds.description),
                    searchable: true
                });
            }
            const defaultValues = reduce(RX_RECORD_GRID.columnProperties, (result, columnProperty) => {
                result[columnProperty.name] = columnProperty.defaultValue;
                return result;
            }, {});
            forEach(columns, (column, index) => defaults(column, defaultValues, {
                index,
                guid: this.rxGuidService.generate()
            }));
        }
        return columns;
    }
    getInitialSortColumnModel(columns) {
        const selectedSortColumn = find(columns, (column) => isObject(column.sortable));
        return selectedSortColumn
            ? {
                direction: selectedSortColumn.sortable.direction,
                fieldId: selectedSortColumn.fieldId
            }
            : null;
    }
    getInspectorColumnsFromDesignData(columnsDesignModel) {
        return columnsDesignModel.map((columnDescriptor) => {
            const column = columnDescriptor.data;
            return Object.assign(Object.assign({}, pick(column, [
                'alignment',
                'fieldId',
                'filterType',
                'searchable',
                'title',
                'cellDisplayProperties',
                'width',
                'typeaheadKeystrokeCount',
                'additionalQueryCriteria'
            ])), { actions: this.getActionsFromComponent(columnDescriptor), namedFilterOptions: this.getNamedFilterOptionsFromComponent(columnDescriptor), guid: columnDescriptor.guid, filterable: this.rxRecordGridConfigUtilsService.getBooleanValue(column.filterable) || isUndefined(column.filterable), sortable: this.rxRecordGridConfigUtilsService.parseConfigString(column.sortable) ||
                    isUndefined(column.sortable), visible: this.rxRecordGridConfigUtilsService.getBooleanValue(column.visible) || isUndefined(column.visible), wrapText: this.rxRecordGridConfigUtilsService.getBooleanValue(column.wrapText), index: Number(column.index) });
        });
    }
    getComponentProperties(componentDesignProperties) {
        var _a, _b, _c;
        return {
            bordered: (_a = componentDesignProperties.bordered) !== null && _a !== void 0 ? _a : true,
            expandable: componentDesignProperties.expandable,
            name: componentDesignProperties.name,
            recordDefinitionName: componentDesignProperties.recordDefinitionName,
            showDataForAllLocales: componentDesignProperties.showDataForAllLocales,
            associationDefinitionName: componentDesignProperties.associationDefinitionName,
            associatedRecordNodeSide: componentDesignProperties.associatedRecordNodeSide,
            associatedRecordId: componentDesignProperties.associatedRecordId,
            associatedRoleName: componentDesignProperties.associatedRoleName,
            filterExpression: componentDesignProperties.filterExpression,
            filters: isObject(componentDesignProperties.filters)
                ? componentDesignProperties.filters.filtersJson
                : componentDesignProperties.filters,
            defaultFilterPreset: this.getDefaultFilterPreset(componentDesignProperties),
            cardLayoutWidth: componentDesignProperties.cardLayoutWidth,
            enableFiltering: componentDesignProperties.enableFiltering,
            requiredFilters: (_b = componentDesignProperties.requiredFilters) !== null && _b !== void 0 ? _b : 0,
            getDataForHiddenColumns: (_c = componentDesignProperties.getDataForHiddenColumns) !== null && _c !== void 0 ? _c : true,
            enableFilterPresets: componentDesignProperties.enableFilterPresets,
            enableRowSelection: componentDesignProperties.enableRowSelection,
            styles: componentDesignProperties.styles,
            striped: !!componentDesignProperties.striped,
            viewPresetSelector: componentDesignProperties.viewPresetSelector,
            [RX_AVAILABLE_ON_DEVICES_PROP_NAME]: componentDesignProperties[RX_AVAILABLE_ON_DEVICES_PROP_NAME]
        };
    }
    getDefaultFilterPreset(componentDesignProperties) {
        if (componentDesignProperties.defaultFilterPreset && componentDesignProperties.filterPresets) {
            return componentDesignProperties.filterPresets.some((filterPreset) => filterPreset.guid === componentDesignProperties.defaultFilterPreset)
                ? componentDesignProperties.defaultFilterPreset
                : null;
        }
        else if (componentDesignProperties.defaultFilterPreset && !componentDesignProperties.filterPresets) {
            return componentDesignProperties.defaultFilterPreset;
        }
        return null;
    }
    getComponentDesignProperties(componentProperties, initialComponentProperties, columnsDesignModel, basicRecordGridFilters, filterPresets) {
        const columns = this.getInspectorColumnsFromDesignData(columnsDesignModel);
        componentProperties = Object.assign(Object.assign({}, initialComponentProperties), componentProperties);
        return Object.assign(Object.assign({}, componentProperties), { mode: componentProperties.associationDefinitionName
                ? RecordGridDesignDefinitionMode.Association
                : RecordGridDesignDefinitionMode.Record, filters: {
                basicFilters: basicRecordGridFilters,
                filtersJson: componentProperties.filters
            }, filterMode: componentProperties.filterExpression ? RecordGridFilterMode.Expression : RecordGridFilterMode.Basic, filterPresets, initialSortColumn: this.getInitialSortColumnModel(columns), columns });
    }
    getActionButtonDescriptorsFromChildData(definitions) {
        return definitions.filter((definition) => definition.type === RxViewComponentType.ActionButton);
    }
    getGridViewPresetsFromChildData(definitions) {
        return definitions.filter((definition) => definition.type === RX_RECORD_GRID.components.viewPreset);
    }
    getBasicRecordGridFiltersFromChildData(definitions) {
        return _map(definitions.filter((definition) => definition.type === RX_RECORD_GRID.components.filter), (basicFilterDescriptor) => ({
            fieldId: basicFilterDescriptor.data.fieldId,
            value: basicFilterDescriptor.data.value,
            guid: basicFilterDescriptor.guid,
            $DISPLAYVALUE$: basicFilterDescriptor.data.$DISPLAYVALUE$
        }));
    }
    getRowActionButtonPayloads(rowActions) {
        return rowActions.map((rowAction) => ({
            type: RxViewComponentType.ActionButton,
            guid: rowAction.guid,
            data: omit(rowAction, 'actions', 'guid'),
            outletName: RX_RECORD_GRID.rowActionsOutletName,
            children: this.getColumnActionComponentPayloads(rowAction.actions)
        }));
    }
    getInspector(model, recordDefinition, recordAssociationDefinitions) {
        const hasRecordDefinition = Boolean(model.recordDefinitionName && recordDefinition);
        const generalControls = [
            {
                name: 'name',
                component: TextFormControlComponent,
                options: {
                    label: 'Name',
                    tooltip: new Tooltip('Enter a name to uniquely identify the Record grid.')
                }
            },
            {
                name: 'mode',
                component: GroupButtonFormControlComponent,
                options: {
                    required: false,
                    label: 'Mode',
                    items: [
                        {
                            value: RecordGridDesignDefinitionMode.Record,
                            name: 'Record'
                        },
                        {
                            value: RecordGridDesignDefinitionMode.Association,
                            name: 'Association'
                        }
                    ]
                }
            },
            {
                name: 'recordDefinitionName',
                component: RxDefinitionPickerComponent,
                options: {
                    label: model.mode === RecordGridDesignDefinitionMode.Association
                        ? 'Record definition to show'
                        : 'Record definition name',
                    definitionType: model.mode === RecordGridDesignDefinitionMode.Association
                        ? RxDefinitionPickerType.RegularDataRecord
                        : RxDefinitionPickerType.Record,
                    required: true,
                    beforeValueChange: (oldValue, newValue) => {
                        if (!isEmpty(model.columns) && Boolean(oldValue)) {
                            return this.rxModalService.confirm({
                                title: 'Warning',
                                modalStyle: RX_MODAL.modalStyles.warning,
                                message: 'Initial column sort, initial filters, and added grid columns will be cleared. Do you want to continue?'
                            });
                        }
                        else {
                            return Promise.resolve(true);
                        }
                    }
                }
            }
        ];
        const presentationControls = [
            {
                name: 'cardLayoutWidth',
                component: SelectFormControlComponent,
                options: {
                    label: 'Card layout width',
                    sortAlphabetically: false,
                    options: RX_RECORD_GRID.cardLayoutWidthOptions,
                    emptyOption: true,
                    tooltip: new Tooltip('The width of the Record grid view component at which it will switch to card layout.')
                }
            },
            {
                name: 'initialSortColumn',
                component: RecordGridSortEditorControlComponent,
                options: {
                    label: 'Initial column sort',
                    gridColumns: sortBy(model.columns, 'title'),
                    recordDefinition
                }
            },
            {
                name: 'enableRowSelection',
                component: OptionalSelectFormControlComponent,
                options: {
                    label: 'Enable row selection',
                    options: [
                        {
                            id: RX_RECORD_GRID.selectionTypes.multiple,
                            name: 'Multiple rows'
                        },
                        {
                            id: RX_RECORD_GRID.selectionTypes.single,
                            name: 'Single row'
                        }
                    ]
                }
            },
            {
                name: 'expandable',
                component: SwitchFormControlComponent,
                hidden: !this.rxFeatureService.isFeatureEnabled('DRD21-44922'),
                options: {
                    label: 'Enable grid width expansion',
                    tooltip: new Tooltip('If enabled, the grid will expand in width to accommodate wider columns. If one or more columns extend beyond the right border of the grid, a horizontal scroll bar will appear.<br>Column width will be converted to pixels if grid width expansion mode is enabled.')
                }
            },
            {
                name: 'bordered',
                component: SwitchFormControlComponent,
                options: {
                    label: 'Show border lines'
                }
            },
            {
                name: 'striped',
                component: SwitchFormControlComponent,
                options: {
                    label: 'Show striped rows'
                }
            },
            {
                name: 'showDataForAllLocales',
                component: SwitchFormControlComponent,
                options: {
                    label: 'Show data for all locales',
                    tooltip: new Tooltip('If enabled, data for all locales will be displayed in the grid at runtime. If disabled, only data for current locale will be displayed.')
                }
            },
            getAvailableOnDevicesInspectorConfig(),
            getStylesFieldInspectorConfig()
        ];
        if (model.mode === RecordGridDesignDefinitionMode.Association) {
            if (hasRecordDefinition) {
                generalControls.push({
                    name: 'associationDefinitionName',
                    component: SelectFormControlComponent,
                    options: {
                        required: true,
                        label: 'Association to use',
                        options: _map(recordAssociationDefinitions, (associationDescriptor) => ({
                            id: associationDescriptor.name,
                            name: this.rxDefinitionNameService.getDisplayName(associationDescriptor.name)
                        })),
                        emptyOption: true
                    }
                });
            }
            const selectedAssociationDefinition = find(recordAssociationDefinitions, (definition) => definition.name === model.associationDefinitionName);
            if (selectedAssociationDefinition &&
                selectedAssociationDefinition.nodeAId === selectedAssociationDefinition.nodeBId) {
                generalControls.push({
                    name: 'associatedRecordNodeSide',
                    component: SelectFormControlComponent,
                    options: {
                        required: true,
                        label: 'Associated record node side',
                        options: [
                            {
                                id: RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.value,
                                name: selectedAssociationDefinition.nodeAName || RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.defaultName
                            },
                            {
                                id: RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value,
                                name: selectedAssociationDefinition.nodeBName || RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.defaultName
                            }
                        ],
                        emptyOption: true
                    }
                });
            }
            generalControls.push({
                name: 'associatedRecordId',
                component: ExpressionInspectorControlComponent,
                options: {
                    label: 'Associated record ID',
                    isRequired: true
                }
            });
            if (selectedAssociationDefinition &&
                selectedAssociationDefinition.cardinality === RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value) {
                generalControls.push({
                    name: 'associatedRoleName',
                    component: ExpressionInspectorControlComponent,
                    options: {
                        label: 'Associated role name'
                    }
                });
            }
        }
        if (hasRecordDefinition) {
            generalControls.push({
                name: 'columns',
                component: RecordGridColumnEditorControlComponent,
                options: {
                    recordDefinition
                }
            });
            generalControls.push({
                name: 'getDataForHiddenColumns',
                component: SwitchFormControlComponent,
                options: {
                    label: 'Get data for hidden columns',
                    tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.get-data-for-hidden-columns.tooltip'))
                }
            });
            generalControls.push({
                widgetName: 'rowActions',
                component: RxRecordGridRowActionEditorWidgetComponent
            });
        }
        const filtersControls = [
            {
                name: 'enableFiltering',
                component: SwitchFormControlComponent,
                options: {
                    label: 'Enable filtering'
                }
            },
            {
                name: 'requiredFilters',
                component: SelectFormControlComponent,
                isDisabled: !model.enableFiltering,
                options: {
                    label: 'Required number of filters',
                    sortAlphabetically: false,
                    options: RX_RECORD_GRID.numberOfFiltersOptions,
                    emptyOption: false,
                    tooltip: new Tooltip('Data will be displayed in the grid only if a) the number of applied filters is greater than or equal to the required number of filters, or b) a search is performed.')
                }
            }
        ];
        if (hasRecordDefinition) {
            filtersControls.push({
                name: 'filterMode',
                component: GroupButtonFormControlComponent,
                options: {
                    label: 'Initial filters',
                    items: [
                        {
                            name: 'Basic',
                            value: RecordGridFilterMode.Basic
                        },
                        {
                            name: 'Expression',
                            value: RecordGridFilterMode.Expression
                        }
                    ],
                    tooltip: new Tooltip('Select the records that should be displayed on the deployed application UI. Application users can add filters in the deployed application.'),
                    beforeValueChange: (oldValue, newValue) => {
                        if ((newValue === RecordGridFilterMode.Expression && model.filters.filtersJson) ||
                            (newValue === RecordGridFilterMode.Basic && model.filterExpression)) {
                            return this.rxModalService.confirm({
                                title: 'Change filter type',
                                modalStyle: RX_MODAL.modalStyles.warning,
                                message: 'Current filter will be cleared. Do you want to continue?'
                            });
                        }
                        else {
                            return Promise.resolve(true);
                        }
                    }
                }
            });
            if (model.filterMode === RecordGridFilterMode.Basic) {
                filtersControls.push({
                    name: 'filters',
                    component: RecordGridFilterSelectControlComponent,
                    options: {
                        primaryRecordDefinition: recordDefinition
                    }
                });
            }
            else {
                filtersControls.push({
                    name: 'filterExpression',
                    component: ExpressionInspectorControlComponent,
                    options: {
                        label: 'Initial filters',
                        isLabelHidden: true
                    }
                });
            }
            filtersControls.push({
                name: 'enableFilterPresets',
                component: SwitchFormControlComponent,
                isDisabled: !model.enableFiltering,
                options: {
                    label: 'Enable filter presets'
                }
            });
            filtersControls.push({
                name: 'filterPresets',
                component: RecordGridFilterPresetEditorControlComponent,
                options: {
                    label: 'Filter presets',
                    tooltip: new Tooltip('Predefine sets of record grid filters users can apply.'),
                    primaryRecordDefinition: recordDefinition,
                    columns: model.columns.filter((column) => column.filterable)
                }
            });
        }
        if (!isEmpty(model.filterPresets)) {
            filtersControls.push({
                name: 'defaultFilterPreset',
                component: SelectFormControlComponent,
                options: {
                    label: 'Default filter preset',
                    tooltip: new Tooltip('Select a filter preset to be applied when a user opens this view for the first time.'),
                    options: _map(model.filterPresets, (filterPreset) => ({ id: filterPreset.guid, name: filterPreset.title })),
                    emptyOption: true
                }
            });
        }
        const inspectorSectionConfigs = [
            {
                label: 'General',
                controls: generalControls
            },
            {
                label: 'Filters',
                controls: filtersControls
            },
            {
                label: 'Presentation',
                controls: presentationControls
            },
            {
                label: 'View presets',
                controls: [
                    {
                        component: RecordGridViewPresetsWidgetComponent,
                        options: {
                            recordDefinition: recordDefinition
                        }
                    }
                ]
            }
        ];
        return { inspectorSectionConfigs };
    }
    getColumnDataDictionaryBranch(recordGridGuid, componentDescriptorName, componentName$, columnComponents$, recordDefinition$, associationDefinitionDisplayName$) {
        const columnDataDictionaryBranch$ = combineLatest([columnComponents$, recordDefinition$]).pipe(switchMap(([columnComponents, recordDefinition]) => recordDefinition
            ? this.getColumnsDataDictionaryBuilder(recordGridGuid, columnComponents, recordDefinition).pipe(map((buildColumnDataDictionary) => ({
                label: this.rxDefinitionNameService.getDisplayName(recordDefinition.name),
                expression: `\${view.components.${recordGridGuid}.api}`,
                children: [
                    {
                        label: 'First selected row',
                        expression: `\${view.components.${recordGridGuid}.firstSelectedRow}`,
                        children: buildColumnDataDictionary('firstSelectedRow')
                    },
                    {
                        label: 'Is user allowed to delete records',
                        expression: `\${view.components.${recordGridGuid}.isUserAllowedToDeleteRecords}`
                    },
                    {
                        label: 'Last action row',
                        expression: `\${view.components.${recordGridGuid}.clickableRow}`,
                        children: buildColumnDataDictionary('clickableRow')
                    },
                    {
                        label: 'Selected rows',
                        expression: `\${view.components.${recordGridGuid}.selectedRows}`,
                        children: buildColumnDataDictionary('fieldValuesByFieldId')
                    },
                    {
                        label: 'Selected row count',
                        expression: `\${view.components.${recordGridGuid}.selectedRowCount}`
                    },
                    {
                        label: 'Total row count',
                        expression: `\${view.components.${recordGridGuid}.totalRowCount}`
                    },
                    {
                        label: 'Query expression',
                        expression: `\${view.components.${recordGridGuid}.queryExpression}`
                    },
                    {
                        label: 'Last refresh time',
                        expression: `\${view.components.${recordGridGuid}.lastRefreshTime}`
                    }
                ]
            })), take(1))
            : of(null)));
        return combineLatest([componentName$, columnDataDictionaryBranch$, associationDefinitionDisplayName$]).pipe(map(([label, dataDictionaryBranch, associationDefinitionDisplayName]) => dataDictionaryBranch
            ? Object.assign(Object.assign({}, dataDictionaryBranch), { label: this.getComponentName(componentDescriptorName, dataDictionaryBranch.label, associationDefinitionDisplayName, label) })
            : null));
    }
    getColumnsDataDictionaryBuilder(recordGridGuid, columnComponents, recordDefinition) {
        return (columnComponents.length
            ? forkJoin(columnComponents.map((component) => this.rxRecordGridUtilsService.getFieldDefinition(component.data.fieldId, recordDefinition).pipe(filter((fieldDefinition) => !!fieldDefinition), map((fieldDefinition) => this.getColumnDataDictionaryBranchBuilder(recordGridGuid, component, fieldDefinition)))))
            : of([])).pipe(map((builders) => (gridPropertyName) => builders.map((buildColumnDataDictionaryBranch) => buildColumnDataDictionaryBranch.call(this, gridPropertyName))));
    }
    getColumnDataDictionaryBranchBuilder(recordGridGuid, columnComponent, fieldDefinition) {
        const selectionList = fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.selection
            ? _map(fieldDefinition.optionNamesById, (optionName, optionValue) => ({
                label: optionName,
                expression: `\${view.components.${recordGridGuid}.recordDefinition.fieldDefinitionsById[${columnComponent.data.fieldId}].optionsById[${optionValue}].id}`
            }))
            : undefined;
        return (propertyName) => {
            var _a;
            return ({
                label: ((_a = columnComponent.data.title) === null || _a === void 0 ? void 0 : _a.trim()) || `[${fieldDefinition.name}]`,
                expression: `\${view.components.${recordGridGuid}.${propertyName}.${columnComponent.data.fieldId}}`,
                autocompleteOptions: selectionList,
                children: fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.selection
                    ? [
                        {
                            label: `${columnComponent.data.title} (Option name)`,
                            expression: `\${view.components.${recordGridGuid}.${propertyName}.selectionFieldOptionNamesById.${columnComponent.data.fieldId}}`
                        },
                        {
                            label: 'Options',
                            children: selectionList
                        }
                    ]
                    : null
            });
        };
    }
    getComponentName(componentDescriptorName, recordDefinitionDisplayName, associationDefinitionDisplayName, name) {
        const additionalLabels = [recordDefinitionDisplayName, associationDefinitionDisplayName, name].filter(Boolean);
        return additionalLabels.length
            ? `${componentDescriptorName} (${additionalLabels.join(': ')})`
            : componentDescriptorName;
    }
    getGridViewPresetPayload(viewPresetGuid, columns) {
        return {
            type: RX_RECORD_GRID.components.viewPreset,
            guid: this.rxGuidService.generate(),
            data: {
                viewPresetGuid,
                filters: null
            },
            children: columns.map((column) => this.getColumnPresetPayload(column))
        };
    }
    getColumnPresetPayload(column) {
        return {
            type: RX_RECORD_GRID.components.columnViewPreset,
            data: {
                fieldId: column.fieldId,
                index: column.index,
                visible: column.visible,
                sortable: isObject(column.sortable) ? column.sortable : null,
                width: column.width
            }
        };
    }
    getPresetsList(guid) {
        return guid
            ? this.viewDesignerFacade.getChildComponents(guid).pipe(map((res) => res.sort((a, b) => a.data.index - b.data.index)), map((res) => res.map((item) => ({ guid: item.guid, name: item.data.label }))), debounceTime(50) // used to let store be `stabilized` when indexes are updating for each preset
            )
            : of([]);
    }
}
RxRecordGridDesignUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridDesignUtilsService, deps: [{ token: i1.RxGuidService }, { token: i2.RxRecordGridConfigUtilsService }, { token: i3.RxDefinitionNameService }, { token: i3.RxFeatureService }, { token: i4.RxModalService }, { token: i5.RxRecordGridUtilsService }, { token: i6.RxRecordGridFilterHelperService }, { token: i7.TranslateService }, { token: i8.ViewDesignerFacade }, { token: i1.RxJsonParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordGridDesignUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridDesignUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridDesignUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGuidService }, { type: i2.RxRecordGridConfigUtilsService }, { type: i3.RxDefinitionNameService }, { type: i3.RxFeatureService }, { type: i4.RxModalService }, { type: i5.RxRecordGridUtilsService }, { type: i6.RxRecordGridFilterHelperService }, { type: i7.TranslateService }, { type: i8.ViewDesignerFacade }, { type: i1.RxJsonParserService }]; } });
//# sourceMappingURL=record-grid-design-utils.service.js.map