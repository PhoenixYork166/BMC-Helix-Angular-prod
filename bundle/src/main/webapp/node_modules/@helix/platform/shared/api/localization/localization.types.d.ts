import { InjectionToken } from '@angular/core';
export declare const RX_DEFAULT_STRINGS: InjectionToken<unknown>;
export interface ILocalizedStringsForLoginPageResponse {
    [locale: string]: {
        [key: string]: string;
    };
}
export interface ILocalizedStrings {
    [key: string]: string;
}
export interface ILocaleInfo {
    moment?: string;
    angular?: string;
    adapt?: string;
    similar?: string[];
}
