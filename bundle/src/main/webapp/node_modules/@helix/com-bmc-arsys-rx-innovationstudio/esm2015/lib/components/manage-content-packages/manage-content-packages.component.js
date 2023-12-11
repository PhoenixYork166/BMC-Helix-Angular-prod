import { DatePipe } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActiveModalRef, LoaderType } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxBundleCacheService, RxDefinitionNameService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { RxFileService, RxJsonParserService, RxStringService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { find, first, reduce, values } from 'lodash';
import { ReplaySubject } from 'rxjs';
import { map, switchMapTo, take, takeUntil } from 'rxjs/operators';
import { AxBundleDeploymentService } from '../../services/bundle-deployment';
import { AX_BUNDLE_PACKAGING } from '../../services/bundle-deployment/bundle-packaging.constant';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../../services/bundle-deployment";
import * as i3 from "@angular/common";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@helix/platform/utils";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@helix/platform/record/api";
import * as i8 from "@ngx-translate/core";
import * as i9 from "@bmc-ux/adapt-table";
import * as i10 from "@angular/forms";
export class ManageContentPackagesComponent extends RxModalClass {
    constructor(activeModalRef, axBundleDeploymentService, datePipe, injector, rxBundleCacheService, rxDefinitionNameService, rxGlobalCacheService, rxJsonParserService, rxModalService, rxRecordInstanceDataPageService, rxRecordInstanceService, rxStringService, translateService) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.axBundleDeploymentService = axBundleDeploymentService;
        this.datePipe = datePipe;
        this.injector = injector;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxModalService = rxModalService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxStringService = rxStringService;
        this.translateService = translateService;
        this.busyConfig = {
            busy: null,
            sticky: true,
            message: this.translateService.instant('com.bmc.arsys.rx.client.common.loading-data'),
            loaderType: LoaderType.LINE
        };
        this.viewType = [true, false];
        this.packageCreationDateControl = new FormControl([]);
        this.packageNameControl = new FormControl('');
        this.createdByControl = new FormControl('');
        this.viewTypeControl = new FormControl(this.viewType);
        this.buttonGroupConfig = [
            {
                name: 'Definitions',
                value: this.translateService.instant('com.bmc.arsys.rx.client.common.definitions.label')
            },
            {
                name: 'Data',
                value: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.title')
            }
        ];
        this.gridColumns = [
            {
                field: 'bundleName',
                header: ''
            }
        ];
        this.gridData = [];
        this.expandedRowColumns = {
            definitions: [
                {
                    field: 'type',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.definition-type.label')
                },
                { field: 'name', header: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label') }
            ],
            data: [
                {
                    field: 'dataSource',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-source.label')
                },
                {
                    field: 'dataFilter',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-filter.label')
                },
                {
                    field: 'ignoreRuleExecution',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.ignore-rules.label')
                },
                {
                    field: 'duplicateDataActionType',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.duplicates.label')
                }
            ]
        };
        this.expandedRowKeys = {};
        this.packagesList$ = this.rxRecordInstanceDataPageService
            .post({
            params: {
                recorddefinition: AX_BUNDLE_PACKAGING.packageRegistry.recordDefinitionName,
                propertySelection: [
                    RX_RECORD_DEFINITION.coreFieldIds.createdBy,
                    RX_RECORD_DEFINITION.coreFieldIds.modifiedDate,
                    RX_RECORD_DEFINITION.coreFieldIds.id,
                    ...values(AX_BUNDLE_PACKAGING.packageRegistry.fieldIds)
                ],
                queryExpression: [
                    `'${AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.name}'="${this.rxBundleCacheService.bundleId}"`,
                    `'${AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.type}'=${AX_BUNDLE_PACKAGING.packageTypes.content}`,
                    `'${AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.bundlePackageDescriptor}'!=$NULL$`
                ].join(' AND '),
                sortBy: -RX_RECORD_DEFINITION.coreFieldIds.modifiedDate
            }
        })
            .pipe(map((recordInstanceDataPage) => recordInstanceDataPage.data));
        this.packageCreationDateTooltip = {
            popoverMode: true,
            iconName: 'question_circle_o',
            placement: 'right',
            content: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.manage-content-packages.package-creation-date.tooltip')
        };
        this.packagesList = [];
        this.destroyed$ = new ReplaySubject(1);
        this.optionFormatter = this.optionFormatter.bind(this);
    }
    ngOnInit() {
        super.ngOnInit();
        this.busyConfig.busy = this.packagesList$.pipe(take(1)).subscribe((packagesList) => {
            if (packagesList.length) {
                this.packageCreationDateControl.setValue([packagesList[0]]);
            }
            this.packagesList = packagesList;
        });
        this.packageCreationDateControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
            const selectedPackage = first(value);
            if (selectedPackage) {
                this.selectedPackageContent = this.rxJsonParserService.tryParseJson(selectedPackage[AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.bundlePackageDescriptor]);
                this.createdByControl.setValue(selectedPackage[RX_RECORD_DEFINITION.coreFieldIds.createdBy]);
                this.packageNameControl.setValue(this.selectedPackageContent.customPackageName);
            }
            else {
                this.selectedPackageContent = {};
            }
            this.updateGridData();
        });
        this.viewTypeControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((buttonGroup) => {
            this.viewType = buttonGroup;
            this.updateGridData();
        });
    }
    updateGridData() {
        var _a, _b;
        if (this.viewType[0] && ((_a = this.selectedPackageContent) === null || _a === void 0 ? void 0 : _a.definitionsToDeployByType)) {
            this.gridData = reduce(this.selectedPackageContent.definitionsToDeployByType, (result, definitionsByType, definitionType) => {
                const displayType = this.rxStringService.prettify(definitionType);
                definitionsByType.forEach((definitionName) => {
                    const definition = {
                        type: displayType,
                        bundle: this.rxDefinitionNameService.getBundleId(definitionName),
                        name: this.rxDefinitionNameService.getDisplayName(definitionName)
                    };
                    let bundleGroup = find(result, { groupValue: definition.bundle });
                    if (bundleGroup) {
                        bundleGroup.subTableItems.push(definition);
                    }
                    else {
                        bundleGroup = {
                            bundleName: definition.bundle,
                            groupValue: definition.bundle,
                            groupField: 'bundleName',
                            subTableItems: [definition]
                        };
                        this.rxGlobalCacheService
                            .getBundleFriendlyName(this.rxDefinitionNameService.getBundleId(definitionName))
                            .pipe(take(1))
                            .subscribe((bundleFriendlyName) => {
                            bundleGroup.bundleName = bundleFriendlyName;
                            this.expandedRowKeys[bundleFriendlyName] = true;
                        });
                        result.push(bundleGroup);
                    }
                });
                return result;
            }, []);
        }
        else if (this.viewType[1] && ((_b = this.selectedPackageContent) === null || _b === void 0 ? void 0 : _b.dataImportOptionsByRecordDefinitionName)) {
            this.gridData = reduce(this.selectedPackageContent.dataImportOptionsByRecordDefinitionName, (result, data, definitionName) => {
                const bundle = this.rxDefinitionNameService.getBundleId(definitionName);
                data.dataSource = this.rxDefinitionNameService.getDisplayName(definitionName);
                let bundleGroup = find(result, { groupValue: bundle });
                if (bundleGroup) {
                    bundleGroup.subTableItems.push(data);
                }
                else {
                    bundleGroup = {
                        bundleName: bundle,
                        groupValue: bundle,
                        groupField: 'bundleName',
                        subTableItems: [data]
                    };
                    this.rxGlobalCacheService
                        .getBundleFriendlyName(this.rxDefinitionNameService.getBundleId(definitionName))
                        .pipe(take(1))
                        .subscribe((bundleFriendlyName) => {
                        bundleGroup.bundleName = bundleFriendlyName;
                        this.expandedRowKeys[bundleFriendlyName] = true;
                    });
                    result.push(bundleGroup);
                }
                return result;
            }, []);
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    optionFormatter(entry) {
        return this.datePipe.transform(entry[RX_RECORD_DEFINITION.coreFieldIds.modifiedDate], 'medium');
    }
    downloadPackage() {
        this.axBundleDeploymentService
            .download(first(this.packageCreationDateControl.value)[AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.name], first(this.packageCreationDateControl.value)[RX_RECORD_DEFINITION.coreFieldIds.id])
            .subscribe((data) => {
            RxFileService.saveFile(data);
        });
    }
    deletePackage() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.manage-content-packages.delete-confirmation.message')
        })
            .then((result) => {
            if (result) {
                this.busyConfig.busy = this.rxRecordInstanceService
                    .delete(AX_BUNDLE_PACKAGING.packageRegistry.recordDefinitionName, first(this.packageCreationDateControl.value)[RX_RECORD_DEFINITION.coreFieldIds.id])
                    .pipe(switchMapTo(this.packagesList$), take(1))
                    .subscribe((packagesList) => {
                    this.packagesList = packagesList;
                    this.gridData = [];
                    this.packageCreationDateControl.setValue([]);
                    this.packageNameControl.setValue('');
                    this.createdByControl.setValue('');
                });
            }
        });
    }
    close() {
        this.activeModalRef.close();
    }
}
/** @nocollapse */ ManageContentPackagesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageContentPackagesComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.AxBundleDeploymentService }, { token: i3.DatePipe }, { token: i0.Injector }, { token: i4.RxBundleCacheService }, { token: i4.RxDefinitionNameService }, { token: i4.RxGlobalCacheService }, { token: i5.RxJsonParserService }, { token: i6.RxModalService }, { token: i7.RxRecordInstanceDataPageService }, { token: i7.RxRecordInstanceService }, { token: i5.RxStringService }, { token: i8.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ManageContentPackagesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ManageContentPackagesComponent, selector: "ax-manage-content-packages", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.innovation-studio.manage-content-packages.label' | translate }}\n  </h5>\n\n  <button\n    [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.close.label' | translate\"\n    (click)=\"close()\"\n    class=\"close dp-close\"\n    rx-id=\"x-button\"\n    type=\"button\"\n  ></button>\n</div>\n\n<div class=\"modal-body d-flex flex-column\">\n  <div [ngBusy]=\"busyConfig\" class=\"container-fluid mb-3 pr-0\">\n    <div class=\"row flex-nowrap\">\n      <div class=\"row col-12 pr-0\">\n        <div class=\"col pl-0\">\n          <adapt-rx-select\n            [options]=\"packagesList\"\n            [optionFormatter]=\"optionFormatter\"\n            [popupMaxHeight]=\"560\"\n            [formControl]=\"packageCreationDateControl\"\n            [label]=\"\n              'com.bmc.arsys.rx.innovation-studio.manage-content-packages.package-creation-date.label' | translate\n            \"\n            [tooltip]=\"packageCreationDateTooltip\"\n            appendToBody=\"true\"\n            rx-id=\"package-creation-date-select\"\n          >\n          </adapt-rx-select>\n        </div>\n        <div class=\"col\">\n          <adapt-rx-textfield\n            [disabledStyleForReadonlyState]=\"true\"\n            [label]=\"'com.bmc.arsys.rx.innovation-studio.packaging.package-name.label' | translate\"\n            [readonly]=\"true\"\n            [formControl]=\"packageNameControl\"\n            name=\"packageName\"\n            rx-id=\"package-name-field\"\n          ></adapt-rx-textfield>\n        </div>\n        <div class=\"col\">\n          <adapt-rx-textfield\n            [disabledStyleForReadonlyState]=\"true\"\n            [label]=\"'com.bmc.arsys.rx.innovation-studio.manage-content-packages.created-by.label' | translate\"\n            [readonly]=\"true\"\n            [formControl]=\"createdByControl\"\n            name=\"createdBy\"\n            rx-id=\"created-by-field\"\n          ></adapt-rx-textfield>\n        </div>\n        <div class=\"col pr-0\">\n          <adapt-rx-control-label label=\"{{ 'com.bmc.arsys.rx.client.common.action-view.label' | translate }}\">\n          </adapt-rx-control-label>\n\n          <adapt-button-group\n            [config]=\"buttonGroupConfig\"\n            [multiselectable]=\"false\"\n            [uncheckable]=\"false\"\n            [formControl]=\"viewTypeControl\"\n          ></adapt-button-group>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"adapt-table-toolbar adapt-table-toolbar_bordered font-weight-bold px-5 pt-2\">\n    {{ 'com.bmc.arsys.rx.client.common.application.label' | translate }}/{{\n      'com.bmc.arsys.rx.client.common.library.label' | translate\n    }}\n  </div>\n\n  <adapt-table\n    [bordered]=\"true\"\n    [columns]=\"gridColumns\"\n    [sortable]=\"true\"\n    [value]=\"gridData\"\n    [dataKey]=\"'bundleName'\"\n    [expandedRowTemplate]=\"expandedRowTemplate\"\n    [expandedRowKeys]=\"expandedRowKeys\"\n    [scrollable]=\"true\"\n    scrollHeight=\"flex\"\n  ></adapt-table>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    rx-id=\"download-button\"\n    [disabled]=\"!packageCreationDateControl.value?.length\"\n    (click)=\"downloadPackage()\"\n  >\n    {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.download.title' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"delete-button\"\n    [disabled]=\"!packageCreationDateControl.value?.length\"\n    (click)=\"deletePackage()\"\n  >\n    {{ 'com.bmc.arsys.rx.innovation-studio.manage-content-packages.delete-package.label' | translate }}\n  </button>\n\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"close()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n\n<ng-template #expandedRowTemplate let-dataItem=\"dataItem\" let-rowIndex=\"rowIndex\">\n  <div>\n    <adapt-table\n      [columns]=\"viewTypeControl.value[0] ? expandedRowColumns.definitions : expandedRowColumns.data\"\n      [value]=\"dataItem.subTableItems\"\n      [sortable]=\"true\"\n      [sortMode]=\"'multiple'\"\n    ></adapt-table>\n  </div>\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;height:100%}adapt-table::ng-deep .ui-table-thead{display:none}adapt-table::ng-deep adapt-table .ui-table-thead{display:table-header-group}\n"], components: [{ type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptButtonGroupComponent, selector: "adapt-button-group", inputs: ["config", "size", "groupType", "isVertical", "multiselectable", "uncheckable", "useCheckboxStyle"], outputs: ["modelArrayChanged"], exportAs: ["adaptBtnGroup"] }, { type: i9.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.AdaptBusyDirective, selector: "[adapt-busy], [ngBusy]", inputs: ["ngBusy", "adaptRadarDisableEventSending", "busyPromise", "determinate"] }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "translate": i8.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageContentPackagesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-manage-content-packages',
                    templateUrl: './manage-content-packages.component.html',
                    styleUrls: ['manage-content-packages.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.AxBundleDeploymentService }, { type: i3.DatePipe }, { type: i0.Injector }, { type: i4.RxBundleCacheService }, { type: i4.RxDefinitionNameService }, { type: i4.RxGlobalCacheService }, { type: i5.RxJsonParserService }, { type: i6.RxModalService }, { type: i7.RxRecordInstanceDataPageService }, { type: i7.RxRecordInstanceService }, { type: i5.RxStringService }, { type: i8.TranslateService }]; } });
//# sourceMappingURL=manage-content-packages.component.js.map