import { DOCUMENT } from '@angular/common';
import { Compiler, Inject, Injectable, Injector, isDevMode } from '@angular/core';
import { head, isEmpty, isUndefined } from 'lodash';
import { combineLatest, iif, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { RxBundleService } from '../bundle/bundle.service';
import { RxBundleCacheService } from '../caching/bundle-cache.service';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import { RxLocalizationService } from '../localization';
import { RxLogService } from '../logging/log.service';
import { RxComponentCanDeactivateGuard } from '../navigation/component-can-deactivate.guard';
import { RxApplicationLoaderService } from './application-loader.service';
import { RX_APPLICATION } from './application.constant';
import { RX_BUILD_ENVIRONMENT } from '../dev/build-environment.constant';
import * as i0 from "@angular/core";
import * as i1 from "../bundle/bundle.service";
import * as i2 from "../logging/log.service";
import * as i3 from "../caching/bundle-cache.service";
import * as i4 from "../navigation/component-can-deactivate.guard";
import * as i5 from "../caching/global-cache.service";
import * as i6 from "./application-loader.service";
import * as i7 from "../localization";
export class RxApplicationResolver {
    constructor(document, rxBuildEnvironment, injector, compiler, rxBundleService, rxLogService, rxBundleCacheService, rxComponentCanDeactivateGuard, rxGlobalCacheService, rxApplicationLoaderService, rxLocalizationService) {
        this.document = document;
        this.rxBuildEnvironment = rxBuildEnvironment;
        this.injector = injector;
        this.compiler = compiler;
        this.rxBundleService = rxBundleService;
        this.rxLogService = rxLogService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxApplicationLoaderService = rxApplicationLoaderService;
        this.rxLocalizationService = rxLocalizationService;
        const prodBundleDescriptors$ = this.rxGlobalCacheService
            .getBundleDescriptors()
            .pipe(map((bundleDescriptors) => bundleDescriptors.filter((bundleDescriptor) => bundleDescriptor.containsAngular)));
        const devBundleDescriptors$ = prodBundleDescriptors$.pipe(map((bundleDescriptors) => bundleDescriptors.filter((bundleDescriptor) => bundleDescriptor.id !== this.rxBuildEnvironment.bundleId)));
        this.devResolver$ = iif(() => isUndefined(this.rxBuildEnvironment.bundleId), of([]), devBundleDescriptors$);
        this.prodResolver$ = prodBundleDescriptors$;
    }
    resolve(route) {
        const applicationId = head(route.url).path;
        if (this.rxGlobalCacheService.applicationId && applicationId !== this.rxGlobalCacheService.applicationId) {
            this.rxComponentCanDeactivateGuard.disable();
            window.location.reload();
        }
        this.rxGlobalCacheService.applicationId = applicationId;
        const bundleId = route.params['bundleId'];
        if (bundleId !== RX_APPLICATION.innovationStudioBundleId) {
            this.rxBundleCacheService.bundleId = bundleId;
        }
        const useDefaultLang = this.rxGlobalCacheService.applicationId === RX_APPLICATION.innovationStudioBundleId;
        const initTranslations$ = this.rxLocalizationService.initTranslations(useDefaultLang);
        return combineLatest([initTranslations$, this.getResolver()]);
    }
    getResolver() {
        return iif(() => isDevMode(), this.devResolver$, this.prodResolver$).pipe(switchMap((bundles) => {
            if (isEmpty(bundles)) {
                return of(bundles);
            }
            const bundleIds = bundles.map((bundleDescriptor) => bundleDescriptor.id);
            return this.rxBundleService.loadBundles(bundleIds, false);
        }), tap(() => this.rxApplicationLoaderService.removeApplicationLoader()), shareReplay(1));
    }
}
RxApplicationResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationResolver, deps: [{ token: DOCUMENT }, { token: RX_BUILD_ENVIRONMENT }, { token: i0.Injector }, { token: i0.Compiler }, { token: i1.RxBundleService }, { token: i2.RxLogService }, { token: i3.RxBundleCacheService }, { token: i4.RxComponentCanDeactivateGuard }, { token: i5.RxGlobalCacheService }, { token: i6.RxApplicationLoaderService }, { token: i7.RxLocalizationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplicationResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [RX_BUILD_ENVIRONMENT]
                }] }, { type: i0.Injector }, { type: i0.Compiler }, { type: i1.RxBundleService }, { type: i2.RxLogService }, { type: i3.RxBundleCacheService }, { type: i4.RxComponentCanDeactivateGuard }, { type: i5.RxGlobalCacheService }, { type: i6.RxApplicationLoaderService }, { type: i7.RxLocalizationService }]; } });
//# sourceMappingURL=application.resolver.js.map