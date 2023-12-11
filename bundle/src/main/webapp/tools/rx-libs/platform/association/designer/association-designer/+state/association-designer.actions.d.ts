import { IAssociationDefinition } from '@helix/platform/association/api';
import { IRecordDefinition } from '@helix/platform/record/api';
import { IAssociationDefinitionModel } from '../../association-designer.types';
import { IInitAssociationDesignerActionPayload } from './association-designer.types';
export declare const init: import("@ngrx/store").ActionCreator<"[Association Designer] Init", (props: {
    payload: IInitAssociationDesignerActionPayload;
}) => {
    payload: IInitAssociationDesignerActionPayload;
} & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Init">>;
export declare const loadDefinition: import("@ngrx/store").ActionCreator<"[Association Designer] Load Definition", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Load Definition">>;
export declare const loadDefinitionSuccess: import("@ngrx/store").ActionCreator<"[Association Designer] Load Definition Success", (props: {
    definition: IAssociationDefinition;
}) => {
    definition: IAssociationDefinition;
} & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Load Definition Success">>;
export declare const initDefinitionData: import("@ngrx/store").ActionCreator<"[Association Designer] Init Definition Model", (props: {
    definition: IAssociationDefinition;
    definitionModel: IAssociationDefinitionModel;
}) => {
    definition: IAssociationDefinition;
    definitionModel: IAssociationDefinitionModel;
} & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Init Definition Model">>;
export declare const updateDefinitionModelFromDesigner: import("@ngrx/store").ActionCreator<"[Association Designer] Update Definition Model From Designer", (props: {
    definitionModelFromDesigner: IAssociationDefinitionModel;
}) => {
    definitionModelFromDesigner: IAssociationDefinitionModel;
} & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Update Definition Model From Designer">>;
export declare const markDesignerPristine: import("@ngrx/store").ActionCreator<"[Association Designer] Mark Designer Pristine", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Mark Designer Pristine">>;
export declare const markDesignerDirty: import("@ngrx/store").ActionCreator<"[Association Designer] Mark Designer Dirty", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Mark Designer Dirty">>;
export declare const toggleDesignMode: import("@ngrx/store").ActionCreator<"[Association Designer] Toggle Design Mode", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Toggle Design Mode">>;
export declare const revertCustomization: import("@ngrx/store").ActionCreator<"[Association Designer] Revert Customization", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Revert Customization">>;
export declare const saveDefinition: import("@ngrx/store").ActionCreator<"[Association Designer] Save Definition", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Save Definition">>;
export declare const getRecordDefinition: import("@ngrx/store").ActionCreator<"[Association Designer] Get Record Definition", (props: {
    checkForMissingFieldAction?: boolean;
    createForeignKeyFieldAction?: boolean;
}) => {
    checkForMissingFieldAction?: boolean;
    createForeignKeyFieldAction?: boolean;
} & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Record Definition">>;
export declare const getRecordDefinitionError: import("@ngrx/store").ActionCreator<"[Association Designer] Get Record Definition Error", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Record Definition Error">>;
export declare const getForeignKeyFieldIdError: import("@ngrx/store").ActionCreator<"[Association Designer] Get Foreign Key Field ID Error", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Foreign Key Field ID Error">>;
export declare const checkForMissingForeignKeyField: import("@ngrx/store").ActionCreator<"[Association Designer] Check For Missing Foreign Key Field", (props: {
    definition: IRecordDefinition;
}) => {
    definition: IRecordDefinition;
} & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Check For Missing Foreign Key Field">>;
export declare const foreignKeyFieldMissingCheckSuccess: import("@ngrx/store").ActionCreator<"[Association Designer] Foreign Key Field Missing Check Success", (props: {
    payload: {
        isForeignKeyFieldMissing: boolean;
        updatedForeignKeyFieldId: number;
    };
}) => {
    payload: {
        isForeignKeyFieldMissing: boolean;
        updatedForeignKeyFieldId: number;
    };
} & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Foreign Key Field Missing Check Success">>;
export declare const createForeignKeyField: import("@ngrx/store").ActionCreator<"[Association Designer] Create Foreign Key Field", (props: {
    definition: IRecordDefinition;
}) => {
    definition: IRecordDefinition;
} & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Create Foreign Key Field">>;
export declare const createForeignKeyFieldSuccess: import("@ngrx/store").ActionCreator<"[Association Designer] Create Foreign Key Field Success", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Create Foreign Key Field Success">>;
export declare const createForeignKeyFieldError: import("@ngrx/store").ActionCreator<"[Association Designer] Create Foreign Key Field Error", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Create Foreign Key Field Error">>;
export declare const getCreatedForeignKeyFieldId: import("@ngrx/store").ActionCreator<"[Association Designer] Get Created Foreign Key Field ID", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Created Foreign Key Field ID">>;
export declare const getCreatedForeignKeyFieldIdSuccess: import("@ngrx/store").ActionCreator<"[Association Designer] Get Created Foreign Key Field ID Success", (props: {
    fieldId: number;
}) => {
    fieldId: number;
} & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Created Foreign Key Field ID Success">>;
export declare const getCreatedForeignKeyFieldIdError: import("@ngrx/store").ActionCreator<"[Association Designer] Get Created Foreign Key Field ID Error", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Created Foreign Key Field ID Error">>;
export declare const createOrUpdateDefinition: import("@ngrx/store").ActionCreator<"[Association Designer] Create Or Update Definition", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Create Or Update Definition">>;
export declare const getCreatedForeignKeyField: import("@ngrx/store").ActionCreator<"[Association Designer] Get Created Foreign Key Field", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Created Foreign Key Field">>;
export declare const getCreatedForeignKeyFieldError: import("@ngrx/store").ActionCreator<"[Association Designer] Get Created Foreign Key Field Error", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Created Foreign Key Field Error">>;
export declare const removeCreatedForeignKeyField: import("@ngrx/store").ActionCreator<"[Association Designer] Remove Created Foreign Key Field", (props: {
    foreignKeyFieldId: number;
    definition: IRecordDefinition;
}) => {
    foreignKeyFieldId: number;
    definition: IRecordDefinition;
} & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Remove Created Foreign Key Field">>;
export declare const removeCreatedForeignKeyFieldSuccess: import("@ngrx/store").ActionCreator<"[Association Designer] Remove Created Foreign Key Field Success", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Remove Created Foreign Key Field Success">>;
export declare const removeCreatedForeignKeyFieldError: import("@ngrx/store").ActionCreator<"[Association Designer] Remove Created Foreign Key Field Error", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Remove Created Foreign Key Field Error">>;
export declare const saveDefinitionSuccess: import("@ngrx/store").ActionCreator<"[Association Designer] Save Definition Success", (props: {
    savedDefinitionName: string;
}) => {
    savedDefinitionName: string;
} & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Save Definition Success">>;
export declare const createDefinitionError: import("@ngrx/store").ActionCreator<"[Association Designer] Create Definition Error", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Create Definition Error">>;
export declare const updateDefinitionError: import("@ngrx/store").ActionCreator<"[Association Designer] Update Definition Error", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Update Definition Error">>;
export declare const destroy: import("@ngrx/store").ActionCreator<"[Association Designer] Destroy", () => import("@ngrx/store/src/models").TypedAction<"[Association Designer] Destroy">>;
