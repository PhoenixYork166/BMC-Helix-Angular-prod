import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RxBundleCacheService, RxDataPageFactoryService, RxPageTitleService } from '@helix/platform/shared/api';
import { RxShellService } from '@helix/platform/view/api';
import { TranslateService } from '@ngx-translate/core';
import { filter, isEmpty, keyBy, map, sortBy } from 'lodash';
import { combineLatest, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/view/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@bmc-ux/adapt-table";
import * as i7 from "@angular/forms";
import * as i8 from "@angular/common";
export class RxSearchComponent {
    constructor(activatedRoute, router, rxDataPageService, rxShellService, rxPageTitleService, translateService, rxBundleCacheService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.rxDataPageService = rxDataPageService;
        this.rxShellService = rxShellService;
        this.rxPageTitleService = rxPageTitleService;
        this.translateService = translateService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.pageSize = 50;
        this.loading = true;
        this.loadingMore = false;
        this.startIndex = 0;
        this.totalSize = 0;
        this.searchString = '';
    }
    ngOnInit() {
        this.rxPageTitleService.set(this.translateService.instant('com.bmc.arsys.rx.client.shell.search.results.label'));
        this.subscription = combineLatest([this.activatedRoute.queryParamMap, this.rxShellService.shellConfig$]).subscribe(([queryParams, shellConfig]) => {
            this.searchString = queryParams.get('q') || '';
            this.globalSearchRecords = map(shellConfig.globalSearchRecords, (item) => {
                item.selected = true;
                return item;
            });
            this.recordDefinitionsByName = keyBy(shellConfig.globalSearchRecords, 'name');
            this.loading = false;
            this.getGlobalSearchResults();
        });
        this.columns = [
            {
                field: 'colId',
                width: '45px',
                cellTemplate: this.colIdCellTemplate
            },
            {
                field: 'recordDefinitionName',
                cellTemplate: this.cellTemplate
            }
        ];
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    get searchValue() {
        return this.searchString.trim();
    }
    getGlobalSearchResults(infiniteScroll = false) {
        this.loading = true;
        this.loadingMore = infiniteScroll;
        if (!infiniteScroll) {
            this.startIndex = 0;
            this.totalSize = 0;
        }
        if (this.searchValue) {
            const queryParams = {
                mayHaveText: `%${this.searchValue}%`,
                pageSize: this.pageSize,
                searchResultOption: 'WORDS_AROUND_HIT',
                startIndex: this.startIndex
            };
            if (!isEmpty(this.globalSearchRecords)) {
                queryParams.recordDefinitionNames = map(filter(this.globalSearchRecords, 'selected'), 'name').join(',');
            }
            if (queryParams.recordDefinitionNames) {
                this.rxDataPageService
                    .withType('com.bmc.arsys.rx.application.search.datapage.SearchDataPageQuery')
                    .get({ params: queryParams })
                    .pipe(catchError((error) => {
                    this.loading = false;
                    this.loadingMore = false;
                    return throwError(error);
                }))
                    .subscribe((results) => {
                    this.loading = false;
                    this.loadingMore = false;
                    if (this.totalSize > 0) {
                        this.totalSize--;
                    }
                    this.totalSize += this.pageSize === results.totalSize ? results.totalSize + 1 : results.totalSize;
                    const newData = results.data;
                    this.startIndex += newData.length;
                    if (infiniteScroll) {
                        this.searchResults = this.searchResults.concat(newData);
                    }
                    else {
                        this.searchResults = newData;
                    }
                    this.searchResults = sortBy(this.searchResults, 'weight');
                });
            }
            else {
                this.resetSearchResults();
            }
        }
        else {
            this.resetSearchResults();
        }
    }
    resetSearchResults() {
        this.searchResults = [];
        this.totalSize = 0;
        this.loading = false;
        this.loadingMore = false;
    }
    search() {
        const trimmedSearchValue = this.searchString.trim();
        if (trimmedSearchValue) {
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: { q: trimmedSearchValue },
                queryParamsHandling: 'merge'
            });
        }
    }
    onFiltersChanged() {
        setTimeout(() => this.getGlobalSearchResults());
    }
    onLazyLoad(event) {
        this.getGlobalSearchResults(true);
    }
    selectAllRecords() {
        this.globalSearchRecords.forEach((record) => (record.selected = true));
        this.getGlobalSearchResults();
    }
    unSelectAllRecords() {
        this.globalSearchRecords.forEach((record) => (record.selected = false));
        this.getGlobalSearchResults();
    }
}
RxSearchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchComponent, deps: [{ token: i1.ActivatedRoute }, { token: i1.Router }, { token: i2.RxDataPageFactoryService }, { token: i3.RxShellService }, { token: i2.RxPageTitleService }, { token: i4.TranslateService }, { token: i2.RxBundleCacheService }], target: i0.ɵɵFactoryTarget.Component });
RxSearchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxSearchComponent, selector: "rx-search", viewQueries: [{ propertyName: "colIdCellTemplate", first: true, predicate: ["colIdCellTemplate"], descendants: true, static: true }, { propertyName: "cellTemplate", first: true, predicate: ["cellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"row\">\n  <div class=\"col-12\">\n    <h1 class=\"mb-4 mt-0\">{{ 'com.bmc.arsys.rx.client.common.search.label' | translate }}</h1>\n  </div>\n  <div class=\"col-6 col-md-4\">\n    <form autocomplete=\"off\" (ngSubmit)=\"search()\">\n      <adapt-rx-search\n        name=\"searchString\"\n        [autofocus]=\"true\"\n        [(ngModel)]=\"searchString\"\n        [placeholder]=\"'com.bmc.arsys.rx.client.shell.searchbox.placeholder' | translate\"\n      ></adapt-rx-search>\n    </form>\n  </div>\n  <div class=\"col-1 pl-0\">\n    <div adaptDropdown>\n      <button adaptDropdownToggle class=\"btn btn-link d-icon-left-filter pl-0\">\n        {{ 'com.bmc.arsys.rx.client.common.filter-data.label' | translate }}\n      </button>\n\n      <div adaptDropdownMenu class=\"dropdown-menu p-2\">\n        <div class=\"mb-3\">{{ 'com.bmc.arsys.rx.client.common.record-definition.label' | translate }}</div>\n\n        <div class=\"d-flex justify-content-between\">\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"select-all-button\"\n            class=\"btn btn-link p-0\"\n            (click)=\"selectAllRecords()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.select-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"select-none-button\"\n            class=\"btn btn-link p-0\"\n            (click)=\"unSelectAllRecords()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.select-none.label' | translate }}\n          </button>\n        </div>\n\n        <ul *ngIf=\"globalSearchRecords\" class=\"list-unstyled mb-0\">\n          <li *ngFor=\"let record of globalSearchRecords\">\n            <adapt-rx-checkbox\n              class=\"mb-0 mt-3\"\n              [label]=\"record.name | rxDefinitionNamePipe\"\n              [(ngModel)]=\"record.selected\"\n              (change)=\"onFiltersChanged()\"\n            ></adapt-rx-checkbox>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div *ngIf=\"searchValue && (searchResults?.length || loading)\" class=\"row table-wrapper mt-1\">\n  <div class=\"col-12\">\n    <adapt-table\n      scrollHeight=\"flex\"\n      [value]=\"searchResults\"\n      [columns]=\"columns\"\n      [totalRecords]=\"totalSize\"\n      [rows]=\"searchResults?.length\"\n      [first]=\"startIndex\"\n      [paginator]=\"false\"\n      [scrollable]=\"true\"\n      (onLazyLoad)=\"onLazyLoad($event)\"\n      [lazy]=\"true\"\n      [lazyLoadOnInit]=\"false\"\n      [loading]=\"loading\"\n      [loadingMore]=\"loadingMore\"\n      [enableInfiniteScrolling]=\"true\"\n    >\n    </adapt-table>\n  </div>\n</div>\n\n<ng-template #colIdCellTemplate let-rowIndex=\"rowIndex\">\n  {{ rowIndex + 1 }}\n</ng-template>\n\n<ng-template #cellTemplate let-searchResult=\"dataItem\">\n  <div>\n    <span\n      >{{ searchResult.recordDefinitionName | rxDefinitionNamePipe }}\n      <a\n        [routerLink]=\"[\n          '/',\n          this.rxBundleCacheService.bundleId,\n          'view',\n          recordDefinitionsByName[searchResult.recordDefinitionName].view\n        ]\"\n        [queryParams]=\"{ $0$: searchResult.recordInstanceId }\"\n        >{{ searchResult.recordInstanceDisplayId }}</a\n      ></span\n    >\n  </div>\n  <div>\n    <span>{{ searchResult.title }}</span>\n  </div>\n\n  <adapt-highlight class=\"search-result\" [result]=\"searchResult.wordsAroundHit\" [term]=\"searchValue\"></adapt-highlight>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;padding:15px;height:100%;overflow:auto}.table-wrapper{flex-grow:1}:host ::ng-deep adapt-table .at-cell mark{padding:0}:host ::ng-deep adapt-table .ui-table-scrollable-wrapper{border-right:none}:host ::ng-deep adapt-table .at-infinite-scrolling-loader{border-bottom:none;border-top:none}:host ::ng-deep adapt-table .at-header-cell,:host ::ng-deep adapt-table .at-cell{border-bottom:none}.search-result{white-space:pre-wrap;word-wrap:break-word}adapt-rx-search[name=searchString]{max-width:400px;min-width:auto}\n"], components: [{ type: i5.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i5.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i5.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i6.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i5.AdaptHighlightDirective, selector: "adapt-highlight, ngb-highlight", inputs: ["highlightClass", "result", "term"], outputs: ["wordMatch"] }], directives: [{ type: i7.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i7.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i5.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }], pipes: { "translate": i4.TranslatePipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-search',
                    templateUrl: './search.component.html',
                    styleUrls: ['./search.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }, { type: i1.Router }, { type: i2.RxDataPageFactoryService }, { type: i3.RxShellService }, { type: i2.RxPageTitleService }, { type: i4.TranslateService }, { type: i2.RxBundleCacheService }]; }, propDecorators: { colIdCellTemplate: [{
                type: ViewChild,
                args: ['colIdCellTemplate', { static: true }]
            }], cellTemplate: [{
                type: ViewChild,
                args: ['cellTemplate', { static: true }]
            }] } });
//# sourceMappingURL=search.component.js.map