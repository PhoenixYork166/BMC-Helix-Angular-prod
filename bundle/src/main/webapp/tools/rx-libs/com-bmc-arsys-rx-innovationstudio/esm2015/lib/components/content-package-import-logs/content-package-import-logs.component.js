import { DatePipe } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActiveModalRef, LoaderType } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxBundleCacheService, RxDefinitionNameService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { RxJsonParserService, RxStringService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { find, first, startsWith, values } from 'lodash';
import { ReplaySubject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { AxBundleDeploymentService } from '../../services/bundle-deployment';
import { AX_BUNDLE_PACKAGING } from '../../services/bundle-deployment/bundle-packaging.constant';
import { AX_CONTENT_PACKAGE_IMPORT_LOGS } from './content-package-import-logs.constant';
import { AX_BUNDLE_DETAILS } from '../bundle-details/bundle-details.constant';
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
export class ContentPackageImportLogsComponent extends RxModalClass {
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
            message: this.translateService.instant('com.bmc.arsys.rx.client.loading-data.label'),
            loaderType: LoaderType.LINE
        };
        this.viewTypes = [true, false];
        this.messageTypes = [true, false, false, false];
        this.packageCreationDateControl = new FormControl([]);
        this.packageNameControl = new FormControl('');
        this.createdByControl = new FormControl('');
        this.viewTypeControl = new FormControl(this.viewTypes);
        this.messagesTypeControl = new FormControl(this.messageTypes);
        this.buttonGroupConfig = [
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.definitions.label')
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.title')
            }
        ];
        this.messagesButtonGroupConfig = [
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.all.label'),
                value: AX_CONTENT_PACKAGE_IMPORT_LOGS.messageTypes.all
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.success.label'),
                value: 'SUCCESS'
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                value: 'WARNING'
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.error.label'),
                value: 'ERROR'
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.content-package-import-logs.unchanged.label'),
                value: 'UNCHANGED'
            }
        ];
        this.selectedPackageContent = {};
        this.gridColumns = [
            {
                field: 'bundleName',
                header: ''
            }
        ];
        this.expandedRowColumns = {
            data: [
                {
                    field: 'dataSource',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-source.label')
                },
                {
                    field: 'successCount',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.success.label')
                },
                {
                    field: 'warningCount',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label')
                },
                {
                    field: 'errorCount',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.error.label')
                },
                {
                    field: 'UnchangedCount',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.content-package-import-logs.unchanged.label')
                }
            ],
            definitions: [
                {
                    field: 'definitionType',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.definition-type.label')
                },
                {
                    field: 'success',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.success.label')
                },
                {
                    field: 'warning',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label')
                },
                {
                    field: 'error',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.error.label')
                },
                {
                    field: 'Unchanged',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.content-package-import-logs.unchanged.label')
                }
            ]
        };
        this.messagesGridColumns = {
            data: [
                {
                    field: 'dataSource',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-source.label'),
                    width: '20%'
                },
                {
                    field: 'message',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.message.label')
                }
            ],
            definitions: [
                {
                    field: 'definitionType',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.definition-type.label'),
                    width: '20%'
                },
                {
                    field: 'name',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
                },
                {
                    field: 'message',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.message.label')
                }
            ]
        };
        this.gridData = [];
        this.messagesGridData = [];
        this.gridSelectedItems = [];
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
                    `'${AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.deployError}'!=$NULL$`,
                    `'${AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.packageDeployStatus}'="${AX_BUNDLE_DETAILS.packageDeployStatuses.deployed}"`
                ].join(' AND '),
                sortBy: -RX_RECORD_DEFINITION.coreFieldIds.modifiedDate
            }
        })
            .pipe(map((recordInstanceDataPage) => recordInstanceDataPage.data));
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
                this.packageNameControl.setValue(selectedPackage[AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.name]);
                this.createdByControl.setValue(selectedPackage[RX_RECORD_DEFINITION.coreFieldIds.createdBy]);
                this.selectedPackageContent = this.rxJsonParserService.tryParseJson(selectedPackage[AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.deployError]);
            }
            else {
                this.selectedPackageContent = {};
            }
            this.updateGridData();
        });
        this.viewTypeControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((buttonGroup) => {
            this.viewTypes = buttonGroup;
            this.gridSelectedItems = [];
            this.updateGridData();
            this.updateMessagesGridData();
        });
        this.messagesTypeControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((messagesButtonGroup) => {
            this.messageTypes = messagesButtonGroup;
            this.updateMessagesGridData();
        });
    }
    updateGridData() {
        var _a, _b, _c, _d;
        if (this.viewTypes[0] && ((_b = (_a = this.selectedPackageContent) === null || _a === void 0 ? void 0 : _a.overallImportSummary) === null || _b === void 0 ? void 0 : _b.definition)) {
            this.gridData = this.selectedPackageContent.overallImportSummary.definition.reduce((result, definitionsByType) => {
                definitionsByType.status.forEach((status) => {
                    const bundle = this.rxDefinitionNameService.getBundleId(status.name);
                    let bundleGroup = find(result, { groupValue: bundle });
                    if (bundleGroup) {
                        let definition = find(bundleGroup.subTableItems, {
                            definitionType: AX_CONTENT_PACKAGE_IMPORT_LOGS.definitionTypeMap[definitionsByType.definitionType]
                        });
                        if (!definition) {
                            definition = {
                                definitionType: AX_CONTENT_PACKAGE_IMPORT_LOGS.definitionTypeMap[definitionsByType.definitionType],
                                error: 0,
                                statuses: [],
                                success: 0,
                                unchanged: 0,
                                warning: 0
                            };
                            bundleGroup.subTableItems.push(definition);
                        }
                        definition[AX_CONTENT_PACKAGE_IMPORT_LOGS.importStatuses[status.messageType]]++;
                        definition.statuses.push(status);
                    }
                    else {
                        const definition = {
                            definitionType: AX_CONTENT_PACKAGE_IMPORT_LOGS.definitionTypeMap[definitionsByType.definitionType],
                            error: 0,
                            statuses: [status],
                            success: 0,
                            unchanged: 0,
                            warning: 0
                        };
                        definition[AX_CONTENT_PACKAGE_IMPORT_LOGS.importStatuses[status.messageType]]++;
                        bundleGroup = {
                            bundleName: bundle,
                            groupValue: bundle,
                            groupField: 'bundleName',
                            subTableItems: [definition]
                        };
                        this.rxGlobalCacheService
                            .getBundleFriendlyName(bundle)
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
        else if (this.viewTypes[1] && ((_d = (_c = this.selectedPackageContent) === null || _c === void 0 ? void 0 : _c.overallImportSummary) === null || _d === void 0 ? void 0 : _d.data)) {
            this.gridData = this.selectedPackageContent.overallImportSummary.data.reduce((result, dataItem) => {
                const bundle = this.rxDefinitionNameService.getBundleId(dataItem.recordDefinitionName);
                const dataSource = this.rxDefinitionNameService.getDisplayName(dataItem.recordDefinitionName);
                const item = Object.assign({ dataSource }, dataItem);
                let bundleGroup = find(result, { groupValue: bundle });
                if (bundleGroup) {
                    bundleGroup.subTableItems.push(item);
                }
                else {
                    bundleGroup = {
                        bundleName: bundle,
                        groupValue: bundle,
                        groupField: 'bundleName',
                        subTableItems: [item]
                    };
                    this.rxGlobalCacheService
                        .getBundleFriendlyName(bundle)
                        .pipe(take(1))
                        .subscribe((bundleFriendlyName) => {
                        bundleGroup.bundleName = bundleFriendlyName;
                    });
                    result.push(bundleGroup);
                }
                return result;
            }, []);
        }
    }
    updateMessagesGridData() {
        const messagesType = this.messagesButtonGroupConfig[this.messageTypes.indexOf(true)].value;
        if (this.viewTypes[0]) {
            this.messagesGridData = this.gridSelectedItems.reduce((result, item) => {
                const messages = item.statuses.reduce((res, status) => {
                    const statusMessages = status.messages.reduce((resultMessages, message) => {
                        if (messagesType === AX_CONTENT_PACKAGE_IMPORT_LOGS.messageTypes.all || startsWith(message, messagesType)) {
                            resultMessages.push({
                                definitionType: item.definitionType,
                                message,
                                name: this.rxDefinitionNameService.getDisplayName(status.name)
                            });
                        }
                        return resultMessages;
                    }, []);
                    return [...res, ...statusMessages];
                }, []);
                return [...result, ...messages];
            }, []);
        }
        else if (this.viewTypes[1]) {
            this.messagesGridData = this.gridSelectedItems.reduce((result, item) => {
                const messages = item.messages.reduce((res, message) => {
                    if (messagesType === AX_CONTENT_PACKAGE_IMPORT_LOGS.messageTypes.all || startsWith(message, messagesType)) {
                        res.push({
                            dataSource: item.dataSource,
                            message
                        });
                    }
                    return res;
                }, []);
                return [...result, ...messages];
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
    onSelectionChange(selectedData) {
        this.gridSelectedItems = selectedData;
        this.updateMessagesGridData();
    }
    close() {
        this.activeModalRef.close();
    }
}
/** @nocollapse */ ContentPackageImportLogsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContentPackageImportLogsComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.AxBundleDeploymentService }, { token: i3.DatePipe }, { token: i0.Injector }, { token: i4.RxBundleCacheService }, { token: i4.RxDefinitionNameService }, { token: i4.RxGlobalCacheService }, { token: i5.RxJsonParserService }, { token: i6.RxModalService }, { token: i7.RxRecordInstanceDataPageService }, { token: i7.RxRecordInstanceService }, { token: i5.RxStringService }, { token: i8.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ContentPackageImportLogsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ContentPackageImportLogsComponent, selector: "ax-content-package-import-logs", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.innovation-studio.content-package-import-logs.label' | translate }}\n  </h5>\n\n  <button\n    [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.close.label' | translate\"\n    (click)=\"close()\"\n    class=\"close dp-close\"\n    rx-id=\"x-button\"\n    type=\"button\"\n  ></button>\n</div>\n\n<div class=\"modal-body d-flex flex-column\">\n  <div [ngBusy]=\"busyConfig\" class=\"container-fluid mb-3 pr-0\">\n    <div class=\"row flex-nowrap\">\n      <div class=\"row col-12 pr-0\">\n        <div class=\"col pl-0\">\n          <adapt-rx-select\n            [options]=\"packagesList\"\n            [optionFormatter]=\"optionFormatter\"\n            [popupMaxHeight]=\"560\"\n            [formControl]=\"packageCreationDateControl\"\n            [label]=\"\n              'com.bmc.arsys.rx.innovation-studio.manage-content-packages.package-creation-date.label' | translate\n            \"\n            appendToBody=\"true\"\n            rx-id=\"package-creation-date-select\"\n          >\n          </adapt-rx-select>\n        </div>\n        <div class=\"col\">\n          <adapt-rx-textfield\n            [disabledStyleForReadonlyState]=\"true\"\n            [label]=\"'com.bmc.arsys.rx.innovation-studio.packaging.package-name.label' | translate\"\n            [readonly]=\"true\"\n            [formControl]=\"packageNameControl\"\n            name=\"packageName\"\n            rx-id=\"package-name-field\"\n          ></adapt-rx-textfield>\n        </div>\n        <div class=\"col\">\n          <adapt-rx-textfield\n            [disabledStyleForReadonlyState]=\"true\"\n            [label]=\"'com.bmc.arsys.rx.innovation-studio.manage-content-packages.created-by.label' | translate\"\n            [readonly]=\"true\"\n            [formControl]=\"createdByControl\"\n            name=\"createdBy\"\n            rx-id=\"created-by-field\"\n          ></adapt-rx-textfield>\n        </div>\n        <div class=\"col pr-0\">\n          <adapt-rx-control-label label=\"{{ 'com.bmc.arsys.rx.client.common.action-view.label' | translate }}\">\n          </adapt-rx-control-label>\n\n          <adapt-button-group\n            [config]=\"buttonGroupConfig\"\n            [multiselectable]=\"false\"\n            [uncheckable]=\"false\"\n            [formControl]=\"viewTypeControl\"\n          ></adapt-button-group>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"adapt-table-toolbar adapt-table-toolbar_bordered font-weight-bold px-5 pt-2\">\n    {{ 'com.bmc.arsys.rx.client.common.application.label' | translate }}/{{\n      'com.bmc.arsys.rx.client.common.library.label' | translate\n    }}\n  </div>\n  <div class=\"h-100\">\n    <div class=\"h-50\">\n      <adapt-table\n        [bordered]=\"true\"\n        [columns]=\"gridColumns\"\n        [sortable]=\"true\"\n        [value]=\"gridData\"\n        [dataKey]=\"'bundleName'\"\n        [expandedRowKeys]=\"expandedRowKeys\"\n        [expandedRowTemplate]=\"expandedRowTemplate\"\n        [scrollable]=\"true\"\n        scrollHeight=\"flex\"\n        class=\"application-library-table\"\n      ></adapt-table>\n    </div>\n    <div class=\"h-50 overflow-hidden border-bottom\">\n      <adapt-rx-control-label\n        label=\"{{ 'com.bmc.arsys.rx.client.common.messages.label' | translate }}\"\n        class=\"d-flex my-2\"\n      ></adapt-rx-control-label>\n      <div class=\"my-2\">\n        <adapt-button-group\n          [config]=\"messagesButtonGroupConfig\"\n          [multiselectable]=\"false\"\n          [uncheckable]=\"false\"\n          [formControl]=\"messagesTypeControl\"\n          class=\"mb-2\"\n        ></adapt-button-group>\n      </div>\n      <adapt-table\n        [bordered]=\"true\"\n        [columns]=\"viewTypeControl.value[0] ? messagesGridColumns.definitions : messagesGridColumns.data\"\n        [dataKey]=\"'definitionType'\"\n        [sortable]=\"true\"\n        [sortMode]=\"'multiple'\"\n        [value]=\"messagesGridData\"\n        [scrollable]=\"true\"\n        scrollHeight=\"190px\"\n      ></adapt-table>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"close()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n\n<ng-template #expandedRowTemplate let-dataItem=\"dataItem\" let-rowIndex=\"rowIndex\">\n  <div>\n    <adapt-table\n      [columns]=\"viewTypeControl.value[0] ? expandedRowColumns.definitions : expandedRowColumns.data\"\n      [value]=\"dataItem.subTableItems\"\n      [sortable]=\"true\"\n      [sortMode]=\"'multiple'\"\n      [selectionMode]=\"'multiple'\"\n      [selection]=\"gridSelectedItems\"\n      (selectionChange)=\"onSelectionChange($event)\"\n    ></adapt-table>\n  </div>\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;height:100%}adapt-table.application-library-table::ng-deep .ui-table-thead{display:none}adapt-table.application-library-table::ng-deep adapt-table .ui-table-thead{display:table-header-group}\n"], components: [{ type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptButtonGroupComponent, selector: "adapt-button-group", inputs: ["config", "size", "groupType", "isVertical", "multiselectable", "uncheckable", "useCheckboxStyle"], outputs: ["modelArrayChanged"], exportAs: ["adaptBtnGroup"] }, { type: i9.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.AdaptBusyDirective, selector: "[adapt-busy], [ngBusy]", inputs: ["ngBusy", "adaptRadarDisableEventSending", "busyPromise", "determinate"] }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "translate": i8.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContentPackageImportLogsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-content-package-import-logs',
                    templateUrl: './content-package-import-logs.component.html',
                    styleUrls: ['content-package-import-logs.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.AxBundleDeploymentService }, { type: i3.DatePipe }, { type: i0.Injector }, { type: i4.RxBundleCacheService }, { type: i4.RxDefinitionNameService }, { type: i4.RxGlobalCacheService }, { type: i5.RxJsonParserService }, { type: i6.RxModalService }, { type: i7.RxRecordInstanceDataPageService }, { type: i7.RxRecordInstanceService }, { type: i5.RxStringService }, { type: i8.TranslateService }]; } });
//# sourceMappingURL=content-package-import-logs.component.js.map