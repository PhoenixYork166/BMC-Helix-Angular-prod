import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Compiler, Inject, Injectable, Injector } from '@angular/core';
import { camelCase, includes, upperFirst } from 'lodash';
import { forkJoin, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import { RxLogService } from '../logging/log.service';
import { RxBundleLoadType } from './bundle-load.types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../caching/global-cache.service";
import * as i3 from "../logging/log.service";
export class RxBundleService {
    constructor(document, compiler, httpClient, injector, rxGlobalCacheService, rxLogService) {
        this.document = document;
        this.compiler = compiler;
        this.httpClient = httpClient;
        this.injector = injector;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxLogService = rxLogService;
        this.baseUrl = '/api/rx/application/bundle/bundledescriptor/';
        this.bundleJs = {};
        this.bundleCss = {};
    }
    get(bundleId, options) {
        const url = this.baseUrl + bundleId;
        return this.httpClient.get(url, options);
    }
    // During login we issue a call to bundle descriptor rest api to get the current bundle
    // information. If the user is not logged in yet we have to call the jsonp
    // version that does not return an object but a method passing the object:
    // rxLoadBundles({...}).
    // Since we do not have this method in Angular (not in bootstrap.js), the workaround is to
    // read the jsonp answer as text, extract the content withing the method call using regexp
    // and then parse the bundle descriptor object.
    getFromJsonp(bundleId) {
        return this.httpClient.get(this.baseUrl + bundleId + '/jsonp', { responseType: 'text' }).pipe(map((jsonpResult) => {
            return JSON.parse(/\(([^)]+)\)/.exec(jsonpResult)[1]);
        }));
    }
    loadBundles(bundleIds, force) {
        const loaders$ = bundleIds.map((bundleId) => this.rxGlobalCacheService.getBundleDescriptor(bundleId).pipe(tap((bundleDescriptor) => {
            if (force ||
                bundleDescriptor.uiOptions.options.loadCss === RxBundleLoadType.always ||
                includes(bundleDescriptor.uiOptions.applicationInitializers, this.rxGlobalCacheService.applicationId)) {
                this.loadBundleCss(bundleDescriptor);
            }
        }), switchMap((bundleDescriptor) => force ||
            bundleDescriptor.uiOptions.options.loadJs === RxBundleLoadType.always ||
            includes(bundleDescriptor.uiOptions.applicationInitializers, this.rxGlobalCacheService.applicationId)
            ? this.loadBundle(bundleDescriptor)
            : of({ bundleId: bundleDescriptor.id, isBundleCompiled: false, isFileLoaded: false }))));
        return forkJoin(loaders$);
    }
    loadBundle(bundleDescriptor) {
        if (!this.bundleJs[bundleDescriptor.id]) {
            this.bundleJs[bundleDescriptor.id] = this.loadBundleJs(bundleDescriptor).pipe(switchMap((bundleContext) => this.compileBundle(bundleContext)), shareReplay(1));
        }
        return this.bundleJs[bundleDescriptor.id];
    }
    compileBundle(bundleContext) {
        return new Observable((observer) => {
            var _a, _b;
            if (bundleContext.isFileLoaded) {
                bundleContext.module.then((module) => {
                    const moduleName = `${upperFirst(camelCase(bundleContext.bundleId))}Module`;
                    try {
                        const factory = this.compiler.compileModuleSync(module[moduleName]);
                        if (factory) {
                            factory.create(this.injector);
                            bundleContext.isBundleCompiled = true;
                            this.rxLogService.debug(`${bundleContext.bundleId}: loaded successfully.`);
                        }
                        else {
                            this.rxLogService.error(`ERROR! ${bundleContext.bundleId}: cannot find module factory for ${moduleName}.`);
                        }
                    }
                    catch (error) {
                        this.rxLogService.error(`ERROR! ${bundleContext.bundleId}:\n${error}`);
                    }
                    observer.next(bundleContext);
                    observer.complete();
                });
            }
            else {
                this.rxLogService.error(`ERROR! ${bundleContext.bundleId}:\n${(_b = (_a = bundleContext.message) === null || _a === void 0 ? void 0 : _a.stack) !== null && _b !== void 0 ? _b : bundleContext.message}`);
                observer.next(bundleContext);
                observer.complete();
            }
        });
    }
    loadBundleJs(bundleDescriptor) {
        const dasherizedBundleId = bundleDescriptor.id.replace(/\./g, '-');
        const cacheBuster = new Date(bundleDescriptor.lastDeployedTime).getTime();
        const fileName = `../${bundleDescriptor.id}/scripts/libs_${dasherizedBundleId}_src_index_ts.js?_v=${cacheBuster}`;
        const modulePathMapping = `./libs/${dasherizedBundleId}/src/index.ts`;
        this.rxLogService.debug(`${bundleDescriptor.id}: loading from ${fileName}.`);
        // WARNING! webpackIgnore comment below is critical for dynamic imports to work, DO NOT REMOVE!
        const module = import(/* webpackIgnore: true */ `${fileName}`).then(
        // WARNING! comment below is critical for dynamic imports to work, DO NOT REMOVE!
        // @ts-ignore
        __webpack_require__.bind(null, `${modulePathMapping}`));
        return new Observable((observer) => {
            module.then(() => {
                observer.next({
                    bundleId: bundleDescriptor.id,
                    isBundleCompiled: false,
                    isFileLoaded: true,
                    module: module
                });
                observer.complete();
            }, (error) => {
                observer.next({
                    bundleId: bundleDescriptor.id,
                    isBundleCompiled: false,
                    isFileLoaded: false,
                    message: error
                });
                observer.complete();
            });
        });
    }
    loadBundleCss(bundleDescriptor) {
        if (!this.bundleCss[bundleDescriptor.id]) {
            const cacheBuster = new Date(bundleDescriptor.lastDeployedTime).getTime();
            const link = document.createElement('link');
            link.id = bundleDescriptor.id;
            link.href = `/${bundleDescriptor.id}/scripts/${bundleDescriptor.id.replace(/\./g, '-')}.css?_v=${cacheBuster}`;
            link.type = 'text/css';
            link.rel = 'stylesheet';
            this.document.head.appendChild(link);
            this.bundleCss[bundleDescriptor.id] = true;
        }
    }
}
RxBundleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleService, deps: [{ token: DOCUMENT }, { token: i0.Compiler }, { token: i1.HttpClient }, { token: i0.Injector }, { token: i2.RxGlobalCacheService }, { token: i3.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxBundleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBundleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Compiler }, { type: i1.HttpClient }, { type: i0.Injector }, { type: i2.RxGlobalCacheService }, { type: i3.RxLogService }]; } });
//# sourceMappingURL=bundle.service.js.map