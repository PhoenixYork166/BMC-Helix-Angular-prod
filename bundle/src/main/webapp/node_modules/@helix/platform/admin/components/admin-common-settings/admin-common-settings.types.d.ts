import { IAdminComponentControl, IAdminComponentSetting, IPlainObject } from '@helix/platform/shared/api';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { Observable } from 'rxjs';
export interface ICommonSettingsState {
    headerLabel: string;
    supportsMultiple: boolean;
    componentName: string;
    commonSettingGroups: ICommonSettingsGroup[];
    recordGridConfig?: Observable<IRecordGridConfig>;
    createPermission: boolean;
}
export interface ICommonSettingsGroup {
    name: string;
    propertyConfigs: IPlainObject[];
    recordGridConfig?: Observable<IRecordGridConfig>;
    isComponent: boolean;
    controls?: IAdminComponentControl[];
    supportsMultiple: boolean;
    settingValues: IPlainObject;
    settings: IAdminComponentSetting[];
}
export interface INewSetting {
    group: ICommonSettingsGroup;
    componentName: string;
    ownerKeyValue: string;
    isChildSetting: boolean;
    grid: RecordGridComponent;
}
export interface IGetRecordGridConfig {
    componentName: string;
    controls: IAdminComponentControl[];
    getCurrentGridFn: (groupName?: string) => RecordGridComponent;
    createPermission: boolean;
    groups: ICommonSettingsGroup[];
    bladeTitle?: string;
    ownerKeyValue?: string;
    groupName?: string;
}
