import { DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, NgZone, Optional, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { AdaptAdvancedFilterComponent, AdaptDeviceDetectionService, AdaptModalService, AdvancedFilterOptionDataType, getValueOrFunc } from '@bmc-ux/adapt-angular';
import { AdaptTableComponent, AdaptTableEventSource, AdaptTableHeaderSelectionMode, ExportType, ResizeMode, SortOrder, ToolbarItemsByPriority } from '@bmc-ux/adapt-table';
import { RxAssociationInstanceDataPageService } from '@helix/platform/association/api';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService, RxRecordDefinitionCacheService, RxRecordDefinitionService, RxRecordInstanceDataPageService, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxBooleanPipe, RxCurrentUserService, RxGlobalEventsService, RxLogService, RxNotificationService } from '@helix/platform/shared/api';
import { RxGuidService, RxObjectUtilsService, RxStringService } from '@helix/platform/utils';
import { ApplyGridFilterMode, RowDataItemIdFieldName, RX_EXPRESSION_EVALUATOR, RX_LAUNCH_BEHAVIOR, RX_VIEW_ACTION, RX_VIEW_DEFINITION, RxExpressionEvaluatorService, RxViewActionService, RxViewActionUtilsService } from '@helix/platform/view/api';
import { BaseViewComponent, RuntimeViewCanvasItemComponent, VIEW_COMPONENT_DEFAULT_EVENT_NAME } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { saveAs } from 'file-saver';
import { castArray, chain, cloneDeep, differenceBy, endsWith, find, findIndex, findLast, forEach, get, includes, intersectionBy, isEmpty, isEqual, isFunction, isNil, isNull, isNumber, isObject, isString, isUndefined, last, map as _map, max, min, noop, reduce, remove, round, set, some, sortBy, toString as _toString, transform, uniq } from 'lodash';
import moment from 'moment-es6';
import { BehaviorSubject, combineLatest, EMPTY, forkJoin, merge, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, shareReplay, skip, switchMap, switchMapTo, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ActionButtonComponent } from '../../action-button/runtime/action-button.component';
import { PageComponent } from '../../page/runtime/page.component';
import { RxAdvancedFilteringFieldsProviderComponent } from '../common/components/advanced-filtering-fields-provider/advanced-filtering-fields-provider.component';
import { RxRecordGridAdvancedFilteringService } from '../common/services/record-grid-advanced-filtering.service';
import { RxRecordGridFilterHelperService } from '../common/services/record-grid-filter-helper.service';
import { RxRecordGridUtilsService } from '../common/services/record-grid-utils.service';
import { RxRecordGridAdvancedFilterValue } from '../common/types/record-grid-advanced-filter-value.class';
import { RX_RECORD_GRID } from '../record-grid.constant';
import { RxFilterByCardSelectionDialogComponent } from './filter-by-card-selection-dialog/filter-by-card-selection-dialog.component';
import { RxRecordGridConfigUtilsService } from './services/record-grid-config-utils.service';
import { RxRecordGridConfiguratorService } from './services/record-grid-configurator.service';
import { RxRecordGridFilterConfigService } from './services/record-grid-filter-config.service';
import { RxRecordGridFilterService } from './services/record-grid-filter.service';
import { RxRecordGridSharedFilterPresetsCacheService } from './services/record-grid-shared-filter-presets-cache.service';
import { RxRecordGridUserPreferencesService } from './services/record-grid-user-preferences.service';
import { RowSelectionMode } from './types/row-selection-mode.enum';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@helix/platform/association/api";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@helix/platform/view/api";
import * as i6 from "@helix/platform/record/api";
import * as i7 from "./services/record-grid-configurator.service";
import * as i8 from "@helix/platform/utils";
import * as i9 from "../common/services/record-grid-advanced-filtering.service";
import * as i10 from "./services/record-grid-config-utils.service";
import * as i11 from "./services/record-grid-filter-config.service";
import * as i12 from "./services/record-grid-filter.service";
import * as i13 from "../common/services/record-grid-filter-helper.service";
import * as i14 from "./services/record-grid-shared-filter-presets-cache.service";
import * as i15 from "./services/record-grid-user-preferences.service";
import * as i16 from "../common/services/record-grid-utils.service";
import * as i17 from "@ngx-translate/core";
import * as i18 from "../../page/runtime/page.component";
import * as i19 from "@helix/platform/view/runtime";
import * as i20 from "@bmc-ux/adapt-table";
import * as i21 from "../../action-button/runtime/action-button.component";
import * as i22 from "../common/components/filter-tags/filter-tags.component";
import * as i23 from "./card-layout-cell-header/card-layout-cell-header.component";
import * as i24 from "../common/components/advanced-filtering-fields-provider/advanced-filtering-fields-provider.component";
import * as i25 from "./record-grid-card-layout/record-grid-card-layout.directive";
import * as i26 from "@angular/forms";
import * as i27 from "./cell-display-properties/cell-display-properties.directive";
import * as i28 from "@angular/router";
export class RecordGridComponent extends BaseViewComponent {
    constructor(adaptDeviceDetectionService, adaptModalService, changeDetector, datePipe, decimalPipe, ngZone, rxAssociationInstanceDataPageService, rxBooleanPipe, rxCurrentUserService, rxExpressionEvaluatorService, rxFieldDefinitionService, rxGridConfiguratorService, rxGuidService, rxLogService, rxNotificationService, rxObjectUtilsService, rxRecordDefinitionCacheService, rxRecordDefinitionService, rxRecordGridAdvancedFilteringService, rxRecordGridConfigUtilsService, rxRecordGridFilterConfigService, rxRecordGridFilterService, rxRecordGridFilterHelperService, rxRecordGridSharedFilterPresetsCacheService, rxRecordGridUserPreferencesService, rxRecordGridUtilsService, rxRecordInstanceDataPageService, rxRecordInstanceService, rxViewActionService, rxViewActionUtilsService, translateService, elementRef, rxStringService, rxGlobalEventsService, pageComponent, runtimeViewCanvasItemComponent) {
        super();
        this.adaptDeviceDetectionService = adaptDeviceDetectionService;
        this.adaptModalService = adaptModalService;
        this.changeDetector = changeDetector;
        this.datePipe = datePipe;
        this.decimalPipe = decimalPipe;
        this.ngZone = ngZone;
        this.rxAssociationInstanceDataPageService = rxAssociationInstanceDataPageService;
        this.rxBooleanPipe = rxBooleanPipe;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxExpressionEvaluatorService = rxExpressionEvaluatorService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxGridConfiguratorService = rxGridConfiguratorService;
        this.rxGuidService = rxGuidService;
        this.rxLogService = rxLogService;
        this.rxNotificationService = rxNotificationService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxRecordGridAdvancedFilteringService = rxRecordGridAdvancedFilteringService;
        this.rxRecordGridConfigUtilsService = rxRecordGridConfigUtilsService;
        this.rxRecordGridFilterConfigService = rxRecordGridFilterConfigService;
        this.rxRecordGridFilterService = rxRecordGridFilterService;
        this.rxRecordGridFilterHelperService = rxRecordGridFilterHelperService;
        this.rxRecordGridSharedFilterPresetsCacheService = rxRecordGridSharedFilterPresetsCacheService;
        this.rxRecordGridUserPreferencesService = rxRecordGridUserPreferencesService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxViewActionService = rxViewActionService;
        this.rxViewActionUtilsService = rxViewActionUtilsService;
        this.translateService = translateService;
        this.elementRef = elementRef;
        this.rxStringService = rxStringService;
        this.rxGlobalEventsService = rxGlobalEventsService;
        this.pageComponent = pageComponent;
        this.runtimeViewCanvasItemComponent = runtimeViewCanvasItemComponent;
        this.dataLoaded = new EventEmitter();
        this.isExportInProgress = false;
        this.lastPropertySelection = [];
        this.adaptTableConfig = {
            data: [],
            columns: [],
            columnResizeMode: ResizeMode.Fit,
            cardLayoutColumns: null,
            bordered: true,
            scrollable: true,
            striped: false,
            toolbarConfig: {
                counter: false,
                quickFilter: true,
                leftCustomSection: true,
                leftCustomSectionTemplate: null,
                filter: true,
                filterTemplate: null,
                filterResults: false,
                filterResultsTemplate: null,
                rightCustomSection: false,
                rightCustomSectionTemplate: null,
                visibleColumnsMenu: true,
                visibleColumnsMenuTemplate: null,
                quickFilterTriggerable: true,
                export: {
                    exportTypes: [{ type: ExportType.CSV }],
                    showExportForSelected: true
                }
            },
            filterable: false,
            selectedItems: [],
            filters: {},
            rows: 50,
            first: 0,
            multiSortMeta: null,
            rowSelectionMode: null,
            isLoadingData: false,
            totalRecords: null,
            primaryKey: null,
            isLoadingMoreData: false,
            texts: null,
            expandedGroupsKeys: {},
            virtualScroll: true,
            virtualRowHeight: RX_RECORD_GRID.defaultRowHeight
        };
        this.actionButtons = null;
        this.adaptTableHeaderSelectionMode = AdaptTableHeaderSelectionMode.Chunk;
        this.api = {
            applyViewPreset: this.applyViewPreset.bind(this),
            shareViewPreset: this.shareViewPreset.bind(this),
            refresh: this.refresh.bind(this),
            setFilter: this.setFilter.bind(this),
            deleteViewPreset: this.deleteViewPreset.bind(this),
            discardViewPresetChanges: this.discardViewPresetChanges.bind(this),
            getColumns: this.getColumns.bind(this),
            getRecordDefinitionName: this.getRecordDefinitionName.bind(this),
            getSelectedRows: this.getSelectedRows.bind(this),
            getFirstSelectedRow: this.getFirstSelectedRow.bind(this),
            getSelectedRowCount: this.getSelectedRowCount.bind(this),
            setSelectedRows: this.onRowsSelectionChange.bind(this),
            getVisibleRows: this.getVisibleRows.bind(this),
            saveViewPreset: this.saveViewPreset.bind(this),
            applyFilters: this.applyFilters.bind(this)
        };
        this.filteredVisibleColumns = [];
        this.getDataCellClassBind = this.getDataCellClass.bind(this);
        this.gridEvents = {
            cellClick: (gridRow, columnId) => {
                const columnWithActions = this.state.columnsWithMetadata.find((column) => column.fieldId === columnId);
                this.addSelectionFieldOptionNames(gridRow);
                gridRow = this.expandRowProperties(gridRow);
                this.state.lastActionRow = gridRow;
                this.notifyPropertyChanged('clickableRow', gridRow, null);
                this.executeViewActions(columnWithActions.guid, get(columnWithActions, 'actions'), gridRow).catch(noop);
            },
            cellKeyDown: (event, gridRow, columnId) => {
                if (includes(['Space', 'Enter'], event.code)) {
                    this.gridEvents.cellClick(gridRow, columnId);
                    event.preventDefault();
                }
            }
        };
        this.isFilterBySelectionButtonVisible = false;
        this.isUserAllowedToDeleteRecords = false;
        this.openSortByDialog = this.openSortByDialogFn.bind(this);
        this.rowActionButtons = null;
        this.rowSelectionChanged = new BehaviorSubject([]);
        this.selectedFilteredRowsCount = 0;
        this.shouldDisplayActionButtons = false;
        this.showCellTooltip = false;
        this.sortedColumnsByTitle = [];
        this.state = {
            actionButtons: [],
            rowActionButtons: [],
            lastActionRow: null,
            associatedRecordId: null,
            associatedRoleName: null,
            associatedRecordNodeSide: null,
            associationDefinitionName: null,
            bordered: true,
            cardLayoutWidth: null,
            columns: [],
            columnsWithMetadata: [],
            defaultFilterPreset: null,
            enableFiltering: false,
            requiredFilters: 0,
            getDataForHiddenColumns: true,
            enableFilterPresets: true,
            enableRowSelection: RowSelectionMode.Multiple,
            expandable: false,
            filterExpression: null,
            filters: null,
            filterTagsLimit: null,
            getData: null,
            recordDefinition: null,
            associationDescriptors: [],
            recordDefinitionName: null,
            recordGridFilters: [],
            recordIdField: null,
            showDataForAllLocales: null,
            striped: false,
            styles: null,
            initialFilters: null,
            expandGroups: false,
            advancedFiltering: {
                activeSavedFilter: null,
                savedFilters: [],
                filterOptions: [],
                selectedFilters: [],
                recordGridFilterConfigs: null,
                filterTexts: null,
                hasLoadedSharedFilterPresets: false,
                isLoading: false,
                appliedSharedFilterPreset: null,
                toolbarTags: [],
                pendingSelectedFilters: [],
                selectedCardValues: {}
            },
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.client.empty-state.no-items-to-display.label'),
            emptyStateWithFilterLabelText: this.translateService.instant('com.bmc.arsys.rx.client.empty-state.no-items-to-display.label'),
            searchFieldPlaceholderText: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label'),
            enableColumnSelection: true,
            namedFilterOptions: null,
            predefinedFilterPresets: [],
            viewPresetSelector: null,
            virtualScroll: true
        };
        this.visibleColumns = [];
        this.cellValueFormatters = {};
        this.clickableWithHrefColumnActions = {};
        this.dataLoadContextSubject = new Subject();
        this.popovers = [];
        this.userPreferencesChanged$ = new Subject();
        this.exportSelectedRowText = this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.export-selected-row.label');
        this.exportSelectedRowsText = this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.export-selected-rows.label');
        this.pendingFiltersToApply = null;
        this.getNamedFilterOptions = this.getNamedFilterOptions.bind(this);
        this.rxRecordDefinitionCacheService.registerConsumer(this.destroyed$);
    }
    // Check if user clicked on a cell, filter popover,
    // filter by selection dialog, or filter by selection dropdown.
    // If not, then clear the selected cell.
    onClickOutside(event) {
        const isClickOutside = !(event.target.closest('.ui-table-tbody') ||
            event.target.closest('.popover.table-filtering') ||
            event.target.closest('.rx-filter-by-card-selection-dialog') ||
            event.target.closest('.rx-filter-by-card-selection-field-dropdown'));
        if (isClickOutside) {
            this.clearSelectedCells();
        }
    }
    get isTotalRecordCountKnown() {
        return !isNull(this.adaptTableConfig.totalRecords);
    }
    ngOnInit() {
        super.ngOnInit();
        this.isProgrammaticUse = Boolean(this.pageComponent) || !this.runtimeViewCanvasItemComponent;
        if (this.isProgrammaticUse) {
            this.adaptTableConfig.toolbarConfig.export = null;
        }
        this.notifyPropertyChanged('api', this.api);
        this.initializationCompleted$ = this.config.pipe(take(1), map((rxGridConfiguration) => this.rxGridConfiguratorService.getGridConfig(rxGridConfiguration)), tap((gridConfig) => {
            Object.assign(this.state, gridConfig);
        }), switchMap(() => {
            if (this.state.guid) {
                this.guid = this.state.guid;
            }
            const requests$ = [this.initRecordDefinitions()];
            if (this.guid) {
                this.userPreferencesChanged$.pipe(debounceTime(1000), takeUntil(this.destroyed$)).subscribe(() => {
                    this.rxRecordGridUserPreferencesService.saveUserPreferences(this.guid, this.adaptTableConfig, this.state);
                    this.checkIfViewPresetEdited();
                });
                requests$.push(this.rxRecordGridUserPreferencesService.get(this.guid));
            }
            return forkJoin(requests$);
        }), switchMap(() => this.initGrid()), shareReplay(1));
        this.initializationCompleted$.subscribe();
        const configChanged$ = combineLatest([
            this.initializationCompleted$,
            this.dataLoaded,
            this.config.pipe(skip(1), debounceTime(250), map((rxGridConfiguration) => this.rxGridConfiguratorService.getGridConfig(rxGridConfiguration)), takeUntil(this.destroyed$))
        ]).pipe(map(([initializationCompleted, dataLoaded, configChanged]) => configChanged));
        // updates named list column filter options after additional query expression evaluation
        configChanged$
            .pipe(map((config) => differenceBy(config.columns, this.state.columns, 'additionalQueryCriteria')), filter((changedColumns) => changedColumns.length > 0), takeUntil(this.destroyed$))
            .subscribe((namedListColumns) => {
            namedListColumns.forEach((column) => {
                const namedListColumnFilterOption = this.state.advancedFiltering.filterOptions.find((filterOption) => filterOption.id === column.fieldId);
                namedListColumnFilterOption.data.additionalQueryCriteria = column.additionalQueryCriteria;
                const existingColumnIndex = this.state.columns.findIndex((existingColumn) => existingColumn.fieldId === column.fieldId);
                this.state.columns[existingColumnIndex].additionalQueryCriteria = column.additionalQueryCriteria;
            });
        });
        const namedFilterOptionCache = new Map();
        // updates namedFilterOptions after expression evaluation and triggers data load if expression value is changed
        configChanged$
            .pipe(
        // cut additional configChanged$ emissions that can happen in a moment after first dataLoadContextSubject emission
        debounceTime(10), map((config) => this.getNamedFilterOptionsState(config.columns)), withLatestFrom(this.dataLoadContextSubject), filter(([namedFilterOptionsMap, dataLoadContext]) => !isEqual(namedFilterOptionsMap, dataLoadContext.namedFilterOptions)), tap(([namedFilterOptionsMap]) => {
            this.state.namedFilterOptions = namedFilterOptionsMap;
        }), map(([namedFilterOptionsMap]) => Object.values(namedFilterOptionsMap).reduce((res, options) => res.concat(options), [])), map((namedFilterOptionsList) => {
            const selectedNamedFilterOptionsGuids = this.state.advancedFiltering.selectedFilters.reduce((res, filterValue) => res.concat(filterValue.value.namedOptions), []);
            return namedFilterOptionsList.some((option) => {
                const isOptionCached = Boolean(namedFilterOptionCache.get(option.guid));
                if (!isOptionCached) {
                    namedFilterOptionCache.set(option.guid, option);
                }
                const isFilterValueChanged = option.filterExpression !== namedFilterOptionCache.get(option.guid).filterExpression;
                const shouldLoadData = selectedNamedFilterOptionsGuids.includes(option.guid) && (isFilterValueChanged || !isOptionCached);
                if (isFilterValueChanged) {
                    namedFilterOptionCache.set(option.guid, option);
                }
                return shouldLoadData;
            });
        }), filter((v) => v), takeUntil(this.destroyed$))
            .subscribe(() => {
            this.loadRowData();
        });
        configChanged$
            .pipe(
        // cut additional configChanged$ emissions that can happen in a moment after first dataLoadContextSubject emission
        debounceTime(10), withLatestFrom(this.dataLoadContextSubject), filter(([config, dataLoadContext]) => config.associatedRecordId !== dataLoadContext.associatedRecordId ||
            config.associatedRoleName !== dataLoadContext.associatedRoleName ||
            config.filterExpression !== dataLoadContext.filterExpression), tap(([config]) => {
            Object.assign(this.state, config);
        }))
            .subscribe(() => {
            this.loadRowData();
        });
        this.config
            .pipe(map((cfg) => cfg.viewPresetSelector), distinctUntilChanged(), takeUntil(this.destroyed$))
            .subscribe((viewPresetSelector) => {
            this.state.viewPresetSelector = viewPresetSelector;
        });
        if (this.isProgrammaticUse) {
            configChanged$
                .pipe(map((config) => ({
                actionButtons: config.actionButtons,
                rowActionButtons: config.rowActionButtons
            })), distinctUntilChanged(isEqual))
                .subscribe(({ actionButtons, rowActionButtons }) => {
                this.state.actionButtons = actionButtons;
                this.actionButtons = this.getProgrammaticActionButtons(this.state.actionButtons);
                this.state.rowActionButtons = rowActionButtons;
                this.rowActionButtons = this.getProgrammaticActionButtons(this.state.rowActionButtons);
            });
            configChanged$
                .pipe(distinctUntilChanged(isEqual), map((rxGridConfiguration) => this.rxGridConfiguratorService.getGridConfig(rxGridConfiguration)), tap((gridConfig) => {
                Object.assign(this.state, gridConfig);
                this.state.advancedFiltering.selectedFilters = [];
                this.adaptTableConfig.multiSortMeta = [];
            }), switchMap(() => {
                if (this.state.guid) {
                    this.guid = this.state.guid;
                }
                const requests$ = [this.initRecordDefinitions()];
                if (this.guid) {
                    requests$.push(this.rxRecordGridUserPreferencesService.get(this.guid));
                }
                return forkJoin(requests$);
            }), switchMap(() => this.initGrid()))
                .subscribe();
        }
        this.adaptTableConfig.virtualScroll = this.state.virtualScroll;
        const toolbarConfig = this.adaptTableConfig.toolbarConfig;
        toolbarConfig.visibleColumnsMenu = this.state.enableColumnSelection;
        toolbarConfig.visibleColumnsMenuTemplate = this.visibleColumnsMenuTemplate;
        toolbarConfig.rightCustomSectionTemplate = this.rightCustomSectionTemplate;
        toolbarConfig.leftCustomSectionTemplate = this.leftCustomSectionTemplate;
        toolbarConfig.filterTemplate = this.filterTemplate;
        this.notifyPropertyChanged('totalRowCount', 0);
        this.notifyPropertyChanged('selectedRows', []);
        this.notifyPropertyChanged('selectedRowCount', 0);
        this.notifyPropertyChanged('fieldValuesByFieldId', {});
        this.notifyPropertyChanged('firstSelectedRow', null);
        this.notifyPropertyChanged('queryExpression', '');
        this.notifyPropertyChanged('lastRefreshTime', '');
        this.initAdvancedFilterTexts();
        this.initCustomTexts();
        this.rxGlobalEventsService.viewActionsCompleted$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
            if (!isEmpty(this.pendingFiltersToApply)) {
                this.onAdvancedFiltersChange(this.pendingFiltersToApply);
            }
            this.pendingFiltersToApply = null;
        });
    }
    ngAfterViewInit() {
        // The action buttons are rendered by the record grid component,
        // hence we have to handle their property changes here.
        this.actionButtonComponents.changes
            .pipe(switchMap((buttons) => merge(
        // Emit "api" change because native action button's property change happens later and we cannot catch it.
        ...buttons.map((button) => of({
            guid: button.guid,
            propertyName: 'api',
            newValue: button.api,
            oldValue: null
        })), 
        // Handle other property changes, e.g "hidden", or "disabled".
        ...buttons.map((button) => button.propertyChanged.asObservable()))))
            .subscribe((event) => this.propertyChanged.emit(event));
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.dataLoadContextSubject.complete();
        this.userPreferencesChanged$.complete();
    }
    applyFilterBySelection() {
        if (isEmpty(this.state.advancedFiltering.selectedCardValues)) {
            this.applyPendingSelectedFilters();
        }
        else {
            this.cardLayoutOpenedModal = this.adaptModalService.open({
                title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.filter-by-selection.title'),
                content: RxFilterByCardSelectionDialogComponent,
                data: {
                    filterableFields: this.visibleColumns
                        .filter((column) => {
                        if (column.filterable) {
                            const fieldDefinition = this.state.recordDefinition.fieldDefinitionsById[column.field];
                            const isRequiredBooleanFilter = fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.boolean.resourceType &&
                                this.rxFieldDefinitionService.isRequiredField(fieldDefinition);
                            return !isRequiredBooleanFilter;
                        }
                        else {
                            return false;
                        }
                    })
                        .map((column) => ({
                        id: column.field,
                        name: column.header || column.fallbackTitle
                    }))
                },
                customClass: 'rx-filter-by-card-selection-dialog'
            });
            this.cardLayoutOpenedModal
                .then((fieldId) => {
                this.state.advancedFiltering.pendingSelectedFilters = [
                    {
                        filterOptionId: fieldId,
                        value: this.state.advancedFiltering.selectedCardValues[fieldId]
                    }
                ];
                this.applyPendingSelectedFilters();
            })
                .catch(noop);
        }
    }
    buildQueryByAdvancedFilters(advancedFilters) {
        const queryFilters = advancedFilters.map((filter) => {
            var _a;
            let queryFilter = null;
            const fieldId = filter.filterOptionId;
            const fieldDefinition = this.state.recordDefinition.fieldDefinitionsById[fieldId];
            if (fieldDefinition) {
                const filterConfig = this.state.advancedFiltering.recordGridFilterConfigs[fieldDefinition.resourceType];
                queryFilter = filterConfig.getQueryFilter(filter, fieldDefinition, fieldId, (_a = this.state.namedFilterOptions[fieldId]) !== null && _a !== void 0 ? _a : []);
            }
            return queryFilter;
        });
        return this.rxRecordGridFilterService.addQueries(...queryFilters);
    }
    downloadAttachment(row, col, fileName, event) {
        if (event && !includes(['Space', 'Enter'], event.code)) {
            return;
        }
        if (this.rxRecordGridUtilsService.isAssociatedRecordFieldId(col.field)) {
            const fieldLocator = this.rxRecordGridUtilsService.getFieldLocator(col.field);
            const associationDescriptor = find(this.state.associationDescriptors, {
                associationDefinition: { guid: fieldLocator.associationGuid }
            });
            this.rxAssociationInstanceDataPageService
                .post({
                params: {
                    pageSize: 1,
                    startIndex: 0,
                    associationDefinition: associationDescriptor.associationDefinition.name,
                    nodeToQuery: fieldLocator.associationNodeSide,
                    associatedRecordInstanceId: row[RX_RECORD_DEFINITION.coreFieldIds.id],
                    propertySelection: RX_RECORD_DEFINITION.coreFieldIds.id
                }
            })
                .pipe(take(1))
                .subscribe((dataPageResult) => {
                const recordInstanceId = dataPageResult.data[0][RX_RECORD_DEFINITION.coreFieldIds.id];
                this.rxRecordInstanceService.downloadAttachment(associationDescriptor.recordDefinitionName, Number(fieldLocator.fieldId), recordInstanceId, fileName);
            });
        }
        else {
            this.rxRecordInstanceService.downloadAttachment(this.state.recordDefinitionName, Number(col.field), row[RX_RECORD_DEFINITION.coreFieldIds.id], fileName);
        }
    }
    executeViewActions(guid, actions, lastActionRow) {
        if (this.isProgrammaticUse) {
            const sortedActions = sortBy(actions, 'index');
            return sortedActions.reduce((promise, action) => {
                return isFunction(action.name)
                    ? promise.then((result) => action.name(result, lastActionRow))
                    : isString(action.name)
                        ? promise.then((result) => (() => {
                            this.rxViewActionService.execute(action.name.toString(), action.params).subscribe();
                        })(result, lastActionRow))
                        : promise;
            }, Promise.resolve());
        }
        return this.runtimeViewModelApi.triggerViewActions(guid, VIEW_COMPONENT_DEFAULT_EVENT_NAME);
    }
    getActionButtonConfig(isHidden, actionButtonConfig) {
        return isHidden
            ? actionButtonConfig.pipe(map((config) => (Object.assign(Object.assign({}, config), { cls: 'dropdown-item' }))))
            : actionButtonConfig;
    }
    getCellValue(row, col) {
        const cellValueFormatter = this.cellValueFormatters[col.field];
        return cellValueFormatter(row[col.field]);
    }
    getDataCellClass() {
        return this.popovers.length ? 'rx-cell-selection-mode' : '';
    }
    getLoadRecordCountLinkText() {
        return `${this.adaptTableConfig.data.length}+`;
    }
    getMultipleRowsSelectedText() {
        return this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.multiple-rows-selected.label', {
            count: this.adaptTableConfig.selectedItems.length,
            total: this.isTotalRecordCountKnown ? this.adaptTableConfig.totalRecords : this.getLoadRecordCountLinkText()
        });
    }
    getMultipleRowsSelectedTextFirstPart() {
        const text = this.getMultipleRowsSelectedText();
        return text.substring(0, text.indexOf(this.getLoadRecordCountLinkText()));
    }
    getMultipleRowsSelectedTextSecondPart() {
        const text = this.getMultipleRowsSelectedText();
        const totalParameterForTranslate = this.getLoadRecordCountLinkText();
        return text.substring(text.indexOf(totalParameterForTranslate) + totalParameterForTranslate.length);
    }
    getNamedFilterOptions(filterOptionConfig) {
        return this.state.namedFilterOptions[filterOptionConfig.id];
    }
    getSharedFilterPresets() {
        this.state.advancedFiltering.isLoading = true;
        const onLoadingEnd = () => {
            this.state.advancedFiltering.isLoading = false;
            this.state.advancedFiltering.hasLoadedSharedFilterPresets = true;
        };
        return this.rxRecordGridSharedFilterPresetsCacheService.getSharedFilterPresets(this.guid).pipe(catchError((err) => {
            onLoadingEnd();
            return throwError(err);
        }), tap(() => {
            onLoadingEnd();
        }));
    }
    getSortedColumnsByTitle() {
        return this.adaptTableConfig.columns
            .slice()
            .sort((column1, column2) => column1.header.localeCompare(column2.header));
    }
    getToolbarTags(filterTags) {
        const toolbarTags$ = (filterTags || []).map((tag) => {
            if (tag.data.filterOption && tag.data.filterOption.id !== RX_RECORD_GRID.externalPresetFilterOptionId) {
                const fieldId = tag.data.filterOption.id;
                const fieldDefinition = this.state.recordDefinition.fieldDefinitionsById[fieldId];
                const filterConfig = this.state.advancedFiltering.recordGridFilterConfigs[fieldDefinition.resourceType];
                if (isFunction(filterConfig.getToolbarTagInfo)) {
                    return filterConfig
                        .getToolbarTagInfo({
                        primaryRecordDefinition: this.state.recordDefinition,
                        fieldDefinition,
                        value: tag.data.value,
                        tag,
                        fieldId,
                        namedFilterOptions: this.state.namedFilterOptions[fieldId]
                    })
                        .pipe(tap((tagInfo) => (tag.data.value.title = tagInfo.tooltip)), map((tagInfo) => (Object.assign(Object.assign({}, tag), { text: tagInfo.text }))));
                }
            }
            return of(Object.assign({}, tag));
        });
        return toolbarTags$.length ? forkJoin(toolbarTags$) : of([]);
    }
    getVisibleColumns() {
        return this.adaptTable.getVisibleColumns(this.adaptTableConfig.columns);
    }
    getVisibleRows() {
        return this.adaptTableConfig.data;
    }
    handleHeaderCheckboxToggle(event) {
        this.setSelectedFilteredRowsCount();
    }
    isCellSelected(cellPopover) {
        return some(this.popovers, (popover) => popover === cellPopover);
    }
    loadSavedFilterPresetFilters(savedFilter) {
        this.state.advancedFiltering.isLoading = true;
        return this.rxRecordGridFilterService
            .getAdvancedFilterData(savedFilter.filterData, this.state.recordDefinition.fieldDefinitionsById, this.state.advancedFiltering.recordGridFilterConfigs, this.state.recordDefinition, this.state.advancedFiltering.filterOptions, this.state.associationDescriptors)
            .pipe(tap((filters) => {
            // combined fake preset filters with actual filters.
            savedFilter.filters = (savedFilter.filters || []).concat(filters);
            this.state.advancedFiltering.isLoading = false;
        }));
    }
    loadTotalRowCount() {
        this.getTotalRowCount().subscribe((result) => {
            this.adaptTableConfig.totalRecords = result.totalSize;
        });
    }
    onActiveSavedAdvancedFilterChange(savedFilter) {
        this.state.advancedFiltering.activeSavedFilter = savedFilter;
    }
    onAdvancedFilterExpressionTagsChanged(event) {
        const hasAllValidTags = event.filterExpressionTags.every((filterTag) => isEmpty(filterTag.data.validationErrors));
        if (hasAllValidTags) {
            const oldToolbarTags = this.state.advancedFiltering.toolbarTags;
            this.updateToolbarTags(event.filterExpressionTags);
            // workaround: run changeDetector to avoid the ExpressionChangedAfterItHasBeenCheckedError
            if (oldToolbarTags !== this.state.advancedFiltering.toolbarTags) {
                this.changeDetector.detectChanges();
            }
        }
    }
    onAdvancedFiltersChange(filters) {
        this.state.advancedFiltering.appliedSharedFilterPreset = null;
        const appliedExternalPresetFilter = this.getAppliedExternalPresetFilter(filters);
        if (appliedExternalPresetFilter) {
            const filterPresetData = this.state.advancedFiltering.savedFilters.find((savedFilter) => savedFilter.id === appliedExternalPresetFilter.value);
            if (this.isSharedFilterPreset(filterPresetData)) {
                this.state.advancedFiltering.appliedSharedFilterPreset = filterPresetData;
            }
            else {
                if (filterPresetData.appliedSharedFilterPresetGuid) {
                    const appliedSharedFilterPreset = find(this.state.advancedFiltering.savedFilters, {
                        id: filterPresetData.appliedSharedFilterPresetGuid
                    });
                    this.state.advancedFiltering.appliedSharedFilterPreset = appliedSharedFilterPreset;
                }
            }
        }
        this.adaptTableConfig.first = 0;
        this.state.advancedFiltering.selectedFilters = filters;
        this.adaptTableConfig.isLoadingMoreData = false;
        this.updateAdaptTableFilters();
        this.userPreferencesChanged$.next();
        this.updateToolbarTags(this.state.advancedFiltering.toolbarTags);
        if (this.state.useExternalFiltering) {
            this.loadRowData(false);
        }
        else {
            this.adaptTableConfig.data = this.filterRows(this.adaptTableConfig.originalRows);
        }
    }
    onBeforeActiveSavedFilterChange(event) {
        const savedFilterToSelect = event.savedFilterToSelect;
        if (savedFilterToSelect) {
            if (!savedFilterToSelect.filters || !this.areNonExternalPresetFiltersApplied(savedFilterToSelect.filters)) {
                this.loadSavedFilterPresetFilters(savedFilterToSelect).subscribe();
            }
        }
    }
    onCellClick(event, columns, rowItem, popover, isCardLayout) {
        const isLinkClicked = !!event.target.closest('a');
        if (isLinkClicked) {
            this.clearSelectedCells();
        }
        else {
            if (this.popovers.length) {
                if (!(event.metaKey || event.ctrlKey)) {
                    this.clearSelectedCells();
                }
            }
            if (columns) {
                this.toggleCellSelection(columns.filter((col) => !col.isRowActionsColumn), rowItem, popover, isCardLayout);
            }
        }
    }
    onFilterBySelection(event, columns, rowItem) {
        this.onCellClick(event, columns, rowItem, null, true);
        this.applyFilterBySelection();
    }
    onCellMouseOver($event) {
        const element = $event.currentTarget;
        this.showCellTooltip = element.offsetWidth < element.scrollWidth;
    }
    onChangedCardLayout(event) {
        this.adaptTableConfig.cardLayoutColumns = event.cardLayoutColumns;
        this.clearSelectedCells();
        if (this.cardLayoutOpenedModal) {
            this.cardLayoutOpenedModal.reject();
            this.cardLayoutOpenedModal = null;
        }
        if (this.guid) {
            this.rxRecordGridUserPreferencesService.applyUserPreferencesForColumns(this.adaptTableConfig, this.state.columnsWithMetadata, this.guid);
        }
        this.visibleColumns = this.getVisibleColumns();
        this.adaptTableConfig.virtualRowHeight = this.getVirtualRowHeight();
    }
    onColReorder(colReorderEvent) {
        this.visibleColumns = this.getVisibleColumns();
        this.userPreferencesChanged$.next();
    }
    onColumnResize() {
        const adaptTableRectData = this.adaptTable.el.nativeElement.getBoundingClientRect();
        const tableWidth = adaptTableRectData === null || adaptTableRectData === void 0 ? void 0 : adaptTableRectData.width;
        const availableColumnWidth = this.adaptTable.dataHeaderCells.reduce((accum, cell) => accum + cell.element.nativeElement.offsetWidth, 0);
        const defaultColumnWidth = `${(availableColumnWidth * 100) / (tableWidth * this.getVisibleColumns().length)}%`;
        const visibleColumnWidthMap = reduce(this.adaptTable.dataHeaderCells.toArray(), (result, cell) => {
            const renderingColumnConfig = cell.data.renderingColumn.columnsConfigs[0];
            let width = null;
            if (availableColumnWidth) {
                width =
                    endsWith(renderingColumnConfig.width, 'px') || this.state.expandable
                        ? `${cell.element.nativeElement.offsetWidth}px`
                        : `${round((cell.element.nativeElement.offsetWidth / availableColumnWidth) * 100, 2)}%`;
            }
            result[renderingColumnConfig.field] = width;
            return result;
        }, {});
        this.adaptTableConfig.columns.forEach((column) => {
            var _a;
            if (!column.hidden) {
                column.width = (_a = visibleColumnWidthMap[column.field]) !== null && _a !== void 0 ? _a : defaultColumnWidth;
            }
        });
        this.userPreferencesChanged$.next();
    }
    onColumnVisibilityChange(isVisible, column) {
        if (column.hidden === isVisible) {
            column.hidden = !isVisible;
            this.userPreferencesChanged$.next();
            this.visibleColumns = this.getVisibleColumns();
            this.adaptTableConfig.virtualRowHeight = this.getVirtualRowHeight();
            if (isVisible) {
                if (!this.lastPropertySelection.includes(column.field)) {
                    this.loadRowData();
                }
            }
            else {
                // #ADAPT-8052 workaround.
                this.avoidSystemColumnExpansion();
            }
        }
    }
    onCreateNewFilterPreset(event) {
        const newFilter = {
            filters: event.filters,
            name: event.name,
            id: this.rxGuidService.generate()
        };
        const appliedSharedPreset = this.getAppliedExternalPresetFilter(event.filters);
        if (appliedSharedPreset) {
            newFilter.appliedSharedFilterPresetGuid = appliedSharedPreset.value;
        }
        this.state.advancedFiltering.savedFilters.push(newFilter);
        this.state.advancedFiltering.activeSavedFilter = newFilter;
        this.userPreferencesChanged$.next();
    }
    onDeleteSavedFilterPreset(filterPresetToDelete) {
        remove(this.state.advancedFiltering.savedFilters, (filterPreset) => filterPreset.id === filterPresetToDelete.id);
        this.userPreferencesChanged$.next();
    }
    onEditSavedFilterClick(event) {
        let editCustomTagsFn = null;
        if (event.savedFilter.appliedSharedFilterPresetGuid) {
            editCustomTagsFn = (tags) => tags;
        }
        if (!event.savedFilter.filters || !this.areNonExternalPresetFiltersApplied(event.savedFilter.filters)) {
            event.preventDefault();
            this.loadSavedFilterPresetFilters(event.savedFilter).subscribe(() => {
                event.initSavedFilterEditing(editCustomTagsFn && editCustomTagsFn.bind(this));
            });
        }
        else if (event.savedFilter.appliedSharedFilterPresetGuid) {
            event.preventDefault();
            event.initSavedFilterEditing(editCustomTagsFn.bind(this));
        }
    }
    onExport(options) {
        if (this.isExportInProgress) {
            this.rxNotificationService.addInfoMessage(this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.export-in-progress.message'));
            return;
        }
        const visibleColumns = this.getVisibleColumns().filter((column) => !column.isRowActionsColumn);
        if (!visibleColumns.length) {
            this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.no-data-to-export.message'));
            return;
        }
        const columnHeaders = visibleColumns.map((column) => column.header || column.fallbackTitle);
        let rows$;
        if (options.selectionOnly) {
            rows$ = of(intersectionBy(this.adaptTableConfig.data, this.getSelectedRows(), RowDataItemIdFieldName));
        }
        else {
            const headers = this.getHeaders();
            const params = this.prepareQueryParamsAndQueryArgs(false);
            params.pageSize = -1;
            params.propertySelection = visibleColumns.map((column) => column.field);
            delete params.cursor;
            this.isExportInProgress = true;
            rows$ = this.getDataPageService()
                .post({ params, headers })
                .pipe(map((dataPage) => dataPage.data), finalize(() => {
                this.isExportInProgress = false;
            }));
        }
        rows$.subscribe((rows) => {
            const cellValues = this.getCellValues(rows, visibleColumns);
            this.exportDataToCsv(cellValues, columnHeaders);
        });
    }
    onLazyLoad(event) {
        if (this.state.useExternalFiltering) {
            if (event.loadMore || event.eventSource !== AdaptTableEventSource.LoadMore) {
                this.adaptTableConfig.multiSortMeta = event.multiSortMeta;
                this.adaptTableConfig.filters = event.filters;
                this.adaptTableConfig.isLoadingMoreData = event.loadMore;
                this.loadRowData(event.loadMore);
            }
        }
        else {
            if (event.eventSource === AdaptTableEventSource.FilterChange) {
                this.adaptTableConfig.filters = event.filters;
                this.adaptTableConfig.data = this.filterRows(this.adaptTableConfig.originalRows);
            }
        }
    }
    onRefreshClick() {
        if (!this.state.useExternalFiltering) {
            this.loadRowData(false);
        }
        const searchText = this.adaptTable.toolbarComponent.getQuickFilterInputValue();
        // this will trigger onLazyLoad event
        this.adaptTable.setQuickFilter(searchText);
    }
    onRemoveFilterTag(event) {
        this.state.advancedFiltering.activeSavedFilter = null;
        const selectedFilters = this.state.advancedFiltering.selectedFilters.slice();
        const filterOptionId = event.removedTag.data.filterOption.id;
        const index = findIndex(selectedFilters, (selectedFilter) => selectedFilter.filterOptionId === filterOptionId);
        selectedFilters.splice(index, 1);
        this.onAdvancedFiltersChange(selectedFilters);
        this.setToolbarTags(event.newTags);
    }
    onRowsSelectionChange(rowDataItems) {
        const selectedItems = rowDataItems ? castArray(rowDataItems) : [];
        const oldSelectedItems = this.adaptTableConfig.selectedItems;
        this.shouldDisplayActionButtons = !isEmpty(selectedItems) && !isEmpty(this.actionButtons);
        this.expandSelectedRowsProperties(selectedItems);
        this.adaptTableConfig.selectedItems = selectedItems;
        this.adaptTableConfig.toolbarConfig = Object.assign(Object.assign(Object.assign({}, this.adaptTableConfig.toolbarConfig), { quickFilter: !this.shouldDisplayActionButtons, leftCustomSectionFixed: this.shouldDisplayActionButtons, rightCustomSectionFixed: this.shouldDisplayActionButtons, leftCustomSection: this.shouldDisplayActionButtons, filter: !this.shouldDisplayActionButtons }), this.state.toolbarConfig);
        this.adaptTableConfig.texts = Object.assign(Object.assign({}, this.adaptTableConfig.texts), { exportSelected: this.getExportSelectedText(selectedItems) });
        this.addSelectionFieldOptionNames(selectedItems[0]);
        this.notifyPropertyChanged('selectedRows', selectedItems, oldSelectedItems);
        this.notifyPropertyChanged('selectedRowCount', selectedItems.length, oldSelectedItems.length);
        this.notifyPropertyChanged('firstSelectedRow', selectedItems[0], oldSelectedItems[0]);
        this.notifyPropertyChanged('fieldValuesByFieldId', this.prepareFieldsValueByFieldIdData(selectedItems), {});
        this.rowSelectionChanged.next(selectedItems);
    }
    onSearchColumns() {
        this.filteredVisibleColumns = this.sortedColumnsByTitle.filter((column) => this.rxStringService.caseInsensitiveSearch(column.header, this.columnSearchText));
    }
    onSort(sortEvent) {
        this.applySorting(sortEvent.multisortmeta);
    }
    onSortCards(multiSortMeta) {
        this.applySorting(multiSortMeta);
        this.loadRowData();
    }
    onRowActionOpen(row) {
        var _a;
        (_a = last(this.popovers)) === null || _a === void 0 ? void 0 : _a.close();
        this.addSelectionFieldOptionNames(row);
        const gridRow = this.expandRowProperties(row);
        this.state.lastActionRow = gridRow;
        this.notifyPropertyChanged('clickableRow', gridRow, null);
    }
    onUpdateSavedFilterPreset(event) {
        const savedFilter = find(this.state.advancedFiltering.savedFilters, (filterPreset) => filterPreset.id === event.oldSavedFilter.id);
        if (savedFilter) {
            if (savedFilter.appliedSharedFilterPresetGuid &&
                !find(event.newSavedFilter.filters, (filter) => filter.filterOptionId === RX_RECORD_GRID.externalPresetFilterOptionId)) {
                delete savedFilter.appliedSharedFilterPresetGuid;
            }
            Object.assign(savedFilter, event.newSavedFilter);
            this.userPreferencesChanged$.next();
        }
    }
    openRowDetails(columns, rowDataItem) {
        var _a;
        (_a = last(this.popovers)) === null || _a === void 0 ? void 0 : _a.close();
        this.cardLayoutOpenedModal = this.adaptModalService.open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.cards.record-details.dialog.title'),
            content: this.cardLayoutRowDetailsTemplate,
            data: {
                columns,
                rowDataItem
            }
        });
        this.cardLayoutOpenedModal.catch(noop);
    }
    setToolbarTags(toolbarTags) {
        this.state.advancedFiltering.toolbarTags = toolbarTags;
        this.updateToolbarItems();
    }
    trackByColumnField(index, column) {
        return column.field;
    }
    updateToolbarTags(filterTags) {
        this.getToolbarTags(filterTags).subscribe((toolbarTags) => {
            this.setToolbarTags(toolbarTags);
        });
    }
    addAssociationFieldsToRecordDefinition(columnsWithMetadata) {
        const fieldDefinitionsById = this.state.recordDefinition.fieldDefinitionsById;
        columnsWithMetadata.forEach((columnWithMetadata) => {
            if (!fieldDefinitionsById[columnWithMetadata.fieldId]) {
                this.rxRecordDefinitionService.addFieldDefinitionToMap(columnWithMetadata.fieldDefinition, fieldDefinitionsById, columnWithMetadata.fieldId);
            }
        });
        this.state.recordDefinition.fieldDefinitionsById = Object.assign(Object.assign({}, fieldDefinitionsById), this.rxObjectUtilsService.expandProperties(fieldDefinitionsById));
        this.notifyPropertyChanged('recordDefinition', this.state.recordDefinition);
    }
    areNonExternalPresetFiltersApplied(filters) {
        return filters.some((filter) => filter.filterOptionId !== RX_RECORD_GRID.externalPresetFilterOptionId);
    }
    getAppliedExternalPresetFilter(filters) {
        return filters.find((filter) => filter.filterOptionId === RX_RECORD_GRID.externalPresetFilterOptionId);
    }
    prepareFieldsValueByFieldIdData(selectedData) {
        const columnIds = _map(this.adaptTableConfig.columns, 'field');
        return reduce(selectedData, (result, row, index) => {
            columnIds.forEach(function (id) {
                result[id] = result[id] || [];
                result[id][index] = row[id];
            });
            return result;
        }, {});
    }
    addSelectionFieldOptionNames(row) {
        if (row) {
            row.selectionFieldOptionNamesById = transform(this.selectionFieldOptionLabelsByFieldId, (result, value, fieldId) => {
                result[fieldId] = value[row[fieldId]];
            }, {});
        }
    }
    applyFilters(filters, mode) {
        this.initializationCompleted$
            .pipe(switchMap(() => this.rxRecordGridFilterService.getAdvancedFilterData(filters, this.state.recordDefinition.fieldDefinitionsById, this.state.advancedFiltering.recordGridFilterConfigs, this.state.recordDefinition, this.state.advancedFiltering.filterOptions, this.state.associationDescriptors)), take(1), takeUntil(this.destroyed$))
            .subscribe((filtersToApply) => {
            let currentFilters = !isEmpty(this.pendingFiltersToApply)
                ? this.pendingFiltersToApply
                : cloneDeep(this.state.advancedFiltering.selectedFilters);
            let resultingFilters;
            switch (mode) {
                case ApplyGridFilterMode.Begin:
                    if (this.pendingFiltersToApply) {
                        resultingFilters = this.pendingFiltersToApply;
                    }
                    else {
                        this.pendingFiltersToApply = [];
                    }
                    break;
                case ApplyGridFilterMode.Append:
                    // filters that will not be affected
                    const remainingFilters = currentFilters.filter((currentFilter) => !filtersToApply.find((filter) => filter.filterOptionId === currentFilter.filterOptionId));
                    resultingFilters = [...remainingFilters, ...filtersToApply];
                    break;
                case ApplyGridFilterMode.Remove:
                    resultingFilters = currentFilters.reduce((result, currentFilter) => {
                        const filterToApply = filtersToApply.find((filter) => filter.filterOptionId === currentFilter.filterOptionId);
                        if (filterToApply) {
                            if (this.isRangeFilter(currentFilter.filterOptionId)) {
                                if (isEqual(currentFilter.value.filterValue, filterToApply.value.filterValue)) {
                                    currentFilter.value.filterValue = [null, null];
                                }
                            }
                            else {
                                currentFilter.value.filterValue = currentFilter.value.filterValue.filter((val) => !filterToApply.value.filterValue.includes(val));
                            }
                            currentFilter.value.namedOptions = currentFilter.value.namedOptions.filter((val) => !filterToApply.value.namedOptions.includes(val));
                            if (!RxRecordGridAdvancedFilterValue.isEmptyWithRange(currentFilter.value)) {
                                result.push(currentFilter);
                            }
                        }
                        else {
                            result.push(currentFilter);
                        }
                        return result;
                    }, []);
                    break;
                case ApplyGridFilterMode.Merge:
                    resultingFilters = [...currentFilters, ...filtersToApply].reduce((result, filter) => {
                        const existingFilter = result.find((f) => f.filterOptionId === filter.filterOptionId);
                        if (!existingFilter) {
                            result.push(filter);
                        }
                        else {
                            if (this.isRangeFilter(filter.filterOptionId)) {
                                existingFilter.value.filterValue = [...filter.value.filterValue];
                            }
                            else {
                                existingFilter.value.filterValue = uniq(existingFilter.value.filterValue.concat(filter.value.filterValue));
                            }
                            existingFilter.value.namedOptions = uniq(existingFilter.value.namedOptions.concat(filter.value.namedOptions));
                        }
                        return result;
                    }, []);
                    break;
                case ApplyGridFilterMode.Overwrite:
                    this.state.advancedFiltering.appliedSharedFilterPreset = null;
                    this.state.advancedFiltering.activeSavedFilter = null;
                    resultingFilters = filtersToApply;
                    break;
                case ApplyGridFilterMode.Clear:
                    this.state.advancedFiltering.appliedSharedFilterPreset = null;
                    this.state.advancedFiltering.activeSavedFilter = null;
                    resultingFilters = [];
                    if (this.pendingFiltersToApply) {
                        this.state.advancedFiltering.selectedFilters = [];
                    }
                    break;
                case ApplyGridFilterMode.End:
                    if (this.pendingFiltersToApply) {
                        resultingFilters = this.pendingFiltersToApply;
                        this.pendingFiltersToApply = null;
                    }
                    break;
            }
            if (this.pendingFiltersToApply) {
                this.pendingFiltersToApply = resultingFilters || [];
            }
            else if (resultingFilters) {
                this.onAdvancedFiltersChange(resultingFilters);
            }
        });
    }
    applyPendingSelectedFilters() {
        const existingFilters = cloneDeep(this.state.advancedFiltering.selectedFilters);
        forEach(this.state.advancedFiltering.pendingSelectedFilters, (pendingSelectedFilter) => {
            const existingFilter = find(existingFilters, { filterOptionId: pendingSelectedFilter.filterOptionId });
            const fieldDefinition = this.state.recordDefinition.fieldDefinitionsById[pendingSelectedFilter.filterOptionId];
            let filterValues = [];
            switch (fieldDefinition.resourceType) {
                case RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType:
                case RX_RECORD_DEFINITION.dataTypes.dateTime.resourceType: {
                    filterValues = pendingSelectedFilter.value.map((filterValue) => moment(filterValue));
                    filterValues = [moment.min(filterValues), moment.max(filterValues)];
                    break;
                }
                case RX_RECORD_DEFINITION.dataTypes.timeOnly.resourceType: {
                    filterValues = pendingSelectedFilter.value.map((filterValue) => moment(filterValue, 'LTS'));
                    filterValues = [moment.min(filterValues), moment.max(filterValues)];
                    break;
                }
                case RX_RECORD_DEFINITION.dataTypes.integer.resourceType:
                case RX_RECORD_DEFINITION.dataTypes.decimal.resourceType:
                case RX_RECORD_DEFINITION.dataTypes.real.resourceType: {
                    filterValues = [min(pendingSelectedFilter.value), max(pendingSelectedFilter.value)];
                    break;
                }
                case RX_RECORD_DEFINITION.dataTypes.boolean.resourceType: {
                    filterValues = pendingSelectedFilter.value.map((filterValue) => filterValue === '$NULL$' ? 'blank' : filterValue === 1);
                    break;
                }
                default: {
                    filterValues = uniq(pendingSelectedFilter.value.map((filterValue) => String(filterValue)));
                    break;
                }
            }
            if (existingFilter) {
                existingFilter.value.filterValue = filterValues;
            }
            else {
                pendingSelectedFilter.value = new RxRecordGridAdvancedFilterValue(filterValues);
                existingFilters.push(pendingSelectedFilter);
            }
        });
        this.onAdvancedFiltersChange(existingFilters);
        this.clearSelectedCells();
    }
    applySorting(multiSortMeta) {
        this.adaptTableConfig.multiSortMeta = multiSortMeta;
        this.userPreferencesChanged$.next();
        if (!this.state.useExternalFiltering) {
            this.adaptTableConfig.data = this.filterRows(this.adaptTableConfig.data);
        }
    }
    applyViewPreset(viewPresetSelectorGuid, viewPresetGuid, sharedViewPresets) {
        var _a;
        if (viewPresetSelectorGuid === ((_a = this.state.viewPresetSelector) === null || _a === void 0 ? void 0 : _a.getGuid())) {
            return this.applyViewPresetInner(viewPresetGuid, sharedViewPresets);
        }
        return EMPTY;
    }
    shareViewPreset(viewPresetSelectorGuid) {
        var _a;
        if (viewPresetSelectorGuid === ((_a = this.state.viewPresetSelector) === null || _a === void 0 ? void 0 : _a.getGuid())) {
            return of(this.rxRecordGridUserPreferencesService.getSharedViewPresetData());
        }
        return of(null);
    }
    applyViewPresetInner(viewPresetGuid, sharedViewPresets) {
        return this.initializationCompleted$.pipe(switchMap(() => {
            const viewPresetData = sharedViewPresets && sharedViewPresets[this.guid];
            if (viewPresetData) {
                return this.rxRecordGridUserPreferencesService.applySharedViewPreset(this.state, this.adaptTableConfig, viewPresetGuid, viewPresetData);
            }
            else {
                return this.rxRecordGridUserPreferencesService.applyViewPreset(this.state, this.adaptTableConfig, viewPresetGuid);
            }
        }), take(1), tap(() => {
            this.loadRowData();
            this.userPreferencesChanged$.next();
            this.checkIfViewPresetEdited();
        }));
    }
    areUserFiltersApplied() {
        return (this.isSearchApplied() ||
            Boolean(this.state.advancedFiltering.appliedSharedFilterPreset) ||
            !isEmpty(this.state.advancedFiltering.selectedFilters));
    }
    isSearchApplied() {
        const searchText = get(this.adaptTableConfig.filters, 'global.value', '').toString().trim();
        return Boolean(searchText);
    }
    checkIfViewPresetEdited() {
        if (this.state.viewPresetSelector && this.rxRecordGridUserPreferencesService.isCurrentViewPresetEdited()) {
            this.state.viewPresetSelector.markAppliedViewPresetAsEdited();
        }
    }
    clearSelectedCells() {
        var _a;
        (_a = last(this.popovers)) === null || _a === void 0 ? void 0 : _a.close();
        this.popovers = [];
        this.state.advancedFiltering.pendingSelectedFilters = [];
        this.state.advancedFiltering.selectedCardValues = {};
    }
    compareRows(firstRow, secondRow) {
        const sortMetas = this.adaptTableConfig.multiSortMeta;
        return reduce(sortMetas, (sortRank, sortMeta) => {
            let firstValue;
            let secondValue;
            if (firstRow.groupField && secondRow.groupField) {
                firstValue = firstRow.groupField === sortMeta.field ? firstRow.groupValue : null;
                secondValue = secondRow.groupField === sortMeta.field ? secondRow.groupValue : null;
            }
            else {
                firstValue = firstRow[sortMeta.field];
                secondValue = secondRow[sortMeta.field];
            }
            // TODO: this is a naive implementation that needs to be improved to
            // take into account the type of data.
            // For example, this implementation will sort dates as strings.
            if (!isNaN(firstValue) && !isNaN(secondValue)) {
                const firstValueNum = Number(firstValue);
                const secondValueNum = Number(secondValue);
                sortRank =
                    sortRank || sortMeta.order * (firstValueNum < secondValueNum ? -1 : firstValueNum > secondValueNum ? 1 : 0);
            }
            else {
                // toString will convert null to '' to allow comparison with strings using localeCompare
                sortRank = sortRank || sortMeta.order * _toString(firstValue).localeCompare(_toString(secondValue));
            }
            return sortRank;
        }, 0);
    }
    createCsvExportFile(csvData) {
        const byteOrderMark = '\uFEFF';
        // Prepend byte order mark to indicate that csvData may contain unicode characters
        const file = new Blob([`${byteOrderMark}${csvData}`], { type: 'text/csv;charset=utf-8' });
        this.ngZone.runOutsideAngular(() => {
            saveAs(file, `${this.getExportFileName()}.csv`);
        });
    }
    deleteViewPreset(viewPresetGuid) {
        this.rxRecordGridUserPreferencesService.deleteViewPreset(viewPresetGuid);
        this.userPreferencesChanged$.next();
        return EMPTY;
    }
    discardViewPresetChanges(viewPresetGuid, sharedViewPresets) {
        if (this.rxRecordGridUserPreferencesService.isExistingViewPreset(viewPresetGuid)) {
            this.rxRecordGridUserPreferencesService.discardViewPresetChanges(viewPresetGuid);
            return this.applyViewPresetInner(viewPresetGuid, sharedViewPresets);
        }
        else {
            return EMPTY;
        }
    }
    enrichRowEntity(gridRowDataItem) {
        let hrefParams = {};
        if (!isEmpty(this.clickableWithHrefColumnActions)) {
            this.addSelectionFieldOptionNames(gridRowDataItem);
            const expandedGridRowData = this.expandRowProperties(gridRowDataItem);
            set(this.clickableWithHrefActionExpressionEvaluationData, `view.components.${this.guid}.clickableRow`, expandedGridRowData);
            hrefParams = reduce(this.clickableWithHrefColumnActions, (result, gridActions, columnId) => {
                const gridAction = this.findEnabledGridAction(gridActions);
                if ((gridAction === null || gridAction === void 0 ? void 0 : gridAction.name) === RX_VIEW_ACTION.viewActionNames.openView) {
                    result[`${columnId}$ROUTER_LINK$`] = this.rxViewActionUtilsService.generateViewUrl(gridAction.viewDefinitionName);
                    result[`${columnId}$QUERY_PARAMS$`] = this.evaluateViewInputParameters(gridAction.viewParams);
                }
                else if ((gridAction === null || gridAction === void 0 ? void 0 : gridAction.name) === RX_VIEW_ACTION.viewActionNames.launchUrl) {
                    result[`${columnId}$LAUNCH_URL$`] = this.rxExpressionEvaluatorService.tryEvaluate(gridAction.url, this.clickableWithHrefActionExpressionEvaluationData);
                    result[`${columnId}$TARGET$`] = RX_LAUNCH_BEHAVIOR[gridAction.launchBehavior].target;
                }
                else {
                    result[`${columnId}$LAUNCH_URL$`] = null;
                    result[`${columnId}$ROUTER_LINK$`] = null;
                }
                return result;
            }, {});
        }
        return Object.assign({}, gridRowDataItem, {
            [RowDataItemIdFieldName]: gridRowDataItem[this.adaptTableConfig.primaryKey]
        }, hrefParams);
    }
    expandRowProperties(rowDataItem) {
        return Object.assign(Object.assign({}, rowDataItem), this.rxObjectUtilsService.expandProperties(rowDataItem));
    }
    expandSelectedRowsProperties(rowDataItems) {
        forEach(rowDataItems, (rowDataItem, index) => {
            rowDataItems[index] = this.expandRowProperties(rowDataItem);
        });
    }
    exportDataToCsv(cellValues, columnHeaders) {
        const csvSeparator = '","';
        const newLineSymbol = '\n';
        const columnHeadersString = `"${columnHeaders.join(csvSeparator)}"${newLineSymbol}`;
        const rowsString = cellValues.map((row) => `"${row.join(csvSeparator)}"${newLineSymbol}`).join('');
        const csvData = `${columnHeadersString}${rowsString}`;
        this.createCsvExportFile(csvData);
    }
    evaluateViewInputParameters(viewInputParams) {
        const evaluatedViewInputParams = {};
        forEach(viewInputParams, (expression, parameterName) => {
            const evaluatedExpression = this.rxExpressionEvaluatorService.tryEvaluate(expression, this.clickableWithHrefActionExpressionEvaluationData);
            evaluatedViewInputParams[parameterName] = evaluatedExpression || '';
        });
        return evaluatedViewInputParams;
    }
    filterRows(rows) {
        const searchText = get(this.adaptTableConfig.filters, 'global.value', '').toString().trim();
        let filteredRows = cloneDeep(rows);
        if (searchText) {
            const visibleColumns = this.getVisibleColumns();
            filteredRows = filteredRows.filter((row) => some(visibleColumns, (column) => {
                if (row.groupField) {
                    if (this.rxStringService.caseInsensitiveSearch(row.groupValue, searchText)) {
                        return true;
                    }
                    else {
                        row.items = this.getFilteredItems(row.items, visibleColumns, searchText);
                        return row.items.length;
                    }
                }
                else {
                    return this.rxStringService.caseInsensitiveSearch(this.getCellValue(row, column), searchText);
                }
            }));
        }
        if (!isEmpty(this.state.advancedFiltering.selectedFilters)) {
            filteredRows = this.rxRecordGridFilterService.filterRows(filteredRows, this.state.advancedFiltering.selectedFilters, this.state.recordDefinition, this.state.advancedFiltering.recordGridFilterConfigs);
        }
        if (this.adaptTableConfig.multiSortMeta) {
            if (this.state.expandGroups) {
                this.sortRows(filteredRows);
            }
            else {
                filteredRows.sort((firstRow, secondRow) => this.compareRows(firstRow, secondRow));
            }
        }
        if (this.state.expandGroups) {
            const getGroupItemsCount = (rowsWithGroups) => {
                const groups = rowsWithGroups.filter((row) => row.items);
                let count = rowsWithGroups.length - groups.length;
                groups === null || groups === void 0 ? void 0 : groups.forEach((group) => (count += getGroupItemsCount(group.items)));
                return count;
            };
            this.adaptTableConfig.totalRecords = getGroupItemsCount(filteredRows);
        }
        else {
            this.adaptTableConfig.totalRecords = filteredRows.length;
        }
        return filteredRows;
    }
    findEnabledGridAction(gridActions) {
        return gridActions.find((gridAction) => {
            const conditionExpression = gridAction['$condition$'];
            const condition = this.rxExpressionEvaluatorService.tryEvaluate(conditionExpression, this.clickableWithHrefActionExpressionEvaluationData);
            return condition !== false;
        });
    }
    getAdvancedFilterOptions() {
        return reduce(this.state.recordDefinition.fieldDefinitionsById, (filterOptions, fieldDefinition, field) => {
            var _a;
            // Due to nested structure need to check if it is a fieldDefinition
            if (!isUndefined(fieldDefinition.id)) {
                const gridColumn = this.adaptTableConfig.columns.find((column) => column.field === field);
                const isHidden = !gridColumn || !gridColumn.filterable;
                const filterConfig = this.state.advancedFiltering.recordGridFilterConfigs[fieldDefinition.resourceType];
                const additionalQueryCriteria = gridColumn === null || gridColumn === void 0 ? void 0 : gridColumn.additionalQueryCriteria;
                if (filterConfig) {
                    filterOptions.push(this.rxRecordGridAdvancedFilteringService.getAdvancedFilterOption(field, gridColumn ? gridColumn.header || gridColumn.fallbackTitle : fieldDefinition.name, fieldDefinition, filterConfig, isHidden, {
                        optionalBooleanFilter: this.fieldsProvider.optionalBooleanFilter,
                        requiredBooleanFilter: this.fieldsProvider.requiredBooleanFilter,
                        inputsForStringWithTypeAheadTemplate: this.fieldsProvider.inputsForStringWithTypeAheadTemplate,
                        inputsForStringTypeTemplate: this.fieldsProvider.inputsForStringTypeTemplate,
                        inputsForNumberTypeTemplate: this.fieldsProvider.inputsForNumberTypeTemplate,
                        inputsForTimeTypeTemplate: this.fieldsProvider.inputsForTimeTypeTemplate,
                        inputsForDateTypeTemplate: this.fieldsProvider.inputsForDateTypeTemplate,
                        inputsForDatetimeTypeTemplate: this.fieldsProvider.inputsForDatetimeTypeTemplate,
                        inputsForSelectionTypeTemplate: this.fieldsProvider.inputsForSelectionTypeTemplate
                    }, null, this.state.namedFilterOptions[field], (_a = gridColumn === null || gridColumn === void 0 ? void 0 : gridColumn.typeaheadKeystrokeCount) !== null && _a !== void 0 ? _a : null, (gridColumn === null || gridColumn === void 0 ? void 0 : gridColumn.filterable) ? additionalQueryCriteria : null));
                }
            }
            return filterOptions;
        }, []).sort((filterOption1, filterOption2) => filterOption1.label.localeCompare(filterOption2.label));
    }
    getAssociationDescriptors() {
        const recordDefinitionName = this.getRecordDefinitionName();
        return recordDefinitionName
            ? this.rxRecordGridUtilsService.getAssociationDescriptors(recordDefinitionName)
            : of([]);
    }
    getBaseDataPageParams() {
        const state = this.state;
        const params = {
            recorddefinition: state.recordDefinitionName
        };
        if (Boolean(state.associationDefinitionName)) {
            Object.assign(params, {
                associatedRecordInstanceId: state.associatedRecordId,
                associationDefinition: state.associationDefinitionName,
                nodeToQuery: state.associatedRecordNodeSide,
                recordDefinitionToQuery: state.recordDefinitionName
            });
        }
        if (state.associatedRoleName) {
            params.roleName = state.associatedRoleName;
        }
        return params;
    }
    getCellValueFormatter(column) {
        const fieldDefinition = column.fieldDefinition;
        let cellValueFormatter = (value) => value;
        switch (fieldDefinition.resourceType) {
            case RX_RECORD_DEFINITION.dataTypes.boolean.resourceType: {
                cellValueFormatter = (value) => this.rxBooleanPipe.transform(value);
                break;
            }
            case RX_RECORD_DEFINITION.dataTypes.selection.resourceType: {
                // column.fieldId should be used here because fieldId uniquely identifies the field,
                // while fieldDefinition.id may be the same for core and associated fields
                cellValueFormatter = (value) => this.selectionFieldOptionLabelsByFieldId[column.fieldId][value];
                break;
            }
            case RX_RECORD_DEFINITION.dataTypes.dateTime.resourceType: {
                cellValueFormatter = (value) => this.datePipe.transform(value, 'medium');
                break;
            }
            case RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType: {
                cellValueFormatter = (value) => this.datePipe.transform(value);
                break;
            }
            case RX_RECORD_DEFINITION.dataTypes.timeOnly.resourceType: {
                cellValueFormatter = (value) => value ? this.datePipe.transform(new Date(`2000-01-01T${value}`), 'mediumTime') : value;
                break;
            }
            case RX_RECORD_DEFINITION.dataTypes.attachment.resourceType: {
                cellValueFormatter = (value) => {
                    const attachmentName = get(value, 'name');
                    return isString(attachmentName) ? attachmentName : value;
                };
                break;
            }
            case RX_RECORD_DEFINITION.dataTypes.decimal.resourceType:
            case RX_RECORD_DEFINITION.dataTypes.real.resourceType: {
                const precision = fieldDefinition.precision;
                const digitsInfo = isNil(precision) || precision === -1 ? null : `1.${precision}-${precision}`;
                cellValueFormatter = (value) => this.decimalPipe.transform(value, digitsInfo);
                break;
            }
            case RX_RECORD_DEFINITION.dataTypes.integer.resourceType: {
                cellValueFormatter = (value) => this.decimalPipe.transform(value);
                break;
            }
        }
        return cellValueFormatter;
    }
    getCellValues(rows, visibleColumns) {
        return rows.map((row) => visibleColumns.map((visibleColumnConfig) => this.getCellValue(row, visibleColumnConfig)));
    }
    getColumns() {
        return this.adaptTableConfig.columns.map((column) => {
            const columnMetadata = find(this.state.columnsWithMetadata, {
                fieldId: column.field
            });
            return {
                field: column.field,
                header: column.header,
                hidden: getValueOrFunc(column.hidden),
                fieldDefinition: columnMetadata.fieldDefinition
            };
        });
    }
    getData(startIndex) {
        return this.getDataBase(startIndex, false).pipe(tap((dataPage) => {
            this.cursor = dataPage.cursor || undefined;
        }));
    }
    getDataBase(startIndex, onlyForTotalCount) {
        var _a, _b;
        let data$;
        const params = this.prepareQueryParamsAndQueryArgs(onlyForTotalCount);
        if ((_a = params.queryExpression) === null || _a === void 0 ? void 0 : _a.includes(RX_EXPRESSION_EVALUATOR.operands.undefined)) {
            this.rxLogService.debug(`Query expression contains undefined operands: ${params.queryExpression}`);
            return this.rxRecordInstanceDataPageService.getEmptyDataPage();
        }
        if (this.state.enableFiltering &&
            !this.isSearchApplied() &&
            this.state.requiredFilters > this.state.advancedFiltering.selectedFilters.length) {
            this.rxNotificationService.addWarningMessage(this.getFiltersRequiredMessage(this.state.requiredFilters), this.translateService.instant('com.bmc.arsys.rx.client.common.alert.label'));
            return this.rxRecordInstanceDataPageService.getEmptyDataPage();
        }
        if (isNumber(startIndex)) {
            params.startIndex = startIndex;
        }
        if (startIndex === 0) {
            delete params.cursor;
        }
        this.lastQueryExpression = (_b = params.queryExpression) !== null && _b !== void 0 ? _b : '';
        if (!onlyForTotalCount) {
            this.lastPropertySelection = params.propertySelection;
        }
        if (this.state.getData) {
            data$ = this.state.getData(Object.assign(Object.assign({}, params), { searchText: get(this.adaptTableConfig.filters, 'global.value', '').toString().trim() }));
        }
        else if (this.hasAssociationAndEmptyRecordId()) {
            data$ = this.rxAssociationInstanceDataPageService.getEmptyDataPage();
        }
        else {
            const dataPageService = this.getDataPageService();
            data$ = dataPageService.post({ params, headers: this.getHeaders() });
        }
        return data$;
    }
    getDataCellStyle(column) {
        let textAlign = '';
        switch (column.alignment) {
            case RX_RECORD_GRID.columnAlignment.left:
                textAlign = 'left';
                break;
            case RX_RECORD_GRID.columnAlignment.right:
                textAlign = 'right';
                break;
            case RX_RECORD_GRID.columnAlignment.center:
                textAlign = 'center';
                break;
            default:
                const rightAlignmentTypes = [
                    RX_RECORD_DEFINITION.dataTypes.integer.resourceType,
                    RX_RECORD_DEFINITION.dataTypes.decimal.resourceType,
                    RX_RECORD_DEFINITION.dataTypes.real.resourceType
                ];
                if (column.fieldDefinition.resourceType.search(rightAlignmentTypes.join('|')) !== -1) {
                    textAlign = 'right';
                }
                break;
        }
        return {
            'text-align': textAlign
        };
    }
    getDataPageService() {
        return Boolean(this.state.associationDefinitionName)
            ? this.rxAssociationInstanceDataPageService
            : this.rxRecordInstanceDataPageService;
    }
    getExportFileName() {
        const date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        return `${date} Grid Data`;
    }
    getFilteredItems(items, visibleColumns, searchText) {
        return items.filter((item) => {
            let result;
            if (item.groupField) {
                if (this.rxStringService.caseInsensitiveSearch(item.groupValue, searchText)) {
                    result = true;
                }
                else {
                    item.items = this.getFilteredItems(item.items, visibleColumns, searchText);
                    result = item.items.length;
                }
            }
            else {
                result = some(visibleColumns, (visibleColumn) => this.rxStringService.caseInsensitiveSearch(this.getCellValue(item, visibleColumn), searchText));
            }
            return result;
        });
    }
    getFirstSelectedRow() {
        return get(this.adaptTableConfig.selectedItems, '0', null);
    }
    getGridColumnDefinitions(columnsWithMetadata) {
        const columnsConfig = [];
        columnsWithMetadata
            .slice()
            .sort((a, b) => a.index - b.index)
            .map((column) => {
            let sortable;
            const sortConfig = this.rxRecordGridConfigUtilsService.parseConfigString(column.sortable);
            const testId = this.rxRecordGridUtilsService.getTestIdForGridColumn(column.fieldId);
            if (isObject(sortConfig)) {
                sortable = true;
                if (this.adaptTableConfig.multiSortMeta) {
                    this.adaptTableConfig.multiSortMeta.splice(sortConfig.priority, 0, {
                        field: column.fieldId,
                        order: this.rxRecordGridConfigUtilsService.getColumnSortOrder(sortConfig.direction)
                    });
                }
                else {
                    this.adaptTableConfig.multiSortMeta = [
                        {
                            field: column.fieldId,
                            order: this.rxRecordGridConfigUtilsService.getColumnSortOrder(sortConfig.direction)
                        }
                    ];
                }
            }
            else {
                sortable = sortConfig;
            }
            const isColumnWidthInPixels = endsWith(column.width, 'px');
            const columnWidth = this.adaptTableConfig.columnResizeMode === ResizeMode.Expand && !isColumnWidthInPixels ? null : column.width;
            const columnMinWidth = (isColumnWidthInPixels && parseInt(columnWidth) < RX_RECORD_GRID.defaultColumnMinWidth ? columnWidth : null);
            if (column.fieldId === RX_RECORD_GRID.actionsColumnFieldDefinition.id) {
                columnsConfig.push({
                    field: column.fieldId,
                    header: column.title,
                    fallbackTitle: column.fallbackTitle,
                    width: columnWidth,
                    minWidth: columnMinWidth,
                    hidden: !column.visible,
                    cellTemplate: this.rowActionButtonsTemplate,
                    editTemplate: null,
                    filterTemplate: null,
                    headerTitleTemplate: null,
                    cellTooltip: null,
                    headerTooltip: null,
                    headerClass: null,
                    filterable: column.filterable,
                    searchable: column.searchable,
                    sortable,
                    editable: false,
                    customTemplate: this.rowActionButtonsTemplate,
                    clickable: false,
                    dataCellClass: 'rx-row-action-cell',
                    isRowActionsColumn: true,
                    testId
                });
            }
            else {
                columnsConfig.push({
                    field: column.fieldId,
                    header: column.title,
                    fallbackTitle: column.fallbackTitle,
                    width: columnWidth,
                    minWidth: columnMinWidth,
                    hidden: !column.visible,
                    cellTemplate: this.cellTemplate,
                    editTemplate: null,
                    filterTemplate: null,
                    headerTitleTemplate: null,
                    cellTooltip: (params) => {
                        return (this.showCellTooltip && this.getCellValue(params.dataItem, params.column)) || null;
                    },
                    headerTooltip: column.headerTooltip,
                    dataCellClass: this.getDataCellClass.bind(this),
                    dataCellStyle: this.getDataCellStyle(column),
                    headerClass: null,
                    sortable,
                    editable: null,
                    filterable: column.filterable,
                    searchable: column.searchable,
                    filterName: null,
                    filterParams: null,
                    clickable: column.clickable,
                    filterType: column.filterType,
                    isDownloadableAttachment: this.isDownloadableAttachmentColumn(column),
                    clickableWithHref: column.clickableWithHref,
                    customTemplate: column.cellTemplate,
                    wrapText: column.wrapText,
                    referenced: column.referenced,
                    cellDisplayProperties: column.cellDisplayProperties,
                    typeaheadKeystrokeCount: column.typeaheadKeystrokeCount,
                    additionalQueryCriteria: column.additionalQueryCriteria,
                    testId
                });
                this.cellValueFormatters[column.fieldId] = this.getCellValueFormatter(column);
            }
        });
        return columnsConfig;
    }
    getGridData(loadMore) {
        const onRequestEnd = () => {
            this.adaptTableConfig.isLoadingData = false;
            this.adaptTableConfig.isLoadingMoreData = false;
        };
        this.adaptTableConfig.isLoadingData = true;
        return this.getData(loadMore ? this.adaptTableConfig.data.length : 0).pipe(tap((res) => {
            onRequestEnd();
            const mappedData = res.data.map(this.enrichRowEntity.bind(this));
            if (this.state.useExternalFiltering) {
                if (loadMore) {
                    this.adaptTableConfig.data = this.adaptTableConfig.data.concat(mappedData);
                    if (mappedData.length === 0 || mappedData.length < this.adaptTableConfig.rows) {
                        this.adaptTableConfig.totalRecords = this.adaptTableConfig.data.length;
                    }
                }
                else {
                    this.adaptTableConfig.data = mappedData;
                    if (mappedData.length < this.adaptTableConfig.rows) {
                        this.adaptTableConfig.totalRecords = mappedData.length;
                    }
                    else {
                        this.adaptTableConfig.totalRecords = null;
                    }
                }
            }
            else {
                this.adaptTableConfig.originalRows = mappedData;
                this.adaptTableConfig.data = this.filterRows(this.adaptTableConfig.originalRows);
            }
            if (this.state.expandGroups) {
                this.adaptTableConfig.expandedGroupsKeys = {};
                const expandGroupsDeep = (rows) => {
                    rows.forEach((row) => {
                        if (row.items) {
                            const expandedGroupKey = this.adaptTableConfig.expandedGroupsKeys[row.groupField];
                            if (expandedGroupKey) {
                                expandedGroupKey[row.groupValue] = true;
                            }
                            else {
                                this.adaptTableConfig.expandedGroupsKeys[row.groupField] = { [row.groupValue]: true };
                            }
                            expandGroupsDeep(row.items);
                        }
                    });
                };
                expandGroupsDeep(this.adaptTableConfig.data);
            }
            this.adaptTableConfig.toolbarConfig.rightCustomSection = Boolean(this.state.enableRowSelection && this.adaptTableConfig.data.length);
            this.notifyPropertyChanged('totalRowCount', this.adaptTableConfig.data.length);
            this.notifyPropertyChanged('queryExpression', this.lastQueryExpression);
            this.notifyPropertyChanged('lastRefreshTime', new Date().toISOString());
            if (!loadMore) {
                this.onRowsSelectionChange([]);
                this.scrollToTop();
            }
            this.setSelectedFilteredRowsCount();
            this.dataLoaded.emit();
            this.dataLoadContextSubject.next({
                associatedRecordId: this.state.associatedRecordId,
                associatedRoleName: this.state.associatedRoleName,
                filterExpression: this.state.filterExpression,
                namedFilterOptions: this.state.namedFilterOptions
            });
            this.changeDetector.markForCheck();
        }), catchError((err) => {
            onRequestEnd();
            return throwError(err);
        }));
    }
    getHeaders() {
        return {
            'Should-Query-All-Locales': this.state.showDataForAllLocales ? 'true' : []
        };
    }
    getNamedFilterOptionsState(columns) {
        return columns.reduce((result, col) => {
            if (col.predefinedFilterPresets) {
                result[col.fieldId] = col.predefinedFilterPresets.sort((a, b) => a.index - b.index);
            }
            return result;
        }, {});
    }
    getProgrammaticActionButtons(recordGridActionButtons) {
        return recordGridActionButtons.map((actionButton) => {
            let actionButtonConfig;
            if (isFunction(actionButton.disabled) || isFunction(actionButton.hidden)) {
                actionButtonConfig = this.rowSelectionChanged.pipe(map((selectedItems) => {
                    return Object.assign(Object.assign({}, actionButton), { disabled: isFunction(actionButton.disabled)
                            ? actionButton.disabled(selectedItems)
                            : actionButton.disabled, hidden: isFunction(actionButton.hidden) ? actionButton.hidden(selectedItems) : actionButton.hidden });
                }));
            }
            else {
                actionButtonConfig = of(actionButton);
            }
            return {
                guid: actionButton.guid,
                config: actionButtonConfig,
                runtimeViewModelApi: {
                    triggerViewActions: (guid, viewActionTriggerEventName) => this.executeViewActions(actionButton.guid, get(actionButton, 'actions'), this.state.lastActionRow)
                },
                factory: null,
                outlets: null
            };
        });
    }
    getRecordDefinition() {
        if (this.state.getRecordDefinition) {
            return this.state
                .getRecordDefinition()
                .pipe(tap((recordDefinition) => this.rxRecordDefinitionService.applyLocalization(recordDefinition)));
        }
        return this.rxRecordDefinitionCacheService.getRecordDefinition(this.state.recordDefinitionName);
    }
    getRecordDefinitionName() {
        return this.state.recordDefinitionName;
    }
    getSelectedRowCount() {
        return this.adaptTableConfig.selectedItems.length;
    }
    getSelectedRows(inSortOrder = false) {
        if (inSortOrder) {
            // returns selected rows in order of sorting applied to grid
            return intersectionBy(this.adaptTableConfig.data, this.adaptTableConfig.selectedItems, RowDataItemIdFieldName);
        }
        else {
            // returns selected rows in order of selection
            return this.adaptTableConfig.selectedItems;
        }
    }
    getTotalRowCount() {
        return this.getDataBase(null, true);
    }
    getVirtualRowHeight() {
        var _a;
        if (!((_a = this.adaptTableConfig.cardLayoutColumns) === null || _a === void 0 ? void 0 : _a.length)) {
            return RX_RECORD_GRID.defaultRowHeight;
        }
        const singleRowHeight = 32;
        const padding = 3;
        return singleRowHeight * this.visibleColumns.length + 2 * padding;
    }
    hasAssociationAndEmptyRecordId() {
        return Boolean(this.state.associationDefinitionName) && !this.state.associatedRecordId;
    }
    initActionButtons() {
        if (this.isProgrammaticUse) {
            this.actionButtons = this.getProgrammaticActionButtons(this.state.actionButtons);
        }
        else {
            this.actionButtons = get(this.runtimeViewCanvasItemComponent.getChildren(RX_VIEW_DEFINITION.defaultOutletName), '[0].children');
        }
    }
    initAdvancedFilterTexts() {
        this.state.advancedFiltering.filterTexts = {
            initialDropdownAnchorLabel: this.translateService.instant('com.bmc.arsys.rx.client.common.filter-data.label')
        };
    }
    initCustomTexts() {
        this.adaptTableConfig.texts = {
            searchPlaceholder: this.state.searchFieldPlaceholderText,
            emptyStateLabelText: this.state.emptyStateLabelText,
            emptyStateWithFilterLabelText: this.state.emptyStateWithFilterLabelText,
            exportEntireDocument: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.export-all-rows.label'),
            exportSelected: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.export-selected-rows.label')
        };
    }
    initGrid() {
        this.state.guid = this.guid;
        return forkJoin([
            this.rxGridConfiguratorService.getColumnsWithMetadata(this.guid, this.state.columns, this.state.recordDefinition),
            this.guid && this.state.enableFiltering ? this.getSharedFilterPresets() : of(null)
        ]).pipe(switchMap(([columnsWithMetadata, sharedFilterPresets]) => {
            this.state.columnsWithMetadata = columnsWithMetadata;
            this.state.namedFilterOptions = this.getNamedFilterOptionsState(columnsWithMetadata);
            this.isUserAllowedToDeleteRecords = this.state.recordDefinition
                ? this.state.recordDefinition.allowNonAdminToDeleteRecordInstances !== false ||
                    this.rxCurrentUserService.isAdministrator()
                : false;
            this.notifyPropertyChanged('isUserAllowedToDeleteRecords', this.isUserAllowedToDeleteRecords);
            this.addAssociationFieldsToRecordDefinition(columnsWithMetadata);
            // this has to be set prior to calling getGridColumnDefinitions
            this.selectionFieldOptionLabelsByFieldId =
                this.rxGridConfiguratorService.getSelectionFieldOptionLabelsByFieldId(this.state.columns, this.state.recordDefinition);
            this.adaptTableConfig.columnResizeMode = this.state.expandable ? ResizeMode.Expand : ResizeMode.Fit;
            this.adaptTableConfig.columns = this.getGridColumnDefinitions(columnsWithMetadata);
            this.state.advancedFiltering.recordGridFilterConfigs = this.rxRecordGridFilterConfigService.getConfigs();
            this.state.advancedFiltering.filterOptions = this.getAdvancedFilterOptions();
            this.state.advancedFiltering.filterOptions.push({
                id: RX_RECORD_GRID.externalPresetFilterOptionId,
                label: RX_RECORD_GRID.externalPresetFilterOptionId,
                dataType: AdvancedFilterOptionDataType.custom,
                isHidden: true,
                customConfig: {
                    getTagText: (value) => { var _a; return (_a = this.state.advancedFiltering.savedFilters.find((savedFilter) => savedFilter.id === value)) === null || _a === void 0 ? void 0 : _a.name; }
                }
            });
            this.adaptTableConfig.rowSelectionMode = this.state.enableRowSelection;
            this.adaptTableConfig.primaryKey = this.state.recordIdField;
            this.adaptTableConfig.bordered = this.state.bordered;
            this.adaptTableConfig.striped = this.state.striped;
            this.adaptTableConfig.toolbarConfig.rightCustomSection = Boolean(this.state.enableRowSelection && this.adaptTableConfig.data.length);
            this.state.initialFilters = this.rxRecordGridFilterHelperService.getRecordGridFilterDataFromPredefinedFilter(this.state.filters, this.state.recordGridFilters);
            this.clickableWithHrefColumnActions = reduce(columnsWithMetadata, (result, column) => {
                if (column.clickableWithHref) {
                    result[column.fieldId] = column.actions;
                }
                return result;
            }, {});
            if (!isEmpty(this.clickableWithHrefColumnActions)) {
                this.clickableWithHrefActionExpressionEvaluationData = {
                    view: {
                        components: {
                            [this.guid]: {
                                recordDefinition: this.state.recordDefinition
                            }
                        },
                        inputParams: this.runtimeViewModelApi.getViewInputParameters()
                    }
                };
            }
            if (this.guid) {
                return this.rxRecordGridUserPreferencesService.applyUserPreferences(this.adaptTableConfig, this.state.columnsWithMetadata, this.state, sharedFilterPresets);
            }
            return of(null);
        }), tap(() => {
            this.sortedColumnsByTitle = this.getSortedColumnsByTitle();
            this.filteredVisibleColumns = this.sortedColumnsByTitle;
            this.visibleColumns = this.getVisibleColumns();
            this.isFilterBySelectionButtonVisible = this.state.enableFiltering && some(this.visibleColumns, 'filterable');
            this.initActionButtons();
            this.initRowActionButtons();
            if (!this.state.viewPresetSelector) {
                // #ADAPT-8052 workaround.
                this.avoidSystemColumnExpansion();
                this.loadRowData();
            }
            this.updateToolbarTags(this.state.advancedFiltering.toolbarTags);
            this.updateAdaptTableFilters();
        }));
    }
    // #ADAPT-8052 workaround. System column width changes when removing a column from the grid.
    // If all columns have custom width in percents, proportionally increase the width of all columns.
    // If all columns have custom width in pixels, change the largest column width property to auto-expandable (width = null).
    // If % and px are both used, change the largest column width in % to auto-expandable (width= null).
    // If Actions column has customized width, avoid width change when possible. Preserving width in pixels is in priority.
    // Note:
    // Those column width modifications applied during initial rendering of the grid are not saved to User preferences,
    // because it is not the user intention but a workaround.
    avoidSystemColumnExpansion() {
        if (this.adaptTableConfig.cardLayoutColumns) {
            this.avoidSystemCardColumnExpansion();
            return;
        }
        const columnsWithWidthInPixels = [];
        const columnsWithWidthInPercent = [];
        const visibleActionsColumn = find(this.adaptTableConfig.columns, {
            field: RX_RECORD_GRID.actionsColumnFieldDefinition.id,
            hidden: false
        });
        let maxWidthInPixels = 0;
        let maxWidthInPercent = 0;
        let totalWidthInPercent = 0;
        const isEveryVisibleColumnWithCustomWidth = this.adaptTableConfig.columns.every((column) => {
            if (!column.hidden) {
                if (isNil(column.width)) {
                    return false;
                }
                const columnWidth = parseFloat(column.width);
                if (column.width.endsWith('px')) {
                    columnsWithWidthInPixels.push(column);
                    if (column !== visibleActionsColumn) {
                        maxWidthInPixels = Math.max(maxWidthInPixels, columnWidth);
                    }
                }
                else {
                    columnsWithWidthInPercent.push(column);
                    totalWidthInPercent += columnWidth;
                    if (column !== visibleActionsColumn) {
                        maxWidthInPercent = Math.max(maxWidthInPercent, columnWidth);
                    }
                }
            }
            return true;
        });
        if (isEveryVisibleColumnWithCustomWidth && totalWidthInPercent < 100) {
            const hasColumnsWithWidthInPercent = Boolean(columnsWithWidthInPercent.length);
            const hasColumnsWithWidthInPixels = Boolean(columnsWithWidthInPixels.length);
            if (hasColumnsWithWidthInPercent && !hasColumnsWithWidthInPixels) {
                columnsWithWidthInPercent.forEach((column) => {
                    column.width = `${((parseFloat(column.width) / totalWidthInPercent) * 100).toFixed(4)}%`;
                });
            }
            if (!hasColumnsWithWidthInPercent && hasColumnsWithWidthInPixels) {
                if (columnsWithWidthInPixels.length === 1 && visibleActionsColumn) {
                    visibleActionsColumn.width = null;
                    visibleActionsColumn.minWidth = null;
                }
                else {
                    findLast(columnsWithWidthInPixels, (column) => {
                        if (parseInt(column.width) === maxWidthInPixels && column !== visibleActionsColumn) {
                            column.width = null;
                            column.minWidth = null;
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                }
            }
            if (hasColumnsWithWidthInPercent && hasColumnsWithWidthInPixels) {
                if (columnsWithWidthInPercent.length === 1 && visibleActionsColumn) {
                    visibleActionsColumn.width = null;
                    visibleActionsColumn.minWidth = null;
                }
                else {
                    findLast(columnsWithWidthInPercent, (column) => {
                        if (parseFloat(column.width) === maxWidthInPercent && column !== visibleActionsColumn) {
                            column.width = null;
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                }
            }
        }
    }
    // This is a workaround for Adapt defect on System column (checkbox)
    // when the user is using an Ios device and the grid is in card mode.
    // It seems setting the columns in % does not work correctly, in the case of
    // card display we have only two columns with 35% and 65%, however
    // the Adapt grid tries to display the cards around 50% each.
    // For example for an Iphone 14 Pro on Xcode simulator the grid total size is 359px:
    // -> 96.31px for the system column (instead of 33px),
    // -> 130.34px for the second column,
    // -> 131.34px for the third column,
    // In order to "fix" the issue, the user has to "tap" on the separator
    // between columns 2 and 3, which then seems to "redraw" the grid.
    // Workaround:
    // Setting the values of both columns in px instead of % solves the problem.
    // For now, we only apply this workaround on ios platform.
    avoidSystemCardColumnExpansion() {
        if (!this.adaptDeviceDetectionService.iosPlatform()) {
            return;
        }
        const adaptSystemColumnWidth = 33;
        const availableColumnWidth = this.adaptTable.dataHeaderCells.reduce((accum, cell) => accum + cell.element.nativeElement.offsetWidth, 0) -
            adaptSystemColumnWidth;
        this.adaptTableConfig.cardLayoutColumns.forEach((column) => {
            column.width = `${((parseFloat(column.width) * availableColumnWidth) / 100).toFixed(4)}px`;
        });
    }
    initRecordDefinitions() {
        this.setRecordDefinition(null);
        this.state.associationDescriptors = [];
        const hasAssociatedRecordFieldColumns = some(this.state.columns, (column) => this.rxRecordGridUtilsService.isAssociatedRecordFieldId(column.fieldId));
        return forkJoin([
            this.getRecordDefinition(),
            hasAssociatedRecordFieldColumns ? this.getAssociationDescriptors() : of([])
        ]).pipe(tap(([recordDefinition, associationDescriptors]) => {
            this.setRecordDefinition(recordDefinition);
            this.state.associationDescriptors = associationDescriptors;
        }), map(([recordDefinition]) => recordDefinition));
    }
    initRowActionButtons() {
        if (this.isProgrammaticUse) {
            this.rowActionButtons = this.getProgrammaticActionButtons(this.state.rowActionButtons);
        }
        else {
            this.rowActionButtons = get(this.runtimeViewCanvasItemComponent.getChildren(RX_RECORD_GRID.rowActionsOutletName), '[0].children');
        }
    }
    isDownloadableAttachmentColumn(column) {
        const recordDefinitionType = get(this.state.recordDefinition, 'resourceType');
        const fieldDefinitionType = get(column, 'fieldDefinition.resourceType');
        return (!this.isProgrammaticUse &&
            (recordDefinitionType === RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType ||
                recordDefinitionType === RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType) &&
            fieldDefinitionType === RX_RECORD_DEFINITION.dataTypes.attachment.resourceType);
    }
    isRangeFilter(fieldId) {
        const rangeFields = [
            RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType,
            RX_RECORD_DEFINITION.dataTypes.dateTime.resourceType,
            RX_RECORD_DEFINITION.dataTypes.timeOnly.resourceType,
            RX_RECORD_DEFINITION.dataTypes.integer.resourceType,
            RX_RECORD_DEFINITION.dataTypes.decimal.resourceType,
            RX_RECORD_DEFINITION.dataTypes.real.resourceType
        ];
        const fieldDefinition = this.state.recordDefinition.fieldDefinitionsById[fieldId];
        return includes(rangeFields, fieldDefinition.resourceType);
    }
    isSharedFilterPreset(savedFilter) {
        return Boolean(savedFilter.filterExpression);
    }
    loadRowData(loadMore) {
        this.getGridData(loadMore).subscribe();
    }
    openSortByDialogFn(config) {
        this.cardLayoutOpenedModal = this.adaptModalService.open(config);
        return this.cardLayoutOpenedModal;
    }
    prepareQueryParamsAndQueryArgs(onlyForTotalCount) {
        const primaryKey = this.adaptTableConfig.primaryKey;
        const queryParams = Object.assign(Object.assign({}, this.getBaseDataPageParams()), { shouldIncludeTotalSize: onlyForTotalCount, pageSize: onlyForTotalCount ? 0 : this.adaptTableConfig.rows, startIndex: onlyForTotalCount ? 0 : this.adaptTableConfig.first });
        if (this.cursor && !onlyForTotalCount) {
            queryParams.cursor = this.cursor;
        }
        if (!onlyForTotalCount) {
            queryParams.propertySelection = chain(this.adaptTableConfig.columns
                .filter((col) => !col.isRowActionsColumn && (this.state.getDataForHiddenColumns || !col.hidden || col.referenced))
                .map((col) => col.field))
                .union([primaryKey])
                .value();
        }
        const multiSortMeta = this.adaptTableConfig.multiSortMeta;
        if (!onlyForTotalCount && multiSortMeta && multiSortMeta.length) {
            queryParams.sortBy = multiSortMeta.map((metaItem) => metaItem.order === SortOrder.Asc ? `${metaItem.field}` : `-${metaItem.field}`);
        }
        const searchText = get(this.adaptTableConfig.filters, 'global.value', '').toString().trim();
        const textSearchQuery = this.rxRecordGridFilterService.generateTextFilterQuery(searchText, this.adaptTableConfig.columns);
        const appliedSharedFilterPreset = this.state.advancedFiltering.appliedSharedFilterPreset;
        const sharedFilterPresetExpression = appliedSharedFilterPreset && appliedSharedFilterPreset.filterExpression
            ? `(${appliedSharedFilterPreset.filterExpression})`
            : null;
        const resultingQuery = this.rxRecordGridFilterService.addQueries(this.rxRecordGridFilterService.getQueryFromRecordGridFilterData(this.state.initialFilters, this.state.recordDefinition.fieldDefinitionsById), this.buildQueryByAdvancedFilters(this.state.advancedFiltering.selectedFilters), textSearchQuery, this.state.filterExpression, sharedFilterPresetExpression);
        if (resultingQuery) {
            queryParams.queryExpression = resultingQuery;
        }
        return queryParams;
    }
    refresh() {
        return this.initializationCompleted$.pipe(switchMap(() => this.getGridData()), switchMapTo(EMPTY));
    }
    saveViewPreset(viewPresetGuid) {
        this.rxRecordGridUserPreferencesService.saveViewPreset(viewPresetGuid);
        this.userPreferencesChanged$.next();
        return EMPTY;
    }
    scrollToTop() {
        if (this.adaptTable) {
            const scrollableBodyElement = this.adaptTable.getScrollableBodyElement();
            if (scrollableBodyElement) {
                scrollableBodyElement.scrollTop = 0;
            }
        }
    }
    setFilter(newFilter) {
        this.state.advancedFiltering.selectedFilters = newFilter;
    }
    setRecordDefinition(recordDefinition) {
        this.state.recordDefinition = cloneDeep(recordDefinition);
        if (recordDefinition) {
            this.state.recordDefinition.fieldDefinitionsById = this.rxRecordDefinitionService.buildFieldDefinitionsByIdMap(this.state.recordDefinition);
        }
        this.notifyPropertyChanged('recordDefinition', this.state.recordDefinition);
    }
    setSelectedFilteredRowsCount() {
        this.selectedFilteredRowsCount = this.adaptTable.hasFilter() ? this.getSelectedRows().length : 0;
    }
    sortRows(rows) {
        rows.sort((firstRow, secondRow) => this.compareRows(firstRow, secondRow));
        forEach(rows, (row) => {
            var _a;
            if ((_a = row.items) === null || _a === void 0 ? void 0 : _a.length) {
                this.sortRows(row.items);
            }
        });
    }
    toggleCellSelection(columns, rowItem, popover, isCardLayout) {
        if (this.state.enableFiltering) {
            if (!isCardLayout) {
                const column = columns[0];
                if (column.filterable) {
                    const existingPendingFilter = find(this.state.advancedFiltering.pendingSelectedFilters, {
                        filterOptionId: column.field
                    });
                    const filterValue = !rowItem[column.field] && rowItem[column.field] !== 0 ? '$NULL$' : rowItem[column.field];
                    const fieldDefinition = this.state.recordDefinition.fieldDefinitionsById[column.field];
                    const isRangeFilter = this.isRangeFilter(column.field);
                    const isRequiredBooleanFilter = fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.boolean.resourceType &&
                        this.rxFieldDefinitionService.isRequiredField(fieldDefinition);
                    const isFilterAvailable = !((isRangeFilter && existingPendingFilter && existingPendingFilter.value.length === 2) ||
                        (isRequiredBooleanFilter && existingPendingFilter) ||
                        (filterValue === '$NULL$' && (isRangeFilter || isRequiredBooleanFilter)));
                    if (existingPendingFilter) {
                        if (this.isCellSelected(popover)) {
                            const elementIndex = findIndex(existingPendingFilter.value, filterValue);
                            existingPendingFilter.value.splice(elementIndex, 1);
                            this.trackPopoverAnchor(popover);
                            if (!existingPendingFilter.value.length) {
                                remove(this.state.advancedFiltering.pendingSelectedFilters, existingPendingFilter);
                            }
                        }
                        else if (isFilterAvailable) {
                            existingPendingFilter.value.push(filterValue);
                            this.trackPopoverAnchor(popover);
                        }
                    }
                    else if (isFilterAvailable) {
                        const selectedFilter = {
                            filterOptionId: column.field,
                            value: [filterValue]
                        };
                        this.state.advancedFiltering.pendingSelectedFilters.push(selectedFilter);
                        this.trackPopoverAnchor(popover);
                    }
                }
            }
            else {
                const filterableColumns = columns.filter((column) => {
                    const fieldDefinition = this.state.recordDefinition.fieldDefinitionsById[column.field];
                    const isRequiredBooleanFilter = fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.boolean.resourceType &&
                        this.rxFieldDefinitionService.isRequiredField(fieldDefinition);
                    return column.filterable && !isRequiredBooleanFilter;
                });
                const isCellSelected = this.isCellSelected(popover);
                forEach(filterableColumns, (column) => {
                    if (column.filterable) {
                        const filterValue = !rowItem[column.field] && rowItem[column.field] !== 0 ? '$NULL$' : rowItem[column.field];
                        if (!this.state.advancedFiltering.selectedCardValues[column.field]) {
                            this.state.advancedFiltering.selectedCardValues[column.field] = [filterValue];
                        }
                        else if (isCellSelected) {
                            remove(this.state.advancedFiltering.selectedCardValues[column.field], filterValue);
                        }
                        else {
                            this.state.advancedFiltering.selectedCardValues[column.field].push(filterValue);
                        }
                    }
                });
            }
        }
    }
    trackPopoverAnchor(cellPopover) {
        var _a, _b;
        if (this.isCellSelected(cellPopover)) {
            const isCurrentPopoverLast = cellPopover === last(this.popovers);
            remove(this.popovers, cellPopover);
            if (isCurrentPopoverLast) {
                cellPopover.close();
                (_a = last(this.popovers)) === null || _a === void 0 ? void 0 : _a.open();
            }
        }
        else {
            (_b = last(this.popovers)) === null || _b === void 0 ? void 0 : _b.close();
            this.popovers.push(cellPopover);
            cellPopover.open();
        }
    }
    updateAdaptTableFilters() {
        const globalFilter = this.adaptTable.filters.global;
        this.adaptTable.filters = this.areUserFiltersApplied() ? { dummyFilter: {} } : {};
        if (globalFilter) {
            this.adaptTable.filters.global = globalFilter;
        }
    }
    updateToolbarItems() {
        if (this.adaptTable) {
            const toolbarComponent = this.adaptTable.toolbarComponent;
            const filterSection = toolbarComponent.toolbarContentItems.find((toolbarContentItem) => toolbarContentItem.adaptToolbarItem === ToolbarItemsByPriority.FILTER);
            setTimeout(() => {
                // don't update toolbar items when filter is hidden
                if (filterSection && !filterSection.itemContext.hidden) {
                    toolbarComponent.updateToolbarItems();
                }
            });
        }
    }
    getExportSelectedText(selectedItems) {
        return selectedItems.length > 1 ? this.exportSelectedRowsText : this.exportSelectedRowText;
    }
    getFiltersRequiredMessage(requiredFiltersCount) {
        return requiredFiltersCount > 1
            ? this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.require-filtering.missing-filters-warning.message', {
                requiredFiltersCount: requiredFiltersCount
            })
            : this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.require-filtering.missing-filter-warning.message');
    }
}
RecordGridComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridComponent, deps: [{ token: i1.AdaptDeviceDetectionService }, { token: i1.AdaptModalService }, { token: i0.ChangeDetectorRef }, { token: i2.DatePipe }, { token: i2.DecimalPipe }, { token: i0.NgZone }, { token: i3.RxAssociationInstanceDataPageService }, { token: i4.RxBooleanPipe }, { token: i4.RxCurrentUserService }, { token: i5.RxExpressionEvaluatorService }, { token: i6.RxFieldDefinitionService }, { token: i7.RxRecordGridConfiguratorService }, { token: i8.RxGuidService }, { token: i4.RxLogService }, { token: i4.RxNotificationService }, { token: i8.RxObjectUtilsService }, { token: i6.RxRecordDefinitionCacheService }, { token: i6.RxRecordDefinitionService }, { token: i9.RxRecordGridAdvancedFilteringService }, { token: i10.RxRecordGridConfigUtilsService }, { token: i11.RxRecordGridFilterConfigService }, { token: i12.RxRecordGridFilterService }, { token: i13.RxRecordGridFilterHelperService }, { token: i14.RxRecordGridSharedFilterPresetsCacheService }, { token: i15.RxRecordGridUserPreferencesService }, { token: i16.RxRecordGridUtilsService }, { token: i6.RxRecordInstanceDataPageService }, { token: i6.RxRecordInstanceService }, { token: i5.RxViewActionService }, { token: i5.RxViewActionUtilsService }, { token: i17.TranslateService }, { token: i0.ElementRef }, { token: i8.RxStringService }, { token: i4.RxGlobalEventsService }, { token: i18.PageComponent, optional: true }, { token: i19.RuntimeViewCanvasItemComponent, optional: true }], target: i0.ɵɵFactoryTarget.Component });
RecordGridComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridComponent, selector: "rx-record-grid", inputs: { config: "config" }, outputs: { dataLoaded: "dataLoaded" }, host: { listeners: { "document:click": "onClickOutside($event)" } }, providers: [RxRecordGridUserPreferencesService], viewQueries: [{ propertyName: "adaptTable", first: true, predicate: ["adaptTable"], descendants: true, static: true }, { propertyName: "adaptAdvancedFilter", first: true, predicate: ["adaptAdvancedFilter"], descendants: true }, { propertyName: "cardLayoutRowDetailsTemplate", first: true, predicate: ["cardLayoutRowDetailsTemplate"], descendants: true, static: true }, { propertyName: "cellTemplate", first: true, predicate: ["cellTemplate"], descendants: true, static: true }, { propertyName: "filterTemplate", first: true, predicate: ["filterTemplate"], descendants: true, static: true }, { propertyName: "leftCustomSectionTemplate", first: true, predicate: ["leftCustomSectionTemplate"], descendants: true, static: true }, { propertyName: "rightCustomSectionTemplate", first: true, predicate: ["rightCustomSectionTemplate"], descendants: true, static: true }, { propertyName: "rowActionButtonsTemplate", first: true, predicate: ["rowActionButtonsTemplate"], descendants: true, static: true }, { propertyName: "visibleColumnsMenuTemplate", first: true, predicate: ["visibleColumnsMenuTemplate"], descendants: true, static: true }, { propertyName: "fieldsProvider", first: true, predicate: RxAdvancedFilteringFieldsProviderComponent, descendants: true, static: true }, { propertyName: "actionButtonComponents", predicate: ActionButtonComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<adapt-table\n  #adaptTable\n  rxCardLayout\n  scrollHeight=\"flex\"\n  (changedCardLayout)=\"onChangedCardLayout($event)\"\n  [cardLayoutWidth]=\"state.cardLayoutWidth\"\n  [cardLayoutFieldsHeaderTemplate]=\"cardLayoutFieldsHeaderTemplate\"\n  [cardLayoutFieldsDataCellTemplate]=\"cardLayoutFieldsDataCellTemplate\"\n  [cardLayoutValuesDataCellTemplate]=\"cardLayoutValuesDataCellTemplate\"\n  [cardLayoutValuesHeaderTemplate]=\"cardLayoutValuesHeaderTemplate\"\n  [cardLayoutRecordGridElementRef]=\"elementRef\"\n  [cardLayoutGetDataCellClass]=\"getDataCellClassBind\"\n  [value]=\"adaptTableConfig.data\"\n  [columns]=\"adaptTableConfig.cardLayoutColumns || adaptTableConfig.columns\"\n  [rows]=\"adaptTableConfig.rows\"\n  [first]=\"adaptTableConfig.first\"\n  [scrollable]=\"adaptTableConfig.scrollable\"\n  [sortable]=\"true\"\n  [rowExpandMode]=\"\"\n  [sortMode]=\"'multiple'\"\n  [resizableColumns]=\"true\"\n  [columnResizeMode]=\"adaptTableConfig.columnResizeMode\"\n  [selectionMode]=\"adaptTableConfig.rowSelectionMode\"\n  [selection]=\"adaptTableConfig.selectedItems\"\n  [toolbarConfig]=\"adaptTableConfig.toolbarConfig\"\n  [filterable]=\"adaptTableConfig.filterable\"\n  [filters]=\"adaptTableConfig.filters\"\n  [multiSortMeta]=\"adaptTableConfig.multiSortMeta\"\n  [dataKey]=\"adaptTableConfig.primaryKey\"\n  [bordered]=\"adaptTableConfig.bordered\"\n  [totalRecords]=\"adaptTableConfig.totalRecords\"\n  [totalRecordsInGroup]=\"state.expandGroups ? adaptTableConfig.totalRecords : 0\"\n  [lazy]=\"true\"\n  [lazyLoadOnInit]=\"false\"\n  [loading]=\"adaptTableConfig.isLoadingData\"\n  [enableInfiniteScrolling]=\"true\"\n  [expandedGroupsKeys]=\"adaptTableConfig.expandedGroupsKeys\"\n  [loadingMore]=\"adaptTableConfig.isLoadingMoreData\"\n  [suppressTooltip]=\"false\"\n  [virtualScroll]=\"adaptTableConfig.virtualScroll\"\n  [virtualRowHeight]=\"adaptTableConfig.virtualRowHeight\"\n  (selectionChange)=\"onRowsSelectionChange($event)\"\n  (onSort)=\"onSort($event)\"\n  (onLazyLoad)=\"onLazyLoad($event)\"\n  (onColReorder)=\"onColReorder($event)\"\n  [striped]=\"adaptTableConfig.striped\"\n  [texts]=\"adaptTableConfig.texts\"\n  (onColResize)=\"onColumnResize()\"\n  (export)=\"onExport($event)\"\n  [selectedFilteredRowsCount]=\"selectedFilteredRowsCount\"\n  [headerSelectionMode]=\"adaptTableHeaderSelectionMode\"\n  (onHeaderCheckboxToggle)=\"handleHeaderCheckboxToggle($event)\"\n></adapt-table>\n\n<ng-template #visibleColumnsMenuTemplate>\n  <adapt-rx-search\n    [(ngModel)]=\"columnSearchText\"\n    [placeholder]=\"\n      'com.bmc.arsys.rx.client.view-components.record-grid.visible-columns-menu.search.placeholder' | translate\n    \"\n    [autofocus]=\"true\"\n    (ngModelChange)=\"onSearchColumns()\"\n  >\n  </adapt-rx-search>\n  <div\n    class=\"dropdown-item visible-columns-item px-3\"\n    *ngFor=\"let column of filteredVisibleColumns; trackBy: trackByColumnField\"\n    (click)=\"$event.stopPropagation()\"\n  >\n    <adapt-rx-checkbox\n      class=\"m-0 adapt-table-toolbar__column-visibility-control\"\n      [label]=\"column.header || column.fallbackTitle\"\n      [ngModel]=\"!column.hidden\"\n      (ngModelChange)=\"onColumnVisibilityChange($event, column)\"\n    ></adapt-rx-checkbox>\n  </div>\n  <adapt-empty-state\n    *ngIf=\"!filteredVisibleColumns.length\"\n    [type]=\"'search'\"\n    [label]=\"'com.bmc.arsys.rx.client.view-components.record-grid.visible-columns-menu.empty.label' | translate\"\n  >\n  </adapt-empty-state>\n</ng-template>\n\n<ng-template #rightCustomSectionTemplate>\n  <div class=\"px-2\" rx-id=\"selected-row-count\">\n    <ng-container *ngIf=\"isTotalRecordCountKnown\">\n      {{ getMultipleRowsSelectedText() }}\n    </ng-container>\n\n    <ng-container *ngIf=\"!isTotalRecordCountKnown\">\n      <div class=\"d-flex align-items-center\">\n        {{ getMultipleRowsSelectedTextFirstPart() }}\n        <button type=\"button\" class=\"btn btn-link p-0 mx-1\" (click)=\"loadTotalRowCount()\">\n          {{ getLoadRecordCountLinkText() }}\n        </button>\n        {{ getMultipleRowsSelectedTextSecondPart() }}\n      </div>\n    </ng-container>\n  </div>\n</ng-template>\n\n<ng-template #leftCustomSectionTemplate>\n  <div [adaptSubnav] *ngIf=\"shouldDisplayActionButtons\" class=\"pl-1 w-100 align-items-center\">\n    <div [adaptSubnavItem]=\"actionButtonTemplate\" *ngFor=\"let actionButton of actionButtons\">\n      <ng-template #actionButtonTemplate let-hidden>\n        <rx-action-button\n          class=\"m-1\"\n          [guid]=\"actionButton.guid\"\n          [config]=\"getActionButtonConfig(hidden, actionButton.config)\"\n          [runtimeViewModelApi]=\"actionButton.runtimeViewModelApi\"\n        ></rx-action-button>\n      </ng-template>\n    </div>\n\n    <div [adaptSubnavDropdown]>\n      <button type=\"button\" class=\"btn btn-secondary btn-xs d-icon-triangle_down ml-1\"></button>\n    </div>\n  </div>\n</ng-template>\n\n<ng-template #filterTemplate let-context>\n  <button\n    type=\"button\"\n    class=\"btn btn-link d-icon-refresh grid-toolbar-icon ml-2 p-1\"\n    [ngClass]=\"{ 'd-block': context.hidden }\"\n    rx-id=\"refresh-button\"\n    [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.refresh.label' | translate\"\n    (click)=\"onRefreshClick()\"\n  ></button>\n\n  <adapt-advanced-filter\n    #adaptAdvancedFilter\n    *ngIf=\"state.enableFiltering\"\n    class=\"ml-2\"\n    [ngClass]=\"{ 'd-inline-block': context.hidden, 'd-block': !context.hidden }\"\n    [appendDropdownToBody]=\"true\"\n    [texts]=\"state.advancedFiltering.filterTexts\"\n    [showAnchorButtonLabel]=\"!context.collapsed\"\n    [filterOptions]=\"state.advancedFiltering.filterOptions\"\n    (selectedFiltersChange)=\"onAdvancedFiltersChange($event)\"\n    [selectedFilters]=\"state.advancedFiltering.selectedFilters\"\n    [savedFilters]=\"state.advancedFiltering.savedFilters\"\n    [enableSavedFilters]=\"!!guid && state.enableFilterPresets\"\n    (deleteSavedFilter)=\"onDeleteSavedFilterPreset($event)\"\n    (createNewFilter)=\"onCreateNewFilterPreset($event)\"\n    (updateSavedFilter)=\"onUpdateSavedFilterPreset($event)\"\n    [activeSavedFilter]=\"state.advancedFiltering.activeSavedFilter\"\n    (activeSavedFilterChange)=\"onActiveSavedAdvancedFilterChange($event)\"\n    (beforeActiveSavedFilterChange)=\"onBeforeActiveSavedFilterChange($event)\"\n    (editSavedFilterClick)=\"onEditSavedFilterClick($event)\"\n    [isLoading]=\"state.advancedFiltering.isLoading\"\n    [selectedFiltersIndicationStyle]=\"'mark'\"\n    (filterExpressionTagsChanged)=\"onAdvancedFilterExpressionTagsChanged($event)\"\n    [applyFiltersByUserAction]=\"true\"\n  ></adapt-advanced-filter>\n\n  <span\n    *ngIf=\"(context.collapsed || context.hidden) && state.advancedFiltering.toolbarTags.length\"\n    class=\"btn-link ml-1\"\n    >{{\n      'com.bmc.arsys.rx.client.view-components.record-grid.filters.number-of-active-filters.label'\n        | translate: { count: state.advancedFiltering.toolbarTags.length }\n    }}</span\n  >\n\n  <rx-filter-tags\n    class=\"ml-2\"\n    [hidden]=\"context.collapsed || context.hidden\"\n    [tags]=\"state.advancedFiltering.toolbarTags\"\n    [tagsLimit]=\"state.filterTagsLimit\"\n    (removeTag)=\"onRemoveFilterTag($event)\"\n  ></rx-filter-tags>\n</ng-template>\n\n<ng-template #cellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div\n    *ngIf=\"column.cellDisplayProperties\"\n    class=\"rx-custom-cell rx-ellipsis\"\n    [rxCellDisplayProps]=\"column.cellDisplayProperties\"\n    [rxCellDisplayPropsBadgeElem]=\"badgeElem\"\n    [rxCellDisplayPropsDataItem]=\"dataItem\"\n    #popoverAnchor=\"adaptPopover\"\n    [adaptPopover]=\"filterButton\"\n    [autoClose]=\"false\"\n    [popoverClass]=\"'table-filtering'\"\n    [triggers]=\"'manual'\"\n    [appendToBody]=\"true\"\n    [placement]=\"'top'\"\n    [class.rx-selected-custom-cell]=\"isCellSelected(popoverAnchor)\"\n    (click)=\"onCellClick($event, [column], dataItem, popoverAnchor)\"\n    (mouseover)=\"onCellMouseOver($event)\"\n  >\n    <span #badgeElem (click)=\"$event.stopPropagation()\" [ngClass]=\"{ 'rx-cell-wrap': column.wrapText }\">\n      <ng-template\n        [ngTemplateOutlet]=\"column.customTemplate || defaultCellTemplate\"\n        [ngTemplateOutletContext]=\"{ column: column, dataItem: dataItem }\"\n      >\n      </ng-template>\n    </span>\n  </div>\n\n  <div\n    *ngIf=\"!column.cellDisplayProperties\"\n    class=\"rx-custom-cell rx-ellipsis\"\n    #popoverAnchor=\"adaptPopover\"\n    [adaptPopover]=\"filterButton\"\n    [autoClose]=\"false\"\n    [popoverClass]=\"'table-filtering'\"\n    [triggers]=\"'manual'\"\n    [appendToBody]=\"true\"\n    [placement]=\"'top'\"\n    [class.rx-selected-custom-cell]=\"isCellSelected(popoverAnchor)\"\n    (click)=\"onCellClick($event, [column], dataItem, popoverAnchor)\"\n    (mouseover)=\"onCellMouseOver($event)\"\n  >\n    <span (click)=\"$event.stopPropagation()\" [ngClass]=\"{ 'rx-cell-wrap': column.wrapText }\">\n      <ng-template\n        [ngTemplateOutlet]=\"column.customTemplate || defaultCellTemplate\"\n        [ngTemplateOutletContext]=\"{ column: column, dataItem: dataItem }\"\n      >\n      </ng-template>\n    </span>\n  </div>\n</ng-template>\n\n<ng-template #defaultCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <ng-container\n    *ngIf=\"\n      (!column.clickable ||\n        (column.clickableWithHref &&\n          !dataItem[column.field + '$ROUTER_LINK$'] &&\n          !dataItem[column.field + '$LAUNCH_URL$'])) &&\n      !column.isDownloadableAttachment\n    \"\n  >\n    <span [ngClass]=\"{ 'rx-cell-wrap': column.wrapText }\"> {{ getCellValue(dataItem, column) }}</span>\n  </ng-container>\n\n  <a\n    tabindex=\"0\"\n    class=\"attachment-link\"\n    *ngIf=\"!column.clickable && column.isDownloadableAttachment\"\n    (click)=\"downloadAttachment(dataItem, column, getCellValue(dataItem, column))\"\n    (keydown)=\"downloadAttachment(dataItem, column, getCellValue(dataItem, column), $event)\"\n  >\n    <span [ngClass]=\"{ 'rx-cell-wrap': column.wrapText }\">\n      {{ getCellValue(dataItem, column) }}\n    </span>\n  </a>\n\n  <a\n    tabindex=\"0\"\n    class=\"no-href-link\"\n    *ngIf=\"column.clickable && !column.clickableWithHref\"\n    (click)=\"gridEvents.cellClick(dataItem, column.field)\"\n    (keydown)=\"gridEvents.cellKeyDown($event, dataItem, column.field)\"\n  >\n    <span [ngClass]=\"{ 'rx-cell-wrap': column.wrapText }\">\n      {{ getCellValue(dataItem, column) }}\n    </span>\n  </a>\n\n  <a\n    *ngIf=\"column.clickableWithHref && dataItem[column.field + '$ROUTER_LINK$']\"\n    [routerLink]=\"'/' + dataItem[column.field + '$ROUTER_LINK$']\"\n    [queryParams]=\"dataItem[column.field + '$QUERY_PARAMS$']\"\n  >\n    <span [ngClass]=\"{ 'rx-cell-wrap': column.wrapText }\">\n      {{ getCellValue(dataItem, column) }}\n    </span>\n  </a>\n\n  <a\n    *ngIf=\"column.clickableWithHref && dataItem[column.field + '$LAUNCH_URL$']\"\n    [href]=\"dataItem[column.field + '$LAUNCH_URL$']\"\n    [target]=\"dataItem[column.field + '$TARGET$']\"\n  >\n    <span [ngClass]=\"{ 'rx-cell-wrap': column.wrapText }\">\n      {{ getCellValue(dataItem, column) }}\n    </span>\n  </a>\n</ng-template>\n\n<ng-template #cardLayoutFieldsHeaderTemplate let-column=\"column\">\n  <rx-card-layout-cell-header\n    [title]=\"column.header || column.fallbackTitle\"\n    [columns]=\"adaptTableConfig.columns\"\n    [adaptTable]=\"adaptTable\"\n    [openDialog]=\"openSortByDialog\"\n    (sort)=\"onSortCards($event)\"\n  ></rx-card-layout-cell-header>\n</ng-template>\n\n<ng-template #cardLayoutValuesHeaderTemplate let-column=\"column\">\n  <rx-card-layout-cell-header\n    [title]=\"column.header || column.fallbackTitle\"\n    [columns]=\"adaptTableConfig.columns\"\n    [adaptTable]=\"adaptTable\"\n    [openDialog]=\"openSortByDialog\"\n    (sort)=\"onSortCards($event)\"\n  ></rx-card-layout-cell-header>\n</ng-template>\n\n<ng-template #cardLayoutFieldsDataCellTemplate>\n  <div class=\"rx-card-layout-cell\" (click)=\"onCellClick($event)\">\n    <div\n      class=\"rx-card-layout-cell-item\"\n      *ngFor=\"let column of visibleColumns; trackBy: trackByColumnField\"\n      [attr.data-testid]=\"column.testId + '-name'\"\n    >\n      {{ column.header || column.fallbackTitle }}:\n    </div>\n  </div>\n</ng-template>\n\n<ng-template #cardLayoutValuesDataCellTemplate let-dataItem=\"dataItem\">\n  <div class=\"rx-card-layout-cell-values rx-card-layout-cell\">\n    <div\n      *ngFor=\"let column of visibleColumns; trackBy: trackByColumnField\"\n      class=\"rx-card-layout-cell-item\"\n      [attr.data-testid]=\"column.testId + '-value'\"\n    >\n      <div *ngIf=\"column.isRowActionsColumn\">\n        <ng-container\n          [ngTemplateOutlet]=\"cardLayoutRowActionButtonsTemplate\"\n          [ngTemplateOutletContext]=\"{ dataItem: dataItem }\"\n        ></ng-container>\n      </div>\n      <div\n        *ngIf=\"\n          (!column.clickable ||\n            (column.clickableWithHref &&\n              !dataItem[column.field + '$ROUTER_LINK$'] &&\n              !dataItem[column.field + '$LAUNCH_URL$'])) &&\n          !column.isDownloadableAttachment &&\n          !column.isRowActionsColumn\n        \"\n      >\n        {{ getCellValue(dataItem, column) }}\n      </div>\n      <a\n        *ngIf=\"!column.clickable && column.isDownloadableAttachment\"\n        tabindex=\"0\"\n        class=\"attachment-link\"\n        (click)=\"downloadAttachment(dataItem, column, getCellValue(dataItem, column))\"\n        (keydown)=\"downloadAttachment(dataItem, column, getCellValue(dataItem, column), $event)\"\n      >\n        {{ getCellValue(dataItem, column) }}\n      </a>\n\n      <a\n        tabindex=\"0\"\n        *ngIf=\"column.clickable && !column.clickableWithHref\"\n        class=\"no-href-link\"\n        (click)=\"gridEvents.cellClick(dataItem, column.field)\"\n        (keydown)=\"gridEvents.cellKeyDown($event, dataItem, column.field)\"\n      >\n        {{ getCellValue(dataItem, column) }}\n      </a>\n\n      <a\n        *ngIf=\"column.clickableWithHref && dataItem[column.field + '$ROUTER_LINK$']\"\n        [routerLink]=\"'/' + dataItem[column.field + '$ROUTER_LINK$']\"\n        [queryParams]=\"dataItem[column.field + '$QUERY_PARAMS$']\"\n      >\n        {{ getCellValue(dataItem, column) }}\n      </a>\n\n      <a\n        *ngIf=\"column.clickableWithHref && dataItem[column.field + '$LAUNCH_URL$']\"\n        [href]=\"dataItem[column.field + '$LAUNCH_URL$']\"\n        [target]=\"dataItem[column.field + '$TARGET$']\"\n      >\n        {{ getCellValue(dataItem, column) }}\n      </a>\n    </div>\n  </div>\n\n  <button\n    *ngIf=\"isFilterBySelectionButtonVisible\"\n    adapt-button\n    rx-id=\"filter-by-selection-button\"\n    class=\"btn btn-link d-icon-filter_adapt filter-by-selection-icon\"\n    (click)=\"onFilterBySelection($event, visibleColumns, dataItem)\"\n  ></button>\n\n  <button\n    class=\"btn btn-link d-icon-pop_up record-details-icon\"\n    rx-id=\"show-record-details-button\"\n    [attr.aria-label]=\"\n      'com.bmc.arsys.rx.client.view-components.record-grid.cards.record-details.button.label' | translate\n    \"\n    (click)=\"openRowDetails(adaptTableConfig.columns, dataItem)\"\n  ></button>\n</ng-template>\n\n<ng-template #cardLayoutRowDetailsTemplate let-close=\"close\" let-getData=\"getData\">\n  <div class=\"modal-body rx-record-details\">\n    <div class=\"row mb-3\" *ngFor=\"let column of getData().columns\">\n      <div class=\"col-sm-4 font-weight-bold rx-text-break\">{{ column.header || column.fallbackTitle }}:</div>\n\n      <div class=\"col-sm-8 rx-text-break\" *ngIf=\"!column.isDownloadableAttachment && !column.isRowActionsColumn\">\n        {{ getCellValue(getData().rowDataItem, column) }}\n      </div>\n\n      <div class=\"col-sm-8\" *ngIf=\"column.isDownloadableAttachment\">\n        <a\n          tabindex=\"0\"\n          class=\"row-details-attachment-link\"\n          (click)=\"downloadAttachment(getData().rowDataItem, column, getCellValue(getData().rowDataItem, column))\"\n          (keydown)=\"\n            downloadAttachment(getData().rowDataItem, column, getCellValue(getData().rowDataItem, column), $event)\n          \"\n        >\n          {{ getCellValue(getData().rowDataItem, column) }}</a\n        >\n      </div>\n\n      <div class=\"col-sm-8\" *ngIf=\"column.isRowActionsColumn\">\n        <ng-container\n          [ngTemplateOutlet]=\"cardLayoutRowActionButtonsTemplate\"\n          [ngTemplateOutletContext]=\"{ dataItem: getData().rowDataItem }\"\n        ></ng-container>\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"close()\">\n      {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #filterButton>\n  <button\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"small\"\n    class=\"d-icon-filter_adapt p-0\"\n    (click)=\"applyFilterBySelection()\"\n  ></button>\n</ng-template>\n\n<ng-template #rowActionButtonsTemplate let-dataItem=\"dataItem\">\n  <div class=\"dropdown dropdown-kabob\" adaptDropdown appendToBody=\"true\" (onOpen)=\"onRowActionOpen(dataItem)\">\n    <button id=\"row-actions-dropdown-button\" class=\"dropdown-kabob-btn\" adaptDropdownToggle></button>\n    <div class=\"dropdown-menu\" aria-labelledby=\"row-actions-dropdown-button\" adaptDropdownMenu>\n      <rx-action-button\n        class=\"action-button-list\"\n        *ngFor=\"let rowActionButton of rowActionButtons\"\n        [guid]=\"rowActionButton.guid\"\n        [config]=\"rowActionButton.config\"\n        [runtimeViewModelApi]=\"rowActionButton.runtimeViewModelApi\"\n      ></rx-action-button>\n\n      <div class=\"empty-list-label pl-3\">\n        {{ 'com.bmc.arsys.rx.client.view-components.record-grid-row-actions.no-actions-available.label' | translate }}\n      </div>\n    </div>\n  </div>\n</ng-template>\n\n<ng-template #cardLayoutRowActionButtonsTemplate let-dataItem=\"dataItem\">\n  <div\n    class=\"dropdown mb-1\"\n    adaptDropdown\n    appendToBody=\"true\"\n    (click)=\"$event.stopPropagation()\"\n    (onOpen)=\"onRowActionOpen(dataItem)\"\n  >\n    <button id=\"card-layout-dropdown-button\" class=\"btn btn-secondary btn-xs\" size=\"xtra-small\" adaptDropdownToggle>\n      {{ 'com.bmc.arsys.rx.client.view-components.record-grid-row-actions.dropdown.label' | translate }}\n    </button>\n    <div class=\"dropdown-menu\" aria-labelledby=\"card-layout-dropdown-button\" adaptDropdownMenu>\n      <rx-action-button\n        class=\"row-actions-dropdown-item\"\n        *ngFor=\"let rowActionButton of rowActionButtons\"\n        [guid]=\"rowActionButton.guid\"\n        [config]=\"rowActionButton.config\"\n        [runtimeViewModelApi]=\"rowActionButton.runtimeViewModelApi\"\n      ></rx-action-button>\n    </div>\n  </div>\n</ng-template>\n\n<rx-advanced-filtering-fields-provider\n  [namedFilterOptionsGetter]=\"getNamedFilterOptions\"\n></rx-advanced-filtering-fields-provider>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;height:420px}:host ::ng-deep .rx-table-card-layout .adapt-selection-cell{vertical-align:middle!important}:host ::ng-deep .rx-table-card-layout .c-header-name{width:100%}:host ::ng-deep .rx-card-layout-data-cell{position:relative}:host ::ng-deep .rx-card-layout-cell-item{padding:0;line-height:32px;min-height:32px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host ::ng-deep .rx-card-layout-cell-values>div:first-child .rx-card-layout-cell-item{padding-right:20px}:host ::ng-deep .rx-card-layout-cell-icon,:host ::ng-deep .filter-by-selection-icon,:host ::ng-deep .record-details-icon{top:2px;padding:2px;position:absolute}:host ::ng-deep .record-details-icon{right:7px}:host ::ng-deep .filter-by-selection-icon{right:25px}:host ::ng-deep adapt-table td.at-data-cell{padding:0;-moz-user-select:text}:host ::ng-deep adapt-table td.rx-cell-selection-mode:focus{outline:none!important}:host ::ng-deep adapt-table adapt-table-toolbar rx-action-button{margin:5px}:host ::ng-deep adapt-table adapt-table-toolbar rx-action-button .btn-link{padding-right:0;padding-left:0}:host ::ng-deep adapt-table .at-wrap-cell-text .at-data-cell{word-break:break-word}:host ::ng-deep .rx-row-action-cell .dropdown{margin-top:3px}.rx-custom-cell{min-height:36px;padding:.5rem 13px}.rx-custom-cell .rx-cell-wrap{white-space:normal;text-overflow:clip;word-break:break-word}.rx-selected-custom-cell{outline:1px solid #00a79d!important;border-color:transparent!important;outline-offset:-1px}.rx-card-layout-cell{padding:3px 10px}:host ::ng-deep .dropdown-menu rx-action-button button.btn{width:100%;text-align:left;background:none;border:0;font-size:.8125rem}:host ::ng-deep .dropdown-menu rx-action-button button.btn:before{width:18px}:host ::ng-deep .dropdown-menu rx-action-button button.btn>span{margin-left:18px}:host ::ng-deep .dropdown-menu rx-action-button button.btn[class^=d-icon-left]>span{margin-left:0!important}.grid-toolbar-icon{font-size:16px}.no-href-link{cursor:pointer;text-decoration:none}.attachment-link,.row-details-attachment-link{cursor:pointer}::ng-deep .table-filtering.popover.popover-mobile{height:auto;display:block;top:auto!important;bottom:0;width:100vw}::ng-deep .table-filtering.popover.popover-mobile .a-popover-wrap{margin:0}::ng-deep .table-filtering.popover.popover-mobile .close{display:none}::ng-deep .visible-columns-dropdown{padding-top:0;width:14rem}.action-button-list:not(:empty)~.empty-list-label{display:none}.empty-list-label{color:#959899}.visible-columns-item{white-space:normal;word-break:break-word}\n"], components: [{ type: i20.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i1.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1.AdaptSubnavComponent, selector: "adapt-subnav, [adaptSubnav]", inputs: ["adaptSubnav", "gutter", "defaultCssClass"], outputs: ["visibilityChanged"] }, { type: i1.AdaptSubnavItemComponent, selector: "adapt-subnav-item, [adaptSubnavItem]", inputs: ["adaptSubnavItem", "defaultCssClass", "preventHiding", "priority"] }, { type: i21.ActionButtonComponent, selector: "rx-action-button", inputs: ["guid", "config", "runtimeViewModelApi"] }, { type: i1.AdaptSubnavDropdownComponent, selector: "adapt-subnav-dropdown, [adaptSubnavDropdown]", inputs: ["adaptSubnavDropdown", "defaultCssClass", "autoClose"] }, { type: i1.AdaptAdvancedFilterComponent, selector: "adapt-advanced-filter", inputs: ["filterOptions", "savedFilters", "enableDefaultSavedFilter", "defaultSavedFilterId", "busyConfig", "activeSavedFilter", "disableExpressionEditing", "showAnchorButtonLabel", "getCustomExpressionTagFieldModel", "enableSavedFilters", "applyFiltersByUserAction", "canCloseDropdownResolver", "showTabToolbar", "disabledTabResolver", "disabledInputResolver", "showSelectedFiltersCount", "selectedFiltersIndicationStyle", "filterOptionsCustomAreaTemplate", "showTags", "anchorDisabled", "fullWidthEdit", "translateFilterEditingTitleXPixels", "selectedFilters", "isLoading"], outputs: ["selectedFiltersChange", "filterSelectionChange", "deleteSavedFilter", "createNewFilter", "updateSavedFilter", "beforeActiveSavedFilterChange", "activeSavedFilterChange", "removeTag", "filtersCleared", "saveNewFilterClick", "filtersSelectionCanceled", "editSavedFilterClick", "markDefaultSavedFilterClick", "editingSavedFilterCanceled", "filterExpressionTagsChanged"] }, { type: i22.FilterTagsComponent, selector: "rx-filter-tags", inputs: ["tags", "isDisabled", "tagsLimit", "restTagsDropdownPlacement"], outputs: ["removeTag"] }, { type: i23.CardLayoutCellHeaderComponent, selector: "rx-card-layout-cell-header", inputs: ["title", "columns", "adaptTable", "openDialog"], outputs: ["sort"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i24.RxAdvancedFilteringFieldsProviderComponent, selector: "rx-advanced-filtering-fields-provider", inputs: ["namedFilterOptionsGetter"] }], directives: [{ type: i25.GridCardLayoutDirective, selector: "[rxCardLayout]", inputs: ["cardLayoutFieldsHeaderTemplate", "cardLayoutValuesHeaderTemplate", "cardLayoutFieldsDataCellTemplate", "cardLayoutValuesDataCellTemplate", "cardLayoutGetDataCellClass", "cardLayoutRecordGridElementRef", "cardLayoutWidth"], outputs: ["changedCardLayout"] }, { type: i26.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i26.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i27.CellDisplayPropertiesDirective, selector: "[rxCellDisplayProps]", inputs: ["rxCellDisplayProps", "rxCellDisplayPropsBadgeElem", "rxCellDisplayPropsDataItem"] }, { type: i1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i28.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i1.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }], pipes: { "translate": i17.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-grid',
                    templateUrl: './record-grid.component.html',
                    styleUrls: ['record-grid.component.scss'],
                    providers: [RxRecordGridUserPreferencesService]
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptDeviceDetectionService }, { type: i1.AdaptModalService }, { type: i0.ChangeDetectorRef }, { type: i2.DatePipe }, { type: i2.DecimalPipe }, { type: i0.NgZone }, { type: i3.RxAssociationInstanceDataPageService }, { type: i4.RxBooleanPipe }, { type: i4.RxCurrentUserService }, { type: i5.RxExpressionEvaluatorService }, { type: i6.RxFieldDefinitionService }, { type: i7.RxRecordGridConfiguratorService }, { type: i8.RxGuidService }, { type: i4.RxLogService }, { type: i4.RxNotificationService }, { type: i8.RxObjectUtilsService }, { type: i6.RxRecordDefinitionCacheService }, { type: i6.RxRecordDefinitionService }, { type: i9.RxRecordGridAdvancedFilteringService }, { type: i10.RxRecordGridConfigUtilsService }, { type: i11.RxRecordGridFilterConfigService }, { type: i12.RxRecordGridFilterService }, { type: i13.RxRecordGridFilterHelperService }, { type: i14.RxRecordGridSharedFilterPresetsCacheService }, { type: i15.RxRecordGridUserPreferencesService }, { type: i16.RxRecordGridUtilsService }, { type: i6.RxRecordInstanceDataPageService }, { type: i6.RxRecordInstanceService }, { type: i5.RxViewActionService }, { type: i5.RxViewActionUtilsService }, { type: i17.TranslateService }, { type: i0.ElementRef }, { type: i8.RxStringService }, { type: i4.RxGlobalEventsService }, { type: i18.PageComponent, decorators: [{
                    type: Optional
                }] }, { type: i19.RuntimeViewCanvasItemComponent, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { config: [{
                type: Input
            }], dataLoaded: [{
                type: Output
            }], adaptTable: [{
                type: ViewChild,
                args: ['adaptTable', { static: true }]
            }], adaptAdvancedFilter: [{
                type: ViewChild,
                args: ['adaptAdvancedFilter']
            }], cardLayoutRowDetailsTemplate: [{
                type: ViewChild,
                args: ['cardLayoutRowDetailsTemplate', { static: true }]
            }], cellTemplate: [{
                type: ViewChild,
                args: ['cellTemplate', { static: true }]
            }], filterTemplate: [{
                type: ViewChild,
                args: ['filterTemplate', { static: true }]
            }], leftCustomSectionTemplate: [{
                type: ViewChild,
                args: ['leftCustomSectionTemplate', { static: true }]
            }], rightCustomSectionTemplate: [{
                type: ViewChild,
                args: ['rightCustomSectionTemplate', { static: true }]
            }], rowActionButtonsTemplate: [{
                type: ViewChild,
                args: ['rowActionButtonsTemplate', { static: true }]
            }], visibleColumnsMenuTemplate: [{
                type: ViewChild,
                args: ['visibleColumnsMenuTemplate', { static: true }]
            }], fieldsProvider: [{
                type: ViewChild,
                args: [RxAdvancedFilteringFieldsProviderComponent, { static: true }]
            }], actionButtonComponents: [{
                type: ViewChildren,
                args: [ActionButtonComponent]
            }], onClickOutside: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });
//# sourceMappingURL=record-grid.component.js.map