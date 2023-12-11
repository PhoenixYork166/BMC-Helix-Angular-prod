import { IViewDesignModelState } from '../interfaces/view-design-model-state.interface';
export declare function getInitialState(): IViewDesignModelState;
export declare const reducer: import("@ngrx/store").ActionReducer<IViewDesignModelState, import("@ngrx/store").Action>;
export declare function viewDesignerModelReducer(state: any, action: any): IViewDesignModelState;
