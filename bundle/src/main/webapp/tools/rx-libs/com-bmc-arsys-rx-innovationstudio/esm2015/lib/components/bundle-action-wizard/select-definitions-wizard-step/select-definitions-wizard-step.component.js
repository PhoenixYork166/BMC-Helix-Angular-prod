import { Component, Input, ViewChild } from '@angular/core';
import { RxAssociationDefinitionDataPageService } from '@helix/platform/association/api';
import { RxDocumentDefinitionDataPageService } from '@helix/platform/document/api';
import { RxeventStatisticsDefinitionDataPageService } from '@helix/platform/event-statistics/api';
import { RxEventDefinitionDataPageService } from '@helix/platform/event/api';
import { RxNamedListDefinitionDataPageService } from '@helix/platform/named-list/api';
import { RxProcessDefinitionDataPageService } from '@helix/platform/process/api';
import { RX_RECORD_DEFINITION, RxRecordDefinitionDataPageService } from '@helix/platform/record/api';
import { RxRuleDefinitionDataPageService } from '@helix/platform/rule/api';
import { RX_OVERLAY, RxDefinitionNameService, RxSessionExpirationService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RxStringService } from '@helix/platform/utils';
import { RxViewDefinitionDataPageService } from '@helix/platform/view/api';
import { ColumnSortDirection, RecordGridComponent } from '@helix/platform/view/components';
import { RxWebApiDefinitionDataPageService } from '@helix/platform/web-api/api';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, reduce, reject } from 'lodash';
import { combineLatest, of, ReplaySubject } from 'rxjs';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../../bundle-details/bundle-details.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/components";
import * as i2 from "@helix/platform/association/api";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/document/api";
import * as i5 from "@helix/platform/event/api";
import * as i6 from "@helix/platform/event-statistics/api";
import * as i7 from "@helix/platform/named-list/api";
import * as i8 from "@helix/platform/process/api";
import * as i9 from "@helix/platform/record/api";
import * as i10 from "@helix/platform/rule/api";
import * as i11 from "@helix/platform/utils";
import * as i12 from "@helix/platform/view/api";
import * as i13 from "@helix/platform/web-api/api";
import * as i14 from "@ngx-translate/core";
import * as i15 from "@helix/platform/view/components";
export class SelectDefinitionsWizardStepComponent {
    constructor(rxWizardModalComponent, rxAssociationDefinitionDataPageService, rxDefinitionNameService, rxDocumentDefinitionDataPageService, rxEventDefinitionDataPageService, rxEventStatisticsDefinitionDataPageService, rxNamedListDefinitionDataPageService, rxProcessDefinitionDataPageService, rxRecordDefinitionDataPageService, rxRuleDefinitionDataPageService, rxSessionExpirationService, rxStringService, rxViewDefinitionDataPageService, rxWebApiDefinitionDataPageService, translateService) {
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.rxAssociationDefinitionDataPageService = rxAssociationDefinitionDataPageService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxDocumentDefinitionDataPageService = rxDocumentDefinitionDataPageService;
        this.rxEventDefinitionDataPageService = rxEventDefinitionDataPageService;
        this.rxEventStatisticsDefinitionDataPageService = rxEventStatisticsDefinitionDataPageService;
        this.rxNamedListDefinitionDataPageService = rxNamedListDefinitionDataPageService;
        this.rxProcessDefinitionDataPageService = rxProcessDefinitionDataPageService;
        this.rxRecordDefinitionDataPageService = rxRecordDefinitionDataPageService;
        this.rxRuleDefinitionDataPageService = rxRuleDefinitionDataPageService;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.rxStringService = rxStringService;
        this.rxViewDefinitionDataPageService = rxViewDefinitionDataPageService;
        this.rxWebApiDefinitionDataPageService = rxWebApiDefinitionDataPageService;
        this.translateService = translateService;
        this.selectedDefinitionCount = 0;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        var _a, _b;
        this.rxWizardModalComponent.api.updateContext({
            cache: {}
        }, false);
        const gridColumns = [
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.item-type.label'),
                fieldId: 'displayType',
                sortable: { direction: ColumnSortDirection.Desc, priority: 0 }
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                fieldId: 'displayName'
            },
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            Object.assign({ sortable: { direction: ColumnSortDirection.Desc, priority: 1 } }, AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime),
            AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective
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
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
                },
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        const defaultParams = {
            propertySelection: ['name', 'lastUpdateTime', 'lastChangedBy', 'customizationPerspective']
        };
        const recordDefinitionsParams = {
            propertySelection: [...defaultParams.propertySelection, 'shouldExportData', 'type']
        };
        const viewDefinitionsParams = {
            excludeExtensionViews: false,
            propertySelection: [...defaultParams.propertySelection]
        };
        this.recordGridConfig$ = of({
            columns: gridColumns,
            enableColumnSelection: false,
            enableRowSelection: ((_a = this.options.gridConfig) === null || _a === void 0 ? void 0 : _a.enableRowSelection) || null,
            recordIdField: 'definitionTypeWithName',
            styles: 'flex-fill',
            useExternalFiltering: false,
            expandGroups: true,
            getRecordDefinition: () => of(recordDefinition),
            getData: (queryParams) => {
                this.rxWizardModalComponent.api.disableNextButton();
                return this.rxSessionExpirationService.keepSessionAlive().pipe(switchMap(() => combineLatest([
                    this.rxRecordDefinitionDataPageService.get({ params: recordDefinitionsParams }),
                    this.rxAssociationDefinitionDataPageService.get({ params: defaultParams }),
                    this.rxDocumentDefinitionDataPageService.get({ params: defaultParams }),
                    this.rxEventDefinitionDataPageService.get({ params: defaultParams }),
                    this.rxEventStatisticsDefinitionDataPageService.get({ params: defaultParams }),
                    this.rxNamedListDefinitionDataPageService.get({ params: defaultParams }),
                    this.rxProcessDefinitionDataPageService.get({ params: defaultParams }),
                    this.rxRuleDefinitionDataPageService.get({ params: defaultParams }),
                    this.rxViewDefinitionDataPageService.get({ params: viewDefinitionsParams }),
                    this.rxWebApiDefinitionDataPageService.get({ params: viewDefinitionsParams })
                ]).pipe(map(([recordDefinitions, associationDefinitions, documentDefinitions, eventDefinitions, eventStatisticsDefinitions, namedListDefinitions, processDefinitions, ruleDefinitions, viewDefinitions, webApiDefinitions]) => {
                    this.rxWizardModalComponent.api.updateContext({
                        cache: {
                            recordDefinitions: cloneDeep(recordDefinitions.data)
                        }
                    }, false);
                    this.selectedDefinitionCount = 0;
                    const definitions = reduce({
                        association: associationDefinitions,
                        document: documentDefinitions,
                        event: eventDefinitions,
                        eventStatistic: eventStatisticsDefinitions,
                        namedList: namedListDefinitions,
                        process: processDefinitions,
                        record: recordDefinitions,
                        rule: ruleDefinitions,
                        view: viewDefinitions,
                        webApi: webApiDefinitions
                    }, (allDefinitions, dataPage, definitionType) => {
                        var _a;
                        const definitionsByType = reject(dataPage.data, (definition) => definition.customizationPerspective ===
                            RX_OVERLAY.operationTypes.notCustomizedInThisOverlayGroup);
                        const displayType = this.rxStringService.prettify(definitionType);
                        definitionsByType.forEach((definition) => {
                            definition.type = definitionType;
                            definition.displayType = displayType;
                            definition.displayName = this.rxDefinitionNameService.getDisplayName(definition.name);
                            definition.definitionTypeWithName = `${definitionType}:${definition.name}`;
                        });
                        if (!((_a = this.options.gridConfig) === null || _a === void 0 ? void 0 : _a.enableRowSelection)) {
                            this.selectedDefinitionCount += definitionsByType.length;
                        }
                        return allDefinitions.concat((definitionsByType === null || definitionsByType === void 0 ? void 0 : definitionsByType.length)
                            ? [
                                {
                                    groupValue: displayType,
                                    groupField: 'displayType',
                                    items: definitionsByType
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
        if ((_b = this.options.gridConfig) === null || _b === void 0 ? void 0 : _b.enableRowSelection) {
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
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    onDataLoaded() {
        this.rxWizardModalComponent.api.enableNextButton();
    }
}
/** @nocollapse */ SelectDefinitionsWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsWizardStepComponent, deps: [{ token: i1.RxWizardModalComponent }, { token: i2.RxAssociationDefinitionDataPageService }, { token: i3.RxDefinitionNameService }, { token: i4.RxDocumentDefinitionDataPageService }, { token: i5.RxEventDefinitionDataPageService }, { token: i6.RxeventStatisticsDefinitionDataPageService }, { token: i7.RxNamedListDefinitionDataPageService }, { token: i8.RxProcessDefinitionDataPageService }, { token: i9.RxRecordDefinitionDataPageService }, { token: i10.RxRuleDefinitionDataPageService }, { token: i3.RxSessionExpirationService }, { token: i11.RxStringService }, { token: i12.RxViewDefinitionDataPageService }, { token: i13.RxWebApiDefinitionDataPageService }, { token: i14.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ SelectDefinitionsWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectDefinitionsWizardStepComponent, selector: "ax-select-definitions-wizard-step", inputs: { options: "options" }, viewQueries: [{ propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }], ngImport: i0, template: "<div class=\"d-flex justify-content-between\">\n  <h5 class=\"mt-0\">\n    {{\n      'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.customized-definitions.label'\n        | translate\n    }}\n  </h5>\n  <div>\n    {{\n      'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.definitions-count.label'\n        | translate\n          : {\n              count: selectedDefinitionCount,\n              packageType: this.options.displayName.toLowerCase()\n            }\n    }}\n  </div>\n</div>\n\n<div class=\"mb-3\">\n  {{\n    'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.definitions-included-in-the-package.label'\n      | translate\n  }}\n</div>\n\n<rx-record-grid [config]=\"recordGridConfig$\" (dataLoaded)=\"onDataLoaded()\"></rx-record-grid>\n", styles: [":host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}\n"], components: [{ type: i15.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i14.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-select-definitions-wizard-step',
                    templateUrl: './select-definitions-wizard-step.component.html',
                    styleUrls: ['./select-definitions-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxWizardModalComponent }, { type: i2.RxAssociationDefinitionDataPageService }, { type: i3.RxDefinitionNameService }, { type: i4.RxDocumentDefinitionDataPageService }, { type: i5.RxEventDefinitionDataPageService }, { type: i6.RxeventStatisticsDefinitionDataPageService }, { type: i7.RxNamedListDefinitionDataPageService }, { type: i8.RxProcessDefinitionDataPageService }, { type: i9.RxRecordDefinitionDataPageService }, { type: i10.RxRuleDefinitionDataPageService }, { type: i3.RxSessionExpirationService }, { type: i11.RxStringService }, { type: i12.RxViewDefinitionDataPageService }, { type: i13.RxWebApiDefinitionDataPageService }, { type: i14.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }], recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }] } });
//# sourceMappingURL=select-definitions-wizard-step.component.js.map