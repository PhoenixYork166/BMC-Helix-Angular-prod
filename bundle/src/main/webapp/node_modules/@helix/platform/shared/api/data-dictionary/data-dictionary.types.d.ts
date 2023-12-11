export declare enum NodeInfoType {
    function = "function"
}
interface IFunctionParameter {
    name: string;
    description: string;
}
export interface IFunctionDataDictionaryDescriptor {
    name: string;
    description: string;
    category: string;
    signature?: string;
    parameters: IFunctionParameter[];
}
export interface IDataDictionaryBranch {
    label: string;
    expression?: string | Array<string>;
    icon?: string;
    expanded?: boolean;
    hidden?: boolean;
    children?: IDataDictionary;
    autocompleteOptions?: IDataDictionaryAutocompleteOption[];
    info?: INodeInfo;
}
export interface IDataDictionary extends Array<IDataDictionaryBranch> {
}
export interface IDataDictionaryAutocompleteOption {
    label: string;
    expression: string;
}
export interface INodeInfo {
    type: NodeInfoType;
    data: any;
}
export {};
