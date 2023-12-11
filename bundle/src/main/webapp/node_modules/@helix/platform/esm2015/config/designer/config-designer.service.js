import { Injectable } from '@angular/core';
import { ImpactRowVisibility } from '@helix/platform/config/api';
import { RX_CONFIG_DESIGNER } from './config-designer.constant';
import { isNil } from 'lodash';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
export class ConfigDesignerService {
    getDefinitionFromDefinitionModel(model) {
        return {
            componentName: model.componentName,
            showInLocation: model.isSettingAccessibleInApplication && model.isSettingAccessibleInInnovationStudio
                ? RX_CONFIG_DESIGNER.settingAccessOptions.both.value
                : model.isSettingAccessibleInApplication
                    ? RX_CONFIG_DESIGNER.settingAccessOptions.application.value
                    : model.isSettingAccessibleInInnovationStudio
                        ? RX_CONFIG_DESIGNER.settingAccessOptions.innovationStudio.value
                        : RX_CONFIG_DESIGNER.settingAccessOptions.none.value,
            supportsMultiple: model.supportsMultiple,
            parentComponentName: model.parentComponentName,
            impactRowVisibility: isNil(model.parentComponentName) && model.supportsMultiple
                ? model.impactRowVisibility
                : ImpactRowVisibility.None,
            permissions: model.permissions,
            registeredModuleName: model.registeredModuleName,
            viewComponent: model.viewComponent,
            externalLink: model.externalLink,
            viewToOpen: model.viewToOpen,
            localeList: [
                {
                    componentLabel: model.componentLabel,
                    firstMenu: isNil(model.parentComponentName) &&
                        (model.isSettingAccessibleInApplication || model.isSettingAccessibleInInnovationStudio)
                        ? model.firstMenu
                        : null,
                    secondMenu: isNil(model.parentComponentName) &&
                        (model.isSettingAccessibleInApplication || model.isSettingAccessibleInInnovationStudio)
                        ? model.secondMenu
                        : null,
                    locale: 'en-US'
                }
            ],
            settingMetaData: model.fields.map((field) => {
                var _a, _b;
                return ({
                    dataType: field.dataType,
                    defaultValue: field.dataType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                        ? field.selectionFieldOptionProperties.defaultValue
                        : field.defaultValue,
                    minValue: field.minValue,
                    maxValue: field.maxValue,
                    fieldOrder: field.fieldOrder,
                    id: field.id,
                    keySetting: field.keySetting,
                    required: field.required,
                    optionNamesById: (_a = field.selectionFieldOptionProperties) === null || _a === void 0 ? void 0 : _a.optionNamesById,
                    optionLabelsById: (_b = field.selectionFieldOptionProperties) === null || _b === void 0 ? void 0 : _b.optionLabelsById,
                    localeList: [
                        Object.assign(Object.assign({}, field.localeList[0]), { settingLabel: field.settingLabel })
                    ]
                });
            })
        };
    }
}
ConfigDesignerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfigDesignerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=config-designer.service.js.map