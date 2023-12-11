import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { RX_APPLICATION, RxBundleCacheService, RxSessionExpirationService } from '@helix/platform/shared/api';
import { ColumnSortDirection, RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, intersectionBy, map } from 'lodash';
import { NEVER, Observable, of, ReplaySubject } from 'rxjs';
import { switchMapTo, takeUntil } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../bundle-details/bundle-details.constant';
import { RxGainsightConfiguratorService } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/view/components";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@angular/common";
import * as i8 from "@angular/router";
export class DefinitionTabComponent {
    constructor(translateService, rxBundleCacheService, rxSessionExpirationService, rxGainsightConfiguratorService) {
        this.translateService = translateService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
        this.customAction = new EventEmitter();
        this.deleteDefinition = new EventEmitter();
        this.renameDefinition = new EventEmitter();
        this.revertCustomization = new EventEmitter();
        this.copyDefinition = new EventEmitter();
        this.addDefinition = new EventEmitter();
        this.rowSelectionChanged = new EventEmitter();
        this.destroyed$ = new ReplaySubject(1);
    }
    set definitionActions(definitionActions) {
        this._definitionActions = (definitionActions || []).map((definitionAction) => (Object.assign(Object.assign({}, (AX_BUNDLE_DETAILS.standardDefinitionActions[definitionAction.id] || {})), definitionAction)));
    }
    get definitionActions() {
        return this._definitionActions;
    }
    set gridColumns(columns) {
        this._gridColumns = columns.map((column) => {
            const columnConfig = Object.assign(Object.assign({}, column), { title: this.translateService.instant(column.title) });
            if (column.fieldId === AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId) {
                columnConfig.cellTemplate = this.customizationStatusCellTemplate;
            }
            else if (column.fieldId === AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled.fieldId) {
                columnConfig.cellTemplate = this.isEnabledCellTemplate;
            }
            else if (column.fieldId === AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId && !column.cellTemplate) {
                columnConfig.cellTemplate = this.nameCellTemplate;
            }
            else if (column.fieldId === AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId && !column.cellTemplate) {
                columnConfig.cellTemplate = this.scopeCellTemplate;
            }
            if (column.fieldId === AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId) {
                columnConfig.sortable = { direction: ColumnSortDirection.Desc, priority: 0 };
            }
            return columnConfig;
        });
    }
    get gridColumns() {
        return this._gridColumns;
    }
    ngOnInit() {
        var _a;
        (_a = this.editRouterLink) !== null && _a !== void 0 ? _a : (this.editRouterLink = `/${RX_APPLICATION.innovationStudioBundleId}/${this.definitionType}/edit/`);
        this.recordGridConfig$ = of({
            guid: `ax-${this.definitionType}-definitions-grid`,
            enableRowSelection: RowSelectionMode.Multiple,
            getRecordDefinition: () => of(this.recordDefinition),
            columns: this.gridColumns,
            enableFiltering: false,
            useExternalFiltering: false,
            recordIdField: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
            styles: 'flex-fill',
            getData: () => this.rxSessionExpirationService.keepSessionAlive().pipe(switchMapTo(this.definitions$)),
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.definition-tab.no-definition.label')
        });
        this.recordGrid.rowSelectionChanged.pipe(takeUntil(this.destroyed$)).subscribe((selectedRows) => {
            this.rowSelectionChanged.emit(cloneDeep(selectedRows));
        });
        this.rxBundleCacheService
            .getCurrentBundleDescriptor()
            .subscribe((bundleDescriptor) => (this.bundleDescriptor = bundleDescriptor));
        this.rxGainsightConfiguratorService.updateGlobalContext({
            subProductLevel1: {
                name: 'Design'
            },
            subProductLevel2: {
                name: 'Bundle workspace'
            }
        });
    }
    onClick(actionId) {
        switch (actionId) {
            case AX_BUNDLE_DETAILS.standardDefinitionActionNames.copy:
                this.copyDefinition.emit(this.recordGrid.api.getFirstSelectedRow());
                break;
            case AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete:
                this.deleteDefinition.emit(this.recordGrid.api.getSelectedRows());
                break;
            case AX_BUNDLE_DETAILS.standardDefinitionActionNames.revertCustomization:
                this.revertCustomization.emit(this.recordGrid.api.getSelectedRows());
                break;
            case AX_BUNDLE_DETAILS.standardDefinitionActionNames.rename:
                this.renameDefinition.emit({
                    selectedRow: this.recordGrid.api.getFirstSelectedRow(),
                    definitionNames: map(this.recordGrid.adaptTableConfig.data, AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId)
                });
                break;
            case AX_BUNDLE_DETAILS.standardDefinitionActionNames.new:
                this.addDefinition.emit();
                break;
            default:
                this.customAction.emit({ actionId, selectedRows: this.recordGrid.api.getSelectedRows() });
                break;
        }
    }
    ngOnChanges(changes) {
        var _a, _b;
        if (((_a = changes.isActionInProgress) === null || _a === void 0 ? void 0 : _a.currentValue) === true) {
            this.busySubscription = NEVER.subscribe();
        }
        else {
            (_b = this.busySubscription) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        }
    }
    trackByFn(definitionAction) {
        return definitionAction.id;
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.rxGainsightConfiguratorService.removeGlobalContext(['subProductLevel2']);
    }
    getDeleteSelectedDefinitionMessage() {
        const selectedRows = this.recordGrid.api.getSelectedRows();
        const visibleRows = this.recordGrid.api.getVisibleRows();
        const areAllSelectedRowsVisible = intersectionBy(selectedRows, visibleRows, (row) => row.name).length === selectedRows.length;
        let message;
        if (selectedRows.length > 1) {
            if (areAllSelectedRowsVisible) {
                message = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.delete-definitions-confirmation.message');
            }
            else {
                message = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.delete-hidden-definitions-confirmation.message', {
                    count: selectedRows.length
                });
            }
        }
        else {
            if (areAllSelectedRowsVisible) {
                message = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.delete-definition-confirmation.message');
            }
            else {
                message = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.delete-hidden-definition-confirmation.message');
            }
        }
        return message;
    }
}
/** @nocollapse */ DefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionTabComponent, deps: [{ token: i1.TranslateService }, { token: i2.RxBundleCacheService }, { token: i2.RxSessionExpirationService }, { token: i3.RxGainsightConfiguratorService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ DefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DefinitionTabComponent, selector: "ax-definition-tab", inputs: { isActionInProgress: "isActionInProgress", definitionType: "definitionType", definitionActions: "definitionActions", gridColumns: "gridColumns", definitions$: "definitions$", recordDefinition: "recordDefinition", editRouterLink: "editRouterLink" }, outputs: { customAction: "customAction", deleteDefinition: "deleteDefinition", renameDefinition: "renameDefinition", revertCustomization: "revertCustomization", copyDefinition: "copyDefinition", addDefinition: "addDefinition", rowSelectionChanged: "rowSelectionChanged" }, viewQueries: [{ propertyName: "customizationStatusCellTemplate", first: true, predicate: ["customizationStatusCellTemplate"], descendants: true, static: true }, { propertyName: "isEnabledCellTemplate", first: true, predicate: ["isEnabledCellTemplate"], descendants: true, static: true }, { propertyName: "nameCellTemplate", first: true, predicate: ["nameCellTemplate"], descendants: true, static: true }, { propertyName: "scopeCellTemplate", first: true, predicate: ["scopeCellTemplate"], descendants: true, static: true }, { propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div class=\"d-flex flex-row ml-1\">\n  <ng-container *ngFor=\"let toolbarItem of definitionActions; trackBy: trackByFn\">\n    <ng-container *ngIf=\"toolbarItem.subActions?.length\">\n      <div class=\"dropdown\" adaptDropdown placement=\"bottom-left\">\n        <button\n          adapt-button\n          btn-type=\"tertiary\"\n          [disabled]=\"toolbarItem.isDisabled\"\n          adaptDropdownToggle\n          [attr.rx-id]=\"toolbarItem.rxId\"\n          class=\"pl-0 ml-4\"\n        >\n          <adapt-icon [name]=\"toolbarItem.icon\"></adapt-icon>\n\n          {{ toolbarItem.labelKey | translate }}\n        </button>\n\n        <div class=\"dropdown-menu\" adaptDropdownMenu>\n          <ng-container *ngFor=\"let dropdownItem of toolbarItem.subActions\">\n            <div *ngIf=\"dropdownItem.groupTitle\" class=\"dropdown-header\">{{ dropdownItem.groupTitle }}</div>\n            <button\n              *ngIf=\"!dropdownItem.groupTitle\"\n              class=\"dropdown-item\"\n              (click)=\"onClick(dropdownItem.id)\"\n              [attr.rx-id]=\"dropdownItem.rxId\"\n            >\n              {{ dropdownItem.labelKey | translate }}\n            </button>\n          </ng-container>\n        </div>\n      </div>\n    </ng-container>\n\n    <ng-container *ngIf=\"!toolbarItem.subActions?.length\">\n      <button\n        adapt-button\n        btn-type=\"tertiary\"\n        [disabled]=\"toolbarItem.isDisabled\"\n        (click)=\"onClick(toolbarItem.id)\"\n        [attr.rx-id]=\"toolbarItem.rxId\"\n        class=\"px-3\"\n      >\n        <adapt-icon *ngIf=\"toolbarItem.icon\" [name]=\"toolbarItem.icon\"></adapt-icon>\n\n        {{ toolbarItem.labelKey | translate }}\n      </button>\n    </ng-container>\n  </ng-container>\n</div>\n\n<ng-template #nameCellTemplate let-dataItem=\"dataItem\">\n  <a [routerLink]=\"editRouterLink + dataItem.$ID$\">\n    {{ dataItem.name | rxDefinitionNamePipe }}\n  </a>\n</ng-template>\n\n<ng-template #customizationStatusCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.customizationPerspective | rxCustomizationStatus }}\n</ng-template>\n\n<ng-template #isEnabledCellTemplate let-dataItem=\"dataItem\">\n  {{\n    (dataItem.isEnabled ? 'com.bmc.arsys.rx.client.common.yes.label' : 'com.bmc.arsys.rx.client.common.no.label')\n      | translate\n  }}\n</ng-template>\n\n<ng-template #scopeCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.scope | rxDefinitionScopePipe: bundleDescriptor }}\n</ng-template>\n\n<rx-record-grid [config]=\"recordGridConfig$\"></rx-record-grid>\n\n<rx-busy-indicator [options]=\"{ busy: busySubscription }\"></rx-busy-indicator>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{position:relative;display:flex;flex-direction:column;height:100%;width:100%;overflow:hidden}\n"], components: [{ type: i4.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i4.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i6.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }], directives: [{ type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i4.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i8.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }], pipes: { "translate": i1.TranslatePipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe, "rxCustomizationStatus": i2.RxCustomizationStatusPipe, "rxDefinitionScopePipe": i2.RxDefinitionScopePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-definition-tab',
                    templateUrl: './definition-tab.component.html',
                    styleUrls: ['./definition-tab.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxBundleCacheService }, { type: i2.RxSessionExpirationService }, { type: i3.RxGainsightConfiguratorService }]; }, propDecorators: { customizationStatusCellTemplate: [{
                type: ViewChild,
                args: ['customizationStatusCellTemplate', { static: true }]
            }], isEnabledCellTemplate: [{
                type: ViewChild,
                args: ['isEnabledCellTemplate', { static: true }]
            }], nameCellTemplate: [{
                type: ViewChild,
                args: ['nameCellTemplate', { static: true }]
            }], scopeCellTemplate: [{
                type: ViewChild,
                args: ['scopeCellTemplate', { static: true }]
            }], recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }], isActionInProgress: [{
                type: Input
            }], definitionType: [{
                type: Input
            }], definitionActions: [{
                type: Input
            }], gridColumns: [{
                type: Input
            }], definitions$: [{
                type: Input
            }], recordDefinition: [{
                type: Input
            }], editRouterLink: [{
                type: Input
            }], customAction: [{
                type: Output
            }], deleteDefinition: [{
                type: Output
            }], renameDefinition: [{
                type: Output
            }], revertCustomization: [{
                type: Output
            }], copyDefinition: [{
                type: Output
            }], addDefinition: [{
                type: Output
            }], rowSelectionChanged: [{
                type: Output
            }] } });
//# sourceMappingURL=definition-tab.component.js.map