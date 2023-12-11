import { IViewDesignerState } from '../interfaces/view-designer-state.interface';
import { IViewDesignModel } from '../interfaces/view-design-model.interface';
export declare const viewDesignerState: import("@ngrx/store").MemoizedSelector<object, IViewDesignerState, import("@ngrx/store").DefaultProjectorFn<IViewDesignerState>>;
export declare const viewDesignerModelsSelector: import("@ngrx/store").MemoizedSelector<object, import("../interfaces/view-design-model-state.interface").IViewDesignModelState, import("@ngrx/store").DefaultProjectorFn<import("../interfaces/view-design-model-state.interface").IViewDesignModelState>>;
export declare const viewModelSelector: import("@ngrx/store").MemoizedSelector<object, IViewDesignModel, import("@ngrx/store").DefaultProjectorFn<IViewDesignModel>>;
export declare const viewModelPropertyValueSelector: import("@ngrx/store").MemoizedSelectorWithProps<object, {
    propertyName: string;
}, any, import("@ngrx/store").DefaultProjectorFn<any>>;
export declare const viewComponentModelsSelector: import("@ngrx/store").MemoizedSelector<object, import("../interfaces/view-component-design-models.interface").IViewComponentDesignModels, import("@ngrx/store").DefaultProjectorFn<import("../interfaces/view-component-design-models.interface").IViewComponentDesignModels>>;
export declare const firstViewComponentModelTypeSelector: import("@ngrx/store").MemoizedSelector<object, string, import("@ngrx/store").DefaultProjectorFn<string>>;
export declare const viewComponentModelSelector: import("@ngrx/store").MemoizedSelectorWithProps<object, {
    guid: string;
}, any, import("@ngrx/store").DefaultProjectorFn<any>>;
export declare const parentComponentModelGuidSelector: import("@ngrx/store").MemoizedSelectorWithProps<object, {
    guid: string;
}, any, import("@ngrx/store").DefaultProjectorFn<any>>;
export declare const componentPropertiesByNameSelector: import("@ngrx/store").MemoizedSelectorWithProps<object, {
    guid: string;
    propertyName?: string;
}, any, import("@ngrx/store").DefaultProjectorFn<any>>;
export declare const componentTypeSelector: import("@ngrx/store").MemoizedSelectorWithProps<object, {
    guid: any;
}, any, import("@ngrx/store").DefaultProjectorFn<any>>;
export declare const componentLayoutSelector: import("@ngrx/store").MemoizedSelectorWithProps<object, {
    guid: string;
}, any, import("@ngrx/store").DefaultProjectorFn<any>>;
export declare const componentPermissionsSelector: import("@ngrx/store").MemoizedSelectorWithProps<object, {
    guid: string;
}, any, import("@ngrx/store").DefaultProjectorFn<any>>;
export declare const childDataComponentGuidsSelector: import("@ngrx/store").MemoizedSelectorWithProps<object, {
    guid: string;
}, any, import("@ngrx/store").DefaultProjectorFn<any>>;
export declare const viewDesignerUISelector: import("@ngrx/store").MemoizedSelector<object, import("../interfaces/view-designer-ui-state.interface").IViewDesignerUiState, import("@ngrx/store").DefaultProjectorFn<import("../interfaces/view-designer-ui-state.interface").IViewDesignerUiState>>;
export declare const isViewDefinitionLoadingSelector: import("@ngrx/store").MemoizedSelector<object, boolean, import("@ngrx/store").DefaultProjectorFn<boolean>>;
export declare const bundleFriendlyNameSelector: import("@ngrx/store").MemoizedSelector<object, string, import("@ngrx/store").DefaultProjectorFn<string>>;
export declare const currentBundleIdSelector: import("@ngrx/store").MemoizedSelector<object, string, import("@ngrx/store").DefaultProjectorFn<string>>;
export declare const viewDefinitionSelector: import("@ngrx/store").MemoizedSelector<object, import("@helix/platform/view/api").IViewDefinition, import("@ngrx/store").DefaultProjectorFn<import("@helix/platform/view/api").IViewDefinition>>;
export declare const validationIssuesSelector: import("@ngrx/store").MemoizedSelector<object, import("./view-designer-validation.reducer").IViewDesignerValidationState, import("@ngrx/store").DefaultProjectorFn<import("./view-designer-validation.reducer").IViewDesignerValidationState>>;
export declare const breadcrumbsSelector: import("@ngrx/store").MemoizedSelector<object, import("./view-designer-breadcrumbs.reducer").IViewDesignerBreadcrumbsState, import("@ngrx/store").DefaultProjectorFn<import("./view-designer-breadcrumbs.reducer").IViewDesignerBreadcrumbsState>>;
export declare const selectedInspectorTabIdSelector: import("@ngrx/store").MemoizedSelector<object, number, import("@ngrx/store").DefaultProjectorFn<number>>;
export declare const selectedComponentGuidSelector: import("@ngrx/store").MemoizedSelector<object, string, import("@ngrx/store").DefaultProjectorFn<string>>;
export declare const areViewModelsReadySelector: import("@ngrx/store").MemoizedSelector<object, boolean, import("@ngrx/store").DefaultProjectorFn<boolean>>;
export declare const selectedComponentPropsSelector: import("@ngrx/store").MemoizedSelector<object, import("@helix/platform/shared/api").IPlainObject, import("@ngrx/store").DefaultProjectorFn<import("@helix/platform/shared/api").IPlainObject>>;
