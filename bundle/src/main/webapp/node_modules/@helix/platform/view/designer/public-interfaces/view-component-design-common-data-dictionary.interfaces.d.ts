export interface IViewComponentDesignCommonDataDictionary extends Array<IViewComponentDesignCommonDataDictionaryBranch> {
}
export interface IViewComponentDesignCommonDataDictionaryBranch {
    label: string;
    expression?: string | Array<string>;
    children?: IViewComponentDesignCommonDataDictionary;
    autocompleteOptions?: Array<{
        label: string;
        expression: string;
    }>;
}
