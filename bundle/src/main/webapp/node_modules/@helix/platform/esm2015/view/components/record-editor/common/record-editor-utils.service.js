import { Injectable } from '@angular/core';
import { filter, flattenDeep, get, isEmpty, isObject, transform } from 'lodash';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_VIEW_DEFINITION } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export class RxRecordEditorUtilsService {
    getComponentDefinitionsAsFlatList(componentDefinitions) {
        return flattenDeep(transform(componentDefinitions, (result, componentDefinition) => {
            // do not include container view components
            if (componentDefinition.resourceType !== RX_VIEW_DEFINITION.resourceTypes.containerViewComponent) {
                result.push(componentDefinition);
                // do not look inside container view components that have their own recordDefinitionName property,
                // e.g. Association View Component
            }
            else if (!componentDefinition.propertiesByName.recordDefinitionName) {
                result.push(...this.getComponentDefinitionsAsFlatList(componentDefinition.componentDefinitions));
            }
        }));
    }
    getSelectionFieldOptionNames(recordDefinition, recordInstance) {
        const selectionFieldOptionNamesById = {};
        filter(recordDefinition.fieldDefinitions, { resourceType: RX_RECORD_DEFINITION.resourceTypes.selection }).forEach((fieldDefinition) => {
            const selectionFieldLocalizableStrings = get(recordDefinition.localizableStringsByFieldId, fieldDefinition.id);
            const fieldInstance = recordInstance.fieldInstances[fieldDefinition.id];
            if (fieldInstance) {
                if (isObject(fieldDefinition.optionNamesById) &&
                    selectionFieldLocalizableStrings &&
                    isEmpty(selectionFieldLocalizableStrings)) {
                    const localizableStringId = fieldDefinition.optionNamesById[fieldInstance.value];
                    selectionFieldOptionNamesById[fieldDefinition.id] = selectionFieldLocalizableStrings[localizableStringId];
                }
                else {
                    selectionFieldOptionNamesById[fieldDefinition.id] = fieldDefinition.optionNamesById[fieldInstance.value];
                }
            }
            else {
                // field instance is not available for system selection fields,
                // e.g. field 16 (Notifier Listening), when the record instance
                // is retrieved via GET recordinstance/0 API (get new record instance)
                selectionFieldOptionNamesById[fieldDefinition.id] = '';
            }
        });
        return selectionFieldOptionNamesById;
    }
}
RxRecordEditorUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordEditorUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordEditorUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordEditorUtilsService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordEditorUtilsService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=record-editor-utils.service.js.map