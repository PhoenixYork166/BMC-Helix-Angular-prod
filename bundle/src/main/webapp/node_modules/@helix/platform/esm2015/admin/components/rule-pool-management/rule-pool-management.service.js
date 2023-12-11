import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { RxDefinitionNameService, RxGlobalCacheService, RxOverlayService } from '@helix/platform/shared/api';
import { RxRuleDefinitionService } from '@helix/platform/rule/api';
import { RX_RULE_POOL_MANAGEMENT } from './rule-pool-management.constant';
import { RxRulePoolDataService } from './rule-pool-data.service';
import { find } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/rule/api";
import * as i3 from "./rule-pool-data.service";
import * as i4 from "@ngx-translate/core";
export class RxRulePoolManagementService {
    constructor(rxGlobalCacheService, rxDefinitionNameService, rxOverlayService, rxRuleDefinitionService, rxRulePoolDataService, translateService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxOverlayService = rxOverlayService;
        this.rxRuleDefinitionService = rxRuleDefinitionService;
        this.rxRulePoolDataService = rxRulePoolDataService;
        this.translateService = translateService;
        this.availablePoolsTreeSubject$ = new BehaviorSubject([]);
        this.availablePoolsTree$ = this.availablePoolsTreeSubject$
            .asObservable()
            .pipe(shareReplay(1));
    }
    fetchAvailablePoolsTree() {
        return forkJoin([
            this.rxRulePoolDataService.getRulePoolStatistics(),
            this.rxGlobalCacheService.getBundleDescriptors()
        ])
            .pipe(map(([rulePoolStatistics, bundleDescriptors]) => {
            this.availablePoolsTreeSubject$.next(this.buildTreeNodes(rulePoolStatistics, bundleDescriptors));
        }))
            .subscribe();
    }
    getAvailablePoolOptions() {
        return this.availablePoolsTree$.pipe(map(this.buildSelectOptions));
    }
    getRuleConflictsData(adaptTreeNode) {
        if (!adaptTreeNode) {
            return [];
        }
        return adaptTreeNode.data.conflictingRules.delayedByRules.concat(adaptTreeNode.data.conflictingRules.delaysOtherRules.map((ruleConflictOccurrences) => (Object.assign(Object.assign({}, ruleConflictOccurrences), { noOfTimesDelayed: 0 }))));
    }
    isRuleDesignerAvailable(ruleStatistics) {
        return !ruleStatistics.remedyEscalation && Boolean(this.rxDefinitionNameService.getBundleId(ruleStatistics.name));
    }
    reassignRuleToPool(ruleDefinitionName, poolNumber) {
        return this.rxRuleDefinitionService.get(ruleDefinitionName).pipe(switchMap((ruleDefinition) => {
            ruleDefinition.triggerEvent.poolNumber = poolNumber;
            return this.rxRuleDefinitionService.update(ruleDefinition);
        }));
    }
    buildSelectOptions(poolTreeNodes) {
        return poolTreeNodes.map((pool) => ({
            id: pool.data.executionPoolNumber,
            name: pool.label
        }));
    }
    buildTreeNodes(rulePoolStatistics, bundleDescriptors) {
        return rulePoolStatistics.map((pool) => {
            const children = pool.rules.map((rule) => {
                rule.isRuleWithIssues = Boolean(rule.conflictingRules.delayedByRules.length ||
                    rule.conflictingRules.delaysOtherRules.length ||
                    rule.designTimePoolNumber > rulePoolStatistics.length);
                let ruleType;
                if (rule.remedyEscalation) {
                    ruleType = rule.isRuleWithIssues
                        ? RX_RULE_POOL_MANAGEMENT.ruleTypes.remedyEscalationWithIssues
                        : RX_RULE_POOL_MANAGEMENT.ruleTypes.remedyEscalationWithoutIssues;
                }
                else {
                    ruleType = rule.isRuleWithIssues
                        ? RX_RULE_POOL_MANAGEMENT.ruleTypes.ruleWithIssues
                        : RX_RULE_POOL_MANAGEMENT.ruleTypes.ruleWithoutIssues;
                }
                rule.isEditable = this.isRuleEditable(rule, bundleDescriptors);
                return {
                    data: rule,
                    key: `${pool.executionPoolNumber}_${rule.guid}`,
                    label: this.rxDefinitionNameService.getDisplayName(rule.name),
                    type: ruleType
                };
            });
            const localizedStringKey = pool.isDefaultPool
                ? 'com.bmc.arsys.rx.client.admin.rule-pool-management.available-pools.default-pool-tree-node.label'
                : 'com.bmc.arsys.rx.client.admin.rule-pool-management.available-pools.pool-tree-node.label';
            const label = this.translateService.instant(localizedStringKey, {
                poolNumber: pool.executionPoolNumber,
                ruleCount: pool.rules.length
            });
            return {
                children,
                data: pool,
                label: label,
                selectable: false,
                type: pool.hasRulesWithIssues
                    ? RX_RULE_POOL_MANAGEMENT.poolTypes.poolWithIssues
                    : RX_RULE_POOL_MANAGEMENT.poolTypes.poolWithoutIssues
            };
        });
    }
    isRuleEditable(ruleStatistics, bundleDescriptors) {
        const bundleId = this.rxDefinitionNameService.getBundleId(ruleStatistics.name), bundleDescriptor = find(bundleDescriptors, ['id', bundleId]);
        return !ruleStatistics.remedyEscalation && Boolean(bundleId)
            ? this.rxOverlayService.areNewDefinitionsAllowedSync(bundleDescriptor)
            : false;
    }
}
RxRulePoolManagementService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRulePoolManagementService, deps: [{ token: i1.RxGlobalCacheService }, { token: i1.RxDefinitionNameService }, { token: i1.RxOverlayService }, { token: i2.RxRuleDefinitionService }, { token: i3.RxRulePoolDataService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRulePoolManagementService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRulePoolManagementService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRulePoolManagementService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalCacheService }, { type: i1.RxDefinitionNameService }, { type: i1.RxOverlayService }, { type: i2.RxRuleDefinitionService }, { type: i3.RxRulePoolDataService }, { type: i4.TranslateService }]; } });
//# sourceMappingURL=rule-pool-management.service.js.map