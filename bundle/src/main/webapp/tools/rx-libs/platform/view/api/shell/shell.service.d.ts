import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RxCurrentUserService, RxNotificationService, RxFeatureService } from '@helix/platform/shared/api';
import { RxJsonParserService, RxObjectUtilsService, RxUrlUtilsService } from '@helix/platform/utils';
import { RxExpressionEvaluatorService } from '../expressions/expression-evaluator.service';
import { IRxShellConfig, IRxShellMenuItem } from './shell.types';
import { RxViewDefinitionCacheService } from '../services/view-definition-cache.service';
import { RxViewDefinitionParserService } from '../services/view-definition-parser.service';
import { RxOldViewLayoutAdapterService } from '../layout/old-view-layout-adapter.service';
import * as i0 from "@angular/core";
export declare class RxShellService {
    private translateService;
    private rxCurrentUserService;
    private rxExpressionEvaluatorService;
    private rxJsonParserService;
    private rxNotificationService;
    private rxObjectUtilsService;
    private rxUrlUtilsService;
    private rxViewDefinitionCacheService;
    private rxViewDefinitionParserService;
    private rxOldViewLayoutAdapterService;
    private rxFeatureService;
    private menuItemId;
    private currentUser;
    private navigateToSmartReportingSubject;
    private navigateToViewSubject;
    private openUserPreferencesSubject;
    private openUserAvailabilitySubject;
    private shellConfigSubject;
    private openGainsightPreferencesSubject;
    navigateToSmartReporting$: Observable<void>;
    navigateToView$: Observable<IRxShellMenuItem>;
    openUserPreferences$: Observable<void>;
    openUserAvailability$: Observable<void>;
    shellConfig$: Observable<IRxShellConfig>;
    openGainsightPreferences$: Observable<void>;
    constructor(translateService: TranslateService, rxCurrentUserService: RxCurrentUserService, rxExpressionEvaluatorService: RxExpressionEvaluatorService, rxJsonParserService: RxJsonParserService, rxNotificationService: RxNotificationService, rxObjectUtilsService: RxObjectUtilsService, rxUrlUtilsService: RxUrlUtilsService, rxViewDefinitionCacheService: RxViewDefinitionCacheService, rxViewDefinitionParserService: RxViewDefinitionParserService, rxOldViewLayoutAdapterService: RxOldViewLayoutAdapterService, rxFeatureService: RxFeatureService);
    resetMenuItemCount(): void;
    updateMenuItemCount(): number;
    private getChildGuids;
    private getIconClass;
    getShellConfig(bundleId: string): Observable<IRxShellConfig>;
    private openUserPreferences;
    private openGainsightPreferences;
    private openUserAvailability;
    private navigateToView;
    private navigateToState;
    private navigateToSmartReporting;
    private getMenuProperties;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxShellService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxShellService>;
}