import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RX_DOCUMENT_DESIGNER } from '../../document-designer.constant';
export const documentDesignerStateSelector = createFeatureSelector(RX_DOCUMENT_DESIGNER.featureSelector);
export const documentDesignerModelSelector = createSelector(documentDesignerStateSelector, (documentDesignerState) => documentDesignerState.model);
export const bundleIdSelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.bundleId);
export const definitionNameSelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.definitionName);
export const isDesignModeSelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.isDesignMode);
export const definitionModelFromDefinitionSelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.definitionModelFromDefinition);
export const definitionModelSelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.definitionModel);
export const isDirtySelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.isDirty);
export const savedDefinitionNameSelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.savedDefinitionName);
export const originalDefinitionSelector = createSelector(documentDesignerModelSelector, (documentDesignerModel) => documentDesignerModel.originalDefinition);
//# sourceMappingURL=document-designer.selectors.js.map