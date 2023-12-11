import { INamedListDefinition } from '@helix/platform/named-list/api';
import { INamedListDefinitionModel } from '../../named-list-designer.types';
import { IInitNamedListDesignerActionPayload } from './named-list-designer.types';
export declare const init: import("@ngrx/store").ActionCreator<"[Named List Designer] Init", (props: {
    payload: IInitNamedListDesignerActionPayload;
}) => {
    payload: IInitNamedListDesignerActionPayload;
} & import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Init">>;
export declare const loadDefinition: import("@ngrx/store").ActionCreator<"[Named List Designer] Load Definition", () => import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Load Definition">>;
export declare const loadDefinitionSuccess: import("@ngrx/store").ActionCreator<"[Named List Designer] Load Definition Success", (props: {
    definition: INamedListDefinition;
}) => {
    definition: INamedListDefinition;
} & import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Load Definition Success">>;
export declare const initDefinitionData: import("@ngrx/store").ActionCreator<"[Named List Designer] Init Definition Data", (props: {
    definition: INamedListDefinition;
    definitionModel: INamedListDefinitionModel;
}) => {
    definition: INamedListDefinition;
    definitionModel: INamedListDefinitionModel;
} & import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Init Definition Data">>;
export declare const clearFields: import("@ngrx/store").ActionCreator<"[Named List Designer] Clear Fields", () => import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Clear Fields">>;
export declare const markDesignerPristine: import("@ngrx/store").ActionCreator<"[Named List Designer] Mark Designer Pristine", () => import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Mark Designer Pristine">>;
export declare const markDesignerDirty: import("@ngrx/store").ActionCreator<"[Named List Designer] Mark Designer Dirty", () => import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Mark Designer Dirty">>;
export declare const updateDefinitionModelFromDesigner: import("@ngrx/store").ActionCreator<"[Named List Designer] Update Definition Model From Designer", (props: {
    definitionModelFromDesigner: INamedListDefinitionModel;
}) => {
    definitionModelFromDesigner: INamedListDefinitionModel;
} & import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Update Definition Model From Designer">>;
export declare const revertCustomization: import("@ngrx/store").ActionCreator<"[Named List Designer] Revert Customization", () => import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Revert Customization">>;
export declare const toggleDesignMode: import("@ngrx/store").ActionCreator<"[Named List Designer] Toggle Design Mode", () => import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Toggle Design Mode">>;
export declare const saveDefinition: import("@ngrx/store").ActionCreator<"[Named List Designer] Save Definition", () => import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Save Definition">>;
export declare const saveDefinitionSuccess: import("@ngrx/store").ActionCreator<"[Named List Designer] Save Definition Success", (props: {
    savedDefinitionName: string;
}) => {
    savedDefinitionName: string;
} & import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Save Definition Success">>;
export declare const saveDefinitionError: import("@ngrx/store").ActionCreator<"[Named List Designer] Save Definition Error", () => import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Save Definition Error">>;
export declare const destroy: import("@ngrx/store").ActionCreator<"[Named List Designer] Destroy", () => import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Destroy">>;
