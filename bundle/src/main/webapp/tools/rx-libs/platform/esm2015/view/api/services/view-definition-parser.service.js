import { Injectable } from '@angular/core';
import { find } from 'lodash';
import { RxTreeService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
export class RxViewDefinitionParserService {
    constructor(rxTreeService) {
        this.rxTreeService = rxTreeService;
    }
    getComponents(definition, skipInitial = false) {
        const components = [];
        if (!skipInitial) {
            components.push({
                componentDefinition: definition,
                parentComponentDefinition: null
            });
        }
        this.processComponents(definition.componentDefinitions, components, definition);
        return components;
    }
    processComponents(componentDefinitions, components, parentComponentDefinition) {
        componentDefinitions.forEach((componentDefinition) => {
            components.push({ componentDefinition, parentComponentDefinition });
            if (this.isContainerViewComponentDefinition(componentDefinition)) {
                this.processComponents(componentDefinition.componentDefinitions, components, componentDefinition);
            }
        });
    }
    isContainerViewComponentDefinition(componentDefinition) {
        return componentDefinition.componentDefinitions !== undefined;
    }
    findParentComponentDefinition(viewDefinition, childComponentDefinition, predicate) {
        const componentDefinitionsWithParent = this.getComponents(viewDefinition);
        let parentComponentDefinition;
        let childComponentDefinitionWithParent = componentDefinitionsWithParent.find((pair) => pair.componentDefinition.guid === childComponentDefinition.guid);
        while (childComponentDefinitionWithParent && !parentComponentDefinition) {
            if (predicate(childComponentDefinitionWithParent.componentDefinition)) {
                parentComponentDefinition = childComponentDefinitionWithParent.componentDefinition;
            }
            else {
                childComponentDefinitionWithParent = componentDefinitionsWithParent.find((pair) => pair.componentDefinition.guid === childComponentDefinitionWithParent.parentComponentDefinition.guid);
            }
        }
        return parentComponentDefinition;
    }
    findViewComponent(viewComponentContainer, predicate) {
        return find(this.rxTreeService.flattenTree(viewComponentContainer, 'componentDefinitions'), predicate);
    }
}
RxViewDefinitionParserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionParserService, deps: [{ token: i1.RxTreeService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDefinitionParserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionParserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionParserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxTreeService }]; } });
//# sourceMappingURL=view-definition-parser.service.js.map