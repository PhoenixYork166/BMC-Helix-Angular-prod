import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, tap, shareReplay } from 'rxjs/operators';
import { RxBundleService, RxGlobalCacheService, RxLogService } from '@helix/platform/shared/api';
import { RxViewActionRegistryService, RxViewComponentRegistryService } from '@helix/platform/view/api';
import { forEach, isEmpty, find, filter } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/view/api";
export class AxBundleResolver {
    constructor(rxBundleService, rxLogService, rxGlobalCacheService, rxViewActionRegistryService, rxViewComponentRegistryService) {
        this.rxBundleService = rxBundleService;
        this.rxLogService = rxLogService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
    }
    resolve() {
        let angularBundleDescriptors = [];
        return this.rxGlobalCacheService.getLicensedBundleDescriptors().pipe(map((bundleDescriptors) => bundleDescriptors.filter((bundleDescriptor) => bundleDescriptor.containsAngular)), tap((bundleDescriptors) => (angularBundleDescriptors = bundleDescriptors)), map((bundleDescriptors) => bundleDescriptors.map((bundleDescriptor) => bundleDescriptor.id)), switchMap((bundleIds) => bundleIds.length ? this.rxBundleService.loadBundles(bundleIds, true) : of(bundleIds)), switchMap((bundleContexts) => this.rxViewComponentRegistryService.resolveAsyncDescriptors().pipe(map(() => bundleContexts))), tap((bundleContexts) => {
            const registeredComponents = this.rxViewComponentRegistryService.getRegisteredComponents();
            const registeredActions = this.rxViewActionRegistryService.getRegisteredActions();
            forEach(bundleContexts, (bundleContext) => {
                if (bundleContext.isBundleCompiled) {
                    const bundleDescriptor = find(angularBundleDescriptors, {
                        id: bundleContext.bundleId
                    });
                    if (bundleDescriptor) {
                        const unregisteredComponents = filter(bundleDescriptor.uiOptions.viewComponents, (rxViewComponentName) => !registeredComponents.has(rxViewComponentName));
                        const unregisteredActions = filter(bundleDescriptor.uiOptions.viewActions, (rxViewActionName) => !registeredActions.has(rxViewActionName));
                        if (!isEmpty(unregisteredComponents)) {
                            this.rxLogService.warning(`${bundleDescriptor.id}: Unregistered view components found in the manifest \n ${unregisteredComponents}`);
                        }
                        if (!isEmpty(unregisteredActions)) {
                            this.rxLogService.warning(`${bundleDescriptor.id}: Unregistered view actions found in the manifest \n ${unregisteredActions}`);
                        }
                    }
                }
            });
        }), shareReplay(1));
    }
}
/** @nocollapse */ AxBundleResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxBundleResolver, deps: [{ token: i1.RxBundleService }, { token: i1.RxLogService }, { token: i1.RxGlobalCacheService }, { token: i2.RxViewActionRegistryService }, { token: i2.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ AxBundleResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxBundleResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxBundleResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxBundleService }, { type: i1.RxLogService }, { type: i1.RxGlobalCacheService }, { type: i2.RxViewActionRegistryService }, { type: i2.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=bundle.resolver.js.map