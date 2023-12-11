import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
import { chain, cloneDeep, defaults, isEmpty, isEqual, sortBy } from 'lodash';
import { of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, skipWhile, switchMap, takeUntil } from 'rxjs/operators';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RecordGridComponent } from '@helix/platform/view/components';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxExternalDataService } from '../../../services/external-data/external-data.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/external-data/external-data.service";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/view/components";
import * as i6 from "@angular/forms";
export class RecordIdFieldsStepComponent {
    constructor(rxExternalDataService, rxWizardModalComponent, translateService) {
        this.rxExternalDataService = rxExternalDataService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.externalColumns = [];
        this.externalColumnIds = [];
        this.internalFieldsForMapping = [];
        this.rawExternalColumns = [];
        this.gridRowsData = [];
        this.destroyed$ = new ReplaySubject(1);
        this.externalColumnOptionFormatter = (externalColumnOption) => externalColumnOption.name;
        this.externalColumnIdOptionFormatter = (externalColumnOption) => externalColumnOption.id;
    }
    ngOnInit() {
        this.sectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.label');
        this.sectionInfoLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.section-info.label');
        this.sectionInfoTooltip = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.section-info.tooltip');
        this.rxWizardModalComponent.api.disableNextButton();
        const recordIdFieldsStepContext$ = this.rxWizardModalComponent.context$.pipe(shareReplay(1), takeUntil(this.destroyed$));
        recordIdFieldsStepContext$
            .pipe(map((stepContext) => stepContext.tableName), distinctUntilChanged(isEqual), switchMap((tableName) => {
            this.rawExternalColumns = [];
            this.gridRowsData = [];
            this.externalColumnIds = [];
            this.externalColumns = [];
            if (this.recordIdFieldsStepRecordGrid) {
                this.recordIdFieldsStepRecordGrid.api.refresh().subscribe();
            }
            if (tableName) {
                this.internalFieldsForMapping = chain(RX_RECORD_DEFINITION.coreFields)
                    .filter((field) => RX_RECORD_DEFINITION.externalRecordDefinitionCoreFieldIds.includes(field.id))
                    .map((coreField) => defaults(cloneDeep(coreField), { fieldMapping: { externalFieldId: String(coreField.id) } }))
                    .value();
                return this.rxExternalDataService.getArsTableDefinition(this.context.dataSourceName, tableName);
            }
            else {
                this.internalFieldsForMapping = [];
                this.rxWizardModalComponent.api.updateContext({
                    externalTableDefinition: {},
                    mappedInternalFields: []
                });
                return of();
            }
        }), skipWhile(isEmpty))
            .subscribe((externalTableDefinition) => {
            this.rawExternalColumns = externalTableDefinition.fieldDefinitions;
            this.setGridRowsData();
            this.rxWizardModalComponent.api.updateContext({
                externalTableDefinition,
                mappedInternalFields: cloneDeep(this.internalFieldsForMapping)
            });
            this.externalColumnIds = this.rawExternalColumns.map((externalColumn) => ({
                id: externalColumn.fieldMapping.externalFieldId,
                name: externalColumn.name
            }));
            this.externalColumns = sortBy(this.externalColumnIds, 'name');
            this.recordIdFieldsStepRecordGrid.api.refresh().subscribe();
        });
        const gridColumns = [
            {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.grid.record-id-field.label'),
                fieldId: 'name'
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.grid.field-id.label'),
                fieldId: 'id'
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.grid.external-record-id-field.label'),
                fieldId: 'externalColumnName',
                sortable: false,
                cellTemplate: this.externalColumnCellTemplate
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.grid.external-field-id.label'),
                fieldId: 'externalColumnId',
                sortable: false,
                cellTemplate: this.externalColumnIdCellTemplate
            }
        ];
        this.recordIdFieldsRecordGridConfig$ = of({
            columns: gridColumns,
            enableColumnSelection: false,
            enableFiltering: false,
            enableRowSelection: null,
            recordIdField: 'id',
            styles: 'flex-fill',
            toolbarConfig: {
                filter: false,
                visibleColumnsMenu: false
            },
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
                        id: 'externalColumnName',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: 'externalColumnId',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    }
                ]
            }),
            getData: () => of({
                totalSize: this.gridRowsData.length,
                data: this.gridRowsData
            })
        });
        this.rxWizardModalComponent.api.enableNextButton();
    }
    onExternalColumnChange(rowDataItem) {
        var _a;
        const field = this.internalFieldsForMapping.find((internalField) => internalField.id === rowDataItem.id);
        field.fieldMapping.externalFieldId = ((_a = rowDataItem.selectedExternalColumns[0]) === null || _a === void 0 ? void 0 : _a.id) || String(field.id);
        this.setGridRowsData();
        this.rxWizardModalComponent.api.updateContext({ mappedInternalFields: cloneDeep(this.internalFieldsForMapping) });
        this.recordIdFieldsStepRecordGrid.api.refresh().subscribe();
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    setGridRowsData() {
        this.internalFieldsForMapping.forEach((internalField) => {
            const externalColumn = this.rawExternalColumns.find((column) => column.fieldMapping.externalFieldId === internalField.fieldMapping.externalFieldId);
            const selectedExternalColumns = [];
            if (externalColumn) {
                selectedExternalColumns.push({
                    id: externalColumn.fieldMapping.externalFieldId,
                    name: externalColumn.name
                });
            }
            const gridRowData = this.gridRowsData.find(({ id }) => id === internalField.id);
            if (gridRowData) {
                gridRowData.selectedExternalColumns = selectedExternalColumns;
            }
            else {
                this.gridRowsData.push({
                    id: internalField.id,
                    name: internalField.name,
                    selectedExternalColumns
                });
            }
        });
    }
}
/** @nocollapse */ RecordIdFieldsStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIdFieldsStepComponent, deps: [{ token: i1.RxExternalDataService }, { token: i2.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ RecordIdFieldsStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordIdFieldsStepComponent, selector: "ax-record-id-fields-step", inputs: { context: "context" }, viewQueries: [{ propertyName: "recordIdFieldsStepRecordGrid", first: true, predicate: ["recordIdFieldsStepRecordGrid"], descendants: true }, { propertyName: "externalColumnCellTemplate", first: true, predicate: ["externalColumnCellTemplate"], descendants: true, static: true }, { propertyName: "externalColumnIdCellTemplate", first: true, predicate: ["externalColumnIdCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"section-title\">\n  <adapt-rx-control-label [label]=\"sectionLabel\" class=\"section-label\"></adapt-rx-control-label>\n\n  <ng-template #tooltipContentTemplate>\n    <div class=\"text-left\" [innerHTML]=\"sectionInfoTooltip\"></div>\n  </ng-template>\n\n  <span class=\"section-info\">\n    <adapt-icon\n      name=\"info_circle_o_adapt\"\n      [adaptPopover]=\"tooltipContentTemplate\"\n      width=\"250\"\n      placement=\"bottom\"\n    ></adapt-icon>\n    {{ sectionInfoLabel }}\n  </span>\n</div>\n\n<rx-record-grid #recordIdFieldsStepRecordGrid [config]=\"recordIdFieldsRecordGridConfig$\"></rx-record-grid>\n\n<ng-template #externalColumnCellTemplate let-dataItem=\"dataItem\">\n  <adapt-rx-select\n    [options]=\"externalColumns\"\n    [optionFormatter]=\"externalColumnOptionFormatter\"\n    [emptyOption]=\"true\"\n    [(ngModel)]=\"dataItem.selectedExternalColumns\"\n    (ngModelChange)=\"onExternalColumnChange(dataItem)\"\n    [appendToBody]=\"true\"\n  >\n  </adapt-rx-select>\n</ng-template>\n\n<ng-template #externalColumnIdCellTemplate let-dataItem=\"dataItem\">\n  <adapt-rx-select\n    [options]=\"externalColumnIds\"\n    [optionFormatter]=\"externalColumnIdOptionFormatter\"\n    [emptyOption]=\"true\"\n    [(ngModel)]=\"dataItem.selectedExternalColumns\"\n    (ngModelChange)=\"onExternalColumnChange(dataItem)\"\n    [appendToBody]=\"true\"\n  >\n  </adapt-rx-select>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%}:host .section-title{display:flex}:host .section-label{flex-grow:1}:host .section-info{color:#00a79d}:host ::ng-deep .rx-custom-cell{max-height:38px}:host ::ng-deep adapt-rx-select{margin:-.5rem -13px}rx-record-grid{height:100%}\n"], components: [{ type: i4.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i4.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIdFieldsStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-record-id-fields-step',
                    templateUrl: 'record-id-fields-step.component.html',
                    styleUrls: ['record-id-fields-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxExternalDataService }, { type: i2.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { context: [{
                type: Input
            }], recordIdFieldsStepRecordGrid: [{
                type: ViewChild,
                args: ['recordIdFieldsStepRecordGrid']
            }], externalColumnCellTemplate: [{
                type: ViewChild,
                args: ['externalColumnCellTemplate', { static: true }]
            }], externalColumnIdCellTemplate: [{
                type: ViewChild,
                args: ['externalColumnIdCellTemplate', { static: true }]
            }] } });
//# sourceMappingURL=record-id-fields-step.component.js.map