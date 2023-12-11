import { Injectable } from '@angular/core';
import { RxViewComponentType, RxViewDefinitionLocalizationService } from '@helix/platform/view/api';
import { isArray, isBoolean, isFunction, isNumber, isObject, isPlainObject, isUndefined, omit, transform, has } from 'lodash';
import { RxBundleCacheService, RxDefinitionNameService } from '@helix/platform/shared/api';
import { getChildGuidsFromModel } from './layout-helpers';
import { RxViewDesignerModels } from './view-designer-models.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "./view-designer-models.service";
import * as i3 from "@helix/platform/view/api";
export class RxViewDefinitionGeneratorService {
    constructor(rxDefinitionNameService, rxBundleCacheService, viewDesignerModels, rxViewDefinitionLocalizationService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.viewDesignerModels = viewDesignerModels;
        this.rxViewDefinitionLocalizationService = rxViewDefinitionLocalizationService;
    }
    generate(viewModel, componentModels, forSave = false) {
        const clonedViewModel = viewModel;
        const viewDefinition = omit(clonedViewModel, 'displayName', 'layout', 'layoutName', 'pageComponent', 'isAngularJsView');
        viewDefinition.name =
            viewDefinition.name ||
                this.rxDefinitionNameService.getDefinitionName(this.rxBundleCacheService.bundleId, clonedViewModel.displayName);
        viewDefinition.componentDefinitions = this.generateComponentDefinitions(clonedViewModel, componentModels);
        if (forSave) {
            viewDefinition.localizableStringsByComponentId =
                this.rxViewDefinitionLocalizationService.extractLocalizableStrings(viewDefinition);
        }
        delete viewDefinition.localizablePropertyToStringGuidMap;
        viewDefinition.layout = JSON.stringify(clonedViewModel.layout);
        return viewDefinition;
    }
    generateComponentDefinitions(model, componentModelItems) {
        return getChildGuidsFromModel(model).map((guid) => {
            const componentDefinition = Object.assign({}, componentModelItems[guid]);
            const componentModel = this.viewDesignerModels.get(guid);
            const propertiesByName = isFunction(componentModel === null || componentModel === void 0 ? void 0 : componentModel.getPropertiesByName)
                ? componentModel.getPropertiesByName(componentDefinition.propertiesByName)
                : componentDefinition.propertiesByName;
            componentDefinition.propertiesByName = this.serializeComponentDefinitionProperties(propertiesByName);
            delete componentDefinition.parentGuid;
            // Move name out of propertiesByName for all components except actions.
            if (componentDefinition.type !== RxViewComponentType.Action &&
                has(componentDefinition.propertiesByName, 'name')) {
                if (componentDefinition.propertiesByName.name) {
                    componentDefinition.name = componentDefinition.propertiesByName.name;
                }
                delete componentDefinition.propertiesByName.name;
            }
            if (componentDefinition.layout || componentDefinition.childDataComponentGuids) {
                componentDefinition.componentDefinitions = this.generateComponentDefinitions(componentDefinition, componentModelItems);
                delete componentDefinition.childDataComponentGuids;
            }
            if (componentDefinition.layout) {
                componentDefinition.layout = JSON.stringify(componentDefinition.layout);
            }
            return componentDefinition;
        });
    }
    serializeComponentDefinitionProperties(componentProperties) {
        return transform(componentProperties, (result, value, key) => {
            switch (true) {
                case isArray(value):
                case isNumber(value):
                case isBoolean(value):
                case isPlainObject(value):
                    result[key] = JSON.stringify(value);
                    break;
                case isObject(value):
                    // support Set, Map
                    const obj = Object.create(null);
                    value.forEach((v, k) => (obj[k] = v));
                    result[key] = JSON.stringify(obj);
                    break;
                case isFunction(value):
                case isUndefined(value):
                    result[key] = null;
                    break;
                default:
                    result[key] = value;
                    break;
            }
        }, {});
    }
}
RxViewDefinitionGeneratorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionGeneratorService, deps: [{ token: i1.RxDefinitionNameService }, { token: i1.RxBundleCacheService }, { token: i2.RxViewDesignerModels }, { token: i3.RxViewDefinitionLocalizationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDefinitionGeneratorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionGeneratorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionGeneratorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionNameService }, { type: i1.RxBundleCacheService }, { type: i2.RxViewDesignerModels }, { type: i3.RxViewDefinitionLocalizationService }]; } });
//# sourceMappingURL=view-definition-generator.service.js.map