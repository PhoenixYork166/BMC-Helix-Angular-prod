import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxDefinitionNameService, RxSessionExpirationService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RxStringService } from '@helix/platform/utils';
import { ColumnSortDirection, RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, reduce } from 'lodash';
import { combineLatest, of, ReplaySubject } from 'rxjs';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../../bundle-details/bundle-details.constant';
import { DefinitionHistoryDataPageService } from './definition-history-data-page.service';
import * as i0 from "@angular/core";
import * as i1 from "./definition-history-data-page.service";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@helix/platform/view/components";
export class SelectDefinitionsToDeleteWizardStepComponent {
    constructor(definitionHistoryDataPageService, rxDefinitionNameService, rxSessionExpirationService, rxStringService, rxWizardModalComponent, translateService) {
        this.definitionHistoryDataPageService = definitionHistoryDataPageService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.rxStringService = rxStringService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.selectedDefinitionCount = 0;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        const gridColumns = [
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.item-type.label'),
                fieldId: 'displayType',
                sortable: {
                    priority: 0,
                    direction: ColumnSortDirection.Asc
                },
                filterable: false
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                fieldId: 'objectName',
                wrapText: true,
                cellTemplate: this.recordNameCellTemplate
            },
            {
                fieldId: 'createdBy',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions-to-delete.deleted-by.label')
            },
            {
                fieldId: 'createDate',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions-to-delete.deleted-date.label'),
                sortable: {
                    priority: 2,
                    direction: ColumnSortDirection.Asc
                }
            },
            {
                fieldId: 'bundleName',
                title: this.translateService.instant('com.bmc.arsys.rx.client.bundle-name.label'),
                sortable: {
                    priority: 1,
                    direction: ColumnSortDirection.Asc
                },
                filterable: false,
                visible: false
            }
        ].map((column) => (Object.assign(Object.assign({}, column), { title: this.translateService.instant(column.title) })));
        const recordDefinition = {
            fieldDefinitions: [
                {
                    id: 'objectName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'createdBy',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'createDate',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
                },
                {
                    id: 'displayType',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'bundleName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        combineLatest([this.recordGrid.rowSelectionChanged, this.rxWizardModalComponent.context$.pipe(take(1))])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(([selectedRows, context]) => {
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            this.selectedDefinitionCount = selectedRows.length;
            newDeploymentPackageDescriptor.definitionsToDeleteByType = selectedRows.reduce((definitionsToDeleteByType, row) => {
                var _a;
                const definitionType = AX_BUNDLE_DETAILS.definitionTypes[row.type];
                definitionsToDeleteByType[definitionType] = (_a = definitionsToDeleteByType[definitionType]) !== null && _a !== void 0 ? _a : [];
                definitionsToDeleteByType[definitionType].push(row.objectName);
                return definitionsToDeleteByType;
            }, {});
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor,
                isPackageDataModified: true
            }, this.selectedDefinitionCount > 0);
        });
        this.recordGridConfig$ = of({
            columns: gridColumns,
            enableColumnSelection: false,
            enableFiltering: true,
            enableRowSelection: RowSelectionMode.Multiple,
            recordIdField: 'definitionTypeWithName',
            styles: 'flex-fill',
            useExternalFiltering: false,
            expandGroups: true,
            getRecordDefinition: () => of(recordDefinition),
            getData: (queryParams) => {
                this.rxWizardModalComponent.api.disableNextButton();
                return this.rxSessionExpirationService.keepSessionAlive().pipe(switchMap(() => {
                    var _a;
                    const defaultParams = {
                        operationType: 'DELETE'
                    };
                    if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.isContentPackageOperation) {
                        defaultParams.requireDependent = true;
                        defaultParams.recursive = true;
                        defaultParams.requireLatestVersion = true;
                    }
                    return combineLatest([
                        this.definitionHistoryDataPageService.get({ params: Object.assign({ objectType: 'ASSOCIATION' }, defaultParams) }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'DOCUMENT_DEFINITION' }, defaultParams)
                        }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'EVENT_DEFINITION' }, defaultParams)
                        }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'EVENT_STATISTICS_DEFINITION' }, defaultParams)
                        }),
                        this.definitionHistoryDataPageService.get({ params: Object.assign({ objectType: 'NAMED_LIST' }, defaultParams) }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'PROCESS_DEFINITION' }, defaultParams)
                        }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'RECORD_DEFINITION' }, defaultParams)
                        }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'RULE_DEFINITION' }, defaultParams)
                        }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'VIEW_DEFINITION' }, defaultParams)
                        }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'WEBAPI_DEFINITION' }, defaultParams)
                        })
                    ]).pipe(map(([associationDefinitions, documentDefinitions, eventDefinitions, eventStatisticsDefinitions, namedListDefinitions, processDefinitions, recordDefinitions, ruleDefinitions, viewDefinitions, webApiDefinitions]) => {
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
                            const definitionsByType = dataPage.data;
                            const displayType = this.rxStringService.prettify(definitionType);
                            definitionsByType.forEach((definition) => {
                                definition.type = definitionType;
                                definition.displayType = displayType;
                                definition.displayName = this.rxDefinitionNameService.getDisplayName(definition.objectName);
                                definition.definitionTypeWithName = `${definitionType}:${definition.objectName}`;
                            });
                            return allDefinitions.concat(definitionsByType.length
                                ? [
                                    {
                                        groupValue: displayType,
                                        groupField: 'type',
                                        items: definitionsByType
                                    }
                                ]
                                : []);
                        }, []);
                        return {
                            data: definitions,
                            totalSize: definitions.length
                        };
                    }));
                }));
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    onDataLoaded() {
        this.rxWizardModalComponent.api.enableNextButton();
    }
}
/** @nocollapse */ SelectDefinitionsToDeleteWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsToDeleteWizardStepComponent, deps: [{ token: i1.DefinitionHistoryDataPageService }, { token: i2.RxDefinitionNameService }, { token: i2.RxSessionExpirationService }, { token: i3.RxStringService }, { token: i4.RxWizardModalComponent }, { token: i5.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ SelectDefinitionsToDeleteWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectDefinitionsToDeleteWizardStepComponent, selector: "ax-select-definitions-to-delete-wizard-step", inputs: { options: "options" }, viewQueries: [{ propertyName: "recordNameCellTemplate", first: true, predicate: ["recordNameCellTemplate"], descendants: true, static: true }, { propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }], ngImport: i0, template: "<div class=\"d-flex justify-content-between\">\n  <h5 class=\"mt-0\">\n    {{'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions-to-delete.deleted-definitions.label' |\n    translate}}\n\n    <adapt-icon\n      name=\"question_circle_o\"\n      class=\"ml-2\"\n      placement=\"bottom\"\n      maxWidth=\"400\"\n      [adaptPopover]=\"'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions-to-delete.tooltip' | translate\"\n    ></adapt-icon>\n  </h5>\n  <div>\n    {{'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions-to-delete.deleted-definitions-count.label'\n    | translate : { count: selectedDefinitionCount } }}\n  </div>\n</div>\n\n<div class=\"mb-3\">\n  {{'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions-to-delete.selected-deleted-definitions.label'\n  | translate}}\n</div>\n\n<rx-record-grid [config]=\"recordGridConfig$\" (dataLoaded)=\"onDataLoaded()\"></rx-record-grid>\n\n<ng-template #recordNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}\n"], components: [{ type: i6.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i7.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i6.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "translate": i5.TranslatePipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsToDeleteWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-select-definitions-to-delete-wizard-step',
                    templateUrl: 'select-definitions-to-delete-wizard-step.components.html',
                    styleUrls: ['./select-definitions-to-delete-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.DefinitionHistoryDataPageService }, { type: i2.RxDefinitionNameService }, { type: i2.RxSessionExpirationService }, { type: i3.RxStringService }, { type: i4.RxWizardModalComponent }, { type: i5.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }], recordNameCellTemplate: [{
                type: ViewChild,
                args: ['recordNameCellTemplate', { static: true }]
            }], recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }] } });
//# sourceMappingURL=select-definitions-to-delete-wizard-step.component.js.map