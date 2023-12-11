import { Component, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isEqual } from 'lodash';
import { combineLatest, of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, skip, takeUntil } from 'rxjs/operators';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxExternalDataService } from '../../../services/external-data/external-data.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/external-data/external-data.service";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/view/components";
export class TableSelectionStepComponent {
    constructor(rxExternalDataService, rxWizardModalComponent, translateService) {
        this.rxExternalDataService = rxExternalDataService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.sectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.table-selection.label');
        const tableSelectionStepContext$ = this.rxWizardModalComponent.context$.pipe(shareReplay(1), takeUntil(this.destroyed$));
        tableSelectionStepContext$
            .pipe(map((stepContext) => stepContext.dataSourceName), distinctUntilChanged(isEqual), skip(1))
            .subscribe(() => {
            this.selectedRow = null;
            this.rxWizardModalComponent.api.updateContext({ tableName: '' });
            this.tableSelectionStepRecordGrid.api.refresh().subscribe();
        });
        const isCurrentStep$ = combineLatest([
            this.rxWizardModalComponent.steps$,
            this.rxWizardModalComponent.tabIndex$
        ]).pipe(map(([steps, tabIndex]) => steps[tabIndex].id === 'table-selection'), takeUntil(this.destroyed$));
        const changedTableName$ = tableSelectionStepContext$.pipe(map((stepContext) => stepContext.tableName), distinctUntilChanged(isEqual));
        combineLatest([isCurrentStep$, changedTableName$])
            .pipe(filter(([isCurrentStep, externalTableName]) => isCurrentStep), distinctUntilChanged(isEqual))
            .subscribe(([isCurrentStep, externalTableName]) => {
            if (externalTableName) {
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else {
                this.rxWizardModalComponent.api.disableNextButton();
            }
        });
        const gridColumns = [
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                fieldId: 'name'
            }
        ];
        this.tableSelectionRecordGridConfig$ = of({
            columns: gridColumns,
            enableColumnSelection: false,
            enableFiltering: false,
            enableRowSelection: RowSelectionMode.Single,
            recordIdField: 'name',
            styles: 'flex-fill',
            useExternalFiltering: true,
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.table-selection.grid.empty-state.label'),
            getRecordDefinition: () => of({
                fieldDefinitions: [
                    {
                        id: 'name',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    }
                ]
            }),
            getData: (queryParams) => this.context.dataSourceName
                ? this.rxExternalDataService.getArsTables(queryParams.pageSize, queryParams.startIndex, this.context.dataSourceName, queryParams.searchText, queryParams.sortBy)
                : of({
                    totalSize: 0,
                    data: []
                })
        });
        this.tableSelectionStepRecordGrid.rowSelectionChanged
            .pipe(skip(2), // first time there are no columns, second time there are no rows selected
        takeUntil(this.destroyed$))
            .subscribe((selectedRows) => {
            if (selectedRows.length) {
                this.selectedRow = selectedRows[0];
                this.rxWizardModalComponent.api.updateContext({ tableName: this.selectedRow.name });
            }
            else if (this.selectedRow) {
                this.tableSelectionStepRecordGrid.api.setSelectedRows(this.selectedRow);
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
/** @nocollapse */ TableSelectionStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TableSelectionStepComponent, deps: [{ token: i1.RxExternalDataService }, { token: i2.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TableSelectionStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TableSelectionStepComponent, selector: "ax-table-selection-step", inputs: { context: "context" }, viewQueries: [{ propertyName: "tableSelectionStepRecordGrid", first: true, predicate: ["tableSelectionStepRecordGrid"], descendants: true, static: true }], ngImport: i0, template: "<adapt-rx-control-label [label]=\"sectionLabel\" [showRequiredLabel]=\"true\"></adapt-rx-control-label>\n<rx-record-grid #tableSelectionStepRecordGrid [config]=\"tableSelectionRecordGridConfig$\"> </rx-record-grid>\n", styles: [":host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}\n"], components: [{ type: i4.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TableSelectionStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-table-selection-step',
                    templateUrl: 'table-selection-step.component.html',
                    styleUrls: ['./table-selection-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxExternalDataService }, { type: i2.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { context: [{
                type: Input
            }], tableSelectionStepRecordGrid: [{
                type: ViewChild,
                args: ['tableSelectionStepRecordGrid', { static: true }]
            }] } });
//# sourceMappingURL=table-selection-step.component.js.map