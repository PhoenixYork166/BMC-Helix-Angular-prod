import { createReducer, on } from '@ngrx/store';
import * as DocumentDesignerActions from './document-designer.actions';
const initialModel = {
    name: null,
    documentSchema: null,
    customizationOptions: { allowOverlay: null, scope: null }
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
const reducer = createReducer(initialState, on(DocumentDesignerActions.init, (state, { payload }) => (Object.assign(Object.assign({}, initialState), { bundleId: payload.bundleId, definitionName: payload.definitionName }))), on(DocumentDesignerActions.initDefinitionData, (state, { definition, definitionModel }) => (Object.assign(Object.assign({}, state), { definitionModel, definitionModelFromDefinition: definitionModel, originalDefinition: definition }))), on(DocumentDesignerActions.markDesignerPristine, (state) => (Object.assign(Object.assign({}, state), { isDirty: false }))), on(DocumentDesignerActions.markDesignerDirty, (state) => (Object.assign(Object.assign({}, state), { isDirty: true }))), on(DocumentDesignerActions.toggleDesignMode, (state) => (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode }))), on(DocumentDesignerActions.updateDefinitionModelFromDesigner, (state, { definitionModelFromDesigner }) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner) }))), on(DocumentDesignerActions.saveDefinitionSuccess, (state, { savedDefinitionName }) => (Object.assign(Object.assign({}, state), { savedDefinitionName }))), on(DocumentDesignerActions.destroy, (state) => (Object.assign({}, initialState))));
export function documentDesignerModelReducer(state, action) {
    return reducer(state, action);
}
//# sourceMappingURL=document-designer-model.reducer.js.map