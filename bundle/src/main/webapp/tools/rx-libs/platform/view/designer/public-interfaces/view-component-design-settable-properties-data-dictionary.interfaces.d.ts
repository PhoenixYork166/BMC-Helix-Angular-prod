export interface IViewComponentDesignSettablePropertiesDataDictionaryBranch {
    label: string;
    expression?: string;
    children?: IViewComponentDesignSettablePropertiesDataDictionary;
}
export interface IViewComponentDesignSettablePropertiesDataDictionary extends Array<IViewComponentDesignSettablePropertiesDataDictionaryBranch> {
}
