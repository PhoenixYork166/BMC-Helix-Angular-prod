import { Component, TemplateRef, ViewChild } from '@angular/core';
import { forkJoin, of, Subject } from 'rxjs';
import { RecordGridComponent, RowSelectionMode, RxRecordGridFilterService } from '@helix/platform/view/components';
import { RX_RECORD_DEFINITION, RxRecordInstanceService, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import { RxSignatureDetailDataPageService } from './signature-detail-data-page.service';
import { JustificationRequirement, RxCurrentUserService, RxDefinitionNameService, RxNotificationService } from '@helix/platform/shared/api';
import { cloneDeep, find, findIndex, includes, isNil, map as _map, noop, omit, some } from 'lodash';
import { RX_APPROVAL_CONSOLE } from './approval-console.constant';
import { RxApprovalConsoleService } from './approval-console.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { ApprovalCommandType, ApprovalGridType, ApprovalRequestStatus } from './approval-console.types';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RowDataItemIdFieldName } from '@helix/platform/view/api';
import { AdaptModalService, AdaptTabsComponent } from '@bmc-ux/adapt-angular';
import { ApprovalRequestReassignComponent } from './approval-request-reassign/approval-request-reassign.component';
import { ApprovalRequestQuestionResponseComponent } from './approval-request-question-response/approval-request-question-response.component';
import { ApprovalRequestActionReasonInputComponent } from './approval-request-action-reason-input/approval-request-action-reason-input.component';
import { RxApprovalConsoleHelperService } from './approval-console-helper.service';
import { RxStringService } from '@helix/platform/utils';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "./approval-console-helper.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "./approval-console.service";
import * as i7 from "@helix/platform/record/api";
import * as i8 from "@bmc-ux/adapt-angular";
import * as i9 from "./signature-detail-data-page.service";
import * as i10 from "@helix/platform/view/components";
import * as i11 from "./approval-request-general-details/approval-request-general-details.component";
import * as i12 from "./approval-request-approvers/approval-request-approvers.component";
import * as i13 from "./approval-request-questions/approval-request-questions.component";
import * as i14 from "./approval-request-comments/approval-request-comments.component";
import * as i15 from "./approval-request-attachments/approval-request-attachments.component";
import * as i16 from "@angular/common";
export class ApprovalConsoleComponent extends BaseViewComponent {
    constructor(rxStringService, rxApprovalConsoleHelperService, rxCurrentUserService, translateService, rxModalService, rxNotificationService, rxApprovalConsoleService, rxRecordInstanceService, adaptModalService, rxSignatureDetailDataPageService, recordGridFilterService, rxRecordInstanceDataPageService, rxDefinitionNameService) {
        super();
        this.rxStringService = rxStringService;
        this.rxApprovalConsoleHelperService = rxApprovalConsoleHelperService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.translateService = translateService;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.rxApprovalConsoleService = rxApprovalConsoleService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.adaptModalService = adaptModalService;
        this.rxSignatureDetailDataPageService = rxSignatureDetailDataPageService;
        this.recordGridFilterService = recordGridFilterService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.selectedApprovalRequestsTab = RX_APPROVAL_CONSOLE.approvalRequestTypes.pending;
        this.approvalRequestTypes = _map(RX_APPROVAL_CONSOLE.approvalRequestTypes, (request) => (Object.assign(Object.assign({}, request), { label: this.translateService.instant(request.labelKey) })));
        this.dataLoaded$ = new Subject();
        this.attentionGridParams = {
            recorddefinition: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition,
            [RX_RECORD_DEFINITION.coreFieldIds.assignee]: this.rxCurrentUserService.getName(),
            [RX_RECORD_DEFINITION.coreFieldIds.status]: '0',
            [RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.state]: '0'
        };
        this.needAttentionRequestCount$ = this.rxRecordInstanceDataPageService.post({
            params: this.attentionGridParams
        });
        this.availableRequestCount$ = this.dataLoaded$
            .pipe(switchMap(() => forkJoin([this.rxApprovalConsoleService.getApprovalRequestCounts(), this.needAttentionRequestCount$])))
            .pipe(map(([requestCounts, needAttentionResponse]) => (Object.assign(Object.assign({}, requestCounts), { needAttentionCount: needAttentionResponse.totalSize }))));
        this.activeTabIndex = 0;
        this.selectedRecordsInSequence = [];
    }
    ngOnInit() {
        this.updateGridConfig();
    }
    onDataLoaded() {
        var _a;
        (_a = this.gridSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.gridSubscription = this.approvalRequestsGrid.adaptTable.selectionChange.subscribe((selectedRows) => {
            const selectedRecord = isNil(this.selectedApprovalRequest)
                ? selectedRows[0]
                : selectedRows[selectedRows.length - 1];
            this.isReassignButtonDisabled = some(selectedRows, (row) => row.canReassign === 'No');
            this.selectedRecordsInSequence = this.approvalRequestsGrid.api.getSelectedRows(true);
            this.selectedRecordIndex = findIndex(this.selectedRecordsInSequence, {
                [RowDataItemIdFieldName]: selectedRecord === null || selectedRecord === void 0 ? void 0 : selectedRecord[RowDataItemIdFieldName]
            });
            this.selectedApprovalRequest = selectedRecord;
        });
        this.dataLoaded$.next();
    }
    approveRequest() {
        this.rxModalService
            .openModal({
            content: ApprovalRequestActionReasonInputComponent,
            size: 'sm',
            data: {
                commandType: ApprovalCommandType.Approved,
                selectedRequests: this.approvalRequestsGrid.api.getSelectedRows(),
                modalTitle: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.approve-request-dialog.title')
            }
        })
            .then((result) => {
            if (result) {
                this.reloadGridData();
            }
        })
            .catch(noop);
    }
    rejectRequest() {
        this.rxModalService
            .openModal({
            content: ApprovalRequestActionReasonInputComponent,
            size: 'sm',
            data: {
                commandType: ApprovalCommandType.Rejected,
                selectedRequests: this.approvalRequestsGrid.api.getSelectedRows(),
                modalTitle: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.reject-request-dialog.title')
            }
        })
            .then((result) => {
            if (result) {
                this.reloadGridData();
            }
        })
            .catch(noop);
    }
    holdRequest() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request.hold-dialog.message')
        })
            .then((result) => {
            if (result) {
                const commands = _map(this.approvalRequestsGrid.api.getSelectedRows(), (request) => this.rxApprovalConsoleService.getCommandPayload(ApprovalCommandType.OnHold, request[RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureInstanceID]));
                this.rxApprovalConsoleService.holdRequest(commands).subscribe(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request.hold-success.message'));
                    this.reloadGridData();
                });
            }
        });
    }
    reassignRequest() {
        this.rxModalService
            .openModal({
            content: ApprovalRequestReassignComponent,
            size: 'sm',
            data: {
                selectedRequestInstanceIds: _map(this.approvalRequestsGrid.api.getSelectedRows(), (request) => request.signatureInstanceID)
            }
        })
            .then((result) => {
            if (result) {
                this.reloadGridData();
            }
        })
            .catch(noop);
    }
    isHoldButtonDisabled() {
        return this.selectedApprovalRequestsTab.status === ApprovalRequestStatus.Hold;
    }
    get currentRequestId() {
        var _a, _b;
        return (((_a = this.selectedApprovalRequest) === null || _a === void 0 ? void 0 : _a.request) ||
            ((_b = this.selectedApprovalRequest) === null || _b === void 0 ? void 0 : _b[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID]));
    }
    get selectedApprovalRequestCount() {
        var _a, _b;
        return ((_b = (_a = this.approvalRequestsGrid) === null || _a === void 0 ? void 0 : _a.api) === null || _b === void 0 ? void 0 : _b.getSelectedRowCount()) || 0;
    }
    fetchApprovalRequests(event) {
        this.approvalRequestsGrid.adaptTableConfig.selectedItems = [];
        this.selectedApprovalRequest = null;
        this.selectedApprovalRequestsTab = this.approvalRequestTypes[event.index];
        this.updateGridConfig();
    }
    showNextRequestDetails() {
        this.selectedApprovalRequest = this.selectedRecordsInSequence[++this.selectedRecordIndex];
    }
    showPreviousRequestDetails() {
        this.selectedApprovalRequest = this.selectedRecordsInSequence[--this.selectedRecordIndex];
    }
    isPreviousButtonDisabled() {
        return this.selectedApprovalRequestCount === 0 || this.selectedRecordIndex <= 0;
    }
    isNextButtonDisabled() {
        return (this.selectedApprovalRequestCount === 0 || this.selectedRecordIndex === this.selectedRecordsInSequence.length - 1);
    }
    isApprovalRequestGrid() {
        return this.selectedApprovalRequestsTab.gridType === ApprovalGridType.ApprovalRequests;
    }
    isNeedAttentionGrid() {
        return this.selectedApprovalRequestsTab.gridType === ApprovalGridType.NeedAttentionRequests;
    }
    onTabChanged(event) {
        if (event.event) {
            this.activeTabIndex = event.index;
        }
    }
    needAttentionGridColumns() {
        return [
            {
                index: 0,
                fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.fromUser,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.from.label')
            },
            {
                index: 1,
                fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.toUser,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.send-to.label')
            },
            {
                index: 2,
                fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.description,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousAction, selectedRow) => {
                            this.openQuestionResponseDialog(selectedRow);
                        }
                    }
                ]
            },
            {
                index: 3,
                fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.application,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.needs-attention.grid.column.application.title'),
                cellTemplate: this.definitionNameCellTemplate
            },
            {
                index: 4,
                fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.needs-attention.grid.column.request.title')
            },
            {
                index: 5,
                fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.attachment.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousAction, selectedRow) => {
                            this.rxRecordInstanceService.downloadAttachment(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition, Number(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment), selectedRow[RX_RECORD_DEFINITION.coreFieldIds.id], selectedRow[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment]);
                        }
                    }
                ]
            },
            {
                index: 6,
                fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.question,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.question.label'),
                visible: false,
                filterable: false,
                sortable: false
            },
            {
                index: 7,
                fieldId: RX_RECORD_DEFINITION.coreFieldIds.id.toString(),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                visible: false,
                filterable: false
            }
        ];
    }
    ngOnDestroy() {
        this.dataLoaded$.complete();
        this.gridSubscription.unsubscribe();
    }
    onQuestionSubmitted() {
        this.reloadGridData();
    }
    getData(queryParams) {
        const textSearchQuery = this.recordGridFilterService.generateTextFilterQuery(queryParams.searchText, this.approvalRequestsGrid.adaptTableConfig.columns);
        const clonedSelectedFilters = cloneDeep(this.approvalRequestsGrid.state.advancedFiltering.selectedFilters);
        const clonedDefinitionNameFilters = find(clonedSelectedFilters, {
            filterOptionId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.application
        });
        if (clonedDefinitionNameFilters) {
            const appliedDefinitionNameFilters = find(this.approvalRequestsGrid.state.advancedFiltering.selectedFilters, {
                filterOptionId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.application
            });
            appliedDefinitionNameFilters.value.filterValue = _map(appliedDefinitionNameFilters.value.filterValue, (filterValue) => this.rxDefinitionNameService.getDisplayName(filterValue));
            clonedDefinitionNameFilters.value.filterValue = _map(clonedDefinitionNameFilters.value.filterValue, (filterValue) => `%${filterValue}`);
        }
        const resultingQuery = this.recordGridFilterService.addQueries(this.approvalRequestsGrid.buildQueryByAdvancedFilters(clonedSelectedFilters), textSearchQuery);
        if (resultingQuery) {
            queryParams.queryExpression = resultingQuery;
        }
        queryParams.propertySelection.push(RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.ifMultipleApprovers);
        return this.rxSignatureDetailDataPageService
            .get({
            params: omit(Object.assign(Object.assign({}, queryParams), { status: this.selectedApprovalRequestsTab.status, shouldIncludeTotalSize: true, ignoreAlternateUser: false, propertySelection: queryParams.propertySelection.filter((property) => property !== RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.actingAs) }), ['searchText', 'recorddefinition'])
        })
            .pipe(tap((dataPage) => {
            dataPage.data.forEach((row) => {
                row.otherDetail1 = this.rxApprovalConsoleHelperService.formatValue(row.otherDetail1);
                row.otherDetail2 = this.rxApprovalConsoleHelperService.formatValue(row.otherDetail2);
                row.otherDetail3 = this.rxApprovalConsoleHelperService.formatValue(row.otherDetail3);
                row.otherDetail4 = this.rxApprovalConsoleHelperService.formatValue(row.otherDetail4);
            });
        }));
    }
    getNeedAttentionData(queryParams) {
        const params = omit(Object.assign(Object.assign({}, this.attentionGridParams), queryParams), ['searchText']);
        return this.rxRecordInstanceDataPageService.post({
            params
        });
    }
    updateGridConfig() {
        this.shouldShowGrid = false;
        this.gridConfig$ = this.prepareGridConfiguration();
        setTimeout(() => {
            this.shouldShowGrid = true;
        });
    }
    prepareGridConfiguration() {
        const defaultConfig = {
            enableFiltering: true,
            enableRowSelection: RowSelectionMode.Multiple
        };
        if (this.isApprovalRequestGrid()) {
            return of(Object.assign(Object.assign({}, defaultConfig), { actionButtons: this.getActionButtons(), getData: (queryParams) => this.getData(queryParams), columns: this.getColumns(), getRecordDefinition: () => of(this.getRecordDefinition()), recordIdField: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureInstanceID, styles: 'flex-fill', guid: `ap-${this.rxStringService.toRxId(this.selectedApprovalRequestsTab.status)}-grid` }));
        }
        else if (this.isNeedAttentionGrid()) {
            return of(Object.assign(Object.assign({}, defaultConfig), { recordDefinitionName: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition, getData: (queryParams) => this.getNeedAttentionData(queryParams), columns: this.needAttentionGridColumns(), styles: 'flex-fill', guid: 'ap-need-attention-grid' }));
        }
    }
    getActionButtons() {
        return includes([ApprovalRequestStatus.Pending, ApprovalRequestStatus.RequestMoreInfo, ApprovalRequestStatus.Hold], this.selectedApprovalRequestsTab.status)
            ? [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.button.approve.label'),
                    style: 'success',
                    iconCls: 'check_circle_o',
                    size: 'small',
                    actions: [
                        {
                            name: () => this.approveRequest()
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.button.reject.label'),
                    style: 'critical',
                    iconCls: 'cross_circle_o',
                    size: 'small',
                    actions: [
                        {
                            name: () => this.rejectRequest()
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.button.hold.label'),
                    style: 'warning',
                    iconCls: 'pause_circle_o',
                    size: 'small',
                    disabled: () => this.isHoldButtonDisabled(),
                    actions: [
                        {
                            name: () => this.holdRequest()
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.button.reassign.label'),
                    iconCls: 'user_arrow_o',
                    style: 'secondary',
                    size: 'small',
                    disabled: () => this.isReassignButtonDisabled,
                    actions: [
                        {
                            name: () => this.reassignRequest()
                        }
                    ]
                }
            ]
            : [];
    }
    reloadGridData() {
        this.selectedApprovalRequest = null;
        this.approvalRequestsGrid.api.refresh().subscribe();
    }
    openQuestionResponseDialog(selectedRow) {
        this.rxModalService
            .openModal({
            content: ApprovalRequestQuestionResponseComponent,
            size: 'sm',
            data: {
                selectedRequest: selectedRow
            }
        })
            .then((result) => {
            if (result) {
                this.reloadGridData();
            }
        })
            .catch(noop);
    }
    getColumns() {
        return [
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.application,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.record-definition.label'),
                cellTemplate: this.definitionNameCellTemplate
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.summary,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                cellTemplate: this.resolvedFieldCellTemplate,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.requester,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.requester.label'),
                cellTemplate: this.resolvedFieldCellTemplate,
                sortable: true
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.status,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.status.label'),
                filterable: false,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.request,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request-id.label'),
                cellTemplate: this.resolvedFieldCellTemplate,
                sortable: true
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.actingAs,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.acting-as.title'),
                filterable: false,
                searchable: false,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.createDateSig,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request-date.label'),
                visible: false,
                filterable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.process,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.process.title'),
                visible: false,
                filterable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureInstanceID,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.signature-instance-id.title'),
                visible: false,
                filterable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.justificationReasonField,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.justification.title'),
                visible: false,
                filterable: false,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.sigTermStateDate,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.status-updated-on.title'),
                visible: false,
                filterable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureID,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.signature-id.title'),
                visible: false,
                filterable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail1,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.other-detail1.title'),
                visible: false,
                filterable: false,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail2,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.other-detail2.title'),
                visible: false,
                filterable: false,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail3,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.other-detail3.title'),
                visible: false,
                filterable: false,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail4,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.other-detail4.title'),
                visible: false,
                filterable: false,
                sortable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.justificationRequired,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.justification.require-on.label'),
                visible: false,
                filterable: false
            },
            {
                fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.processInstanceId,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.process-instance-id.title'),
                visible: false,
                filterable: false,
                sortable: false
            }
        ];
    }
    getRecordDefinition() {
        return {
            fieldDefinitions: [
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.application,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.summary,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.requester,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.status,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.selection,
                    optionNamesById: {
                        [ApprovalRequestStatus.Pending]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.pending.labelKey),
                        [ApprovalRequestStatus.RequestMoreInfo]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.moreInfo.labelKey),
                        [ApprovalRequestStatus.Approved]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.approved.labelKey),
                        [ApprovalRequestStatus.Rejected]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.rejected.labelKey),
                        [ApprovalRequestStatus.Cancelled]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.cancelled.labelKey),
                        [ApprovalRequestStatus.Error]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.error.labelKey),
                        [ApprovalRequestStatus.Hold]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.onHold.labelKey),
                        [ApprovalRequestStatus.Closed]: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.closed.labelKey)
                    }
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.request,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.actingAs,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.createDateSig,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.process,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureInstanceID,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.justificationReasonField,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.sigTermStateDate,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureID,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail1,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail2,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail3,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail4,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.justificationRequired,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.selection,
                    optionNamesById: {
                        [JustificationRequirement.RequiredForApproval]: this.translateService.instant('com.bmc.arsys.rx.client.approval.justification.require-on.approval.label'),
                        [JustificationRequirement.RequiredForRejection]: this.translateService.instant('com.bmc.arsys.rx.client.approval.justification.require-on.rejection.label'),
                        [JustificationRequirement.RequiredForApprovalOrRejection]: this.translateService.instant('com.bmc.arsys.rx.client.approval.justification.require-on.approval-rejection.label'),
                        [JustificationRequirement.NotRequired]: this.translateService.instant('com.bmc.arsys.rx.client.common.not-applicable.label')
                    }
                },
                {
                    id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.processInstanceId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
    }
}
ApprovalConsoleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleComponent, deps: [{ token: i1.RxStringService }, { token: i2.RxApprovalConsoleHelperService }, { token: i3.RxCurrentUserService }, { token: i4.TranslateService }, { token: i5.RxModalService }, { token: i3.RxNotificationService }, { token: i6.RxApprovalConsoleService }, { token: i7.RxRecordInstanceService }, { token: i8.AdaptModalService }, { token: i9.RxSignatureDetailDataPageService }, { token: i10.RxRecordGridFilterService }, { token: i7.RxRecordInstanceDataPageService }, { token: i3.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalConsoleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalConsoleComponent, selector: "rx-approval-console", viewQueries: [{ propertyName: "requestDetailsTabs", first: true, predicate: ["requestDetailsTabs"], descendants: true }, { propertyName: "resolvedFieldCellTemplate", first: true, predicate: ["resolvedFieldCellTemplate"], descendants: true, static: true }, { propertyName: "definitionNameCellTemplate", first: true, predicate: ["definitionNameCellTemplate"], descendants: true, static: true }, { propertyName: "approvalRequestsGrid", first: true, predicate: ["approvalRequestsGrid"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"row h-100\">\n  <div class=\"col-12 col-md-7 d-flex flex-column flex-fill h-100\">\n    <h2 class=\"mt-0\">{{ 'com.bmc.arsys.rx.client.approval.console.requests.title' | translate }}</h2>\n\n    <adapt-tabset\n      type=\"pills\"\n      [tab-active]=\"0\"\n      *ngIf=\"availableRequestCount$ | async as requestsTypeCounts\"\n      (tab-active-changed)=\"fetchApprovalRequests($event)\"\n      rx-id=\"approval-requests-tabs\"\n    >\n      <adapt-tab-panel\n        *ngFor=\"let requestType of approvalRequestTypes\"\n        adapt-tab-title=\"{{ requestType.label }}\"\n        [badge]=\"requestsTypeCounts[requestType.countType]\"\n        [badge-type]=\"requestType.badgeType\"\n      >\n      </adapt-tab-panel>\n    </adapt-tabset>\n\n    <rx-record-grid\n      #approvalRequestsGrid\n      [config]=\"gridConfig$\"\n      *ngIf=\"shouldShowGrid\"\n      (dataLoaded)=\"onDataLoaded()\"\n    ></rx-record-grid>\n  </div>\n\n  <div class=\"col-12 col-md-5 mt-4 mt-md-0 d-flex flex-column flex-fill h-100\">\n    <div class=\"mb-1\">\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"secondary\"\n        size=\"small\"\n        class=\"d-icon-left-angle_left mr-2\"\n        rx-id=\"prev-button\"\n        [disabled]=\"isPreviousButtonDisabled()\"\n        (click)=\"showPreviousRequestDetails()\"\n      ></button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"secondary\"\n        size=\"small\"\n        class=\"d-icon-left-angle_right mr-3\"\n        rx-id=\"next-button\"\n        [disabled]=\"isNextButtonDisabled()\"\n        (click)=\"showNextRequestDetails()\"\n      ></button>\n\n      <h2 class=\"d-inline-block my-0 align-middle\">\n        {{ 'com.bmc.arsys.rx.client.approval.console.request-details.title' | translate }}\n        <span *ngIf=\"currentRequestId\">({{ currentRequestId }})</span>\n      </h2>\n    </div>\n\n    <adapt-tabset\n      type=\"pills\"\n      [tab-active]=\"0\"\n      #requestDetailsTabs\n      (tab-active-changed)=\"onTabChanged($event)\"\n      class=\"d-flex flex-column flex-fill h-100\"\n      rx-id=\"request-details-tabs\"\n    >\n      <adapt-tab-panel\n        adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.common.general-items.label' | translate }}\"\n        badge-type=\"primary\"\n      >\n        <rx-approval-request-general-details\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n        ></rx-approval-request-general-details>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.console.approvers.title' | translate }}\">\n        <rx-approval-request-approvers\n          class=\"d-flex flex-column flex-fill h-100\"\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n          *ngIf=\"activeTabIndex === 1\"\n        ></rx-approval-request-approvers>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.console.questions.label' | translate }}\">\n        <rx-approval-request-questions\n          class=\"d-flex flex-column flex-fill h-100\"\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n          [requestsTabStatus]=\"selectedApprovalRequestsTab.status\"\n          (questionSubmitted)=\"onQuestionSubmitted()\"\n          *ngIf=\"activeTabIndex === 2\"\n        ></rx-approval-request-questions>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.console.comments.title' | translate }}\">\n        <rx-approval-request-comments\n          class=\"d-flex flex-column flex-fill h-100\"\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n          *ngIf=\"activeTabIndex === 3\"\n        ></rx-approval-request-comments>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.console.attachments.title' | translate }}\">\n        <rx-approval-request-attachments\n          class=\"d-flex flex-column flex-fill h-100\"\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n          *ngIf=\"activeTabIndex === 4\"\n        ></rx-approval-request-attachments>\n      </adapt-tab-panel>\n    </adapt-tabset>\n  </div>\n</div>\n\n<ng-template #definitionNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n\n<ng-template #resolvedFieldCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem.resolvedDisplayValues[column.field] }}\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;padding:1rem;height:100%}:host::ng-deep adapt-tabset .tab-content{padding:.5rem 0 0}:host::ng-deep rx-record-grid{height:100%}:host::ng-deep rx-record-grid .rx-action-button_success button{background:#89c341;border-color:#78ac36}:host::ng-deep rx-record-grid .rx-action-button_success button:hover{background-color:#78ac36}:host::ng-deep rx-record-grid .rx-action-button_critical button{background:#f83200;border-color:#d72b00}:host::ng-deep rx-record-grid .rx-action-button_critical button:hover{background-color:#d72b00}:host::ng-deep rx-record-grid .rx-action-button_warning button{color:#313538;background:#f1b521;border-color:#e3a50e}:host::ng-deep rx-record-grid .rx-action-button_warning button:hover{background-color:#e3a50e}:host::ng-deep rx-record-grid .rx-action-button_warning button:disabled{color:#313538;background-color:#f6cf6f}\n"], components: [{ type: i8.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i8.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i10.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i8.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i11.ApprovalRequestGeneralDetailsComponent, selector: "rx-approval-request-general-details", inputs: ["approvalRequest", "gridType"] }, { type: i12.ApprovalRequestApproversComponent, selector: "rx-approval-request-approvers", inputs: ["approvalRequest", "gridType"] }, { type: i13.ApprovalRequestQuestionsComponent, selector: "rx-approval-request-questions", inputs: ["approvalRequest", "requestsTabStatus", "gridType"], outputs: ["questionSubmitted"] }, { type: i14.ApprovalRequestCommentsComponent, selector: "rx-approval-request-comments", inputs: ["approvalRequest", "gridType"] }, { type: i15.ApprovalRequestAttachmentsComponent, selector: "rx-approval-request-attachments", inputs: ["approvalRequest", "gridType"] }], directives: [{ type: i16.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i16.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i4.TranslatePipe, "async": i16.AsyncPipe, "rxDefinitionNamePipe": i3.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-console',
                    templateUrl: './approval-console.component.html',
                    styleUrls: ['./approval-console.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxStringService }, { type: i2.RxApprovalConsoleHelperService }, { type: i3.RxCurrentUserService }, { type: i4.TranslateService }, { type: i5.RxModalService }, { type: i3.RxNotificationService }, { type: i6.RxApprovalConsoleService }, { type: i7.RxRecordInstanceService }, { type: i8.AdaptModalService }, { type: i9.RxSignatureDetailDataPageService }, { type: i10.RxRecordGridFilterService }, { type: i7.RxRecordInstanceDataPageService }, { type: i3.RxDefinitionNameService }]; }, propDecorators: { requestDetailsTabs: [{
                type: ViewChild,
                args: ['requestDetailsTabs']
            }], resolvedFieldCellTemplate: [{
                type: ViewChild,
                args: ['resolvedFieldCellTemplate', { static: true }]
            }], definitionNameCellTemplate: [{
                type: ViewChild,
                args: ['definitionNameCellTemplate', { static: true }]
            }], approvalRequestsGrid: [{
                type: ViewChild,
                args: ['approvalRequestsGrid']
            }] } });
//# sourceMappingURL=approval-console.component.js.map