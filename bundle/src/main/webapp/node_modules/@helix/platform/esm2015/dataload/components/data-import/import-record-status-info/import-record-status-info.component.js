import { Component } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { DL_DATA_IMPORT } from '../data-import.constant';
import { map } from 'rxjs/operators';
import { RxJsonParserService } from '@helix/platform/utils';
import { get, map as _map } from 'lodash';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/record/api";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@bmc-ux/adapt-table";
export class ImportRecordStatusInfoComponent {
    constructor(datePipe, rxTranslateService, rxJsonParserService, activeModalRef, rxRecordInstanceDataPageService) {
        this.datePipe = datePipe;
        this.rxTranslateService = rxTranslateService;
        this.rxJsonParserService = rxJsonParserService;
        this.activeModalRef = activeModalRef;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.statusData$ = this.rxRecordInstanceDataPageService
            .post({
            params: {
                [RX_RECORD_DEFINITION.coreFieldIds.id]: this.activeModalRef.getData().dataRecordId,
                recorddefinition: DL_DATA_IMPORT.recordDefinitionName
            }
        })
            .pipe(map((dataPage) => {
            if (dataPage.data[0][RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_IMPORT.dataStatuses.processing) {
                this.processStartInfo = `${this.rxTranslateService.instant('com.bmc.arsys.rx.client.dataload.process-started.message')} ${this.datePipe.transform(dataPage.data[0][RX_RECORD_DEFINITION.coreFieldIds.modifiedDate], 'medium')}`;
            }
            const dataLoadProgressStatus = get(this.rxJsonParserService.tryParseJson(dataPage.data[0][DL_DATA_IMPORT.fields.message], []), 'dataLoadProgressStatus');
            if (dataLoadProgressStatus) {
                return _map(dataLoadProgressStatus, (statusInfo) => (Object.assign(Object.assign({}, statusInfo), { updateTime: this.datePipe.transform(statusInfo.updateTime, 'medium') })));
            }
            else {
                this.fileUploadedNotProcessedMsg = dataPage.data[0][DL_DATA_IMPORT.fields.message];
                return [];
            }
        }));
        this.columns = [
            {
                field: 'updateTime',
                header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.dataload.status-info-grid.column.updated-date.title'),
                sortable: false,
                width: '20%'
            },
            {
                field: 'status',
                header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.common.status.label'),
                width: '20%'
            },
            {
                field: 'message',
                header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.common.message.label'),
                width: '80%'
            }
        ];
    }
    close() {
        this.activeModalRef.close();
    }
}
ImportRecordStatusInfoComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ImportRecordStatusInfoComponent, deps: [{ token: i1.DatePipe }, { token: i2.TranslateService }, { token: i3.RxJsonParserService }, { token: i4.ActiveModalRef }, { token: i5.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
ImportRecordStatusInfoComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ImportRecordStatusInfoComponent, selector: "dl-import-record-status-info", ngImport: i0, template: "<ng-template #loaderTemplate>\n  <rx-line-loader></rx-line-loader>\n</ng-template>\n\n<div *ngIf=\"statusData$ | async as statusData; else loaderTemplate\">\n  <div class=\"data-status-info\">\n    <div *ngIf=\"fileUploadedNotProcessedMsg\">\n      {{ fileUploadedNotProcessedMsg }}\n    </div>\n\n    <adapt-alert\n      *ngIf=\"processStartInfo\"\n      [config]=\"{\n        content: processStartInfo,\n        type: 'inline',\n        variant: 'warning'\n      }\"\n    ></adapt-alert>\n\n    <adapt-table\n      [hidden]=\"fileUploadedNotProcessedMsg\"\n      rx-id=\"imported-status-info-grid\"\n      [columns]=\"columns\"\n      [bordered]=\"true\"\n      [value]=\"statusData\"\n      [wrapCellText]=\"true\"\n    >\n    </adapt-table>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button (click)=\"close()\" adapt-button btn-type=\"secondary\" rx-id=\"close-button\" type=\"button\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [".data-status-info{padding:15px}\n"], components: [{ type: i6.RxLineLoaderComponent, selector: "rx-line-loader", inputs: ["loaderMessage"] }, { type: i4.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i7.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i1.AsyncPipe, "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ImportRecordStatusInfoComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-import-record-status-info',
                    templateUrl: './import-record-status-info.component.html',
                    styleUrls: ['./import-data-status-info.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.DatePipe }, { type: i2.TranslateService }, { type: i3.RxJsonParserService }, { type: i4.ActiveModalRef }, { type: i5.RxRecordInstanceDataPageService }]; } });
//# sourceMappingURL=import-record-status-info.component.js.map