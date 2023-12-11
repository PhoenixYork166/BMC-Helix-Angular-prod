import { Injectable } from '@angular/core';
import { RxViewDefinitionParserService } from './view-definition-parser.service';
import { RxViewComponentRegistryService } from '../registries/view-component-registry.service';
import { RxViewActionRegistryService } from '../view-action/view-action-registry.service';
import { RxGuidService, RxTreeService } from '@helix/platform/utils';
import { forEach, isEmpty, set, transform } from 'lodash';
import { RxViewComponentType } from '../domain/view-component.types';
import * as i0 from "@angular/core";
import * as i1 from "./view-definition-parser.service";
import * as i2 from "../registries/view-component-registry.service";
import * as i3 from "../view-action/view-action-registry.service";
import * as i4 from "@helix/platform/utils";
export class RxViewDefinitionLocalizationService {
    constructor(rxViewDefinitionParserService, rxViewComponentRegistryService, rxViewActionRegistryService, rxGuidService, rxTreeService) {
        this.rxViewDefinitionParserService = rxViewDefinitionParserService;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxGuidService = rxGuidService;
        this.rxTreeService = rxTreeService;
    }
    applyLocalization(viewDefinition) {
        const componentDefinitions = this.rxTreeService.flatten(viewDefinition, 'componentDefinitions');
        const localizableStringGuidsByComponentGuid = {};
        // converting Select Group localization for AngularJS views
        // todo can be removed after dropping support of AngularJS version
        this.convertOldSelectGroupLocalization(viewDefinition, componentDefinitions);
        componentDefinitions.forEach((componentDefinition) => {
            const localizableStrings = viewDefinition.localizableStringsByComponentId[componentDefinition.guid];
            const propertyNameToStringGuidMap = this.applyComponentDefinitionLocalization(componentDefinition, localizableStrings);
            if (!isEmpty(propertyNameToStringGuidMap)) {
                localizableStringGuidsByComponentGuid[componentDefinition.guid] = propertyNameToStringGuidMap;
            }
        });
        viewDefinition.localizablePropertyToStringGuidMap = localizableStringGuidsByComponentGuid;
        return viewDefinition;
    }
    extractLocalizableStrings(viewDefinition) {
        const localizableStrings = {};
        const localizablePropertyToStringGuidMap = viewDefinition.localizablePropertyToStringGuidMap || {};
        this.rxViewDefinitionParserService
            .getComponents(viewDefinition, true)
            .map((item) => item.componentDefinition)
            .filter((component) => component.type && component.type !== RxViewComponentType.Page)
            .forEach((component) => {
            const componentDescriptor = this.rxViewComponentRegistryService.get(component.type);
            const propertyNameToStringGuidMap = localizablePropertyToStringGuidMap[component.guid] || {};
            const componentStrings = {};
            let localizablePropertyNames;
            if (componentDescriptor.type === RxViewComponentType.Action) {
                const actionDescriptor = this.rxViewActionRegistryService.get(component.propertiesByName.name);
                localizablePropertyNames = this.getLocalizableActionParameterNames(actionDescriptor);
            }
            else {
                localizablePropertyNames = this.getLocalizableComponentPropertyNames(componentDescriptor);
            }
            localizablePropertyNames.forEach((localizablePropertyName) => {
                if (component.propertiesByName[localizablePropertyName]) {
                    const stringGuid = propertyNameToStringGuidMap[localizablePropertyName] || this.rxGuidService.generate();
                    componentStrings[stringGuid] = component.propertiesByName[localizablePropertyName];
                    component.propertiesByName[localizablePropertyName] = stringGuid;
                }
            });
            if (!isEmpty(componentStrings)) {
                localizableStrings[component.guid] = componentStrings;
            }
        });
        return localizableStrings;
    }
    applyComponentDefinitionLocalization(componentDefinition, localizableStrings = {}) {
        return transform(componentDefinition.propertiesByName, (result, propertyValue, propertyName) => {
            if (localizableStrings[propertyValue]) {
                componentDefinition.propertiesByName[propertyName] = localizableStrings[propertyValue];
                result[propertyName] = propertyValue;
            }
        }, {});
    }
    getLocalizableActionParameterNames(actionDescriptor) {
        return (actionDescriptor.parameters || []).reduce((parameterNames, parameter) => {
            if (parameter.localizable) {
                parameterNames.push(parameter.name);
            }
            else if (parameter.attributes) {
                forEach(parameter.attributes, (attribute) => {
                    if (attribute.localizable) {
                        parameterNames.push(`${parameter.name}.${attribute.name}`);
                    }
                });
            }
            return parameterNames;
        }, []);
    }
    getLocalizableComponentPropertyNames(componentDescriptor) {
        return (componentDescriptor.properties || []).filter((prop) => prop.localizable).map((prop) => prop.name);
    }
    // this method used to move SelectGroupField localization from SelectGroup localization object
    // to own one in same way as this done for any other component.
    // Method should handle only AngularJS views that has legacy labelId property in SelectGroupField
    convertOldSelectGroupLocalization(viewDefinition, componentDefinitions) {
        componentDefinitions
            .filter((component) => component.type === RxViewComponentType.SelectGroup)
            .forEach((selectGroup) => {
            selectGroup.componentDefinitions.forEach((selectGroupField) => {
                if (selectGroupField.propertiesByName.labelId) {
                    const oldStringGuid = selectGroupField.propertiesByName.labelId;
                    const newStringGuid = this.rxGuidService.generate();
                    const localizedLabel = viewDefinition.localizableStringsByComponentId[selectGroup.guid][oldStringGuid];
                    // setting localized string guid same way as for other components
                    selectGroupField.propertiesByName.label = newStringGuid;
                    // moving localization from SelectGroup to SelectGroupField object with new guid
                    // to avoid unexpected server behaviour
                    set(viewDefinition.localizableStringsByComponentId, [selectGroupField.guid, newStringGuid], localizedLabel);
                    // removing legacy labelId
                    delete selectGroupField.propertiesByName.labelId;
                    // removing string from select group localization object
                    delete viewDefinition.localizableStringsByComponentId[selectGroup.guid][oldStringGuid];
                }
            });
            // removing select group localization object if empty
            if (isEmpty(viewDefinition.localizableStringsByComponentId[selectGroup.guid])) {
                delete viewDefinition.localizableStringsByComponentId[selectGroup.guid];
            }
        });
    }
}
RxViewDefinitionLocalizationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionLocalizationService, deps: [{ token: i1.RxViewDefinitionParserService }, { token: i2.RxViewComponentRegistryService }, { token: i3.RxViewActionRegistryService }, { token: i4.RxGuidService }, { token: i4.RxTreeService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDefinitionLocalizationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionLocalizationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionLocalizationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewDefinitionParserService }, { type: i2.RxViewComponentRegistryService }, { type: i3.RxViewActionRegistryService }, { type: i4.RxGuidService }, { type: i4.RxTreeService }]; } });
//# sourceMappingURL=view-definition-localization.service.js.map