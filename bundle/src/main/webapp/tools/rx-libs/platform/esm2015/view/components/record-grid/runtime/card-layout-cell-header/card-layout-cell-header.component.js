import { Component, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { AdaptTableComponent, SortOrder } from '@bmc-ux/adapt-table';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@angular/common";
export class CardLayoutCellHeaderComponent {
    constructor(modalService, translateService) {
        this.modalService = modalService;
        this.translateService = translateService;
        this.sort = new EventEmitter();
    }
    onSortMenuItemClick() {
        this.multiSortMeta = this.adaptTable.multiSortMeta || [];
        this.openDialog({
            title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.cards.sort-by.dialog.title'),
            content: this.cardLayoutSortModalTemplate
        }).catch(() => { });
    }
    getSortableColumns() {
        return this.columns
            .filter((column) => this.adaptTable.isSortableColumn(column))
            .sort((column1, column2) => column1.header.localeCompare(column2.header));
    }
    onSortAscClick(column) {
        this.changeSort(column, SortOrder.Asc);
    }
    onSortDescClick(column) {
        this.changeSort(column, SortOrder.Desc);
    }
    changeSort(column, order) {
        const sortIndex = this.getColumnSortIndex(column);
        const sort = this.multiSortMeta[sortIndex];
        if (sort) {
            if (sort.order === order) {
                this.multiSortMeta.splice(sortIndex, 1);
            }
            else {
                sort.order = order;
            }
        }
        else {
            this.multiSortMeta.push({
                field: column.field,
                order
            });
        }
    }
    getColumnSort(column) {
        return this.multiSortMeta[this.getColumnSortIndex(column)];
    }
    getColumnSortIndex(column) {
        return this.multiSortMeta.findIndex((sort) => sort.field === column.field);
    }
    hasColumnSortOrder(column, order) {
        const sort = this.getColumnSort(column);
        return sort ? sort.order === order : false;
    }
    getSortAscBtnClass(column) {
        return this.getSortBtnClass(column, SortOrder.Asc);
    }
    getSortDescBtnClass(column) {
        return this.getSortBtnClass(column, SortOrder.Desc);
    }
    getSortBtnClass(column, order) {
        const isActiveSortDesc = this.hasColumnSortOrder(column, order);
        return { 'btn-success': isActiveSortDesc, 'btn-secondary': !isActiveSortDesc };
    }
    clearAllSorting() {
        this.multiSortMeta = [];
    }
    applySorting() {
        this.sort.emit(this.multiSortMeta);
    }
    getCurrentSortingSummary() {
        const ordersTitles = {
            [SortOrder.Asc]: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.cards.sort-by.sort.ascending'),
            [SortOrder.Desc]: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.cards.sort-by.sort.descending')
        };
        return this.multiSortMeta
            .map((sortMeta, index) => {
            const column = this.columns.find((c) => c.field === sortMeta.field);
            return `${index + 1}. ${column.header} (${ordersTitles[sortMeta.order]})`;
        })
            .join('\n');
    }
}
CardLayoutCellHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CardLayoutCellHeaderComponent, deps: [{ token: i1.AdaptModalService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
CardLayoutCellHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CardLayoutCellHeaderComponent, selector: "rx-card-layout-cell-header", inputs: { title: "title", columns: "columns", adaptTable: "adaptTable", openDialog: "openDialog" }, outputs: { sort: "sort" }, viewQueries: [{ propertyName: "cardLayoutSortModalTemplate", first: true, predicate: ["cardLayoutSortModalTemplate"], descendants: true }], ngImport: i0, template: "{{ title }}\n\n<div class=\"dropdown header-cell-menu-btn\" adaptDropdown [appendToBody]=\"true\" [restoreFocusAfterClose]=\"true\">\n  <button\n    id=\"card-column-menu-dropdown-toggle\"\n    class=\"d-icon-ellipsis adapt-table-sort-menu__kebab py-2 btn btn-link\"\n    type=\"button\"\n    adaptDropdownToggle\n    [showCaret]=\"false\"\n  ></button>\n\n  <div class=\"dropdown-menu\" aria-labelledby=\"card-column-menu-dropdown-toggle\" adaptDropdownMenu tabindex=\"0\">\n    <button class=\"dropdown-item\" type=\"button\" (click)=\"onSortMenuItemClick()\">\n      {{ 'com.bmc.arsys.rx.client.view-components.record-grid.card-column-menu.items.sort-by.label' | translate }}\n    </button>\n  </div>\n</div>\n\n<ng-template #cardLayoutSortModalTemplate let-close=\"close\" let-getData=\"getData\">\n  <div class=\"modal-body rx-record-grid-sort-by-dialog\">\n    <div class=\"rx-card-fields\">\n      <div class=\"rx-card-fields__headers\">\n        <div class=\"rx-card-fields__headers-field\">\n          {{\n            'com.bmc.arsys.rx.client.view-components.record-grid.cards.sort-by.dialog.field.column.title' | translate\n          }}\n        </div>\n        <div class=\"rx-card-fields__headers-order\">\n          {{\n            'com.bmc.arsys.rx.client.view-components.record-grid.cards.sort-by.dialog.order.column.title' | translate\n          }}\n        </div>\n      </div>\n      <div class=\"rx-card-field\" *ngFor=\"let column of getSortableColumns()\">\n        <div class=\"rx-card-field__name\">{{ column.header }}</div>\n        <div class=\"rx-card-field__order\">\n          <div class=\"btn-group\">\n            <button class=\"btn btn-xs\" [ngClass]=\"getSortDescBtnClass(column)\" (click)=\"onSortDescClick(column)\">\n              <span class=\"d-icon-arrow_down\"></span>\n            </button>\n            <button class=\"btn btn-xs\" [ngClass]=\"getSortAscBtnClass(column)\" (click)=\"onSortAscClick(column)\">\n              <span class=\"d-icon-arrow_up\"></span>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div>\n      <textarea\n        rows=\"4\"\n        disabled\n        class=\"form-control rx-sort-summary\"\n        title=\"summary\"\n        [value]=\"getCurrentSortingSummary()\"\n        [placeholder]=\"\n          'com.bmc.arsys.rx.client.view-components.record-grid.cards.sort-by.dialog.field.summary.empty.title'\n            | translate\n        \"\n      ></textarea>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-secondary btn-sm\" (click)=\"clearAllSorting()\">\n      {{\n        'com.bmc.arsys.rx.client.view-components.record-grid.cards.sort-by.dialog.clear-all.button.label' | translate\n      }}\n    </button>\n    <button class=\"btn btn-primary btn-sm\" (click)=\"applySorting(); close()\">\n      {{ 'com.bmc.arsys.rx.client.common.apply.label' | translate }}\n    </button>\n    <button class=\"btn btn-secondary btn-sm\" (click)=\"close()\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.header-cell-menu-btn{position:absolute;right:0;top:0}.rx-record-grid-sort-by-dialog .rx-card-fields{border:1px solid #d6d7d8;display:flex;flex-direction:column;height:370px;overflow-y:auto}.rx-record-grid-sort-by-dialog .rx-card-fields__headers{font-weight:var(--font-weight-bold);display:flex;height:35px;align-items:center;border-bottom:1px solid #d6d7d8;color:#666;flex-shrink:0}.rx-record-grid-sort-by-dialog .rx-card-field{display:flex;border-bottom:1px solid #d6d7d8;align-items:center;height:35px;flex-shrink:0}.rx-record-grid-sort-by-dialog .rx-card-field:last-child{border-bottom:none}.rx-record-grid-sort-by-dialog .rx-card-field__name{flex:3;padding-left:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rx-record-grid-sort-by-dialog .rx-card-field__order{flex:1;padding-left:5px}.rx-record-grid-sort-by-dialog .rx-card-fields__headers-field{flex:3;padding-left:10px}.rx-record-grid-sort-by-dialog .rx-card-fields__headers-order{flex:1;padding-left:5px}.rx-record-grid-sort-by-dialog .rx-sort-summary{margin-top:15px;resize:none}\n"], components: [{ type: i1.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }], directives: [{ type: i1.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CardLayoutCellHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-card-layout-cell-header',
                    templateUrl: './card-layout-cell-header.component.html',
                    styleUrls: ['card-layout-cell-header.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptModalService }, { type: i2.TranslateService }]; }, propDecorators: { title: [{
                type: Input
            }], columns: [{
                type: Input
            }], adaptTable: [{
                type: Input
            }], openDialog: [{
                type: Input
            }], sort: [{
                type: Output
            }], cardLayoutSortModalTemplate: [{
                type: ViewChild,
                args: ['cardLayoutSortModalTemplate']
            }] } });
//# sourceMappingURL=card-layout-cell-header.component.js.map