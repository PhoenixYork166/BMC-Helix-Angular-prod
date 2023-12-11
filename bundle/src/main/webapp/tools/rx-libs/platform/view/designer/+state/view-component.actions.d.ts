import { IPlainObject } from '@helix/platform/shared/api';
import { IViewComponentDesignValidationIssue } from '../public-interfaces/view-component-design-validation-issue.interface';
import { IAddNewComponentActionPayload, IInitializeComponentModelActionPayload, IInitializeDataComponentModelActionPayload, ISetChildrenActionPayload, ISetComponentDataPayload, IUpdateComponentModelPayload } from './view-component.types';
export declare const componentsRemoved: import("@ngrx/store").ActionCreator<"[View Component] Components Removed", (props: {
    guids: string[];
    selectParent?: boolean;
}) => {
    guids: string[];
    selectParent?: boolean;
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Components Removed">>;
export declare const initializeComponentModels: import("@ngrx/store").ActionCreator<"[View Component] Initialize Component Models", (props: {
    payload: IInitializeComponentModelActionPayload[];
}) => {
    payload: IInitializeComponentModelActionPayload[];
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Initialize Component Models">>;
export declare const initializeDataComponentModels: import("@ngrx/store").ActionCreator<"[View Component] Initialize Data Component Models", (props: {
    payload: IInitializeDataComponentModelActionPayload[];
}) => {
    payload: IInitializeDataComponentModelActionPayload[];
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Initialize Data Component Models">>;
export declare const setValidationIssues: import("@ngrx/store").ActionCreator<"[View Component] Set Validation Issues", (props: {
    guid: string;
    issues: IViewComponentDesignValidationIssue[];
}) => {
    guid: string;
    issues: IViewComponentDesignValidationIssue[];
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Set Validation Issues">>;
export declare const setExpressionValidationIssues: import("@ngrx/store").ActionCreator<"[View Component] Set Expression Validation Issues", (props: {
    issues: {
        [guid: string]: IViewComponentDesignValidationIssue<IPlainObject>[];
    };
}) => {
    issues: {
        [guid: string]: IViewComponentDesignValidationIssue<IPlainObject>[];
    };
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Set Expression Validation Issues">>;
export declare const setComponentData: import("@ngrx/store").ActionCreator<"[View Component] Set Component Properties", (props: {
    payload: ISetComponentDataPayload[];
}) => {
    payload: ISetComponentDataPayload[];
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Set Component Properties">>;
export declare const setChildComponents: import("@ngrx/store").ActionCreator<"[View Component] Set Child Components", (props: {
    payload: ISetChildrenActionPayload;
}) => {
    payload: ISetChildrenActionPayload;
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Set Child Components">>;
export declare const setBreadcrumbs: import("@ngrx/store").ActionCreator<"[View Component] Set Breadcrumbs", (props: {
    guid: string;
    label: string;
}) => {
    guid: string;
    label: string;
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Set Breadcrumbs">>;
export declare const selectComponent: import("@ngrx/store").ActionCreator<"[View Component] Select Component", (props: {
    guid: string;
}) => {
    guid: string;
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Select Component">>;
export declare const setComponentLayout: import("@ngrx/store").ActionCreator<"[View Component] Set Component Layout", (props: {
    guid: string;
    cols: number[];
}) => {
    guid: string;
    cols: number[];
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Set Component Layout">>;
export declare const moveComponent: import("@ngrx/store").ActionCreator<"[View Component] Move Component", (props: {
    guid: any;
    insertIndex: number;
    columnIndex: number;
    outletName: string;
    parentGuid: string;
}) => {
    guid: any;
    insertIndex: number;
    columnIndex: number;
    outletName: string;
    parentGuid: string;
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Move Component">>;
export declare const insertComponent: import("@ngrx/store").ActionCreator<"[View Component] Insert Component", (props: {
    data: {
        guid?: string;
        type?: string;
        initialPropertiesByName?: IPlainObject;
    };
    insertIndex: number;
    columnIndex: number;
    outletName: string;
    targetGuid: string;
}) => {
    data: {
        guid?: string;
        type?: string;
        initialPropertiesByName?: IPlainObject;
    };
    insertIndex: number;
    columnIndex: number;
    outletName: string;
    targetGuid: string;
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Insert Component">>;
export declare const addNewComponents: import("@ngrx/store").ActionCreator<"[View Component] Add New Components", (props: {
    payload: IAddNewComponentActionPayload[];
}) => {
    payload: IAddNewComponentActionPayload[];
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Add New Components">>;
export declare const updateComponentModel: import("@ngrx/store").ActionCreator<"[View Component] Update Component Model", (props: {
    payload: IUpdateComponentModelPayload[];
}) => {
    payload: IUpdateComponentModelPayload[];
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Update Component Model">>;
export declare const removeComponents: import("@ngrx/store").ActionCreator<"[View Component] Remove Components", (props: {
    guids: string[];
    selectParent?: boolean;
}) => {
    guids: string[];
    selectParent?: boolean;
} & import("@ngrx/store/src/models").TypedAction<"[View Component] Remove Components">>;
