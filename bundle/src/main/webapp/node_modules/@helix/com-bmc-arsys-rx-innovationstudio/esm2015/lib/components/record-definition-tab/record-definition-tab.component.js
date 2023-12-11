import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RX_RECORD_DEFINITION, RxRecordDefinitionDataPageService, RxRecordDefinitionService, RxRecordInstanceService, RxRecordInstanceUpdateService, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RX_APPLICATION, RX_OVERLAY, RxBundleCacheService, RxCommandFactoryService, RxFeatureService, RxNotificationService, RxOverlayService } from '@helix/platform/shared/api';
import { RenameDefinitionModalComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RowDataItemIdFieldName } from '@helix/platform/view/api';
import { TranslateService } from '@ngx-translate/core';
import { noop, some } from 'lodash';
import { BehaviorSubject, forkJoin, from, of, ReplaySubject } from 'rxjs';
import { filter, finalize, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../bundle-details/bundle-details.constant';
import { RxCopyDefinitionService } from '../copy-definition/copy-definition.service';
import { DefinitionTabComponent } from '../definition-tab/definition-tab.component';
import { ExternalRecordWizardService } from '../external-record-wizard/external-record-wizard.service';
import { JoinRecordWizardService } from '../join-record-wizard/join-record-wizard.service';
import { CopyDefinitionType } from '../copy-definition/copy-definition.types';
import { AX_RECORD_DEFINITION_TAB } from './record-definition-tab.constant';
import { CreateCustomRecordComponent } from '../create-custom-record/create-custom-record.component';
import { CreateJoinRecordComponent } from '../create-join-record/create-join-record.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@angular/router";
import * as i6 from "../copy-definition/copy-definition.service";
import * as i7 from "../join-record-wizard/join-record-wizard.service";
import * as i8 from "../external-record-wizard/external-record-wizard.service";
import * as i9 from "../definition-tab/definition-tab.component";
import * as i10 from "@angular/common";
import * as i11 from "./record-definition-type.pipe";
export class RecordDefinitionTabComponent {
    constructor(rxRecordDefinitionDataPageService, rxBundleCache, rxOverlayService, rxModalService, translateService, rxCommandFactoryService, router, rxCopyDefinitionService, joinRecordWizardService, externalRecordWizardService, rxRecordDefinitionService, rxNotificationService, rxRecordInstanceService, rxRecordInstanceUpdateService, rxRecordInstanceDataPageService, rxFeatureService) {
        this.rxRecordDefinitionDataPageService = rxRecordDefinitionDataPageService;
        this.rxBundleCache = rxBundleCache;
        this.rxOverlayService = rxOverlayService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.router = router;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.joinRecordWizardService = joinRecordWizardService;
        this.externalRecordWizardService = externalRecordWizardService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxRecordInstanceUpdateService = rxRecordInstanceUpdateService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxFeatureService = rxFeatureService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.destroyed$ = new ReplaySubject(1);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)), takeUntil(this.destroyed$));
        this.gridColumns = [];
        this.isActionInProgress = false;
        this.dataEditorRoute = this.rxFeatureService.isFeatureEnabled('DRD21-10996') ? 'edit-data-new' : 'edit-data';
    }
    ngOnInit() {
        if (this.rxFeatureService.isFeatureEnabled('DRD21-15263')) {
            this.editRouterLink = `/${RX_APPLICATION.innovationStudioBundleId}/record/edit2/`;
        }
        this.areNewDefinitionsAllowed = this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor);
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            {
                fieldId: 'recordDefinitionType',
                title: 'com.bmc.arsys.rx.client.common.item-type.label',
                index: 3,
                cellTemplate: this.recordDefinitionTypeTemplate
            },
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
                id: 'recordDefinitionType',
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
        this.definitions$ = this.rxRecordDefinitionDataPageService.get({
            params: {
                propertySelection: [
                    'name',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'customizationPerspective',
                    'recordDefinitionType',
                    'overlayGroupId',
                    'overlayDescriptor',
                    'isAuditRecordDefinition',
                    'scope',
                    'externalDataSourceType',
                    'archiveSourceRecordDefinitionName',
                    'type'
                ]
            }
        });
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
        }), switchMap((result) => result
            ? this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.record.command.DeleteRecordDefinitionsCommand')
                .execute({
                definitionNames
            })
                .pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of(false)), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    getDefinitionActions(selectedRows) {
        var _a, _b, _c;
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCache.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.areNewDefinitionsAllowed,
                subActions: [
                    {
                        labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.new.regular-record.label',
                        id: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType,
                        rxId: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                    },
                    {
                        labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.new.join-record.label',
                        id: RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType,
                        rxId: RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType
                    },
                    {
                        labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.new.external-record.label',
                        id: RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType,
                        rxId: RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType
                    },
                    {
                        labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.new.custom-record.label',
                        id: RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom,
                        rxId: RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom
                    }
                ]
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
            },
            {
                id: 'archive',
                labelKey: 'com.bmc.arsys.rx.innovation-studio.definition-actions.archive.label',
                rxId: 'archive',
                icon: 'file_o_gear',
                isDisabled: selectedRows.length !== 1 ||
                    selectedRows[0].recordDefinitionType !==
                        RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
            },
            {
                id: 'edit-data',
                labelKey: 'com.bmc.arsys.rx.innovation-studio.definition-actions.edit-data.label',
                rxId: 'edit-data',
                icon: 'storages',
                isDisabled: selectedRows.length !== 1 ||
                    (((_a = selectedRows[0]) === null || _a === void 0 ? void 0 : _a.recordDefinitionType) ===
                        RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType &&
                        (!((_b = selectedRows[0]) === null || _b === void 0 ? void 0 : _b.externalDataSourceType) ||
                            ((_c = selectedRows[0]) === null || _c === void 0 ? void 0 : _c.externalDataSourceType) ===
                                RX_RECORD_DEFINITION.externalRecordDefinitionDataSourceTypes.webApi))
            }
        ];
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
    onCustomAction(event) {
        switch (event.actionId) {
            case RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType: {
                this.router.navigate([
                    RX_APPLICATION.innovationStudioBundleId,
                    'record',
                    this.rxFeatureService.isFeatureEnabled('DRD21-15263') ? 'new2' : 'new',
                    this.rxBundleCache.bundleId
                ]);
                break;
            }
            case RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType: {
                if (this.rxFeatureService.isFeatureEnabled('DRD21-15263')) {
                    this.rxModalService
                        .openModal({
                        content: CreateJoinRecordComponent,
                        size: 'sm'
                    })
                        .catch(noop);
                }
                else {
                    this.joinRecordWizardService.open().then((joinRecordDesignerOptions) => {
                        if (joinRecordDesignerOptions) {
                            this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'record', 'new', this.rxBundleCache.bundleId], { state: { designerOptions: joinRecordDesignerOptions } });
                        }
                    });
                }
                break;
            }
            case RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType: {
                this.externalRecordWizardService
                    .open()
                    .then((externalRecordDesignerOptions) => {
                    if (externalRecordDesignerOptions) {
                        this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'record', 'new', this.rxBundleCache.bundleId], { state: { designerOptions: externalRecordDesignerOptions } });
                    }
                });
                break;
            }
            case RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom: {
                this.rxModalService
                    .openModal({
                    content: CreateCustomRecordComponent,
                    size: 'sm'
                })
                    .catch(noop);
                break;
            }
            case 'edit-data': {
                this.router.navigate([
                    RX_APPLICATION.innovationStudioBundleId,
                    'record',
                    this.dataEditorRoute,
                    event.selectedRows[0][RowDataItemIdFieldName]
                ]);
                break;
            }
            case 'archive': {
                this.rxRecordDefinitionService
                    .get(event.selectedRows[0].name)
                    .pipe(take(1), switchMap((recordDefinition) => {
                    var _a, _b, _c;
                    if (!((_a = recordDefinition.archiveDescriptor) === null || _a === void 0 ? void 0 : _a.isEnabled) ||
                        ((_b = recordDefinition.archiveDescriptor) === null || _b === void 0 ? void 0 : _b.archiveType) === 'NONE') {
                        this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.tabs.records.archiving-disabled.message'));
                        return of(null);
                    }
                    else {
                        let message = '';
                        const archiveType = (_c = recordDefinition.archiveDescriptor) === null || _c === void 0 ? void 0 : _c.archiveType;
                        if (archiveType === 'COPY_TO_ARCHIVE_AND_DELETE_FROM_SOURCE') {
                            message = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.tabs.records.archive-and-delete.confirmation.message', { recordAge: recordDefinition.archiveDescriptor.ageQualifierInDays });
                        }
                        else if (archiveType === 'DELETE_FROM_SOURCE') {
                            message = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.tabs.records.delete-without-archiving.confirmation.message', { recordAge: recordDefinition.archiveDescriptor.ageQualifierInDays });
                        }
                        return from(this.rxModalService.confirm({
                            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                            modalStyle: RX_MODAL.modalStyles.warning,
                            message
                        }));
                    }
                }), switchMap((result) => {
                    if (result) {
                        return this.rxRecordInstanceDataPageService
                            .post({
                            params: {
                                recorddefinition: AX_RECORD_DEFINITION_TAB.archiving.recordDefinitionName,
                                pageSize: 1,
                                startIndex: 0,
                                propertySelection: RX_RECORD_DEFINITION.coreFieldIds.id,
                                queryExpression: `'${RX_RECORD_DEFINITION.coreFieldIds.description}' = "${event.selectedRows[0].name}"`
                            }
                        })
                            .pipe(switchMap((dataPageResult) => this.rxRecordInstanceService.get(AX_RECORD_DEFINITION_TAB.archiving.recordDefinitionName, dataPageResult.data[0][RX_RECORD_DEFINITION.coreFieldIds.id])), switchMap((recordInstance) => {
                            recordInstance.setFieldValue(AX_RECORD_DEFINITION_TAB.archiving.fieldIds.runNow, 1);
                            return this.rxRecordInstanceUpdateService.execute(recordInstance);
                        }), tap(() => {
                            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.tabs.records.archiving-started.message'));
                        }));
                    }
                    else {
                        return of(null);
                    }
                }))
                    .subscribe();
                break;
            }
        }
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService.openCopyDefinitionComponentModal(row, CopyDefinitionType.Record).catch(noop);
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.record.label');
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
        }), switchMap((newRecordDefinitionName) => this.rxRecordDefinitionService.rename(selectedRow.name, newRecordDefinitionName)), finalize(() => {
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
            ? forkJoin(selectedRows.map((definition) => this.rxRecordDefinitionService.revertCustomization(definition.name))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
/** @nocollapse */ RecordDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionTabComponent, deps: [{ token: i1.RxRecordDefinitionDataPageService }, { token: i2.RxBundleCacheService }, { token: i2.RxOverlayService }, { token: i3.RxModalService }, { token: i4.TranslateService }, { token: i2.RxCommandFactoryService }, { token: i5.Router }, { token: i6.RxCopyDefinitionService }, { token: i7.JoinRecordWizardService }, { token: i8.ExternalRecordWizardService }, { token: i1.RxRecordDefinitionService }, { token: i2.RxNotificationService }, { token: i1.RxRecordInstanceService }, { token: i1.RxRecordInstanceUpdateService }, { token: i1.RxRecordInstanceDataPageService }, { token: i2.RxFeatureService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ RecordDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordDefinitionTabComponent, selector: "ax-record-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "recordDefinitionTypeTemplate", first: true, predicate: ["recordDefinitionTypeTemplate"], descendants: true, static: true }, { propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'record'\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (customAction)=\"onCustomAction($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n  [editRouterLink]=\"editRouterLink\"\n></ax-definition-tab>\n\n<ng-template #recordDefinitionTypeTemplate let-dataItem=\"dataItem\">\n  <div>\n    {{ dataItem | axRecordDefinitionType }}\n  </div>\n</ng-template>\n", components: [{ type: i9.DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i10.AsyncPipe, "axRecordDefinitionType": i11.AxRecordDefinitionTypePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-record-definition-tab',
                    templateUrl: './record-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordDefinitionDataPageService }, { type: i2.RxBundleCacheService }, { type: i2.RxOverlayService }, { type: i3.RxModalService }, { type: i4.TranslateService }, { type: i2.RxCommandFactoryService }, { type: i5.Router }, { type: i6.RxCopyDefinitionService }, { type: i7.JoinRecordWizardService }, { type: i8.ExternalRecordWizardService }, { type: i1.RxRecordDefinitionService }, { type: i2.RxNotificationService }, { type: i1.RxRecordInstanceService }, { type: i1.RxRecordInstanceUpdateService }, { type: i1.RxRecordInstanceDataPageService }, { type: i2.RxFeatureService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], recordDefinitionTypeTemplate: [{
                type: ViewChild,
                args: ['recordDefinitionTypeTemplate', { static: true }]
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });
//# sourceMappingURL=record-definition-tab.component.js.map