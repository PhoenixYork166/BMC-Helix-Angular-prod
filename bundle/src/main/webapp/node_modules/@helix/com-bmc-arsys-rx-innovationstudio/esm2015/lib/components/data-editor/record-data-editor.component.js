import { Component, TemplateRef, ViewChild } from '@angular/core';
import { noop, of, ReplaySubject } from 'rxjs';
import { map, shareReplay, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RX_APPLICATION, RxBundleCacheService, RxDefinitionNameService, RxGlobalCacheService, RxPageTitleService } from '@helix/platform/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { includes, map as _map } from 'lodash';
import { RxRecordEditorBuilder } from './record-editor-builder.service';
import { ViewComponentEventManager } from '@helix/platform/view/runtime';
import { RX_OPEN_VIEW, RxEditRecordsViewActionService, RxOpenViewActionService } from '@helix/platform/view/actions';
import * as i0 from "@angular/core";
import * as i1 from "./record-editor-builder.service";
import * as i2 from "@angular/router";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@helix/platform/record/api";
import * as i6 from "@helix/platform/view/runtime";
import * as i7 from "@helix/platform/view/actions";
import * as i8 from "@bmc-ux/adapt-angular";
import * as i9 from "@helix/platform/view/components";
import * as i10 from "@angular/common";
export class RecordDataEditorComponent {
    constructor(rxRecordEditorBuilder, route, router, translateService, rxDefinitionNameService, rxGlobalCacheService, rxPageTitleService, rxRecordDefinitionCacheService, rxBundleCacheService, viewComponentEventManager, rxOpenViewActionService, rxEditRecordsViewActionService) {
        this.rxRecordEditorBuilder = rxRecordEditorBuilder;
        this.route = route;
        this.router = router;
        this.translateService = translateService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.viewComponentEventManager = viewComponentEventManager;
        this.rxOpenViewActionService = rxOpenViewActionService;
        this.rxEditRecordsViewActionService = rxEditRecordsViewActionService;
        this.destroyed$ = new ReplaySubject(1);
        this.recordDefinitionName$ = this.route.params.pipe(map((params) => params.definitionName), shareReplay(1));
        this.recordDefinition$ = this.recordDefinitionName$.pipe(switchMap((recordDefinitionName) => this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName)));
        this.dataEditorGridConfig$ = this.recordDefinition$.pipe(tap((recordDefinition) => {
            var _a;
            this.recordDefinition = recordDefinition;
            this.isCustomRecordDefinition =
                ((_a = this.recordDefinition) === null || _a === void 0 ? void 0 : _a.type) === RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom;
        }), map((recordDefinition) => {
            const coreFieldIds = _map(RX_RECORD_DEFINITION.coreFields, 'id');
            const gridColumns = _map(recordDefinition.fieldDefinitions, (fieldDefinition) => ({
                title: fieldDefinition.name,
                fieldId: String(fieldDefinition.id),
                visible: fieldDefinition.id !== RX_RECORD_DEFINITION.coreFieldIds.notifierListening &&
                    includes(coreFieldIds, fieldDefinition.id),
                cellTemplate: fieldDefinition.id === RX_RECORD_DEFINITION.coreFieldIds.displayId && !this.isCustomRecordDefinition
                    ? this.displayIdColumnTemplate
                    : undefined
            }));
            return {
                recordDefinitionName: recordDefinition.name,
                columns: gridColumns,
                getRecordDefinition: () => of(recordDefinition),
                guid: 'rx-data-editor-' + recordDefinition.guid,
                styles: 'flex-fill',
                enableRowSelection: this.isCustomRecordDefinition ? null : RowSelectionMode.Multiple,
                actionButtons: [
                    {
                        label: this.isRecordEditable(this.recordDefinition)
                            ? this.translateService.instant('com.bmc.arsys.rx.client.common.edit.label')
                            : this.translateService.instant('com.bmc.arsys.rx.client.common.action-view.label'),
                        icon: this.isRecordEditable(this.recordDefinition) ? 'pencil' : 'eye',
                        style: 'tertiary',
                        actions: [
                            {
                                name: () => {
                                    if (this.dataEditorGrid.api.getSelectedRowCount() === 1) {
                                        this.editRecord(this.dataEditorGrid.api.getSelectedRows()[0][RX_RECORD_DEFINITION.coreFieldIds.id]);
                                    }
                                    else {
                                        this.rxEditRecordsViewActionService
                                            .execute({
                                            recordDefinitionName: recordDefinition.name,
                                            records: this.dataEditorGrid.api
                                        })
                                            .subscribe();
                                    }
                                }
                            }
                        ],
                        disabled: () => this.isCustomRecordDefinition ||
                            (!this.isRecordEditable(this.recordDefinition) && this.dataEditorGrid.api.getSelectedRowCount() !== 1)
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                        icon: 'trash',
                        style: 'tertiary',
                        actions: [
                            {
                                name: 'rxDeleteRecordsAction',
                                params: {
                                    recordDefinitionName: recordDefinition.name,
                                    records: this.dataEditorGrid.api
                                }
                            }
                        ],
                        disabled: this.isCustomRecordDefinition
                    }
                ],
                rowActionButtons: []
            };
        }), shareReplay(1));
        this.rxRecordDefinitionCacheService.registerConsumer(this.destroyed$);
    }
    ngOnInit() {
        this.recordDefinitionName$.pipe(takeUntil(this.destroyed$)).subscribe((recordDefinitionName) => {
            this.rxBundleCacheService.bundleId = this.rxDefinitionNameService.getBundleId(recordDefinitionName);
            this.setPageTitle(recordDefinitionName);
        });
    }
    close() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            'record-definitions'
        ]);
    }
    createRecord() {
        this.viewComponentEventManager
            .executeActions([
            {
                guid: 'rx-data-editor-new-' + this.recordDefinition.guid,
                name: 'rxOpenViewAction',
                parameters: {
                    viewDefinitionName: this.rxRecordEditorBuilder.getViewDefinition(this.recordDefinition, null, this.isRecordEditable(this.recordDefinition)),
                    viewParams: null,
                    presentation: {
                        title: this.translateService.instant('com.bmc.arsys.rx.client.data-editor.new-record.title'),
                        modalSize: RX_OPEN_VIEW.modalSize.Large,
                        type: RX_OPEN_VIEW.type.DockedRightModal
                    }
                }
            }
        ], () => this.dataEditorGrid.api.refresh().subscribe())
            .catch(noop);
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    editRecord(recordInstanceId) {
        this.viewComponentEventManager
            .executeActions([
            {
                guid: 'rx-data-editor-edit-' + recordInstanceId,
                name: 'rxOpenViewAction',
                parameters: {
                    viewDefinitionName: this.rxRecordEditorBuilder.getViewDefinition(this.recordDefinition, recordInstanceId, this.isRecordEditable(this.recordDefinition)),
                    viewParams: null,
                    presentation: {
                        title: this.isRecordEditable(this.recordDefinition)
                            ? this.translateService.instant('com.bmc.arsys.rx.client.data-editor.edit-record.title')
                            : this.translateService.instant('com.bmc.arsys.rx.client.data-editor.view-record.title'),
                        modalSize: RX_OPEN_VIEW.modalSize.Large,
                        type: RX_OPEN_VIEW.type.DockedRightModal
                    }
                }
            }
        ], () => this.dataEditorGrid.api.refresh().subscribe())
            .catch(noop);
    }
    isRecordEditable(recordDefinition) {
        return !recordDefinition.isAuditRecordDefinition;
    }
    setPageTitle(recordDefinitionName) {
        this.rxGlobalCacheService
            .getBundleFriendlyName(this.rxBundleCacheService.bundleId)
            .pipe(take(1))
            .subscribe((bundleFriendlyName) => {
            this.rxPageTitleService.set([
                this.rxDefinitionNameService.getDisplayName(recordDefinitionName),
                this.translateService.instant('com.bmc.arsys.rx.client.data-editor.title'),
                bundleFriendlyName
            ], this.rxGlobalCacheService.applicationId);
        });
    }
}
/** @nocollapse */ RecordDataEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDataEditorComponent, deps: [{ token: i1.RxRecordEditorBuilder }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: i3.TranslateService }, { token: i4.RxDefinitionNameService }, { token: i4.RxGlobalCacheService }, { token: i4.RxPageTitleService }, { token: i5.RxRecordDefinitionCacheService }, { token: i4.RxBundleCacheService }, { token: i6.ViewComponentEventManager }, { token: i7.RxOpenViewActionService }, { token: i7.RxEditRecordsViewActionService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ RecordDataEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordDataEditorComponent, selector: "ax-record-data-editor", viewQueries: [{ propertyName: "dataEditorGrid", first: true, predicate: ["dataEditorGrid"], descendants: true }, { propertyName: "displayIdColumnTemplate", first: true, predicate: ["displayIdColumnTemplate"], descendants: true }], ngImport: i0, template: "<div class=\"header d-flex align-items-center\">\n  <h5 class=\"ml-3\">\n    {{ 'com.bmc.arsys.rx.client.data-editor.title' | translate }} ({{\n      recordDefinitionName$ | async | rxDefinitionNamePipe\n    }})\n  </h5>\n\n  <div class=\"ml-auto m-2\">\n    <button\n      rx-id=\"close-button\"\n      size=\"small\"\n      adapt-button\n      type=\"button\"\n      rx-id=\"close-button\"\n      (click)=\"close()\"\n      btn-type=\"secondary\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n    </button>\n  </div>\n</div>\n<div>\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"tertiary\"\n    class=\"d-icon-left-plus_circle\"\n    rx-id=\"new-button\"\n    [disabled]=\"this.recordDefinition?.isAuditRecordDefinition || isCustomRecordDefinition\"\n    (click)=\"createRecord()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n  </button>\n</div>\n\n<rx-record-grid rx-id=\"data-editor-grid\" #dataEditorGrid [config]=\"dataEditorGridConfig$\"></rx-record-grid>\n\n<ng-template #displayIdColumnTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div class=\"rx-ellipsis\">\n    <a href=\"javascript:void(0)\" (click)=\"editRecord(dataItem['$ID$'])\">\n      {{ dataItem[1] }}\n    </a>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{position:relative;display:flex;flex-direction:column;height:100%;width:100%;overflow:hidden}.header{background:#f0f1f1;border-bottom:1px solid #d6d7d8}\n"], components: [{ type: i8.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i3.TranslatePipe, "rxDefinitionNamePipe": i4.RxDefinitionNamePipe, "async": i10.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDataEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-record-data-editor',
                    templateUrl: './record-data-editor.component.html',
                    styleUrls: ['./record-data-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordEditorBuilder }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.TranslateService }, { type: i4.RxDefinitionNameService }, { type: i4.RxGlobalCacheService }, { type: i4.RxPageTitleService }, { type: i5.RxRecordDefinitionCacheService }, { type: i4.RxBundleCacheService }, { type: i6.ViewComponentEventManager }, { type: i7.RxOpenViewActionService }, { type: i7.RxEditRecordsViewActionService }]; }, propDecorators: { dataEditorGrid: [{
                type: ViewChild,
                args: ['dataEditorGrid']
            }], displayIdColumnTemplate: [{
                type: ViewChild,
                args: ['displayIdColumnTemplate']
            }] } });
//# sourceMappingURL=record-data-editor.component.js.map