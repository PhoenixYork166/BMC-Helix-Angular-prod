import { IRecordDefinitionModel, IRecordFieldDefinitionModel } from '../../record-designer.types';
import { IInitRecordDesignerActionPayload } from './record-designer.types';
import { IRecordDefinition } from '@helix/platform/record/api';
export declare const init: import("@ngrx/store").ActionCreator<"[Record Designer] Init", (props: {
    payload: IInitRecordDesignerActionPayload;
}) => {
    payload: IInitRecordDesignerActionPayload;
} & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Init">>;
export declare const loadDefinition: import("@ngrx/store").ActionCreator<"[Record Designer] Load Definition", () => import("@ngrx/store/src/models").TypedAction<"[Record Designer] Load Definition">>;
export declare const clearSearchFields: import("@ngrx/store").ActionCreator<"[Record Designer] Clear Search Fields", () => import("@ngrx/store/src/models").TypedAction<"[Record Designer] Clear Search Fields">>;
export declare const loadDefinitionSuccess: import("@ngrx/store").ActionCreator<"[Record Designer] Load Definition Success", (props: {
    definition: IRecordDefinition;
}) => {
    definition: IRecordDefinition;
} & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Load Definition Success">>;
export declare const initDefinitionModel: import("@ngrx/store").ActionCreator<"[Record Designer] Init Definition Model", (props: {
    definitionModelFromDefinition: IRecordDefinitionModel;
}) => {
    definitionModelFromDefinition: IRecordDefinitionModel;
} & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Init Definition Model">>;
export declare const markDesignerPristine: import("@ngrx/store").ActionCreator<"[Record Designer] Mark Designer Pristine", () => import("@ngrx/store/src/models").TypedAction<"[Record Designer] Mark Designer Pristine">>;
export declare const markDesignerDirty: import("@ngrx/store").ActionCreator<"[Record Designer] Mark Designer Dirty", () => import("@ngrx/store/src/models").TypedAction<"[Record Designer] Mark Designer Dirty">>;
export declare const toggleDesignMode: import("@ngrx/store").ActionCreator<"[Record Designer] Toggle Design Mode", () => import("@ngrx/store/src/models").TypedAction<"[Record Designer] Toggle Design Mode">>;
export declare const updateDefinitionModelFromDesigner: import("@ngrx/store").ActionCreator<"[Record Designer] Update Definition Model From Designer", (props: {
    definitionModelFromDesigner: IRecordDefinitionModel;
}) => {
    definitionModelFromDesigner: IRecordDefinitionModel;
} & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Update Definition Model From Designer">>;
export declare const updateSelectedFieldModel: import("@ngrx/store").ActionCreator<"[Record Designer] Update Selected Field Model", (props: {
    selectedFieldModel: IRecordFieldDefinitionModel;
}) => {
    selectedFieldModel: IRecordFieldDefinitionModel;
} & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Update Selected Field Model">>;
export declare const setInspectorTabIndex: import("@ngrx/store").ActionCreator<"[Record Designer] Set Inspector Tab Index", (props: {
    inspectorTabIndex: number;
}) => {
    inspectorTabIndex: number;
} & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Set Inspector Tab Index">>;
export declare const createNewFieldModel: import("@ngrx/store").ActionCreator<"[Record Designer] Create New Field Model", (props: {
    resourceType: string;
}) => {
    resourceType: string;
} & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Create New Field Model">>;
export declare const addFieldModel: import("@ngrx/store").ActionCreator<"[Record Designer] Add Field Model", (props: {
    newFieldModel: IRecordFieldDefinitionModel;
}) => {
    newFieldModel: IRecordFieldDefinitionModel;
} & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Add Field Model">>;
export declare const addNewFieldModels: import("@ngrx/store").ActionCreator<"[Record Designer] Add New Field Models", (props: {
    newFieldModels: IRecordFieldDefinitionModel[];
}) => {
    newFieldModels: IRecordFieldDefinitionModel[];
} & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Add New Field Models">>;
export declare const setSelectedFieldGuid: import("@ngrx/store").ActionCreator<"[Record Designer] Set Selected Field GUID", (props: {
    guid: string;
}) => {
    guid: string;
} & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Set Selected Field GUID">>;
export declare const clearSelectedFieldGuid: import("@ngrx/store").ActionCreator<"[Record Designer] Clear Selected Field GUID", () => import("@ngrx/store/src/models").TypedAction<"[Record Designer] Clear Selected Field GUID">>;
export declare const deleteSelectedField: import("@ngrx/store").ActionCreator<"[Record Designer] Delete Selected Field", () => import("@ngrx/store/src/models").TypedAction<"[Record Designer] Delete Selected Field">>;
export declare const copySelectedField: import("@ngrx/store").ActionCreator<"[Record Designer] Copy Selected Field", () => import("@ngrx/store/src/models").TypedAction<"[Record Designer] Copy Selected Field">>;
export declare const checkIfFieldUsedByIndexes: import("@ngrx/store").ActionCreator<"[Record Designer] Check If Field Used By Indexes", () => import("@ngrx/store/src/models").TypedAction<"[Record Designer] Check If Field Used By Indexes">>;
export declare const deleteSelectedFieldSuccess: import("@ngrx/store").ActionCreator<"[Record Designer] Delete Selected Field Success", () => import("@ngrx/store/src/models").TypedAction<"[Record Designer] Delete Selected Field Success">>;
export declare const deleteSelectedFieldError: import("@ngrx/store").ActionCreator<"[Record Designer] Delete Selected Field Error", () => import("@ngrx/store/src/models").TypedAction<"[Record Designer] Delete Selected Field Error">>;
export declare const saveDefinition: import("@ngrx/store").ActionCreator<"[Record Designer] Save Definition", () => import("@ngrx/store/src/models").TypedAction<"[Record Designer] Save Definition">>;
export declare const saveDefinitionSuccess: import("@ngrx/store").ActionCreator<"[Record Designer] Save Definition Success", (props: {
    savedDefinitionName: string;
}) => {
    savedDefinitionName: string;
} & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Save Definition Success">>;
export declare const destroy: import("@ngrx/store").ActionCreator<"[Record Designer] Destroy", () => import("@ngrx/store/src/models").TypedAction<"[Record Designer] Destroy">>;
