import { Injectable } from '@angular/core';
import { RX_APPLICATION, RxBundleCacheService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { isEmpty, some } from 'lodash';
import { RxStringService } from '@helix/platform/utils';
import { map, shareReplay } from 'rxjs/operators';
import { ViewComponentPropertyType } from '../registries/view-component-descriptor.types';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/utils";
export class RxViewActionRegistryService {
    constructor(rxGlobalCacheService, rxStringService, rxBundleCacheService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxStringService = rxStringService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.viewActionDescriptors = new Map();
        this.designManagers = new Map();
        this.ownerBundleIds$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(map((bundleDescriptors) => bundleDescriptors.reduce((ownerBundleIds, bundleDescriptor) => {
            var _a;
            (_a = bundleDescriptor.uiOptions.viewActions) === null || _a === void 0 ? void 0 : _a.forEach((viewActionName) => {
                ownerBundleIds[viewActionName] = bundleDescriptor.id;
            });
            return ownerBundleIds;
        }, {})), shareReplay(1));
    }
    register(viewActionDescriptor) {
        if (!viewActionDescriptor.label) {
            viewActionDescriptor.label = viewActionDescriptor.name;
        }
        viewActionDescriptor.parameters = viewActionDescriptor.parameters || [];
        viewActionDescriptor.parameters.push({
            name: '$condition$',
            enableExpressionEvaluation: true
        });
        viewActionDescriptor.parameters.push({
            name: 'index',
            designType: ViewComponentPropertyType.Number
        });
        this.viewActionDescriptors.set(viewActionDescriptor.name, viewActionDescriptor);
    }
    get(actionName) {
        return this.viewActionDescriptors.get(actionName);
    }
    getRegisteredActions() {
        return this.viewActionDescriptors;
    }
    getLicensedActions() {
        return this.rxGlobalCacheService.getLicensedBundleDescriptors().pipe(map((bundleDescriptors) => {
            return Array.from(this.viewActionDescriptors.values()).filter((actionDescriptor) => {
                return (this.isBundleLicensed(actionDescriptor.bundleId, bundleDescriptors) &&
                    this.isActionAvailableInCurrentBundle(actionDescriptor));
            });
        }));
    }
    getActionOwnerBundleId(viewActionName) {
        return this.ownerBundleIds$.pipe(map((ownerBundleIds) => ownerBundleIds[viewActionName]));
    }
    isBundleLicensed(bundleId, bundleDescriptors) {
        return bundleId === RX_APPLICATION.platformBundleId || some(bundleDescriptors, { id: bundleId });
    }
    isActionAvailableInCurrentBundle(actionDescriptor) {
        return (isEmpty(actionDescriptor.availableInBundles) ||
            this.rxStringService.isIncluded(this.rxBundleCacheService.bundleId, actionDescriptor.availableInBundles));
    }
    registerUnknownAction(unknownActionName) {
        let unknownActionDescriptor = this.get(unknownActionName);
        if (!unknownActionDescriptor) {
            unknownActionDescriptor = Object.assign(Object.assign({}, this.get('rxUnknownViewAction')), { name: unknownActionName });
            this.register(unknownActionDescriptor);
        }
        return unknownActionDescriptor;
    }
    registerDesignManager(actionName, designManagerService) {
        this.designManagers.set(actionName, designManagerService);
    }
    getDesignManager(actionName) {
        var _a, _b;
        return (_a = this.designManagers.get(actionName)) !== null && _a !== void 0 ? _a : (_b = this.viewActionDescriptors.get(actionName)) === null || _b === void 0 ? void 0 : _b.designManager;
    }
}
RxViewActionRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionRegistryService, deps: [{ token: i1.RxGlobalCacheService }, { token: i2.RxStringService }, { token: i1.RxBundleCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewActionRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalCacheService }, { type: i2.RxStringService }, { type: i1.RxBundleCacheService }]; } });
//# sourceMappingURL=view-action-registry.service.js.map