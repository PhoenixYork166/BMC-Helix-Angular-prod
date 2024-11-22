import { AdaptRadarGainsightProvider, AdaptRadarService } from '@bmc-ux/adapt-radar';
import { RxCurrentUserService, RxFeatureService, RxGlobalCacheService, RxLogService } from '@helix/platform/shared/api';
import { RxRecordInstanceService, RxRecordInstanceUpdateService } from '@helix/platform/record/api';
import { IGainsightConfiguration, IGainsightSettings } from './gainsight.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RxIframeUtilsService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class RxGainsightConfiguratorService {
    private rxGlobalCacheService;
    private rxRecordInstanceService;
    private adaptRadarService;
    private adaptRadarGainsightProvider;
    private rxCurrentUserService;
    private rxFeatureService;
    private rxLogService;
    private httpClient;
    private rxRecordInstanceUpdateService;
    private rxIframeUtilsService;
    private productTag;
    private updatedContext;
    private isGainsightLoaded;
    private useAdaptRadar;
    private bundleDescriptor$;
    private gainsightConfiguration$;
    private globalContextData$;
    constructor(rxGlobalCacheService: RxGlobalCacheService, rxRecordInstanceService: RxRecordInstanceService, adaptRadarService: AdaptRadarService, adaptRadarGainsightProvider: AdaptRadarGainsightProvider, rxCurrentUserService: RxCurrentUserService, rxFeatureService: RxFeatureService, rxLogService: RxLogService, httpClient: HttpClient, rxRecordInstanceUpdateService: RxRecordInstanceUpdateService, rxIframeUtilsService: RxIframeUtilsService);
    gainsightInitConfiguration$: Observable<any>;
    updateGlobalContext(globalContext: any, viewDefinitionName?: string): void;
    private setGlobalContext;
    removeGlobalContext(contextList: string[]): void;
    private loadGainsightScript;
    getGainsightConfiguration(bundleId: string): Observable<IGainsightConfiguration>;
    saveGainsightConfiguration(gainsightSettings: IGainsightSettings): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxGainsightConfiguratorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxGainsightConfiguratorService>;
}
