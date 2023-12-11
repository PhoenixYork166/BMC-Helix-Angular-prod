import { TemplateRef } from '@angular/core';
export interface IRxShellUpgradeTrackerAction {
    name: string;
    action: IRxShellDefaultActionFunction;
    hide: boolean;
    className: string;
}
export interface IRxShellShowUserMessagesAction {
    name: string;
    action: IRxShellDefaultActionFunction;
    count: number;
    className: string;
    popover: TemplateRef<any>;
}
declare type IRxShellDefaultActionFunction = () => void;
export interface IRxShellApplication {
    containsJavaScript?: boolean;
    hasCustomEntryPoint?: boolean;
    friendlyName: string;
    id: string;
    icon?: string;
}
export {};
