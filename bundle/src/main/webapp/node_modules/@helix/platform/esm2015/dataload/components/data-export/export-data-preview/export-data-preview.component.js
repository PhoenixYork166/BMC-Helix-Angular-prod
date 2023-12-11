import { Component } from '@angular/core';
import { of } from 'rxjs';
import { RowSelectionMode } from '@helix/platform/view/components';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { omit, sortBy } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@helix/platform/view/components";
import * as i4 from "@ngx-translate/core";
export class ExportDataPreviewComponent {
    constructor(activeModalRef, rxRecordInstanceDataPageService) {
        this.activeModalRef = activeModalRef;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.gridContext = this.activeModalRef.getData();
    }
    ngOnInit() {
        this.gridConfig = of({
            recordDefinitionName: this.gridContext.definitionName,
            enableRowSelection: RowSelectionMode.Multiple,
            columns: sortBy(this.gridContext.selectedFields, 'visibleOnPreviewPriority').map((field, index) => ({
                title: field.name,
                fieldId: field.id.toString(),
                visible: index < 9
            })),
            styles: 'flex-fill h-100',
            getData: (queryParams) => this.getData(queryParams)
        });
    }
    getData(queryParams) {
        queryParams.queryExpression = [queryParams.queryExpression, this.gridContext.queryFilter]
            .filter(Boolean)
            .join('AND');
        return this.rxRecordInstanceDataPageService.post({
            params: omit(Object.assign({}, queryParams), ['searchText'])
        });
    }
    close() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
ExportDataPreviewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExportDataPreviewComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
ExportDataPreviewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExportDataPreviewComponent, selector: "dl-export-data-preview", ngImport: i0, template: "<div class=\"p-4 data-preview-modal-body\">\n  <rx-record-grid [config]=\"gridConfig\"></rx-record-grid>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"close()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.data-preview-modal-body{overflow:auto;flex-grow:1;height:645px}\n"], components: [{ type: i3.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExportDataPreviewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-export-data-preview',
                    templateUrl: './export-data-preview.component.html',
                    styleUrls: ['./export-data-preview.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxRecordInstanceDataPageService }]; } });
//# sourceMappingURL=export-data-preview.component.js.map