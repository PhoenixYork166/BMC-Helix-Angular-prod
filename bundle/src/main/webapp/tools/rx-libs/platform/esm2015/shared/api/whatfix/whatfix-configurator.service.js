import { Inject, Injectable, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { assign, defaults, includes, isEmpty } from 'lodash';
import { filter, map, shareReplay, switchMapTo, take, tap } from 'rxjs/operators';
import { RxCurrentUserService } from '../user/current-user.service';
import { RxLogService } from '../logging/log.service';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import { combineLatest, of } from 'rxjs';
import { LogCategory } from '../logging/log.types';
import { RX_ADMINISTRATION } from '../administration/administration.constant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../user/current-user.service";
import * as i3 from "../logging/log.service";
import * as i4 from "../caching/global-cache.service";
export class RxWhatfixConfiguratorService {
    constructor(document, rendererFactory, httpClient, rxCurrentUserService, rxLogService, rxGlobalCacheService) {
        this.document = document;
        this.rendererFactory = rendererFactory;
        this.httpClient = httpClient;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxLogService = rxLogService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.isConfigured = false;
        this.renderer = this.rendererFactory.createRenderer(null, null);
        this.defaultConfig$ = combineLatest([
            this.rxGlobalCacheService.getApplicationBundleDescriptor(),
            this.rxCurrentUserService.user$
        ]).pipe(take(1), map(([bundleDescriptor, user]) => {
            const logCategories = this.rxLogService.logCategories;
            return {
                application: {
                    id: this.rxGlobalCacheService.applicationId,
                    version: bundleDescriptor.version
                },
                environment: {
                    isDebug: includes(logCategories, LogCategory.All) || includes(logCategories, LogCategory.Cli)
                },
                user: {
                    id: user.userId,
                    isBusinessAnalyst: this.rxCurrentUserService.isBusinessAnalyst(),
                    isAdministrator: this.rxCurrentUserService.isAdministrator()
                }
            };
        }), shareReplay(1));
        this.isEnabled$ = this.httpClient.get(`${RX_ADMINISTRATION.systemConfigurationUrl}/Whatfix-Disabled`).pipe(map((result) => result.value === 0), shareReplay(1));
    }
    setConfig(accountId, config) {
        if (isEmpty(accountId)) {
            throw new Error('Invalid Whatfix account ID.');
        }
        this.isEnabled$
            .pipe(filter((isEnabled) => Boolean(isEnabled) && !this.isConfigured), tap((isEnabled) => {
            this.rxLogService.debug(isEnabled ? `Whatfix is enabled. Account ID: ${accountId}.` : 'Whatfix is disabled.');
        }), switchMapTo(config ? of(config) : this.defaultConfig$))
            .subscribe((whatfixConfig) => {
            this.isConfigured = true;
            defaults(window, { rx: {} });
            // this global variable will be used by whatfix integration script loaded below
            window['rx'].whatfixConfig = whatfixConfig;
            const url = `//cdn.whatfix.com/prod/${accountId}/embed/embed.nocache.js`;
            this.rxLogService.debug(`Loading whatfix integration script from ${url}.`);
            this.loadScript(url);
        });
    }
    getDefaultConfig() {
        return this.isEnabled$.pipe(filter(Boolean), switchMapTo(this.defaultConfig$));
    }
    loadScript(url) {
        const scriptElement = assign(this.renderer.createElement('script'), {
            type: 'text/javascript',
            async: true,
            src: url
        });
        this.renderer.appendChild(this.document.head, scriptElement);
    }
}
RxWhatfixConfiguratorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWhatfixConfiguratorService, deps: [{ token: DOCUMENT }, { token: i0.RendererFactory2 }, { token: i1.HttpClient }, { token: i2.RxCurrentUserService }, { token: i3.RxLogService }, { token: i4.RxGlobalCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxWhatfixConfiguratorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWhatfixConfiguratorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWhatfixConfiguratorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.RendererFactory2 }, { type: i1.HttpClient }, { type: i2.RxCurrentUserService }, { type: i3.RxLogService }, { type: i4.RxGlobalCacheService }]; } });
//# sourceMappingURL=whatfix-configurator.service.js.map