import { IDocumentDefinition } from '@helix/platform/document/api';
import { IDocumentDefinitionModel } from '../../document-designer.types';
import { IInitDocumentDesignerActionPayload } from './document-designer.types';
export declare const init: import("@ngrx/store").ActionCreator<"[Document Designer] Init", (props: {
    payload: IInitDocumentDesignerActionPayload;
}) => {
    payload: IInitDocumentDesignerActionPayload;
} & import("@ngrx/store/src/models").TypedAction<"[Document Designer] Init">>;
export declare const loadDefinition: import("@ngrx/store").ActionCreator<"[Document Designer] Load Definition", () => import("@ngrx/store/src/models").TypedAction<"[Document Designer] Load Definition">>;
export declare const loadDefinitionSuccess: import("@ngrx/store").ActionCreator<"[Document Designer] Load Definition Success", (props: {
    definition: IDocumentDefinition;
}) => {
    definition: IDocumentDefinition;
} & import("@ngrx/store/src/models").TypedAction<"[Document Designer] Load Definition Success">>;
export declare const initDefinitionData: import("@ngrx/store").ActionCreator<"[Document Designer] Init Definition Model", (props: {
    definition: IDocumentDefinition;
    definitionModel: IDocumentDefinitionModel;
}) => {
    definition: IDocumentDefinition;
    definitionModel: IDocumentDefinitionModel;
} & import("@ngrx/store/src/models").TypedAction<"[Document Designer] Init Definition Model">>;
export declare const markDesignerPristine: import("@ngrx/store").ActionCreator<"[Document Designer] Mark Designer Pristine", () => import("@ngrx/store/src/models").TypedAction<"[Document Designer] Mark Designer Pristine">>;
export declare const markDesignerDirty: import("@ngrx/store").ActionCreator<"[Document Designer] Mark Designer Dirty", () => import("@ngrx/store/src/models").TypedAction<"[Document Designer] Mark Designer Dirty">>;
export declare const updateDefinitionModelFromDesigner: import("@ngrx/store").ActionCreator<"[Document Designer] Update Definition Model From Designer", (props: {
    definitionModelFromDesigner: IDocumentDefinitionModel;
}) => {
    definitionModelFromDesigner: IDocumentDefinitionModel;
} & import("@ngrx/store/src/models").TypedAction<"[Document Designer] Update Definition Model From Designer">>;
export declare const toggleDesignMode: import("@ngrx/store").ActionCreator<"[Document Designer] Toggle Design Mode", () => import("@ngrx/store/src/models").TypedAction<"[Document Designer] Toggle Design Mode">>;
export declare const revertCustomization: import("@ngrx/store").ActionCreator<"[Document Designer] Revert Customization", () => import("@ngrx/store/src/models").TypedAction<"[Document Designer] Revert Customization">>;
export declare const saveDefinition: import("@ngrx/store").ActionCreator<"[Document Designer] Save Definition", () => import("@ngrx/store/src/models").TypedAction<"[Document Designer] Save Definition">>;
export declare const saveDefinitionSuccess: import("@ngrx/store").ActionCreator<"[Document Designer] Save Definition Success", (props: {
    savedDefinitionName: string;
}) => {
    savedDefinitionName: string;
} & import("@ngrx/store/src/models").TypedAction<"[Document Designer] Save Definition Success">>;
export declare const saveDefinitionError: import("@ngrx/store").ActionCreator<"[Document Designer] Save Definition Error", () => import("@ngrx/store/src/models").TypedAction<"[Document Designer] Save Definition Error">>;
export declare const destroy: import("@ngrx/store").ActionCreator<"[Document Designer] Destroy", () => import("@ngrx/store/src/models").TypedAction<"[Document Designer] Destroy">>;
