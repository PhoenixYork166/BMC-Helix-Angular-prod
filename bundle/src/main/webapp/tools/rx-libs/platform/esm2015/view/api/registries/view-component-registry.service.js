import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { RX_APPLICATION, RxBundleCacheService, RxGlobalCacheService, RxLogService } from '@helix/platform/shared/api';
import { RxStringService } from '@helix/platform/utils';
import { isEmpty, some } from 'lodash';
import { defer, from, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/utils";
export class RxViewComponentRegistryService {
    constructor(componentFactoryResolver, rxGlobalCacheService, rxBundleCacheService, rxStringService, rxLogService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxStringService = rxStringService;
        this.rxLogService = rxLogService;
        // contains all registered component descriptors
        this.componentDescriptors = new Map();
        this.asyncComponentDescriptors = [];
        this.ownerBundleIds$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(map((bundleDescriptors) => bundleDescriptors.reduce((ownerBundleIds, bundleDescriptor) => {
            var _a;
            (_a = bundleDescriptor.uiOptions.viewComponents) === null || _a === void 0 ? void 0 : _a.forEach((viewComponentName) => {
                ownerBundleIds[viewComponentName] = bundleDescriptor.id;
            });
            return ownerBundleIds;
        }, {})), shareReplay(1));
    }
    resolveAsyncDescriptors() {
        if (this.asyncComponentDescriptors.length) {
            this.rxLogService.debug(`Resolving ${this.asyncComponentDescriptors.length} view component descriptor(s)...`);
            return defer(() => from(Promise.all(this.asyncComponentDescriptors).then((descriptors) => {
                descriptors.forEach((descriptor) => {
                    this.registerSync(descriptor);
                });
                this.rxLogService.debug(`Resolved ${descriptors.length} view component descriptors: ${descriptors
                    .map((desc) => desc.type)
                    .join(', ')}.`);
                return this.componentDescriptors;
            })));
        }
        else {
            return of(this.componentDescriptors);
        }
    }
    getRegisteredComponents() {
        return this.componentDescriptors;
    }
    get(type) {
        return this.componentDescriptors.get(type);
    }
    register(...componentDescriptors) {
        componentDescriptors.forEach((descriptor) => {
            this.asyncComponentDescriptors.push(Promise.resolve(descriptor));
        });
    }
    registerSync(descriptor) {
        var _a, _b;
        if ((_a = descriptor.aliases) === null || _a === void 0 ? void 0 : _a.includes(descriptor.type)) {
            this.rxLogService.warning(`Component ${descriptor.type} should not have its type listed in descriptor's aliases property.`);
            descriptor.aliases = descriptor.aliases.filter((type) => type !== descriptor.type);
        }
        this.componentDescriptors.set(descriptor.type, descriptor);
        (_b = descriptor.aliases) === null || _b === void 0 ? void 0 : _b.forEach((type) => {
            this.componentDescriptors.set(type, descriptor);
        });
    }
    isDataComponentDescriptor(componentDescriptor) {
        return Boolean(componentDescriptor.isDataComponent);
    }
    getBundlePageComponents(bundleId, includeAliases = false) {
        return this.getDescriptors(includeAliases).filter((componentDescriptor) => componentDescriptor.isPageComponent && isEmpty(componentDescriptor.availableInBundles)
            ? componentDescriptor.bundleId === bundleId
            : this.rxStringService.isIncluded(bundleId, componentDescriptor.availableInBundles));
    }
    getLicensedComponents(includeAliases = false) {
        return this.rxGlobalCacheService
            .getLicensedBundleDescriptors()
            .pipe(map((bundleDescriptors) => this.getDescriptors(includeAliases).filter((componentDescriptor) => this.isBundleLicensed(componentDescriptor.bundleId, bundleDescriptors) &&
            this.isComponentAvailableInCurrentBundle(componentDescriptor))));
    }
    getComponentOwnerBundleId(viewComponentType) {
        return this.ownerBundleIds$.pipe(map((ownerBundleIds) => ownerBundleIds[viewComponentType]));
    }
    isBundleLicensed(bundleId, bundleDescriptors) {
        return bundleId === RX_APPLICATION.platformBundleId || some(bundleDescriptors, { id: bundleId });
    }
    isComponentAvailableInCurrentBundle(componentDescriptor) {
        return (isEmpty(componentDescriptor.availableInBundles) ||
            this.rxStringService.isIncluded(this.rxBundleCacheService.bundleId, componentDescriptor.availableInBundles));
    }
    getDescriptors(includeAliases = false) {
        return [...this.componentDescriptors.entries()].reduce((result, [type, descriptor]) => {
            var _a;
            if (includeAliases || !((_a = descriptor.aliases) === null || _a === void 0 ? void 0 : _a.includes(type))) {
                result.push(descriptor);
            }
            return result;
        }, []);
    }
}
RxViewComponentRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewComponentRegistryService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxGlobalCacheService }, { token: i1.RxBundleCacheService }, { token: i2.RxStringService }, { token: i1.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewComponentRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewComponentRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewComponentRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxGlobalCacheService }, { type: i1.RxBundleCacheService }, { type: i2.RxStringService }, { type: i1.RxLogService }]; } });
//# sourceMappingURL=view-component-registry.service.js.map