import { Component, Input, ViewChild } from '@angular/core';
import { RxAdminSettingsService } from '@helix/platform/shared/api';
import { RecordGridComponent } from '@helix/platform/view/components';
import { flatten, forEach } from 'lodash';
import { forkJoin, NEVER, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AdminCommonSettingsEditorComponent } from '../admin-common-settings-editor/admin-common-settings-editor.component';
import { RxAdminCommonSettingsService } from '../services/admin-common-settings.service';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "../services/admin-common-settings.service";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@helix/platform/view/components";
import * as i7 from "../admin-common-settings-editor/admin-common-settings-editor.component";
import * as i8 from "@angular/common";
import * as i9 from "@ngx-translate/core";
export class AdminCommonSettingsComponent {
    constructor(rxModalService, rxAdminSettingsService, rxAdminCommonSettingsService) {
        this.rxModalService = rxModalService;
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.rxAdminCommonSettingsService = rxAdminCommonSettingsService;
        this.destroyed$ = new ReplaySubject(1);
        this.getRecordGridConfig = this.getRecordGridConfig.bind(this);
        this.openSettingsDetails = this.openSettingsDetails.bind(this);
    }
    ngOnInit() {
        let busySubject;
        this.componentName$
            .pipe(filter(Boolean), tap((componentName) => {
            busySubject = new Subject();
            this.componentName = componentName;
            this.state = null;
            this.busySubscription = busySubject.pipe(take(1)).subscribe();
        }), switchMap((componentName) => this.rxAdminSettingsService.getComponentDefinition(componentName)), tap((adminComponentDefinition) => {
            this.navigationMenuLabel = adminComponentDefinition.header;
        }), switchMap((adminComponentDefinition) => {
            const state = {
                headerLabel: adminComponentDefinition.header,
                createPermission: adminComponentDefinition.createPermission,
                componentName: adminComponentDefinition.compName,
                supportsMultiple: false,
                commonSettingGroups: []
            };
            const commonSettingGroups$ = [];
            forEach(adminComponentDefinition.groups, (group) => {
                const propertyConfigs$ = [];
                const commonSettingGroup = {
                    name: group.name,
                    supportsMultiple: group.supportsMultiple,
                    isComponent: group.component,
                    settings: []
                };
                if (commonSettingGroup.isComponent) {
                    propertyConfigs$.push(this.rxAdminSettingsService.getComponentDefinition(group.name).pipe(map((childAdminComponentDefinition) => {
                        const childGroup = childAdminComponentDefinition.groups[0];
                        if (commonSettingGroup.supportsMultiple) {
                            commonSettingGroup.controls = childGroup.controls;
                        }
                        return childGroup.controls.map((control) => this.rxAdminCommonSettingsService.createPropertyConfig(control));
                    })));
                }
                else {
                    forEach(group.controls, (control) => {
                        propertyConfigs$.push(of(this.rxAdminCommonSettingsService.createPropertyConfig(control)));
                    });
                }
                commonSettingGroups$.push(forkJoin(propertyConfigs$).pipe(map((propertyConfigs) => {
                    commonSettingGroup.propertyConfigs = flatten(propertyConfigs);
                    return commonSettingGroup;
                })));
            });
            return commonSettingGroups$.length
                ? forkJoin(commonSettingGroups$).pipe(map((commonSettingGroups) => {
                    state.commonSettingGroups = commonSettingGroups;
                    if (adminComponentDefinition.supportsMultiple) {
                        state.supportsMultiple = true;
                        const controls = flatten(adminComponentDefinition.groups.filter((group) => !group.component).map((group) => group.controls));
                        state.recordGridConfig = this.rxAdminCommonSettingsService
                            .getRecordGridConfig({
                            componentName: state.componentName,
                            controls,
                            getCurrentGridFn: this.getCurrentGrid.bind(this),
                            createPermission: state.createPermission,
                            groups: state.commonSettingGroups,
                            bladeTitle: state.headerLabel,
                            ownerKeyValue: null,
                            groupName: null,
                            onDialogApiReady: (dialogApi) => (this.dialogApi = dialogApi)
                        })
                            .pipe(map((recordGridConfig) => (Object.assign(Object.assign({}, recordGridConfig), { styles: 'h-auto flex-fill mw-100' }))));
                    }
                    return state;
                }))
                : of(null);
        }), takeUntil(this.destroyed$))
            .subscribe((state) => {
            this.state = state;
            busySubject.next();
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    addNewSetting() {
        this.rxAdminCommonSettingsService
            .openSettingsDetails({
            title: this.state.headerLabel,
            componentName: this.componentName,
            groups: this.state.commonSettingGroups,
            onDialogApiReady: (dialogApi) => (this.dialogApi = dialogApi)
        })
            .then(() => {
            this.dialogApi = null;
            this.recordGridComponent.api.refresh().subscribe();
        })
            .catch(() => {
            this.dialogApi = null;
        });
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
    getCurrentGrid() {
        return this.recordGridComponent;
    }
    canClose() {
        var _a, _b, _c;
        return Boolean((_b = (_a = this.adminCommonSettingsEditorComponent) === null || _a === void 0 ? void 0 : _a.canClose()) !== null && _b !== void 0 ? _b : !((_c = this.dialogApi) === null || _c === void 0 ? void 0 : _c.isDirty()));
    }
}
AdminCommonSettingsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminCommonSettingsComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxAdminSettingsService }, { token: i3.RxAdminCommonSettingsService }], target: i0.ɵɵFactoryTarget.Component });
AdminCommonSettingsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AdminCommonSettingsComponent, selector: "rx-admin-common-settings", inputs: { componentName$: "componentName$" }, viewQueries: [{ propertyName: "recordGridComponent", first: true, predicate: RecordGridComponent, descendants: true }, { propertyName: "adminCommonSettingsEditorComponent", first: true, predicate: AdminCommonSettingsEditorComponent, descendants: true }], ngImport: i0, template: "<rx-admin-settings [busy]=\"busySubscription\" [header]=\"state?.headerLabel || navigationMenuLabel\">\n  <div *ngIf=\"!state\" class=\"d-flex align-items-center justify-content-center h-100\">\n    <adapt-empty-state\n      [type]=\"'config'\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.no-settings-available.message' | translate }}\"\n    ></adapt-empty-state>\n  </div>\n\n  <div *ngIf=\"state\" class=\"d-flex flex-column align-items-start flex-fill\">\n    <ng-container *ngIf=\"state.supportsMultiple\">\n      <button *ngIf=\"state.createPermission\" adapt-button type=\"button\" btn-type=\"tertiary\" (click)=\"addNewSetting()\">\n        <span class=\"d-icon-plus_circle\"></span>\n        {{ 'com.bmc.arsys.rx.client.admin.add-new-setting.label' | translate }}\n      </button>\n\n      <rx-record-grid [config]=\"state.recordGridConfig\"></rx-record-grid>\n    </ng-container>\n\n    <div class=\"flex-fill w-100\" *ngIf=\"!state.supportsMultiple\">\n      <rx-admin-common-settings-editor\n        [componentName]=\"state.componentName\"\n        [groups]=\"state.commonSettingGroups\"\n        [isNew]=\"false\"\n        [createPermission]=\"state.createPermission\"\n        [getRecordGridConfig]=\"getRecordGridConfig\"\n        [openSettingsDetails]=\"openSettingsDetails\"\n        (busy)=\"onBusy($event)\"\n      ></rx-admin-common-settings-editor>\n    </div>\n  </div>\n</rx-admin-settings>\n", components: [{ type: i4.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i5.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i6.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i7.AdminCommonSettingsEditorComponent, selector: "rx-admin-common-settings-editor", inputs: ["componentName", "ownerKeyValue", "groups", "createPermission", "isNew", "isChildSetting", "childOwnerKeyValue", "getRecordGridConfig", "openSettingsDetails"], outputs: ["closeEditor", "busy", "save"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i9.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminCommonSettingsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-common-settings',
                    templateUrl: './admin-common-settings.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxAdminSettingsService }, { type: i3.RxAdminCommonSettingsService }]; }, propDecorators: { componentName$: [{
                type: Input
            }], recordGridComponent: [{
                type: ViewChild,
                args: [RecordGridComponent]
            }], adminCommonSettingsEditorComponent: [{
                type: ViewChild,
                args: [AdminCommonSettingsEditorComponent]
            }] } });
//# sourceMappingURL=admin-common-settings.component.js.map