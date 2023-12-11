import { IViewComponentDesignData } from '@helix/platform/view/designer';
export interface IShellProperties {
    allowAppSwitching: boolean;
    globalSearchDisabled: boolean;
    globalSearchUseDefault: boolean;
    globalSearchCustomSearchState: string;
    globalSearchRecords: IShellGlobalSearchRecord[];
}
export interface IShellDesignProperties extends IShellProperties {
    globalSearchEnabled?: boolean;
}
export interface IShellGlobalSearchRecord {
    name: string;
    definitionName: string;
    view: string;
}
export interface IShellMenuItem extends IViewComponentDesignData<IShellMenuItemData> {
}
export interface IShellMenuItemData {
    actionName?: string;
    menuItemName?: string;
    name?: string;
    viewDefinitionName?: string;
    launchBehavior?: string;
    url?: string;
    menuGroupName?: string;
}
