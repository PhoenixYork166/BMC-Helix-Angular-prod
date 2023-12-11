import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RxeventStatisticsDefinitionDataPageService, RxEventStatisticsDefinitionService } from '@helix/platform/event-statistics/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_APPLICATION, RX_OVERLAY, RxBundleCacheService, RxCommandFactoryService, RxOverlayService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { noop, some } from 'lodash';
import { BehaviorSubject, forkJoin, from, of } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../bundle-details/bundle-details.constant';
import { DefinitionTabComponent } from '../definition-tab/definition-tab.component';
import { AX_EVENT_STATISTICS_TAB } from './event-statistics-definition-tab.constant';
import { RxCopyDefinitionService } from '../copy-definition/copy-definition.service';
import { CopyDefinitionType } from '../copy-definition/copy-definition.types';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/event-statistics/api";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@angular/router";
import * as i6 from "../copy-definition/copy-definition.service";
import * as i7 from "../definition-tab/definition-tab.component";
import * as i8 from "@angular/common";
export class EventStatisticsDefinitionTabComponent {
    constructor(rxEventStatisticsDefinitionDataPageService, rxOverlayService, translateService, rxModalService, rxCommandFactoryService, rxBundleCacheService, rxEventStatisticsDefinitionService, router, rxCopyDefinitionService) {
        this.rxEventStatisticsDefinitionDataPageService = rxEventStatisticsDefinitionDataPageService;
        this.rxOverlayService = rxOverlayService;
        this.translateService = translateService;
        this.rxModalService = rxModalService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxEventStatisticsDefinitionService = rxEventStatisticsDefinitionService;
        this.router = router;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.gridColumns = [];
        this.isActionInProgress = false;
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
    }
    ngOnInit() {
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            {
                title: AX_EVENT_STATISTICS_TAB.definitionGridColumns.eventName.title,
                fieldId: AX_EVENT_STATISTICS_TAB.definitionGridColumns.eventName.fieldId,
                cellTemplate: this.eventNameCellTemplate
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
                id: AX_EVENT_STATISTICS_TAB.definitionGridColumns.eventName.fieldId,
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
        this.definitions$ = this.rxEventStatisticsDefinitionDataPageService.get({
            params: {
                propertySelection: [
                    'name',
                    'eventName',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'isEnabled',
                    'customizationPerspective',
                    'scope'
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
    onAddDefinition() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            'event-statistics',
            'new',
            this.rxBundleCacheService.bundleId
        ]);
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
                .forResourceType('com.bmc.arsys.rx.application.event.command.DeleteEventStatisticsDefinitionsCommand')
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
            ? forkJoin(selectedRows.map((definition) => this.rxEventStatisticsDefinitionService.revertCustomization(definition.name))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService.openCopyDefinitionComponentModal(row, CopyDefinitionType.EventStatistics).catch(noop);
    }
}
/** @nocollapse */ EventStatisticsDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventStatisticsDefinitionTabComponent, deps: [{ token: i1.RxeventStatisticsDefinitionDataPageService }, { token: i2.RxOverlayService }, { token: i3.TranslateService }, { token: i4.RxModalService }, { token: i2.RxCommandFactoryService }, { token: i2.RxBundleCacheService }, { token: i1.RxEventStatisticsDefinitionService }, { token: i5.Router }, { token: i6.RxCopyDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ EventStatisticsDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: EventStatisticsDefinitionTabComponent, selector: "ax-event-statistics-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }, { propertyName: "eventNameCellTemplate", first: true, predicate: ["eventNameCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'event-statistics'\"\n  (addDefinition)=\"onAddDefinition()\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n></ax-definition-tab>\n\n<ng-template #eventNameCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.eventName | rxDefinitionNamePipe }}\n</ng-template>\n", components: [{ type: i7.DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventStatisticsDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-event-statistics-definition-tab',
                    templateUrl: './event-statistics-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxeventStatisticsDefinitionDataPageService }, { type: i2.RxOverlayService }, { type: i3.TranslateService }, { type: i4.RxModalService }, { type: i2.RxCommandFactoryService }, { type: i2.RxBundleCacheService }, { type: i1.RxEventStatisticsDefinitionService }, { type: i5.Router }, { type: i6.RxCopyDefinitionService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }], eventNameCellTemplate: [{
                type: ViewChild,
                args: ['eventNameCellTemplate', { static: true }]
            }] } });
//# sourceMappingURL=event-statistics-definition-tab.component.js.map