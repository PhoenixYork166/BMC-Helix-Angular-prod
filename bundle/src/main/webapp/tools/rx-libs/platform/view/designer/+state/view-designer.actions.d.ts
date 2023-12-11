import { IViewDefinition } from '@helix/platform/view/api';
import { IViewDesignModel } from '../interfaces/view-design-model.interface';
import { IInitViewDesignerActionPayload } from './view-designer.types';
export declare const viewDefinitionSaveSuccess: import("@ngrx/store").ActionCreator<"[View Designer] View Definition Save Success", (props: {
    viewDefinitionName: string;
}) => {
    viewDefinitionName: string;
} & import("@ngrx/store/src/models").TypedAction<"[View Designer] View Definition Save Success">>;
export declare const viewDefinitionSaveError: import("@ngrx/store").ActionCreator<"[View Designer] View Definition Save Error", () => import("@ngrx/store/src/models").TypedAction<"[View Designer] View Definition Save Error">>;
export declare const viewDefinitionLoadSuccess: import("@ngrx/store").ActionCreator<"[View Designer] View Definition Load Success", (props: {
    viewDefinition: IViewDefinition;
}) => {
    viewDefinition: IViewDefinition;
} & import("@ngrx/store/src/models").TypedAction<"[View Designer] View Definition Load Success">>;
export declare const viewDefinitionLoadError: import("@ngrx/store").ActionCreator<"[View Designer] View Definition Load Error", () => import("@ngrx/store/src/models").TypedAction<"[View Designer] View Definition Load Error">>;
export declare const setGeneratedViewDefinition: import("@ngrx/store").ActionCreator<"[View Designer] Set Generated View Definition", (props: {
    payload: IViewDefinition;
}) => {
    payload: IViewDefinition;
} & import("@ngrx/store/src/models").TypedAction<"[View Designer] Set Generated View Definition">>;
export declare const loadViewDefinition: import("@ngrx/store").ActionCreator<"[View Designer] Load View Definition", (props: {
    viewDefinitionName?: string;
    layoutTemplate?: number;
}) => {
    viewDefinitionName?: string;
    layoutTemplate?: number;
} & import("@ngrx/store/src/models").TypedAction<"[View Designer] Load View Definition">>;
export declare const friendlyBundleNameLoadSuccess: import("@ngrx/store").ActionCreator<"[View Designer] Bundle Friendly Name Load Success", (props: {
    friendlyBundleName: string;
}) => {
    friendlyBundleName: string;
} & import("@ngrx/store/src/models").TypedAction<"[View Designer] Bundle Friendly Name Load Success">>;
export declare const friendlyBundleNameLoadError: import("@ngrx/store").ActionCreator<"[View Designer] Bundle Friendly Name Load Error", (props: {
    payload: any;
}) => {
    payload: any;
} & import("@ngrx/store/src/models").TypedAction<"[View Designer] Bundle Friendly Name Load Error">>;
export declare const viewModelsInitialized: import("@ngrx/store").ActionCreator<"[View Designer] View Models Initialized", () => import("@ngrx/store/src/models").TypedAction<"[View Designer] View Models Initialized">>;
export declare const viewModelsUpdatedAfterSave: import("@ngrx/store").ActionCreator<"[View Designer] View Models Updated After Save", () => import("@ngrx/store/src/models").TypedAction<"[View Designer] View Models Updated After Save">>;
export declare const updateViewModel: import("@ngrx/store").ActionCreator<"[View Designer] Update View Model", (props: {
    payload: Partial<IViewDesignModel>;
}) => {
    payload: Partial<IViewDesignModel>;
} & import("@ngrx/store/src/models").TypedAction<"[View Designer] Update View Model">>;
export declare const setViewModel: import("@ngrx/store").ActionCreator<"[View Designer] Set View Model", (props: {
    payload: IViewDesignModel;
}) => {
    payload: IViewDesignModel;
} & import("@ngrx/store/src/models").TypedAction<"[View Designer] Set View Model">>;
export declare const selectInspectorTab: import("@ngrx/store").ActionCreator<"[View Designer] Select Inspector Tab", (props: {
    tabId: number;
}) => {
    tabId: number;
} & import("@ngrx/store/src/models").TypedAction<"[View Designer] Select Inspector Tab">>;
export declare const saveViewDefinition: import("@ngrx/store").ActionCreator<"[View Designer] Save View Definition", (props: {
    payload?: any;
}) => {
    payload?: any;
} & import("@ngrx/store/src/models").TypedAction<"[View Designer] Save View Definition">>;
export declare const runPreview: import("@ngrx/store").ActionCreator<"[View Designer] Run Preview", () => import("@ngrx/store/src/models").TypedAction<"[View Designer] Run Preview">>;
export declare const loadFriendlyBundleName: import("@ngrx/store").ActionCreator<"[View Designer] Load Bundle Friendly Name", () => import("@ngrx/store/src/models").TypedAction<"[View Designer] Load Bundle Friendly Name">>;
export declare const generateViewDefinition: import("@ngrx/store").ActionCreator<"[View Designer] Generate View Definition", (props: {
    payload?: any;
}) => {
    payload?: any;
} & import("@ngrx/store/src/models").TypedAction<"[View Designer] Generate View Definition">>;
export declare const clearCanvas: import("@ngrx/store").ActionCreator<"[View Designer] Clear Canvas", () => import("@ngrx/store/src/models").TypedAction<"[View Designer] Clear Canvas">>;
export declare const initViewDesigner: import("@ngrx/store").ActionCreator<"[View Designer] Init", (props: {
    payload: IInitViewDesignerActionPayload;
}) => {
    payload: IInitViewDesignerActionPayload;
} & import("@ngrx/store/src/models").TypedAction<"[View Designer] Init">>;
export declare const destroyViewDesigner: import("@ngrx/store").ActionCreator<"[View Designer] Destroy", () => import("@ngrx/store/src/models").TypedAction<"[View Designer] Destroy">>;
