import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { AdaptTreeNode, RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxDefinitionNameService, RxGlobalCacheService, RxOverlayService } from '@helix/platform/shared/api';
import { RxRuleDefinitionService } from '@helix/platform/rule/api';
import { RxRulePoolDataService } from './rule-pool-data.service';
import { IRuleConflictOccurrences, IRuleStatistics } from './rule-pool-management.interfaces';
import * as i0 from "@angular/core";
export declare class RxRulePoolManagementService {
    private rxGlobalCacheService;
    private rxDefinitionNameService;
    private rxOverlayService;
    private rxRuleDefinitionService;
    private rxRulePoolDataService;
    private translateService;
    private availablePoolsTreeSubject$;
    availablePoolsTree$: Observable<AdaptTreeNode[]>;
    constructor(rxGlobalCacheService: RxGlobalCacheService, rxDefinitionNameService: RxDefinitionNameService, rxOverlayService: RxOverlayService, rxRuleDefinitionService: RxRuleDefinitionService, rxRulePoolDataService: RxRulePoolDataService, translateService: TranslateService);
    fetchAvailablePoolsTree(): Subscription;
    getAvailablePoolOptions(): Observable<RxSelectOption[]>;
    getRuleConflictsData(adaptTreeNode: AdaptTreeNode): IRuleConflictOccurrences[];
    isRuleDesignerAvailable(ruleStatistics: IRuleStatistics): boolean;
    reassignRuleToPool(ruleDefinitionName: string, poolNumber: number): Observable<any>;
    private buildSelectOptions;
    private buildTreeNodes;
    private isRuleEditable;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRulePoolManagementService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRulePoolManagementService>;
}
