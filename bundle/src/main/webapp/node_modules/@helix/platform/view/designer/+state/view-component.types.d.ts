import { IViewComponentDesignModel } from '../interfaces/view-component-design-model.interface';
import { IDataDictionary, IPlainObject } from '@helix/platform/shared/api';
import { IViewComponentDesignSetPayload } from '../public-interfaces';
export interface IAddNewComponentActionPayload {
    type: string;
    parentGuid: string;
    guid?: string;
    propertiesByName?: IPlainObject;
    insertIndex?: number;
    columnIndex?: number;
    outletName?: string;
    selectComponent?: boolean;
    children?: Omit<IAddNewComponentActionPayload, 'parentGuid'>[];
}
export interface IInitializeComponentModelActionPayload {
    componentModel: IViewComponentDesignModel;
    insertIndex: number;
    columnIndex: number;
    columnSpan?: number;
    outletName: string;
}
export interface IInitializeDataComponentModelActionPayload {
    componentModel: IViewComponentDesignModel;
}
export interface ISetChildrenActionPayload {
    data: IViewComponentDesignSetPayload[];
    guid: string;
    types?: string[];
}
export interface ISetComponentDataPayload {
    data: IPlainObject;
    guid: string;
}
export interface IUpdateComponentModelPayload {
    guid: string;
    partialModel: Partial<IViewComponentDesignModel>;
}
export interface ISetSettablePropertiesDataDictionaryItem {
    guid: string;
    componentName: string;
    dataDictionary: IDataDictionary;
}
