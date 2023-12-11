import { createReducer, on } from '@ngrx/store';
import * as ViewDesignerActions from './view-designer.actions';
import * as ViewComponentActions from './view-component.actions';
export function getInitialState() {
    return {
        selectedComponentGuid: null,
        selectedInspectorTabId: 0,
        currentBundleId: null,
        isViewDefinitionLoading: false,
        areViewModelsReady: false,
        friendlyBundleName: null
    };
}
export const reducer = createReducer(getInitialState(), on(ViewDesignerActions.initViewDesigner, (_, { payload }) => {
    return Object.assign(Object.assign({}, getInitialState()), { currentBundleId: payload.bundleId });
}), on(ViewDesignerActions.destroyViewDesigner, getInitialState), on(ViewComponentActions.selectComponent, (state, { guid }) => {
    return Object.assign(Object.assign({}, state), { selectedComponentGuid: guid });
}), on(ViewDesignerActions.selectInspectorTab, (state, { tabId }) => {
    return Object.assign(Object.assign({}, state), { selectedInspectorTabId: tabId });
}), on(ViewComponentActions.componentsRemoved, (state, { guids }) => {
    if (guids.includes(state.selectedComponentGuid)) {
        return Object.assign(Object.assign({}, state), { selectedComponentGuid: null });
    }
    else {
        return Object.assign({}, state);
    }
}), on(ViewDesignerActions.friendlyBundleNameLoadSuccess, (state, { friendlyBundleName }) => {
    return Object.assign(Object.assign({}, state), { friendlyBundleName: friendlyBundleName });
}), on(ViewDesignerActions.friendlyBundleNameLoadError, (state) => {
    return Object.assign(Object.assign({}, state), { friendlyBundleName: null });
}), on(ViewDesignerActions.saveViewDefinition, ViewDesignerActions.loadViewDefinition, (state) => {
    return Object.assign(Object.assign({}, state), { isViewDefinitionLoading: true, areViewModelsReady: false });
}), on(ViewDesignerActions.viewDefinitionSaveSuccess, ViewDesignerActions.viewDefinitionLoadSuccess, ViewDesignerActions.viewDefinitionLoadError, (state) => {
    return Object.assign(Object.assign({}, state), { isViewDefinitionLoading: false });
}), on(ViewDesignerActions.viewDefinitionSaveError, (state) => {
    return Object.assign(Object.assign({}, state), { isViewDefinitionLoading: false, areViewModelsReady: true });
}), on(ViewDesignerActions.viewModelsUpdatedAfterSave, ViewDesignerActions.viewModelsInitialized, (state) => {
    return Object.assign(Object.assign({}, state), { areViewModelsReady: true });
}), on(ViewComponentActions.initializeComponentModels, (state) => {
    return Object.assign(Object.assign({}, state), { areViewModelsReady: false });
}));
export function viewDesignerUiReducer(state, action) {
    return reducer(state, action);
}
//# sourceMappingURL=view-designer-ui.reducer.js.map