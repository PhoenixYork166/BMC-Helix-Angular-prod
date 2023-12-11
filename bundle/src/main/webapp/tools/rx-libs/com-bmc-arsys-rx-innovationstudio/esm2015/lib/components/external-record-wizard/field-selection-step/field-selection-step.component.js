import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { chain, defaults, get, includes, isEqual, map as _map, reject, some } from 'lodash';
import { of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, takeUntil } from 'rxjs/operators';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { ColumnSortDirection, RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/components";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@helix/platform/view/components";
import * as i5 from "@helix/platform/record/api";
export class FieldSelectionStepComponent {
    constructor(rxWizardModalComponent, translateService) {
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.externalFieldIdPath = 'fieldMapping.externalFieldId';
        this.availableExternalColumns = [];
        this.selectedExternalColumns = [];
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.availableFieldsSectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-selection.available-fields.section.label');
        this.selectedFieldsSectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-selection.selected-fields.section.label');
        this.rxWizardModalComponent.api.enableFinishButton();
        const fieldSelectionStepContext$ = this.rxWizardModalComponent.context$.pipe(shareReplay(1), takeUntil(this.destroyed$));
        fieldSelectionStepContext$
            .pipe(map((stepContext) => stepContext.mappedInternalFields), distinctUntilChanged(isEqual))
            .subscribe(() => this.updateGridsData());
        const gridColumns = [
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                fieldId: 'name'
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-selection.field-id.label'),
                fieldId: 'id',
                sortable: {
                    direction: ColumnSortDirection.Asc,
                    priority: 1
                }
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.item-type.label'),
                fieldId: 'resourceType',
                cellTemplate: this.resourceTypeCellTemplate
            }
        ];
        const selectColumnGridConfig = {
            columns: gridColumns,
            enableColumnSelection: false,
            enableFiltering: false,
            enableRowSelection: RowSelectionMode.Multiple,
            recordIdField: 'id',
            styles: 'flex-fill',
            useExternalFiltering: false,
            getRecordDefinition: () => of({
                fieldDefinitions: [
                    {
                        id: 'name',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: 'id',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: 'resourceType',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    }
                ]
            })
        };
        this.availableFieldsGridConfig$ = of(defaults({
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-selection.available-fields.grid.empty-state.label'),
            getData: () => of({
                totalSize: this.availableExternalColumns.length,
                data: this.availableExternalColumns
            })
        }, selectColumnGridConfig));
        this.selectedFieldsGridConfig$ = of(defaults({
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-selection.selected-fields.grid.empty-state.label'),
            getData: () => of({
                totalSize: this.selectedExternalColumns.length,
                data: this.selectedExternalColumns
            })
        }, selectColumnGridConfig));
    }
    deselectColumns() {
        const sourceColumnIds = _map(this.selectedFieldsGrid.api.getSelectedRows(), 'id');
        this.moveColumns(sourceColumnIds, this.selectedExternalColumns, this.availableExternalColumns);
    }
    selectColumns() {
        const sourceColumnIds = _map(this.availableFieldsGrid.api.getSelectedRows(), 'id');
        this.moveColumns(sourceColumnIds, this.availableExternalColumns, this.selectedExternalColumns);
    }
    getAvailableColumns() {
        return reject(this.context.externalTableDefinition.fieldDefinitions, (column) => this.isAssociatedColumn(column) || this.isSelectedColumn(column));
    }
    getExternalFieldId(column) {
        return get(column, this.externalFieldIdPath);
    }
    isAssociatedColumn(column) {
        return some(this.context.mappedInternalFields, [this.externalFieldIdPath, this.getExternalFieldId(column)]);
    }
    isSelectedColumn(column) {
        return some(this.selectedExternalColumns, [this.externalFieldIdPath, this.getExternalFieldId(column)]);
    }
    moveColumns(columnIds, source, target) {
        chain(source)
            .remove((column) => includes(columnIds, column.id))
            .forEach((column) => target.push(column))
            .value();
        this.refreshElements();
        this.rxWizardModalComponent.api.updateContext({ selectedExternalFields: this.selectedExternalColumns });
    }
    refreshElements() {
        var _a, _b;
        (_a = this.availableFieldsGrid) === null || _a === void 0 ? void 0 : _a.api.refresh().subscribe();
        (_b = this.selectedFieldsGrid) === null || _b === void 0 ? void 0 : _b.api.refresh().subscribe();
    }
    updateGridsData() {
        this.selectedExternalColumns = [];
        this.availableExternalColumns = this.getAvailableColumns();
        this.refreshElements();
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
/** @nocollapse */ FieldSelectionStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldSelectionStepComponent, deps: [{ token: i1.RxWizardModalComponent }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ FieldSelectionStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldSelectionStepComponent, selector: "ax-field-selection-step", inputs: { context: "context" }, viewQueries: [{ propertyName: "resourceTypeCellTemplate", first: true, predicate: ["resourceTypeCellTemplate"], descendants: true, static: true }, { propertyName: "availableFieldsGrid", first: true, predicate: ["availableFieldsGrid"], descendants: true }, { propertyName: "selectedFieldsGrid", first: true, predicate: ["selectedFieldsGrid"], descendants: true }], ngImport: i0, template: "<div class=\"rx-external-record-wizard__content\">\n  <div class=\"rx-external-record-wizard__content--left\">\n    <adapt-rx-control-label [label]=\"availableFieldsSectionLabel\"></adapt-rx-control-label>\n    <rx-record-grid #availableFieldsGrid [config]=\"availableFieldsGridConfig$\"></rx-record-grid>\n  </div>\n  <div class=\"rx-external-record-wizard__content--middle\">\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"secondary\"\n      class=\"d-icon-angle_right\"\n      rx-id=\"select-button\"\n      [disabled]=\"!availableFieldsGrid?.api.getSelectedRowCount()\"\n      (click)=\"selectColumns()\"\n    ></button>\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"secondary\"\n      class=\"d-icon-angle_left\"\n      rx-id=\"deselect-button\"\n      [disabled]=\"!selectedFieldsGrid?.api.getSelectedRowCount()\"\n      (click)=\"deselectColumns()\"\n    ></button>\n  </div>\n  <div class=\"rx-external-record-wizard__content--right\">\n    <adapt-rx-control-label [label]=\"selectedFieldsSectionLabel\"></adapt-rx-control-label>\n    <rx-record-grid #selectedFieldsGrid [config]=\"selectedFieldsGridConfig$\"></rx-record-grid>\n  </div>\n</div>\n\n<ng-template #resourceTypeCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.resourceType | rxRecordDefinitionResourceType }}\n</ng-template>\n", styles: [":host{display:flex;height:100%}:host .rx-external-record-wizard__content{display:flex}:host .rx-external-record-wizard__content--left,:host .rx-external-record-wizard__content--right{flex:0 0 45%;max-width:45%}:host .rx-external-record-wizard__content--middle{flex:0 0 10%;display:flex;flex-direction:column;justify-content:center;align-items:center}:host .rx-external-record-wizard__content--middle>*:not(:first-child){margin-top:5px}:host rx-record-grid{height:calc(100% - 1.5rem)}\n"], components: [{ type: i3.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i4.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "rxRecordDefinitionResourceType": i5.RxRecordDefinitionResourceTypePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldSelectionStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-field-selection-step',
                    templateUrl: 'field-selection-step.component.html',
                    styleUrls: ['./field-selection-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxWizardModalComponent }, { type: i2.TranslateService }]; }, propDecorators: { context: [{
                type: Input
            }], resourceTypeCellTemplate: [{
                type: ViewChild,
                args: ['resourceTypeCellTemplate', { static: true }]
            }], availableFieldsGrid: [{
                type: ViewChild,
                args: ['availableFieldsGrid']
            }], selectedFieldsGrid: [{
                type: ViewChild,
                args: ['selectedFieldsGrid']
            }] } });
//# sourceMappingURL=field-selection-step.component.js.map