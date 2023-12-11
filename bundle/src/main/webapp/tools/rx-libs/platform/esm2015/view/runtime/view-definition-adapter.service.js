import { Injectable } from '@angular/core';
import { RX_AVAILABLE_ON_DEVICES_ALL_VALUE, RX_AVAILABLE_ON_DEVICES_PROP_NAME, RxDeviceDetectionService, RxViewLayout } from '@helix/platform/view/api';
import { RxJsonParserService, RxObjectUtilsService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@helix/platform/view/api";
export class RxViewDefinitionAdapterService {
    constructor(rxObjectUtilsService, rxJsonParserService, rxDeviceDetectionService) {
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxDeviceDetectionService = rxDeviceDetectionService;
    }
    // called to make view modifications before the view component adapters are executed
    preProcessViewDefinition(viewDefinition) {
        var _a;
        (_a = viewDefinition.componentDefinitions) === null || _a === void 0 ? void 0 : _a.forEach((childComponentDefinition) => {
            this.expandProperties(childComponentDefinition);
        });
    }
    // called to make view modifications after the view component adapters have been executed
    postProcessViewDefinition(viewDefinition) {
        var _a;
        (_a = viewDefinition.componentDefinitions) === null || _a === void 0 ? void 0 : _a.forEach((childComponentDefinition) => {
            this.filterComponentsForDevice(childComponentDefinition, viewDefinition);
        });
    }
    expandProperties(componentDefinition) {
        componentDefinition.propertiesByName = this.rxObjectUtilsService.expandProperties(componentDefinition.propertiesByName);
        if (componentDefinition.componentDefinitions) {
            componentDefinition.componentDefinitions.forEach((childComponentDefinition) => {
                this.expandProperties(childComponentDefinition);
            });
        }
    }
    filterComponentsForDevice(componentDefinition, parent) {
        var _a;
        const availableOnDevicesProp = this.rxJsonParserService.tryParseJson((_a = componentDefinition.propertiesByName) === null || _a === void 0 ? void 0 : _a[RX_AVAILABLE_ON_DEVICES_PROP_NAME], RX_AVAILABLE_ON_DEVICES_ALL_VALUE) || RX_AVAILABLE_ON_DEVICES_ALL_VALUE;
        if (availableOnDevicesProp.includes(this.rxDeviceDetectionService.currentDevice)) {
            if ('componentDefinitions' in componentDefinition) {
                componentDefinition.componentDefinitions.forEach((childComponentDefinition) => {
                    this.filterComponentsForDevice(childComponentDefinition, componentDefinition);
                });
            }
        }
        else {
            parent.componentDefinitions = parent.componentDefinitions.filter((definition) => definition !== componentDefinition);
            if (parent.layout) {
                const updatedLayout = RxViewLayout.removeChildFromLayout(this.rxJsonParserService.tryParseJson(parent.layout), componentDefinition.guid);
                parent.layout = JSON.stringify(updatedLayout);
            }
        }
    }
}
RxViewDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionAdapterService, deps: [{ token: i1.RxObjectUtilsService }, { token: i1.RxJsonParserService }, { token: i2.RxDeviceDetectionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionAdapterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionAdapterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxObjectUtilsService }, { type: i1.RxJsonParserService }, { type: i2.RxDeviceDetectionService }]; } });
//# sourceMappingURL=view-definition-adapter.service.js.map