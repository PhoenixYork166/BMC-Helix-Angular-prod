import { Injectable } from '@angular/core';
import { RxViewComponentType, RxViewDefinitionParserService } from '@helix/platform/view/api';
import { filter, flow, map, sortBy } from 'lodash';
import { RX_ASSOCIATION } from '../association.types';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RxAssociationDefinitionAdapterService {
    constructor(rxViewDefinitionParserService) {
        this.rxViewDefinitionParserService = rxViewDefinitionParserService;
    }
    adaptDefinition(associationComponentDefinition, viewDefinition) {
        const targetRecordEditorComponentDefinition = this.getTargetRecordEditorComponentDefinition(viewDefinition, associationComponentDefinition);
        const childButtons = associationComponentDefinition.componentDefinitions.filter((component) => component.type === RxViewComponentType.ActionButton);
        const childSortedButtons = sortBy(childButtons, (componentDefinition) => componentDefinition.propertiesByName.action === RX_ASSOCIATION.actions.associate ? 0 : 1);
        associationComponentDefinition.propertiesByName.state = targetRecordEditorComponentDefinition.propertiesByName.mode;
        associationComponentDefinition.propertiesByName.useDefaultRoles =
            associationComponentDefinition.propertiesByName.useDefaultRoles === 'true';
        associationComponentDefinition.propertiesByName.fields = flow((componentDefinitions) => filter(componentDefinitions, {
            type: RX_ASSOCIATION.componentTypes.associatedRecordField
        }), (componentDefinitions) => map(componentDefinitions, (fieldComponentDefinition) => ({
            fieldId: fieldComponentDefinition.propertiesByName.fieldId,
            label: fieldComponentDefinition.propertiesByName.label,
            index: Number(fieldComponentDefinition.propertiesByName.index)
        })), (componentDefinitions) => sortBy(componentDefinitions, 'index'))(associationComponentDefinition.componentDefinitions);
        associationComponentDefinition.layout = JSON.stringify({
            outlets: [
                {
                    name: 'DEFAULT',
                    columns: [
                        {
                            children: childSortedButtons.map((component) => component.guid)
                        }
                    ]
                }
            ]
        });
        associationComponentDefinition.componentDefinitions
            .filter((componentDefinition) => componentDefinition.type === RxViewComponentType.ActionButton)
            .forEach((componentDefinition) => {
            componentDefinition.propertiesByName.disabled =
                associationComponentDefinition.propertiesByName.disabled +
                    ' OR ${view.components.' +
                    associationComponentDefinition.guid +
                    '.isDisabled}';
        });
    }
    getTargetRecordEditorComponentDefinition(viewDefinition, extensionContainerComponentDefinition) {
        return this.rxViewDefinitionParserService.findParentComponentDefinition(viewDefinition, extensionContainerComponentDefinition, (parentComponentDefinition) => parentComponentDefinition.type === RxViewComponentType.RecordEditor);
    }
}
RxAssociationDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionAdapterService, deps: [{ token: i1.RxViewDefinitionParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociationDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionAdapterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxViewDefinitionParserService }]; } });
//# sourceMappingURL=association-definition-adapter.service.js.map