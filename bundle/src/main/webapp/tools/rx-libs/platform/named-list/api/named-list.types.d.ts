export interface INamedListOptionPage {
    options: INamedListOption[];
    totalSize: number;
}
export interface INamedListOption {
    displayValue: string;
    value: string;
    title: string;
    contextualFields: string[];
}
export declare type NamedListTypeAheadOption = string | INamedListOption;
