import { EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { IFormBuilderEvent, IPlainObject, RxBundleCacheService, RxDefinitionNameService, RxGlobalCacheService, RxOverlayService } from '@helix/platform/shared/api';
import { IBreadcrumbItem, IValidationIssue, IValidationIssueSection } from '@helix/platform/ui-kit';
import { IWebApiDefinition, RxWebApiDefinitionService } from '@helix/platform/web-api/api';
import * as i0 from "@angular/core";
export declare class RxWebApiDesignerComponent implements OnInit {
    private rxGlobalCacheService;
    private rxBundleCacheService;
    private rxWebApiDefinitionService;
    private rxDefinitionNameService;
    private translateService;
    private rxOverlayService;
    webApiDefinitionName: string;
    webApiDefinitionSaved: EventEmitter<string>;
    webApiDefinitionErrorLoading: EventEmitter<void>;
    closeDesigner: EventEmitter<void>;
    isDesignMode: boolean;
    isExistingWebApi: boolean;
    isCustomizationEnabled: boolean;
    bundleFriendlyName$: Observable<string>;
    validationIssues$: BehaviorSubject<IValidationIssueSection[]>;
    hasValidationErrors$: Observable<boolean>;
    breadcrumbItems$: Observable<IBreadcrumbItem[]>;
    webApiDefinition$: BehaviorSubject<IWebApiDefinition>;
    isSaveButtonDisabled$: Observable<boolean>;
    isSavingInProgress$: BehaviorSubject<boolean>;
    private bundleId;
    private isBundleEditable;
    private destroyed$;
    constructor(rxGlobalCacheService: RxGlobalCacheService, rxBundleCacheService: RxBundleCacheService, rxWebApiDefinitionService: RxWebApiDefinitionService, rxDefinitionNameService: RxDefinitionNameService, translateService: TranslateService, rxOverlayService: RxOverlayService);
    ngOnInit(): void;
    canDeactivate(): boolean;
    toggleDesignMode(): void;
    onCorrectIssue(validationIssue: IValidationIssue): void;
    validate(value: IPlainObject): IValidationIssueSection[];
    onRevertCustomization(event: IFormBuilderEvent): void;
    saveDefinition(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxWebApiDesignerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxWebApiDesignerComponent, "rx-web-api-designer", never, { "webApiDefinitionName": "webApiDefinitionName"; }, { "webApiDefinitionSaved": "webApiDefinitionSaved"; "webApiDefinitionErrorLoading": "webApiDefinitionErrorLoading"; "closeDesigner": "closeDesigner"; }, never, never>;
}
