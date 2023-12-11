import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { RxProcessDefinitionDataPageService } from '@helix/platform/process/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_APPLICATION, RX_OVERLAY, RxBundleCacheService, RxCommandFactoryService, RxFeatureService, RxOverlayService } from '@helix/platform/shared/api';
import { RenameDefinitionModalComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { noop, some } from 'lodash';
import { BehaviorSubject, forkJoin, from, of } from 'rxjs';
import { filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../bundle-details/bundle-details.constant';
import { RxCopyDefinitionService } from '../copy-definition/copy-definition.service';
import { CopyDefinitionType } from '../copy-definition/copy-definition.types';
import { DefinitionTabComponent } from '../definition-tab/definition-tab.component';
import { AX_PROCESS_DEFINITION_TAB } from './process-definition-tab.constant';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/router";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/process/api";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@ngx-translate/core";
import * as i7 from "../copy-definition/copy-definition.service";
import * as i8 from "../definition-tab/definition-tab.component";
import * as i9 from "@angular/common";
export class ProcessDefinitionTabComponent {
    constructor(adaptModalService, router, rxOverlayService, rxBundleCacheService, rxCommandFactoryService, rxProcessDefinitionDataPageService, rxModalService, translateService, rxCopyDefinitionService, rxFeatureService) {
        this.adaptModalService = adaptModalService;
        this.router = router;
        this.rxOverlayService = rxOverlayService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxProcessDefinitionDataPageService = rxProcessDefinitionDataPageService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.rxFeatureService = rxFeatureService;
        this.gridColumns = [];
        this.isActionInProgress = false;
        this.definitions$ = this.rxProcessDefinitionDataPageService.get({
            params: {
                propertySelection: [
                    'name',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'scope',
                    'customizationPerspective',
                    'overlayGroupId',
                    'overlayDescriptor',
                    'isEnabled'
                ],
                bundleId: this.rxBundleCacheService.bundleId
            }
        });
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
    }
    ngOnInit() {
        if (this.rxFeatureService.isFeatureEnabled('DRD21-11025')) {
            this.editRouterLink = `/${RX_APPLICATION.innovationStudioBundleId}/process/edit2/`;
        }
        this.areNewDefinitionsAllowed = this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor);
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            AX_BUNDLE_DETAILS.definitionGridColumns.scope,
            AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective,
            AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled
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
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.boolean
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
    onCustomAction({ actionId, selectedRows }) {
        if (actionId === AX_PROCESS_DEFINITION_TAB.manageProcesses) {
            const route = [RX_APPLICATION.innovationStudioBundleId, 'process', 'manage', this.rxBundleCacheService.bundleId];
            if (selectedRows.length > 0) {
                this.router.navigate(route, { queryParams: { definitionName: selectedRows[0].name } });
            }
            else {
                this.router.navigate(route);
            }
        }
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService
            .openCopyDefinitionComponentModal(row, CopyDefinitionType.Process, this.rxFeatureService.isFeatureEnabled('DRD21-11025') ? 'edit2' : 'edit')
            .catch(noop);
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
                .forResourceType('com.bmc.arsys.rx.application.process.command.DeleteProcessDefinitionsCommand')
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
    onAddDefinition() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            'process',
            this.rxFeatureService.isFeatureEnabled('DRD21-11025') ? 'new2' : 'new',
            this.rxBundleCacheService.bundleId
        ]);
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
            ? forkJoin(selectedRows.map((definition) => this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.process.command.RevertProcessDefinitionCommand')
                .execute({
                processDefinitionName: definition.name
            }))).pipe(tap(() => {
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
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.process.label');
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
        }), switchMap((newViewDefinitionName) => this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.process.command.RenameProcessDefinitionCommand')
            .execute({
            name: selectedRow.name,
            newName: newViewDefinitionName
        })), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        const definitionActions = [
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
                isDisabled: !isBundleEditable || selectedRows.length !== 1
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup)
            },
            {
                id: AX_PROCESS_DEFINITION_TAB.manageProcesses,
                isDisabled: !isBundleEditable || selectedRows.length > 1,
                labelKey: 'com.bmc.arsys.rx.innovation-studio.manage-processes.menu.label',
                rxId: 'manage-processes-button',
                icon: 'flow'
            }
        ];
        return definitionActions;
    }
}
/** @nocollapse */ ProcessDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDefinitionTabComponent, deps: [{ token: i1.AdaptModalService }, { token: i2.Router }, { token: i3.RxOverlayService }, { token: i3.RxBundleCacheService }, { token: i3.RxCommandFactoryService }, { token: i4.RxProcessDefinitionDataPageService }, { token: i5.RxModalService }, { token: i6.TranslateService }, { token: i7.RxCopyDefinitionService }, { token: i3.RxFeatureService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ProcessDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessDefinitionTabComponent, selector: "ax-process-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'process'\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (customAction)=\"onCustomAction($event)\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (addDefinition)=\"onAddDefinition()\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n  [editRouterLink]=\"editRouterLink\"\n></ax-definition-tab>\n", components: [{ type: i8.DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i9.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-process-definition-tab',
                    templateUrl: './process-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptModalService }, { type: i2.Router }, { type: i3.RxOverlayService }, { type: i3.RxBundleCacheService }, { type: i3.RxCommandFactoryService }, { type: i4.RxProcessDefinitionDataPageService }, { type: i5.RxModalService }, { type: i6.TranslateService }, { type: i7.RxCopyDefinitionService }, { type: i3.RxFeatureService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });
//# sourceMappingURL=process-definition-tab.component.js.map