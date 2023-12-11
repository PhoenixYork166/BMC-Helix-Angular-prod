import { IRecordDefinitionModel } from '../../record-designer.types';
export interface IRecordDesignerModel {
    bundleId: string;
    definitionName: string;
    selectedFieldGuid: string;
    isDesignMode: boolean;
    inspectorTabIndex: number;
    definitionModelFromDefinition: IRecordDefinitionModel;
    definitionModel: IRecordDefinitionModel;
    isDirty: boolean;
    savedDefinitionName: string;
}
export interface IRecordDesignerState {
    model: IRecordDesignerModel;
}
export interface IInitRecordDesignerActionPayload {
    bundleId: string;
    definitionName: string;
}
