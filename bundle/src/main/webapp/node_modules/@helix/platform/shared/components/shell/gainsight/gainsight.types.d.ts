import { IPlainObject } from '@helix/platform/shared/api';
export declare enum RxApplicationContext {
    Runtime = "runtime",
    Designtime = "designtime"
}
export interface IGainsightSettings {
    enableGainsight: boolean;
    loadGainsightFromBmcIt: boolean;
    useAdaptRadar: boolean;
    deploymentType: string;
    environmentType: string;
}
export interface IViewGlobalContextMapping {
    viewName: string;
    globalContext: IPlainObject;
    default: boolean;
}
export interface IGainsightConfiguration {
    company: string;
    companyId: string;
    hashedUserId: string;
    displayBanner: boolean;
    productTag: string;
    settings: IGainsightSettings;
    viewMapping: IViewGlobalContextMapping[];
}
export interface IGainsightUserPreferences {
    trackUsage: boolean;
    productUpdates: boolean;
    guidedTours: boolean;
    surveys: boolean;
    onboardingBot: boolean;
}
