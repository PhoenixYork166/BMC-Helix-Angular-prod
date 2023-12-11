import { Component, ElementRef, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION, RX_BUNDLE, RxCurrentUserService, RxGlobalCacheService, RxNotificationService, RxOverlayService, RxPageTitleService, RxSmartReportingService } from '@helix/platform/shared/api';
import { ProgressIndicatorModalComponent, ProgressIndicatorStatus } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { findIndex, includes, last, noop, toArray } from 'lodash';
import { BehaviorSubject, combineLatest, ReplaySubject, throwError } from 'rxjs';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';
import { AxBundleDeploymentService } from '../../services/bundle-deployment';
import { CreateBundleModalComponent } from './create-bundle-modal/create-bundle-modal.component';
import { BundleTypeFilter, EditableBundleFilter } from './workspace.types';
import { RxGainsightConfiguratorService } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@ngx-translate/core";
import * as i3 from "../../services/bundle-deployment";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/router";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@bmc-ux/adapt-table";
import * as i8 from "@angular/forms";
import * as i9 from "@angular/common";
export class WorkspaceComponent {
    constructor(rxCurrentUserService, rxGlobalCacheService, rxOverlayService, rxPageTitleService, translateService, rxSmartReportingService, rxNotificationService, axBundleDeploymentService, adaptModalService, router, renderer, rxGainsightConfiguratorService) {
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxOverlayService = rxOverlayService;
        this.rxPageTitleService = rxPageTitleService;
        this.translateService = translateService;
        this.rxSmartReportingService = rxSmartReportingService;
        this.rxNotificationService = rxNotificationService;
        this.axBundleDeploymentService = axBundleDeploymentService;
        this.adaptModalService = adaptModalService;
        this.router = router;
        this.renderer = renderer;
        this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
        this.bundleTypeSelectorModel = [true, false, false];
        this.bundleTypes = RX_BUNDLE.bundleTypes;
        this.editableBundles = this.rxCurrentUserService.getEditableBundles();
        this.editableBundleSelectorModel = [false, true];
        this.isBusinessAnalyst = this.rxCurrentUserService.isBusinessAnalyst();
        this.isShared = this.rxOverlayService.getCurrentOverlayContext().isShared;
        this.isInstallBundleActionAvailable = this.rxCurrentUserService.isAdministrator() && !this.isShared;
        this.innovationStudioBundleId = RX_APPLICATION.innovationStudioBundleId;
        this.isLoadingData = true;
        this.isNewBundleActionAvailable = !this.isShared;
        this.texts = {
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.no-editable-bundles.label')
        };
        this.applicationLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.application.label');
        this.bundleTypeSelector$ = new BehaviorSubject(BundleTypeFilter.All);
        this.destroyed$ = new ReplaySubject(1);
        this.editableBundleSelector$ = new BehaviorSubject(EditableBundleFilter.Editable);
        this.libraryLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.library.label');
        this.bundles$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(map((bundleDescriptors) => bundleDescriptors
            .filter((bundleDescriptor) => bundleDescriptor.id !== RX_APPLICATION.settingsBundleId &&
            bundleDescriptor.id !== RX_APPLICATION.standardlib &&
            bundleDescriptor.id !== RX_APPLICATION.innovationStudioBundleId &&
            bundleDescriptor.id !== RX_APPLICATION.platformBundleId)
            .map((bundle) => (Object.assign(Object.assign({}, bundle), {
            type: bundle.isApplication ? this.applicationLabel : this.libraryLabel,
            isEditable: !this.isBusinessAnalyst || includes(this.editableBundles, bundle.id)
        })))), tap(() => {
            this.isLoadingData = false;
        }), catchError((error) => {
            this.isLoadingData = false;
            return throwError(error);
        }));
        this.bundlesToDisplay$ = combineLatest([
            this.bundleTypeSelector$,
            this.editableBundleSelector$,
            this.bundles$
        ]).pipe(map(([bundleTypeFiler, editableBundleFilter, allBundles]) => allBundles.filter((bundle) => (bundleTypeFiler === BundleTypeFilter.All ||
            (bundleTypeFiler === BundleTypeFilter.Applications && bundle.isApplication) ||
            (bundleTypeFiler === BundleTypeFilter.Libraries && !bundle.isApplication)) &&
            (editableBundleFilter === EditableBundleFilter.All || bundle.isEditable))), takeUntil(this.destroyed$));
        this.bundleTypeSelectorConfig = [
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.all.label'),
                value: BundleTypeFilter.All
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.applications.label'),
                value: BundleTypeFilter.Applications
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.libraries.label'),
                value: BundleTypeFilter.Libraries
            }
        ];
        this.editableBundleSelectorConfig = [
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.all.label'),
                value: EditableBundleFilter.All
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.bundle.editable.label'),
                value: EditableBundleFilter.Editable
            }
        ];
    }
    ngOnInit() {
        this.columns = [
            {
                field: 'friendlyName',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                cellTemplate: this.nameColumnTemplate
            },
            { field: 'type', header: this.translateService.instant('com.bmc.arsys.rx.client.common.item-type.label') },
            {
                field: 'developerName',
                header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.column.developer.label')
            },
            {
                field: 'displayVersion',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.version.label')
            },
            {
                field: 'id',
                hidden: true
            }
        ];
        this.rxSmartReportingService.getSmartReportingUrl().subscribe((smartReportingUrl) => {
            this.smartReportingUrl = smartReportingUrl;
        });
        this.setPageTitle();
        this.rxGainsightConfiguratorService.updateGlobalContext({
            subProductLevel1: {
                name: 'Design'
            },
            subProductLevel2: {
                name: 'Workspace'
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.rxGainsightConfiguratorService.removeGlobalContext(['subProductLevel2']);
    }
    updateBundleType(bundleTypeSelectorModel) {
        this.bundleTypeSelector$.next(this.bundleTypeSelectorConfig[findIndex(bundleTypeSelectorModel, Boolean)].value);
    }
    toggleEditableBundles(editableSelectorModel) {
        this.editableBundleSelector$.next(this.editableBundleSelectorConfig[findIndex(editableSelectorModel, Boolean)].value);
    }
    openFileDialog() {
        this.renderer.selectRootElement(this.fileInput.nativeElement, true).click();
    }
    onClickFileInput(event) {
        const element = event.target;
        element.value = '';
    }
    onChangeFileInput(event) {
        var _a;
        const files = toArray(event.target.files);
        const bundleDeploymentProgressConfig = {
            title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.install.button.label'),
            status: ProgressIndicatorStatus.InProgress,
            header: this.translateService.instant('com.bmc.arsys.rx.client.common.application-or-library.label'),
            subHeader: (_a = files[0]) === null || _a === void 0 ? void 0 : _a.name.replace(/\.zip$/i, ''),
            inProgressMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.installing.label'),
            finishedMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.install-successful.label'),
            failedMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.install-failed.label'),
            operationStatusMessage: ''
        };
        this.openModal(ProgressIndicatorModalComponent, bundleDeploymentProgressConfig)
            .then(() => window.location.reload())
            .catch(noop);
        this.axBundleDeploymentService
            .install(files[0])
            .pipe(catchError((error) => {
            bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Failed;
            bundleDeploymentProgressConfig.finishedMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.install-failed.label');
            return throwError(error);
        }))
            .subscribe((response) => {
            this.axBundleDeploymentService
                .pollDeploymentStatus(last(response.headers.get('location').split('/')))
                .subscribe((deploymentStatus) => {
                if (deploymentStatus.isFinished) {
                    bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Finished;
                    bundleDeploymentProgressConfig.operationStatusMessage = this.axBundleDeploymentService.buildStatusMessage(deploymentStatus.deploymentParsedStatus);
                }
                else if (deploymentStatus.errorMessage) {
                    bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Failed;
                    bundleDeploymentProgressConfig.operationStatusMessage = deploymentStatus.errorMessage;
                }
            });
        });
    }
    createBundle(bundleType) {
        this.openModal(CreateBundleModalComponent, { type: bundleType })
            .then((result) => {
            const bundleId = result === null || result === void 0 ? void 0 : result.bundleId;
            if (bundleId) {
                this.rxGlobalCacheService.clear();
                this.router.navigate([RX_APPLICATION.innovationStudioBundleId, bundleId]).then(() => {
                    window.location.reload();
                });
                this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-bundle.success.message', {
                    bundleType: bundleType.toLowerCase()
                }));
            }
        })
            .catch(noop);
    }
    openModal(content, data) {
        return this.adaptModalService.open({
            content,
            data,
            size: 'sm',
            isDialog: true,
            hideBackdrop: false
        });
    }
    setPageTitle() {
        this.rxPageTitleService.set(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.page.label'), this.rxGlobalCacheService.applicationId);
    }
}
/** @nocollapse */ WorkspaceComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WorkspaceComponent, deps: [{ token: i1.RxCurrentUserService }, { token: i1.RxGlobalCacheService }, { token: i1.RxOverlayService }, { token: i1.RxPageTitleService }, { token: i2.TranslateService }, { token: i1.RxSmartReportingService }, { token: i1.RxNotificationService }, { token: i3.AxBundleDeploymentService }, { token: i4.AdaptModalService }, { token: i5.Router }, { token: i0.Renderer2 }, { token: i6.RxGainsightConfiguratorService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ WorkspaceComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: WorkspaceComponent, selector: "ax-workspace", viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true }, { propertyName: "nameColumnTemplate", first: true, predicate: ["nameColumnTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"d-flex flex-column h-100\">\n  <div class=\"row w-100 align-items-center\">\n    <h1 class=\"h1 px-6 py-3 m-0\">{{ 'com.bmc.arsys.rx.innovation-studio.workspace.page.label' | translate }}</h1>\n\n    <div class=\"d-flex py-3\">\n      <span class=\"pl-6 pt-3 pr-2 workspace-toolbar-label mb-2\">\n        {{ 'com.bmc.arsys.rx.innovation-studio.workspace.show.label' | translate }}\n      </span>\n\n      <adapt-button-group\n        [(ngModel)]=\"bundleTypeSelectorModel\"\n        [config]=\"bundleTypeSelectorConfig\"\n        [multiselectable]=\"false\"\n        [uncheckable]=\"false\"\n        size=\"small\"\n        (ngModelChange)=\"updateBundleType($event)\"\n        rx-id=\"select-bundle-type\"\n        class=\"pt-1\"\n      ></adapt-button-group>\n\n      <adapt-button-group\n        class=\"pl-5 pt-1\"\n        *ngIf=\"isBusinessAnalyst\"\n        [(ngModel)]=\"editableBundleSelectorModel\"\n        [config]=\"editableBundleSelectorConfig\"\n        [multiselectable]=\"false\"\n        [uncheckable]=\"false\"\n        size=\"small\"\n        (ngModelChange)=\"toggleEditableBundles($event)\"\n        rx-id=\"select-bundle-type-ba\"\n      ></adapt-button-group>\n    </div>\n\n    <div class=\"d-flex py-3 align-items-center\">\n      <div\n        class=\"split-line ml-4\"\n        *ngIf=\"(isInstallBundleActionAvailable || isNewBundleActionAvailable) && !isBusinessAnalyst\"\n      ></div>\n\n      <div *ngIf=\"isNewBundleActionAvailable && !isBusinessAnalyst\" class=\"dropdown\" adaptDropdown>\n        <button\n          adapt-button\n          adaptDropdownToggle\n          type=\"button\"\n          btn-type=\"tertiary\"\n          class=\"d-icon-plus_circle align-self-start\"\n          rx-id=\"new-button\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n        </button>\n\n        <div class=\"dropdown-menu\" adaptDropdownMenu>\n          <button (click)=\"createBundle(bundleTypes.application)\" class=\"dropdown-item\" rx-id=\"create-application\">\n            {{ 'com.bmc.arsys.rx.client.common.application.label' | translate }}\n          </button>\n          <button (click)=\"createBundle(bundleTypes.library)\" class=\"dropdown-item\" rx-id=\"create-library\">\n            {{ 'com.bmc.arsys.rx.client.common.library.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <button\n        *ngIf=\"isInstallBundleActionAvailable && !isBusinessAnalyst\"\n        adapt-button\n        type=\"file\"\n        btn-type=\"tertiary\"\n        class=\"d-icon-left-download\"\n        rx-id=\"install-button\"\n        (click)=\"openFileDialog()\"\n      >\n        {{ 'com.bmc.arsys.rx.innovation-studio.workspace.install.button.label' | translate }}\n      </button>\n\n      <input\n        #fileInput\n        type=\"file\"\n        accept=\".zip\"\n        hidden\n        [multiple]=\"false\"\n        (change)=\"onChangeFileInput($event)\"\n        (click)=\"onClickFileInput($event)\"\n        rx-id=\"install-file-input\"\n      />\n    </div>\n\n    <div class=\"ml-auto py-3\" *ngIf=\"smartReportingUrl\">\n      <a\n        rx-id=\"reports-link\"\n        target=\"_blank\"\n        class=\"d-icon-file_chart d-icon-left px-4 py-2\"\n        [href]=\"smartReportingUrl\"\n      >\n        {{ 'com.bmc.arsys.rx.innovation-studio.workspace.reports.button.label' | translate }}\n      </a>\n    </div>\n  </div>\n\n  <div class=\"h-100\">\n    <adapt-table\n      class=\"mt-2\"\n      [value]=\"bundlesToDisplay$ | async\"\n      [columns]=\"columns\"\n      [sortable]=\"true\"\n      dataKey=\"friendlyName\"\n      sortField=\"friendlyName\"\n      [sortOrder]=\"1\"\n      [loading]=\"isLoadingData\"\n      [scrollable]=\"true\"\n      [scrollHeight]=\"'flex'\"\n      [hasEmptyState]=\"isBusinessAnalyst && editableBundles.length === 0\"\n      [texts]=\"texts\"\n      [bordered]=\"true\"\n    >\n    </adapt-table>\n  </div>\n</div>\n<ng-template #nameColumnTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div class=\"rx-ellipsis\">\n    <a [routerLink]=\"['/', innovationStudioBundleId, dataItem.id]\">\n      {{ dataItem[column.field] }}\n    </a>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.workspace-toolbar-label{font-size:.75rem}.split-line{height:1.125rem;border-left:1px solid #d6d7d8}\n"], components: [{ type: i4.AdaptButtonGroupComponent, selector: "adapt-button-group", inputs: ["config", "size", "groupType", "isVertical", "multiselectable", "uncheckable", "useCheckboxStyle"], outputs: ["modelArrayChanged"], exportAs: ["adaptBtnGroup"] }, { type: i4.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i7.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }], directives: [{ type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i4.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i5.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }], pipes: { "translate": i2.TranslatePipe, "async": i9.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WorkspaceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-workspace',
                    templateUrl: './workspace.component.html',
                    styleUrls: ['./workspace.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCurrentUserService }, { type: i1.RxGlobalCacheService }, { type: i1.RxOverlayService }, { type: i1.RxPageTitleService }, { type: i2.TranslateService }, { type: i1.RxSmartReportingService }, { type: i1.RxNotificationService }, { type: i3.AxBundleDeploymentService }, { type: i4.AdaptModalService }, { type: i5.Router }, { type: i0.Renderer2 }, { type: i6.RxGainsightConfiguratorService }]; }, propDecorators: { fileInput: [{
                type: ViewChild,
                args: ['fileInput', { static: false }]
            }], nameColumnTemplate: [{
                type: ViewChild,
                args: ['nameColumnTemplate', { static: true }]
            }] } });
//# sourceMappingURL=workspace.component.js.map