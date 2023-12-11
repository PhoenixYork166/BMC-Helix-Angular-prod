import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { noop } from 'lodash';
import { TreeWrap } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { RX_RULE_POOL_MANAGEMENT } from './rule-pool-management.constant';
import { RxRulePoolManagementService } from './rule-pool-management.service';
import { RuleReassignmentComponent } from './rule-reassignment/rule-reassignment.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "./rule-pool-management.service";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@bmc-ux/adapt-table";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
import * as i9 from "@helix/platform/rule/api";
export class RulePoolManagementAdminComponent {
    constructor(rxModalService, rxRulePoolManagementService, translateService) {
        this.rxModalService = rxModalService;
        this.rxRulePoolManagementService = rxRulePoolManagementService;
        this.translateService = translateService;
        this.availablePoolsTree = [];
        this.ruleDesignerLink = `/helix/index.html#/${RX_APPLICATION.innovationStudioBundleId}/rule/edit/`;
        this.showOnlyRulesWithIssuesFormControl = new FormControl(false);
        this.strings = {};
        this.treeWrap = TreeWrap.WrapAll;
        this.destroyed$ = new ReplaySubject(1);
        this.selectedRuleValue = null;
        this.selectedRuleSubject$ = new BehaviorSubject(this.selectedRuleValue);
        this.selectedRule$ = this.selectedRuleSubject$.asObservable().pipe(takeUntil(this.destroyed$));
        this.showOnlyRulesWithIssuesSubject$ = new BehaviorSubject(false);
        this.showOnlyRulesWithIssues$ = this.showOnlyRulesWithIssuesSubject$
            .asObservable()
            .pipe(takeUntil(this.destroyed$));
        this.setStrings();
        this.showOnlyRulesWithIssuesFormControl.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe((value) => this.showOnlyRulesWithIssuesSubject$.next(value));
        this.ruleConflictsTableConfig = {
            columns: [
                {
                    header: this.strings.ruleNameColumnTitle,
                    field: `${RX_RULE_POOL_MANAGEMENT.conflictsRecordFieldIds.ruleName}`
                },
                {
                    header: this.strings.numberOfDelaysColumnTitle,
                    field: `${RX_RULE_POOL_MANAGEMENT.conflictsRecordFieldIds.numberOfDelays}`
                }
            ],
            data: [],
            texts: { emptyStateLabelText: this.strings.ruleConflictsEmptyStateLabel }
        };
        this.selectedRule$.subscribe((adaptTreeNode) => {
            this.selectedRuleValue = adaptTreeNode;
            this.ruleConflictsTableConfig.data = this.rxRulePoolManagementService.getRuleConflictsData(adaptTreeNode);
        });
        combineLatest([this.rxRulePoolManagementService.availablePoolsTree$, this.showOnlyRulesWithIssues$])
            .pipe(map(([availablePoolsTree, showOnlyRulesWithIssues]) => {
            return showOnlyRulesWithIssues
                ? availablePoolsTree.map((poolTreeNode) => (Object.assign(Object.assign({}, poolTreeNode), { children: poolTreeNode.data.hasRulesWithIssues
                        ? poolTreeNode.children.filter(({ data }) => data.isRuleWithIssues)
                        : [] })))
                : availablePoolsTree;
        }), takeUntil(this.destroyed$))
            .subscribe((availablePoolsTree) => {
            this.availablePoolsTree.forEach((poolTreeNode, index) => {
                const updatedPool = availablePoolsTree[index];
                updatedPool.expanded = updatedPool.children.length && poolTreeNode.expanded;
            });
            this.availablePoolsTree = availablePoolsTree;
            if (this.selectedRuleValue) {
                const isSelectedRulePresentInTree = this.availablePoolsTree.some((poolTreeNode) => {
                    const rule = poolTreeNode.children.find((ruleTreeNode) => ruleTreeNode.data.guid === this.selectedRuleValue.data.guid);
                    if (rule) {
                        this.selectedRule = rule;
                        return true;
                    }
                });
                if (!isSelectedRulePresentInTree) {
                    this.selectedRuleSubject$.next(null);
                }
            }
        });
    }
    get selectedRule() {
        return this.selectedRuleValue;
    }
    set selectedRule(selectedRule) {
        this.selectedRuleSubject$.next(selectedRule);
    }
    ngOnInit() {
        this.busy = this.rxRulePoolManagementService.fetchAvailablePoolsTree();
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    isAssignedPoolOutOfRange() {
        return this.selectedRuleValue.data.designTimePoolNumber > this.availablePoolsTree.length;
    }
    isRuleDesignerAvailable() {
        return this.rxRulePoolManagementService.isRuleDesignerAvailable(this.selectedRuleValue.data);
    }
    openReassignPoolDialog() {
        this.rxModalService
            .openModal({
            content: RuleReassignmentComponent,
            data: {
                ruleName: this.selectedRuleValue.data.name
            },
            size: 'sm'
        })
            .then(() => this.rxRulePoolManagementService.fetchAvailablePoolsTree(), noop);
    }
    setStrings() {
        this.strings = {
            adminSettingsHeader: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.header.title'),
            assignedPoolLabel: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.rule-summary.assigned-pool.label'),
            availablePoolsLabel: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.available-pools.label'),
            availablePoolsTooltip: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.available-pools.tooltip', {
                clockAlertIcon: '<i class="d-icon-clock_alert"></i>',
                clockArrowIcon: '<i class="d-icon-clock_arrow"></i>',
                dangerTriangleIcon: '<i class="text-danger d-icon-exclamation_triangle"></i>',
                triangleIcon: '<i class="d-icon-exclamation_triangle"></i>',
                successCheckIcon: '<i class="text-success d-icon-check_circle"></i>',
                checkIcon: '<i class="d-icon-check_circle"></i>'
            }),
            averageExecutionTimeLabel: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.rule-summary.average-execution-time.label'),
            averageLatencyLabel: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.rule-summary.average-latency.label'),
            lastEndDateLabel: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.rule-summary.last-end-date.label'),
            lastStartDateLabel: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.rule-summary.last-start-date.label'),
            numberOfDelaysColumnTitle: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.conflicts.grid.column.delays-caused.title'),
            numberOfRunsLabel: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.rule-summary.execution-count.label'),
            selectedRuleEmptyStateLabel: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.selected-rule.empty-state.label'),
            showOnlyRulesWithIssuesLabel: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.available-pools.show-only-rules-with-issues.label'),
            reassignButtonLabel: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.rule-summary.button.reassign.label'),
            ruleConflictsEmptyStateLabel: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.conflicts.grid.empty-state.label'),
            ruleConflictsTitle: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.conflicts.title'),
            ruleNameColumnTitle: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.conflicts.grid.column.rule-name.title'),
            ruleNameLabel: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.rule-summary.rule-name.label'),
            rulePoolsEmptyStateLabel: this.translateService.instant('com.bmc.arsys.rx.client.empty-state.no-data-to-display.label'),
            ruleSummaryTitle: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.rule-summary.title'),
            ruleSummaryTooltip: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.rule-summary.tooltip'),
            timerDefinitionLabel: this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.rule-summary.timer-definition.label')
        };
    }
}
RulePoolManagementAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RulePoolManagementAdminComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxRulePoolManagementService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RulePoolManagementAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RulePoolManagementAdminComponent, selector: "rx-admin-rule-pool-management", ngImport: i0, template: "<rx-admin-settings header=\"{{ strings.adminSettingsHeader }}\" [busy]=\"busy\">\n  <div *ngIf=\"availablePoolsTree.length; else emptyRulePoolsTemplate\" class=\"d-flex h-100 overflow-auto\">\n    <div class=\"d-flex flex-shrink-0 flex-column border-right page-content-left pr-4\">\n      <h5 class=\"m-0\">\n        {{ strings.availablePoolsLabel }}\n        <adapt-icon\n          name=\"info_circle_o_adapt\"\n          [adaptPopover]=\"availablePoolsTooltipTemplate\"\n          maxWidth=\"400\"\n        ></adapt-icon>\n      </h5>\n\n      <ng-template #availablePoolsTooltipTemplate>\n        <div [innerHtml]=\"strings.availablePoolsTooltip\"></div>\n      </ng-template>\n\n      <adapt-rx-checkbox\n        [label]=\"strings.showOnlyRulesWithIssuesLabel\"\n        [formControl]=\"showOnlyRulesWithIssuesFormControl\"\n      ></adapt-rx-checkbox>\n\n      <div class=\"overflow-auto\">\n        <adapt-tree [value]=\"availablePoolsTree\" [(selection)]=\"selectedRule\" [wrap]=\"treeWrap\" selectionMode=\"single\">\n          <ng-template let-node adaptTreeNodeTemplate=\"pool-without-issues\">\n            <span><i class=\"text-success d-icon-check_circle at-action-icon\"></i>{{ node.label }}</span>\n          </ng-template>\n          <ng-template let-node adaptTreeNodeTemplate=\"pool-with-issues\">\n            <span><i class=\"text-danger d-icon-exclamation_triangle at-action-icon\"></i>{{ node.label }}</span>\n          </ng-template>\n\n          <ng-template let-node adaptTreeNodeTemplate=\"rule-without-issues\">\n            <span class=\"d-flex\" [adaptTooltip]=\"node.data.name\" [popupDelay]=\"1000\"\n              ><i class=\"d-icon-check_circle at-action-icon\" [ngClass]=\"{ 'text-success': node.data.isEditable }\"></i\n              >{{ node.label }}</span\n            >\n          </ng-template>\n          <ng-template let-node adaptTreeNodeTemplate=\"rule-with-issues\">\n            <span class=\"d-flex\" [adaptTooltip]=\"node.data.name\" [popupDelay]=\"1000\"\n              ><i\n                class=\"d-icon-exclamation_triangle at-action-icon\"\n                [ngClass]=\"{ 'text-danger': node.data.isEditable }\"\n              ></i\n              >{{ node.label }}\n            </span>\n          </ng-template>\n          <ng-template let-node adaptTreeNodeTemplate=\"remedy-escalation-with-issues\">\n            <span class=\"d-flex\" [adaptTooltip]=\"node.data.name\" [popupDelay]=\"1000\"\n              ><i class=\"d-icon-clock_alert at-action-icon\"></i>{{ node.label }}</span\n            >\n          </ng-template>\n          <ng-template let-node adaptTreeNodeTemplate=\"remedy-escalation-without-issues\">\n            <span class=\"d-flex\" [adaptTooltip]=\"node.data.name\" [popupDelay]=\"1000\"\n              ><i class=\"d-icon-clock_arrow at-action-icon\"></i>{{ node.label }}</span\n            >\n          </ng-template>\n        </adapt-tree>\n      </div>\n    </div>\n\n    <div class=\"flex-fill pl-4\">\n      <div *ngIf=\"selectedRule?.data as rule; else noRuleSelectedTemplate\">\n        <h5 class=\"mt-0\">\n          {{ strings.ruleSummaryTitle }}\n          <adapt-icon\n            name=\"info_circle_o_adapt\"\n            [adaptPopover]=\"ruleSummaryTooltipTemplate\"\n            maxWidth=\"280\"\n            placement=\"bottom\"\n          ></adapt-icon>\n        </h5>\n\n        <ng-template #ruleSummaryTooltipTemplate>\n          <div [innerHTML]=\"strings.ruleSummaryTooltip\"></div>\n        </ng-template>\n\n        <div class=\"mb-3\">\n          <adapt-rx-control-label [label]=\"strings.ruleNameLabel\"></adapt-rx-control-label>\n\n          <span *ngIf=\"!isRuleDesignerAvailable(); else ruleFullNameWithDesignerLink\" class=\"rule-name-value\">{{\n            rule.name\n          }}</span>\n\n          <ng-template #ruleFullNameWithDesignerLink>\n            <a\n              adapt-button\n              btn-type=\"tertiary\"\n              class=\"d-icon-left-pop_up p-0 border-0 rule-name-value\"\n              rx-id=\"open-rule-designer-button\"\n              target=\"_blank\"\n              href=\"{{ ruleDesignerLink + rule.name }}\"\n            >\n              {{ rule.name }}\n            </a>\n          </ng-template>\n        </div>\n\n        <div class=\"mb-3\">\n          <adapt-rx-control-label [label]=\"strings.timerDefinitionLabel\"></adapt-rx-control-label>\n          <span>{{ rule.timeCriteria | rxRuleTriggerTimeCriteriaDisplayValue }}</span>\n        </div>\n\n        <div class=\"d-flex mb-3\">\n          <div class=\"flex-fill col-4 p-0\">\n            <adapt-rx-control-label [label]=\"strings.numberOfRunsLabel\"></adapt-rx-control-label>\n            <span>{{ rule.numberOfRuns }}</span>\n          </div>\n          <div class=\"flex-fill col-4 p-0\">\n            <adapt-rx-control-label [label]=\"strings.averageLatencyLabel\"></adapt-rx-control-label>\n            <span>{{ rule.avgWaitTime }}</span>\n          </div>\n          <div class=\"flex-fill col-4 p-0\">\n            <adapt-rx-control-label [label]=\"strings.averageExecutionTimeLabel\"></adapt-rx-control-label>\n            <span>{{ rule.avgExecutionTime }}</span>\n          </div>\n        </div>\n\n        <div class=\"d-flex mb-3\">\n          <div class=\"flex-fill col-4 p-0\">\n            <div class=\"pb-1\">\n              <span class=\"form-control-label pr-3\">{{ strings.assignedPoolLabel }}</span>\n\n              <adapt-button\n                btn-type=\"tertiary\"\n                class=\"p-0 border-0\"\n                rx-id=\"reassign-button\"\n                *ngIf=\"rule.isEditable\"\n                (click)=\"openReassignPoolDialog()\"\n                [style.vertical-align]=\"'baseline'\"\n              >\n                <span class=\"d-icon-pencil\"></span>\n                {{ strings.reassignButtonLabel }}\n              </adapt-button>\n            </div>\n            <span>\n              <i\n                *ngIf=\"isAssignedPoolOutOfRange()\"\n                class=\"d-icon-exclamation_triangle at-action-icon\"\n                [ngClass]=\"{ 'text-danger': rule.isEditable }\"\n              ></i>\n              {{ rule.designTimePoolNumber }}\n            </span>\n          </div>\n          <div class=\"flex-fill col-4 p-0\">\n            <adapt-rx-control-label [label]=\"strings.lastStartDateLabel\"></adapt-rx-control-label>\n            <span>{{ rule.lastStartTime | date: 'medium' }}</span>\n          </div>\n          <div class=\"flex-fill col-4 p-0\">\n            <adapt-rx-control-label [label]=\"strings.lastEndDateLabel\"></adapt-rx-control-label>\n            <span>{{ rule.lastEndTime | date: 'medium' }}</span>\n          </div>\n        </div>\n\n        <h5>\n          {{ strings.ruleConflictsTitle }}\n          <i\n            *ngIf=\"ruleConflictsTableConfig.data.length\"\n            class=\"text-danger d-icon-exclamation_triangle\"\n            [ngClass]=\"{ 'text-danger': rule.isEditable }\"\n          ></i>\n        </h5>\n        <adapt-table\n          [columns]=\"ruleConflictsTableConfig.columns\"\n          [bordered]=\"true\"\n          [sortable]=\"true\"\n          [texts]=\"ruleConflictsTableConfig.texts\"\n          [value]=\"ruleConflictsTableConfig.data\"\n        >\n        </adapt-table>\n      </div>\n\n      <ng-template #noRuleSelectedTemplate>\n        <div class=\"d-flex align-items-center justify-content-center h-100\">\n          <adapt-empty-state [type]=\"'rules'\" [label]=\"strings.selectedRuleEmptyStateLabel\"></adapt-empty-state>\n        </div>\n      </ng-template>\n    </div>\n  </div>\n\n  <ng-template #emptyRulePoolsTemplate>\n    <div class=\"d-flex align-items-center h-100\">\n      <adapt-empty-state\n        class=\"flex-fill\"\n        [type]=\"'rules'\"\n        [label]=\"strings.rulePoolsEmptyStateLabel\"\n      ></adapt-empty-state>\n    </div>\n  </ng-template>\n</rx-admin-settings>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}rx-admin-settings{max-height:calc(100vh - 54px)}.overflow-auto{overflow:auto}.page-content-left{width:280px}.rule-name-value{display:inline-block;vertical-align:middle;line-height:1.5385}\n"], components: [{ type: i4.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i5.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i5.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i5.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i5.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i6.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i5.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i5.AdaptTreeNodeTemplateDirective, selector: "[adaptTreeNodeTemplate]", inputs: ["adaptTreeNodeTemplate"] }, { type: i5.AdaptTooltipDirective, selector: "[adaptTooltip]", inputs: ["popupDelay", "placement", "width", "minWidth", "useWidthFitting", "adaptRadarDisableEventSending", "adaptTooltip", "manual"], outputs: ["shown", "hidden"], exportAs: ["tooltip"] }, { type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "rxRuleTriggerTimeCriteriaDisplayValue": i9.RxRuleTriggerTimeCriteriaDisplayValuePipe, "date": i7.DatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RulePoolManagementAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-rule-pool-management',
                    templateUrl: './rule-pool-management.component.html',
                    styleUrls: ['./rule-pool-management.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxRulePoolManagementService }, { type: i3.TranslateService }]; } });
//# sourceMappingURL=rule-pool-management.component.js.map