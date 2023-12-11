import { __awaiter } from "tslib";
import { Injectable } from '@angular/core';
import { AdaptRadarGainsightIdentifyActionName, AdaptRadarGainsightProvider, AdaptRadarProductAreaName, AdaptRadarService, AdaptRadarSupportedProviders } from '@bmc-ux/adapt-radar';
import { map, switchMap, take, tap, shareReplay } from 'rxjs/operators';
import { RX_APPLICATION, RxCurrentUserService, RxFeatureService, RxGlobalCacheService, RxLogService } from '@helix/platform/shared/api';
import { RxRecordInstanceService, RxRecordInstanceUpdateService } from '@helix/platform/record/api';
import { RX_GAINSIGHT } from './gainsight.constant';
import { of, combineLatest, iif } from 'rxjs';
import { find, keys, merge } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { RxIframeUtilsService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@bmc-ux/adapt-radar";
import * as i4 from "@angular/common/http";
import * as i5 from "@helix/platform/utils";
export class RxGainsightConfiguratorService {
    constructor(rxGlobalCacheService, rxRecordInstanceService, adaptRadarService, adaptRadarGainsightProvider, rxCurrentUserService, rxFeatureService, rxLogService, httpClient, rxRecordInstanceUpdateService, rxIframeUtilsService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.adaptRadarService = adaptRadarService;
        this.adaptRadarGainsightProvider = adaptRadarGainsightProvider;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxFeatureService = rxFeatureService;
        this.rxLogService = rxLogService;
        this.httpClient = httpClient;
        this.rxRecordInstanceUpdateService = rxRecordInstanceUpdateService;
        this.rxIframeUtilsService = rxIframeUtilsService;
        this.bundleDescriptor$ = this.rxGlobalCacheService.getApplicationBundleDescriptor().pipe(take(1), shareReplay(1));
        this.gainsightConfiguration$ = this.bundleDescriptor$.pipe(switchMap((bundleDescriptor) => this.getGainsightConfiguration(bundleDescriptor.id)), shareReplay(1));
        this.globalContextData$ = combineLatest([this.bundleDescriptor$, this.gainsightConfiguration$]).pipe(map(([bundleDescriptor, gainsightConfiguration]) => bundleDescriptor.id === RX_APPLICATION.innovationStudioBundleId
            ? {
                productArea: {
                    name: AdaptRadarProductAreaName.Platform,
                    version: bundleDescriptor.displayVersion,
                    hosting: gainsightConfiguration.settings.deploymentType
                }
            }
            : null), shareReplay(1));
        this.gainsightInitConfiguration$ = iif(() => this.rxFeatureService.isFeatureEnabled('DRD21-11744'), combineLatest([this.bundleDescriptor$, this.gainsightConfiguration$]).pipe(tap(([bundleDescriptor, gainsightConfiguration]) => {
            const company = gainsightConfiguration.company;
            const companyId = gainsightConfiguration.companyId;
            const user = this.rxCurrentUserService.get();
            const hashedUserId = gainsightConfiguration.hashedUserId;
            let isGainsightEnabled = gainsightConfiguration.settings.enableGainsight;
            this.useAdaptRadar = gainsightConfiguration.settings.useAdaptRadar;
            this.productTag = gainsightConfiguration.productTag;
            if (isGainsightEnabled && !gainsightConfiguration.productTag) {
                this.rxLogService.debug(`Gainsight product tag is missing for bundle ${bundleDescriptor.id}.`);
                isGainsightEnabled = false;
            }
            if (isGainsightEnabled) {
                if (this.useAdaptRadar) {
                    this.adaptRadarService.startDataCollecting({
                        providers: [
                            {
                                name: AdaptRadarSupportedProviders.Gainsight,
                                id: this.productTag,
                                oneTimeActions: [
                                    {
                                        name: AdaptRadarGainsightIdentifyActionName.UserIdentify,
                                        data: {
                                            userData: {
                                                id: hashedUserId,
                                                role: user.isAdministrator
                                                    ? RX_GAINSIGHT.administratorRole
                                                    : user.isBusinessAnalyst
                                                        ? RX_GAINSIGHT.businessAnalystRole
                                                        : RX_GAINSIGHT.regularUserRole
                                            },
                                            accountData: {
                                                id: companyId || company,
                                                name: company
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    });
                }
                else {
                    const gainsightUrl = gainsightConfiguration.settings.loadGainsightFromBmcIt
                        ? RX_GAINSIGHT.bmcGainsightUrl
                        : RX_GAINSIGHT.gainsightUrl;
                    this.loadGainsightScript(user, gainsightUrl, hashedUserId, company, companyId);
                }
            }
        }), switchMap(([bundleDescriptor, gainsightConfiguration]) => gainsightConfiguration.settings.enableGainsight && gainsightConfiguration.settings.useAdaptRadar
            ? this.adaptRadarGainsightProvider.init$
            : of(false)), tap((isInitialized) => {
            if (isInitialized) {
                this.isGainsightLoaded = true;
                this.setGlobalContext(this.updatedContext);
            }
        }), switchMap(() => this.gainsightConfiguration$), shareReplay(1)), of(null));
    }
    updateGlobalContext(globalContext, viewDefinitionName) {
        this.gainsightConfiguration$.pipe(take(1)).subscribe((gainsightConfiguration) => {
            var _a, _b, _c;
            if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
                if (viewDefinitionName) {
                    // For runtime views clear all the previous global context before update
                    this.removeGlobalContext(keys(this.updatedContext));
                    globalContext =
                        (_b = (_a = find(gainsightConfiguration.viewMapping, { viewName: viewDefinitionName })) === null || _a === void 0 ? void 0 : _a.globalContext) !== null && _b !== void 0 ? _b : (_c = find(gainsightConfiguration.viewMapping, { default: true })) === null || _c === void 0 ? void 0 : _c.globalContext;
                    globalContext = globalContext && JSON.parse(globalContext);
                    this.updatedContext = globalContext;
                }
                this.setGlobalContext(globalContext);
            }
        });
    }
    setGlobalContext(globalContext) {
        this.globalContextData$.pipe(take(1)).subscribe((globalContextData) => {
            if (this.useAdaptRadar && this.isGainsightLoaded) {
                this.adaptRadarGainsightProvider.setGlobalContext(merge(globalContextData, globalContext));
            }
            else if (!this.useAdaptRadar && this.isGainsightLoaded) {
                aptrinsic('set', 'globalContext', merge(globalContextData, globalContext));
            }
            else {
                this.updatedContext = globalContext;
            }
        });
    }
    removeGlobalContext(contextList) {
        if (this.isGainsightLoaded) {
            // Clear all global context if list is not specified
            contextList !== null && contextList !== void 0 ? contextList : (contextList = keys(this.updatedContext));
            this.globalContextData$.pipe(take(1)).subscribe((globalContextData) => {
                if (globalContextData) {
                    contextList.forEach((context) => delete globalContextData[context]);
                }
                if (this.useAdaptRadar) {
                    this.adaptRadarGainsightProvider.removeGlobalContext(contextList);
                }
                else {
                    aptrinsic('remove', 'globalContext', contextList);
                }
            });
        }
    }
    loadGainsightScript(user, gainsightUrl, hashedUserId, company, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const param = this.productTag;
            const script = document.getElementsByTagName('script')[0];
            const node = document.createElement('script');
            window['aptrinsic'] =
                window['aptrinsic'] ||
                    function () {
                        (window['aptrinsic'].q = window['aptrinsic'].q || []).push(arguments);
                    };
            window['aptrinsic'].p = param;
            // iframeModeEnabled is set to "false" when embedded in an iFrame, as per Gainsight documentation.
            window['aptrinsic'].c = { iframeModeEnabled: !this.rxIframeUtilsService.isRunningInIframe() };
            node.async = true;
            node.src = gainsightUrl + '?a=' + param;
            node.onload = () => {
                const functionalRoles = user.functionalRoles.reduce((functionalRole, name) => {
                    functionalRole[name] = true;
                    return functionalRole;
                }, {});
                this.isGainsightLoaded = true;
                aptrinsic('identify', {
                    id: hashedUserId,
                    globalId: hashedUserId,
                    role: user.isAdministrator
                        ? RX_GAINSIGHT.administratorRole
                        : user.isBusinessAnalyst
                            ? RX_GAINSIGHT.businessAnalystRole
                            : RX_GAINSIGHT.regularUserRole,
                    functionalRoles
                }, {
                    id: companyId || company,
                    name: company
                });
                this.setGlobalContext(this.updatedContext);
            };
            node.onerror = (error) => {
                this.rxLogService.error(error);
            };
            script.parentNode.insertBefore(node, script);
        });
    }
    getGainsightConfiguration(bundleId) {
        if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
            return this.httpClient.get(RX_GAINSIGHT.gainsightConfigurationsApi + '/' + bundleId);
        }
        else {
            return of(null);
        }
    }
    saveGainsightConfiguration(gainsightSettings) {
        return this.rxRecordInstanceService
            .get(RX_GAINSIGHT.gainsightSettings.recordDefinitionName, RX_GAINSIGHT.gainsightSettings.recordInstanceId)
            .pipe(switchMap((recordInstance) => {
            recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.enableGainsight, gainsightSettings.enableGainsight);
            recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.useAdaptRadar, gainsightSettings.useAdaptRadar);
            recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.loadGainsightFromBmcIt, gainsightSettings.loadGainsightFromBmcIt);
            recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.deploymentType, gainsightSettings.deploymentType);
            recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.environmentType, gainsightSettings.environmentType);
            return this.rxRecordInstanceUpdateService.execute(recordInstance);
        }));
    }
}
RxGainsightConfiguratorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGainsightConfiguratorService, deps: [{ token: i1.RxGlobalCacheService }, { token: i2.RxRecordInstanceService }, { token: i3.AdaptRadarService }, { token: i3.AdaptRadarGainsightProvider }, { token: i1.RxCurrentUserService }, { token: i1.RxFeatureService }, { token: i1.RxLogService }, { token: i4.HttpClient }, { token: i2.RxRecordInstanceUpdateService }, { token: i5.RxIframeUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxGainsightConfiguratorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGainsightConfiguratorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGainsightConfiguratorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalCacheService }, { type: i2.RxRecordInstanceService }, { type: i3.AdaptRadarService }, { type: i3.AdaptRadarGainsightProvider }, { type: i1.RxCurrentUserService }, { type: i1.RxFeatureService }, { type: i1.RxLogService }, { type: i4.HttpClient }, { type: i2.RxRecordInstanceUpdateService }, { type: i5.RxIframeUtilsService }]; } });
//# sourceMappingURL=gainsight-configurator.service.js.map