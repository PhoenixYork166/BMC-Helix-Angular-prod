import { IConfigDefinitionModel } from '../../config-designer.types';
export interface IConfigDesignerModel {
    bundleId: string;
    definitionName: string;
    isDesignMode: boolean;
    inspectorTabIndex: number;
    selectedFieldGuid: string;
    definitionModelFromDefinition: IConfigDefinitionModel;
    definitionModel: IConfigDefinitionModel;
    parentComponents: string[];
    isDirty: boolean;
    savedDefinitionName: string;
}
export interface IConfigDesignerState {
    model: IConfigDesignerModel;
}
export interface IInitConfigDesignerActionPayload {
    bundleId: string;
    definitionName: string;
}
