import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { RxViewComponentType } from '@helix/platform/view/api';
import { isEqual, isObject, sortBy } from 'lodash';
import { map, shareReplay, take } from 'rxjs/operators';
import { ActionButtonStyle } from '../../action-button/action-button.types';
import { RxRecordGridUtilsService } from '../common/services/record-grid-utils.service';
import { RxRecordGridConfigUtilsService } from '../runtime/services/record-grid-config-utils.service';
import { ColumnSortDirection } from '../common/types/record-grid.types';
import { RecordGridDesignModel } from './record-grid-design.model';
import * as i0 from "@angular/core";
import * as i1 from "../runtime/services/record-grid-config-utils.service";
import * as i2 from "../common/services/record-grid-utils.service";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@helix/platform/view/designer";
import * as i5 from "@bmc-ux/adapt-table";
import * as i6 from "@angular/common";
export class RecordGridDesignComponent {
    constructor(rxRecordGridConfigUtilsService, rxRecordGridUtilsService) {
        this.rxRecordGridConfigUtilsService = rxRecordGridConfigUtilsService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
    }
    ngOnInit() {
        this.adaptTableConfig$ = this.model.columns$.pipe(map((columns) => {
            const gridColumns = sortBy(columns, (column) => column.index);
            const initialSortGridColumn = gridColumns.find((gridColumn) => isObject(gridColumn.sortable));
            let sortMeta = {
                field: null,
                order: null
            };
            if (initialSortGridColumn) {
                const gridSortableObject = initialSortGridColumn.sortable;
                sortMeta = {
                    field: String(initialSortGridColumn.fieldId),
                    order: this.rxRecordGridConfigUtilsService.getColumnSortOrder(gridSortableObject.direction)
                };
            }
            return {
                columns: gridColumns.map((gridColumn) => ({
                    field: gridColumn.fieldId,
                    header: gridColumn.title,
                    sortable: Boolean(gridColumn.sortable),
                    hidden: !gridColumn.visible,
                    testId: this.rxRecordGridUtilsService.getTestIdForGridColumn(gridColumn.fieldId)
                })),
                sortMeta,
                toolbarConfig: {
                    counter: false,
                    quickFilter: true,
                    filter: true,
                    filterTemplate: this.filterTemplate,
                    filterResults: false,
                    visibleColumnsMenu: true,
                    visibleColumnsMenuTemplate: this.visibleColumnsMenuTemplate,
                    quickFilterTriggerable: true
                }
            };
        }), shareReplay(1));
        this.hasRecordDefinitionName$ = this.model.recordDefinition$.pipe(map(Boolean), shareReplay(1));
    }
    onSort(event) {
        this.adaptTableConfig$.pipe(take(1)).subscribe((adaptTableConfig) => {
            if (!isEqual(event, adaptTableConfig.sortMeta)) {
                let initialSortColumn;
                const column = this.model.currentGridDesignProperties.columns.find((gridColumn) => gridColumn.fieldId === event.field);
                if (isObject(column.sortable)) {
                    if (column.sortable.direction === ColumnSortDirection.Desc) {
                        initialSortColumn = null;
                    }
                    else {
                        initialSortColumn = { fieldId: column.fieldId, direction: ColumnSortDirection.Desc };
                    }
                }
                else {
                    initialSortColumn = { fieldId: column.fieldId, direction: ColumnSortDirection.Asc };
                }
                this.model.componentPropertiesChangeFromCanvas$.next(Object.assign(Object.assign({}, this.model.currentGridDesignProperties), { initialSortColumn }));
            }
        });
    }
    onBeforeViewComponentDrop(data) {
        if (data.draggedViewComponentDescriptor.type === RxViewComponentType.ActionButton &&
            !data.draggedViewComponentGuid) {
            data.initialPropertiesByName = Object.assign(Object.assign({}, data.initialPropertiesByName), { style: ActionButtonStyle.Tertiary });
        }
    }
}
RecordGridDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridDesignComponent, deps: [{ token: i1.RxRecordGridConfigUtilsService }, { token: i2.RxRecordGridUtilsService }], target: i0.ɵɵFactoryTarget.Component });
RecordGridDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridDesignComponent, selector: "rx-record-grid-design", inputs: { model: "model", isReadOnly: "isReadOnly" }, viewQueries: [{ propertyName: "filterTemplate", first: true, predicate: ["filterTemplate"], descendants: true, static: true }, { propertyName: "visibleColumnsMenuTemplate", first: true, predicate: ["visibleColumnsMenuTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"rx-record-grid-design\" [class.border]=\"!(hasRecordDefinitionName$ | async)\">\n  <adapt-empty-state\n    *ngIf=\"!(hasRecordDefinitionName$ | async); else gridTemplate\"\n    type=\"objects\"\n    label=\"Select a record definition and edit grid columns in the Properties panel.\"\n  ></adapt-empty-state>\n\n  <ng-template #gridTemplate>\n    <rx-canvas-outlet\n      [dropListOrientation]=\"'horizontal'\"\n      class=\"rx-record-grid-design__action-buttons-canvas\"\n      (beforeViewComponentDrop)=\"onBeforeViewComponentDrop($event)\"\n      [dropPredicate]=\"model.actionButtonDropPredicate\"\n    ></rx-canvas-outlet>\n\n    <adapt-table\n      #adaptTable\n      class=\"rx-record-grid-design__table\"\n      [columns]=\"(adaptTableConfig$ | async).columns\"\n      [sortable]=\"!isReadOnly\"\n      [scrollable]=\"true\"\n      [scrollHeight]=\"'80px'\"\n      [rowExpandMode]=\"\"\n      [sortMode]=\"'single'\"\n      [toolbarConfig]=\"(adaptTableConfig$ | async).toolbarConfig\"\n      [filterable]=\"false\"\n      [sortField]=\"(adaptTableConfig$ | async).sortMeta.field\"\n      [sortOrder]=\"(adaptTableConfig$ | async).sortMeta.order\"\n      [bordered]=\"true\"\n      [totalRecords]=\"0\"\n      (onSort)=\"onSort($event)\"\n      [hasEmptyState]=\"false\"\n      [dontEmitLazyLoadOnInputChange]=\"false\"\n    ></adapt-table>\n  </ng-template>\n</div>\n\n<ng-template #filterTemplate let-context>\n  <span class=\"rx-record-grid-design__toolbar-item btn-link d-icon-refresh grid-toolbar-icon mx-2 p-1\"></span>\n  <div class=\"btn-link px-0 d-icon-left-filter d-icon-right-triangle_down\" *ngIf=\"model.enableFiltering$ | async\">\n    Filter\n  </div>\n</ng-template>\n\n<ng-template #visibleColumnsMenuTemplate></ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-record-grid-design__action-buttons-canvas ::ng-deep rx-canvas-item-container{min-width:100%}.rx-record-grid-design__action-buttons-canvas ::ng-deep .cdk-drop-list{background-color:#f0f1f1;border:1px solid #d6d7d8;border-bottom:0;min-height:48px;display:flex;flex-flow:row wrap}.rx-record-grid-design__action-buttons-canvas ::ng-deep .cdk-drop-list:empty:after{content:\"Drop Action buttons here\";display:block;text-align:center;width:100%;line-height:48px;color:#959899;font-size:.875rem}.rx-record-grid-design__toolbar-item{font-size:.9375rem}.rx-record-grid-design__table ::ng-deep .adapt-table-toolbar{pointer-events:none}\n"], components: [{ type: i3.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i4.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }, { type: i5.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i6.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-grid-design',
                    templateUrl: './record-grid-design.component.html',
                    styleUrls: ['./record-grid-design.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordGridConfigUtilsService }, { type: i2.RxRecordGridUtilsService }]; }, propDecorators: { model: [{
                type: Input
            }], filterTemplate: [{
                type: ViewChild,
                args: ['filterTemplate', { static: true }]
            }], visibleColumnsMenuTemplate: [{
                type: ViewChild,
                args: ['visibleColumnsMenuTemplate', { static: true }]
            }], isReadOnly: [{
                type: Input
            }] } });
//# sourceMappingURL=record-grid-design.component.js.map