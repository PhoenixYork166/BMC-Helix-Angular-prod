import { Component, EventEmitter, HostBinding, Input, Optional, Output, QueryList, ViewChildren } from '@angular/core';
import { RxAdminSettingsService, RxNotificationService } from '@helix/platform/shared/api';
import { FormBuilderComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RecordGridComponent } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { chain, cloneDeep, every, filter, find, findIndex, forEach, isEmpty, isNull, last, map as _map, some } from 'lodash';
import { forkJoin, of, throwError } from 'rxjs';
import { catchError, defaultIfEmpty, map, switchMap, tap } from 'rxjs/operators';
import { RX_ADMIN } from '../admin.constant';
import { RxAdminFileUtilityService } from '../services/admin-file-utility.service';
import { AdaptDockedPanelComponent } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "../services/admin-file-utility.service";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@helix/platform/view/components";
import * as i8 from "@angular/common";
export class AdminCommonSettingsEditorComponent {
    constructor(rxAdminSettingsService, rxAdminFileUtilityService, rxNotificationService, rxModalService, translateService, adaptDockedPanelComponent) {
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.rxAdminFileUtilityService = rxAdminFileUtilityService;
        this.rxNotificationService = rxNotificationService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.ownerKeyValue = '';
        this.closeEditor = new EventEmitter();
        this.busy = new EventEmitter();
        this.save = new EventEmitter();
        this.isInDockedPanel = false;
        this.isInDockedPanel = !!adaptDockedPanelComponent;
        this.class = this.isInDockedPanel ? 'dp-content' : '';
    }
    ngOnInit() {
        let componentSettingRequest;
        this.isSettingsActionsAvailable = this.isChildSetting || some(this.groups, (group) => !group.supportsMultiple);
        if (!this.isChildSetting) {
            if (!this.isNew) {
                const componentName = this.ownerKeyValue ? `${this.componentName}/${this.ownerKeyValue}` : this.componentName;
                this.busy.emit(true);
                componentSettingRequest = this.rxAdminSettingsService.getComponentSettings(componentName).pipe(tap((componentSettings) => {
                    this.ownerKeyValue = componentSettings.values.length ? last(componentSettings.values).ownerKeyValue1 : '';
                    this.generalSettings = componentSettings.values;
                    this.isNew = !Boolean(componentSettings.values.length);
                    if (!this.assigneeGroup && componentSettings.values.length) {
                        this.assigneeGroup = last(componentSettings.values).assigneeGroupPermission;
                    }
                    forEach(this.groups, (group) => {
                        if (!group.supportsMultiple && !group.isComponent) {
                            this.setGroupSettingValues(group, this.generalSettings);
                        }
                    });
                }), switchMap(() => {
                    const childSettings$ = [];
                    if (!this.isNew && this.ownerKeyValue) {
                        forEach(this.groups, (group) => {
                            childSettings$.push(this.setChildSettings(group));
                        });
                    }
                    return forkJoin(childSettings$);
                }));
            }
            else {
                forEach(this.groups, (group) => {
                    if (!group.supportsMultiple && !group.isComponent) {
                        this.setGroupSettingValues(group, []);
                    }
                });
            }
        }
        else {
            this.groups = cloneDeep(this.groups);
            if (!this.isNew) {
                this.busy.emit(true);
                componentSettingRequest = this.rxAdminSettingsService
                    .getComponentSettings(`${this.groups[0].name}/${this.childOwnerKeyValue}`)
                    .pipe(tap((childCommonSettings) => {
                    this.groups[0].settings = childCommonSettings.values;
                    this.setGroupSettingValues(this.groups[0], this.groups[0].settings);
                }));
            }
            else {
                this.setGroupSettingValues(this.groups[0], []);
            }
        }
        componentSettingRequest === null || componentSettingRequest === void 0 ? void 0 : componentSettingRequest.pipe(defaultIfEmpty(null), tap(() => this.busy.emit(false)), catchError((err) => {
            this.busy.emit(false);
            return throwError(err);
        })).subscribe();
    }
    addNewSetting(group) {
        const currentGrid = this.getCurrentGrid(group.name);
        return this.openSettingsDetails({
            title: group.name,
            componentName: this.componentName,
            groups: [group],
            ownerKeyValue: this.ownerKeyValue,
            isChildSetting: true,
            onDialogApiReady: (dialogApi) => (this.dialogApi = dialogApi)
        })
            .then(() => {
            this.dialogApi = null;
            currentGrid.api.refresh().subscribe();
        })
            .catch(() => {
            this.dialogApi = null;
            currentGrid.api.refresh().subscribe();
        });
    }
    getCurrentGrid(groupName) {
        const groupsWithGrid = filter(this.groups, 'supportsMultiple');
        const gridIndex = findIndex(groupsWithGrid, { name: groupName });
        return this.recordGridInstances.toArray()[gridIndex];
    }
    setChildSettings(group) {
        if (group.isComponent) {
            if (group.supportsMultiple) {
                group.recordGridConfig = this.getRecordGridConfig({
                    componentName: this.componentName,
                    controls: group.controls,
                    getCurrentGridFn: this.getCurrentGrid.bind(this),
                    createPermission: this.createPermission,
                    groups: [group],
                    bladeTitle: group.name,
                    ownerKeyValue: this.ownerKeyValue,
                    groupName: group.name,
                    onDialogApiReady: (dialogApi) => (this.dialogApi = dialogApi)
                });
            }
            else {
                return this.rxAdminSettingsService
                    .getComponentSettings(`${this.componentName}/${group.name}/${this.ownerKeyValue}`)
                    .pipe(tap((childComponentSettings) => {
                    group.settings = childComponentSettings.values;
                    this.setGroupSettingValues(group, group.settings);
                }));
            }
        }
        return of(true);
    }
    onModelChange(model, group) {
        group.settingValues = Object.assign(Object.assign({}, group.settingValues), model);
    }
    setGroupSettingValues(group, componentSettings) {
        const settingValues = {};
        forEach(group.propertyConfigs, (propertyConfig) => {
            const componentSetting = find(componentSettings, { settingName: propertyConfig.name });
            if (componentSetting) {
                if (componentSetting.settingValue) {
                    switch (propertyConfig.dataType) {
                        case RX_ADMIN.settingResourceTypes.attachment: {
                            settingValues[componentSetting.settingName] = [
                                this.rxAdminFileUtilityService.convertBase64ToFile(componentSetting.settingValue, componentSetting.fileName, componentSetting.fileType)
                            ];
                            break;
                        }
                        case RX_ADMIN.settingResourceTypes.boolean: {
                            settingValues[componentSetting.settingName] = componentSetting.settingValue === 'true';
                            break;
                        }
                        case RX_ADMIN.settingResourceTypes.decimal:
                        case RX_ADMIN.settingResourceTypes.integer: {
                            settingValues[componentSetting.settingName] = Number(componentSetting.settingValue);
                            break;
                        }
                        default: {
                            settingValues[componentSetting.settingName] = componentSetting.settingValue;
                            break;
                        }
                    }
                }
                else {
                    settingValues[componentSetting.settingName] = null;
                }
            }
            else {
                settingValues[propertyConfig.name] = propertyConfig.defaultValue;
            }
        });
        group.settingValues = Object.assign({}, settingValues);
    }
    getSettingWithValue(setting, value) {
        if (Array.isArray(value)) {
            const file = value[0];
            return this.rxAdminFileUtilityService.convertFileToBase64(file).pipe(map((base64String) => {
                setting.fileName = file.name;
                setting.fileType = file.type;
                setting.settingValue = base64String;
                return setting;
            }));
        }
        else {
            setting.settingValue = value;
            return of(setting);
        }
    }
    saveSettings() {
        const saveRequests$ = [];
        if (!this.isChildSetting) {
            if (this.isNew && this.createPermission) {
                const generalGroups = this.groups.filter((group) => !group.isComponent);
                let settings$ = [];
                forEach(generalGroups, (group) => {
                    settings$ = settings$.concat(_map(group.settingValues, (settingValue, settingName) => {
                        const propertyConfig = find(group.propertyConfigs, { name: settingName });
                        if (!isNull(settingValue) && propertyConfig && !propertyConfig.isDisabled) {
                            const setting = {
                                componentName: this.componentName,
                                settingName,
                                assigneeGroupPermission: this.assigneeGroup
                            };
                            return this.getSettingWithValue(setting, settingValue);
                        }
                        else {
                            return null;
                        }
                    }).filter(Boolean));
                });
                if (settings$.length) {
                    saveRequests$.push(forkJoin(settings$).pipe(switchMap((settings) => this.rxAdminSettingsService.createComponentSettings(this.componentName, settings)), switchMap((ownerKeyValue) => {
                        const requests$ = [];
                        this.ownerKeyValue = ownerKeyValue;
                        forEach(this.groups, (group) => {
                            requests$.push(this.setChildSettings(group));
                        });
                        requests$.push(this.rxAdminSettingsService.getComponentSettings(`${this.componentName}/${ownerKeyValue}`).pipe(tap((adminComponentSettings) => {
                            this.generalSettings = adminComponentSettings.values;
                        })));
                        return forkJoin(requests$).pipe(tap(() => {
                            this.isNew = false;
                        }));
                    })));
                }
            }
            else {
                const generalGroups = this.groups.filter((group) => !group.isComponent);
                const childGroups = this.groups.filter((group) => group.isComponent);
                let generalSettings$ = [];
                forEach(generalGroups, (group) => {
                    generalSettings$ = generalSettings$.concat(_map(group.settingValues, (settingValue, settingName) => {
                        const propertyConfig = find(group.propertyConfigs, { name: settingName });
                        if (propertyConfig && !propertyConfig.isDisabled) {
                            const setting = find(this.generalSettings, { settingName });
                            setting.assigneeGroupPermission = this.assigneeGroup;
                            return this.getSettingWithValue(setting, settingValue);
                        }
                        else {
                            return null;
                        }
                    }).filter(Boolean));
                });
                if (generalSettings$.length) {
                    saveRequests$.push(forkJoin(generalSettings$).pipe(switchMap((generalSettings) => this.rxAdminSettingsService.updateComponentSettings(`${this.componentName}/${this.ownerKeyValue}`, generalSettings))));
                }
                let childSettings$ = [];
                forEach(childGroups, (group) => {
                    if (!group.supportsMultiple) {
                        if (group.settings && group.settings.length) {
                            childSettings$ = childSettings$.concat(_map(group.settingValues, (settingValue, settingName) => {
                                const propertyConfig = find(group.propertyConfigs, { name: settingName });
                                if (propertyConfig && !propertyConfig.isDisabled) {
                                    const setting = find(group.settings, { settingName });
                                    setting.assigneeGroupPermission = this.assigneeGroup;
                                    return this.getSettingWithValue(setting, settingValue);
                                }
                                else {
                                    return null;
                                }
                            }).filter(Boolean));
                            saveRequests$.push(forkJoin(childSettings$).pipe(switchMap((childSettings) => this.rxAdminSettingsService.updateComponentSettings(`${group.name}/${last(group.settings).ownerKeyValue1}`, childSettings))));
                        }
                        else {
                            childSettings$ = childSettings$.concat(_map(group.settingValues, (settingValue, settingName) => {
                                const propertyConfig = find(group.propertyConfigs, { name: settingName });
                                if (!isNull(settingValue) && propertyConfig && !propertyConfig.isDisabled) {
                                    const childSetting = {
                                        componentName: group.name,
                                        parentComponentName: this.componentName,
                                        settingName,
                                        ownerKeyValue2: this.ownerKeyValue,
                                        assigneeGroupPermission: this.assigneeGroup
                                    };
                                    return this.getSettingWithValue(childSetting, settingValue);
                                }
                                else {
                                    return null;
                                }
                            }).filter(Boolean));
                            if (childSettings$.length) {
                                saveRequests$.push(forkJoin(childSettings$).pipe(switchMap((childSettings) => this.rxAdminSettingsService.createComponentSettings(`${group.name}/${this.ownerKeyValue}`, childSettings)), switchMap(() => this.setChildSettings(group))));
                            }
                        }
                    }
                });
            }
        }
        else {
            const childGroup = this.groups[0];
            let childSettings$ = [];
            if (childGroup.settings && childGroup.settings.length) {
                childSettings$ = childSettings$.concat(_map(childGroup.settingValues, (settingValue, settingName) => {
                    const propertyConfig = find(childGroup.propertyConfigs, {
                        name: settingName
                    });
                    if (propertyConfig && !propertyConfig.isDisabled) {
                        const setting = find(childGroup.settings, { settingName });
                        setting.assigneeGroupPermission = this.assigneeGroup;
                        return this.getSettingWithValue(setting, settingValue);
                    }
                    else {
                        return null;
                    }
                }));
                if (childSettings$.length) {
                    saveRequests$.push(forkJoin(childSettings$).pipe(switchMap((childSettings) => this.rxAdminSettingsService.updateComponentSettings(`${childGroup.name}/${this.childOwnerKeyValue}`, childSettings))));
                }
            }
            else {
                childSettings$ = childSettings$.concat(_map(childGroup.settingValues, (settingValue, settingName) => {
                    const propertyConfig = find(childGroup.propertyConfigs, { name: settingName });
                    if (!isNull(settingValue) && propertyConfig && !propertyConfig.isDisabled) {
                        const setting = {
                            componentName: childGroup.name,
                            parentComponentName: this.componentName,
                            ownerKeyValue2: this.ownerKeyValue,
                            settingName,
                            assigneeGroupPermission: this.assigneeGroup
                        };
                        return this.getSettingWithValue(setting, settingValue);
                    }
                    else {
                        return null;
                    }
                }).filter(Boolean));
                if (childSettings$.length) {
                    saveRequests$.push(forkJoin(childSettings$).pipe(switchMap((childSettings) => this.rxAdminSettingsService.createComponentSettings(`${childGroup.name}/${this.ownerKeyValue}`, childSettings))));
                }
            }
        }
        if (saveRequests$.length) {
            this.busy.emit(true);
            forkJoin(saveRequests$)
                .pipe(catchError((err) => {
                this.busy.emit(false);
                return throwError(err);
            }))
                .subscribe(() => {
                this.rxNotificationService.addSuccessMessage('Settings saved successfully.');
                this.forms.forEach((form) => form.formGroup.markAsPristine());
                this.busy.emit(false);
                this.save.emit();
            });
        }
    }
    isAbleToSave() {
        return (this.forms &&
            every(this.forms.toArray(), (form) => form.formGroup.valid) &&
            this.forms.some((form) => form.formGroup.dirty));
    }
    resetSettings() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.admin.reset-confirmation.message')
        })
            .then((response) => {
            if (response) {
                chain(this.groups)
                    .reject((group) => isEmpty(group.settingValues))
                    .forEach((group) => {
                    const settingValues = cloneDeep(group.settingValues);
                    forEach(group.propertyConfigs, (propertyConfig) => {
                        if (propertyConfig.dataType === RX_ADMIN.settingResourceTypes.attachment) {
                            settingValues[propertyConfig.name] = propertyConfig.defaultValue
                                ? [
                                    this.rxAdminFileUtilityService.convertBase64ToFile(propertyConfig.defaultValue, RX_ADMIN.defaultImages[propertyConfig.name].name, RX_ADMIN.defaultImages[propertyConfig.name].type)
                                ]
                                : null;
                        }
                        else {
                            settingValues[propertyConfig.name] = propertyConfig.defaultValue;
                        }
                    });
                    group.settingValues = settingValues;
                })
                    .value();
                this.forms.forEach((form) => form.formGroup.markAsDirty());
            }
        });
    }
    onCancel() {
        this.closeEditor.emit();
    }
    canClose() {
        var _a, _b;
        return !(((_a = this.dialogApi) === null || _a === void 0 ? void 0 : _a.isDirty()) || ((_b = this.forms) === null || _b === void 0 ? void 0 : _b.some((form) => form.formGroup.dirty)));
    }
}
AdminCommonSettingsEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminCommonSettingsEditorComponent, deps: [{ token: i1.RxAdminSettingsService }, { token: i2.RxAdminFileUtilityService }, { token: i1.RxNotificationService }, { token: i3.RxModalService }, { token: i4.TranslateService }, { token: i5.AdaptDockedPanelComponent, optional: true }], target: i0.ɵɵFactoryTarget.Component });
AdminCommonSettingsEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AdminCommonSettingsEditorComponent, selector: "rx-admin-common-settings-editor", inputs: { componentName: "componentName", ownerKeyValue: "ownerKeyValue", groups: "groups", createPermission: "createPermission", isNew: "isNew", isChildSetting: "isChildSetting", childOwnerKeyValue: "childOwnerKeyValue", getRecordGridConfig: "getRecordGridConfig", openSettingsDetails: "openSettingsDetails" }, outputs: { closeEditor: "closeEditor", busy: "busy", save: "save" }, host: { properties: { "class": "this.class" } }, viewQueries: [{ propertyName: "recordGridInstances", predicate: RecordGridComponent, descendants: true }, { propertyName: "forms", predicate: FormBuilderComponent, descendants: true }], ngImport: i0, template: "<adapt-accordion [multiselect]=\"true\" [class.dp-body]=\"isInDockedPanel\">\n  <adapt-accordion-tab\n    *ngFor=\"let commonSettingsGroup of groups; let $index = index\"\n    [isOpen]=\"$index === 0\"\n    [title]=\"commonSettingsGroup.name\"\n    [disabled]=\"isNew && commonSettingsGroup.isComponent && !isChildSetting\"\n  >\n    <div class=\"property-controls\" *ngIf=\"!commonSettingsGroup.supportsMultiple || isChildSetting\">\n      <rx-form-builder\n        [config]=\"[{ controls: commonSettingsGroup.propertyConfigs }]\"\n        (modelChange)=\"onModelChange($event, commonSettingsGroup)\"\n        [model]=\"commonSettingsGroup.settingValues\"\n        *ngIf=\"commonSettingsGroup.settingValues\"\n      ></rx-form-builder>\n    </div>\n\n    <div *ngIf=\"commonSettingsGroup.supportsMultiple && commonSettingsGroup.recordGridConfig && !isChildSetting\">\n      <button\n        *ngIf=\"createPermission\"\n        adapt-button\n        type=\"button\"\n        class=\"px-0\"\n        btn-type=\"tertiary\"\n        (click)=\"addNewSetting(commonSettingsGroup)\"\n      >\n        <span class=\"d-icon-plus_circle\"></span>\n        {{ 'com.bmc.arsys.rx.client.admin.add-new-setting.label' | translate }}\n      </button>\n      <rx-record-grid [config]=\"commonSettingsGroup.recordGridConfig\"></rx-record-grid>\n    </div>\n  </adapt-accordion-tab>\n</adapt-accordion>\n\n<div\n  [ngClass]=\"{\n    'justify-content-start': !isInDockedPanel,\n    'justify-content-end': isInDockedPanel,\n    'dp-footer': isInDockedPanel\n  }\"\n  class=\"pt-3\"\n>\n  <button\n    adapt-button\n    *ngIf=\"isSettingsActionsAvailable && createPermission\"\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    type=\"button\"\n    [disabled]=\"!isAbleToSave()\"\n    (click)=\"saveSettings()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    *ngIf=\"isSettingsActionsAvailable && createPermission\"\n    btn-type=\"secondary\"\n    type=\"button\"\n    (click)=\"resetSettings()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.admin.reset.label' | translate }}\n  </button>\n\n  <button adapt-button class=\"ml-2\" btn-type=\"secondary\" type=\"button\" *ngIf=\"isInDockedPanel\" (click)=\"onCancel()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [".property-controls{max-width:400px}\n"], components: [{ type: i5.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i5.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i6.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i7.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminCommonSettingsEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-common-settings-editor',
                    templateUrl: './admin-common-settings-editor.component.html',
                    styleUrls: ['./admin-common-settings-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxAdminSettingsService }, { type: i2.RxAdminFileUtilityService }, { type: i1.RxNotificationService }, { type: i3.RxModalService }, { type: i4.TranslateService }, { type: i5.AdaptDockedPanelComponent, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { componentName: [{
                type: Input
            }], ownerKeyValue: [{
                type: Input
            }], groups: [{
                type: Input
            }], createPermission: [{
                type: Input
            }], isNew: [{
                type: Input
            }], isChildSetting: [{
                type: Input
            }], childOwnerKeyValue: [{
                type: Input
            }], getRecordGridConfig: [{
                type: Input
            }], openSettingsDetails: [{
                type: Input
            }], closeEditor: [{
                type: Output
            }], busy: [{
                type: Output
            }], save: [{
                type: Output
            }], recordGridInstances: [{
                type: ViewChildren,
                args: [RecordGridComponent]
            }], forms: [{
                type: ViewChildren,
                args: [FormBuilderComponent]
            }], class: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=admin-common-settings-editor.component.js.map