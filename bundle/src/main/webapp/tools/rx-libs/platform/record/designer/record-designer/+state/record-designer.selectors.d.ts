import { IRecordDesignerModel, IRecordDesignerState } from './record-designer.types';
export declare const recordDesignerStateSelector: import("@ngrx/store").MemoizedSelector<object, IRecordDesignerState, import("@ngrx/store").DefaultProjectorFn<IRecordDesignerState>>;
export declare const recordDesignerModelSelector: import("@ngrx/store").MemoizedSelector<object, IRecordDesignerModel, import("@ngrx/store").DefaultProjectorFn<IRecordDesignerModel>>;
export declare const definitionNameSelector: import("@ngrx/store").MemoizedSelector<object, string, import("@ngrx/store").DefaultProjectorFn<string>>;
export declare const bundleIdSelector: import("@ngrx/store").MemoizedSelector<object, string, import("@ngrx/store").DefaultProjectorFn<string>>;
export declare const isDesignModeSelector: import("@ngrx/store").MemoizedSelector<object, boolean, import("@ngrx/store").DefaultProjectorFn<boolean>>;
export declare const isDirtySelector: import("@ngrx/store").MemoizedSelector<object, boolean, import("@ngrx/store").DefaultProjectorFn<boolean>>;
export declare const inspectorTabIndexSelector: import("@ngrx/store").MemoizedSelector<object, number, import("@ngrx/store").DefaultProjectorFn<number>>;
export declare const definitionModelSelector: import("@ngrx/store").MemoizedSelector<object, import("../../record-designer.types").IRecordDefinitionModel, import("@ngrx/store").DefaultProjectorFn<import("../../record-designer.types").IRecordDefinitionModel>>;
export declare const definitionModelFromDefinitionSelector: import("@ngrx/store").MemoizedSelector<object, import("../../record-designer.types").IRecordDefinitionModel, import("@ngrx/store").DefaultProjectorFn<import("../../record-designer.types").IRecordDefinitionModel>>;
export declare const selectedFieldGuidSelector: import("@ngrx/store").MemoizedSelector<object, string, import("@ngrx/store").DefaultProjectorFn<string>>;
export declare const savedDefinitionNameSelector: import("@ngrx/store").MemoizedSelector<object, string, import("@ngrx/store").DefaultProjectorFn<string>>;
