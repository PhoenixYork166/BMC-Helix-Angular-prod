import { IPlainObject } from '@helix/platform/shared/api';
export interface IRxShellConfig {
    flattenedMenuItems: IRxShellMenuItem[];
    navigationBarItems: IRxShellMenuItem[];
    navigationActions?: IRxShellMenuItem[];
    userMenu: IRxShellMenuItem;
    allowAppSwitching: boolean;
    globalSearchDisabled: boolean;
    administrationSettingsState: string;
    globalSearchState: string;
    globalSearchCustomSearchState: string;
    globalSearchRecords: {
        definitionName: string;
        name: string;
        view: string;
        selected?: boolean;
    }[];
}
export interface IRxShellMenuItemsDefinition {
    componentDefinitionId: string;
}
export interface IRxShellMenuProperties {
    actionName: string;
    menuItemIcon: string;
    menuItemName: string;
    viewDefinitionName: string;
    url: string;
    viewParams: string[];
    hidden: string;
    styles: string;
    state: string;
    launchBehavior: string;
}
export interface IRxShellMenuItem {
    className?: string;
    closeOnClick?: boolean;
    viewUrl?: string;
    stateParameters?: {
        state: string;
    };
    name: string;
    listClassName?: string;
    route?: string;
    id: number;
    subMenu?: IRxShellMenuItem[];
    disabled?: boolean;
    link?: string;
    action?: IRxShellActionFunction;
    active?: boolean;
    hide?: boolean;
    type?: string;
    target?: string;
    openViewParams?: IPlainObject;
}
export interface IRxShellNavBarProperties extends IPlainObject {
    allowAppSwitching: string;
    globalSearchUseDefault: string;
    globalSearchDisabled: string;
    globalSearchRecords: string;
    globalSearchCustomSearchState: string;
}
export interface IRxShellMenuViewParameters {
    viewDefinitionName: string;
    viewParams: string[];
}
declare type IRxShellActionFunction = (source?: string, viewParameters?: IRxShellMenuViewParameters) => void;
export {};
