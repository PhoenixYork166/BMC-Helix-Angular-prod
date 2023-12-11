import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_APPLICATION, RX_OVERLAY, RxBundleCacheService, RxCommandFactoryService, RxOverlayService } from '@helix/platform/shared/api';
import { RenameDefinitionModalComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { LayoutTypes, RX_VIEW_DEFINITION, RX_VIEW_LAYOUTS, RxViewDefinitionDataPageService, RxViewDefinitionService } from '@helix/platform/view/api';
import { TranslateService } from '@ngx-translate/core';
import { concat, filter as _filter, noop, some } from 'lodash';
import { BehaviorSubject, forkJoin, from, of } from 'rxjs';
import { filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../bundle-details/bundle-details.constant';
import { RxCopyDefinitionService } from '../copy-definition/copy-definition.service';
import { DefinitionTabComponent } from '../definition-tab/definition-tab.component';
import { CopyDefinitionType } from '../copy-definition/copy-definition.types';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/view/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@angular/router";
import * as i6 from "../copy-definition/copy-definition.service";
import * as i7 from "../definition-tab/definition-tab.component";
import * as i8 from "@angular/common";
export class ViewDefinitionTabComponent {
    constructor(rxOverlayService, rxViewDefinitionDataPageService, rxModalService, translateService, rxCommandFactoryService, router, rxBundleCacheService, rxViewDefinitionService, rxCopyDefinitionService) {
        this.rxOverlayService = rxOverlayService;
        this.rxViewDefinitionDataPageService = rxViewDefinitionDataPageService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.router = router;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
        this.gridColumns = [];
        this.isActionInProgress = false;
    }
    getNewViewSubAction(layout) {
        return {
            id: String(layout.id),
            rxId: 'view-layout-template-' + layout.id,
            labelKey: layout.label
        };
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.areNewDefinitionsAllowed,
                subActions: concat({
                    groupTitle: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.view.layout-flexible.menu.label')
                }, _filter(RX_VIEW_LAYOUTS, { layoutType: LayoutTypes.Flexible }).map(this.getNewViewSubAction), {
                    groupTitle: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.view.layout-fixed.menu.label')
                }, _filter(RX_VIEW_LAYOUTS, { layoutType: LayoutTypes.Fixed }).map(this.getNewViewSubAction))
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
                isDisabled: selectedRows.length !== 1 || !isBundleEditable
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
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            AX_BUNDLE_DETAILS.definitionGridColumns.scope,
            AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
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
        this.definitions$ = this.rxViewDefinitionDataPageService.get({
            params: {
                propertySelection: [
                    'name',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'scope',
                    'customizationPerspective',
                    'overlayGroupId',
                    'overlayDescriptor'
                ],
                viewType: RX_VIEW_DEFINITION.types.regular,
                excludeExtensionViews: false
            }
        });
    }
    onCustomAction(event) {
        this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'view', 'new', this.rxBundleCacheService.bundleId], {
            queryParams: { layoutTemplate: event.actionId }
        });
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService.openCopyDefinitionComponentModal(row, CopyDefinitionType.View).catch(noop);
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
                .forResourceType('com.bmc.arsys.rx.application.view.command.DeleteViewDefinitionsCommand')
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
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.view.label');
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
        }), switchMap((newViewDefinitionName) => this.rxViewDefinitionService.rename(selectedRow.name, newViewDefinitionName)), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
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
            ? forkJoin(selectedRows.map((definition) => this.rxViewDefinitionService.revertCustomization(definition.name))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
}
/** @nocollapse */ ViewDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDefinitionTabComponent, deps: [{ token: i1.RxOverlayService }, { token: i2.RxViewDefinitionDataPageService }, { token: i3.RxModalService }, { token: i4.TranslateService }, { token: i1.RxCommandFactoryService }, { token: i5.Router }, { token: i1.RxBundleCacheService }, { token: i2.RxViewDefinitionService }, { token: i6.RxCopyDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ViewDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ViewDefinitionTabComponent, selector: "ax-view-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'view'\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (customAction)=\"onCustomAction($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n></ax-definition-tab>\n", components: [{ type: i7.DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-view-definition-tab',
                    templateUrl: './view-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxOverlayService }, { type: i2.RxViewDefinitionDataPageService }, { type: i3.RxModalService }, { type: i4.TranslateService }, { type: i1.RxCommandFactoryService }, { type: i5.Router }, { type: i1.RxBundleCacheService }, { type: i2.RxViewDefinitionService }, { type: i6.RxCopyDefinitionService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });
//# sourceMappingURL=view-definition-tab.component.js.map