import { OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AdaptTreeNode, TreeWrap } from '@bmc-ux/adapt-angular';
import { RxModalService } from '@helix/platform/ui-kit';
import { IRuleConflictsTableConfig } from './rule-pool-management.interfaces';
import { RxRulePoolManagementService } from './rule-pool-management.service';
import * as i0 from "@angular/core";
export declare class RulePoolManagementAdminComponent implements OnInit, OnDestroy {
    private rxModalService;
    private rxRulePoolManagementService;
    private translateService;
    availablePoolsTree: AdaptTreeNode[];
    busy: Subscription;
    ruleConflictsTableConfig: IRuleConflictsTableConfig;
    ruleDesignerLink: string;
    showOnlyRulesWithIssuesFormControl: FormControl;
    strings: {
        [key: string]: string;
    };
    treeWrap: TreeWrap;
    private destroyed$;
    private selectedRuleValue;
    get selectedRule(): AdaptTreeNode;
    set selectedRule(selectedRule: AdaptTreeNode);
    private selectedRuleSubject$;
    private selectedRule$;
    private showOnlyRulesWithIssuesSubject$;
    private showOnlyRulesWithIssues$;
    constructor(rxModalService: RxModalService, rxRulePoolManagementService: RxRulePoolManagementService, translateService: TranslateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isAssignedPoolOutOfRange(): boolean;
    isRuleDesignerAvailable(): boolean;
    openReassignPoolDialog(): any;
    private setStrings;
    static ɵfac: i0.ɵɵFactoryDeclaration<RulePoolManagementAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RulePoolManagementAdminComponent, "rx-admin-rule-pool-management", never, {}, {}, never, never>;
}
