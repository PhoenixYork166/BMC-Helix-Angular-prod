import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_ADMINISTRATION, RX_APPLICATION, RxAdminComponentDataPageService, RxAdminSettingsService, RxBundleCacheService, RxFeatureService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import { ColumnSortDirection } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { noop } from 'lodash';
import { BehaviorSubject, from, of } from 'rxjs';
import { filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../bundle-details/bundle-details.constant';
import { DefinitionTabComponent } from '../definition-tab/definition-tab.component';
import { AdminSettingEditorComponent } from './admin-setting-editor/admin-setting-editor.component';
import { AX_CONFIG_DEFINITION_TAB } from './configuration-definition-tab.constant';
import { AX_CONFIGURATION_DEFINITION } from './configuration-definition.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@angular/router";
import * as i5 from "../definition-tab/definition-tab.component";
import * as i6 from "@angular/common";
export class ConfigurationDefinitionTabComponent {
    constructor(rxAdminComponentDataPageQuery, rxModalService, translateService, rxAdminSettingsService, router, rxBundleCache, rxFeatureService) {
        this.rxAdminComponentDataPageQuery = rxAdminComponentDataPageQuery;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.router = router;
        this.rxBundleCache = rxBundleCache;
        this.rxFeatureService = rxFeatureService;
        this.definitions$ = this.rxAdminComponentDataPageQuery.get().pipe(map((dataPage) => ({
            totalSize: dataPage.totalSize,
            data: dataPage.data.map((item) => {
                if (item.showInLocation === RX_ADMINISTRATION.settingAccessOptions.application.value) {
                    item.showInLocation = this.translateService.instant('com.bmc.arsys.rx.client.common.application.label');
                }
                else if (item.showInLocation === RX_ADMINISTRATION.settingAccessOptions.innovationStudio.value) {
                    item.showInLocation = 'Innovation Studio';
                }
                else if (item.showInLocation === RX_ADMINISTRATION.settingAccessOptions.both.value) {
                    item.showInLocation = `${this.translateService.instant('com.bmc.arsys.rx.client.common.application.label')}, Innovation Studio`;
                }
                else {
                    item.showInLocation = this.translateService.instant('com.bmc.arsys.rx.client.common.none.label');
                }
                return Object.assign(Object.assign({}, item), { name: item.component, componentType: this.getComponentType(item) });
            })
        })));
        this.isActionInProgress = false;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionType = 'config';
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
    }
    ngOnInit() {
        if (this.rxFeatureService.isFeatureEnabled('DRD21-14987')) {
            this.editRouterLink = `/${RX_APPLICATION.innovationStudioBundleId}/${this.definitionType}/edit2/${this.rxBundleCache.bundleId}:`;
        }
        else {
            this.editRouterLink = `/${RX_APPLICATION.innovationStudioBundleId}/${this.definitionType}/edit/${this.rxBundleCache.bundleId}:`;
        }
        this.gridColumns = [
            {
                title: AX_BUNDLE_DETAILS.configurationGridColumns.component.title,
                fieldId: AX_BUNDLE_DETAILS.configurationGridColumns.component.fieldId,
                cellTemplate: this.componentCellTemplate,
                sortable: { direction: ColumnSortDirection.Asc, priority: 0 }
            },
            AX_BUNDLE_DETAILS.configurationGridColumns.componentType,
            AX_CONFIG_DEFINITION_TAB.definitionGridColumns.showInLocation
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.configurationGridColumns.component.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.configurationGridColumns.componentType.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_CONFIG_DEFINITION_TAB.definitionGridColumns.showInLocation.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
        this.settingTypeLabels = {
            external: this.translateService.instant(AX_CONFIGURATION_DEFINITION.configurationSettingTypes.external.labelKey),
            inBundle: this.translateService.instant(AX_CONFIGURATION_DEFINITION.configurationSettingTypes.inbundle.labelKey),
            shared: this.translateService.instant(AX_CONFIGURATION_DEFINITION.configurationSettingTypes.shared.labelKey)
        };
    }
    getComponentType(adminComponent) {
        return adminComponent.uiLocation === 'External Location'
            ? this.settingTypeLabels.external
            : adminComponent.custom === 'CommonSettings'
                ? this.settingTypeLabels.shared
                : this.settingTypeLabels.inBundle;
    }
    getDefinitionActions(selectedRows) {
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                subActions: [
                    {
                        labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.new.shared-setting.label',
                        id: RX_ADMINISTRATION.configurationSettingTypes.shared.configurationType,
                        rxId: RX_ADMINISTRATION.configurationSettingTypes.shared.configurationType
                    },
                    {
                        labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.new.in-bundle-setting.label',
                        id: RX_ADMINISTRATION.configurationSettingTypes.inbundle.configurationType,
                        rxId: RX_ADMINISTRATION.configurationSettingTypes.inbundle.configurationType
                    },
                    {
                        labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.new.external-setting.label',
                        id: RX_ADMINISTRATION.configurationSettingTypes.external.configurationType,
                        rxId: RX_ADMINISTRATION.configurationSettingTypes.external.configurationType
                    }
                ]
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: selectedRows.length === 0
            }
        ];
    }
    onCustomAction(event) {
        if (event.actionId === RX_ADMINISTRATION.configurationSettingTypes.shared.configurationType) {
            this.router.navigate([
                RX_APPLICATION.innovationStudioBundleId,
                this.definitionType,
                this.rxFeatureService.isFeatureEnabled('DRD21-14987') ? 'new2' : 'new',
                this.rxBundleCache.bundleId
            ]);
        }
        else if (event.actionId === RX_ADMINISTRATION.configurationSettingTypes.inbundle.configurationType) {
            this.openInBundleSettingsEditor({
                editMode: false,
                titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.new.in-bundle-setting.title',
                selectedAdminSetting: {
                    linkType: RX_ADMINISTRATION.configurationSettingTypes.inbundle.value
                }
            });
        }
        else if (event.actionId === RX_ADMINISTRATION.configurationSettingTypes.external.configurationType) {
            this.openInBundleSettingsEditor({
                editMode: false,
                titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.new.external-setting.title',
                selectedAdminSetting: {
                    linkType: RX_ADMINISTRATION.configurationSettingTypes.external.value
                }
            });
        }
    }
    editAdminSetting(row) {
        if (row.custom === 'CustomView') {
            this.rxAdminSettingsService.getAdminSetting(row.component).subscribe((adminSetting) => {
                this.openInBundleSettingsEditor({
                    editMode: true,
                    titleKey: this.getTitleKey(adminSetting.linkType),
                    selectedAdminSetting: adminSetting
                });
            });
        }
    }
    openInBundleSettingsEditor(data) {
        from(this.rxModalService
            .openDockedPanel({
            title: this.translateService.instant(data.titleKey),
            content: AdminSettingEditorComponent,
            size: OpenViewActionModalSize.Small,
            data: Object.assign({}, data)
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    getTitleKey(linkType) {
        return linkType === RX_ADMINISTRATION.configurationSettingTypes.inbundle.value
            ? 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.new.in-bundle-setting.label'
            : 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.new.external-setting.label';
    }
    onDeleteDefinition(selectedRows) {
        const definitionNames = selectedRows.map((definition) => definition.name);
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((response) => response
            ? this.rxAdminSettingsService.deleteAdminSetting(definitionNames).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
}
/** @nocollapse */ ConfigurationDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigurationDefinitionTabComponent, deps: [{ token: i1.RxAdminComponentDataPageService }, { token: i2.RxModalService }, { token: i3.TranslateService }, { token: i1.RxAdminSettingsService }, { token: i4.Router }, { token: i1.RxBundleCacheService }, { token: i1.RxFeatureService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ConfigurationDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ConfigurationDefinitionTabComponent, selector: "ax-configuration-definition-tab", viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }, { propertyName: "componentCellTemplate", first: true, predicate: ["componentCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitionType]=\"'config-definition'\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n  (customAction)=\"onCustomAction($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n></ax-definition-tab>\n\n<ng-template #componentCellTemplate let-dataItem=\"dataItem\">\n  <div (click)=\"editAdminSetting(dataItem)\" *ngIf=\"dataItem.custom === 'CustomView'\">\n    <a [routerLink]=\"\" (click)=\"(false)\">\n      {{ dataItem.component }}\n    </a>\n  </div>\n  <div *ngIf=\"dataItem.custom === 'CommonSettings'\">\n    <a [routerLink]=\"editRouterLink + dataItem.component\">\n      {{ dataItem.component }}\n    </a>\n  </div>\n</ng-template>\n", components: [{ type: i5.DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }], pipes: { "async": i6.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigurationDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-configuration-definition-tab',
                    templateUrl: './configuration-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxAdminComponentDataPageService }, { type: i2.RxModalService }, { type: i3.TranslateService }, { type: i1.RxAdminSettingsService }, { type: i4.Router }, { type: i1.RxBundleCacheService }, { type: i1.RxFeatureService }]; }, propDecorators: { definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }], componentCellTemplate: [{
                type: ViewChild,
                args: ['componentCellTemplate', { static: true }]
            }] } });
//# sourceMappingURL=configuration-definition-tab.component.js.map