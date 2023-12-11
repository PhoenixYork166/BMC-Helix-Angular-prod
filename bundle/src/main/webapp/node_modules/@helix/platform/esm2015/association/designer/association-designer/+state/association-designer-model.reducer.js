import { createReducer, on } from '@ngrx/store';
import * as AssociationDesignerActions from './association-designer.actions';
import { RxCardinalityType, RxModalityType } from '@helix/platform/association/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
const initialDefinitionModel = {
    cardinality: [
        {
            value: RxCardinalityType.OneToOne,
            labelKey: 'com.bmc.arsys.rx.client.association.cardinality.one-to-one.label'
        }
    ],
    description: null,
    guid: null,
    isEnabled: true,
    name: null,
    nodeAId: null,
    nodeAKeys: [RX_RECORD_DEFINITION.coreFieldIds.id],
    nodeBKeys: [RX_RECORD_DEFINITION.coreFieldIds.id],
    nodeAModality: RxModalityType.Optional,
    nodeAName: null,
    nodeBId: null,
    nodeBName: null,
    shouldCascadeDelete: false,
    customizationOptions: { allowOverlay: true, scope: 'PUBLIC' }
};
export const initialState = {
    bundleId: null,
    definitionName: null,
    isDesignMode: true,
    definitionModel: initialDefinitionModel,
    definitionModelFromDefinition: initialDefinitionModel,
    isDirty: false,
    isForeignKeyMissing: false,
    isForeignKeyCreated: false,
    savedDefinitionName: null,
    originalDefinition: null
};
const reducer = createReducer(initialState, on(AssociationDesignerActions.init, (state, { payload }) => (Object.assign(Object.assign({}, initialState), { bundleId: payload.bundleId, definitionName: payload.definitionName, isForeignKeyCreated: false }))), on(AssociationDesignerActions.initDefinitionData, (state, { definition, definitionModel }) => (Object.assign(Object.assign({}, state), { definitionModel, definitionModelFromDefinition: definitionModel, originalDefinition: definition }))), on(AssociationDesignerActions.updateDefinitionModelFromDesigner, (state, { definitionModelFromDesigner }) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner) }))), on(AssociationDesignerActions.toggleDesignMode, (state) => (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode }))), on(AssociationDesignerActions.foreignKeyFieldMissingCheckSuccess, (state, { payload }) => (Object.assign(Object.assign({}, state), { isForeignKeyMissing: payload.isForeignKeyFieldMissing, definitionModel: Object.assign(Object.assign({}, state.definitionModel), { nodeBKeys: payload.updatedForeignKeyFieldId
            ? [payload.updatedForeignKeyFieldId]
            : state.definitionModel.nodeBKeys }) }))), on(AssociationDesignerActions.createForeignKeyFieldError, (state) => (Object.assign(Object.assign({}, state), { isForeignKeyCreated: false }))), on(AssociationDesignerActions.createForeignKeyFieldSuccess, (state) => (Object.assign(Object.assign({}, state), { isForeignKeyCreated: true }))), on(AssociationDesignerActions.getCreatedForeignKeyFieldIdSuccess, (state, { fieldId }) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { nodeBKeys: [fieldId] }) }))), on(AssociationDesignerActions.saveDefinitionSuccess, (state, { savedDefinitionName }) => (Object.assign(Object.assign({}, state), { savedDefinitionName }))), on(AssociationDesignerActions.markDesignerPristine, (state) => (Object.assign(Object.assign({}, state), { isDirty: false }))), on(AssociationDesignerActions.markDesignerDirty, (state) => (Object.assign(Object.assign({}, state), { isDirty: true }))), on(AssociationDesignerActions.destroy, (state) => (Object.assign({}, initialState))));
export function associationDesignerModelReducer(state, action) {
    return reducer(state, action);
}
//# sourceMappingURL=association-designer-model.reducer.js.map