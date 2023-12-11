import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RxNamedListDefinitionDataPageService, RxNamedListDefinitionService } from '@helix/platform/named-list/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_APPLICATION, RX_OVERLAY, RxBundleCacheService, RxCommandFactoryService, RxDefinitionNameService, RxOverlayService } from '@helix/platform/shared/api';
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
import { AX_NAMED_LIST_DEFINITION_TAB } from './named-list-definition-tab.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/named-list/api";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@angular/router";
import * as i6 from "../copy-definition/copy-definition.service";
import * as i7 from "../definition-tab/definition-tab.component";
import * as i8 from "@angular/common";
export class NamedListDefinitionTabComponent {
    constructor(rxNamedListDefinitionDataPageService, rxOverlayService, rxBundleCacheService, translateService, rxModalService, rxCommandFactoryService, rxNamedListDefinitionService, router, rxCopyDefinitionService, rxDefinitionNameService) {
        this.rxNamedListDefinitionDataPageService = rxNamedListDefinitionDataPageService;
        this.rxOverlayService = rxOverlayService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.translateService = translateService;
        this.rxModalService = rxModalService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxNamedListDefinitionService = rxNamedListDefinitionService;
        this.router = router;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.isActionInProgress = false;
        this.definitions$ = this.rxNamedListDefinitionDataPageService
            .get({
            params: {
                propertySelection: [
                    'name',
                    'recordDefinitionName',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'customizationPerspective',
                    'scope',
                    'overlayGroupId',
                    'overlayDescriptor'
                ]
            }
        })
            .pipe(tap((dataPage) => {
            dataPage.data.forEach((namedList) => {
                namedList.recordDefinitionName = this.rxDefinitionNameService.getDisplayName(namedList.recordDefinitionName);
            });
        }));
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
    }
    ngOnInit() {
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            {
                title: AX_NAMED_LIST_DEFINITION_TAB.definitionGridColumns.recordDefinitionName.title,
                fieldId: AX_NAMED_LIST_DEFINITION_TAB.definitionGridColumns.recordDefinitionName.fieldId
            },
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
                id: AX_NAMED_LIST_DEFINITION_TAB.definitionGridColumns.recordDefinitionName.fieldId,
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
    }
    onAddDefinition() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            'named-list',
            'new',
            this.rxBundleCacheService.bundleId
        ]);
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.named-list.label');
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
        }), switchMap((newViewDefinitionName) => this.rxNamedListDefinitionService.rename(selectedRow.name, newViewDefinitionName)), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
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
            ? this.rxNamedListDefinitionService.delete(definitionNames).pipe(tap(() => {
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
            ? forkJoin(selectedRows.map((definition) => this.rxNamedListDefinitionService.revertCustomization(definition.name))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
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
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.copy,
                isDisabled: !isBundleEditable || selectedRows.length !== 1
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup)
            }
        ];
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService
            .openCopyDefinitionComponentModal(row, CopyDefinitionType.NamedList, 'edit')
            .catch(noop);
    }
}
/** @nocollapse */ NamedListDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDefinitionTabComponent, deps: [{ token: i1.RxNamedListDefinitionDataPageService }, { token: i2.RxOverlayService }, { token: i2.RxBundleCacheService }, { token: i3.TranslateService }, { token: i4.RxModalService }, { token: i2.RxCommandFactoryService }, { token: i1.RxNamedListDefinitionService }, { token: i5.Router }, { token: i6.RxCopyDefinitionService }, { token: i2.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ NamedListDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: NamedListDefinitionTabComponent, selector: "ax-named-list-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'named-list'\"\n  (addDefinition)=\"onAddDefinition()\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n></ax-definition-tab>\n", components: [{ type: i7.DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-named-list-definition-tab',
                    templateUrl: './named-list-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxNamedListDefinitionDataPageService }, { type: i2.RxOverlayService }, { type: i2.RxBundleCacheService }, { type: i3.TranslateService }, { type: i4.RxModalService }, { type: i2.RxCommandFactoryService }, { type: i1.RxNamedListDefinitionService }, { type: i5.Router }, { type: i6.RxCopyDefinitionService }, { type: i2.RxDefinitionNameService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });
//# sourceMappingURL=named-list-definition-tab.component.js.map