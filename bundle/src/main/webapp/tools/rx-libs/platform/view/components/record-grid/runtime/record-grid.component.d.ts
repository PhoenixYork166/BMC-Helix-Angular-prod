import { DatePipe, DecimalPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AdaptAdvancedFilterComponent, AdaptDeviceDetectionService, AdaptModalService, AdaptPopoverDirective, AdvancedFilterOption, AdvancedFilterTagsChangedEvent, BeforeActiveSavedFilterChangeEvent, CreateAdvancedFilterEvent, EditSavedFilterClickEvent, ModalDeferred, SelectedAdvancedFilter, UpdateSavedFilterEvent } from '@bmc-ux/adapt-angular';
import { AdaptLazyLoadEvent, AdaptTableComponent, AdaptTableHeaderSelectionMode, ColumnConfig, DataCellTemplateParams, ExportEvent } from '@bmc-ux/adapt-table';
import { RxAssociationInstanceDataPageService } from '@helix/platform/association/api';
import { RxFieldDefinitionService, RxRecordDefinitionCacheService, RxRecordDefinitionService, RxRecordInstanceDataPageService, RxRecordInstanceService } from '@helix/platform/record/api';
import { IPlainObject, RxBooleanPipe, RxCurrentUserService, RxGlobalEventsService, RxLogService, RxNotificationService } from '@helix/platform/shared/api';
import { RxGuidService, RxObjectUtilsService, RxStringService } from '@helix/platform/utils';
import { IRowDataItem, IRxRecordGridApi, RxExpressionEvaluatorService, RxViewActionService, RxViewActionUtilsService } from '@helix/platform/view/api';
import { BaseViewComponent, IChildComponentData, RuntimeViewCanvasItemComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { SortEvent, SortMeta } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { IActionButtonConfig } from '../../action-button/runtime/action-button.types';
import { PageComponent } from '../../page/runtime/page.component';
import { RxAdvancedFilteringFieldsProviderComponent } from '../common/components/advanced-filtering-fields-provider/advanced-filtering-fields-provider.component';
import { IRemoveFilterTagEvent } from '../common/components/filter-tags/filter-tags.types';
import { RxRecordGridAdvancedFilteringService } from '../common/services/record-grid-advanced-filtering.service';
import { RxRecordGridFilterHelperService } from '../common/services/record-grid-filter-helper.service';
import { RxRecordGridUtilsService } from '../common/services/record-grid-utils.service';
import { IRecordGridFilterTag, IRxRecordGridSavedAdvancedFilter, IRxRecordGridSharedFilterPreset } from '../common/types/record-grid-filter.types';
import { IRecordGridColumnNamedFilterOption } from '../common/types/record-grid.types';
import { IChangedCardLayoutEvent } from './record-grid-card-layout/changed-card-layout-event.interface';
import { RxRecordGridConfigUtilsService } from './services/record-grid-config-utils.service';
import { RxRecordGridConfiguratorService } from './services/record-grid-configurator.service';
import { RxRecordGridFilterConfigService } from './services/record-grid-filter-config.service';
import { RxRecordGridFilterService } from './services/record-grid-filter.service';
import { RxRecordGridSharedFilterPresetsCacheService } from './services/record-grid-shared-filter-presets-cache.service';
import { RxRecordGridUserPreferencesService } from './services/record-grid-user-preferences.service';
import { IAdaptTableConfig } from './types/adapt-table-config.interface';
import { IRecordGridActionButton } from './types/record-grid-action-button.interface';
import { IRxRecordGridAction } from './types/record-grid-action.types';
import { IAdaptTableColumnConfig } from './types/record-grid-column.types';
import { IRecordGridConfig } from './types/record-grid-config.interface';
import { IRecordGridState } from './types/record-grid-state.interface';
import * as i0 from "@angular/core";
export declare class RecordGridComponent extends BaseViewComponent implements OnInit, AfterViewInit, OnDestroy {
    private adaptDeviceDetectionService;
    private adaptModalService;
    private changeDetector;
    private datePipe;
    private decimalPipe;
    private ngZone;
    private rxAssociationInstanceDataPageService;
    private rxBooleanPipe;
    private rxCurrentUserService;
    private rxExpressionEvaluatorService;
    private rxFieldDefinitionService;
    private rxGridConfiguratorService;
    private rxGuidService;
    private rxLogService;
    private rxNotificationService;
    private rxObjectUtilsService;
    private rxRecordDefinitionCacheService;
    private rxRecordDefinitionService;
    private rxRecordGridAdvancedFilteringService;
    private rxRecordGridConfigUtilsService;
    private rxRecordGridFilterConfigService;
    private rxRecordGridFilterService;
    private rxRecordGridFilterHelperService;
    private rxRecordGridSharedFilterPresetsCacheService;
    private rxRecordGridUserPreferencesService;
    private rxRecordGridUtilsService;
    private rxRecordInstanceDataPageService;
    private rxRecordInstanceService;
    private rxViewActionService;
    private rxViewActionUtilsService;
    private translateService;
    elementRef: ElementRef;
    rxStringService: RxStringService;
    private rxGlobalEventsService;
    private pageComponent;
    private runtimeViewCanvasItemComponent;
    config: Observable<IRecordGridConfig>;
    dataLoaded: EventEmitter<void>;
    adaptTable: AdaptTableComponent;
    adaptAdvancedFilter: AdaptAdvancedFilterComponent;
    cardLayoutRowDetailsTemplate: TemplateRef<any>;
    cellTemplate: TemplateRef<DataCellTemplateParams>;
    filterTemplate: TemplateRef<any>;
    leftCustomSectionTemplate: TemplateRef<any>;
    rightCustomSectionTemplate: TemplateRef<any>;
    rowActionButtonsTemplate: TemplateRef<any>;
    visibleColumnsMenuTemplate: TemplateRef<any>;
    fieldsProvider: RxAdvancedFilteringFieldsProviderComponent;
    private actionButtonComponents;
    private onClickOutside;
    get isTotalRecordCountKnown(): boolean;
    private isExportInProgress;
    cardLayoutOpenedModal: ModalDeferred;
    columnSearchText: string;
    lastQueryExpression: string;
    lastPropertySelection: string[];
    adaptTableConfig: IAdaptTableConfig;
    actionButtons: IChildComponentData[];
    adaptTableHeaderSelectionMode: AdaptTableHeaderSelectionMode;
    api: IRxRecordGridApi;
    filteredVisibleColumns: IAdaptTableColumnConfig[];
    getDataCellClassBind: any;
    gridEvents: {
        cellClick: (gridRow: IRowDataItem, columnId: string) => void;
        cellKeyDown: (event: KeyboardEvent, gridRow: IRowDataItem, columnId: string) => void;
    };
    isFilterBySelectionButtonVisible: boolean;
    isUserAllowedToDeleteRecords: boolean;
    openSortByDialog: any;
    rowActionButtons: IChildComponentData[];
    rowSelectionChanged: BehaviorSubject<IRowDataItem[]>;
    selectedFilteredRowsCount: number;
    shouldDisplayActionButtons: boolean;
    showCellTooltip: boolean;
    sortedColumnsByTitle: IAdaptTableColumnConfig[];
    state: IRecordGridState;
    visibleColumns: IAdaptTableColumnConfig[];
    private clickableWithHrefActionExpressionEvaluationData;
    private cursor;
    private initializationCompleted$;
    private isProgrammaticUse;
    private selectionFieldOptionLabelsByFieldId;
    private cellValueFormatters;
    private clickableWithHrefColumnActions;
    private dataLoadContextSubject;
    private popovers;
    private userPreferencesChanged$;
    private readonly exportSelectedRowText;
    private readonly exportSelectedRowsText;
    constructor(adaptDeviceDetectionService: AdaptDeviceDetectionService, adaptModalService: AdaptModalService, changeDetector: ChangeDetectorRef, datePipe: DatePipe, decimalPipe: DecimalPipe, ngZone: NgZone, rxAssociationInstanceDataPageService: RxAssociationInstanceDataPageService, rxBooleanPipe: RxBooleanPipe, rxCurrentUserService: RxCurrentUserService, rxExpressionEvaluatorService: RxExpressionEvaluatorService, rxFieldDefinitionService: RxFieldDefinitionService, rxGridConfiguratorService: RxRecordGridConfiguratorService, rxGuidService: RxGuidService, rxLogService: RxLogService, rxNotificationService: RxNotificationService, rxObjectUtilsService: RxObjectUtilsService, rxRecordDefinitionCacheService: RxRecordDefinitionCacheService, rxRecordDefinitionService: RxRecordDefinitionService, rxRecordGridAdvancedFilteringService: RxRecordGridAdvancedFilteringService, rxRecordGridConfigUtilsService: RxRecordGridConfigUtilsService, rxRecordGridFilterConfigService: RxRecordGridFilterConfigService, rxRecordGridFilterService: RxRecordGridFilterService, rxRecordGridFilterHelperService: RxRecordGridFilterHelperService, rxRecordGridSharedFilterPresetsCacheService: RxRecordGridSharedFilterPresetsCacheService, rxRecordGridUserPreferencesService: RxRecordGridUserPreferencesService, rxRecordGridUtilsService: RxRecordGridUtilsService, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService, rxRecordInstanceService: RxRecordInstanceService, rxViewActionService: RxViewActionService, rxViewActionUtilsService: RxViewActionUtilsService, translateService: TranslateService, elementRef: ElementRef, rxStringService: RxStringService, rxGlobalEventsService: RxGlobalEventsService, pageComponent: PageComponent, runtimeViewCanvasItemComponent: RuntimeViewCanvasItemComponent);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    applyFilterBySelection(): void;
    buildQueryByAdvancedFilters(advancedFilters: SelectedAdvancedFilter[]): string;
    downloadAttachment(row: IPlainObject, col: ColumnConfig, fileName: string, event?: KeyboardEvent): void;
    executeViewActions(guid: string, actions: IRxRecordGridAction[], lastActionRow?: IRowDataItem): Promise<any>;
    getActionButtonConfig(isHidden: boolean, actionButtonConfig: Observable<IActionButtonConfig | IRecordGridActionButton>): Observable<IActionButtonConfig | IRecordGridActionButton>;
    getCellValue(row: IRowDataItem, col: ColumnConfig): string;
    getDataCellClass(): string;
    getLoadRecordCountLinkText(): string;
    getMultipleRowsSelectedText(): string;
    getMultipleRowsSelectedTextFirstPart(): string;
    getMultipleRowsSelectedTextSecondPart(): string;
    getNamedFilterOptions(filterOptionConfig: AdvancedFilterOption): IRecordGridColumnNamedFilterOption[];
    getSharedFilterPresets(): Observable<IRxRecordGridSharedFilterPreset[]>;
    getSortedColumnsByTitle(): ColumnConfig[];
    getToolbarTags(filterTags: IRecordGridFilterTag[]): Observable<IRecordGridFilterTag[]>;
    getVisibleColumns(): IAdaptTableColumnConfig[];
    getVisibleRows(): IRowDataItem[];
    handleHeaderCheckboxToggle(event: any): void;
    isCellSelected(cellPopover: AdaptPopoverDirective): boolean;
    loadSavedFilterPresetFilters(savedFilter: IRxRecordGridSavedAdvancedFilter): Observable<SelectedAdvancedFilter[]>;
    loadTotalRowCount(): void;
    onActiveSavedAdvancedFilterChange(savedFilter: IRxRecordGridSavedAdvancedFilter | IRxRecordGridSharedFilterPreset): void;
    onAdvancedFilterExpressionTagsChanged(event: AdvancedFilterTagsChangedEvent): void;
    onAdvancedFiltersChange(filters: SelectedAdvancedFilter[]): void;
    onBeforeActiveSavedFilterChange(event: BeforeActiveSavedFilterChangeEvent): void;
    onCellClick(event: MouseEvent, columns?: IAdaptTableColumnConfig[], rowItem?: IRowDataItem, popover?: AdaptPopoverDirective, isCardLayout?: boolean): void;
    onFilterBySelection(event: MouseEvent, columns?: IAdaptTableColumnConfig[], rowItem?: IRowDataItem): void;
    onCellMouseOver($event: MouseEvent): void;
    onChangedCardLayout(event: IChangedCardLayoutEvent): void;
    onColReorder(colReorderEvent: ColumnConfig[]): void;
    onColumnResize(): void;
    onColumnVisibilityChange(isVisible: boolean, column: IAdaptTableColumnConfig): void;
    onCreateNewFilterPreset(event: CreateAdvancedFilterEvent): void;
    onDeleteSavedFilterPreset(filterPresetToDelete: IRxRecordGridSavedAdvancedFilter): void;
    onEditSavedFilterClick(event: EditSavedFilterClickEvent): void;
    onExport(options: ExportEvent): void;
    onLazyLoad(event: AdaptLazyLoadEvent): void;
    onRefreshClick(): void;
    onRemoveFilterTag(event: IRemoveFilterTagEvent): void;
    onRowsSelectionChange(rowDataItems: IRowDataItem[] | IRowDataItem): void;
    onSearchColumns(): void;
    onSort(sortEvent: SortEvent): void;
    onSortCards(multiSortMeta: SortMeta[]): void;
    onRowActionOpen(row: IRowDataItem): void;
    onUpdateSavedFilterPreset(event: UpdateSavedFilterEvent): void;
    openRowDetails(columns: IAdaptTableColumnConfig[], rowDataItem: IRowDataItem): void;
    setToolbarTags(toolbarTags: IRecordGridFilterTag[]): void;
    trackByColumnField(index: number, column: IAdaptTableColumnConfig): string;
    updateToolbarTags(filterTags: IRecordGridFilterTag[]): void;
    private addAssociationFieldsToRecordDefinition;
    private areNonExternalPresetFiltersApplied;
    private getAppliedExternalPresetFilter;
    private prepareFieldsValueByFieldIdData;
    private addSelectionFieldOptionNames;
    pendingFiltersToApply: any;
    private applyFilters;
    private applyPendingSelectedFilters;
    private applySorting;
    private applyViewPreset;
    private shareViewPreset;
    private applyViewPresetInner;
    private areUserFiltersApplied;
    private isSearchApplied;
    private checkIfViewPresetEdited;
    private clearSelectedCells;
    private compareRows;
    private createCsvExportFile;
    private deleteViewPreset;
    private discardViewPresetChanges;
    private enrichRowEntity;
    private expandRowProperties;
    private expandSelectedRowsProperties;
    private exportDataToCsv;
    private evaluateViewInputParameters;
    private filterRows;
    private findEnabledGridAction;
    private getAdvancedFilterOptions;
    private getAssociationDescriptors;
    private getBaseDataPageParams;
    private getCellValueFormatter;
    private getCellValues;
    private getColumns;
    private getData;
    private getDataBase;
    private getDataCellStyle;
    private getDataPageService;
    private getExportFileName;
    private getFilteredItems;
    private getFirstSelectedRow;
    private getGridColumnDefinitions;
    private getGridData;
    private getHeaders;
    private getNamedFilterOptionsState;
    private getProgrammaticActionButtons;
    private getRecordDefinition;
    private getRecordDefinitionName;
    private getSelectedRowCount;
    private getSelectedRows;
    private getTotalRowCount;
    private getVirtualRowHeight;
    private hasAssociationAndEmptyRecordId;
    private initActionButtons;
    private initAdvancedFilterTexts;
    private initCustomTexts;
    private initGrid;
    private avoidSystemColumnExpansion;
    private avoidSystemCardColumnExpansion;
    private initRecordDefinitions;
    private initRowActionButtons;
    private isDownloadableAttachmentColumn;
    private isRangeFilter;
    private isSharedFilterPreset;
    private loadRowData;
    private openSortByDialogFn;
    private prepareQueryParamsAndQueryArgs;
    private refresh;
    private saveViewPreset;
    private scrollToTop;
    private setFilter;
    private setRecordDefinition;
    private setSelectedFilteredRowsCount;
    private sortRows;
    private toggleCellSelection;
    private trackPopoverAnchor;
    private updateAdaptTableFilters;
    private updateToolbarItems;
    private getExportSelectedText;
    private getFiltersRequiredMessage;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordGridComponent, [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordGridComponent, "rx-record-grid", never, { "config": "config"; }, { "dataLoaded": "dataLoaded"; }, never, never>;
}