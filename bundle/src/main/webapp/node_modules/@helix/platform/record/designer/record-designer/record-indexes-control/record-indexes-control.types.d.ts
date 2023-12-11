import { IIndexDefinitionModel, IRecordDefinitionModel, IRecordFieldDefinitionModel } from '../../record-designer.types';
import { RxListBuilderItem } from '@bmc-ux/adapt-angular';
export interface IRecordIndexesControlOptions {
    definitionModel: IRecordDefinitionModel;
    isOverlayMode: boolean;
    isReadOnly: boolean;
}
export interface IIndexesEditorOptions {
    indexes: IIndexDefinitionModel[];
    indexToEditIndex: number;
    isReadOnly: boolean;
    fields: IRecordFieldDefinitionModel[];
}
export interface IFieldState extends RxListBuilderItem {
    fieldOrder: number;
}
export interface IIndexState extends IIndexDefinitionModel {
    isOpen: boolean;
    guid: string;
    availableFields: IFieldState[];
    checkedAvailableFields: IFieldState[];
    selectedFields: IFieldState[];
    isMoveToAvailableButtonEnabled: boolean;
}
export interface IIndexEditorState {
    indexes: IIndexState[];
    isDirty: boolean;
}
