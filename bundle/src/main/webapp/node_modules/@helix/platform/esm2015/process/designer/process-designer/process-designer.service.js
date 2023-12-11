import { Injectable } from '@angular/core';
import { chain, find, reduce, some } from 'lodash';
import { RX_DESIGNER, RX_DESIGNER_ELEMENT_SHAPE, RxActionTypeUtilsService, RxBundleCacheService, RxDesignerCacheService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { RX_PROCESS_DEFINITION, RxProcessDefinitionService, RxProcessElementRegistryService } from '@helix/platform/process/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/process/api";
export class RxProcessDesignerService {
    constructor(rxActionTypeUtilsService, rxBundleCacheService, rxDesignerCacheService, rxGlobalCacheService, rxProcessDefinitionService, rxProcessElementRegistryService) {
        this.rxActionTypeUtilsService = rxActionTypeUtilsService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxDesignerCacheService = rxDesignerCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxProcessDefinitionService = rxProcessDefinitionService;
        this.rxProcessElementRegistryService = rxProcessElementRegistryService;
    }
    buildPalette(actionTypes, bundleDescriptors) {
        const registeredElementNodes = reduce(this.rxProcessElementRegistryService.getAll(), (nodes, registeredElement) => {
            if (registeredElement.displayName) {
                nodes.push({
                    group: registeredElement.group,
                    label: registeredElement.displayName,
                    paletteItem: registeredElement.paletteItem,
                    value: {
                        actionTypeName: this.rxProcessDefinitionService.getServerActionTypeName(registeredElement.type),
                        resourceType: registeredElement.resourceType,
                        type: registeredElement.type
                    }
                });
            }
            return nodes;
        }, []);
        const serverActionNodes = reduce(actionTypes, (nodes, actionType) => {
            const isActionRegistered = some(registeredElementNodes, (registeredElementNode) => registeredElementNode.value.actionTypeName === actionType.actionTypeName);
            if (!isActionRegistered) {
                nodes.push({
                    group: this.rxActionTypeUtilsService.getActionTypeBundleFriendlyName(bundleDescriptors, actionType) ||
                        RX_PROCESS_DEFINITION.standardProcessElementGroups.platformActions.name,
                    label: actionType.displayName || this.rxActionTypeUtilsService.prettifyActionTypeName(actionType.actionTypeName),
                    paletteItem: {
                        border: RX_DESIGNER.paletteItemBorder.solid,
                        icon: {
                            path: actionType.isDeprecated
                                ? RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.info
                                : RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.gear,
                            position: RX_DESIGNER.paletteIconPosition.top
                        },
                        label: RX_DESIGNER.paletteItemLabel.inner,
                        shape: RX_DESIGNER.paletteItemShape.rectangle
                    },
                    value: {
                        actionTypeName: actionType.actionTypeName,
                        resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.processAction,
                        type: this.rxProcessDefinitionService.getServerActionModelType(actionType.actionTypeName)
                    }
                });
            }
            return nodes;
        }, []);
        return chain([...registeredElementNodes, ...serverActionNodes])
            .sortBy('label')
            .reduce((tree, element) => {
            const group = find(tree, { label: element.group });
            if (group) {
                group.children.push(element);
            }
            else {
                tree.push({
                    label: element.group,
                    children: [element]
                });
            }
            return tree;
        }, [])
            .sortBy('label')
            .sortBy((node) => {
            var _a;
            const group = find(RX_PROCESS_DEFINITION.processElementGroups, { name: node.label });
            return (_a = group === null || group === void 0 ? void 0 : group.priority) !== null && _a !== void 0 ? _a : RX_PROCESS_DEFINITION.standardProcessElementGroups.default.priority;
        })
            .value();
    }
}
RxProcessDesignerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDesignerService, deps: [{ token: i1.RxActionTypeUtilsService }, { token: i1.RxBundleCacheService }, { token: i1.RxDesignerCacheService }, { token: i1.RxGlobalCacheService }, { token: i2.RxProcessDefinitionService }, { token: i2.RxProcessElementRegistryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessDesignerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDesignerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDesignerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxActionTypeUtilsService }, { type: i1.RxBundleCacheService }, { type: i1.RxDesignerCacheService }, { type: i1.RxGlobalCacheService }, { type: i2.RxProcessDefinitionService }, { type: i2.RxProcessElementRegistryService }]; } });
//# sourceMappingURL=process-designer.service.js.map