import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxRuleDefinitionDataPageService, RxRuleDefinitionService, RxRuleTriggerEventPipe } from '@helix/platform/rule/api';
import { RX_APPLICATION, RX_BUNDLE, RX_OVERLAY, RxBundleCacheService, RxCommandFactoryService, RxDefinitionNameService, RxGlobalCacheService, RxOverlayService } from '@helix/platform/shared/api';
import { RenameDefinitionModalComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { assign, map as _map, noop, some } from 'lodash';
import { BehaviorSubject, forkJoin, from, of } from 'rxjs';
import { filter, finalize, map, switchMap, take, tap } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../bundle-details/bundle-details.constant';
import { RxCopyDefinitionService } from '../copy-definition/copy-definition.service';
import { DefinitionTabComponent } from '../definition-tab/definition-tab.component';
import { AX_RULE_DEFINITION_TAB } from './rule-definition-tab.contant';
import { CopyDefinitionType } from '../copy-definition/copy-definition.types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/rule/api";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@ngx-translate/core";
import * as i6 from "../copy-definition/copy-definition.service";
import * as i7 from "../definition-tab/definition-tab.component";
import * as i8 from "@angular/common";
export class RuleDefinitionTabComponent {
    constructor(router, rxRuleTriggerEventPipe, rxRuleDefinitionService, rxOverlayService, rxRuleDefinitionDataPageService, rxModalService, translateService, rxCommandFactoryService, rxBundleCacheService, rxGlobalCacheService, rxCopyDefinitionService, rxDefinitionNameService) {
        this.router = router;
        this.rxRuleTriggerEventPipe = rxRuleTriggerEventPipe;
        this.rxRuleDefinitionService = rxRuleDefinitionService;
        this.rxOverlayService = rxOverlayService;
        this.rxRuleDefinitionDataPageService = rxRuleDefinitionDataPageService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
        this.definitions$ = forkJoin([
            this.rxBundleCacheService.bundleId$.pipe(take(1), switchMap((bundleId) => this.rxGlobalCacheService.getBundleDescriptor(bundleId))),
            this.rxRuleDefinitionDataPageService.get({
                params: {
                    propertySelection: [
                        AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                        AX_RULE_DEFINITION_TAB.definitionGridColumns.recordDefinitionNames.fieldId,
                        AX_RULE_DEFINITION_TAB.definitionGridColumns.triggerEvent.fieldId,
                        AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                        AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                        AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled.fieldId,
                        AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId,
                        AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId,
                        'overlayGroupId'
                    ]
                }
            })
        ]).pipe(map(([bundleDescriptor, dataPage]) => {
            dataPage.data = _map(dataPage.data, (definition) => {
                if (definition.scope === RX_BUNDLE.definitionScopeTypes.bundle) {
                    definition.scope = bundleDescriptor.isApplication
                        ? RX_BUNDLE.definitionScopeNames.application
                        : RX_BUNDLE.definitionScopeNames.library;
                }
                else {
                    definition.scope = RX_BUNDLE.definitionScopeNames.public;
                }
                return assign(definition, {
                    primaryRecordDefinition: this.rxDefinitionNameService.getDisplayName(definition.recordDefinitionNames[0]) ||
                        this.translateService.instant('com.bmc.arsys.rx.client.common.not-applicable.label'),
                    executionOrder: definition.triggerEvent.executionOrder,
                    triggerEvent: this.rxRuleTriggerEventPipe.transform(definition.triggerEvent)
                });
            });
            return dataPage;
        }));
        this.gridColumns = [];
        this.isActionInProgress = false;
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.areNewDefinitionsAllowed
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.rename,
                isDisabled: !isBundleEditable ||
                    !(selectedRows.length === 1 &&
                        this.rxOverlayService.isCustomizationEnabled('allowOverlay', selectedRows[0]))
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.revertCustomization,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.customizedInThisOverlayGroup)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.copy,
                isDisabled: !this.areNewDefinitionsAllowed || selectedRows.length !== 1
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup)
            }
        ];
    }
    ngOnInit() {
        this.areNewDefinitionsAllowed = this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor);
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            {
                title: AX_RULE_DEFINITION_TAB.definitionGridColumns.primaryRecordDefinition.titleKey,
                fieldId: AX_RULE_DEFINITION_TAB.definitionGridColumns.primaryRecordDefinition.fieldId
            },
            {
                title: AX_RULE_DEFINITION_TAB.definitionGridColumns.triggerEvent.titleKey,
                fieldId: AX_RULE_DEFINITION_TAB.definitionGridColumns.triggerEvent.fieldId
            },
            {
                title: AX_RULE_DEFINITION_TAB.definitionGridColumns.executionOrder.titleKey,
                fieldId: AX_RULE_DEFINITION_TAB.definitionGridColumns.executionOrder.fieldId
            },
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled,
            AX_BUNDLE_DETAILS.definitionGridColumns.scope,
            AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_RULE_DEFINITION_TAB.definitionGridColumns.primaryRecordDefinition.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_RULE_DEFINITION_TAB.definitionGridColumns.executionOrder.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_RULE_DEFINITION_TAB.definitionGridColumns.triggerEvent.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.boolean
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.rule.label');
        from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.title', {
                definitionType: definitionType.toLowerCase()
            }),
            size: 'sm',
            content: RenameDefinitionModalComponent,
            data: {
                definitionName: selectedRow.name,
                infoText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.info.message'),
                fieldLabel: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.definition-name.label', { definitionType }),
                validationErrorText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.name-validation.message', { definitionType }),
                definitionType,
                definitionNames
            }
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), switchMap((newRuleDefinitionName) => this.rxRuleDefinitionService.rename(selectedRow.name, newRuleDefinitionName)), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService.openCopyDefinitionComponentModal(row, CopyDefinitionType.Rule).catch(noop);
    }
    onDeleteDefinition(selectedRows) {
        const definitionNames = selectedRows.map((definition) => definition.name);
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((response) => response
            ? this.rxCommandFactoryService
                .forResourceType(AX_RULE_DEFINITION_TAB.deleteRuleResource)
                .execute({
                definitionNames
            })
                .pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRevertCustomization(selectedRows) {
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.revert-customization.confirmation.message')
        }))
            .pipe(tap(() => {
            this.isActionInProgress = true;
        }), switchMap((response) => response
            ? forkJoin(selectedRows.map((definition) => this.rxRuleDefinitionService.revertCustomization(definition.name))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onAddDefinition() {
        this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'rule', 'new', this.rxBundleCacheService.bundleId]);
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
}
/** @nocollapse */ RuleDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuleDefinitionTabComponent, deps: [{ token: i1.Router }, { token: i2.RxRuleTriggerEventPipe }, { token: i2.RxRuleDefinitionService }, { token: i3.RxOverlayService }, { token: i2.RxRuleDefinitionDataPageService }, { token: i4.RxModalService }, { token: i5.TranslateService }, { token: i3.RxCommandFactoryService }, { token: i3.RxBundleCacheService }, { token: i3.RxGlobalCacheService }, { token: i6.RxCopyDefinitionService }, { token: i3.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ RuleDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuleDefinitionTabComponent, selector: "ax-rule-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, providers: [RxRuleTriggerEventPipe], viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }, { propertyName: "definitionNameCellTemplate", first: true, predicate: ["definitionNameCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'rule'\"\n  (addDefinition)=\"onAddDefinition()\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n></ax-definition-tab>\n", components: [{ type: i7.DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuleDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-rule-definition-tab',
                    templateUrl: './rule-definition-tab.component.html',
                    providers: [RxRuleTriggerEventPipe]
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.RxRuleTriggerEventPipe }, { type: i2.RxRuleDefinitionService }, { type: i3.RxOverlayService }, { type: i2.RxRuleDefinitionDataPageService }, { type: i4.RxModalService }, { type: i5.TranslateService }, { type: i3.RxCommandFactoryService }, { type: i3.RxBundleCacheService }, { type: i3.RxGlobalCacheService }, { type: i6.RxCopyDefinitionService }, { type: i3.RxDefinitionNameService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }], definitionNameCellTemplate: [{
                type: ViewChild,
                args: ['definitionNameCellTemplate', { static: true }]
            }] } });
//# sourceMappingURL=rule-definition-tab.component.js.map