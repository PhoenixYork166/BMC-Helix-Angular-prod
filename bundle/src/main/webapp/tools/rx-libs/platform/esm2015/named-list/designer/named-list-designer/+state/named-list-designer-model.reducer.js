import { createReducer, on } from '@ngrx/store';
import * as NamedListDesignerActions from './named-list-designer.actions';
const initialModel = {
    name: null,
    customizationOptions: {
        allowOverlay: false,
        overlayGroupId: null,
        overlayDescriptor: null,
        scope: 'BUNDLE',
        isDisabled: false,
        definitionTypeDisplayName: null
    }
};
export const initialState = {
    bundleId: null,
    definitionName: null,
    isDesignMode: true,
    definitionModel: initialModel,
    definitionModelFromDefinition: initialModel,
    isDirty: false,
    savedDefinitionName: null,
    originalDefinition: null
};
const reducer = createReducer(initialState, on(NamedListDesignerActions.init, (state, { payload }) => (Object.assign(Object.assign({}, initialState), { bundleId: payload.bundleId, definitionName: payload.definitionName }))), on(NamedListDesignerActions.initDefinitionData, (state, { definition, definitionModel }) => (Object.assign(Object.assign({}, state), { definitionModel, definitionModelFromDefinition: definitionModel, originalDefinition: definition }))), on(NamedListDesignerActions.clearFields, (state) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: [], queryCriteria: null, labelFieldId: null, valueFieldId: null }) }))), on(NamedListDesignerActions.markDesignerPristine, (state) => (Object.assign(Object.assign({}, state), { isDirty: false }))), on(NamedListDesignerActions.markDesignerDirty, (state) => (Object.assign(Object.assign({}, state), { isDirty: true }))), on(NamedListDesignerActions.toggleDesignMode, (state) => (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode }))), on(NamedListDesignerActions.updateDefinitionModelFromDesigner, (state, { definitionModelFromDesigner }) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner) }))), on(NamedListDesignerActions.saveDefinitionSuccess, (state, { savedDefinitionName }) => (Object.assign(Object.assign({}, state), { savedDefinitionName }))), on(NamedListDesignerActions.destroy, (state) => (Object.assign({}, initialState))));
export function namedListDesignerModelReducer(state, action) {
    return reducer(state, action);
}
//# sourceMappingURL=named-list-designer-model.reducer.js.map