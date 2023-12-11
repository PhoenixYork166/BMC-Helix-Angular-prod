import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_APPLICATION, RX_OVERLAY, RxBundleCacheService, RxCommandFactoryService, RxOverlayService } from '@helix/platform/shared/api';
import { RenameDefinitionModalComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RxWebApiDefinitionDataPageService, RxWebApiDefinitionService } from '@helix/platform/web-api/api';
import { TranslateService } from '@ngx-translate/core';
import { lowerFirst, noop, some } from 'lodash';
import { BehaviorSubject, from, of } from 'rxjs';
import { filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../bundle-details/bundle-details.constant';
import { RxCopyDefinitionService } from '../copy-definition/copy-definition.service';
import { DefinitionTabComponent } from '../definition-tab/definition-tab.component';
import { AX_WEB_API_DEFINITION_TAB } from './web-api-definition-tab.constant';
import { CopyDefinitionType } from '../copy-definition/copy-definition.types';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/web-api/api";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@angular/router";
import * as i6 from "../copy-definition/copy-definition.service";
import * as i7 from "../definition-tab/definition-tab.component";
import * as i8 from "@angular/common";
export class WebApiDefinitionTabComponent {
    constructor(rxWebApiDefinitionDataPageService, rxWebApiDefinitionService, rxOverlayService, rxModalService, translateService, rxCommandFactoryService, rxBundleCacheService, router, rxCopyDefinitionService) {
        this.rxWebApiDefinitionDataPageService = rxWebApiDefinitionDataPageService;
        this.rxWebApiDefinitionService = rxWebApiDefinitionService;
        this.rxOverlayService = rxOverlayService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.router = router;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
        this.gridColumns = [];
        this.isActionInProgress = false;
    }
    ngOnInit() {
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            AX_BUNDLE_DETAILS.definitionGridColumns.scope,
            AX_WEB_API_DEFINITION_TAB.definitionGridColumns.description
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
                id: AX_WEB_API_DEFINITION_TAB.definitionGridColumns.description.fieldId,
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
        this.definitions$ = this.rxWebApiDefinitionDataPageService.get({
            params: {
                propertySelection: [
                    'name',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'description',
                    'scope',
                    'customizationPerspective',
                    'overlayGroupId',
                    'overlayDescriptor'
                ]
            }
        });
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
    onAddDefinition() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            'web-api',
            'new',
            this.rxBundleCacheService.bundleId
        ]);
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.web-api.label');
        from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.title', {
                definitionType: lowerFirst(definitionType)
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
        }), switchMap((newWebApiDefinitionName) => this.rxWebApiDefinitionService.rename(selectedRow.name, newWebApiDefinitionName)), finalize(() => {
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
                .forResourceType('com.bmc.arsys.rx.application.webapi.command.DeleteWebApiDefinitionsCommand')
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
    onCopyDefinition(row) {
        this.rxCopyDefinitionService.openCopyDefinitionComponentModal(row, CopyDefinitionType.WebApi).catch(noop);
    }
}
/** @nocollapse */ WebApiDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiDefinitionTabComponent, deps: [{ token: i1.RxWebApiDefinitionDataPageService }, { token: i1.RxWebApiDefinitionService }, { token: i2.RxOverlayService }, { token: i3.RxModalService }, { token: i4.TranslateService }, { token: i2.RxCommandFactoryService }, { token: i2.RxBundleCacheService }, { token: i5.Router }, { token: i6.RxCopyDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ WebApiDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: WebApiDefinitionTabComponent, selector: "ax-web-api-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'web-api'\"\n  (addDefinition)=\"onAddDefinition()\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n></ax-definition-tab>\n", components: [{ type: i7.DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-web-api-definition-tab',
                    templateUrl: './web-api-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxWebApiDefinitionDataPageService }, { type: i1.RxWebApiDefinitionService }, { type: i2.RxOverlayService }, { type: i3.RxModalService }, { type: i4.TranslateService }, { type: i2.RxCommandFactoryService }, { type: i2.RxBundleCacheService }, { type: i5.Router }, { type: i6.RxCopyDefinitionService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });
//# sourceMappingURL=web-api-definition-tab.component.js.map