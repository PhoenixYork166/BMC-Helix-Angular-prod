import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RX_RECORD_DESIGNER } from '../record-designer.constant';
export const recordDesignerStateSelector = createFeatureSelector(RX_RECORD_DESIGNER.featureSelector);
export const recordDesignerModelSelector = createSelector(recordDesignerStateSelector, (recordDesignerState) => recordDesignerState.model);
export const definitionNameSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.definitionName);
export const bundleIdSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.bundleId);
export const isDesignModeSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.isDesignMode);
export const isDirtySelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.isDirty);
export const inspectorTabIndexSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.inspectorTabIndex);
export const definitionModelSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.definitionModel);
export const definitionModelFromDefinitionSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.definitionModelFromDefinition);
export const selectedFieldGuidSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.selectedFieldGuid);
export const savedDefinitionNameSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.savedDefinitionName);
//# sourceMappingURL=record-designer.selectors.js.map