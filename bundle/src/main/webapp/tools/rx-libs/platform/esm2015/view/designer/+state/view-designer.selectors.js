import { createFeatureSelector, createSelector } from '@ngrx/store';
import { get } from 'lodash';
export const viewDesignerState = createFeatureSelector('viewDesigner');
export const viewDesignerModelsSelector = createSelector(viewDesignerState, (viewDesigner) => viewDesigner.model);
export const viewModelSelector = createSelector(viewDesignerModelsSelector, (models) => models.viewDesignModel);
export const viewModelPropertyValueSelector = createSelector(viewModelSelector, (viewModel, { propertyName }) => get(viewModel, propertyName));
export const viewComponentModelsSelector = createSelector(viewDesignerModelsSelector, (models) => models.viewComponentDesignModels);
export const firstViewComponentModelTypeSelector = createSelector(viewDesignerModelsSelector, (models) => { var _a; return (_a = Object.values(models.viewComponentDesignModels)[0]) === null || _a === void 0 ? void 0 : _a.type; });
export const viewComponentModelSelector = createSelector(viewComponentModelsSelector, (componentModels, { guid }) => componentModels[guid]);
export const parentComponentModelGuidSelector = createSelector(viewComponentModelSelector, (componentModel) => componentModel === null || componentModel === void 0 ? void 0 : componentModel.parentGuid);
export const componentPropertiesByNameSelector = createSelector(viewComponentModelsSelector, (componentModels, { guid, propertyName }) => componentModels[guid]
    ? propertyName
        ? get(componentModels[guid].propertiesByName, propertyName)
        : componentModels[guid].propertiesByName
    : null);
export const componentTypeSelector = createSelector(viewComponentModelsSelector, (componentModels, { guid }) => componentModels[guid] ? componentModels[guid].type : null);
export const componentLayoutSelector = createSelector(viewComponentModelSelector, (componentModel) => componentModel === null || componentModel === void 0 ? void 0 : componentModel.layout);
export const componentPermissionsSelector = createSelector(viewComponentModelSelector, (componentModel) => componentModel === null || componentModel === void 0 ? void 0 : componentModel.permissions);
export const childDataComponentGuidsSelector = createSelector(viewComponentModelSelector, (componentModel) => componentModel === null || componentModel === void 0 ? void 0 : componentModel.childDataComponentGuids);
export const viewDesignerUISelector = createSelector(viewDesignerState, (viewDesigner) => viewDesigner.ui);
export const isViewDefinitionLoadingSelector = createSelector(viewDesignerUISelector, (ui) => ui.isViewDefinitionLoading);
export const bundleFriendlyNameSelector = createSelector(viewDesignerUISelector, (ui) => ui.friendlyBundleName);
export const currentBundleIdSelector = createSelector(viewDesignerUISelector, (ui) => ui.currentBundleId);
export const viewDefinitionSelector = createSelector(viewDesignerState, (viewDesigner) => viewDesigner.viewDefinition);
export const validationIssuesSelector = createSelector(viewDesignerState, (viewDesigner) => viewDesigner.validation);
export const breadcrumbsSelector = createSelector(viewDesignerState, (viewDesigner) => viewDesigner.breadcrumbs);
export const selectedInspectorTabIdSelector = createSelector(viewDesignerUISelector, (ui) => ui.selectedInspectorTabId);
export const selectedComponentGuidSelector = createSelector(viewDesignerUISelector, (ui) => ui.selectedComponentGuid);
export const areViewModelsReadySelector = createSelector(viewDesignerUISelector, (ui) => ui.areViewModelsReady);
export const selectedComponentPropsSelector = createSelector(selectedComponentGuidSelector, viewComponentModelsSelector, (selectedComponentGuid, componentModels) => {
    if (componentModels && selectedComponentGuid) {
        const componentDesignModel = componentModels[selectedComponentGuid];
        return componentDesignModel ? componentDesignModel.propertiesByName : null;
    }
    else {
        return null;
    }
});
//# sourceMappingURL=view-designer.selectors.js.map