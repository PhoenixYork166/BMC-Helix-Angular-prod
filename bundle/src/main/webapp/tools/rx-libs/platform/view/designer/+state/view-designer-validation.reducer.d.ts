import { IViewComponentDesignValidationIssue } from '../public-interfaces';
export interface IViewDesignerValidationState {
    issues: {
        [guid: string]: IViewComponentDesignValidationIssue[];
    };
    expressionIssues: {
        [guid: string]: IViewComponentDesignValidationIssue[];
    };
}
export declare function getInitialState(): IViewDesignerValidationState;
export declare const reducer: import("@ngrx/store").ActionReducer<IViewDesignerValidationState, import("@ngrx/store").Action>;
export declare function viewDesignerValidationReducer(state: any, action: any): IViewDesignerValidationState;
