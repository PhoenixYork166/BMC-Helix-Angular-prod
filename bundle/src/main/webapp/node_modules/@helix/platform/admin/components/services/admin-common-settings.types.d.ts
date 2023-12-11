import { IAdminComponentControl } from '@helix/platform/shared/api';
import { IDialogApi } from '@helix/platform/ui-kit';
import { RecordGridComponent } from '@helix/platform/view/components';
import { ICommonSettingsGroup } from '../admin-common-settings/admin-common-settings.types';
export interface IGetRecordGridConfigParams {
    componentName: string;
    controls: IAdminComponentControl[];
    getCurrentGridFn: (groupName?: string) => RecordGridComponent;
    createPermission: boolean;
    groups: ICommonSettingsGroup[];
    bladeTitle?: string;
    ownerKeyValue?: string;
    groupName?: string;
    onDialogApiReady?: (dialogApi: IDialogApi) => void;
}
export interface IOpenSettingsDetailsParams {
    title: string;
    componentName: string;
    groups: ICommonSettingsGroup[];
    ownerKeyValue?: string;
    isChildSetting?: boolean;
    childOwnerKeyValue?: string;
    onDialogApiReady?: (dialogApi: IDialogApi) => void;
}
