import { IViewDesignerUiState } from '../interfaces/view-designer-ui-state.interface';
export declare function getInitialState(): IViewDesignerUiState;
export declare const reducer: import("@ngrx/store").ActionReducer<IViewDesignerUiState, import("@ngrx/store").Action>;
export declare function viewDesignerUiReducer(state: any, action: any): IViewDesignerUiState;
