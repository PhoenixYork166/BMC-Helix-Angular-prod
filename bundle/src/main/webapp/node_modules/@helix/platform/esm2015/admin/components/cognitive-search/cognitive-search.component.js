import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RX_RECORD_DEFINITION, RxRecordInstanceService, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RxBundleCacheService, RxCurrentUserService, RxDefinitionNameService, RxNotificationService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { find, map, noop, omit } from 'lodash';
import { forkJoin, of } from 'rxjs';
import { CognitiveSearchEditorAdminComponent } from './cognitive-search-editor/cognitive-search-editor.component';
import { RX_COGNITIVE_SEARCH } from './cognitive-search.constant';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@helix/platform/view/components";
import * as i9 from "@angular/common";
export class CognitiveSearchAdminComponent extends BaseViewComponent {
    constructor(formBuilder, rxModalService, rxCurrentUserService, rxBundleCacheService, rxNotificationService, rxRecordInstanceService, rxDefinitionNameService, translateService, rxRecordInstanceDataPageService) {
        super();
        this.formBuilder = formBuilder;
        this.rxModalService = rxModalService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.translateService = translateService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.isAdministrator = this.rxCurrentUserService.isAdministrator();
    }
    ngOnInit() {
        this.searchDatasetTypes = RX_COGNITIVE_SEARCH.searchDatasetTypeOptions.map((dataSetType) => (Object.assign(Object.assign({}, dataSetType), { displayName: this.translateService.instant(dataSetType.displayName) })));
        this.gridConfig = of({
            actionButtons: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                    style: 'tertiary',
                    icon: 'trash',
                    actions: [
                        {
                            name: this.deleteSearchDataset.bind(this)
                        }
                    ]
                }
            ],
            enableFiltering: true,
            recordDefinitionName: RX_COGNITIVE_SEARCH.definitionName,
            enableRowSelection: RowSelectionMode.Multiple,
            getData: (queryParams) => this.getData(queryParams),
            columns: this.getColumns(),
            filterExpression: `${RX_COGNITIVE_SEARCH.queryExpression} "${this.rxBundleCacheService.bundleId}"`,
            styles: 'flex-fill'
        });
    }
    getData(queryParams) {
        return this.rxRecordInstanceDataPageService.post({
            params: Object.assign({}, omit(queryParams, ['searchText']))
        });
    }
    createNewSearchDataset(datasetType) {
        this.openCognitiveSearchEditor(false, datasetType);
    }
    editSearchDataset(selectedRecord) {
        if (!this.isAdministrator) {
            this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.warning.message'));
        }
        else {
            this.openCognitiveSearchEditor(true, selectedRecord[RX_COGNITIVE_SEARCH.fields.searchDatasetType], selectedRecord[RX_RECORD_DEFINITION.coreFieldIds.id]);
        }
    }
    deleteSearchDataset() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.delete-confirmation.message')
        })
            .then((result) => {
            if (result) {
                const deleteRequests$ = [];
                map(this.grid.api.getSelectedRows(), (record) => {
                    deleteRequests$.push(this.rxRecordInstanceService.delete(RX_COGNITIVE_SEARCH.definitionName, record[RX_RECORD_DEFINITION.coreFieldIds.id]));
                });
                forkJoin(deleteRequests$).subscribe(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.data-set-deletion.message'));
                    this.grid.api.refresh().subscribe();
                });
            }
        });
    }
    formatDataSource(dataSource) {
        return dataSource
            ? map(JSON.parse(dataSource).recordDefinitions, (recordDefinitionName) => this.rxDefinitionNameService.getDisplayName(recordDefinitionName)).join(', ')
            : '';
    }
    getDatasetType(searchDatasetType) {
        return find(this.searchDatasetTypes, { datasetType: searchDatasetType }).displayName;
    }
    getColumns() {
        return [
            {
                index: 0,
                fieldId: String(RX_COGNITIVE_SEARCH.fields.datasetName),
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.data-set-name.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousAction, selectedRow) => {
                            this.editSearchDataset(selectedRow);
                        }
                    }
                ]
            },
            {
                index: 1,
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.status),
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.status.label')
            },
            {
                index: 2,
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.description),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label')
            },
            {
                index: 3,
                fieldId: String(RX_COGNITIVE_SEARCH.fields.searchDatasetType),
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.type.title'),
                cellTemplate: this.datasetTypeTemplate
            },
            {
                index: 4,
                fieldId: String(RX_COGNITIVE_SEARCH.fields.locale),
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.locale.label')
            },
            {
                index: 5,
                fieldId: String(RX_COGNITIVE_SEARCH.fields.dataSource),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.record-definition.label'),
                cellTemplate: this.definitionNameCellTemplate
            },
            {
                index: 6,
                fieldId: String(RX_COGNITIVE_SEARCH.fields.confidenceThreshold),
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.confidence-threshold.label')
            },
            {
                index: 7,
                fieldId: String(RX_COGNITIVE_SEARCH.fields.datasetId),
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.data-set-id.title'),
                visible: false
            },
            {
                index: 8,
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.modifiedDate),
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.date-modified.title'),
                visible: false
            },
            {
                index: 9,
                fieldId: String(RX_COGNITIVE_SEARCH.fields.searchType),
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.search-type.title'),
                visible: false
            },
            {
                index: 10,
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.displayId),
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.request-id.title'),
                visible: false
            },
            {
                index: 11,
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.id),
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.instance-id.title'),
                visible: false
            },
            {
                index: 12,
                fieldId: String(RX_COGNITIVE_SEARCH.fields.datasetError),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.error.label'),
                visible: false
            },
            {
                index: 13,
                fieldId: String(RX_COGNITIVE_SEARCH.fields.projectId),
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.project-id.title'),
                visible: false
            }
        ];
    }
    openCognitiveSearchEditor(isEditMode, datasetType, recordId) {
        return this.rxModalService
            .openDockedPanel({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.cognitive-search-data-set.title'),
            content: CognitiveSearchEditorAdminComponent,
            data: {
                isEditMode,
                datasetType,
                formatDataSource: this.formatDataSource.bind(this),
                recordId
            }
        })
            .then(() => {
            this.grid.api.refresh().subscribe();
        })
            .catch(noop);
    }
}
CognitiveSearchAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveSearchAdminComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxModalService }, { token: i3.RxCurrentUserService }, { token: i3.RxBundleCacheService }, { token: i3.RxNotificationService }, { token: i4.RxRecordInstanceService }, { token: i3.RxDefinitionNameService }, { token: i5.TranslateService }, { token: i4.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
CognitiveSearchAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveSearchAdminComponent, selector: "rx-cognitive-search", viewQueries: [{ propertyName: "grid", first: true, predicate: ["grid"], descendants: true, static: true }, { propertyName: "dropdownButton", first: true, predicate: ["dropdownButton"], descendants: true, static: true }, { propertyName: "searchDatasetConfigurationTemplate", first: true, predicate: ["searchDatasetConfigurationTemplate"], descendants: true, static: true }, { propertyName: "definitionNameCellTemplate", first: true, predicate: ["definitionNameCellTemplate"], descendants: true, static: true }, { propertyName: "datasetTypeTemplate", first: true, predicate: ["datasetTypeTemplate"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-search.header.title' | translate }}\">\n  <ng-container>\n    <div class=\"dropdown\" adaptDropdown>\n      <button\n        adapt-button\n        #dropdownButton\n        adaptDropdownToggle\n        type=\"button\"\n        btn-type=\"tertiary\"\n        class=\"d-icon-plus_circle align-self-start\"\n        rx-id=\"new-button\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n      </button>\n\n      <div class=\"dropdown-menu\" adaptDropdownMenu>\n        <button\n          *ngFor=\"let dataset of searchDatasetTypes\"\n          class=\"dropdown-item\"\n          (click)=\"createNewSearchDataset(dataset.datasetType)\"\n          [disabled]=\"!isAdministrator\"\n        >\n          {{ dataset.displayName | translate }}\n        </button>\n      </div>\n    </div>\n\n    <rx-record-grid #grid [config]=\"gridConfig\"></rx-record-grid>\n  </ng-container>\n</rx-admin-settings>\n\n<ng-template #definitionNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ formatDataSource(dataItem[column.field]) }}\n</ng-template>\n\n<ng-template #datasetTypeTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ getDatasetType(dataItem[column.field]) }}\n</ng-template>\n", components: [{ type: i6.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i7.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i7.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i8.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i7.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i7.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveSearchAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cognitive-search',
                    templateUrl: './cognitive-search.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxModalService }, { type: i3.RxCurrentUserService }, { type: i3.RxBundleCacheService }, { type: i3.RxNotificationService }, { type: i4.RxRecordInstanceService }, { type: i3.RxDefinitionNameService }, { type: i5.TranslateService }, { type: i4.RxRecordInstanceDataPageService }]; }, propDecorators: { grid: [{
                type: ViewChild,
                args: ['grid', { static: true }]
            }], dropdownButton: [{
                type: ViewChild,
                args: ['dropdownButton', { static: true }]
            }], searchDatasetConfigurationTemplate: [{
                type: ViewChild,
                args: ['searchDatasetConfigurationTemplate', { static: true }]
            }], definitionNameCellTemplate: [{
                type: ViewChild,
                args: ['definitionNameCellTemplate', { static: true }]
            }], datasetTypeTemplate: [{
                type: ViewChild,
                args: ['datasetTypeTemplate', { static: true }]
            }] } });
//# sourceMappingURL=cognitive-search.component.js.map