import { Component, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { AdaptDockedPanelService } from '@bmc-ux/adapt-angular';
import { RecordGridComponent, RecordGridFilterMode, RowSelectionMode } from '@helix/platform/view/components';
import { of } from 'rxjs';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxSearchFiltersService } from './search-filters.service';
import { SearchFiltersEditorComponent } from './search-filters-editor/search-filters-editor.component';
import { RxModalService, RX_MODAL } from '@helix/platform/ui-kit';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { noop } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "./search-filters.service";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@helix/platform/view/components";
import * as i8 from "@angular/common";
export class RxSearchFiltersComponent extends BaseViewComponent {
    constructor(rxModalService, rxNotificationService, adaptDockedPanelService, rxSearchFiltersService, translateService) {
        super();
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.adaptDockedPanelService = adaptDockedPanelService;
        this.rxSearchFiltersService = rxSearchFiltersService;
        this.translateService = translateService;
        this.searchFilters = [];
    }
    ngOnInit() {
        this.initializeRecordGrid();
    }
    initializeRecordGrid() {
        const gridColumns = [
            {
                fieldId: 'id',
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.search-filters.grid.column.id.title'),
                visible: false
            },
            {
                fieldId: 'name',
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.search-filters.grid.column.search-filter-name.title'),
                clickable: true,
                actions: [
                    {
                        name: (previousActionResult, rowDataItem) => {
                            this.openEditor(rowDataItem);
                        }
                    }
                ]
            },
            {
                fieldId: 'tagsOperator',
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.search-filters.grid.column.relationship.title')
            },
            {
                fieldId: 'tags',
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.search-filters.grid.column.tags.title'),
                cellTemplate: this.tagsTemplate
            }
        ];
        const gridRecordDefinition = {
            fieldDefinitions: [
                {
                    id: 'id',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'name',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'tagsOperator',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'tags',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        const actionButtons = [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                style: 'tertiary',
                iconCls: 'trash',
                actions: [{ name: () => this.deleteSearchFilters() }]
            }
        ];
        this.recordGridConfig$ = of({
            columns: gridColumns,
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.client.admin.search-filters.grid.empty-state.label'),
            enableRowSelection: RowSelectionMode.Multiple,
            enableFiltering: false,
            recordIdField: 'id',
            styles: 'flex-fill',
            useExternalFiltering: false,
            getRecordDefinition: () => of(gridRecordDefinition),
            getData: () => this.rxSearchFiltersService.getSearchFilters(),
            actionButtons,
            filterMode: RecordGridFilterMode.Basic
        });
    }
    deleteSearchFilters() {
        const searchFilterIds = this.grid.api.getSelectedRows().map((row) => row.id);
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.admin.search-filters.delete-confirmation.message')
        })
            .then((result) => {
            if (result) {
                this.rxSearchFiltersService.deleteSearchFilters(searchFilterIds).subscribe(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.search-filters.delete-success.message'));
                    this.grid.api.refresh().subscribe();
                });
            }
        });
    }
    openEditor(data) {
        this.adaptDockedPanelService
            .open({
            title: this.translateService.instant(data
                ? 'com.bmc.arsys.rx.client.admin.search-filters-editor.edit.title'
                : 'com.bmc.arsys.rx.client.admin.search-filters-editor.new.title'),
            content: SearchFiltersEditorComponent,
            data: data
        })
            .then(() => {
            this.grid.api.refresh().subscribe();
        })
            .catch(noop);
    }
}
RxSearchFiltersComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchFiltersComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxNotificationService }, { token: i3.AdaptDockedPanelService }, { token: i4.RxSearchFiltersService }, { token: i5.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxSearchFiltersComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxSearchFiltersComponent, selector: "rx-search-filters", viewQueries: [{ propertyName: "grid", first: true, predicate: RecordGridComponent, descendants: true, static: true }, { propertyName: "tagsTemplate", first: true, predicate: ["tagsTemplate"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.admin.search-filters.header.label' | translate }}\">\n  <div>\n    <button adapt-button type=\"button\" btn-type=\"tertiary\" (click)=\"openEditor()\">\n      <span class=\"d-icon-plus_circle\"></span>\n      {{ 'com.bmc.arsys.rx.client.admin.search-filters.new-search-filter.button.label' | translate }}\n    </button>\n  </div>\n\n  <rx-record-grid class=\"mt-2 h-100\" [config]=\"recordGridConfig$\"></rx-record-grid>\n</rx-admin-settings>\n\n<ng-template #tagsTemplate let-dataItem=\"dataItem\">\n  <div class=\"d-flex flex-row flex-wrap\">\n    <ng-container *ngFor=\"let tag of dataItem.tags\">\n      <adapt-tag [type]=\"'active'\" [removable]=\"false\">\n        {{ tag | truncate: 10 }}\n      </adapt-tag>\n    </ng-container>\n  </div>\n</ng-template>\n", components: [{ type: i6.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i7.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i3.AdaptTagComponent, selector: "adapt-tag", inputs: ["type", "removable", "disabled"], outputs: ["remove"] }], directives: [{ type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i5.TranslatePipe, "truncate": i3.AdaptTruncatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchFiltersComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-search-filters',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    templateUrl: './search-filters.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxNotificationService }, { type: i3.AdaptDockedPanelService }, { type: i4.RxSearchFiltersService }, { type: i5.TranslateService }]; }, propDecorators: { grid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }], tagsTemplate: [{
                type: ViewChild,
                args: ['tagsTemplate', { static: true }]
            }] } });
//# sourceMappingURL=search-filters.component.js.map