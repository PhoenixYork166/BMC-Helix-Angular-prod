import { Component, Input, ViewChild } from '@angular/core';
import { combineLatest, of, ReplaySubject } from 'rxjs';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';
import { chain, cloneDeep, find, map as _map, reduce } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxDataPageFactoryService, RxDefinitionNameService, RxSessionExpirationService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { ColumnSortDirection, RecordGridComponent } from '@helix/platform/view/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@helix/platform/view/components";
export class SelectApprovalConfigurationsWizardStepComponent {
    constructor(rxDataPageService, rxDefinitionNameService, rxSessionExpirationService, translateService, rxWizardModalComponent) {
        this.rxDataPageService = rxDataPageService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.translateService = translateService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        var _a;
        const columns = [
            {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.record-definition.label'),
                fieldId: 'recordDefinitionName',
                sortable: { direction: ColumnSortDirection.Asc, priority: 0 }
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-approval-configurations.flow-group.label'),
                fieldId: 'flowGroupName',
                sortable: { direction: ColumnSortDirection.Asc, priority: 1 }
            }
        ];
        const recordDefinition = {
            fieldDefinitions: [
                {
                    id: 'recordDefinitionName',
                    resourceType: RX_RECORD_DEFINITION.dataTypes.character.resourceType
                },
                {
                    id: 'flowGroupName',
                    resourceType: RX_RECORD_DEFINITION.dataTypes.character.resourceType
                }
            ]
        };
        this.recordGridConfig$ = of({
            columns,
            enableColumnSelection: false,
            enableRowSelection: (_a = this.options.gridConfig) === null || _a === void 0 ? void 0 : _a.enableRowSelection,
            recordIdField: 'definitionNameWithFlowGroup',
            styles: 'flex-fill',
            useExternalFiltering: false,
            expandGroups: true,
            getRecordDefinition: () => of(recordDefinition),
            getData: () => {
                this.rxWizardModalComponent.api.disableNextButton();
                return this.rxSessionExpirationService.keepSessionAlive().pipe(switchMap(() => this.rxDataPageService
                    .withType('com.bmc.arsys.rx.approval.application.datapage.ApprovalConfigurationsDataPageQuery')
                    .get({
                    params: {
                        startIndex: -1,
                        pageSize: 0,
                        bundleId: this.context.deploymentPackageDescriptor.id
                    }
                })
                    .pipe(map((response) => {
                    this.selectedDefinitionCount = 0;
                    const data = reduce(response.data[0], (result, flowGroupNames, recordDefinitionName) => {
                        const bundleFriendlyName = this.context.bundleFriendlyNamesById[this.rxDefinitionNameService.getBundleId(recordDefinitionName)];
                        const recordDefinitionDisplayName = this.rxDefinitionNameService.getDisplayName(recordDefinitionName);
                        let dataItem = find(result, { groupValue: bundleFriendlyName });
                        if (dataItem) {
                            flowGroupNames.forEach((flowGroupName) => {
                                dataItem.items.push({
                                    definitionName: recordDefinitionName,
                                    bundleName: bundleFriendlyName,
                                    recordDefinitionName: recordDefinitionDisplayName,
                                    flowGroupName,
                                    definitionNameWithFlowGroup: `${flowGroupName}:${recordDefinitionName}`
                                });
                            });
                        }
                        else {
                            dataItem = {
                                groupValue: bundleFriendlyName,
                                groupField: 'bundleName',
                                items: flowGroupNames.map((flowGroupName) => ({
                                    definitionName: recordDefinitionName,
                                    bundleName: bundleFriendlyName,
                                    recordDefinitionName: recordDefinitionDisplayName,
                                    flowGroupName,
                                    definitionNameWithFlowGroup: `${flowGroupName}:${recordDefinitionName}`
                                }))
                            };
                            result.push(dataItem);
                        }
                        return result;
                    }, []);
                    return {
                        data,
                        totalSize: data.length
                    };
                }))));
            }
        });
        combineLatest([this.recordGrid.rowSelectionChanged, this.rxWizardModalComponent.context$.pipe(take(1))])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(([selectedRows, context]) => {
            this.selectedDefinitionCount = selectedRows.length;
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            newDeploymentPackageDescriptor.approvalConfigurationQueryOptions = chain(selectedRows)
                .groupBy('definitionName')
                .map((config, definitionName) => ({
                recordDefinitionName: definitionName,
                flowGroups: _map(config, 'flowGroupName')
            }))
                .value();
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
/** @nocollapse */ SelectApprovalConfigurationsWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectApprovalConfigurationsWizardStepComponent, deps: [{ token: i1.RxDataPageFactoryService }, { token: i1.RxDefinitionNameService }, { token: i1.RxSessionExpirationService }, { token: i2.TranslateService }, { token: i3.RxWizardModalComponent }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ SelectApprovalConfigurationsWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectApprovalConfigurationsWizardStepComponent, selector: "ax-select-approval-configurations-wizard-step", inputs: { context: "context", options: "options" }, viewQueries: [{ propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }], ngImport: i0, template: "<div class=\"d-flex justify-content-between\">\n  <h5 class=\"mt-0\">\n    {{\n      'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-approval-configurations.approval-configurations.label'\n        | translate\n    }}\n  </h5>\n  <div>\n    {{\n      'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-approval-configurations.approval-configurations-count.label'\n        | translate: { count: selectedDefinitionCount }\n    }}\n  </div>\n</div>\n\n<div class=\"mb-3\">\n  {{\n    'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-approval-configurations.selected-approval-configurations.label'\n      | translate\n  }}\n</div>\n\n<rx-record-grid [config]=\"recordGridConfig$\" (dataLoaded)=\"onDataLoaded()\"></rx-record-grid>\n", styles: [":host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}\n"], components: [{ type: i4.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectApprovalConfigurationsWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-select-approval-configurations-wizard-step',
                    templateUrl: 'select-approval-configurations-wizard-step.component.html',
                    styleUrls: ['./select-approval-configurations-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDataPageFactoryService }, { type: i1.RxDefinitionNameService }, { type: i1.RxSessionExpirationService }, { type: i2.TranslateService }, { type: i3.RxWizardModalComponent }]; }, propDecorators: { context: [{
                type: Input
            }], options: [{
                type: Input
            }], recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }] } });
//# sourceMappingURL=select-approval-configurations-wizard-step.component.js.map