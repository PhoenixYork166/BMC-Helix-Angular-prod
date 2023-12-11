import { IRecordDefinitionModel } from '../../record-designer.types';
export interface IArchiveAssociationControlOptions {
    definitionModel: IRecordDefinitionModel;
    definitionModelFromDefinition: IRecordDefinitionModel;
    bundleId: string;
    isOverlayMode: boolean;
    isReadOnly: boolean;
}
export interface IMissingArchiveAssociation {
    name: string;
    secondRecord: string;
    url: string;
}
export interface IArchiveAssociationGridRow {
    name: string;
    firstRecord: string;
    secondRecord: string;
    enforced: boolean;
    isSelectionDisabled: boolean;
    isAssociationSelectedInBase: boolean;
}
