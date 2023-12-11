import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { RX_RECORD_DEFINITION, RxRecordDefinitionDataPageService } from '@helix/platform/record/api';
import { RX_OVERLAY, RxBundleCacheService, RxDataPageFactoryService, RxDefinitionNameService, RxSessionExpirationService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RxStringService } from '@helix/platform/utils';
import { ColumnSortDirection, RecordGridComponent } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, find, reduce, startsWith } from 'lodash';
import { combineLatest, of, ReplaySubject } from 'rxjs';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../../bundle-details/bundle-details.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@helix/platform/view/components";
export class SelectBundleContentDefinitionsWizardStepComponent {
    constructor(rxBundleCacheService, rxDataPageService, rxDefinitionNameService, rxRecordDefinitionDataPageService, rxSessionExpirationService, rxStringService, rxWizardModalComponent, translateService) {
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxDataPageService = rxDataPageService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxRecordDefinitionDataPageService = rxRecordDefinitionDataPageService;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.rxStringService = rxStringService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        var _a;
        this.currentBundleId = this.rxBundleCacheService.bundleId;
        this.rxWizardModalComponent.api.updateContext({
            cache: {}
        }, false);
        const gridColumns = [
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.item-type.label'),
                fieldId: 'displayType',
                filterable: false,
                sortable: {
                    direction: ColumnSortDirection.Asc,
                    priority: 0
                }
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                fieldId: 'displayName',
                searchable: false,
                filterable: false,
                visible: false
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                fieldId: 'definitionTypeWithName',
                cellTemplate: this.displayTypeWithCellTemplate
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.bundle-name.label'),
                fieldId: 'bundleName',
                visible: false,
                filterable: false,
                sortable: {
                    direction: ColumnSortDirection.Asc,
                    priority: 1
                }
            },
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            Object.assign(Object.assign({}, AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime), { sortable: {
                    direction: ColumnSortDirection.Asc,
                    priority: 2
                } })
        ].map((column) => (Object.assign(Object.assign({}, column), { title: this.translateService.instant(column.title) })));
        const recordDefinition = {
            fieldDefinitions: [
                {
                    id: 'displayType',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'displayName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'definitionTypeWithName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'bundleName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
                }
            ]
        };
        const defaultParams = {
            propertySelection: ['name', 'lastUpdateTime', 'lastChangedBy']
        };
        const recordDefinitionsParams = { propertySelection: [...defaultParams.propertySelection, 'shouldExportData'] };
        const viewDefinitionsParams = {
            excludeExtensionViews: false,
            propertySelection: [...defaultParams.propertySelection]
        };
        const bundleContentRecordDefinitionParams = {
            requireDependent: true,
            recursive: true,
            propertySelection: [...defaultParams.propertySelection, 'internal', 'type']
        };
        this.recordGridConfig$ = of({
            columns: gridColumns,
            enableColumnSelection: false,
            enableFiltering: true,
            enableRowSelection: ((_a = this.options.gridConfig) === null || _a === void 0 ? void 0 : _a.enableRowSelection) || null,
            recordIdField: 'definitionTypeWithName',
            styles: 'flex-fill',
            useExternalFiltering: false,
            expandGroups: true,
            getRecordDefinition: () => of(recordDefinition),
            getData: (queryParams) => {
                this.rxWizardModalComponent.api.disableNextButton();
                return this.rxSessionExpirationService.keepSessionAlive().pipe(switchMap(() => combineLatest([
                    this.rxWizardModalComponent.context$.pipe(take(1)),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentAssociationDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentDocumentDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentEventDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentEventStatisticsDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentNamedListDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentProcessDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentRecordDefinitionDataPageQuery')
                        .get({
                        params: recordDefinitionsParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentRuleDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentViewDefinitionDataPageQuery')
                        .get({
                        params: viewDefinitionsParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentWebApiDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxRecordDefinitionDataPageService.get({ params: bundleContentRecordDefinitionParams }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentRecordInstanceProviderDataPageQuery')
                        .get({
                        params: defaultParams
                    })
                ]).pipe(map(([context, associationDefinitions, documentDefinitions, eventDefinitions, eventStatisticsDefinitions, namedListDefinitions, processDefinitions, recordDefinitions, ruleDefinitions, viewDefinitions, webApiDefinitions, dependentBundleRecordDefinitions, recordInstances]) => {
                    const platformBundleIdPrefix = 'com.bmc.arsys';
                    const cacheRecordInstanceDefinitions = recordInstances.data.reduce((result, recordInstance, index) => {
                        recordInstance.selected = true;
                        recordInstance.initialFixedOrder = index;
                        if (!recordInstance.internal &&
                            !(startsWith(recordInstance.name, platformBundleIdPrefix) &&
                                !startsWith(this.currentBundleId, platformBundleIdPrefix))) {
                            recordInstance.defaultFilter = recordInstance.dataFilter;
                            recordInstance.dataFilter = null;
                            recordInstance.duplicateDataActionType = this.options.gridConfig.defaultDuplicateDataActionType;
                            recordInstance.ignoreRuleExecution = false;
                            recordInstance.bundleName =
                                context.bundleFriendlyNamesById[this.rxDefinitionNameService.getBundleId(recordInstance.name)];
                            result.push(recordInstance);
                        }
                        return result;
                    }, []);
                    const cacheDependentBundleRecordDefinitions = dependentBundleRecordDefinitions.data
                        .filter((instance) => {
                        return !find(cacheRecordInstanceDefinitions, { name: instance.name });
                    })
                        .reduce((result, instance) => {
                        if (!instance.internal &&
                            !(startsWith(instance.name, platformBundleIdPrefix) &&
                                !startsWith(this.currentBundleId, platformBundleIdPrefix))) {
                            instance.defaultFilter = instance.dataFilter;
                            instance.dataFilter = null;
                            instance.duplicateDataActionType = this.options.gridConfig.defaultDuplicateDataActionType;
                            instance.ignoreRuleExecution = false;
                            instance.bundleName =
                                context.bundleFriendlyNamesById[this.rxDefinitionNameService.getBundleId(instance.name)];
                            result.push(instance);
                        }
                        return result;
                    }, []);
                    const cacheRecordDefinitions = [
                        ...cacheRecordInstanceDefinitions,
                        ...cacheDependentBundleRecordDefinitions
                    ];
                    this.rxWizardModalComponent.api.updateContext({
                        cache: {
                            recordDefinitions: cloneDeep(cacheRecordDefinitions)
                        }
                    }, false);
                    this.selectedDefinitionCount = 0;
                    const definitions = reduce({
                        association: associationDefinitions,
                        document: documentDefinitions,
                        event: eventDefinitions,
                        eventStatistics: eventStatisticsDefinitions,
                        namedList: namedListDefinitions,
                        process: processDefinitions,
                        record: recordDefinitions,
                        rule: ruleDefinitions,
                        view: viewDefinitions,
                        webApi: webApiDefinitions
                    }, (allDefinitions, dataPage, definitionType) => {
                        const displayType = this.rxStringService.prettify(definitionType);
                        const definitionsByBundleName = dataPage.data.reduce((result, definition) => {
                            if (definition.customizationPerspective !==
                                RX_OVERLAY.operationTypes.notCustomizedInThisOverlayGroup) {
                                definition.type = definitionType;
                                definition.displayType = displayType;
                                definition.displayName = this.rxDefinitionNameService.getDisplayName(definition.name);
                                definition.definitionTypeWithName = `${definitionType}:${definition.name}`;
                                definition.bundleId = this.rxDefinitionNameService.getBundleId(definition.name);
                                definition.bundleFriendlyName = context.bundleFriendlyNamesById[definition.bundleId];
                                definition.bundleIdWithDefinitionType = `${definition.bundleId}:${definitionType}`;
                                let bundleGroup = find(result, { groupValue: definition.bundleIdWithDefinitionType });
                                if (bundleGroup) {
                                    bundleGroup.items.push(definition);
                                }
                                else {
                                    bundleGroup = {
                                        groupTitle: definition.bundleFriendlyName,
                                        groupValue: definition.bundleIdWithDefinitionType,
                                        groupField: 'bundleName',
                                        items: [definition]
                                    };
                                    result.push(bundleGroup);
                                }
                            }
                            return result;
                        }, []);
                        return allDefinitions.concat(definitionsByBundleName.length
                            ? [
                                {
                                    groupValue: displayType,
                                    groupField: 'displayType',
                                    items: definitionsByBundleName
                                }
                            ]
                            : []);
                    }, []);
                    return {
                        data: definitions,
                        totalSize: definitions.length
                    };
                }))));
            }
        });
        combineLatest([this.recordGrid.rowSelectionChanged, this.rxWizardModalComponent.context$.pipe(take(1))])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(([selectedRows, context]) => {
            this.selectedDefinitionCount = selectedRows.length;
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            newDeploymentPackageDescriptor.definitionsToDeployByType = selectedRows.reduce((definitionsToDeployByType, row) => {
                var _a;
                const definitionType = AX_BUNDLE_DETAILS.definitionTypes[row.type];
                definitionsToDeployByType[definitionType] = (_a = definitionsToDeployByType[definitionType]) !== null && _a !== void 0 ? _a : [];
                definitionsToDeployByType[definitionType].push(row.name);
                return definitionsToDeployByType;
            }, {});
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor,
                isPackageDataModified: true
            }, this.selectedDefinitionCount > 0);
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    onDataLoaded() {
        this.rxWizardModalComponent.api.enableNextButton();
    }
}
/** @nocollapse */ SelectBundleContentDefinitionsWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectBundleContentDefinitionsWizardStepComponent, deps: [{ token: i1.RxBundleCacheService }, { token: i1.RxDataPageFactoryService }, { token: i1.RxDefinitionNameService }, { token: i2.RxRecordDefinitionDataPageService }, { token: i1.RxSessionExpirationService }, { token: i3.RxStringService }, { token: i4.RxWizardModalComponent }, { token: i5.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ SelectBundleContentDefinitionsWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectBundleContentDefinitionsWizardStepComponent, selector: "ax-select-bundle-content-definitions-wizard-step", inputs: { options: "options" }, viewQueries: [{ propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }, { propertyName: "displayTypeWithCellTemplate", first: true, predicate: ["displayTypeWithCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"d-flex justify-content-between\">\n  <h5 class=\"mt-0\">\n    {{\n      'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.customized-definitions.label'\n        | translate\n    }}\n  </h5>\n  <div>\n    {{\n      'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.definitions-count.label'\n        | translate\n          : {\n              count: selectedDefinitionCount,\n              packageType: this.options.displayName.toLowerCase()\n            }\n    }}\n  </div>\n</div>\n\n<div class=\"mb-3\">\n  {{\n    'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-bundle-content-definitions.select-customized-definitions-to-include-in-the-package-content-package.label'\n      | translate\n  }}\n</div>\n\n<rx-record-grid [config]=\"recordGridConfig$\" (dataLoaded)=\"onDataLoaded()\"></rx-record-grid>\n\n<ng-template #displayTypeWithCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}\n"], components: [{ type: i6.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i5.TranslatePipe, "rxDefinitionNamePipe": i1.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectBundleContentDefinitionsWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-select-bundle-content-definitions-wizard-step',
                    templateUrl: './select-bundle-content-definitions-wizard-step.component.html',
                    styleUrls: ['./select-bundle-content-definitions-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxBundleCacheService }, { type: i1.RxDataPageFactoryService }, { type: i1.RxDefinitionNameService }, { type: i2.RxRecordDefinitionDataPageService }, { type: i1.RxSessionExpirationService }, { type: i3.RxStringService }, { type: i4.RxWizardModalComponent }, { type: i5.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }], recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }], displayTypeWithCellTemplate: [{
                type: ViewChild,
                args: ['displayTypeWithCellTemplate', { static: true }]
            }] } });
//# sourceMappingURL=select-bundle-content-definitions-wizard-step.component.js.map