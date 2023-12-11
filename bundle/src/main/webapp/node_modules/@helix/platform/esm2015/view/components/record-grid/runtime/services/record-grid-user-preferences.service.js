import { Injectable } from '@angular/core';
import { ResizeMode } from '@bmc-ux/adapt-table';
import { RxUserPreferencesService } from '@helix/platform/shared/api';
import { RxObjectUtilsService } from '@helix/platform/utils';
import { assign, cloneDeep, endsWith, filter, find, flow, has, isEmpty, isEqual, isNull, isString, map as _map, omit, reduce, remove, some, sortBy } from 'lodash';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RX_RECORD_GRID } from '../../record-grid.constant';
import { RxRecordGridConfigUtilsService } from './record-grid-config-utils.service';
import { RxRecordGridFilterService } from './record-grid-filter.service';
import { RxRecordGridAdvancedFilterValue } from '../../common/types/record-grid-advanced-filter-value.class';
import { RxRecordGridFilterHelperService } from '../../common/services/record-grid-filter-helper.service';
import * as i0 from "@angular/core";
import * as i1 from "./record-grid-config-utils.service";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "./record-grid-filter.service";
import * as i4 from "../../common/services/record-grid-filter-helper.service";
import * as i5 from "@helix/platform/utils";
export class RxRecordGridUserPreferencesService {
    constructor(recordGridConfigUtilsService, rxUserPreferencesService, rxRecordGridFilterService, rxRecordGridFilterHelperService, rxObjectUtilsService) {
        this.recordGridConfigUtilsService = recordGridConfigUtilsService;
        this.rxUserPreferencesService = rxUserPreferencesService;
        this.rxRecordGridFilterService = rxRecordGridFilterService;
        this.rxRecordGridFilterHelperService = rxRecordGridFilterHelperService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.initialPreferences = {
            columns: [],
            filterPresets: [],
            filters: null,
            visibleCardFieldIds: [],
            appliedExternalFilterPresetGuid: null,
            viewPresets: {}
        };
        this.preferences = Object.assign({}, this.initialPreferences);
    }
    saveUserPreferences(guid, adaptTableConfig, state) {
        if (adaptTableConfig.cardLayoutColumns) {
            this.preferences.visibleCardFieldIds = this.getVisibleCardFieldIds(adaptTableConfig);
        }
        else {
            this.preferences.columns = this.getColumnsPreferences(adaptTableConfig);
        }
        this.preferences.filterPresets = state.advancedFiltering.savedFilters
            .filter((savedFilter) => !savedFilter.isCreatedByOtherUsers)
            .map((savedFilter) => this.getPreferencesFilterPresets(savedFilter, state.recordDefinition.fieldDefinitionsById, state.advancedFiltering.recordGridFilterConfigs));
        const currentFilters = this.rxRecordGridFilterService.getRecordGridFilterDataFromAdvancedFilter(state.advancedFiltering.selectedFilters, state.recordDefinition.fieldDefinitionsById, state.advancedFiltering.recordGridFilterConfigs);
        this.preferences.filters = currentFilters;
        const appliedSharedFilterPreset = state.advancedFiltering.appliedSharedFilterPreset;
        this.preferences.appliedExternalFilterPresetGuid = appliedSharedFilterPreset && appliedSharedFilterPreset.id;
        if (this.selectedViewPresetGuid) {
            const selectedPreset = this.preferences.viewPresets[this.selectedViewPresetGuid];
            const newPreset = {
                viewPresetGuid: this.selectedViewPresetGuid,
                columns: this.getColumnsPreferences(adaptTableConfig),
                filters: isEmpty(currentFilters) ? null : currentFilters
            };
            if (isEqual(selectedPreset.initial, newPreset)) {
                this.discardViewPresetChanges(this.selectedViewPresetGuid);
            }
            else {
                selectedPreset.edited = newPreset;
            }
        }
        this.save(guid, this.preferences);
    }
    get(guid) {
        this.preferences = Object.assign({}, this.initialPreferences);
        return this.rxUserPreferencesService
            .getUiComponentPreferences(guid)
            .pipe(map((preferences) => assign(this.preferences, preferences)));
    }
    getAppliedSharedFilterPresetGuid() {
        return this.preferences.appliedExternalFilterPresetGuid;
    }
    applyUserPreferencesForColumns(adaptTableConfig, columnsWithMetadata, gridGuid) {
        const isColumnPreferencesUpdated = this.reviseColumnPreferences(this.preferences.columns, adaptTableConfig);
        if (isColumnPreferencesUpdated) {
            this.save(gridGuid, this.preferences);
        }
        let columnSortMeta = this.getColumnSortMeta(this.preferences.columns);
        this.sortColumnsConfigs(adaptTableConfig.columns);
        this.setColumnsWidths(adaptTableConfig.columns, this.preferences.columns, adaptTableConfig.columnResizeMode);
        columnSortMeta = filter(columnSortMeta, (sortMeta) => some(adaptTableConfig.columns, (tableColumn) => tableColumn.field === sortMeta.field));
        if (this.preferences.columns.length) {
            adaptTableConfig.multiSortMeta = columnSortMeta;
        }
        if (adaptTableConfig.cardLayoutColumns) {
            this.setCardFieldsVisibility(adaptTableConfig.columns);
        }
        else {
            this.setColumnsVisibility(adaptTableConfig.columns, columnsWithMetadata);
        }
    }
    reviseColumnPreferences(columnPreferences, { columns }) {
        let isColumnPreferencesChanged = false;
        if (columnPreferences.length) {
            const existingAdaptColumnIds = _map(columns, 'field');
            const removedReferences = remove(columnPreferences, ({ fieldId }) => !existingAdaptColumnIds.includes(fieldId));
            let isSortingPreferencesChanged = removedReferences.some(({ sort }) => Boolean(sort));
            const preferencesSize = columnPreferences.length;
            const sortableColumnPreferences = [];
            columns.forEach((tableColumn, index) => {
                var _a;
                const columnPreference = find(columnPreferences, { fieldId: tableColumn.field });
                if (columnPreference) {
                    // Nullish width can be saved to preferences for column without width customization or without resizing.
                    // Non-empty value appearing means the width is customized after previous preferences saving.
                    (_a = columnPreference.width) !== null && _a !== void 0 ? _a : (columnPreference.width = tableColumn.width);
                    if (tableColumn.sortable) {
                        sortableColumnPreferences.push(columnPreference);
                    }
                    else if (columnPreference.sort) {
                        isSortingPreferencesChanged = true;
                    }
                }
                else {
                    columnPreferences.splice(index, 0, {
                        fieldId: tableColumn.field,
                        index: index,
                        visible: !tableColumn.hidden,
                        width: tableColumn.width
                    });
                }
            });
            if (isSortingPreferencesChanged) {
                const sortMetaForSortableColumns = this.getColumnSortMeta(sortableColumnPreferences);
                this.updateColumnSortPreferences(columnPreferences, sortMetaForSortableColumns);
            }
            isColumnPreferencesChanged =
                !isEmpty(removedReferences) || preferencesSize < columnPreferences.length || isSortingPreferencesChanged;
        }
        return isColumnPreferencesChanged;
    }
    applyUserPreferences(adaptTableConfig, columnsWithMetadata, state, sharedFilterPresets) {
        var _a, _b, _c, _d;
        if (!state.viewPresetSelector) {
            this.applyUserPreferencesForColumns(adaptTableConfig, columnsWithMetadata, state.guid);
        }
        let observable$;
        if (state === null || state === void 0 ? void 0 : state.enableFiltering) {
            let isFilterPresetDataChanged = false;
            // Remove filter presets that do not have any filters left.
            // These filters could have been removed as a result of removing a column,
            // used by the filter, from the grid.
            this.preferences.filterPresets.forEach((filterPreset) => {
                var _a, _b, _c, _d;
                const prevFilterDataLength = (_b = (_a = filterPreset.filterData) === null || _a === void 0 ? void 0 : _a.and) === null || _b === void 0 ? void 0 : _b.length;
                filterPreset.filterData = this.rxRecordGridFilterService.getFilterForAvailableColumns(filterPreset.filterData, columnsWithMetadata.filter((column) => column.filterable));
                if (prevFilterDataLength !== ((_d = (_c = filterPreset.filterData) === null || _c === void 0 ? void 0 : _c.and) === null || _d === void 0 ? void 0 : _d.length)) {
                    isFilterPresetDataChanged = true;
                }
            });
            this.preferences.filterPresets = this.preferences.filterPresets.filter((filterPreset) => !isEmpty(filterPreset.filterData));
            const prevFilters = cloneDeep((_a = this.preferences.filters) === null || _a === void 0 ? void 0 : _a.and);
            this.preferences.filters = this.rxRecordGridFilterService.getFilterForAvailableColumns(this.preferences.filters, columnsWithMetadata.filter((column) => column.filterable));
            if (isFilterPresetDataChanged ||
                ((_c = (_b = this.preferences.filters) === null || _b === void 0 ? void 0 : _b.and) === null || _c === void 0 ? void 0 : _c.length) !== (prevFilters === null || prevFilters === void 0 ? void 0 : prevFilters.length) ||
                !isEqual(prevFilters, (_d = this.preferences.filters) === null || _d === void 0 ? void 0 : _d.and)) {
                this.save(state.guid, this.preferences);
            }
            state.advancedFiltering.savedFilters = this.getAdvancedFilterPresets(this.preferences.filterPresets, false);
            state.predefinedFilterPresets = state.predefinedFilterPresets.filter((filterPreset) => !isNull(filterPreset.filters));
            const predefinedFilterPresets = state.predefinedFilterPresets
                .map((predefinedFilterPreset) => {
                var _a;
                return ({
                    title: predefinedFilterPreset.title,
                    guid: predefinedFilterPreset.guid,
                    filterData: this.rxRecordGridFilterHelperService.getRecordGridFilterDataFromPredefinedFilter(predefinedFilterPreset.filters, this.rxRecordGridFilterService.deserializeNamedOptions((_a = predefinedFilterPreset.recordGridFilters) !== null && _a !== void 0 ? _a : []))
                });
            })
                .filter((preset) => preset.filterData);
            const builtInPresets = this.getAdvancedFilterPresets(predefinedFilterPresets, true);
            state.advancedFiltering.savedFilters.push(...builtInPresets);
            if (sharedFilterPresets) {
                if (this.getAppliedSharedFilterPresetGuid()) {
                    const appliedSharedFilterPreset = find(sharedFilterPresets, { id: this.getAppliedSharedFilterPresetGuid() });
                    state.advancedFiltering.appliedSharedFilterPreset = appliedSharedFilterPreset;
                    state.advancedFiltering.activeSavedFilter = appliedSharedFilterPreset;
                }
                state.advancedFiltering.savedFilters.push(...sharedFilterPresets);
            }
            const defaultBuiltInFilterPreset = isString(state.defaultFilterPreset)
                ? find(builtInPresets, (builtInPreset) => builtInPreset.id === state.defaultFilterPreset)
                : state.defaultFilterPreset;
            const defaultSharedFilterPreset = find(sharedFilterPresets, (sharedFilterPreset) => sharedFilterPreset.isDefault);
            if (!isEmpty(this.preferences.filters)) {
                observable$ = this.rxRecordGridFilterService
                    .getAdvancedFilterData(this.preferences.filters, state.recordDefinition.fieldDefinitionsById, state.advancedFiltering.recordGridFilterConfigs, state.recordDefinition, state.advancedFiltering.filterOptions, state.associationDescriptors)
                    .pipe(tap((selectedAdvancedFilters) => {
                    // Remove named filter options that do not have any filters left.
                    // These filters could have been removed as a result of removing named filter option,
                    // used by the filter, from the grid.
                    const newSelectedAdvancedFilters = this.getFilterForAvailableNamedFilterOptions(selectedAdvancedFilters, state.namedFilterOptions);
                    state.advancedFiltering.selectedFilters = this.getFiltersForSelectedColumns(newSelectedAdvancedFilters, adaptTableConfig.columns.filter((column) => column.filterable));
                    this.preferences.filters = this.rxRecordGridFilterService.getRecordGridFilterDataFromAdvancedFilter(state.advancedFiltering.selectedFilters, state.recordDefinition.fieldDefinitionsById, state.advancedFiltering.recordGridFilterConfigs);
                    if (state.advancedFiltering.appliedSharedFilterPreset) {
                        this.addExternalPresetToSelectedFilters(state);
                    }
                }));
            }
            else if (this.rxObjectUtilsService.isEmptyObject(this.preferences.filters) &&
                !state.advancedFiltering.appliedSharedFilterPreset) {
                if (defaultSharedFilterPreset && !defaultBuiltInFilterPreset) {
                    state.advancedFiltering.appliedSharedFilterPreset = defaultSharedFilterPreset;
                    state.advancedFiltering.activeSavedFilter = defaultSharedFilterPreset;
                }
            }
            else if (isNull(this.preferences.filters) && !state.advancedFiltering.appliedSharedFilterPreset) {
                if (defaultBuiltInFilterPreset) {
                    const defaultBuildInPresetFilterData = isString(state.defaultFilterPreset)
                        ? defaultBuiltInFilterPreset.filterData
                        : defaultBuiltInFilterPreset;
                    observable$ = this.rxRecordGridFilterService
                        .getAdvancedFilterData(defaultBuildInPresetFilterData, state.recordDefinition.fieldDefinitionsById, state.advancedFiltering.recordGridFilterConfigs, state.recordDefinition, state.advancedFiltering.filterOptions, state.associationDescriptors)
                        .pipe(tap((selectedAdvancedFilters) => {
                        state.advancedFiltering.selectedFilters = this.getFiltersForSelectedColumns(selectedAdvancedFilters, adaptTableConfig.columns);
                        if (isString(state.defaultFilterPreset)) {
                            defaultBuiltInFilterPreset.filters =
                                state.advancedFiltering.selectedFilters;
                            state.advancedFiltering.activeSavedFilter =
                                defaultBuiltInFilterPreset;
                        }
                    }));
                }
                else if (defaultSharedFilterPreset) {
                    state.advancedFiltering.appliedSharedFilterPreset = defaultSharedFilterPreset;
                    state.advancedFiltering.activeSavedFilter = defaultSharedFilterPreset;
                }
            }
            if (state.advancedFiltering.appliedSharedFilterPreset) {
                this.addExternalPresetToSelectedFilters(state);
            }
        }
        return observable$ || of(null);
    }
    applySharedViewPreset(gridState, adaptTableConfig, viewPresetGuid, viewPresetData) {
        if (!this.preferences.viewPresets[viewPresetGuid]) {
            this.preferences.viewPresets[viewPresetGuid] = {
                initial: Object.assign(Object.assign({}, viewPresetData), { viewPresetGuid })
            };
        }
        else {
            // updating initial and keeping user changes
            this.preferences.viewPresets[viewPresetGuid].initial = Object.assign(Object.assign({}, viewPresetData), { viewPresetGuid });
        }
        return this.applyViewPresetInner(viewPresetGuid, adaptTableConfig, gridState);
    }
    applyViewPreset(gridState, adaptTableConfig, viewPresetGuid) {
        const systemViewPreset = gridState.viewPresets.find((preset) => preset.viewPresetGuid === viewPresetGuid);
        if (systemViewPreset && !has(this.preferences.viewPresets, [viewPresetGuid, 'edited'])) {
            // create/update the initial system view preset preferences
            const newViewPresetPreferences = this.createSystemViewPresetPreferences(systemViewPreset, gridState.columnsWithMetadata);
            this.preferences.viewPresets[viewPresetGuid] = { initial: newViewPresetPreferences };
        }
        else if (!this.preferences.viewPresets[viewPresetGuid] && this.selectedViewPresetGuid) {
            // save existing view preset preferences as new custom view preset preferences
            const selectedViewPreset = this.preferences.viewPresets[this.selectedViewPresetGuid];
            this.preferences.viewPresets[viewPresetGuid] = {
                initial: Object.assign(Object.assign({}, cloneDeep(selectedViewPreset.edited || selectedViewPreset.initial)), { viewPresetGuid })
            };
        }
        return this.applyViewPresetInner(viewPresetGuid, adaptTableConfig, gridState);
    }
    applyViewPresetInner(viewPresetGuid, adaptTableConfig, gridState) {
        const viewPresetPreferences = this.preferences.viewPresets[viewPresetGuid];
        const presetToApply = (viewPresetPreferences === null || viewPresetPreferences === void 0 ? void 0 : viewPresetPreferences.edited) || (viewPresetPreferences === null || viewPresetPreferences === void 0 ? void 0 : viewPresetPreferences.initial);
        let observable$ = of(null);
        if (presetToApply) {
            this.selectedViewPresetGuid = presetToApply.viewPresetGuid;
            this.updateColumnsOrder(adaptTableConfig.columns, presetToApply.columns);
            this.updateColumnsVisibility(adaptTableConfig.columns, presetToApply.columns);
            this.setColumnsWidths(adaptTableConfig.columns, presetToApply.columns, adaptTableConfig.columnResizeMode);
            this.updateGridSorting(presetToApply, adaptTableConfig);
            observable$ = this.rxRecordGridFilterService
                .getAdvancedFilterData(presetToApply.filters, gridState.recordDefinition.fieldDefinitionsById, gridState.advancedFiltering.recordGridFilterConfigs, gridState.recordDefinition, gridState.advancedFiltering.filterOptions, gridState.associationDescriptors)
                .pipe(tap((selectedAdvancedFilters) => {
                const newSelectedAdvancedFilters = this.getFilterForAvailableNamedFilterOptions(selectedAdvancedFilters, gridState.namedFilterOptions);
                gridState.advancedFiltering.selectedFilters = this.getFiltersForSelectedColumns(newSelectedAdvancedFilters, adaptTableConfig.columns.filter((column) => column.filterable));
            }));
        }
        return observable$;
    }
    isCurrentViewPresetEdited() {
        var _a;
        return Boolean((_a = this.preferences.viewPresets[this.selectedViewPresetGuid]) === null || _a === void 0 ? void 0 : _a.edited);
    }
    addExternalPresetToSelectedFilters(state) {
        const selectedFilter = cloneDeep(state.advancedFiltering.selectedFilters);
        selectedFilter.push({
            filterOptionId: RX_RECORD_GRID.externalPresetFilterOptionId,
            value: state.advancedFiltering.appliedSharedFilterPreset.id
        });
        state.advancedFiltering.selectedFilters = selectedFilter;
    }
    createSystemViewPresetPreferences(sharedViewPreset, columnsWithMetadata) {
        const recordGridFilterData = this.rxRecordGridFilterHelperService.getRecordGridFilterDataFromPredefinedFilter(sharedViewPreset.filters, sharedViewPreset.recordGridFilters
            ? this.rxRecordGridFilterService.deserializeNamedOptions(sharedViewPreset.recordGridFilters)
            : []);
        const columns = sharedViewPreset.columnViewPresets
            .sort((a, b) => a.index - b.index)
            .map((columnViewPreset, index) => {
            var _a, _b;
            const width = has(columnViewPreset, 'width')
                ? columnViewPreset.width
                : (_b = (_a = find(columnsWithMetadata, { fieldId: columnViewPreset.fieldId })) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : null;
            const result = Object.assign(Object.assign({}, omit(columnViewPreset, 'sortable')), { index,
                width });
            if (columnViewPreset.sortable) {
                result.sort = {
                    priority: 0,
                    direction: columnViewPreset.sortable.direction
                };
            }
            return result;
        });
        return cloneDeep({
            columns,
            filters: recordGridFilterData,
            viewPresetGuid: sharedViewPreset.viewPresetGuid
        });
    }
    deleteViewPreset(viewPresetGuid) {
        delete this.preferences.viewPresets[viewPresetGuid];
    }
    isExistingViewPreset(viewPresetGuid) {
        return has(this.preferences.viewPresets, viewPresetGuid);
    }
    discardViewPresetChanges(viewPresetGuid) {
        var _a;
        (_a = this.preferences.viewPresets[viewPresetGuid]) === null || _a === void 0 ? true : delete _a.edited;
    }
    updateGridSorting(presetPreferences, adaptTableConfig) {
        let columnSortMeta = this.getColumnSortMeta(presetPreferences.columns);
        columnSortMeta = filter(columnSortMeta, (sortMeta) => some(adaptTableConfig.columns, (tableColumn) => tableColumn.sortable && tableColumn.field === sortMeta.field));
        adaptTableConfig.multiSortMeta = columnSortMeta;
    }
    getAdvancedFilterPresets(filterPresets, isCreatedByOtherUsers) {
        return filterPresets
            .map((filterPreset) => {
            const advancedFilterPreset = {
                id: filterPreset.guid,
                name: filterPreset.title,
                filters: null,
                filterData: filterPreset.filterData,
                isCreatedByOtherUsers
            };
            if (filterPreset.appliedSharedFilterPresetGuid) {
                advancedFilterPreset.appliedSharedFilterPresetGuid = filterPreset.appliedSharedFilterPresetGuid;
                advancedFilterPreset.filters = [
                    {
                        filterOptionId: RX_RECORD_GRID.externalPresetFilterOptionId,
                        value: filterPreset.appliedSharedFilterPresetGuid
                    }
                ];
            }
            return advancedFilterPreset;
        })
            .sort((savedFilter1, savedFilter2) => savedFilter1.name.localeCompare(savedFilter2.name));
    }
    getColumnsPreferences({ columns, multiSortMeta }) {
        const columnPreferences = columns.map(({ field, hidden, width }, index) => {
            const column = {
                fieldId: field,
                index,
                visible: !hidden,
                width
            };
            return column;
        });
        this.updateColumnSortPreferences(columnPreferences, multiSortMeta);
        return columnPreferences;
    }
    getPreferencesFilterPresets(savedFilter, fieldDefinitionsById, recordGridFilterConfigs) {
        const filterPreset = {
            guid: savedFilter.id,
            title: savedFilter.name,
            filterData: savedFilter.filters
                ? this.rxRecordGridFilterService.getRecordGridFilterDataFromAdvancedFilter(savedFilter.filters, fieldDefinitionsById, recordGridFilterConfigs)
                : savedFilter.filterData
        };
        if (savedFilter.appliedSharedFilterPresetGuid) {
            filterPreset.appliedSharedFilterPresetGuid = savedFilter.appliedSharedFilterPresetGuid;
        }
        return filterPreset;
    }
    getVisibleCardFieldIds({ columns, multiSortMeta }) {
        this.updateColumnSortPreferences(this.preferences.columns, multiSortMeta);
        return columns.filter((column) => !column.hidden).map((column) => parseInt(column.field, 10) || column.field);
    }
    updateColumnSortPreferences(columns, sortMeta) {
        if (sortMeta) {
            columns.forEach((column) => {
                delete column.sort;
            });
            sortMeta.forEach(({ field, order }, index) => {
                const sortedColumn = columns.find((column) => column.fieldId === field);
                if (sortedColumn) {
                    sortedColumn.sort = {
                        priority: index,
                        direction: this.recordGridConfigUtilsService.getColumnSortDirection(order)
                    };
                }
            });
        }
    }
    save(guid, preferences) {
        if (guid) {
            const data = {
                preferences: JSON.stringify(preferences),
                componentTypeName: RX_RECORD_GRID.type,
                version: RX_RECORD_GRID.version,
                componentId: guid
            };
            this.rxUserPreferencesService.setUiComponentPreferences(data, guid).subscribe();
        }
    }
    sortColumnsConfigs(gridColumns) {
        this.updateColumnsOrder(gridColumns, this.preferences.columns);
    }
    updateColumnsOrder(gridColumns, columnsPreferences) {
        const columnIndexesMap = reduce(gridColumns, (result, column, columnIndex) => {
            const columnSavedPreferences = find(columnsPreferences, (columnPreferences) => columnPreferences.fieldId === column.field);
            if (columnSavedPreferences) {
                result[column.field] = columnSavedPreferences.index;
            }
            else {
                result[column.field] = columnIndex;
            }
            return result;
        }, {});
        gridColumns.sort((column1, column2) => columnIndexesMap[column1.field] - columnIndexesMap[column2.field]);
    }
    setColumnsVisibility(gridColumns, columnsWithMetadata) {
        const columnsPreferences = this.preferences.columns;
        if (isEmpty(columnsPreferences)) {
            gridColumns.forEach((gridColumn) => {
                const columnWithMetadata = find(columnsWithMetadata, (column) => column.fieldId === gridColumn.field);
                gridColumn.hidden = columnWithMetadata ? !columnWithMetadata.visible : false;
            });
        }
        else {
            this.updateColumnsVisibility(gridColumns, columnsPreferences);
        }
    }
    updateColumnsVisibility(gridColumns, columnsPreferences) {
        gridColumns.forEach((column) => {
            const preferences = find(columnsPreferences, (columnPreferences) => columnPreferences.fieldId === column.field);
            if (preferences) {
                column.hidden = !preferences.visible;
            }
        });
    }
    setColumnsWidths(gridColumns, columnsPreferences, columnResizeMode) {
        if (columnsPreferences.length) {
            gridColumns.forEach((column) => {
                const preferences = find(columnsPreferences, { fieldId: column.field });
                // Default measure unit of native html table is px, but outdated user preferences use %.
                // Only px units are supported in Expand mode.
                if (preferences) {
                    const isColumnWidthInPixels = endsWith(preferences.width, 'px');
                    if (columnResizeMode === ResizeMode.Expand && !isColumnWidthInPixels) {
                        column.width = null;
                        column.minWidth = null;
                    }
                    else {
                        column.width = /[0-9]+$/.test(preferences.width) ? `${preferences.width}%` : preferences.width;
                        if (isColumnWidthInPixels && parseInt(column.width) < 45) {
                            column.minWidth = column.width;
                        }
                    }
                }
            });
        }
    }
    setCardFieldsVisibility(gridColumns) {
        const visibleCardFieldIds = this.preferences.visibleCardFieldIds;
        if (isEmpty(visibleCardFieldIds)) {
            const defaultVisibleColumnsCount = 5;
            let visibleColumnsCount = 0;
            gridColumns.forEach((column) => {
                if (visibleColumnsCount >= defaultVisibleColumnsCount) {
                    column.hidden = true;
                    return;
                }
                if (!column.hidden) {
                    visibleColumnsCount++;
                }
            });
        }
        else {
            gridColumns.forEach((column) => (column.hidden = !some(visibleCardFieldIds, (field) => String(field) === column.field)));
        }
    }
    getColumnSortMeta(columnPreferences) {
        return flow((columns) => filter(columns, 'sort'), (columns) => sortBy(columns, 'sort.priority'), (columns) => _map(columns, (column) => ({
            field: column.fieldId,
            order: this.recordGridConfigUtilsService.getColumnSortOrder(column.sort.direction)
        })))(columnPreferences);
    }
    getFiltersForSelectedColumns(advancedFilters, gridColumns) {
        return advancedFilters.filter((advancedFilter) => some(gridColumns, { field: advancedFilter.filterOptionId }));
    }
    getFilterForAvailableNamedFilterOptions(advancedFilters, availableNamedFilters) {
        return advancedFilters
            .map((advancedFilter) => {
            advancedFilter.value.namedOptions = !isEmpty(availableNamedFilters)
                ? advancedFilter.value.namedOptions.filter((namedFilterOptionGuid) => some(availableNamedFilters[Number(advancedFilter.filterOptionId)], { guid: namedFilterOptionGuid }))
                : [];
            return advancedFilter;
        })
            .filter((advancedFilter) => !RxRecordGridAdvancedFilterValue.isEmptyWithRange(advancedFilter.value));
    }
    saveViewPreset(viewPresetGuid) {
        const preset = this.preferences.viewPresets[viewPresetGuid];
        if (preset === null || preset === void 0 ? void 0 : preset.edited) {
            preset.initial = cloneDeep(preset.edited);
            delete preset.edited;
        }
    }
    getSharedViewPresetData() {
        const selectedViewPreset = this.preferences.viewPresets[this.selectedViewPresetGuid];
        const presetData = selectedViewPreset.edited || selectedViewPreset.initial;
        return {
            columns: presetData.columns,
            filters: presetData.filters
        };
    }
}
RxRecordGridUserPreferencesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridUserPreferencesService, deps: [{ token: i1.RxRecordGridConfigUtilsService }, { token: i2.RxUserPreferencesService }, { token: i3.RxRecordGridFilterService }, { token: i4.RxRecordGridFilterHelperService }, { token: i5.RxObjectUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordGridUserPreferencesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridUserPreferencesService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridUserPreferencesService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxRecordGridConfigUtilsService }, { type: i2.RxUserPreferencesService }, { type: i3.RxRecordGridFilterService }, { type: i4.RxRecordGridFilterHelperService }, { type: i5.RxObjectUtilsService }]; } });
//# sourceMappingURL=record-grid-user-preferences.service.js.map