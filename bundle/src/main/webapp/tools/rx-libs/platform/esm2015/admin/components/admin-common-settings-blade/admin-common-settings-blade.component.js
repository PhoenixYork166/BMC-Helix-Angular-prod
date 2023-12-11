import { Component, Injector, ViewChild } from '@angular/core';
import { DismissReasons, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { cloneDeep } from 'lodash';
import { NEVER } from 'rxjs';
import { RxAdminCommonSettingsService } from '../services/admin-common-settings.service';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../services/admin-common-settings.service";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "../admin-common-settings-editor/admin-common-settings-editor.component";
export class AdminCommonSettingsBladeComponent extends RxModalClass {
    constructor(context, injector, rxAdminCommonSettingsService) {
        super(context, injector);
        this.context = context;
        this.injector = injector;
        this.rxAdminCommonSettingsService = rxAdminCommonSettingsService;
        this.busySubscription = null;
        this.getRecordGridConfig = this.getRecordGridConfig.bind(this);
        this.openSettingsDetails = this.openSettingsDetails.bind(this);
    }
    ngOnInit() {
        super.ngOnInit();
        const data = this.context.getData();
        this.groups = cloneDeep(data.config.groups);
        this.isNew = data.config.isNew;
        this.ownerKeyValue = data.config.ownerKeyValue;
        this.childOwnerKeyValue = data.config.childOwnerKeyValue;
        this.componentName = data.config.componentName;
        this.isChildSetting = data.config.isChildSetting;
    }
    isDirty() {
        return this.adminCommonSettingsEditorComponent ? !this.adminCommonSettingsEditorComponent.canClose() : false;
    }
    onCloseEditor() {
        this.context.dismiss(DismissReasons.CLOSE_BTN);
    }
    onBusy(isBusy) {
        var _a;
        if (isBusy) {
            this.busySubscription = NEVER.subscribe();
        }
        else {
            (_a = this.busySubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        }
    }
    getRecordGridConfig(options) {
        return this.rxAdminCommonSettingsService.getRecordGridConfig(options);
    }
    openSettingsDetails(options) {
        return this.rxAdminCommonSettingsService.openSettingsDetails(options);
    }
    onSave() {
        this.context.close(null);
    }
}
AdminCommonSettingsBladeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminCommonSettingsBladeComponent, deps: [{ token: i1.DockedPanelContext }, { token: i0.Injector }, { token: i2.RxAdminCommonSettingsService }], target: i0.ɵɵFactoryTarget.Component });
AdminCommonSettingsBladeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AdminCommonSettingsBladeComponent, selector: "rx-admin-common-settings-blade", viewQueries: [{ propertyName: "adminCommonSettingsEditorComponent", first: true, predicate: ["editor"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<rx-admin-settings [busy]=\"busySubscription\">\n  <rx-admin-common-settings-editor\n    #editor\n    [componentName]=\"componentName\"\n    [isNew]=\"isNew\"\n    [groups]=\"groups\"\n    [isChildSetting]=\"isChildSetting\"\n    [ownerKeyValue]=\"ownerKeyValue\"\n    [childOwnerKeyValue]=\"childOwnerKeyValue\"\n    [createPermission]=\"true\"\n    [getRecordGridConfig]=\"getRecordGridConfig\"\n    [openSettingsDetails]=\"openSettingsDetails\"\n    (closeEditor)=\"onCloseEditor()\"\n    (busy)=\"onBusy($event)\"\n    (save)=\"onSave()\"\n  ></rx-admin-common-settings-editor>\n</rx-admin-settings>\n", styles: ["rx-admin-settings{padding:0!important}\n"], components: [{ type: i3.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i4.AdminCommonSettingsEditorComponent, selector: "rx-admin-common-settings-editor", inputs: ["componentName", "ownerKeyValue", "groups", "createPermission", "isNew", "isChildSetting", "childOwnerKeyValue", "getRecordGridConfig", "openSettingsDetails"], outputs: ["closeEditor", "busy", "save"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminCommonSettingsBladeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-common-settings-blade',
                    templateUrl: './admin-common-settings-blade.component.html',
                    styleUrls: ['./admin-common-settings-blade.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.DockedPanelContext }, { type: i0.Injector }, { type: i2.RxAdminCommonSettingsService }]; }, propDecorators: { adminCommonSettingsEditorComponent: [{
                type: ViewChild,
                args: ['editor']
            }] } });
//# sourceMappingURL=admin-common-settings-blade.component.js.map