import { OnDestroy, OnInit } from '@angular/core';
import { IViewDesignerConfiguration } from '@helix/platform/view/designer';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { IComponentCanDeactivate, RxBundleCacheService, RxComponentCanDeactivateGuard, RxDefinitionNameService, RxGlobalCacheService, RxPageTitleService, RxPreviousStateService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxShellDesignerPageComponent implements OnInit, OnDestroy, IComponentCanDeactivate {
    private activatedRoute;
    private rxComponentCanDeactivateGuard;
    private rxUtilityModalsService;
    private rxDefinitionNameService;
    private rxPageTitleService;
    private rxBundleCacheService;
    private rxGlobalCacheService;
    private rxPreviousStateService;
    private viewDesignerComponent;
    configuration$: Observable<IViewDesignerConfiguration>;
    constructor(activatedRoute: ActivatedRoute, rxComponentCanDeactivateGuard: RxComponentCanDeactivateGuard, rxUtilityModalsService: RxUtilityModalsService, rxDefinitionNameService: RxDefinitionNameService, rxPageTitleService: RxPageTitleService, rxBundleCacheService: RxBundleCacheService, rxGlobalCacheService: RxGlobalCacheService, rxPreviousStateService: RxPreviousStateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    canDeactivate(): boolean;
    onCloseDesigner(): void;
    confirmDeactivation(): Promise<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxShellDesignerPageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxShellDesignerPageComponent, "rx-shell-designer-page", never, {}, {}, never, never>;
}
