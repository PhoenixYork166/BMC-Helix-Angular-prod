import { createReducer, on } from '@ngrx/store';
import * as ConfigDesignerActions from './config-designer.actions';
import { ImpactRowVisibility } from '@helix/platform/config/api';
import { cloneDeep, findIndex, isNull, remove } from 'lodash';
const initialModel = {
    componentLabel: null,
    componentName: null,
    externalLink: null,
    firstMenu: null,
    impactRowVisibility: ImpactRowVisibility.None,
    isSettingAccessibleInApplication: false,
    isSettingAccessibleInInnovationStudio: false,
    parentComponentName: null,
    permissions: [],
    registeredModuleName: null,
    secondMenu: null,
    supportsMultiple: false,
    viewComponent: false,
    viewToOpen: null,
    fields: []
};
export const initialState = {
    bundleId: null,
    definitionName: null,
    isDesignMode: true,
    inspectorTabIndex: 0,
    selectedFieldGuid: null,
    definitionModel: initialModel,
    definitionModelFromDefinition: initialModel,
    parentComponents: [],
    isDirty: false,
    savedDefinitionName: null
};
const reducer = createReducer(initialState, on(ConfigDesignerActions.init, (state, { payload }) => (Object.assign(Object.assign({}, initialState), { bundleId: payload.bundleId, definitionName: payload.definitionName }))), on(ConfigDesignerActions.initDefinitionModel, (state, { definitionModelFromDefinition }) => (Object.assign(Object.assign({}, state), { definitionModelFromDefinition, definitionModel: definitionModelFromDefinition }))), on(ConfigDesignerActions.markDesignerPristine, (state) => (Object.assign(Object.assign({}, state), { isDirty: false }))), on(ConfigDesignerActions.markDesignerDirty, (state) => (Object.assign(Object.assign({}, state), { isDirty: true }))), on(ConfigDesignerActions.loadParentComponentsSuccess, (state, { parentComponents }) => (Object.assign(Object.assign({}, state), { parentComponents }))), on(ConfigDesignerActions.setInspectorTabIndex, (state, { inspectorTabIndex }) => (Object.assign(Object.assign({}, state), { inspectorTabIndex }))), on(ConfigDesignerActions.setSelectedFieldGuid, (state, { guid }) => (Object.assign(Object.assign({}, state), { selectedFieldGuid: guid, inspectorTabIndex: guid && !isNull(state.inspectorTabIndex) ? 1 : state.inspectorTabIndex }))), on(ConfigDesignerActions.clearSelectedFieldGuid, (state) => (Object.assign(Object.assign({}, state), { selectedFieldGuid: null, inspectorTabIndex: !isNull(state.inspectorTabIndex) ? 0 : state.inspectorTabIndex }))), on(ConfigDesignerActions.toggleDesignMode, (state) => (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode }))), on(ConfigDesignerActions.updateDefinitionModelFromDesigner, (state, { definitionModelFromDesigner }) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner) }))), on(ConfigDesignerActions.updateSelectedFieldModel, (state, { selectedFieldModel }) => {
    const definitionModel = cloneDeep(state.definitionModel);
    const fieldIndex = findIndex(definitionModel.fields, { guid: state.selectedFieldGuid });
    definitionModel.fields[fieldIndex] = selectedFieldModel;
    return Object.assign(Object.assign({}, state), { definitionModel });
}), on(ConfigDesignerActions.addFieldModel, (state, { newFieldModel }) => {
    const definitionModel = cloneDeep(state.definitionModel);
    definitionModel.fields.push(newFieldModel);
    return Object.assign(Object.assign({}, state), { definitionModel });
}), on(ConfigDesignerActions.deleteSelectedFieldSuccess, (state) => {
    const definitionModel = cloneDeep(state.definitionModel);
    remove(definitionModel.fields, { guid: state.selectedFieldGuid });
    return Object.assign(Object.assign({}, state), { definitionModel });
}), on(ConfigDesignerActions.saveDefinitionSuccess, (state, { savedDefinitionName }) => (Object.assign(Object.assign({}, state), { savedDefinitionName }))), on(ConfigDesignerActions.destroy, (state) => (Object.assign({}, initialState))));
export function configDesignerModelReducer(state, action) {
    return reducer(state, action);
}
//# sourceMappingURL=config-designer-model.reducer.js.map