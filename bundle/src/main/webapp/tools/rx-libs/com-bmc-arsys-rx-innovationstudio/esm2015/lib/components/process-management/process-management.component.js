import { Component, ErrorHandler, NgZone, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdaptDockedPanelService, AdaptModalService, DismissReasons } from '@bmc-ux/adapt-angular';
import { BehaviorSubject, combineLatest, forkJoin, from, NEVER, of, ReplaySubject, Subject, throwError } from 'rxjs';
import { catchError, finalize, map, pluck, shareReplay, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { castArray, find, findIndex, forOwn, head, isEmpty, mapValues, noop, omit, pickBy, remove, some, transform } from 'lodash';
import { saveAs } from 'file-saver';
import moment from 'moment-es6';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RX_APPLICATION, RxBundleCacheService, RxCommandFactoryService, RxDefinitionNameService, RxGlobalCacheService, RxNotificationService, RxPageTitleService, RxPreviousStateService, RxSessionExpirationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { RxGainsightConfiguratorService } from '@helix/platform/shared/components';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxProcessDefinitionDataPageService, RxProcessDefinitionService, RxProcessInstanceCountsByStatusDataPageService, RxProcessInstanceDataPageService, RxProcessInstanceService } from '@helix/platform/process/api';
import { AX_PROCESS_DEFINITION_TAB } from '../process-definition-tab/process-definition-tab.constant';
import { AX_PROCESS_MANAGEMENT } from './process-management.constant';
import { ProcessPreviewModalComponent } from './process-preview-modal/process-preview-modal.component';
import { ProcessRunModalComponent } from './process-run-modal/process-run-modal.component';
import { ProcessViewLogModalComponent } from './process-view-log-modal/process-view-log-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@helix/platform/process/api";
import * as i7 from "@ngx-translate/core";
import * as i8 from "@helix/platform/view/components";
import * as i9 from "@angular/common";
import * as i10 from "@angular/forms";
export class ProcessManagementComponent {
    constructor(activatedRoute, adaptDockedPanelService, adaptModalService, errorHandler, ngZone, router, rxBundleCacheService, rxCommandFactoryService, rxDefinitionNameService, rxGainsightConfiguratorService, rxGlobalCacheService, rxModalService, rxNotificationService, rxPageTitleService, rxPreviousStateService, rxProcessDefinitionDataPageService, rxProcessDefinitionService, rxProcessInstanceDataPageService, rxProcessInstanceCountsByStatusDataPageService, rxProcessInstanceService, rxSessionExpirationService, rxSystemConfigurationService, translateService) {
        this.activatedRoute = activatedRoute;
        this.adaptDockedPanelService = adaptDockedPanelService;
        this.adaptModalService = adaptModalService;
        this.errorHandler = errorHandler;
        this.ngZone = ngZone;
        this.router = router;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxPreviousStateService = rxPreviousStateService;
        this.rxProcessDefinitionDataPageService = rxProcessDefinitionDataPageService;
        this.rxProcessDefinitionService = rxProcessDefinitionService;
        this.rxProcessInstanceDataPageService = rxProcessInstanceDataPageService;
        this.rxProcessInstanceCountsByStatusDataPageService = rxProcessInstanceCountsByStatusDataPageService;
        this.rxProcessInstanceService = rxProcessInstanceService;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.translateService = translateService;
        this.activatedTabs = {
            [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active]: false,
            [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.suspended]: false,
            [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.errored]: false,
            [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.completed]: false
        };
        this.busySubscription = NEVER.subscribe();
        this.innovationStudioBundleId = RX_APPLICATION.innovationStudioBundleId;
        this.processInstanceStatuses = [
            AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active,
            AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.suspended,
            AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.errored,
            AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.completed
        ];
        this.selectedTimeframe = [];
        this.tabs = mapValues(AX_PROCESS_MANAGEMENT.statusTabs, (tab) => (Object.assign(Object.assign({}, tab), { title: this.translateService.instant(tab.title) })));
        this.texts = {
            searchPlaceholder: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label')
        };
        this.timeframes = AX_PROCESS_MANAGEMENT.timeframes.map((timeframe) => (Object.assign(Object.assign({}, timeframe), { label: this.translateService.instant(timeframe.label) })));
        this.activeTabStatus = AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active;
        this.destroyed$ = new ReplaySubject(1);
        this.refreshProcessInstanceCountsSubject = new Subject();
        this.refreshProcessDataSubject = new BehaviorSubject(true);
        this.breadcrumbItems$ = combineLatest([
            this.refreshProcessInstanceCountsSubject,
            this.refreshProcessDataSubject
        ]).pipe(map(() => {
            const breadcrumbItems = [
                {
                    data: {},
                    label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.manage-processes.menu.label')
                }
            ];
            if (this.selectedProcess && this.selectedProcess[0].data.name) {
                breadcrumbItems.push({
                    label: this.rxDefinitionNameService.getDisplayName(this.selectedProcess[0].data.name),
                    data: {}
                });
            }
            return breadcrumbItems;
        }));
        this.bundleId$ = this.activatedRoute.params.pipe(pluck('bundleId'), shareReplay(1));
        this.bundleDescriptor$ = this.bundleId$.pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleDescriptor(bundleId)));
        this.isProcessHistoryEnabled$ = this.rxSystemConfigurationService.getConfiguration('Process-History-Level').pipe(take(1), map((processHistoryLevel) => processHistoryLevel.value !== 0), shareReplay(1));
        this.processActionButtonsState$ = combineLatest([
            this.refreshProcessInstanceCountsSubject,
            this.refreshProcessDataSubject
        ]).pipe(switchMap(() => of({
            isRunButtonDisabled: !this.selectedProcess || !this.selectedProcess[0].data.isEnabled,
            isViewButtonDisabled: !this.selectedProcess || isEmpty(this.selectedProcess[0].data.name)
        })));
        this.processDefinitionOptions$ = this.bundleId$.pipe(switchMap((bundleId) => combineLatest([
            this.activatedRoute.queryParams.pipe(pluck('definitionName')),
            this.getProcessDefinitions(bundleId)
        ]).pipe(map(([processDefinitionName, processDefinitions]) => {
            var _a;
            processDefinitionName = processDefinitionName || '';
            const options = processDefinitions.data.map((processDefinition) => ({
                label: this.rxDefinitionNameService.getDisplayName(processDefinition.name),
                data: processDefinition
            }));
            options.unshift({
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.all-processes.label'),
                data: { name: '' }
            });
            const processOption = (_a = options.find((option) => option.data.name === processDefinitionName)) !== null && _a !== void 0 ? _a : options[0];
            this.resetProcessSelection(processOption);
            this.refreshProcessInstanceCountsSubject.next();
            return options;
        }))));
        this.processInstanceCounts$ = this.refreshProcessInstanceCountsSubject.pipe(switchMap(() => {
            var _a;
            const queryParams = {
                pageSize: -1,
                startedAfter: moment().subtract(this.selectedTimeframe[0].value).toISOString()
            };
            const params = ((_a = this.selectedProcess[0]) === null || _a === void 0 ? void 0 : _a.data.name)
                ? Object.assign(Object.assign({}, queryParams), { processDefinitionName: this.selectedProcess[0].data.name }) : queryParams;
            return this.rxProcessInstanceCountsByStatusDataPageService
                .get({
                params
            })
                .pipe(map((response) => response.data[0]), catchError((error) => {
                this.errorHandler.handleError(error);
                return of({ status: '', data: [] });
            }));
        }), map((result) => transform(result, (acc, status, key) => (acc[key] = status), {})));
        this.vm$ = combineLatest([
            this.bundleDescriptor$,
            this.processDefinitionOptions$,
            this.isProcessHistoryEnabled$,
            this.processInstanceCounts$,
            this.processActionButtonsState$,
            this.breadcrumbItems$
        ]).pipe(map(([bundleDescriptor, processDefinitionOptions, isProcessHistoryEnabled, processInstanceCounts, processActionButtonsState, breadcrumbItems]) => ({
            bundleDescriptor,
            processDefinitionOptions,
            isProcessHistoryEnabled,
            processInstanceCounts,
            processActionButtonsState,
            breadcrumbItems
        })), tap(() => {
            this.busySubscription.unsubscribe();
        }), catchError((error) => {
            const bundleDesc = { friendlyName: '', id: '' };
            this.busySubscription.unsubscribe();
            this.errorHandler.handleError(error);
            return of({
                bundleDescriptor: bundleDesc,
                processDefinitionOptions: [],
                isProcessHistoryEnabled: true,
                processInstanceCounts: [0, 0, 0, 0],
                processActionButtonsState: { isRunButtonDisabled: true, isViewButtonDisabled: true },
                breadcrumbItems: []
            });
        }));
    }
    ngOnInit() {
        this.activatedRoute.params.pipe(pluck('bundleId'), take(1), takeUntil(this.destroyed$)).subscribe((bundleId) => {
            this.rxBundleCacheService.bundleId = bundleId;
            this.setPageTitle();
        });
        this.activatedRoute.queryParams.pipe(takeUntil(this.destroyed$)).subscribe((queryParams) => {
            let newQueryParams = {};
            const activeTabIndex = findIndex(this.processInstanceStatuses, (el) => el === queryParams.status);
            const timeframe = find(this.timeframes, { id: queryParams.timeframe });
            if (activeTabIndex !== -1) {
                this.activeTabIndex = activeTabIndex;
                this.activeTabStatus = queryParams.status;
            }
            else {
                newQueryParams = Object.assign(Object.assign({}, newQueryParams), { status: AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active });
            }
            if (timeframe) {
                this.selectedTimeframe = [timeframe];
            }
            else {
                newQueryParams = Object.assign(Object.assign({}, newQueryParams), { timeframe: head(this.timeframes).id });
            }
            if (!isEmpty(newQueryParams)) {
                this.router.navigate([], {
                    relativeTo: this.activatedRoute,
                    queryParams: newQueryParams,
                    queryParamsHandling: 'merge'
                });
            }
            else {
                if (!this.activatedTabs[queryParams.status]) {
                    this.activatedTabs[queryParams.status] = true;
                }
                else {
                    this.refreshData();
                }
            }
        });
        this.rxGainsightConfiguratorService.updateGlobalContext({
            subProductLevel1: {
                name: 'Design'
            },
            subProductLevel2: {
                name: 'Manage processes'
            }
        });
    }
    ngOnDestroy() {
        this.refreshProcessDataSubject.complete();
        this.refreshProcessInstanceCountsSubject.complete();
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.rxGainsightConfiguratorService.removeGlobalContext(['subProductLevel2', 'subProductLevel3']);
    }
    close() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            'process-definitions'
        ]);
    }
    getRecordGridConfig(status) {
        return of({
            enableFiltering: true,
            columns: this.getGridColumns(status),
            enableRowSelection: RowSelectionMode.Multiple,
            getRecordDefinition: () => of(this.getRecordDefinition(status)),
            recordIdField: AX_PROCESS_MANAGEMENT.processInstanceGridColumns.instanceId.fieldId,
            actionButtons: this.getActionButtons(),
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.no-processes.label'),
            guid: AX_PROCESS_MANAGEMENT.statusTabs[status].guid,
            searchFieldPlaceholderText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.search.placeholder'),
            getData: (queryParams) => {
                remove(queryParams.propertySelection, (property) => property === String(RX_RECORD_DEFINITION.coreFieldIds.id));
                this.refreshProcessInstanceCountsSubject.next(true);
                return this.getProcessInstanceRuns(Object.assign({}, omit(queryParams, ['shouldIncludeTotalSize', 'recorddefinition', 'searchText'])), this.tabs[status].status);
            },
            styles: 'flex-fill'
        });
    }
    onTimeframeChange(timeframe) {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                timeframe: head(timeframe).id
            },
            queryParamsHandling: 'merge'
        });
    }
    optionFormatter(option) {
        return option.label;
    }
    previewProcess(allowRun) {
        this.adaptModalService
            .open({
            title: this.rxDefinitionNameService.getDisplayName(this.selectedProcess[0].data.name),
            content: ProcessPreviewModalComponent,
            data: {
                processDefinitionName: this.selectedProcess[0].data.name,
                allowRun
            }
        })
            .then(() => {
            this.runProcess();
        })
            .catch(noop);
    }
    refreshData() {
        this.isProcessHistoryEnabled$.subscribe((isProcessHistoryEnabled) => {
            var _a;
            if (isProcessHistoryEnabled) {
                (_a = this.getCurrentGrid()) === null || _a === void 0 ? void 0 : _a.api.refresh().subscribe();
            }
            else {
                this.refreshProcessDataSubject.next(true);
            }
            const processName = (this.selectedProcess && this.selectedProcess[0].data.name) || '';
            const route = [RX_APPLICATION.innovationStudioBundleId, 'process', 'manage', this.rxBundleCacheService.bundleId];
            const currentQueryParams = this.activatedRoute.snapshot.queryParams;
            if (processName) {
                this.router.navigate(route, { queryParams: { definitionName: processName }, queryParamsHandling: 'merge' });
            }
            else {
                this.router.navigate(route, { queryParams: omit(currentQueryParams, 'definitionName') });
            }
        });
    }
    resetProcessSelection(processDefinitionOption) {
        this.selectedProcess = [processDefinitionOption];
        this.refreshData();
    }
    runProcess() {
        this.rxProcessDefinitionService.getInputParams(this.selectedProcess[0].data.name).subscribe((inputParams) => {
            from(this.adaptDockedPanelService.open({
                title: this.rxDefinitionNameService.getDisplayName(this.selectedProcess[0].data.name),
                content: ProcessRunModalComponent,
                size: 'lg',
                data: { inputParams }
            }))
                .pipe(switchMap((inputValues) => {
                const hasAttachmentInputs = some(inputValues, (inputValue) => some(inputValue, (item) => item instanceof File));
                if (hasAttachmentInputs) {
                    return this.runProcessWithAttachments(inputValues);
                }
                else {
                    return this.rxCommandFactoryService
                        .forResourceType('com.bmc.arsys.rx.application.process.command.StartProcessInstanceCommand')
                        .execute({
                        processDefinitionName: this.selectedProcess[0].data.name,
                        processInputValues: inputValues
                    });
                }
            }), tap(() => {
                this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.run-process.success.message'));
                this.refreshData();
            }), catchError((error) => {
                if (error !== DismissReasons.CLOSE_BTN) {
                    this.refreshData();
                }
                return throwError(error);
            }))
                .subscribe();
        });
    }
    tabChanged({ index }) {
        this.activeTabStatus = this.processInstanceStatuses[index];
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                status: this.activeTabStatus
            },
            queryParamsHandling: 'merge'
        });
    }
    executeAction(command, reason) {
        const records = castArray(this.getCurrentGrid().api.getSelectedRows());
        const actions$ = records.map((record) => {
            const payload = {
                processDefinitionName: record.processDefinitionName,
                processInstanceId: record.instanceId
            };
            return this.rxCommandFactoryService
                .forResourceType(command)
                .execute(reason ? Object.assign(Object.assign({}, payload), { cancelReason: reason }) : payload);
        });
        forkJoin(actions$)
            .pipe(finalize(() => {
            this.refreshData();
        }))
            .subscribe();
    }
    getActionButtons() {
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.suspend.button.label'),
                style: 'tertiary',
                iconCls: 'pause_circle_o',
                hidden: () => this.isActionButtonDisabled(AX_PROCESS_DEFINITION_TAB.processInstanceActions.suspend),
                actions: [
                    {
                        name: () => {
                            this.executeAction('com.bmc.arsys.rx.application.process.command.SuspendProcessInstanceCommand');
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.resume.button.label'),
                style: 'tertiary',
                iconCls: 'play_o',
                hidden: () => this.isActionButtonDisabled(AX_PROCESS_DEFINITION_TAB.processInstanceActions.resume),
                actions: [
                    {
                        name: () => {
                            this.executeAction('com.bmc.arsys.rx.application.process.command.ActivateProcessInstanceCommand');
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.cancel.label'),
                style: 'tertiary',
                iconCls: 'cross_adapt',
                hidden: () => this.isActionButtonDisabled(AX_PROCESS_DEFINITION_TAB.processInstanceActions.cancel),
                actions: [
                    {
                        name: () => {
                            this.rxModalService
                                .prompt({
                                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.cancel-process.label'),
                                modalStyle: RX_MODAL.modalStyles.prompt,
                                message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.cancellation-reason.label')
                            })
                                .then((promptResponse) => {
                                if (promptResponse.response) {
                                    this.executeAction('com.bmc.arsys.rx.application.process.command.CancelProcessInstanceCommand', promptResponse.answer);
                                }
                            });
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.view-log.button.label'),
                style: 'tertiary',
                iconCls: 'monitor_gear_eye',
                disabled: () => this.isActionButtonDisabled(AX_PROCESS_DEFINITION_TAB.processInstanceActions.viewLog),
                actions: [
                    {
                        name: () => {
                            const processInstance = this.getCurrentGrid().api.getFirstSelectedRow();
                            this.rxProcessInstanceService
                                .getLog(processInstance.processDefinitionName, processInstance.instanceId)
                                .subscribe((data) => {
                                this.adaptModalService
                                    .open({
                                    title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.view-log.modal.title', {
                                        processDefinitionName: this.rxDefinitionNameService.getDisplayName(processInstance.processDefinitionName),
                                        processInstanceId: processInstance.instanceId
                                    }),
                                    content: ProcessViewLogModalComponent,
                                    size: OpenViewActionModalSize.Xlarge,
                                    data
                                })
                                    .catch(noop);
                            });
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.download-log.button.label'),
                style: 'tertiary',
                iconCls: 'download',
                disabled: () => this.isActionButtonDisabled(AX_PROCESS_DEFINITION_TAB.processInstanceActions.downloadLog),
                actions: [
                    {
                        name: () => {
                            const processInstance = this.getCurrentGrid().api.getFirstSelectedRow();
                            this.rxProcessInstanceService
                                .downloadLog(processInstance.processDefinitionName, processInstance.instanceId)
                                .subscribe((fileStream) => {
                                if ((fileStream === null || fileStream === void 0 ? void 0 : fileStream.size) > 0) {
                                    const file = new Blob([fileStream], {
                                        type: fileStream.type
                                    });
                                    this.ngZone.runOutsideAngular(() => {
                                        saveAs(file, 'process.log');
                                    });
                                }
                                else {
                                    this.rxNotificationService.addInfoMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.view-log.modal.no-log.label'), '');
                                }
                            });
                        }
                    }
                ]
            }
        ];
    }
    getCurrentGrid() {
        return this.recordGrids.find((grid) => grid.guid === AX_PROCESS_MANAGEMENT.statusTabs[this.activeTabStatus].guid);
    }
    getGridColumns(status) {
        const gridColumns = AX_PROCESS_MANAGEMENT.statusTabs[status].gridColumns;
        return gridColumns.map((column) => {
            const columnConfig = Object.assign(Object.assign({}, column), { title: this.translateService.instant(column.title) });
            if (column.fieldId === AX_PROCESS_MANAGEMENT.processInstanceGridColumns.contextKey.fieldId) {
                columnConfig.cellTemplate = this.contextKeyCellTemplate;
            }
            else if (column.fieldId === AX_PROCESS_MANAGEMENT.processInstanceGridColumns.processDefinitionName.fieldId) {
                columnConfig.cellTemplate = this.processDefinitionCellTemplate;
            }
            return columnConfig;
        });
    }
    getProcessDefinitions(bundleId) {
        return this.rxSessionExpirationService.keepSessionAlive().pipe(switchMap(() => this.rxProcessDefinitionDataPageService
            .get({
            params: {
                propertySelection: ['name', 'isEnabled'],
                bundleId
            }
        })
            .pipe(catchError((error) => {
            this.errorHandler.handleError(error);
            return this.rxProcessDefinitionDataPageService.getEmptyDataPage();
        }))));
    }
    getProcessInstanceRuns(parameters, status) {
        var _a;
        const params = Object.assign(Object.assign({}, parameters), { startedAfter: moment().subtract(this.selectedTimeframe[0].value).toISOString() });
        const queryParams = ((_a = this.selectedProcess[0]) === null || _a === void 0 ? void 0 : _a.data.name)
            ? Object.assign(Object.assign({}, params), { processDefinitionName: this.selectedProcess[0].data.name }) : params;
        return this.rxProcessInstanceDataPageService
            .get({
            params: Object.assign(Object.assign({}, queryParams), { status })
        })
            .pipe(map((response) => (Object.assign(Object.assign({}, response), { status }))), catchError((error) => {
            this.errorHandler.handleError(error);
            return of({ status: '', data: [] });
        }));
    }
    getRecordDefinition(status) {
        const fieldDefinitions = AX_PROCESS_MANAGEMENT.statusTabs[status].fieldDefinitions;
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        return {
            fieldDefinitions,
            fieldDefinitionsById
        };
    }
    isActionButtonDisabled(action) {
        const dataSets = this.getCurrentGrid().api.getSelectedRows();
        switch (action) {
            case AX_PROCESS_DEFINITION_TAB.processInstanceActions.suspend:
                return some(dataSets, (dataset) => dataset.status !== AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active);
            case AX_PROCESS_DEFINITION_TAB.processInstanceActions.resume:
                return some(dataSets, (dataset) => dataset.status !== AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.suspended);
            case AX_PROCESS_DEFINITION_TAB.processInstanceActions.cancel:
                return some(dataSets, (dataset) => dataset.status !== AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.suspended &&
                    dataset.status !== AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active);
            case AX_PROCESS_DEFINITION_TAB.processInstanceActions.downloadLog:
            case AX_PROCESS_DEFINITION_TAB.processInstanceActions.viewLog:
                return dataSets.length !== 1;
            default:
                return true;
        }
    }
    runProcessWithAttachments(inputValues) {
        const formData = new FormData();
        const attachmentInputParams = pickBy(inputValues, (inputValue) => some(inputValue, (item) => item instanceof File));
        forOwn(attachmentInputParams, (inputParamValue, inputParamName) => {
            inputParamValue.forEach((file) => {
                formData.append(inputParamName, file);
            });
            delete inputValues[inputParamName];
        });
        const commandInstance = {
            processDefinitionName: this.selectedProcess[0].data.name,
            resourceType: 'com.bmc.arsys.rx.application.process.command.StartProcessInstanceCommand',
            processInputValues: inputValues
        };
        formData.append('commandInstance', JSON.stringify(commandInstance));
        return this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.process.command.StartProcessInstanceCommand')
            .execute(formData);
    }
    setPageTitle() {
        this.rxGlobalCacheService
            .getBundleFriendlyName(this.rxBundleCacheService.bundleId)
            .pipe(take(1))
            .subscribe((bundleFriendlyName) => {
            this.rxPageTitleService.set([
                this.translateService.instant('com.bmc.arsys.rx.innovation-studio.manage-processes.menu.label'),
                bundleFriendlyName
            ], this.rxGlobalCacheService.applicationId);
        });
    }
}
/** @nocollapse */ ProcessManagementComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementComponent, deps: [{ token: i1.ActivatedRoute }, { token: i2.AdaptDockedPanelService }, { token: i2.AdaptModalService }, { token: i0.ErrorHandler }, { token: i0.NgZone }, { token: i1.Router }, { token: i3.RxBundleCacheService }, { token: i3.RxCommandFactoryService }, { token: i3.RxDefinitionNameService }, { token: i4.RxGainsightConfiguratorService }, { token: i3.RxGlobalCacheService }, { token: i5.RxModalService }, { token: i3.RxNotificationService }, { token: i3.RxPageTitleService }, { token: i3.RxPreviousStateService }, { token: i6.RxProcessDefinitionDataPageService }, { token: i6.RxProcessDefinitionService }, { token: i6.RxProcessInstanceDataPageService }, { token: i6.RxProcessInstanceCountsByStatusDataPageService }, { token: i6.RxProcessInstanceService }, { token: i3.RxSessionExpirationService }, { token: i3.RxSystemConfigurationService }, { token: i7.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ProcessManagementComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessManagementComponent, selector: "ax-process-management", viewQueries: [{ propertyName: "contextKeyCellTemplate", first: true, predicate: ["contextKeyCellTemplate"], descendants: true, static: true }, { propertyName: "processDefinitionCellTemplate", first: true, predicate: ["processDefinitionCellTemplate"], descendants: true, static: true }, { propertyName: "recordGrids", predicate: RecordGridComponent, descendants: true }], ngImport: i0, template: "<div class=\"h-100\" *ngIf=\"vm$ | async as vm\">\n  <div class=\"header d-flex align-items-center\">\n    <h5 class=\"rx-ellipsis col-2 pb-1\" [adaptTooltip]=\"vm.bundleDescriptor.friendlyName\">\n      {{ vm.bundleDescriptor.friendlyName }}\n    </h5>\n\n    <div class=\"breadcrumbs-container pt-1\">\n      <rx-breadcrumb-bar\n        (selectedItem)=\"resetProcessSelection(vm.processDefinitionOptions[0])\"\n        [items]=\"vm.breadcrumbItems\"\n      ></rx-breadcrumb-bar>\n    </div>\n\n    <div class=\"ml-auto m-2\">\n      <button rx-id=\"close-button\" adapt-button type=\"button\" size=\"small\" (click)=\"close()\" btn-type=\"secondary\">\n        {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n      </button>\n    </div>\n  </div>\n\n  <div class=\"process-management-container\">\n    <adapt-sidebar [openedId]=\"0\" [adjustMainContainerWidth]=\"true\">\n      <adapt-sidebar-item\n        [iconClass]=\"'d-icon-layout_preview'\"\n        [headerTitle]=\"'com.bmc.arsys.rx.innovation-studio.process-management.process-sidebar.title' | translate\"\n      >\n        <div class=\"d-flex flex-column h-100\">\n          <div class=\"d-flex justify-content-start mb-3\">\n            <button\n              adapt-button\n              type=\"button\"\n              btn-type=\"primary\"\n              rx-id=\"run-button\"\n              class=\"mr-2 d-icon-left-play_o\"\n              size=\"small\"\n              (click)=\"runProcess()\"\n              [disabled]=\"vm.processActionButtonsState.isRunButtonDisabled\"\n            >\n              {{ 'com.bmc.arsys.rx.innovation-studio.process-management.run-process.button.label' | translate }}\n            </button>\n            <button\n              adapt-button\n              type=\"button\"\n              rx-id=\"view-button\"\n              class=\"d-icon-left-eye\"\n              size=\"small\"\n              [disabled]=\"vm.processActionButtonsState.isViewButtonDisabled\"\n              (click)=\"previewProcess(vm.processActionButtonsState.isRunButtonDisabled)\"\n              btn-type=\"secondary\"\n            >\n              {{ 'com.bmc.arsys.rx.innovation-studio.process-management.view-process.button.label' | translate }}\n            </button>\n          </div>\n\n          <div class=\"process-list h-100\">\n            <adapt-rx-select\n              class=\"h-100 d-flex\"\n              [(ngModel)]=\"selectedProcess\"\n              [options]=\"vm.processDefinitionOptions\"\n              [optionFormatter]=\"optionFormatter\"\n              [enableFilter]=\"true\"\n              [inline]=\"true\"\n              [selectAllButton]=\"false\"\n              [deselectAllButton]=\"false\"\n              [texts]=\"texts\"\n              [multiple]=\"false\"\n              [singleSelectStyle]=\"'line'\"\n              [popupMaxHeight]=\"'100%'\"\n              (ngModelChange)=\"refreshData()\"\n            ></adapt-rx-select>\n          </div>\n        </div>\n      </adapt-sidebar-item>\n      <div class=\"main h-100\">\n        <div class=\"h-100 d-flex flex-column\" *ngIf=\"vm.isProcessHistoryEnabled\">\n          <adapt-rx-select\n            class=\"form-group d-block\"\n            [label]=\"'com.bmc.arsys.rx.innovation-studio.process-management.timeframe.select.label' | translate\"\n            rx-id=\"timeframe\"\n            [ngModel]=\"selectedTimeframe\"\n            [options]=\"timeframes\"\n            [optionFormatter]=\"optionFormatter\"\n            (ngModelChange)=\"onTimeframeChange($event)\"\n            name=\"timeframe\"\n          >\n          </adapt-rx-select>\n          <adapt-tabset\n            rx-id=\"tabs\"\n            [type]=\"'pills'\"\n            [tab-active]=\"activeTabIndex\"\n            (tab-active-changed)=\"tabChanged($event)\"\n            class=\"h-100\"\n          >\n            <ng-container *ngFor=\"let status of processInstanceStatuses\">\n              <adapt-tab-panel\n                [adapt-tab-title]=\"tabs[status].title\"\n                [badge]=\"vm.processInstanceCounts[status]\"\n                [badge-type]=\"tabs[status].badgeType\"\n                [attr.rx-id]=\"'process-instances-tab-panel-' + status | lowercase\"\n              >\n                <rx-record-grid\n                  class=\"pt-3\"\n                  *ngIf=\"activatedTabs[status]\"\n                  [config]=\"getRecordGridConfig(status)\"\n                ></rx-record-grid>\n              </adapt-tab-panel>\n            </ng-container>\n          </adapt-tabset>\n        </div>\n\n        <div\n          class=\"d-flex align-items-center justify-content-center h-100\"\n          *ngIf=\"vm.isProcessHistoryEnabled === false\"\n        >\n          <adapt-empty-state\n            type=\"objects\"\n            label=\"{{\n              'com.bmc.arsys.rx.innovation-studio.process-management.process-history-disabled.message' | translate\n            }}\"\n          ></adapt-empty-state>\n        </div>\n      </div>\n    </adapt-sidebar>\n  </div>\n</div>\n<ng-template #contextKeyCellTemplate let-dataItem=\"dataItem\">\n  <div class=\"rx-ellipsis\">\n    <a\n      [routerLink]=\"[\n        '/',\n        innovationStudioBundleId,\n        'process',\n        'instance',\n        dataItem.processDefinitionName,\n        dataItem.instanceId\n      ]\"\n      >{{\n        dataItem.contextKey || 'com.bmc.arsys.rx.innovation-studio.process-management.process-instance.label'\n          | translate\n      }}\n    </a>\n  </div>\n</ng-template>\n\n<ng-template #processDefinitionCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.processDefinitionName | rxDefinitionNamePipe }}\n</ng-template>\n\n<rx-busy-indicator [options]=\"{ busy: busySubscription }\"></rx-busy-indicator>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{position:relative;display:block;height:100%}adapt-rx-select{max-width:400px}.header{background:#f0f1f1;border-bottom:1px solid #d6d7d8}.breadcrumbs-container{font-size:.9375rem}.process-management-container{height:calc(100% - 60px)}.process-list{overflow:auto}:host::ng-deep .rx-select__controls{display:none}:host::ng-deep .rx-select__options-wrapper{width:100%}:host::ng-deep .tab-content{padding:0}:host::ng-deep .tab-content>.active{display:flex;flex-direction:column}\n"], components: [{ type: i5.RxBreadcrumbBarComponent, selector: "rx-breadcrumb-bar", inputs: ["items"], outputs: ["selectedItem"] }, { type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i2.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i2.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i8.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i5.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.AdaptTooltipDirective, selector: "[adaptTooltip]", inputs: ["popupDelay", "placement", "width", "minWidth", "useWidthFitting", "adaptRadarDisableEventSending", "adaptTooltip", "manual"], outputs: ["shown", "hidden"], exportAs: ["tooltip"] }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }], pipes: { "async": i9.AsyncPipe, "translate": i7.TranslatePipe, "lowercase": i9.LowerCasePipe, "rxDefinitionNamePipe": i3.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-process-management',
                    templateUrl: './process-management.component.html',
                    styleUrls: ['./process-management.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }, { type: i2.AdaptDockedPanelService }, { type: i2.AdaptModalService }, { type: i0.ErrorHandler }, { type: i0.NgZone }, { type: i1.Router }, { type: i3.RxBundleCacheService }, { type: i3.RxCommandFactoryService }, { type: i3.RxDefinitionNameService }, { type: i4.RxGainsightConfiguratorService }, { type: i3.RxGlobalCacheService }, { type: i5.RxModalService }, { type: i3.RxNotificationService }, { type: i3.RxPageTitleService }, { type: i3.RxPreviousStateService }, { type: i6.RxProcessDefinitionDataPageService }, { type: i6.RxProcessDefinitionService }, { type: i6.RxProcessInstanceDataPageService }, { type: i6.RxProcessInstanceCountsByStatusDataPageService }, { type: i6.RxProcessInstanceService }, { type: i3.RxSessionExpirationService }, { type: i3.RxSystemConfigurationService }, { type: i7.TranslateService }]; }, propDecorators: { contextKeyCellTemplate: [{
                type: ViewChild,
                args: ['contextKeyCellTemplate', { static: true }]
            }], processDefinitionCellTemplate: [{
                type: ViewChild,
                args: ['processDefinitionCellTemplate', { static: true }]
            }], recordGrids: [{
                type: ViewChildren,
                args: [RecordGridComponent]
            }] } });
//# sourceMappingURL=process-management.component.js.map