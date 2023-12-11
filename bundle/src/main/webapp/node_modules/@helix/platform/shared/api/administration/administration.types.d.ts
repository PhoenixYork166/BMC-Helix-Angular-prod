import { IPlainObject } from '../common-types';
import { KeyValueObject } from '@bmc-ux/adapt-angular/common/common.models';
import { IPermissionOwnerId } from '../permission';
export interface IAdminComponentSetting {
    assigneeGroupPermission: string;
    componentName: string;
    ownerKeyValue1: string;
    ownerKeyValue2?: string;
    settingId: string;
    settingName: string;
    settingValue: string | number;
    fileName?: string;
    fileType?: string;
    parentComponentName?: string;
}
export interface IAdminComponentSettings {
    values: IAdminComponentSetting[];
}
export interface IAdminComponentGridData {
    header: {
        id: string;
        label: string;
        keySetting: boolean;
    }[];
    rows: IPlainObject[];
}
export interface IAdminNavigationMenuItem {
    compName: string;
    label: string;
    viewComponent: boolean;
    defaultBundleScope?: string;
    guid?: string;
    isCustom?: boolean;
    linkType?: string;
    registeredModuleName?: string;
    externalLink?: string;
    items?: IAdminNavigationMenuItem[];
}
export interface IAdminComponentDefinition {
    compName: string;
    createPermission: boolean;
    header: string;
    impactRowVisibility: boolean;
    supportsMultiple: boolean;
    groups: IAdminComponentControlGroup[];
}
export interface IAdminComponentControlGroup {
    component: boolean;
    label: boolean;
    name: string;
    supportsMultiple: boolean;
    controls: IAdminComponentControl[];
}
export interface IAdminComponentControl {
    id: string;
    changePermission: boolean;
    dataType: string;
    defaultValue: any;
    fieldOrder: number;
    keySetting: boolean;
    label: string;
    required: boolean;
    options?: string[];
    optionNamesById?: {
        [key: string]: string;
    };
    optionLabelsById?: {
        [key: string]: string;
    };
    maxValue?: string;
    minValue?: string;
}
export interface ISystemConfiguration {
    id: string;
    name: string;
    value: SystemConfigurationValue;
}
export declare type SystemConfigurationValue = string | number;
export interface IAdminSettingPermission {
    type: 'VIEW' | 'CHANGE';
    ownerId: IPermissionOwnerId;
}
export interface IAdminSetting {
    componentName: string;
    localeList: KeyValueObject[];
    showInLocation: string;
    supportsMultiple: boolean;
    viewComponent: boolean;
    viewToOpen: string;
    linkType: string;
    permissions: IAdminSettingPermission[];
    externalLink?: string;
    registeredModuleName?: string;
    parentComponentName?: string;
    settingMetaData?: KeyValueObject[];
}
export interface IAdminComponent {
    component: string;
    status: string;
    uiLocation: string;
    showInLocation: string;
    custom: string;
    parentComponent?: string;
}
export interface SystemConfigurationValuesById {
    [id: string]: SystemConfigurationValue;
}
