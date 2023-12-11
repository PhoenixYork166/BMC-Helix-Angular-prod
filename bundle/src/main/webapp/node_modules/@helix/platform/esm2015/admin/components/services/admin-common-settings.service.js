import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { RxAdminSettingsService, RxNotificationService } from '@helix/platform/shared/api';
import { AttachmentFormControlComponent, BooleanFormControlComponent, ColorPickerFormControlComponent, CounterFormControlComponent, DateFormControlComponent, SelectFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RxNumberUtilsService } from '@helix/platform/utils';
import { RecordGridColumnAlignment, RowSelectionMode } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, noop, map as _map } from 'lodash';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AdminCommonSettingsBladeComponent } from '../admin-common-settings-blade/admin-common-settings-blade.component';
import { RX_ADMIN } from '../admin.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@helix/platform/utils";
export class RxAdminCommonSettingsService {
    constructor(rxAdminSettingsService, translateService, rxNotificationService, rxModalService, rxNumberUtilsService) {
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.rxModalService = rxModalService;
        this.rxNumberUtilsService = rxNumberUtilsService;
    }
    openSettingsDetails({ title, componentName, groups, ownerKeyValue, isChildSetting, childOwnerKeyValue, onDialogApiReady }) {
        const isNew = isChildSetting ? !(ownerKeyValue && childOwnerKeyValue) : !ownerKeyValue;
        return this.rxModalService.openDockedPanel({
            content: AdminCommonSettingsBladeComponent,
            size: 'lg',
            title,
            data: {
                config: {
                    componentName,
                    groups,
                    ownerKeyValue,
                    isNew,
                    isChildSetting,
                    childOwnerKeyValue
                },
                onApiReady: (dialogApi) => {
                    onDialogApiReady === null || onDialogApiReady === void 0 ? void 0 : onDialogApiReady(dialogApi);
                }
            }
        });
    }
    createPropertyConfig(adminComponentControl) {
        const config = {
            name: adminComponentControl.id,
            isDisabled: !adminComponentControl.changePermission,
            dataType: adminComponentControl.dataType,
            options: {
                label: adminComponentControl.label,
                required: adminComponentControl.required
            },
            validators: []
        };
        if (adminComponentControl.required) {
            config.validators.push(Validators.required);
        }
        if (adminComponentControl.defaultValue) {
            config.defaultValue = adminComponentControl.defaultValue;
        }
        else {
            config.defaultValue = null;
        }
        switch (adminComponentControl.dataType) {
            case RX_ADMIN.settingResourceTypes.selection: {
                config.component = SelectFormControlComponent;
                config.options = Object.assign(Object.assign({}, config.options), { options: _map(adminComponentControl.optionNamesById, (value, key) => ({
                        id: key,
                        name: value
                    })), emptyOption: !adminComponentControl.required });
                break;
            }
            case RX_ADMIN.settingResourceTypes.secure:
            case RX_ADMIN.settingResourceTypes.character: {
                config.component = TextFormControlComponent;
                config.options.isPassword = adminComponentControl.dataType === RX_ADMIN.settingResourceTypes.secure;
                if (adminComponentControl.maxValue) {
                    config.options.maxLength = Number(adminComponentControl.maxValue);
                    config.validators.push(Validators.maxLength(config.options.maxLength));
                }
                if (adminComponentControl.minValue) {
                    config.options.minLength = Number(adminComponentControl.minValue);
                    config.validators.push(Validators.minLength(config.options.minLength));
                }
                break;
            }
            case RX_ADMIN.settingResourceTypes.boolean: {
                config.component = BooleanFormControlComponent;
                config.options.label = '';
                config.options.description = adminComponentControl.label;
                config.options.shouldDisplayAsCheckbox = config.options.required;
                if (config.defaultValue) {
                    config.defaultValue = config.defaultValue === 'true';
                }
                else if (config.options.required) {
                    config.defaultValue = false;
                }
                break;
            }
            case RX_ADMIN.settingResourceTypes.color: {
                config.component = ColorPickerFormControlComponent;
                config.defaultValue = config.defaultValue || null;
                break;
            }
            case RX_ADMIN.settingResourceTypes.decimal:
            case RX_ADMIN.settingResourceTypes.integer: {
                config.component = CounterFormControlComponent;
                config.options.allowIntegerOnly = adminComponentControl.dataType === RX_ADMIN.settingResourceTypes.integer;
                if (adminComponentControl.maxValue) {
                    config.options.maxValue = Number(adminComponentControl.maxValue);
                    config.validators.push(Validators.max(Number(adminComponentControl.maxValue)));
                }
                if (adminComponentControl.minValue) {
                    config.options.minValue = Number(adminComponentControl.minValue);
                    config.validators.push(Validators.min(Number(adminComponentControl.minValue)));
                }
                if (this.rxNumberUtilsService.isFiniteNumberString(adminComponentControl.defaultValue)) {
                    config.defaultValue = Number(adminComponentControl.defaultValue);
                }
                break;
            }
            case RX_ADMIN.settingResourceTypes.dateOnly: {
                config.component = DateFormControlComponent;
                break;
            }
            case RX_ADMIN.settingResourceTypes.attachment: {
                config.component = AttachmentFormControlComponent;
                config.options.maxFileSize = adminComponentControl.maxValue;
                break;
            }
            default: {
                config.component = TextFormControlComponent;
                break;
            }
        }
        return config;
    }
    getRecordGridConfig({ componentName, controls, getCurrentGridFn, createPermission, groups, bladeTitle, ownerKeyValue, groupName, onDialogApiReady }) {
        const subUrl = ownerKeyValue ? `${groupName}/${ownerKeyValue}` : componentName;
        const fieldDefinitions = controls.map((control) => {
            const fieldDefinition = {
                id: control.id,
                resourceType: control.dataType
            };
            if (control.dataType === RX_ADMIN.settingResourceTypes.selection &&
                control.optionNamesById &&
                control.optionLabelsById) {
                fieldDefinition.optionNamesById = control.optionNamesById;
                fieldDefinition.optionLabelsById = control.optionLabelsById;
            }
            return fieldDefinition;
        });
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = cloneDeep(fieldDefinition);
            return result;
        }, {});
        const recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
        const columns = controls.map((control, index) => ({
            index,
            title: control.label,
            fieldId: control.id,
            visible: control.keySetting,
            sortable: true,
            filterable: false,
            alignment: RecordGridColumnAlignment.Left
        }));
        const actionButtons = [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.edit.label'),
                style: 'tertiary',
                iconCls: 'pencil',
                actions: [
                    {
                        name: () => {
                            const currentGrid = getCurrentGridFn(groupName);
                            const selectedRow = currentGrid.api.getFirstSelectedRow();
                            if (createPermission) {
                                const componentOwnerKeyValue = ownerKeyValue || selectedRow.ownerKeyValue1;
                                const childOwnerKeyValue = ownerKeyValue ? selectedRow.ownerKeyValue1 : null;
                                this.openSettingsDetails({
                                    title: bladeTitle || groupName,
                                    componentName,
                                    groups,
                                    ownerKeyValue: componentOwnerKeyValue,
                                    isChildSetting: Boolean(groupName),
                                    childOwnerKeyValue,
                                    onDialogApiReady
                                })
                                    .then(() => {
                                    currentGrid.api.refresh().subscribe();
                                })
                                    .catch(noop);
                            }
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                style: 'tertiary',
                icon: 'trash',
                actions: [
                    {
                        name: () => {
                            const currentGrid = getCurrentGridFn(groupName);
                            const selectedRow = currentGrid.api.getFirstSelectedRow();
                            if (createPermission) {
                                this.rxModalService
                                    .confirm({
                                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                                    modalStyle: RX_MODAL.modalStyles.warning,
                                    message: this.translateService.instant('com.bmc.arsys.rx.client.admin.admin-settings.delete-confirmation.message')
                                })
                                    .then((response) => {
                                    if (response) {
                                        this.rxAdminSettingsService
                                            .deleteComponentSettings(`${groupName || componentName}/${selectedRow.ownerKeyValue1}`)
                                            .pipe(switchMap(() => currentGrid.api.refresh()))
                                            .subscribe();
                                    }
                                });
                            }
                        }
                    }
                ]
            }
        ];
        return of({
            actionButtons: createPermission ? actionButtons : [],
            enableRowSelection: RowSelectionMode.Single,
            getRecordDefinition: () => of(recordDefinition),
            getData: () => this.rxAdminSettingsService.getComponentGridData(subUrl).pipe(map((data) => ({
                data: data.rows,
                totalSize: data.rows.length
            }))),
            columns,
            enableFiltering: false,
            useExternalFiltering: false,
            recordIdField: 'ownerKeyValue1'
        });
    }
}
RxAdminCommonSettingsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminCommonSettingsService, deps: [{ token: i1.RxAdminSettingsService }, { token: i2.TranslateService }, { token: i1.RxNotificationService }, { token: i3.RxModalService }, { token: i4.RxNumberUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAdminCommonSettingsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminCommonSettingsService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminCommonSettingsService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxAdminSettingsService }, { type: i2.TranslateService }, { type: i1.RxNotificationService }, { type: i3.RxModalService }, { type: i4.RxNumberUtilsService }]; } });
//# sourceMappingURL=admin-common-settings.service.js.map