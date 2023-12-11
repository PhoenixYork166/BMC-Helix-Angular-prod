import { Injectable } from '@angular/core';
import { RxBundleDataPageService } from '../bundle/bundle-data-page.service';
import { defaults } from 'lodash';
import { ReplaySubject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { RxLogService } from '../logging/log.service';
import { RxBundleLoadType } from '../bundle/bundle-load.types';
import { RX_APPLICATION } from '../application';
import { RxFunctionDataPageService } from '../function/function-data-page.service';
import * as i0 from "@angular/core";
import * as i1 from "../bundle/bundle-data-page.service";
import * as i2 from "../function/function-data-page.service";
import * as i3 from "../logging/log.service";
export class RxGlobalCacheService {
    constructor(rxBundleDataPageService, rxFunctionDataPageService, rxLogService) {
        this.rxBundleDataPageService = rxBundleDataPageService;
        this.rxFunctionDataPageService = rxFunctionDataPageService;
        this.rxLogService = rxLogService;
        this.bundleDescriptorsById = {};
        this.bundleDescriptors = null;
        this.functionDescriptors = null;
        this.applicationIdValue = '';
        this.applicationIdSubject = new ReplaySubject(1);
        this.applicationId$ = this.applicationIdSubject.asObservable();
    }
    get applicationId() {
        return this.applicationIdValue;
    }
    set applicationId(value) {
        if (this.applicationIdValue !== value) {
            this.applicationIdValue = value;
            this.applicationIdSubject.next(value);
            this.rxLogService.debug(`RxGlobalCacheService: application ID set to ${value}`);
        }
    }
    getBundleDescriptors() {
        if (!this.bundleDescriptors) {
            this.bundleDescriptors = this.rxBundleDataPageService.get().pipe(map((bundleDescriptors) => bundleDescriptors.data.map((dataPageData) => {
                var _a;
                const defaultUiOptions = {
                    options: {
                        loadJs: RxBundleLoadType.always,
                        loadCss: RxBundleLoadType.always
                    }
                };
                let uiOptions;
                try {
                    uiOptions = (_a = JSON.parse(dataPageData.uiOptions)) !== null && _a !== void 0 ? _a : defaultUiOptions;
                    if (Boolean(uiOptions.options) && typeof uiOptions.options === 'object') {
                        defaults(uiOptions.options, defaultUiOptions.options);
                    }
                    else {
                        this.rxLogService.warning(`Invalid structure of uiOptions in bundle ${dataPageData.name}.`);
                        uiOptions = defaultUiOptions;
                    }
                }
                catch (e) {
                    this.rxLogService.warning(`Cannot parse uiOptions in bundle ${dataPageData.name}.`);
                    uiOptions = defaultUiOptions;
                }
                return Object.assign(Object.assign({}, dataPageData), { uiOptions });
            })), shareReplay(1));
        }
        return this.bundleDescriptors;
    }
    getFunctionDescriptors() {
        if (!this.functionDescriptors) {
            this.functionDescriptors = this.rxFunctionDataPageService.get().pipe(map((dataPage) => dataPage.data), shareReplay(1));
        }
        return this.functionDescriptors;
    }
    getLicensedBundleDescriptors() {
        return this.getBundleDescriptors().pipe(map((bundleDescriptors) => bundleDescriptors.filter((bundleDescriptor) => bundleDescriptor.isLicensed)));
    }
    getBundleDescriptor(bundleId) {
        if (!this.bundleDescriptorsById[bundleId]) {
            this.bundleDescriptorsById[bundleId] = this.getBundleDescriptors().pipe(map((bundleDescriptors) => bundleDescriptors.find((bundleDescriptor) => bundleDescriptor.id === bundleId)), shareReplay(1));
        }
        return this.bundleDescriptorsById[bundleId];
    }
    getApplicationBundleDescriptor() {
        return this.applicationIdSubject.pipe(switchMap((applicationId) => this.getBundleDescriptor(applicationId)));
    }
    _getBundleFriendlyName(descriptor, defaultValue) {
        return (descriptor === null || descriptor === void 0 ? void 0 : descriptor.friendlyName) || (descriptor === null || descriptor === void 0 ? void 0 : descriptor.id) || defaultValue || '';
    }
    getBundleFriendlyName(bundleId, defaultValue) {
        return this.getBundleDescriptor(bundleId).pipe(map((bundleDescriptor) => this._getBundleFriendlyName(bundleDescriptor, defaultValue)));
    }
    getBundleDisplayName(bundleId) {
        return this.getBundleDescriptor(bundleId).pipe(map((bundleDescriptor) => (this.applicationId !== RX_APPLICATION.innovationStudioBundleId && (bundleDescriptor === null || bundleDescriptor === void 0 ? void 0 : bundleDescriptor.localizedDisplayName)) ||
            this._getBundleFriendlyName(bundleDescriptor)));
    }
    clear() {
        this.bundleDescriptorsById = {};
        this.bundleDescriptors = null;
        this.functionDescriptors = null;
        this.rxLogService.debug('RxGlobalCacheService: cleared.');
    }
}
RxGlobalCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGlobalCacheService, deps: [{ token: i1.RxBundleDataPageService }, { token: i2.RxFunctionDataPageService }, { token: i3.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxGlobalCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGlobalCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGlobalCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxBundleDataPageService }, { type: i2.RxFunctionDataPageService }, { type: i3.RxLogService }]; } });
//# sourceMappingURL=global-cache.service.js.map