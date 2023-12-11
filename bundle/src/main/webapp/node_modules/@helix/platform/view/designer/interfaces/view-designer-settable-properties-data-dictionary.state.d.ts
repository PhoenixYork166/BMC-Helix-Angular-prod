import { IDataDictionary } from '@helix/platform/shared/api';
export interface IViewDesignerSettablePropertiesDataDictionaryState {
    [guid: string]: {
        componentName: string;
        dataDictionary: IDataDictionary;
    };
}
