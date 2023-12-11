import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { head, isEqual } from 'lodash';
import { combineLatest, of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, skip, takeUntil } from 'rxjs/operators';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { AX_BUNDLE_DETAILS } from '../../bundle-details/bundle-details.constant';
import { RxExternalDataService } from '../../../services/external-data/external-data.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/external-data/external-data.service";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/view/components";
import * as i6 from "@helix/platform/shared/api";
export class WebApiSelectionStepComponent {
    constructor(rxExternalDataService, rxWizardModalComponent, translateService) {
        this.rxExternalDataService = rxExternalDataService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.sectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.web-api-selection.label');
        const webApiSelectionStepContext$ = this.rxWizardModalComponent.context$.pipe(shareReplay(1), takeUntil(this.destroyed$));
        webApiSelectionStepContext$
            .pipe(map((stepContext) => stepContext.dataSourceName), distinctUntilChanged(isEqual), skip(1))
            .subscribe(() => {
            this.rxWizardModalComponent.api.updateContext({ webApi: null });
            this.recordGrid.api.refresh().subscribe();
        });
        const isCurrentStep$ = combineLatest([
            this.rxWizardModalComponent.steps$,
            this.rxWizardModalComponent.tabIndex$
        ]).pipe(map(([steps, tabIndex]) => steps[tabIndex].id === 'web-api-selection'), takeUntil(this.destroyed$));
        const changedWebApi$ = webApiSelectionStepContext$.pipe(map((stepContext) => stepContext.webApi), distinctUntilChanged(isEqual));
        combineLatest([isCurrentStep$, changedWebApi$])
            .pipe(filter(([isCurrentStep, changedWebApi]) => isCurrentStep), distinctUntilChanged(isEqual))
            .subscribe(([isCurrentStep, changedWebApi]) => {
            if (changedWebApi) {
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else {
                this.rxWizardModalComponent.api.disableNextButton();
            }
        });
        const gridColumns = [
            {
                fieldId: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                cellTemplate: this.webApiNameCellTemplate
            }
        ];
        const gridRecordDefinition = {
            fieldDefinitions: [
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        this.recordGridConfig$ = of({
            columns: gridColumns,
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.web-api-selection.grid.empty-state.label'),
            enableRowSelection: RowSelectionMode.Single,
            enableFiltering: false,
            recordIdField: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
            styles: 'flex-fill',
            useExternalFiltering: false,
            getRecordDefinition: () => of(gridRecordDefinition),
            getData: () => this.context.dataSourceName
                ? this.rxExternalDataService.getWebApiDefinitions()
                : of({
                    totalSize: 0,
                    data: []
                })
        });
        this.recordGrid.rowSelectionChanged
            .pipe(skip(2), takeUntil(this.destroyed$))
            .subscribe((selectedRows) => {
            this.rxWizardModalComponent.api.updateContext({
                webApi: head(selectedRows) || null
            });
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
/** @nocollapse */ WebApiSelectionStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiSelectionStepComponent, deps: [{ token: i1.RxExternalDataService }, { token: i2.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ WebApiSelectionStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: WebApiSelectionStepComponent, selector: "ax-web-api-selection-wizard-step", inputs: { context: "context" }, viewQueries: [{ propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }, { propertyName: "webApiNameCellTemplate", first: true, predicate: ["webApiNameCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<adapt-rx-control-label [label]=\"sectionLabel\" [showRequiredLabel]=\"true\"></adapt-rx-control-label>\n\n<rx-record-grid [config]=\"recordGridConfig$\"></rx-record-grid>\n\n<ng-template #webApiNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}\n"], components: [{ type: i4.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "rxDefinitionNamePipe": i6.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiSelectionStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-web-api-selection-wizard-step',
                    templateUrl: 'web-api-selection-step.component.html',
                    styleUrls: ['./web-api-selection-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxExternalDataService }, { type: i2.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { context: [{
                type: Input
            }], recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }], webApiNameCellTemplate: [{
                type: ViewChild,
                args: ['webApiNameCellTemplate', { static: true }]
            }] } });
//# sourceMappingURL=web-api-selection-step.component.js.map