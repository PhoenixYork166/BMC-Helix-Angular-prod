import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RX_ASSOCIATION_DESIGNER } from '../../association-designer.constant';
export const associationDesignerStateSelector = createFeatureSelector(RX_ASSOCIATION_DESIGNER.featureSelector);
export const associationDesignerModelSelector = createSelector(associationDesignerStateSelector, (associationDesignerState) => associationDesignerState.model);
export const isDesignModeSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.isDesignMode);
export const bundleIdSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.bundleId);
export const definitionNameSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.definitionName);
export const definitionModelSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.definitionModel);
export const definitionModelFromDefinitionSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.definitionModelFromDefinition);
export const isDirtySelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.isDirty);
export const isForeignKeyCreatedSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.isForeignKeyCreated);
export const isForeignKeyMissingSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.isForeignKeyMissing);
export const savedDefinitionNameSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.savedDefinitionName);
export const originalDefinitionSelector = createSelector(associationDesignerModelSelector, (associationDesignerModel) => associationDesignerModel.originalDefinition);
//# sourceMappingURL=association-designer.selectors.js.map