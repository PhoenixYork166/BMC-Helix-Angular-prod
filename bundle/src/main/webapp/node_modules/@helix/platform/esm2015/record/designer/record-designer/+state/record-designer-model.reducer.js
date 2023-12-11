import { ArchiveType, AssociationSelectionType } from '@helix/platform/record/api';
import { createReducer, on } from '@ngrx/store';
import { chain, isNull, isUndefined } from 'lodash';
import { RX_RECORD_DESIGNER } from '../record-designer.constant';
import * as RecordDesignerActions from './record-designer.actions';
const initialDefinitionModel = {
    isArchivingEnabled: false,
    archiveDescription: null,
    ageQualifierFieldId: null,
    ageQualifierInDays: null,
    archiveRecordDefinitionName: null,
    archiveType: ArchiveType.None,
    includeAttachments: null,
    archiveDataCriteria: null,
    associationsToFollowForArchive: {
        selectionType: AssociationSelectionType.FollowParent,
        specificAssociationNames: []
    },
    isAuditingEnabled: false,
    auditRecordDefinitionName: null,
    auditDataCriteria: null,
    associatedAuditFieldsByAssociationName: {},
    customizationOptions: {
        allowOverlay: false,
        allowFieldsOverlay: false,
        allowIndexesOverlay: false,
        allowOtherPropertiesOverlay: false,
        allowPermissionsOverlay: false,
        fields: [],
        scope: null
    },
    recordInheritanceSelector: {
        inheritanceOptions: {
            isSharedInstanceStorage: false,
            isAbstract: false,
            isFinal: false
        },
        inheritanceDescriptor: {
            inheritingFrom: null,
            isInheritingRules: false,
            isInheritingFieldPermissions: false,
            isInheritingAssociations: false,
            isInheritingFieldAuditOptions: false
        },
        isInheritingCoreFields: false,
        inheritedFieldDefinitions: []
    },
    recordSearchFields: [],
    overlayOperation: null,
    weightedRelevancyTitle: undefined,
    weightedRelevancyKeywords: undefined,
    weightedRelevancyEnvironment: undefined,
    fields: [],
    indexDefinitions: []
};
export const initialState = {
    bundleId: null,
    definitionName: null,
    selectedFieldGuid: null,
    inspectorTabIndex: 0,
    isDesignMode: true,
    definitionModel: initialDefinitionModel,
    definitionModelFromDefinition: initialDefinitionModel,
    isDirty: false,
    savedDefinitionName: null
};
const reducer = createReducer(initialState, on(RecordDesignerActions.init, (state, { payload }) => (Object.assign(Object.assign({}, initialState), { bundleId: payload.bundleId, definitionName: payload.definitionName }))), on(RecordDesignerActions.initDefinitionModel, (state, { definitionModelFromDefinition }) => (Object.assign(Object.assign({}, state), { definitionModelFromDefinition, definitionModel: definitionModelFromDefinition }))), on(RecordDesignerActions.updateDefinitionModelFromDesigner, (state, { definitionModelFromDesigner }) => {
    const updatedDefinitionModel = Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner);
    const inheritedFieldDefinitions = updatedDefinitionModel.recordInheritanceSelector.inheritanceDescriptor
        ? updatedDefinitionModel.recordInheritanceSelector.inheritedFieldDefinitions
        : [];
    return Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, updatedDefinitionModel), { includeAttachments: updatedDefinitionModel.archiveType === RX_RECORD_DESIGNER.archiving.types.deleteSourceRecord.id, fields: chain(updatedDefinitionModel.fields)
                .differenceBy(inheritedFieldDefinitions, 'id')
                .concat(inheritedFieldDefinitions)
                .map((field) => {
                const searchField = updatedDefinitionModel.recordSearchFields.find((searchField) => searchField.id === field.id);
                const searchDefinition = searchField
                    ? searchField.searchDefinition
                    : isUndefined(field.searchDefinition)
                        ? undefined
                        : null;
                const customizationOptionField = updatedDefinitionModel.customizationOptions.allowFieldsOverlay &&
                    updatedDefinitionModel.customizationOptions.fields.find((customizationOptionsField) => customizationOptionsField.id === field.id);
                return Object.assign(Object.assign({}, field), { searchDefinition, allowOtherPropertiesOverlay: customizationOptionField
                        ? customizationOptionField.allowOtherPropertiesOverlay
                        : field.allowOtherPropertiesOverlay, allowPermissionsOverlay: customizationOptionField
                        ? customizationOptionField.allowPermissionsOverlay
                        : field.allowPermissionsOverlay, isInherited: field.isCoreField
                        ? Boolean(updatedDefinitionModel.recordInheritanceSelector.isInheritingCoreFields)
                        : field.isInherited });
            })
                .orderBy('id')
                .value() }) });
}), on(RecordDesignerActions.updateSelectedFieldModel, (state, { selectedFieldModel }) => {
    return Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: state.definitionModel.fields.map((field) => {
                return field.guid === selectedFieldModel.guid
                    ? Object.assign(Object.assign({}, selectedFieldModel), { copy: selectedFieldModel.audit ? true : selectedFieldModel.copy }) : field;
            }) }) });
}), on(RecordDesignerActions.clearSearchFields, (state) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { recordSearchFields: [], fields: state.definitionModel.fields.map((field) => {
            return Object.assign(Object.assign({}, field), { searchDefinition: isUndefined(field.searchDefinition) ? undefined : null });
        }) }) }))), on(RecordDesignerActions.toggleDesignMode, (state) => (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode }))), on(RecordDesignerActions.markDesignerPristine, (state) => (Object.assign(Object.assign({}, state), { isDirty: false }))), on(RecordDesignerActions.markDesignerDirty, (state) => (Object.assign(Object.assign({}, state), { isDirty: true }))), on(RecordDesignerActions.setInspectorTabIndex, (state, { inspectorTabIndex }) => (Object.assign(Object.assign({}, state), { inspectorTabIndex }))), on(RecordDesignerActions.setSelectedFieldGuid, (state, { guid }) => (Object.assign(Object.assign({}, state), { selectedFieldGuid: guid, inspectorTabIndex: guid && !isNull(state.inspectorTabIndex) ? 1 : state.inspectorTabIndex }))), on(RecordDesignerActions.clearSelectedFieldGuid, (state) => (Object.assign(Object.assign({}, state), { selectedFieldGuid: null, inspectorTabIndex: !isNull(state.inspectorTabIndex) ? 0 : state.inspectorTabIndex }))), on(RecordDesignerActions.addFieldModel, (state, { newFieldModel }) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: [...state.definitionModel.fields, Object.assign({}, newFieldModel)] }) }))), on(RecordDesignerActions.addNewFieldModels, (state, { newFieldModels }) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: [...state.definitionModel.fields, ...newFieldModels] }), isDirty: true }))), on(RecordDesignerActions.deleteSelectedFieldSuccess, (state) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: state.definitionModel.fields.filter((field) => field.guid !== state.selectedFieldGuid) }) }))), on(RecordDesignerActions.saveDefinitionSuccess, (state, { savedDefinitionName }) => (Object.assign(Object.assign({}, state), { savedDefinitionName }))), on(RecordDesignerActions.destroy, (state) => (Object.assign({}, initialState))));
export function recordDesignerModelReducer(state, action) {
    return reducer(state, action);
}
//# sourceMappingURL=record-designer-model.reducer.js.map