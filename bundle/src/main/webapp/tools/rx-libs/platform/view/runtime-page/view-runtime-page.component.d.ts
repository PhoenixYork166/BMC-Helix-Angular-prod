import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComponentCanDeactivate, RxComponentCanDeactivateGuard, RxDefinitionNameService, RxFeatureService, RxPageTitleService, RxPreviousStateService } from '@helix/platform/shared/api';
import { IRuntimeViewConfiguration, IRuntimeViewOutputParameter, RxRuntimeViewRegistryService } from '@helix/platform/view/runtime';
import { RxIframeUtilsService } from '@helix/platform/utils';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RxGainsightConfiguratorService } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
export declare class ViewRuntimePageComponent implements OnInit, OnDestroy, IComponentCanDeactivate {
    private route;
    private rxDefinitionNameService;
    private rxPageTitleService;
    private rxPreviousStateService;
    private rxComponentCanDeactivateGuard;
    private rxUtilityModalsService;
    private rxRuntimeViewRegistryService;
    private rxIframeUtilsService;
    private rxGainsightConfiguratorService;
    private rxFeatureService;
    configuration: IRuntimeViewConfiguration;
    showRuntimeView: boolean;
    private subscription;
    private runtimeViewApi;
    private currentRoute;
    constructor(route: ActivatedRoute, rxDefinitionNameService: RxDefinitionNameService, rxPageTitleService: RxPageTitleService, rxPreviousStateService: RxPreviousStateService, rxComponentCanDeactivateGuard: RxComponentCanDeactivateGuard, rxUtilityModalsService: RxUtilityModalsService, rxRuntimeViewRegistryService: RxRuntimeViewRegistryService, rxIframeUtilsService: RxIframeUtilsService, rxGainsightConfiguratorService: RxGainsightConfiguratorService, rxFeatureService: RxFeatureService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    canDeactivate(): boolean;
    confirmDeactivation(): Promise<boolean>;
    onCancelView(): void;
    onCloseView(outputParams: IRuntimeViewOutputParameter): void;
    private onCloseOrCancel;
    private onRegisterApi;
    private updateConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewRuntimePageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ViewRuntimePageComponent, "rx-view-runtime-page", never, {}, {}, never, never>;
}
