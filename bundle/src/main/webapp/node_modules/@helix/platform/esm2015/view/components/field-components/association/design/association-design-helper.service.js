import { Injectable } from '@angular/core';
import { RX_ASSOCIATED_RECORD_NODE_SIDES, RX_ASSOCIATION_DEFINITION, RxAssociationDefinitionDataPageService } from '@helix/platform/association/api';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { ExpressionInspectorControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType, SelectFormControlComponent, SwitchFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { RxGuidService } from '@helix/platform/utils';
import { RX_DISABLED_PROP_DEFAULT_VALUE, RX_STANDARD_PROPS_DEFAULT_VALUES, RxViewComponentType } from '@helix/platform/view/api';
import { getDisabledFieldInspectorConfig, getStandardPropsInspectorConfigs, validateStandardProps } from '@helix/platform/view/designer';
import { map } from 'rxjs/operators';
import { RX_ASSOCIATION, RxAssociationEditingMode } from '../association.types';
import { AssociationRecordFieldSelectorFormControlComponent } from './association-record-field-selector-field';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@helix/platform/association/api";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@helix/platform/shared/api";
export class AssociationDesignHelperService {
    constructor(rxRecordDefinitionCacheService, rxAssociationDefinitionDataPageService, rxGuidService, rxDefinitionNameService) {
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxAssociationDefinitionDataPageService = rxAssociationDefinitionDataPageService;
        this.rxGuidService = rxGuidService;
        this.rxDefinitionNameService = rxDefinitionNameService;
    }
    getDropdownModeInspectorControls(recordDefinitionField, associationDefinitionFilters) {
        return [
            {
                name: 'fieldId',
                component: SelectFormControlComponent,
                options: {
                    label: 'Field to display',
                    options: recordDefinitionField
                        ? recordDefinitionField
                            .filter((associationDefinitionField) => [
                            RX_RECORD_DEFINITION.resourceTypes.character,
                            RX_RECORD_DEFINITION.resourceTypes.localizedCharacter
                        ].includes(associationDefinitionField.resourceType))
                            .map((associationDefinitionField) => ({
                            id: String(associationDefinitionField.id),
                            name: associationDefinitionField.name
                        }))
                        : [],
                    emptyOption: true,
                    required: true
                }
            },
            {
                name: 'filterByAssociation',
                component: SelectFormControlComponent,
                options: {
                    label: 'Filter by association',
                    options: associationDefinitionFilters
                        ? associationDefinitionFilters.map((associationDefinition) => ({
                            id: associationDefinition.name,
                            name: this.rxDefinitionNameService.getDisplayName(associationDefinition.name)
                        }))
                        : [],
                    emptyOption: true
                }
            }
        ];
    }
    getDisplayedFieldsControl(recordDefinitionFields) {
        return {
            name: 'displayedFields',
            component: AssociationRecordFieldSelectorFormControlComponent,
            options: {
                label: 'Show/Hide fields',
                fields: recordDefinitionFields,
                required: true
            }
        };
    }
    getRecordIdControl() {
        return {
            name: 'recordId',
            component: ExpressionInspectorControlComponent,
            options: {
                label: 'Record ID',
                isRequired: true
            }
        };
    }
    getUseDefaultRolesControl() {
        return {
            name: 'useDefaultRoles',
            component: SwitchFormControlComponent,
            options: {
                label: 'Use default roles'
            }
        };
    }
    getNodeABRoleControls() {
        return [
            {
                name: 'nodeARole',
                component: ExpressionInspectorControlComponent,
                options: {
                    label: 'First record role'
                }
            },
            {
                name: 'nodeBRole',
                component: ExpressionInspectorControlComponent,
                options: {
                    label: 'Second record role'
                }
            }
        ];
    }
    getViewModeInspectorControls() {
        return [
            {
                name: 'viewDefinitionNameForSelect',
                component: RxDefinitionPickerComponent,
                options: {
                    label: 'View for selecting associated records',
                    definitionType: RxDefinitionPickerType.View,
                    required: true
                }
            },
            {
                name: 'viewDefinitionNameForCreate',
                component: RxDefinitionPickerComponent,
                options: {
                    label: 'View for creating associated records',
                    definitionType: RxDefinitionPickerType.View
                }
            }
        ];
    }
    getInitialInspectorControls(expressionConfigurator) {
        return [
            {
                name: 'label',
                component: TextFormControlComponent,
                options: {
                    label: 'Display label'
                }
            },
            getDisabledFieldInspectorConfig(),
            ...getStandardPropsInspectorConfigs()
        ];
    }
    getInitialProperties() {
        return Object.assign(Object.assign({ associatedRecordNodeSide: '', associationDefinitionName: '', displayedFields: [], editingMode: RxAssociationEditingMode.Views, fieldId: null, filterByAssociation: '', label: null, nodeARole: '', nodeBRole: '', recordDefinition: '', recordDefinitionName: '', recordId: '', recordInstance: '', useDefaultRoles: true, viewDefinitionNameForCreate: '', viewDefinitionNameForSelect: '' }, RX_DISABLED_PROP_DEFAULT_VALUE), RX_STANDARD_PROPS_DEFAULT_VALUES);
    }
    getActionButtonDefinition(componentProperties, action, parentGuid) {
        return {
            type: RxViewComponentType.ActionButton,
            guid: this.rxGuidService.generate(),
            propertiesByName: {
                labelKey: action === RX_ASSOCIATION.actions.associate
                    ? 'com.bmc.arsys.rx.client.view-components.record-editor.association.button.associate.label'
                    : 'com.bmc.arsys.rx.client.view-components.record-editor.association.button.create-new.label',
                style: 'secondary',
                action
            },
            children: [
                {
                    guid: this.rxGuidService.generate(),
                    type: RxViewComponentType.Action,
                    propertiesByName: {
                        name: 'rxAvcAssociate',
                        associationViewComponent: `\${view.components.${parentGuid}.api}`,
                        viewDefinitionName: action === RX_ASSOCIATION.actions.associate
                            ? componentProperties.viewDefinitionNameForSelect
                            : componentProperties.viewDefinitionNameForCreate
                    }
                }
            ],
            insertIndex: action === RX_ASSOCIATION.actions.associate ? 0 : 1
        };
    }
    isCardinalityOne(componentProperties, associationDefinitions) {
        const associationDefinition = associationDefinitions.find((association) => association.name === componentProperties.associationDefinitionName);
        return Boolean(associationDefinition &&
            (associationDefinition.cardinality === RX_ASSOCIATION_DEFINITION.cardinality.oneToOne.value ||
                (associationDefinition.cardinality === RX_ASSOCIATION_DEFINITION.cardinality.oneToMany.value &&
                    componentProperties.associatedRecordNodeSide === RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.value)));
    }
    getAvailableAssociations(firstRecordDefinitionName, secondRecordDefinitionName) {
        const getParametersForAssociation = {
            headers: { 'default-bundle-scope': '' },
            params: { firstRecordDefinitionName, secondRecordDefinitionName, requireDependent: true }
        };
        return this.rxAssociationDefinitionDataPageService
            .get(getParametersForAssociation)
            .pipe(map((response) => response.data));
    }
    getRecordDefinition(recordDefinitionToAssociateName) {
        return this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionToAssociateName);
    }
    getFieldsInChildComponentsWithNames(components, availableFields) {
        return components.reduce((acc, definition) => {
            const fieldDescriptor = availableFields.find((fieldDescriptorItem) => fieldDescriptorItem.id === Number(definition.data.fieldId));
            acc.push(Object.assign(Object.assign({}, definition), { data: Object.assign(Object.assign({}, definition.data), { name: fieldDescriptor ? fieldDescriptor.name : definition.data.label }) }));
            return acc;
        }, []);
    }
    cleanEditingModeDependentData(componentProperties) {
        if (componentProperties.editingMode === RxAssociationEditingMode.Dropdown) {
            componentProperties.viewDefinitionNameForSelect = null;
            componentProperties.viewDefinitionNameForCreate = null;
            componentProperties.displayedFields = [];
        }
        else {
            componentProperties.filterByAssociation = null;
            componentProperties.recordId = null;
            componentProperties.fieldId = null;
        }
    }
    getNodeSideOptions(associationDefinition) {
        return associationDefinition.nodeAId === associationDefinition.nodeBId
            ? [
                {
                    id: RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.value,
                    name: associationDefinition.nodeAName || RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.defaultName
                },
                {
                    id: RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value,
                    name: associationDefinition.nodeBName || RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.defaultName
                }
            ]
            : [];
    }
    resetRolesData(componentProperties) {
        componentProperties.useDefaultRoles = false;
        componentProperties.nodeARole = null;
        componentProperties.nodeBRole = null;
    }
    validate(sandbox, properties, associationDefinition, childComponents) {
        const validationIssues = [];
        if (!properties.recordDefinitionName) {
            validationIssues.push(sandbox.createError('Record definition to associate cannot be blank.', 'recordDefinitionName'));
        }
        if (properties.recordDefinitionName && !properties.associationDefinitionName) {
            validationIssues.push(sandbox.createError('Association to Use cannot be blank.', 'associationDefinitionName'));
        }
        if (properties.associationDefinitionName) {
            if (associationDefinition.nodeAId === associationDefinition.nodeBId && !properties.associatedRecordNodeSide) {
                validationIssues.push(sandbox.createError('Associated Record Node Side cannot be blank.', 'fieldId'));
            }
        }
        if (properties.editingMode === RxAssociationEditingMode.Views || !properties.editingMode) {
            if (properties.recordDefinitionName && childComponents.displayedFields.length === 0) {
                validationIssues.push(sandbox.createError('Preview Fields cannot be empty.', 'displayedFields'));
            }
            if (!properties.viewDefinitionNameForSelect) {
                validationIssues.push(sandbox.createError('View for selecting associated records cannot be blank.', 'viewDefinitionNameForSelect'));
            }
        }
        else if (properties.editingMode === RxAssociationEditingMode.Dropdown) {
            if (properties.filterByAssociation && !childComponents.recordId) {
                validationIssues.push(sandbox.createError('Record ID cannot be blank.', 'recordId'));
            }
            if (!properties.fieldId) {
                validationIssues.push(sandbox.createError('Field to display cannot be blank.', 'fieldId'));
            }
        }
        validationIssues.push(...validateStandardProps(properties));
        return validationIssues;
    }
}
AssociationDesignHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignHelperService, deps: [{ token: i1.RxRecordDefinitionCacheService }, { token: i2.RxAssociationDefinitionDataPageService }, { token: i3.RxGuidService }, { token: i4.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Injectable });
AssociationDesignHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignHelperService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignHelperService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxRecordDefinitionCacheService }, { type: i2.RxAssociationDefinitionDataPageService }, { type: i3.RxGuidService }, { type: i4.RxDefinitionNameService }]; } });
//# sourceMappingURL=association-design-helper.service.js.map