import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComponentCanDeactivate, RxComponentCanDeactivateGuard, RxDefinitionNameService, RxGlobalCacheService, RxPageTitleService, RxPreviousStateService } from '@helix/platform/shared/api';
import { RxIframeService } from '@helix/platform/shared/components';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RxJsonParserService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { RxGainsightConfiguratorService } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
export declare class DesignerFrameComponent implements OnInit, OnDestroy, IComponentCanDeactivate {
    private router;
    private activatedRoute;
    private rxDefinitionNameService;
    private rxPageTitleService;
    private rxGlobalCacheService;
    private translateService;
    private rxComponentCanDeactivateGuard;
    private rxUtilityModalsService;
    private rxIframeService;
    private rxJsonParserService;
    private rxPreviousStateService;
    private rxGainsightConfiguratorService;
    private iframeComponentApi;
    private currentBundleId;
    private designerOptions;
    private isDefinitionDirty;
    private intervalId;
    private destroyed$;
    busySubscription: Subscription;
    constructor(router: Router, activatedRoute: ActivatedRoute, rxDefinitionNameService: RxDefinitionNameService, rxPageTitleService: RxPageTitleService, rxGlobalCacheService: RxGlobalCacheService, translateService: TranslateService, rxComponentCanDeactivateGuard: RxComponentCanDeactivateGuard, rxUtilityModalsService: RxUtilityModalsService, rxIframeService: RxIframeService, rxJsonParserService: RxJsonParserService, rxPreviousStateService: RxPreviousStateService, rxGainsightConfiguratorService: RxGainsightConfiguratorService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    canDeactivate(): boolean;
    confirmDeactivation(): Promise<boolean>;
    onMessage(event: MessageEvent): void;
    private buildDesignerUrl;
    private setPageTitle;
    static ɵfac: i0.ɵɵFactoryDeclaration<DesignerFrameComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DesignerFrameComponent, "ax-designer-frame", never, {}, {}, never, never>;
}
