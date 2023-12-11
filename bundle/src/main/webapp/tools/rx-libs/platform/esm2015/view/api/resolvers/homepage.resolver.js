import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RX_APPLICATION, RxComponentCanDeactivateGuard, RxGlobalCacheService, RxLocalizationService, RxSessionService } from '@helix/platform/shared/api';
import { find, findIndex, get, head } from 'lodash';
import { combineLatest, of } from 'rxjs';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { RX_SHELL, RxShellService } from '../shell';
import { RxTreeService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "../shell";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@angular/router";
export class RxHomepageResolver {
    constructor(rxGlobalCacheService, rxShellService, rxTreeService, router, rxSessionService, rxComponentCanDeactivateGuard, rxLocalizationService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxShellService = rxShellService;
        this.rxTreeService = rxTreeService;
        this.router = router;
        this.rxSessionService = rxSessionService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxLocalizationService = rxLocalizationService;
        this.unknownApplicationRoute = '/unknown-application';
    }
    canActivate(route, state) {
        const bundleId = route.paramMap.get('bundleId');
        const applicationId = head(route.url).path;
        const useDefaultLang = applicationId === RX_APPLICATION.innovationStudioBundleId;
        const initTranslations$ = this.rxLocalizationService.initTranslations(useDefaultLang);
        // waiting for translations to resolve to make getShellConfig call with correct lang
        return combineLatest([this.rxSessionService.sessionActive$, initTranslations$]).pipe(switchMap(() => {
            return this.rxGlobalCacheService
                .getBundleDescriptors()
                .pipe(concatMap((bundleDescriptors) => this.getBundleUrl(bundleDescriptors, bundleId)));
        }), tap(() => this.rxComponentCanDeactivateGuard.disable()));
    }
    getBundleUrl(bundleDescriptors, bundleId) {
        if (findIndex(bundleDescriptors, { id: bundleId }) !== -1) {
            return this.rxShellService.getShellConfig(bundleId).pipe(map((shellConfiguration) => {
                const menuItems = get(this.rxTreeService.flattenTree(shellConfiguration, 'navigationBarItems'), '[0].flattenedMenuItems');
                const defaultView = find(menuItems, {
                    type: RX_SHELL.actions.navigateToView
                });
                return this.generateUrl(defaultView, bundleId);
            }));
        }
        else {
            return of(this.router.parseUrl(this.unknownApplicationRoute));
        }
    }
    generateUrl(defaultView, bundleId) {
        return this.router.parseUrl(defaultView
            ? `/${bundleId}/view/${defaultView.viewUrl}`
            : `/${bundleId}/view/${RX_APPLICATION.settingsBundleId}:Unknown Default View Error)}`);
    }
}
RxHomepageResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHomepageResolver, deps: [{ token: i1.RxGlobalCacheService }, { token: i2.RxShellService }, { token: i3.RxTreeService }, { token: i4.Router }, { token: i1.RxSessionService }, { token: i1.RxComponentCanDeactivateGuard }, { token: i1.RxLocalizationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxHomepageResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHomepageResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHomepageResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalCacheService }, { type: i2.RxShellService }, { type: i3.RxTreeService }, { type: i4.Router }, { type: i1.RxSessionService }, { type: i1.RxComponentCanDeactivateGuard }, { type: i1.RxLocalizationService }]; } });
//# sourceMappingURL=homepage.resolver.js.map