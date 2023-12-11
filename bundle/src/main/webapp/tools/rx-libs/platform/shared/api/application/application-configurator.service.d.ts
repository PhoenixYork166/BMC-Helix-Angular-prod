import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AdaptDockedPanelService, AdaptModalService } from '@bmc-ux/adapt-angular';
import { RxUpgradeTrackerService } from '../upgrade-tracker/upgrade-tracker.service';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import * as i0 from "@angular/core";
export declare class RxApplicationConfiguratorService {
    private rxUpgradeTrackerService;
    private rxGlobalCacheService;
    private document;
    private router;
    private adaptModalService;
    private adaptDockedPanelService;
    constructor(injector: Injector, rxUpgradeTrackerService: RxUpgradeTrackerService, rxGlobalCacheService: RxGlobalCacheService, document: any, router: Router, adaptModalService: AdaptModalService, adaptDockedPanelService: AdaptDockedPanelService);
    configure(): void;
    private patchCkEditor;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxApplicationConfiguratorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxApplicationConfiguratorService>;
}
