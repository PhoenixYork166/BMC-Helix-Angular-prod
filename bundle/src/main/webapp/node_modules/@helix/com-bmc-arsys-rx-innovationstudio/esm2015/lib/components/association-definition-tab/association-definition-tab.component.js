import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RX_ASSOCIATION_DEFINITION, RxAssociationCardinalityPipe, RxAssociationConstraintsPipe, RxAssociationDefinitionDataPageService, RxAssociationDefinitionService } from '@helix/platform/association/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_APPLICATION, RX_OVERLAY, RxBundleCacheService, RxCommandFactoryService, RxDefinitionNameService, RxFeatureService, RxOverlayService } from '@helix/platform/shared/api';
import { RenameDefinitionModalComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { noop, some } from 'lodash';
import { BehaviorSubject, forkJoin, from, of } from 'rxjs';
import { filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../bundle-details/bundle-details.constant';
import { DefinitionTabComponent } from '../definition-tab/definition-tab.component';
import { AX_ASSOCIATION_DEFINITION_TAB } from './association-definition-tab.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/association/api";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@angular/router";
import * as i6 from "../definition-tab/definition-tab.component";
import * as i7 from "@angular/common";
export class AssociationDefinitionTabComponent {
    constructor(rxAssociationDefinitionDataPageService, rxAssociationDefinitionService, rxOverlayService, rxModalService, translateService, rxCommandFactoryService, rxBundleCacheService, rxFeatureService, router, rxDefinitionNameService, rxAssociationConstraintsPipe, rxAssociationCardinalityPipe) {
        this.rxAssociationDefinitionDataPageService = rxAssociationDefinitionDataPageService;
        this.rxAssociationDefinitionService = rxAssociationDefinitionService;
        this.rxOverlayService = rxOverlayService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxFeatureService = rxFeatureService;
        this.router = router;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxAssociationConstraintsPipe = rxAssociationConstraintsPipe;
        this.rxAssociationCardinalityPipe = rxAssociationCardinalityPipe;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
        this.gridColumns = [];
        this.isActionInProgress = false;
    }
    ngOnInit() {
        if (this.rxFeatureService.isFeatureEnabled('DRD21-14986')) {
            this.editRouterLink = `/${RX_APPLICATION.innovationStudioBundleId}/association/edit2/`;
        }
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            {
                title: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.firstRecord.titleKey,
                fieldId: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.firstRecord.fieldId
            },
            {
                title: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.cardinalityString.titleKey,
                fieldId: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.cardinalityString.fieldId
            },
            {
                title: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.secondRecord.titleKey,
                fieldId: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.secondRecord.fieldId
            },
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            {
                title: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.shouldCascadeDeleteString.titleKey,
                fieldId: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.shouldCascadeDeleteString.fieldId
            },
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
                id: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.firstRecord.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.cardinalityString.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.secondRecord.fieldId,
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
                id: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.shouldCascadeDeleteString.fieldId,
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
        this.cardinalityStrings = {
            ONE_TO_ONE: this.rxAssociationCardinalityPipe.transform(RX_ASSOCIATION_DEFINITION.cardinality.oneToOne.value),
            ONE_TO_MANY: this.rxAssociationCardinalityPipe.transform(RX_ASSOCIATION_DEFINITION.cardinality.oneToMany.value),
            MANY_TO_MANY: this.rxAssociationCardinalityPipe.transform(RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value)
        };
        this.shouldCascadeDeleteStrings = {
            true: this.rxAssociationConstraintsPipe.transform(true),
            false: this.rxAssociationConstraintsPipe.transform(false)
        };
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
        this.definitions$ = this.rxAssociationDefinitionDataPageService
            .get({
            params: {
                propertySelection: [
                    'name',
                    'nodeAId',
                    'cardinality',
                    'nodeBId',
                    'shouldCascadeDelete',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'customizationPerspective',
                    'isEnabled',
                    'scope',
                    'overlayGroupId',
                    'overlayDescriptor'
                ]
            }
        })
            .pipe(map((dataPage) => ({
            totalSize: dataPage.totalSize,
            data: dataPage.data.map((association) => (Object.assign(Object.assign({}, association), { firstRecord: this.rxDefinitionNameService.getDisplayName(association.nodeAId), secondRecord: this.rxDefinitionNameService.getDisplayName(association.nodeBId), cardinalityString: this.cardinalityStrings[association.cardinality], shouldCascadeDeleteString: this.shouldCascadeDeleteStrings[String(association.shouldCascadeDelete)] })))
        })));
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor)
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
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup)
            }
        ];
    }
    onAddDefinition() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            'association',
            this.rxFeatureService.isFeatureEnabled('DRD21-14986') ? 'new2' : 'new',
            this.rxBundleCacheService.bundleId
        ]);
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.association.label');
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
        }), switchMap((newViewDefinitionName) => this.rxAssociationDefinitionService.rename(selectedRow.name, newViewDefinitionName)), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
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
                .forResourceType('com.bmc.arsys.rx.application.association.command.DeleteAssociationDefinitionsCommand')
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
            ? forkJoin(selectedRows.map((definition) => this.rxAssociationDefinitionService.revertCustomization(definition.name))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
}
/** @nocollapse */ AssociationDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDefinitionTabComponent, deps: [{ token: i1.RxAssociationDefinitionDataPageService }, { token: i1.RxAssociationDefinitionService }, { token: i2.RxOverlayService }, { token: i3.RxModalService }, { token: i4.TranslateService }, { token: i2.RxCommandFactoryService }, { token: i2.RxBundleCacheService }, { token: i2.RxFeatureService }, { token: i5.Router }, { token: i2.RxDefinitionNameService }, { token: i1.RxAssociationConstraintsPipe }, { token: i1.RxAssociationCardinalityPipe }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ AssociationDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AssociationDefinitionTabComponent, selector: "ax-association-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, providers: [RxAssociationCardinalityPipe, RxAssociationConstraintsPipe], viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'association'\"\n  [editRouterLink]=\"editRouterLink\"\n  (addDefinition)=\"onAddDefinition()\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n></ax-definition-tab>\n", components: [{ type: i6.DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i7.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-association-definition-tab',
                    templateUrl: './association-definition-tab.component.html',
                    providers: [RxAssociationCardinalityPipe, RxAssociationConstraintsPipe]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxAssociationDefinitionDataPageService }, { type: i1.RxAssociationDefinitionService }, { type: i2.RxOverlayService }, { type: i3.RxModalService }, { type: i4.TranslateService }, { type: i2.RxCommandFactoryService }, { type: i2.RxBundleCacheService }, { type: i2.RxFeatureService }, { type: i5.Router }, { type: i2.RxDefinitionNameService }, { type: i1.RxAssociationConstraintsPipe }, { type: i1.RxAssociationCardinalityPipe }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });
//# sourceMappingURL=association-definition-tab.component.js.map