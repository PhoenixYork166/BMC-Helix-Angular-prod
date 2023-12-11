import { IConfigDefinition } from '@helix/platform/config/api';
import { IInitConfigDesignerActionPayload } from './config-designer.types';
import { IConfigDefinitionModel, IConfigFieldDefinitionModel } from '../../config-designer.types';
export declare const init: import("@ngrx/store").ActionCreator<"[Config Designer] Init", (props: {
    payload: IInitConfigDesignerActionPayload;
}) => {
    payload: IInitConfigDesignerActionPayload;
} & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Init">>;
export declare const loadParentComponents: import("@ngrx/store").ActionCreator<"[Config Designer] Load Parent Components", () => import("@ngrx/store/src/models").TypedAction<"[Config Designer] Load Parent Components">>;
export declare const loadParentComponentsSuccess: import("@ngrx/store").ActionCreator<"[Config Designer] Load Parent Components Success", (props: {
    parentComponents: string[];
}) => {
    parentComponents: string[];
} & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Load Parent Components Success">>;
export declare const loadDefinition: import("@ngrx/store").ActionCreator<"[Config Designer] Load Definition", () => import("@ngrx/store/src/models").TypedAction<"[Config Designer] Load Definition">>;
export declare const loadDefinitionSuccess: import("@ngrx/store").ActionCreator<"[Config Designer] Load Definition Success", (props: {
    definition: IConfigDefinition;
}) => {
    definition: IConfigDefinition;
} & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Load Definition Success">>;
export declare const initDefinitionModel: import("@ngrx/store").ActionCreator<"[Config Designer] Init Definition Model", (props: {
    definitionModelFromDefinition: IConfigDefinitionModel;
}) => {
    definitionModelFromDefinition: IConfigDefinitionModel;
} & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Init Definition Model">>;
export declare const markDesignerPristine: import("@ngrx/store").ActionCreator<"[Config Designer] Mark Designer Pristine", () => import("@ngrx/store/src/models").TypedAction<"[Config Designer] Mark Designer Pristine">>;
export declare const markDesignerDirty: import("@ngrx/store").ActionCreator<"[Config Designer] Mark Designer Dirty", () => import("@ngrx/store/src/models").TypedAction<"[Config Designer] Mark Designer Dirty">>;
export declare const updateDefinitionModelFromDesigner: import("@ngrx/store").ActionCreator<"[Config Designer] Update Definition Model From Designer", (props: {
    definitionModelFromDesigner: IConfigDefinitionModel;
}) => {
    definitionModelFromDesigner: IConfigDefinitionModel;
} & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Update Definition Model From Designer">>;
export declare const updateSelectedFieldModel: import("@ngrx/store").ActionCreator<"[Config Designer] Update Selected Field Model", (props: {
    selectedFieldModel: IConfigFieldDefinitionModel;
}) => {
    selectedFieldModel: IConfigFieldDefinitionModel;
} & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Update Selected Field Model">>;
export declare const createNewFieldModel: import("@ngrx/store").ActionCreator<"[Config Designer] Create New Field Model", (props: {
    resourceType: string;
    isLoginNameField: boolean;
}) => {
    resourceType: string;
    isLoginNameField: boolean;
} & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Create New Field Model">>;
export declare const addFieldModel: import("@ngrx/store").ActionCreator<"[Config Designer] Add Field Model", (props: {
    newFieldModel: IConfigFieldDefinitionModel;
}) => {
    newFieldModel: IConfigFieldDefinitionModel;
} & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Add Field Model">>;
export declare const clearSelectedFieldGuid: import("@ngrx/store").ActionCreator<"[Config Designer] Clear Selected Field GUID", () => import("@ngrx/store/src/models").TypedAction<"[Config Designer] Clear Selected Field GUID">>;
export declare const setSelectedFieldGuid: import("@ngrx/store").ActionCreator<"[Config Designer] Set Selected Field GUID", (props: {
    guid: string;
}) => {
    guid: string;
} & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Set Selected Field GUID">>;
export declare const deleteSelectedField: import("@ngrx/store").ActionCreator<"[Config Designer] Delete Selected Field", () => import("@ngrx/store/src/models").TypedAction<"[Config Designer] Delete Selected Field">>;
export declare const deleteSelectedFieldSuccess: import("@ngrx/store").ActionCreator<"[Config Designer] Delete Selected Field Success", () => import("@ngrx/store/src/models").TypedAction<"[Config Designer] Delete Selected Field Success">>;
export declare const toggleDesignMode: import("@ngrx/store").ActionCreator<"[Config Designer] Toggle Design Mode", () => import("@ngrx/store/src/models").TypedAction<"[Config Designer] Toggle Design Mode">>;
export declare const editFieldGroups: import("@ngrx/store").ActionCreator<"[Config Designer] Edit Field Groups", () => import("@ngrx/store/src/models").TypedAction<"[Config Designer] Edit Field Groups">>;
export declare const setInspectorTabIndex: import("@ngrx/store").ActionCreator<"[Config Designer] Set Inspector Tab Index", (props: {
    inspectorTabIndex: number;
}) => {
    inspectorTabIndex: number;
} & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Set Inspector Tab Index">>;
export declare const saveDefinition: import("@ngrx/store").ActionCreator<"[Config Designer] Save Definition", () => import("@ngrx/store/src/models").TypedAction<"[Config Designer] Save Definition">>;
export declare const updateDefinition: import("@ngrx/store").ActionCreator<"[Config Designer] Update Definition", (props: {
    definition: IConfigDefinition;
}) => {
    definition: IConfigDefinition;
} & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Update Definition">>;
export declare const saveDefinitionSuccess: import("@ngrx/store").ActionCreator<"[Config Designer] Save Definition Success", (props: {
    savedDefinitionName: string;
}) => {
    savedDefinitionName: string;
} & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Save Definition Success">>;
export declare const saveDefinitionError: import("@ngrx/store").ActionCreator<"[Config Designer] Save Definition Error", () => import("@ngrx/store/src/models").TypedAction<"[Config Designer] Save Definition Error">>;
export declare const destroy: import("@ngrx/store").ActionCreator<"[Config Designer] Destroy", () => import("@ngrx/store/src/models").TypedAction<"[Config Designer] Destroy">>;
