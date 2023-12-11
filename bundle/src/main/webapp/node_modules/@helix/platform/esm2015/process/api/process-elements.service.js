import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { filter, find, forEach, map as _map, pick } from 'lodash';
import { RxActionTypeUtilsService, RxBundleCacheService, RxDefinitionNameService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { RxStringService } from '@helix/platform/utils';
import { RX_PROCESS_DEFINITION } from './process-definition.constant';
import { ElementVisibilityOptions } from './process-element.types';
import { RxCallActivityRegistryService } from './call-activity-registry.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "./call-activity-registry.service";
import * as i3 from "@helix/platform/utils";
export class RxProcessElementsService {
    constructor(rxActionTypeUtilsService, rxBundleCacheService, rxCallActivityRegistryService, rxDefinitionNameService, rxGlobalCacheService, rxStringService) {
        this.rxActionTypeUtilsService = rxActionTypeUtilsService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxCallActivityRegistryService = rxCallActivityRegistryService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxStringService = rxStringService;
    }
    getActionElements(actionResourceType) {
        return forkJoin([
            this.rxBundleCacheService.getActionTypes(),
            this.rxGlobalCacheService.getBundleDescriptors()
        ]).pipe(map(([actionTypes, bundleDescriptors]) => {
            return _map(actionTypes, (actionType) => {
                return {
                    group: this.rxActionTypeUtilsService.getActionTypeBundleFriendlyName(bundleDescriptors, actionType) ||
                        'Platform actions',
                    label: actionType.displayName || this.rxActionTypeUtilsService.prettifyActionTypeName(actionType.actionTypeName),
                    value: {
                        actionTypeName: actionType.actionTypeName,
                        resourceType: actionResourceType
                    }
                };
            });
        }));
    }
    getCallActivityElements() {
        return forkJoin([this.rxGlobalCacheService.getBundleDescriptors(), this.getVisibleCallActivities()]).pipe(map(([bundleDescriptors, visibleCallActivities]) => {
            const callActivityElements = [];
            forEach(visibleCallActivities, (visibleCallActivity) => {
                const bundle = find(bundleDescriptors, {
                    id: this.rxDefinitionNameService.getBundleId(visibleCallActivity.processDefinitionName)
                });
                if (bundle) {
                    callActivityElements.push({
                        group: bundle.friendlyName,
                        label: visibleCallActivity.displayName ||
                            this.rxStringService.prettify(this.rxDefinitionNameService.getDisplayName(visibleCallActivity.processDefinitionName)),
                        value: {
                            resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.callActivity,
                            calledProcessDefinitionName: visibleCallActivity.processDefinitionName
                        }
                    });
                }
            });
            return callActivityElements;
        }));
    }
    getProcessElements() {
        return [
            this.getActionElements(RX_PROCESS_DEFINITION.processElementResourceTypes.processAction),
            this.getCallActivityElements(),
            this.getStandardProcessElements()
        ];
    }
    getStandardProcessElements() {
        return of(_map(RX_PROCESS_DEFINITION.standardProcessElements, (element) => {
            let label;
            if (element.resourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.processAction) {
                label = this.rxActionTypeUtilsService.prettifyActionTypeName(element.actionTypeName);
            }
            else if (element.eventResourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.errorEvent) {
                const errorEventLabel = RX_PROCESS_DEFINITION.processElementNamesByResourceType[RX_PROCESS_DEFINITION.processElementResourceTypes.errorEvent];
                const boundaryEventLabel = RX_PROCESS_DEFINITION.processElementNamesByResourceType[RX_PROCESS_DEFINITION.processElementResourceTypes.boundaryEvent];
                const endEventLabel = RX_PROCESS_DEFINITION.processElementNamesByResourceType[RX_PROCESS_DEFINITION.processElementResourceTypes.endEvent];
                label =
                    element.resourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.boundaryEvent
                        ? `${errorEventLabel} ${boundaryEventLabel}`
                        : `${errorEventLabel} ${endEventLabel}`;
            }
            else if (element.resourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.boundaryEvent) {
                label = RX_PROCESS_DEFINITION.processElementNamesByResourceType[element.eventResourceType];
            }
            else {
                label = RX_PROCESS_DEFINITION.processElementNamesByResourceType[element.resourceType];
            }
            return {
                group: element.group,
                label: label,
                value: pick(element, RX_PROCESS_DEFINITION.processElementConfigurationProperties)
            };
        }));
    }
    getVisibleCallActivities() {
        return of(filter(Array.from(this.rxCallActivityRegistryService.getRegisteredCallActivities()), {
            visibility: ElementVisibilityOptions.Always
        }));
    }
}
RxProcessElementsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementsService, deps: [{ token: i1.RxActionTypeUtilsService }, { token: i1.RxBundleCacheService }, { token: i2.RxCallActivityRegistryService }, { token: i1.RxDefinitionNameService }, { token: i1.RxGlobalCacheService }, { token: i3.RxStringService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessElementsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxActionTypeUtilsService }, { type: i1.RxBundleCacheService }, { type: i2.RxCallActivityRegistryService }, { type: i1.RxDefinitionNameService }, { type: i1.RxGlobalCacheService }, { type: i3.RxStringService }]; } });
//# sourceMappingURL=process-elements.service.js.map