import { IAdminSettingPermission } from '@helix/platform/shared/api';
import { ISelectionFieldOptionProperties } from '@helix/platform/shared/components';
export declare enum ShowInLocationOptions {
    Application = "Application",
    InnovationStudio = "InnovationStudio",
    Both = "Both",
    None = "None"
}
export interface IConfigLocaleList {
    componentLabel: string;
    firstMenu: string;
    secondMenu: string;
    locale: string;
}
export interface IConfigLocale {
    locale: string;
    fieldGrouping: string;
    settingLabel: string;
}
export interface IFieldOptions {
    isNew: boolean;
    selectionFieldOptionProperties?: ISelectionFieldOptionProperties;
}
export declare enum ImpactRowVisibility {
    User = "User",
    None = "None"
}
export interface IConfigFieldDefinitionGridRow {
    guid: string;
    id: string;
    keySetting: string;
    dataType: string;
    required: string;
    defaultValue: string | number;
    fieldGrouping: string;
}
export interface IConfigFieldDefinition {
    dataType: string;
    defaultValue: string | number;
    fieldOrder: number;
    id: string;
    keySetting: boolean;
    localeList: IConfigLocale[];
    maxValue?: number;
    minValue?: number;
    optionLabelsById?: {
        [id: number]: string;
    };
    optionNamesById?: {
        [id: number]: string;
    };
    required: boolean;
}
export interface IConfigDefinition {
    componentName: string;
    parentComponentName: string;
    permissions: IAdminSettingPermission[];
    impactRowVisibility: ImpactRowVisibility;
    showInLocation: string;
    supportsMultiple: boolean;
    settingMetaData: IConfigFieldDefinition[];
    externalLink: string;
    registeredModuleName: string;
    viewComponent: boolean;
    viewToOpen: string;
    localeList: IConfigLocaleList[];
}
