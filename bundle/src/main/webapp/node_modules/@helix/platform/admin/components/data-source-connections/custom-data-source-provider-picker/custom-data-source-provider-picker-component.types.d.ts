export interface IBundleProviders {
    label: string;
    isExpanded?: boolean;
    providers: string[];
}
export declare type ProvidersTree = IBundleProviders[];
export interface ICustomDataSourceProviderPickerComponentOptions {
    label: string;
    required: boolean;
    providersTree: ProvidersTree;
}
