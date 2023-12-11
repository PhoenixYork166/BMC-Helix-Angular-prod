import { Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { EMPTY, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RECORD_EDITOR, RecordEditorMode, RecordEditorState } from '../common/record-editor.types';
import { getAvailableOnDevicesInspectorConfig, getStylesFieldInspectorConfig, validateStandardProps } from '@helix/platform/view/designer';
import { ExpressionInspectorControlComponent, GroupButtonFormControlComponent, OptionalExpressionInspectorControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType, SelectFormControlComponent, SwitchFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { flow, get, inRange, isEmpty, isFinite, isNil, omit, omitBy } from 'lodash';
import { FieldsInspectorWidgetComponent } from './components/fields-inspector-widget/fields-inspector-widget.component';
import { RxDefinitionNameService, Tooltip } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService, RxViewComponentType, RxViewDefinitionCacheService, RxViewDefinitionParserService } from '@helix/platform/view/api';
import { RX_ASSOCIATION_DEFINITION, RxAssociationDefinitionDataPageService } from '@helix/platform/association/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@helix/platform/view/api";
import * as i4 from "@helix/platform/association/api";
import * as i5 from "@helix/platform/shared/api";
export class RxRecordEditorDesignHelpersService {
    constructor(rxRecordDefinitionCacheService, rxModalService, rxFieldDefinitionService, rxViewDefinitionCacheService, rxAssociationDefinitionDataPageService, rxDefinitionNameService, rxViewComponentRegistryService, rxViewDefinitionParserService) {
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxModalService = rxModalService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
        this.rxAssociationDefinitionDataPageService = rxAssociationDefinitionDataPageService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.rxViewDefinitionParserService = rxViewDefinitionParserService;
    }
    getRecordFieldDefinitionItems(recordDefinition) {
        return recordDefinition.fieldDefinitions.map((fieldDefinition) => ({
            id: String(fieldDefinition.id),
            name: fieldDefinition.name,
            resourceType: fieldDefinition.resourceType,
            fieldOption: fieldDefinition.fieldOption,
            viewComponentType: this.getViewComponentType(fieldDefinition)
        }));
    }
    getViewComponentType(fieldDefinition) {
        let viewComponentType = RECORD_EDITOR.fieldTypes[fieldDefinition.resourceType];
        if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.character) {
            viewComponentType =
                fieldDefinition.namedListDefinition || inRange(fieldDefinition.maxLength, 1, 255)
                    ? RxViewComponentType.Character
                    : RxViewComponentType.Textarea;
        }
        if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.real) {
            viewComponentType = RxViewComponentType.Decimal;
        }
        return viewComponentType;
    }
    getComponentProperties(properties) {
        const requiredPropertyNames = ['recordDefinitionName', 'mode', 'allowEdit'];
        return flow(
        // Remove design properties.
        (props) => omit(props, 'showReadOnlyState'), 
        // Remove optional properties with empty values.
        (props) => omitBy(props, (propertyValue, propertyName) => !requiredPropertyNames.includes(propertyName) && (isNil(propertyValue) || propertyValue === '')))(properties);
    }
    getRecordDefinition(recordDefinitionName) {
        if (recordDefinitionName) {
            return this.rxRecordDefinitionCacheService
                .getRecordDefinition(recordDefinitionName)
                .pipe(catchError((error) => EMPTY));
        }
        else {
            return of(null);
        }
    }
    validate(sandbox, properties, recordDefinition, childFieldIds, isAssociationRequired = false, isExtensionView = false) {
        const validationIssues = [];
        if (!properties.recordDefinitionName) {
            validationIssues.push(sandbox.createError('Record definition name cannot be blank.', 'recordDefinitionName'));
        }
        if (isAssociationRequired && properties.recordDefinitionName && !properties.associationDefinitionName) {
            validationIssues.push(sandbox.createError('Association to use cannot be blank.', 'associationDefinitionName'));
        }
        if (!isExtensionView && properties.mode === RecordEditorMode.Edit && !properties.recordInstanceId) {
            validationIssues.push(sandbox.createError('Record ID cannot be blank.', 'recordInstanceId'));
        }
        if (recordDefinition && properties.recordDefinitionName && properties.mode === RecordEditorMode.Create) {
            // Add warning for Join Record Definition case
            if (recordDefinition.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType) {
                validationIssues.push(sandbox.createWarning(`You have configured a record editor to create join record instances.
                        Please ensure that one or more processes or rules have been defined to perform the creation
                        of the join record instance.`, undefined, true));
            }
            // System fields in 'CREATE' mode cannot be chosen
            const systemFieldNames = childFieldIds
                .map((selectedFieldId) => recordDefinition.fieldDefinitions.find((fieldDefinition) => fieldDefinition.id === Number(selectedFieldId)))
                .filter(this.rxFieldDefinitionService.isSystemField)
                .map((fieldDefinition) => fieldDefinition.name);
            if (systemFieldNames.length) {
                validationIssues.push(sandbox.createError(`System fields (${systemFieldNames.join(', ')}) cannot be present when Record editor is in Create mode.`));
            }
            // Required fields without default value must be included when in 'CREATE' mode.
            // When in extension view, this validation is only needed when the Record Editor
            // is bound to an associated record, i.e. not the same record as the target Record Editor,
            // which should already contain all such fields.
            if (!isExtensionView || properties.associationDefinitionName) {
                const requiredFieldsWithoutDefaultValues = recordDefinition.fieldDefinitions.filter((fieldDefinition) => {
                    const isLocalizedCharacterField = fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.localizedCharacter;
                    const hasDefaultValue = fieldDefinition.defaultValue ||
                        isFinite(fieldDefinition.defaultValue) ||
                        (isLocalizedCharacterField && !isEmpty(fieldDefinition.defaultValueByLocale));
                    return fieldDefinition.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required && !hasDefaultValue;
                });
                const requiredFieldNames = requiredFieldsWithoutDefaultValues
                    .filter((fieldDefinition) => !childFieldIds.includes(String(fieldDefinition.id)))
                    .map((fieldDefinition) => fieldDefinition.name);
                if (requiredFieldNames.length) {
                    validationIssues.push(sandbox.createError(`Required fields are missing: ${requiredFieldNames.join(', ')}.`));
                }
            }
        }
        validationIssues.push(...validateStandardProps(properties));
        return validationIssues;
    }
    getViewDefinition(viewDefinitionName) {
        if (viewDefinitionName) {
            return this.rxViewDefinitionCacheService.getViewDefinition(viewDefinitionName).pipe(catchError(() => of(null)));
        }
        else {
            return of(null);
        }
    }
    getInspector(recordDefinitionName, mode, showReadOnlyState, recordFieldDefinitionItems = [], isExtensionView = false, associationOptions = [], isAssociationRequired = false, onBeforeModeChange) {
        const inspectorConfig = {
            inspectorSectionConfigs: [
                {
                    label: 'General',
                    controls: [
                        {
                            name: 'name',
                            component: TextFormControlComponent,
                            options: {
                                label: 'Name',
                                tooltip: new Tooltip('Enter a name to uniquely identify the Record editor.')
                            }
                        },
                        {
                            name: 'recordDefinitionName',
                            component: RxDefinitionPickerComponent,
                            options: {
                                label: 'Record definition name',
                                definitionType: RxDefinitionPickerType.StandardDataRecord,
                                required: true,
                                beforeValueChange: (oldValue, newValue) => {
                                    if (Boolean(oldValue)) {
                                        return this.rxModalService.confirm({
                                            title: 'Warning',
                                            modalStyle: RX_MODAL.modalStyles.warning,
                                            message: 'All view components will be removed from the Record editor. Do you want to continue?'
                                        });
                                    }
                                    else {
                                        return Promise.resolve(true);
                                    }
                                }
                            }
                        },
                        {
                            name: 'mode',
                            component: GroupButtonFormControlComponent,
                            options: {
                                label: 'Mode',
                                tooltip: new Tooltip('<b>Record editor modes:</b><br><ul><li>Create mode is for creating new records.</li><li>Edit mode is for updating records.</li><li>Temporary mode is for holding data that does not need to be saved.</li></ul>'),
                                required: true,
                                items: [
                                    {
                                        name: 'Create',
                                        value: RecordEditorMode.Create
                                    },
                                    {
                                        name: 'Edit',
                                        value: RecordEditorMode.Edit
                                    },
                                    {
                                        name: 'Temporary',
                                        value: RecordEditorMode.Temporary
                                    }
                                ],
                                beforeValueChange: onBeforeModeChange
                            }
                        }
                    ]
                }
            ]
        };
        const generalSectionControls = inspectorConfig.inspectorSectionConfigs[0].controls;
        if (mode === RecordEditorMode.Edit && !isExtensionView) {
            generalSectionControls.push({
                name: 'recordInstanceId',
                component: ExpressionInspectorControlComponent,
                options: {
                    label: 'Record ID',
                    tooltip: new Tooltip('Enter the record ID of the record that the users need to edit.'),
                    isRequired: true
                }
            });
            generalSectionControls.push({
                name: 'showReadOnlyState',
                component: SwitchFormControlComponent,
                options: {
                    label: 'Enable read state'
                }
            });
            if (showReadOnlyState) {
                generalSectionControls.push({
                    name: 'defaultState',
                    component: GroupButtonFormControlComponent,
                    options: {
                        label: 'Default state',
                        items: [
                            {
                                name: 'Read',
                                value: RecordEditorState.Read
                            },
                            {
                                name: 'Edit',
                                value: RecordEditorState.Edit
                            }
                        ]
                    }
                });
            }
            generalSectionControls.push({
                name: 'allowEdit',
                component: OptionalExpressionInspectorControlComponent,
                options: {
                    label: 'Allow edit'
                }
            });
        }
        generalSectionControls.push(getAvailableOnDevicesInspectorConfig(), getStylesFieldInspectorConfig());
        if (isExtensionView) {
            generalSectionControls.splice(1, 0, {
                name: 'label',
                component: TextFormControlComponent,
                options: {
                    label: 'Display label',
                    tooltip: new Tooltip(`Enter a Display label for the Record editor. When this view is injected into the view to extend,
              the Display label will be shown above the Record editor's fields. If a Display label is not defined,
              the name of the source application or library will be shown above the fields.`)
                }
            });
            if (recordDefinitionName) {
                generalSectionControls.splice(3, 0, {
                    name: 'associationDefinitionName',
                    component: SelectFormControlComponent,
                    options: {
                        label: 'Association to use',
                        options: associationOptions,
                        emptyOption: !isAssociationRequired,
                        required: isAssociationRequired
                    }
                });
            }
        }
        const formContentsSection = {
            label: 'Form contents',
            controls: [
                {
                    component: FieldsInspectorWidgetComponent,
                    options: {
                        label: 'Selected fields',
                        hideSystemFields: mode === RecordEditorMode.Create
                    }
                }
            ]
        };
        if (recordDefinitionName) {
            inspectorConfig.inspectorSectionConfigs.push(formContentsSection);
        }
        return inspectorConfig;
    }
    getAssociationOptions(firstRecordDefinitionName, secondRecordDefinitionName) {
        if (firstRecordDefinitionName && secondRecordDefinitionName) {
            return this.getAssociations(firstRecordDefinitionName, secondRecordDefinitionName).pipe(map((res) => res.data
                .filter((association) => association.nodeAId === firstRecordDefinitionName)
                .map((association) => ({
                id: association.name,
                name: this.rxDefinitionNameService.getDisplayName(association.name)
            }))));
        }
        else {
            return of([]);
        }
    }
    getAssociations(firstRecordDefinitionName, secondRecordDefinitionName) {
        return this.rxAssociationDefinitionDataPageService.get({
            params: {
                propertySelection: ['name', 'scope', 'nodeAId'],
                firstRecordDefinitionName: firstRecordDefinitionName,
                secondRecordDefinitionName: secondRecordDefinitionName,
                cardinality: RX_ASSOCIATION_DEFINITION.cardinality.oneToOne.value,
                nodeAModality: RX_ASSOCIATION_DEFINITION.modality.required,
                shouldCascadeDelete: true
            },
            headers: { 'default-bundle-scope': '' }
        });
    }
    getTargetRecordEditorProperties(viewDefinition, targetExtensionContainerGuid) {
        let targetRecordEditor;
        if (viewDefinition && targetExtensionContainerGuid) {
            targetRecordEditor = this.rxViewDefinitionParserService.findParentComponentDefinition(viewDefinition, { guid: targetExtensionContainerGuid }, (definition) => definition.type === RxViewComponentType.RecordEditor);
        }
        return get(targetRecordEditor, 'propertiesByName', {});
    }
    confirmSystemFieldRemoval() {
        return from(this.rxModalService.confirm({
            title: 'Warning',
            modalStyle: RX_MODAL.modalStyles.warning,
            message: 'System fields will be removed. Do you want to continue?'
        }));
    }
    getSystemFieldModelGuids(plainFieldModels, recordDefinition) {
        if (!isEmpty(plainFieldModels)) {
            return plainFieldModels.reduce((systemFieldGuids, model) => {
                const fieldDefinition = recordDefinition.fieldDefinitions.find((definition) => String(definition.id) === model.data.fieldId);
                if (this.rxFieldDefinitionService.isSystemField(fieldDefinition)) {
                    systemFieldGuids.push(model.guid);
                }
                return systemFieldGuids;
            }, []);
        }
        else {
            return [];
        }
    }
    isFieldComponent(component) {
        return (![
            RxViewComponentType.Action,
            RxViewComponentType.ActionButton,
            RxViewComponentType.Association,
            RxViewComponentType.AssociatedRecordField
        ].includes(component.type) &&
            Boolean(this.rxViewComponentRegistryService.get(component.type).properties.find((prop) => prop.name === 'fieldId')));
    }
}
RxRecordEditorDesignHelpersService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordEditorDesignHelpersService, deps: [{ token: i1.RxRecordDefinitionCacheService }, { token: i2.RxModalService }, { token: i1.RxFieldDefinitionService }, { token: i3.RxViewDefinitionCacheService }, { token: i4.RxAssociationDefinitionDataPageService }, { token: i5.RxDefinitionNameService }, { token: i3.RxViewComponentRegistryService }, { token: i3.RxViewDefinitionParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordEditorDesignHelpersService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordEditorDesignHelpersService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordEditorDesignHelpersService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxRecordDefinitionCacheService }, { type: i2.RxModalService }, { type: i1.RxFieldDefinitionService }, { type: i3.RxViewDefinitionCacheService }, { type: i4.RxAssociationDefinitionDataPageService }, { type: i5.RxDefinitionNameService }, { type: i3.RxViewComponentRegistryService }, { type: i3.RxViewDefinitionParserService }]; } });
//# sourceMappingURL=record-editor-design-helpers.service.js.map