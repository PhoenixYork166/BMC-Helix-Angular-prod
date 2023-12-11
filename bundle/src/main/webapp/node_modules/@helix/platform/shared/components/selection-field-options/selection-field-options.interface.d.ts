export interface ISelectionOption {
    name: string;
    id: number;
    isOpen?: boolean;
    stringKey?: string;
    invalidNameError?: string;
    invalidIdError?: string;
}
export interface ISelectionFieldOptionProperties {
    defaultValue: number;
    optionNamesById: {
        [id: number]: string;
    };
    optionLabelsById: {
        [id: number]: string;
    };
    isReadOnly?: boolean;
    hideDefaultValue?: boolean;
}
