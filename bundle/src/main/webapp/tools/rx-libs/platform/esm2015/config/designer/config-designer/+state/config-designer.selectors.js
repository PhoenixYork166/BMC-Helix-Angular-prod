import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RX_CONFIG_DESIGNER } from '../../config-designer.constant';
export const configDesignerStateSelector = createFeatureSelector(RX_CONFIG_DESIGNER.featureSelector);
export const configDesignerModelSelector = createSelector(configDesignerStateSelector, (configDesignerState) => configDesignerState.model);
export const bundleIdSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.bundleId);
export const definitionNameSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.definitionName);
export const isDesignModeSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.isDesignMode);
export const inspectorTabIndexSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.inspectorTabIndex);
export const parentComponentsSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.parentComponents);
export const selectedFieldGuidSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.selectedFieldGuid);
export const definitionModelFromDefinitionSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.definitionModelFromDefinition);
export const definitionModelSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.definitionModel);
export const isDirtySelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.isDirty);
export const savedDefinitionNameSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.savedDefinitionName);
//# sourceMappingURL=config-designer.selectors.js.map