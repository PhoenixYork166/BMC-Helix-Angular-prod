import { Component, ViewChild, TemplateRef } from '@angular/core';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { AdaptDockedPanelService, DismissReasons } from '@bmc-ux/adapt-angular';
import { chain, isEmpty, noop } from 'lodash';
import { HkmAccessMapEditorComponent } from './hkm-access-map-editor/hkm-access-map-editor.component';
import { RxHkmAccessMappingService } from './hkm-access-mapping.service';
import { PredefinedLobOptions } from './hkm-access-mapping.types';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxModalService, RX_MODAL } from '@helix/platform/ui-kit';
import { of } from 'rxjs';
import { RecordGridComponent, RecordGridFilterMode, RowSelectionMode } from '@helix/platform/view/components';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "./hkm-access-mapping.service";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@helix/platform/view/components";
import * as i7 from "@angular/common";
export class HkmAccessMappingAdminComponent extends BaseViewComponent {
    constructor(adaptDockedPanelService, translateService, rxModalService, rxHkmAccessMappingService) {
        super();
        this.adaptDockedPanelService = adaptDockedPanelService;
        this.translateService = translateService;
        this.rxModalService = rxModalService;
        this.rxHkmAccessMappingService = rxHkmAccessMappingService;
        this.predefinedLinesOfBusiness = [
            { id: PredefinedLobOptions.All, name: this.translateService.instant('com.bmc.arsys.rx.client.common.all.label') },
            { id: PredefinedLobOptions.None, name: this.translateService.instant('com.bmc.arsys.rx.client.common.none.label') }
        ];
        this.hkmPortals = [];
        this.supportGroups = [];
        this.selectedLob = this.predefinedLinesOfBusiness[0];
        this.itsmCompanies = [];
        this.linesOfBusiness = [];
    }
    ngOnInit() {
        this.loadItsmHkmMappingData();
        this.rxHkmAccessMappingService.callHkmMappingApi().subscribe((portals) => {
            this.hkmPortals = portals;
        });
        this.setupGridInit();
    }
    setupGridInit() {
        this.gridColumns = [
            {
                fieldId: 'supportGroupName',
                title: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping.grid.column.hkm-permission-group.title'),
                filterable: false,
                cellTemplate: this.visibilityGroupColTemplate
            },
            {
                fieldId: 'description',
                title: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping.grid.column.support-group-description.title'),
                filterable: false
            },
            {
                fieldId: 'permissionGroupId',
                title: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping.grid.column.hkm-permission-group-id.title'),
                filterable: false,
                visible: false
            },
            {
                filterable: true,
                fieldId: 'isMapped',
                title: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping.grid.column.status.title'),
                cellTemplate: this.statusColTemplate
            },
            {
                fieldId: 'hkmportalName',
                title: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping.grid.column.hkm-portal-name.title'),
                visible: true,
                filterable: false
            },
            {
                fieldId: 'hkmgroupName',
                title: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping.grid.column.hkm-group-name.title'),
                visible: true,
                filterable: false
            },
            {
                fieldId: 'hkmgroupID',
                title: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping.grid.column.hkm-group-id.title'),
                visible: false,
                filterable: false
            },
            {
                fieldId: 'hkmroleName',
                title: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping.grid.column.hkm-role.title'),
                visible: true,
                filterable: false
            }
        ];
        const gridRecordDefinition = {
            fieldDefinitions: [
                {
                    id: 'supportGroupName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'description',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'permissionGroupId',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'isMapped',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.selection,
                    optionNamesById: {
                        true: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping.grid.column.status.mapped.label'),
                        false: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping.grid.column.status.unmapped.label')
                    }
                },
                {
                    id: 'hkmportalName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'hkmgroupName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'hkmgroupID',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'hkmroleName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        const actionButtons = [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping.grid.map-access.button.label'),
                style: 'tertiary',
                iconCls: 'cubes_restart',
                disabled: (selectedRows) => !this.hasPortals() || selectedRows.length === 0 || selectedRows.some((row) => row.isMapped),
                actions: [{ name: () => this.openAccessMappingDialog() }]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping.grid.unmap-access.button.label'),
                style: 'tertiary',
                iconCls: 'cube_cross_circle',
                disabled: (selectedRows) => !this.hasPortals() || selectedRows.length === 0 || selectedRows.some((row) => !row.isMapped),
                actions: [{ name: () => this.deleteMapping() }]
            }
        ];
        this.recordGridConfig$ = of({
            columns: this.gridColumns,
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.document-selection.grid.empty-state.label'),
            enableRowSelection: RowSelectionMode.Multiple,
            enableFiltering: true,
            recordIdField: 'requestId',
            styles: 'flex-fill',
            useExternalFiltering: false,
            getRecordDefinition: () => of(gridRecordDefinition),
            getData: () => of({
                totalSize: this.supportGroups.length,
                data: this.supportGroups
            }),
            actionButtons,
            filterMode: RecordGridFilterMode.Basic
        });
    }
    setUpValues() {
        if (this.selectedLob.id === PredefinedLobOptions.All) {
            this.supportGroups = [...this.selectedCompany.supportGroups];
        }
        else if (this.selectedLob.id === PredefinedLobOptions.None) {
            this.supportGroups = this.selectedCompany.supportGroups.filter((group) => isEmpty(group.lineOfBusiness));
        }
        else {
            this.supportGroups = this.selectedCompany.supportGroups.filter((group) => { var _a; return (_a = group.lineOfBusiness) === null || _a === void 0 ? void 0 : _a.some((lob) => lob === this.selectedLob.id); });
        }
        this.itsmHkmMappingDataGrid.api.refresh().subscribe();
    }
    loadItsmHkmMappingData() {
        this.busy = this.rxHkmAccessMappingService
            .callItsmMappingApi()
            .subscribe(({ data }) => {
            var _a;
            this.itsmCompanies = [...data];
            const extractedLinesOfBusiness = chain(data)
                .flatMap((company) => company.supportGroups)
                .filter((group) => !isEmpty(group.lineOfBusiness))
                .flatMap((group) => group.lineOfBusiness)
                .sort()
                .sortedUniq()
                .map((lob) => ({ id: lob, name: lob }))
                .value();
            this.linesOfBusiness = [...this.predefinedLinesOfBusiness, ...extractedLinesOfBusiness];
            if (isEmpty((_a = this.selectedCompany) === null || _a === void 0 ? void 0 : _a.name)) {
                this.setSelected(0);
            }
            else {
                const currentCompanyId = this.selectedCompany.permissionId;
                this.selectedCompany = this.itsmCompanies.find((company) => company.permissionId === currentCompanyId);
                this.setUpValues();
            }
        });
    }
    setSelected(index) {
        this.selectedCompany = this.itsmCompanies[index];
        this.setUpValues();
    }
    setSelectedLineOfBusiness(lob) {
        this.selectedLob = lob;
        this.setUpValues();
    }
    openAccessMappingDialog(supportGroup = null) {
        let title = this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping-editor.new.title');
        let portal = this.hkmPortals[0];
        let selectedSupportGroups = this.itsmHkmMappingDataGrid.api.getSelectedRows();
        let userGroups = [];
        if (supportGroup) {
            const mappedUserGroupsIds = supportGroup.hkmgroupID.split(',').map(Number);
            title = this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping-editor.edit.title');
            portal = this.hkmPortals.find((hkmPortal) => hkmPortal.portalName === supportGroup.hkmportalName);
            selectedSupportGroups = [supportGroup];
            userGroups = portal.userGroups.filter((group) => mappedUserGroupsIds.includes(group.id));
        }
        this.openDetailDialog(title, selectedSupportGroups, portal, userGroups);
    }
    openDetailDialog(dialogTitle, selectedSupportGroups, selectedHkmPortal, selectedHkmUserGroups = []) {
        var _a;
        if (((_a = this.hkmPortals) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            this.adaptDockedPanelService
                .open({
                title: dialogTitle,
                content: HkmAccessMapEditorComponent,
                size: OpenViewActionModalSize.Small,
                data: {
                    company: this.selectedCompany,
                    hkmPortals: this.hkmPortals,
                    selectedLob: this.selectedLob,
                    selectedSupportGroups,
                    selectedHkmPortal,
                    selectedHkmUserGroups
                }
            })
                .then((result) => {
                if (result === DismissReasons.CLOSE_BTN) {
                    this.loadItsmHkmMappingData();
                }
            })
                .catch(noop);
        }
    }
    deleteMapping() {
        const selectedGroups = this.itsmHkmMappingDataGrid.api.getSelectedRows();
        const selectedGroupIds = selectedGroups.map((group) => group.id);
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping.delete-mapping.message')
        })
            .then((result) => {
            if (result) {
                this.rxHkmAccessMappingService
                    .deleteAccessMappings(selectedGroupIds)
                    .subscribe(() => this.loadItsmHkmMappingData());
            }
        });
    }
    hasPortals() {
        return !isEmpty(this.hkmPortals);
    }
}
HkmAccessMappingAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: HkmAccessMappingAdminComponent, deps: [{ token: i1.AdaptDockedPanelService }, { token: i2.TranslateService }, { token: i3.RxModalService }, { token: i4.RxHkmAccessMappingService }], target: i0.ɵɵFactoryTarget.Component });
HkmAccessMappingAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: HkmAccessMappingAdminComponent, selector: "rx-admin-hkm-access-mapping", viewQueries: [{ propertyName: "itsmHkmMappingDataGrid", first: true, predicate: ["itsmHkmMappingDataGrid"], descendants: true }, { propertyName: "statusColTemplate", first: true, predicate: ["statusColTemplate"], descendants: true, static: true }, { propertyName: "visibilityGroupColTemplate", first: true, predicate: ["visibilityGroupColTemplate"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.hkm-access-mapping.header.label' | translate }}\" [busy]=\"busy\">\n  <div class=\"d-flex\">\n    <div class=\"d-flex pr-3 align-items-baseline\">\n      <label class=\"text-strong\">{{ 'com.bmc.arsys.rx.client.hkm-access-mapping.company.label' | translate }}:</label>\n      <div class=\"d-flex\" adaptDropdown>\n        <button\n          class=\"pl-1\"\n          adapt-button\n          #dropdownButton\n          rx-id=\"company-dropdown\"\n          adaptDropdownToggle\n          type=\"button\"\n          btn-type=\"tertiary\">\n          {{ selectedCompany?.name }}\n        </button>\n        <div class=\"dropdown-menu\" adaptDropdownMenu>\n          <button\n            *ngFor=\"let company of itsmCompanies; let index = index\"\n            [class.text-active]=\"company?.permissionId === selectedCompany?.permissionId\"\n            [class.active]=\"company?.permissionId === selectedCompany?.permissionId\"\n            type=\"button\"\n            class=\"dropdown-item\"\n            (click)=\"setSelected(index)\">\n            {{ company.name }}\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"d-flex align-items-baseline\">\n      <label class=\"text-strong\">{{ 'com.bmc.arsys.rx.client.hkm-access-mapping.line-of-business.label' | translate\n        }}:</label>\n      <div class=\"d-flex\" adaptDropdown >\n        <button\n          adapt-button\n          #dropdownButton\n          adaptDropdownToggle\n          type=\"button\"\n          rx-id=\"lob-dropdown\"\n          btn-type=\"tertiary\"\n          class=\"pl-1\">\n          {{ selectedLob?.name }}\n        </button>\n        <div class=\"dropdown-menu\" adaptDropdownMenu>\n          <button\n            type=\"button\"\n            *ngFor=\"let lob of linesOfBusiness\"\n            [class.text-active]=\"lob.id === selectedLob.id\"\n            [class.active]=\"lob.id === selectedLob.id\"\n            class=\"dropdown-item\"\n            (click)=\"setSelectedLineOfBusiness(lob)\">\n            {{ lob.name }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <rx-record-grid class=\"mb-3 mt-1\" [config]=\"recordGridConfig$\" #itsmHkmMappingDataGrid></rx-record-grid>\n\n  <ng-template #statusColTemplate let-dataItem=\"dataItem\">\n    <div class=\"cm-container container\">\n      <div class=\"row\">\n        <div class=\"col-sm-6 align-start\">\n          <adapt-badge\n            [animate]=\"animation\"\n            variant=\"warning\"\n            [showAlert]=\"false\"\n            alertVariant=\"warning\"\n            *ngIf=\"!dataItem.isMapped\"\n          >\n            {{ 'com.bmc.arsys.rx.client.hkm-access-mapping.grid.column.status.unmapped.label' | translate }}\n          </adapt-badge>\n          <adapt-badge\n            [animate]=\"animation\"\n            variant=\"success\"\n            [showAlert]=\"false\"\n            alertVariant=\"success\"\n            *ngIf=\"dataItem.isMapped\"\n          >\n            {{ 'com.bmc.arsys.rx.client.hkm-access-mapping.grid.column.status.mapped.label' | translate }}\n          </adapt-badge>\n        </div>\n      </div>\n    </div>\n  </ng-template>\n\n  <ng-template #visibilityGroupColTemplate let-dataItem=\"dataItem\">\n    <div class=\"cm-container container\">\n      <div class=\"row align-start\" *ngIf=\"dataItem.isMapped && hasPortals()\">\n        <a href=\"javascript:void(0)\" (click)=\"openAccessMappingDialog(dataItem)\" class=\"alert-link\">{{\n          dataItem.supportGroupName\n        }}</a>\n      </div>\n      <div class=\"row align-start\" *ngIf=\"!dataItem.isMapped || !hasPortals()\">\n        {{ dataItem.supportGroupName }}\n      </div>\n    </div>\n  </ng-template>\n</rx-admin-settings>\n", components: [{ type: i5.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i1.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i6.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1.AdaptBadgeComponent, selector: "adapt-badge", inputs: ["animate", "showAlert", "variant", "alertVariant", "customCls"] }], directives: [{ type: i1.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: HkmAccessMappingAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-hkm-access-mapping',
                    templateUrl: './hkm-access-mapping.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptDockedPanelService }, { type: i2.TranslateService }, { type: i3.RxModalService }, { type: i4.RxHkmAccessMappingService }]; }, propDecorators: { itsmHkmMappingDataGrid: [{
                type: ViewChild,
                args: ['itsmHkmMappingDataGrid']
            }], statusColTemplate: [{
                type: ViewChild,
                args: ['statusColTemplate', { static: true }]
            }], visibilityGroupColTemplate: [{
                type: ViewChild,
                args: ['visibilityGroupColTemplate', { static: true }]
            }] } });
//# sourceMappingURL=hkm-access-mapping.component.js.map