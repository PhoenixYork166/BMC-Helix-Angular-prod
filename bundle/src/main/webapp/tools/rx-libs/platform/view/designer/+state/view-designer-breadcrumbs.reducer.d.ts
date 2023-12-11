declare type BreadcrumbLabel = string;
export interface IViewDesignerBreadcrumbsState {
    [guid: string]: BreadcrumbLabel;
}
export declare function getInitialState(): IViewDesignerBreadcrumbsState;
export declare const reducer: import("@ngrx/store").ActionReducer<IViewDesignerBreadcrumbsState, import("@ngrx/store").Action>;
export declare function viewDesignerBreadcrumbsReducer(state: any, action: any): IViewDesignerBreadcrumbsState;
export {};
