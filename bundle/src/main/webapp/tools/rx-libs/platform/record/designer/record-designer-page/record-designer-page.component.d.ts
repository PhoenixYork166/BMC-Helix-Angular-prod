import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IComponentCanDeactivate, IDesignerConfiguration, RxBundleCacheService, RxComponentCanDeactivateGuard, RxDefinitionNameService, RxPageTitleService } from '@helix/platform/shared/api';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RecordDesignerPageComponent implements OnInit, OnDestroy, IComponentCanDeactivate {
    private activatedRoute;
    private rxBundleCacheService;
    private rxDefinitionNameService;
    private rxUtilityModalsService;
    private rxPageTitleService;
    private router;
    private translateService;
    private rxComponentCanDeactivateGuard;
    isInitialized: boolean;
    configuration: IDesignerConfiguration;
    private subscription;
    private isNewRecord;
    private recordDesignerComponent;
    constructor(activatedRoute: ActivatedRoute, rxBundleCacheService: RxBundleCacheService, rxDefinitionNameService: RxDefinitionNameService, rxUtilityModalsService: RxUtilityModalsService, rxPageTitleService: RxPageTitleService, router: Router, translateService: TranslateService, rxComponentCanDeactivateGuard: RxComponentCanDeactivateGuard);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onDefinitionSaved(recordDefinitionName: string): void;
    onDefinitionErrorLoading(): void;
    onCloseDesigner(): void;
    canDeactivate(): boolean;
    confirmDeactivation(): Promise<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordDesignerPageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordDesignerPageComponent, "rx-record-designer-page", never, {}, {}, never, never>;
}
