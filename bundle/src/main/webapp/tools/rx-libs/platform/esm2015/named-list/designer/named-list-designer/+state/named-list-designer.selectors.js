import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RX_NAMED_LIST_DESIGNER } from '../../named-list-designer.constant';
export const namedListDesignerStateSelector = createFeatureSelector(RX_NAMED_LIST_DESIGNER.featureSelector);
export const namedListDesignerModelSelector = createSelector(namedListDesignerStateSelector, (namedListDesignerState) => namedListDesignerState.model);
export const bundleIdSelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.bundleId);
export const definitionNameSelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.definitionName);
export const isDesignModeSelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.isDesignMode);
export const definitionModelFromDefinitionSelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.definitionModelFromDefinition);
export const definitionModelSelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.definitionModel);
export const isDirtySelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.isDirty);
export const savedDefinitionNameSelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.savedDefinitionName);
export const originalDefinitionSelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.originalDefinition);
//# sourceMappingURL=named-list-designer.selectors.js.map