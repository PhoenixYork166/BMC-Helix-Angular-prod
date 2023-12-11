import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ErrorHandler, Injector, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdaptPopoverDirective } from '@bmc-ux/adapt-angular';
import { ExpressionOperatorGroup, RxNotificationService } from '@helix/platform/shared/api';
import { RxDefinitionPickerType, RxExpressionEditorService } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, filter as _filter, find, flatten, flow, forEach, get, map as _map, omit, reject, remove, some, sortBy, trim } from 'lodash';
import { forkJoin, of, ReplaySubject } from 'rxjs';
import { catchError, defaultIfEmpty, distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RX_APPROVAL_CONFIGURATION } from '../approval-configuration.constant';
import { RxApprovalConfigurationService } from '../approval-configuration.service';
import { RxApprovalExpressionConfigurator } from '../approval-expression-configurator';
import { FlowApproversSelectorComponent } from '../flow-approvers-selector/flow-approvers-selector.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "../approval-configuration.service";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
import * as i9 from "@angular/cdk/drag-drop";
export class ApprovalFlowConfigurationComponent {
    constructor(injector, errorHandler, rxModalService, translateService, rxNotificationService, rxExpressionEditorService, rxApprovalConfigurationService) {
        this.injector = injector;
        this.errorHandler = errorHandler;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxApprovalConfigurationService = rxApprovalConfigurationService;
        this.allAvailableFlowGroups = [];
        this.signingCriteriaList = [
            {
                value: RX_APPROVAL_CONFIGURATION.approverCriteria.oneMust,
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.if-multiple-approvers.types.one-must-approve')
            },
            {
                value: RX_APPROVAL_CONFIGURATION.approverCriteria.allMust,
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.if-multiple-approvers.types.all-must-approve')
            },
            {
                value: RX_APPROVAL_CONFIGURATION.approverCriteria.percentage,
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.if-multiple-approvers.types.percentage-must-approve')
            }
        ];
        this.signingCriteriaPercentageList = RX_APPROVAL_CONFIGURATION.signingCriteriaPercentageList;
        this.processOnApproveOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.outcome.on-approve-label'),
            definitionType: RxDefinitionPickerType.PublicProcess
        };
        this.processOnRejectOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.outcome.on-rejection-label'),
            definitionType: RxDefinitionPickerType.PublicProcess
        };
        this.processOnErrorOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.outcome.on-error-label'),
            definitionType: RxDefinitionPickerType.PublicProcess
        };
        this.existingFlowGroupNames = [];
        this.isSaveInProgress = false;
        this.destroyed$ = new ReplaySubject(1);
        this.deletedFlowGroups = [];
        this.selectedFlowGroup = this.getEmptyFlowGroup();
    }
    getEmptyFlowGroup() {
        return {
            flowGroup: null,
            approvalFlowConfigurationList: []
        };
    }
    ngOnInit() {
        this.expressionConfigurator = new RxApprovalExpressionConfigurator(this.injector);
        this.expressionConfigurator.configureForProperty({
            propertyPath: RX_APPROVAL_CONFIGURATION.flowQualificationProperty,
            dataDictionary$: this.expressionConfigurator.approvalExpressionDataDictionary(this.registeredRecordDefinitionName),
            operators: this.expressionConfigurator.getOperatorRowsByGroup(ExpressionOperatorGroup.All)
        });
        this.flowQualificationOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.qualification'),
            dataDictionary$: this.expressionConfigurator.getDataDictionary(RX_APPROVAL_CONFIGURATION.flowQualificationProperty),
            operators: this.expressionConfigurator.getOperators(RX_APPROVAL_CONFIGURATION.flowQualificationProperty),
            isRequired: true
        };
        this.expressionConfigurator.configureForProperty({
            propertyPath: RX_APPROVAL_CONFIGURATION.approverQualificationProperty,
            dataDictionary$: this.expressionConfigurator.getCtmPeopleFormFields(this.registeredRecordDefinitionName),
            operators: this.expressionConfigurator.getOperatorRowsByGroup(ExpressionOperatorGroup.All)
        });
        this.qualifyApproversOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.general.qualify-approvers.label'),
            dataDictionary$: this.expressionConfigurator.getDataDictionary(RX_APPROVAL_CONFIGURATION.approverQualificationProperty),
            operators: this.expressionConfigurator.getOperators(RX_APPROVAL_CONFIGURATION.approverQualificationProperty)
        };
        this.rxApprovalConfigurationService
            .getFunctionalRoles()
            .pipe(tap((functionalRoles) => {
            this.availableFunctionalRoles = functionalRoles;
        }), switchMap(() => this.getFlowGroups()))
            .subscribe();
    }
    ngAfterViewInit() {
        this.approvalFlowsForm.form.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe(() => {
            if (this.approvalFlowsForm.dirty) {
                this.selectedFlowGroup.isDirty = true;
            }
        });
    }
    getFlowGroups() {
        this.existingFlowGroupNames = [];
        this.deletedFlowGroups = [];
        return this.rxApprovalConfigurationService.getApprovalFlowConfigurations(this.registeredRecordDefinitionName).pipe(tap((flowConfigurationResponse) => {
            var _a;
            this.allAvailableFlowGroups = flowConfigurationResponse.approvalFlowGroupConfigurations;
            if ((_a = this.allAvailableFlowGroups) === null || _a === void 0 ? void 0 : _a.length) {
                this.allAvailableFlowGroups = this.allAvailableFlowGroups
                    .map((flowGroup) => {
                    flowGroup.isDirty = false;
                    flowGroup.hasError = false;
                    this.existingFlowGroupNames.push(flowGroup.flowGroup);
                    flowGroup.approvalFlowConfigurationList = this.refactorFlowsResponse(flowGroup.approvalFlowConfigurationList);
                    return flowGroup;
                })
                    .sort((a, b) => a.flowGroup.localeCompare(b.flowGroup));
                this.selectedFlowGroup = this.selectedFlowGroup.flowGroup
                    ? find(this.allAvailableFlowGroups, { flowGroup: this.selectedFlowGroup.flowGroup })
                    : this.allAvailableFlowGroups[0];
                this.collapseAll();
                this.isSaveInProgress = false;
            }
        }));
    }
    preparePayload(flowGroup) {
        const flowGroupConfiguration = cloneDeep(omit(flowGroup, ['isDirty', 'hasError']));
        flowGroupConfiguration.approvalFlowConfigurationList = _map(flowGroupConfiguration.approvalFlowConfigurationList, (approvalFlow) => {
            approvalFlow = Object.assign({}, omit(approvalFlow, [
                'isOpen',
                'hasError',
                'approversDisplayValue',
                'isFieldIdentifyingApprover',
                'signingCriteriaList'
            ]));
            approvalFlow.approvalFlowOutcomeMappingList = reject(approvalFlow.approvalFlowOutcomeMappingList, (outcome) => !outcome.processName);
            approvalFlow.flowName = trim(approvalFlow.flowName);
            approvalFlow.signingCriteria = approvalFlow.signingCriteria[0].value;
            approvalFlow.approvalOverridePercentage =
                approvalFlow.signingCriteria === RX_APPROVAL_CONFIGURATION.approverCriteria.percentage
                    ? approvalFlow.approvalOverridePercentage[0]
                    : 0;
            if (approvalFlow.approvers &&
                !this.rxApprovalConfigurationService.isFieldIdentifyingApprover(approvalFlow.approvers)) {
                approvalFlow.approvers = '\\"' + approvalFlow.approvers + '\\"';
            }
            approvalFlow.approvers = approvalFlow.approvers || RX_APPROVAL_CONFIGURATION.noApproverProvided;
            return approvalFlow;
        });
        return flowGroupConfiguration;
    }
    canSave() {
        return !this.isSaveInProgress && ((this.areFlowGroupsValid() && this.isDirty()) || !!this.deletedFlowGroups.length);
    }
    isDirty() {
        var _a;
        return (some(this.allAvailableFlowGroups, (flowGroup) => flowGroup.isDirty) ||
            Boolean((_a = this.dialogApi) === null || _a === void 0 ? void 0 : _a.isDirty()) ||
            !!this.deletedFlowGroups.length);
    }
    areFlowGroupsValid() {
        return !some(this.allAvailableFlowGroups, this.isInvalidFlowGroup);
    }
    isInvalidFlowGroup(flowGroup) {
        return (!flowGroup.approvalFlowConfigurationList.length ||
            some(flowGroup.approvalFlowConfigurationList, (flow) => !flow.flowName || !flow.qualification || (flow.isLevelUp && flow.levels < 1) || flow.hasError));
    }
    hasFlowGroups() {
        return this.selectedFlowGroup.flowGroup;
    }
    isInvalidFlow(flow) {
        return (!flow.flowName ||
            !flow.qualification ||
            (flow.isLevelUp && flow.levels < 1) ||
            (!flow.isLevelUp && !flow.approvers && !flow.approverQualification));
    }
    markInvalidSelectedGroupAndFlows() {
        this.selectedFlowGroup.approvalFlowConfigurationList.forEach((approvalFlow) => {
            approvalFlow.hasError = this.isInvalidFlow(approvalFlow);
        });
        this.selectedFlowGroup.hasError =
            !this.selectedFlowGroup.approvalFlowConfigurationList.length ||
                some(this.selectedFlowGroup.approvalFlowConfigurationList, (flow) => flow.hasError);
    }
    markInvalidGroupsAndFlows() {
        this.allAvailableFlowGroups.forEach((flowGroup) => {
            flowGroup.approvalFlowConfigurationList.forEach((approvalFlow) => {
                approvalFlow.hasError = this.isInvalidFlow(approvalFlow);
            });
            flowGroup.hasError =
                !flowGroup.approvalFlowConfigurationList.length ||
                    some(flowGroup.approvalFlowConfigurationList, (flow) => flow.hasError);
        });
    }
    saveFlowGroups() {
        this.approvalFlowsForm.form.markAsPristine();
        let createFailedCount = 0;
        let createSuccessCount = 0;
        let updateFailedCount = 0;
        let updateSuccessCount = 0;
        let deleteFailedCount = 0;
        let deleteSuccessCount = 0;
        const updateRequests$ = [];
        const createRequests$ = [];
        const deleteRequests$ = this.deletedFlowGroups.map((flowGroupName) => this.rxApprovalConfigurationService
            .deleteApprovalFlowGroup(flowGroupName, this.registeredRecordDefinitionName)
            .pipe(map(() => ({ status: 'Success' })), catchError((error) => of({
            status: 'Failed',
            error
        }))));
        this.allAvailableFlowGroups.forEach((flowGroup) => {
            if (flowGroup.isDirty) {
                this.isSaveInProgress = true;
                const flowGroupConfiguration = this.preparePayload(flowGroup);
                if (this.isExistingFlowGroup(flowGroupConfiguration.flowGroup) || flowGroupConfiguration.flowGroupOldName) {
                    updateRequests$.push(this.rxApprovalConfigurationService
                        .updateApprovalFlowGroup(flowGroupConfiguration.flowGroupOldName || flowGroupConfiguration.flowGroup, omit(flowGroupConfiguration, 'flowGroupOldName'), this.registeredRecordDefinitionName)
                        .pipe(map(() => ({
                        status: 'Success'
                    })), catchError((error) => of({
                        status: 'Failed',
                        error
                    }))));
                }
                else {
                    createRequests$.push(this.rxApprovalConfigurationService
                        .saveApprovalFlowGroup(flowGroupConfiguration, this.registeredRecordDefinitionName)
                        .pipe(switchMap(() => this.rxApprovalConfigurationService.getApprovalFlowGroup(this.registeredRecordDefinitionName, flowGroupConfiguration.flowGroup)), tap((createdFlowGroup) => {
                        this.existingFlowGroupNames.push(createdFlowGroup.flowGroup);
                        const flowGroup = find(this.allAvailableFlowGroups, { flowGroup: createdFlowGroup.flowGroup });
                        flowGroup.isDirty = false;
                        forEach(flowGroup.approvalFlowConfigurationList, (flow, flowIndex) => {
                            flow.approvalProcessId =
                                createdFlowGroup.approvalFlowConfigurationList[flowIndex].approvalProcessId;
                            flow.guid = createdFlowGroup.approvalFlowConfigurationList[flowIndex].guid;
                        });
                    }), map(() => ({
                        status: 'Success'
                    })), catchError((error) => of({
                        status: 'Failed',
                        error
                    }))));
                }
            }
        });
        forkJoin({
            createRequests: forkJoin(createRequests$).pipe(defaultIfEmpty([])),
            updateRequests: forkJoin(updateRequests$).pipe(defaultIfEmpty([])),
            deleteRequests: forkJoin(deleteRequests$).pipe(defaultIfEmpty([]))
        })
            .pipe(tap((response) => {
            let message = '';
            const failedResponses = flatten(_map(response, (requestResponses) => _filter(requestResponses, { status: 'Failed' })));
            createFailedCount = _filter(response.createRequests, { status: 'Failed' }).length;
            createSuccessCount = _filter(response.createRequests, { status: 'Success' }).length;
            updateFailedCount = _filter(response.updateRequests, { status: 'Failed' }).length;
            updateSuccessCount = _filter(response.updateRequests, { status: 'Success' }).length;
            deleteFailedCount = _filter(response.deleteRequests, { status: 'Failed' }).length;
            deleteSuccessCount = _filter(response.deleteRequests, { status: 'Success' }).length;
            if (createSuccessCount) {
                message += `${this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.message.flowgroup.created', { count: createSuccessCount })}\n`;
            }
            if (updateSuccessCount) {
                message += `${this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.message.flowgroup.updated', { count: updateSuccessCount })}\n`;
            }
            if (deleteSuccessCount) {
                message += `${this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.message.flowgroup.deleted', { count: deleteSuccessCount })}\n`;
            }
            if (createFailedCount) {
                message += `${this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.message.flowgroup.create-failed', { count: createFailedCount })}\n`;
            }
            if (updateFailedCount) {
                message += `${this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.message.flowgroup.update-failed', { count: updateFailedCount })}\n`;
            }
            if (deleteFailedCount) {
                message += `${this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.message.flowgroup.delete-failed', { count: deleteFailedCount })}\n`;
            }
            if (createFailedCount || updateFailedCount || deleteFailedCount) {
                this.rxNotificationService.addWarningMessage(message);
            }
            else {
                this.rxNotificationService.addSuccessMessage(message);
            }
            forEach(failedResponses, (requestResponse) => {
                this.errorHandler.handleError(requestResponse.error);
            });
        }), filter(() => !(createFailedCount || updateFailedCount || deleteFailedCount)), switchMap(() => this.getFlowGroups()))
            .subscribe({
            complete: () => {
                this.isSaveInProgress = false;
            }
        });
    }
    onKeyDownNew(event) {
        if (event.code === 'Enter' && !this.isAddNewFlowGroupButtonDisabled()) {
            this.addNewFlowGroup();
        }
    }
    addNewFlowGroup() {
        this.markInvalidSelectedGroupAndFlows();
        this.adaptPopoverDirective.close();
        this.allAvailableFlowGroups.push({
            flowGroup: trim(this.flowGroupName),
            hasError: true,
            approvalFlowConfigurationList: []
        });
        this.allAvailableFlowGroups.sort((a, b) => a.flowGroup.localeCompare(b.flowGroup));
        this.selectedFlowGroup = find(this.allAvailableFlowGroups, { flowGroup: trim(this.flowGroupName) });
        this.flowGroupName = null;
    }
    onKeyDownRename(event, context) {
        if (event.code === 'Enter') {
            this.renameFlowGroup(context);
        }
    }
    renameFlowGroup(context) {
        if (!this.isExistingFlowGroup()) {
            this.selectedFlowGroup.flowGroup = trim(this.flowGroupNewName);
            context.close();
        }
        else {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.message.flowgroup.updatingGroupName')
            })
                .then((result) => {
                if (result) {
                    this.selectedFlowGroup.isDirty = true;
                    this.selectedFlowGroup.flowGroupOldName = this.selectedFlowGroup.flowGroup;
                    this.selectedFlowGroup.flowGroup = trim(this.flowGroupNewName);
                }
            });
        }
    }
    deleteFlowGroup() {
        if (!this.isExistingFlowGroup()) {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.common.unsaved-data.message')
            })
                .then((result) => {
                if (result) {
                    remove(this.allAvailableFlowGroups, { flowGroup: this.selectedFlowGroup.flowGroup });
                    this.setEmptyFlowGroup();
                }
            });
        }
        else {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.message.flowgroup.confirm')
            })
                .then((result) => {
                if (result) {
                    this.deletedFlowGroups.push(this.selectedFlowGroup.flowGroup);
                    remove(this.allAvailableFlowGroups, { flowGroup: this.selectedFlowGroup.flowGroup });
                    this.setEmptyFlowGroup();
                }
            });
        }
    }
    setEmptyFlowGroup() {
        this.selectedFlowGroup = this.getEmptyFlowGroup();
    }
    onFlowQualificationEvent(flowIndex) {
        this.selectFlowQualificationExpression(flowIndex);
    }
    selectFlowQualificationExpression(flowIndex) {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: RX_APPROVAL_CONFIGURATION.flowQualificationProperty,
                value: this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].qualification,
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.qualification')
            },
            expressionConfigurator: this.expressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        }, (dialogApi) => (this.dialogApi = dialogApi))
            .subscribe((expression) => {
            this.dialogApi = null;
            this.approvalFlowsForm.form.markAsDirty();
            this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].qualification = expression.value;
        });
    }
    onApproverQualificationEvent(flowIndex) {
        this.selectApproverQualificationExpression(flowIndex);
    }
    selectApproverQualificationExpression(flowIndex) {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: RX_APPROVAL_CONFIGURATION.approverQualificationProperty,
                value: this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].approverQualification,
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.general.qualify-approvers.label')
            },
            expressionConfigurator: this.expressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        }, (dialogApi) => (this.dialogApi = dialogApi))
            .subscribe((expression) => {
            this.dialogApi = null;
            this.approvalFlowsForm.form.markAsDirty();
            this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].approverQualification = expression.value;
            this.updateFlowErrorState(flowIndex);
        });
    }
    updateFlowErrorState(flowIndex) {
        this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].hasError = Boolean(!this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].approverQualification &&
            !this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].approvers);
        this.selectedFlowGroup.hasError = some(this.selectedFlowGroup.approvalFlowConfigurationList, (flow) => flow.hasError);
    }
    getFlowEmptyOutcomes() {
        return [
            {
                processName: null,
                action: '2',
                statusOutcome: '1'
            },
            {
                processName: null,
                action: '2',
                statusOutcome: '2'
            },
            {
                processName: null,
                action: '2',
                statusOutcome: '6'
            }
        ];
    }
    getEmptyGeneralApprovalFlow() {
        return {
            isOpen: true,
            hasError: false,
            approvalProcessId: null,
            flowName: '',
            processType: null,
            qualification: null,
            formattedQualification: null,
            precedence: this.selectedFlowGroup.approvalFlowConfigurationList.length,
            signingCriteria: this.getCriteria(),
            signingCriteriaList: this.getFlowCriteriaList(),
            approvalOverridePercentage: 50,
            isLevelUp: false,
            levels: null,
            approvers: '',
            applyApproverExclusion: true,
            approversDisplayValue: '',
            approverQualification: null,
            approvalFlowOutcomeMappingList: this.getFlowEmptyOutcomes()
        };
    }
    getCriteria(value) {
        return [find(this.getFlowCriteriaList(), { value: value || RX_APPROVAL_CONFIGURATION.approverCriteria.oneMust })];
    }
    getFlowCriteriaList() {
        return cloneDeep(this.signingCriteriaList);
    }
    addNewGeneralFlow() {
        this.collapseAll();
        setTimeout(() => {
            this.selectedFlowGroup.approvalFlowConfigurationList.push(this.getEmptyGeneralApprovalFlow());
        });
    }
    addNewLevelUpFlow() {
        this.collapseAll();
        setTimeout(() => {
            this.selectedFlowGroup.approvalFlowConfigurationList.push(Object.assign(Object.assign({}, this.getEmptyGeneralApprovalFlow()), { isLevelUp: true }));
        });
    }
    selectFlowGroup(flowGroupName) {
        this.selectedFlowGroup = find(this.allAvailableFlowGroups, { flowGroup: flowGroupName });
        if (!this.selectedFlowGroup.isDirty) {
            this.approvalFlowsForm.form.markAsPristine();
        }
        this.collapseAll();
        this.markInvalidGroupsAndFlows();
    }
    onSelectedFlowDrop(event) {
        this.moveFlow(event.previousIndex, event.currentIndex);
    }
    moveFlow(previousIndex, currentIndex) {
        moveItemInArray(this.selectedFlowGroup.approvalFlowConfigurationList, previousIndex, currentIndex);
        this.resetFlowPrecedences();
    }
    moveFlowUp(currentIndex) {
        moveItemInArray(this.selectedFlowGroup.approvalFlowConfigurationList, currentIndex, currentIndex - 1);
        this.resetFlowPrecedences();
    }
    moveFlowDown(currentIndex) {
        moveItemInArray(this.selectedFlowGroup.approvalFlowConfigurationList, currentIndex, currentIndex + 1);
        this.resetFlowPrecedences();
    }
    removeFlow(index) {
        this.selectedFlowGroup.approvalFlowConfigurationList.splice(index, 1);
        this.markInvalidSelectedGroupAndFlows();
        this.resetFlowPrecedences();
    }
    resetFlowPrecedences() {
        this.approvalFlowsForm.form.markAsDirty();
        this.selectedFlowGroup.approvalFlowConfigurationList = this.selectedFlowGroup.approvalFlowConfigurationList.map((currentFlow, index) => {
            currentFlow.precedence = index;
            return currentFlow;
        });
    }
    optionFormatter(option) {
        return option.displayValue;
    }
    refactorFlowsResponse(approvalFlows) {
        return flow((flows) => sortBy(flows, 'precedence'), (flows) => _map(flows, (currentFlow) => {
            currentFlow.isOpen = false;
            const flowOutcomeMappings = cloneDeep(currentFlow.approvalFlowOutcomeMappingList);
            currentFlow.approvalFlowOutcomeMappingList[0] =
                find(flowOutcomeMappings, { statusOutcome: '1' }) || this.getFlowEmptyOutcomes()[0];
            currentFlow.approvalFlowOutcomeMappingList[1] =
                find(flowOutcomeMappings, { statusOutcome: '2' }) || this.getFlowEmptyOutcomes()[1];
            currentFlow.approvalFlowOutcomeMappingList[2] =
                find(flowOutcomeMappings, { statusOutcome: '6' }) || this.getFlowEmptyOutcomes()[2];
            if (!currentFlow.approvers || currentFlow.approvers === RX_APPROVAL_CONFIGURATION.noApproverProvided) {
                currentFlow.approvers = '';
            }
            currentFlow.approvers = currentFlow.approvers.replace(/\\"/g, '');
            currentFlow.approversDisplayValue = this.getApproversDisplay(currentFlow);
            currentFlow.signingCriteriaList = this.getFlowCriteriaList();
            currentFlow.approvalOverridePercentage = [currentFlow.approvalOverridePercentage];
            currentFlow.signingCriteria = [
                {
                    value: currentFlow.signingCriteria,
                    displayValue: this.getCriteria(currentFlow.signingCriteria)[0].displayValue
                }
            ];
            return currentFlow;
        }))(approvalFlows);
    }
    isExistingFlowGroup(flowGroupName = null) {
        return this.existingFlowGroupNames.includes(flowGroupName || this.selectedFlowGroup.flowGroup);
    }
    isRenameFlowGroupButtonDisabled() {
        return (trim(this.flowGroupNewName) !== this.selectedFlowGroup.flowGroup &&
            some(this.allAvailableFlowGroups, (flowGroup) => flowGroup.flowGroup.toLowerCase() === trim(this.flowGroupNewName.toLowerCase())));
    }
    isAddNewFlowGroupButtonDisabled() {
        return (!this.flowGroupName ||
            some(this.allAvailableFlowGroups, (flowGroup) => flowGroup.flowGroup.toLowerCase() === trim(this.flowGroupName.toLowerCase())));
    }
    expandAll() {
        this.selectedFlowGroup.approvalFlowConfigurationList.forEach((approvalFlow) => (approvalFlow.isOpen = true));
    }
    collapseAll() {
        this.selectedFlowGroup.approvalFlowConfigurationList.forEach((approvalFlow) => (approvalFlow.isOpen = false));
    }
    selectFlowApprovers(flowIndex) {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.select-approvers-dialog.title') +
                ': ' +
                this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].flowName,
            data: {
                registeredRecordDefinitionName: this.registeredRecordDefinitionName,
                existingApprovers: this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].approvers,
                isFieldIdentifyingApprover: this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].isFieldIdentifyingApprover,
                onApiReady: (dialogApi) => {
                    this.dialogApi = dialogApi;
                }
            },
            content: FlowApproversSelectorComponent,
            size: OpenViewActionModalSize.Large
        })
            .then((result) => {
            this.dialogApi = null;
            this.approvalFlowsForm.form.markAsDirty();
            this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].approvers = result.value;
            this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].approversDisplayValue = result.displayValue;
            this.manageApproverCriteriaOption(flowIndex);
            this.updateFlowErrorState(flowIndex);
            this.selectedFlowGroup.isDirty = true;
        })
            .catch(() => {
            this.dialogApi = null;
        });
    }
    manageApproverCriteriaOption(flowIndex) {
        if (this.rxApprovalConfigurationService.isFieldIdentifyingApprover(this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].approvers)) {
            this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].signingCriteria = this.getCriteria();
            find(this.selectedFlowGroup.approvalFlowConfigurationList[flowIndex].signingCriteriaList, {
                value: RX_APPROVAL_CONFIGURATION.approverCriteria.percentage
            }).disabled = true;
        }
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    getApproversDisplay(approvalFlow) {
        const approvers = approvalFlow.approvers.split(RX_APPROVAL_CONFIGURATION.approverSeparator);
        return _map(approvers, (approver) => {
            if (this.rxApprovalConfigurationService.isFieldIdentifyingApprover(approvalFlow.approvers)) {
                approvalFlow.isFieldIdentifyingApprover = true;
                approver = this.rxApprovalConfigurationService.getFieldIdentifyingApprover(approver);
            }
            else if (this.rxApprovalConfigurationService.isFunctionalRole(approver)) {
                approver = get(find(this.availableFunctionalRoles, {
                    id: this.rxApprovalConfigurationService.getFunctionalRoleGuid(approver)
                }), 'name');
            }
            else if (this.rxApprovalConfigurationService.isApproverPeople(approver)) {
                approver = this.rxApprovalConfigurationService.getApproverUser(approver);
            }
            else {
                approver = this.rxApprovalConfigurationService.getLastLabel(approver);
            }
            return approver;
        })
            .filter(Boolean)
            .join(', ');
    }
    getFlowName(flow) {
        return (flow.flowName ||
            (flow.isLevelUp
                ? `[${this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow-group.level-flow.new.default-value')}]`
                : `[${this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow-group.general-flow.new.default-value')}]`));
    }
}
ApprovalFlowConfigurationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalFlowConfigurationComponent, deps: [{ token: i0.Injector }, { token: i0.ErrorHandler }, { token: i1.RxModalService }, { token: i2.TranslateService }, { token: i3.RxNotificationService }, { token: i4.RxExpressionEditorService }, { token: i5.RxApprovalConfigurationService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalFlowConfigurationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalFlowConfigurationComponent, selector: "rx-approval-flow-configuration", inputs: { registeredRecordDefinitionName: "registeredRecordDefinitionName" }, viewQueries: [{ propertyName: "adaptPopoverDirective", first: true, predicate: AdaptPopoverDirective, descendants: true }, { propertyName: "approvalFlowsForm", first: true, predicate: ["approvalFlowsForm"], descendants: true }], ngImport: i0, template: "<div class=\"row d-flex h-100\">\n  <div class=\"col-3 border-right d-flex flex-column h-100\">\n    <h5>\n      {{ 'com.bmc.arsys.rx.client.approval.configuration.flow.available-flow-groups.title' | translate }}\n    </h5>\n\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"tertiary\"\n      rx-id=\"new-flow-group-button\"\n      class=\"d-icon-plus_circle px-0 align-self-start\"\n      [adaptPopover]=\"newFlowGroupTemplate\"\n      maxWidth=\"365\"\n      autoClose=\"outside\"\n      appendToBody=\"true\"\n      placement=\"bottom-left\"\n      fallbackPlacement=\"bottom\"\n    >\n      {{ 'com.bmc.arsys.rx.client.approval.configuration.flow.new.title' | translate }}\n    </button>\n\n    <div class=\"available-list border p-3 flex-fill\">\n      <div class=\"vertical-center\" *ngIf=\"!allAvailableFlowGroups.length\">\n        <adapt-empty-state\n          [type]=\"'list'\"\n          label=\"{{ 'com.bmc.arsys.rx.client.empty-state.no-items-available.label' | translate }}\"\n        ></adapt-empty-state>\n      </div>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        rx-id=\"rename-flow-group-button\"\n        class=\"d-icon-field_text px-0 pt-0\"\n        [disabled]=\"!selectedFlowGroup.flowGroup\"\n        [adaptPopover]=\"renameFlowGroupTemplate\"\n        maxWidth=\"365\"\n        autoClose=\"outside\"\n        appendToBody=\"true\"\n        placement=\"bottom-left\"\n        fallbackPlacement=\"bottom\"\n        (shown)=\"flowGroupNewName = selectedFlowGroup.flowGroup\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.rename.label' | translate }}\n      </button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        rx-id=\"delete-flow-group-button\"\n        class=\"d-icon-trash pt-0\"\n        [disabled]=\"!selectedFlowGroup.flowGroup\"\n        (click)=\"deleteFlowGroup()\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.delete.label' | translate }}\n      </button>\n\n      <adapt-rx-radiobutton-group\n        class=\"d-block form-group\"\n        rx-id=\"available-flow-groups\"\n        (ngModelChange)=\"selectFlowGroup($event)\"\n        [(ngModel)]=\"selectedFlowGroup.flowGroup\"\n      >\n        <div *ngFor=\"let group of allAvailableFlowGroups\" class=\"d-flex align-items-center\">\n          <adapt-rx-radiobutton\n            class=\"mb-0 mt-0 wrap-word\"\n            [value]=\"group.flowGroup\"\n            [label]=\"group.flowGroup\"\n          ></adapt-rx-radiobutton>\n\n          <div class=\"ml-1 mb-1 d-icon-exclamation_triangle text-danger\" *ngIf=\"group.hasError\"></div>\n        </div>\n      </adapt-rx-radiobutton-group>\n    </div>\n  </div>\n\n  <div class=\"col-9 d-flex flex-column h-100\">\n    <div class=\"d-flex flex-column h-100\">\n      <h5>\n        {{ 'com.bmc.arsys.rx.client.approval.configuration.flow.selected-flow-group.title' | translate }}:\n        {{ selectedFlowGroup.flowGroup || ('com.bmc.arsys.rx.client.common.none.label' | translate) }}\n      </h5>\n\n      <div class=\"row\">\n        <div class=\"col-12 col-sm-6\">\n          <div class=\"d-inline-flex align-items-center\">\n            <button\n              type=\"button\"\n              adapt-button\n              btn-type=\"tertiary\"\n              rx-id=\"new-general-flow-button\"\n              class=\"d-icon-plus_circle px-0\"\n              [disabled]=\"!selectedFlowGroup.flowGroup\"\n              (click)=\"addNewGeneralFlow()\"\n            >\n              {{ 'com.bmc.arsys.rx.client.approval.configuration.flow.general.new.label' | translate }}\n            </button>\n            <span\n              class=\"d-icon-right-question_circle_o ml-1 mr-4\"\n              adaptPopover=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.flow.general.info' | translate }}\"\n              placement=\"right\"\n              appendToBody=\"true\"\n            >\n            </span>\n          </div>\n\n          <div class=\"d-inline-flex align-items-center\">\n            <button\n              type=\"button\"\n              adapt-button\n              btn-type=\"tertiary\"\n              rx-id=\"new-level-flow-button\"\n              class=\"d-icon-plus_circle px-0\"\n              [disabled]=\"!selectedFlowGroup.flowGroup\"\n              (click)=\"addNewLevelUpFlow()\"\n            >\n              {{ 'com.bmc.arsys.rx.client.approval.configuration.flow.level.new.label' | translate }}\n            </button>\n\n            <span\n              class=\"d-icon-right-question_circle_o ml-1\"\n              adaptPopover=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.flow.level.info' | translate }}\"\n              placement=\"right\"\n              appendToBody=\"true\"\n            >\n            </span>\n          </div>\n        </div>\n\n        <div class=\"col-12 col-sm-6 text-right\">\n          <button\n            type=\"button\"\n            adapt-button\n            btn-type=\"tertiary\"\n            rx-id=\"expand-button\"\n            (click)=\"expandAll()\"\n            *ngIf=\"selectedFlowGroup.approvalFlowConfigurationList.length\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button\n            type=\"button\"\n            adapt-button\n            btn-type=\"tertiary\"\n            rx-id=\"collapse-button\"\n            (click)=\"collapseAll()\"\n            *ngIf=\"selectedFlowGroup.approvalFlowConfigurationList.length\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <adapt-alert\n        *ngIf=\"selectedFlowGroup.flowGroup && !selectedFlowGroup.approvalFlowConfigurationList.length\"\n        [config]=\"{\n          variant: 'warning',\n          dismissible: false,\n          content: 'com.bmc.arsys.rx.client.approval.configuration.flow.group-has-no-flows-error.message' | translate\n        }\"\n      ></adapt-alert>\n\n      <div class=\"vertical-center\">\n        <adapt-empty-state\n          *ngIf=\"!selectedFlowGroup.flowGroup && !selectedFlowGroup.approvalFlowConfigurationList.length\"\n          [type]=\"'rules'\"\n          label=\"{{ 'com.bmc.arsys.rx.client.empty-state.no-items-available.label' | translate }}\"\n        ></adapt-empty-state>\n      </div>\n\n      <div\n        class=\"designer-modal-accordion-wrapper flex-fill pt-0\"\n        [ngClass]=\"{ 'border-top': selectedFlowGroup.approvalFlowConfigurationList.length }\"\n        cdkDropList\n        (cdkDropListDropped)=\"onSelectedFlowDrop($event)\"\n      >\n        <form #approvalFlowsForm=\"ngForm\">\n          <adapt-accordion [multiselect]=\"true\" class=\"flex-fill\">\n            <div\n              *ngFor=\"\n                let flow of selectedFlowGroup.approvalFlowConfigurationList;\n                let index = index;\n                let first = first;\n                let last = last\n              \"\n              class=\"designer-modal-accordion-content\"\n              cdkDrag\n              cdkDragLockAxis=\"y\"\n              [cdkDragData]=\"flow\"\n            >\n              <div class=\"d-icon-left-dots designer-modal-drag-handle\" cdkDragHandle></div>\n\n              <adapt-accordion-tab\n                class=\"d-block\"\n                [isOpen]=\"flow.isOpen\"\n                (open)=\"flow.isOpen = true\"\n                (close)=\"flow.isOpen = false; markInvalidSelectedGroupAndFlows()\"\n              >\n                <div class=\"card-title-text w-100\">\n                  <div class=\"designer-modal-card-title-content\">\n                    <div class=\"left-header-block\">\n                      <div class=\"rx-ellipsis\" [title]=\"getFlowName(flow)\" rx-id=\"card-title\">\n                        {{ getFlowName(flow) }}\n                      </div>\n                      <div class=\"d-icon-exclamation_triangle text-danger\" *ngIf=\"flow.hasError\"></div>\n                    </div>\n\n                    <div class=\"right-header-block\">\n                      <div class=\"designer-modal-card-title-index-buttons\">\n                        <button\n                          class=\"d-icon-angle_up px-3 py-1\"\n                          adapt-button\n                          btn-type=\"tertiary\"\n                          size=\"small\"\n                          type=\"button\"\n                          [disabled]=\"first\"\n                          (click)=\"$event.stopPropagation(); moveFlowUp(index)\"\n                        ></button>\n\n                        <button\n                          class=\"d-icon-angle_down px-3 py-1\"\n                          adapt-button\n                          btn-type=\"tertiary\"\n                          size=\"small\"\n                          type=\"button\"\n                          [disabled]=\"last\"\n                          (click)=\"$event.stopPropagation(); moveFlowDown(index)\"\n                        ></button>\n                      </div>\n\n                      <button\n                        class=\"d-icon-left-cross_adapt p-1 pr-4\"\n                        adapt-button\n                        size=\"small\"\n                        type=\"button\"\n                        (click)=\"removeFlow(index)\"\n                      >\n                        {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                      </button>\n                    </div>\n                  </div>\n                </div>\n\n                <adapt-alert\n                  *ngIf=\"flow.hasError\"\n                  [config]=\"{\n                    variant: 'warning',\n                    dismissible: false,\n                    content:\n                      'com.bmc.arsys.rx.client.approval.configuration.flow.approvers.not-selected.message' | translate\n                  }\"\n                ></adapt-alert>\n\n                <adapt-rx-textfield\n                  class=\"form-group d-block\"\n                  rx-id=\"flow-name\"\n                  label=\"{{\n                    'com.bmc.arsys.rx.client.approval.configuration.flow.general.flow-name.label' | translate\n                  }}\"\n                  required=\"true\"\n                  [(ngModel)]=\"flow.flowName\"\n                  [autofocus]=\"true\"\n                  name=\"{{ 'flowName' + index }}\"\n                  maxlength=\"254\"\n                >\n                </adapt-rx-textfield>\n\n                <adapt-rx-counter\n                  *ngIf=\"flow.isLevelUp\"\n                  adaptMin=\"1\"\n                  [min]=\"1\"\n                  class=\"form-group d-block\"\n                  rx-id=\"flow-levels\"\n                  label=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.levels' | translate }}\"\n                  required=\"true\"\n                  [(ngModel)]=\"flow.levels\"\n                  name=\"{{ 'levels' + index }}\"\n                >\n                </adapt-rx-counter>\n\n                <rx-expression-form-control\n                  class=\"d-block\"\n                  [ngClass]=\"{ 'form-group': !flow.isLevelUp }\"\n                  rx-id=\"flow-qualification\"\n                  [options]=\"flowQualificationOptions\"\n                  [(ngModel)]=\"flow.qualification\"\n                  (events)=\"onFlowQualificationEvent(index)\"\n                  name=\"{{ 'flowQualification' + index }}\"\n                ></rx-expression-form-control>\n\n                <div *ngIf=\"!flow.isLevelUp\" rx-id=\"flow-approvers\" class=\"form-group\">\n                  <label class=\"form-control-label\">\n                    {{ 'com.bmc.arsys.rx.client.approval.configuration.approvers' | translate }}\n\n                    <button\n                      type=\"button\"\n                      adapt-button\n                      class=\"d-icon-pencil px-1 ml-3 mb-1\"\n                      btn-type=\"tertiary\"\n                      rx-id=\"edit-button\"\n                      (click)=\"selectFlowApprovers(index)\"\n                    >\n                      {{ 'com.bmc.arsys.rx.client.common.edit.label' | translate }}\n                    </button>\n                  </label>\n\n                  <adapt-rx-checkbox\n                    *ngIf=\"!flow.isLevelUp\"\n                    class=\"checkbox-inline ml-4\"\n                    label=\"{{\n                      'com.bmc.arsys.rx.client.approval.configuration.apply-approver-exclusion.label' | translate\n                    }}\"\n                    [(ngModel)]=\"flow.applyApproverExclusion\"\n                    name=\"{{ 'applyApproverExclusion' + index }}\"\n                  >\n                  </adapt-rx-checkbox>\n                  <span\n                    class=\"d-icon-right-question_circle_o ml-1\"\n                    adaptPopover=\"{{\n                      'com.bmc.arsys.rx.client.approval.configuration.apply-approver-exclusion.tooltip' | translate\n                    }}\"\n                    placement=\"right\"\n                    appendToBody=\"true\"\n                  >\n                  </span>\n\n                  <div class=\"approver-list bg-secondary p-1\">\n                    {{ flow.approversDisplayValue }}\n                  </div>\n                </div>\n\n                <rx-expression-form-control\n                  *ngIf=\"!flow.isLevelUp\"\n                  class=\"d-block form-group\"\n                  rx-id=\"approver-qualification\"\n                  [options]=\"qualifyApproversOptions\"\n                  [(ngModel)]=\"flow.approverQualification\"\n                  (events)=\"onApproverQualificationEvent(index)\"\n                  name=\"{{ 'approverQualification' + index }}\"\n                ></rx-expression-form-control>\n\n                <div class=\"row\">\n                  <div class=\"col-12 col-sm-6 form-group\">\n                    <adapt-rx-select\n                      *ngIf=\"!flow.isLevelUp\"\n                      class=\"d-block\"\n                      label=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.if.multiple.approvers' | translate }}\"\n                      rx-id=\"signing-criteria\"\n                      [(ngModel)]=\"flow.signingCriteria\"\n                      [options]=\"flow.signingCriteriaList\"\n                      [optionFormatter]=\"optionFormatter\"\n                      name=\"{{ 'signingCriteria' + index }}\"\n                    >\n                    </adapt-rx-select>\n                  </div>\n\n                  <div class=\"col-12 col-sm-6 form-group\">\n                    <adapt-rx-select\n                      *ngIf=\"!flow.isLevelUp && flow.signingCriteria[0]?.value === 2\"\n                      class=\"d-block\"\n                      label=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.value.of' | translate }}\"\n                      rx-id=\"signing-criteria-percentage\"\n                      [(ngModel)]=\"flow.approvalOverridePercentage\"\n                      [options]=\"signingCriteriaPercentageList\"\n                      name=\"{{ 'signingCriteriaPercentage' + index }}\"\n                    >\n                    </adapt-rx-select>\n                  </div>\n                </div>\n\n                <hr class=\"my-1\" />\n                <h6>{{ 'com.bmc.arsys.rx.client.approval.configuration.flow.outcome.label' | translate }}</h6>\n\n                <div class=\"row\" *ngIf=\"flow.isOpen\">\n                  <div class=\"col-12 col-sm-6 form-group\">\n                    <rx-definition-picker\n                      [options]=\"processOnApproveOptions\"\n                      [(ngModel)]=\"flow.approvalFlowOutcomeMappingList[0].processName\"\n                      rx-id=\"process-on-approval\"\n                      name=\"{{ 'processOnApproval' + index }}\"\n                    >\n                    </rx-definition-picker>\n                  </div>\n\n                  <div class=\"col-12 col-sm-6 form-group\">\n                    <rx-definition-picker\n                      [options]=\"processOnRejectOptions\"\n                      [(ngModel)]=\"flow.approvalFlowOutcomeMappingList[1].processName\"\n                      rx-id=\"process-on-rejection\"\n                      name=\"{{ 'processOnRejection' + index }}\"\n                    >\n                    </rx-definition-picker>\n                  </div>\n\n                  <div class=\"col-12 col-sm-6 form-group\">\n                    <rx-definition-picker\n                      [options]=\"processOnErrorOptions\"\n                      [(ngModel)]=\"flow.approvalFlowOutcomeMappingList[2].processName\"\n                      rx-id=\"process-on-error\"\n                      name=\"{{ 'processOnError' + index }}\"\n                    >\n                    </rx-definition-picker>\n                  </div>\n                </div>\n              </adapt-accordion-tab>\n            </div>\n          </adapt-accordion>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #newFlowGroupTemplate let-context=\"context\">\n  <div class=\"flow-group-template\">\n    <div class=\"text-center mb-3 font-weight-bold\">\n      {{ 'com.bmc.arsys.rx.client.approval.configuration.flow.new.title' | translate }}\n    </div>\n\n    <adapt-rx-textfield\n      class=\"mb-1 d-block\"\n      rx-id=\"new-flow-button\"\n      label=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.flow.flow-group-name.label' | translate }}\"\n      required=\"true\"\n      [(ngModel)]=\"flowGroupName\"\n      [autofocus]=\"true\"\n      (keydown)=\"onKeyDownNew($event)\"\n      maxlength=\"254\"\n    >\n    </adapt-rx-textfield>\n\n    <div class=\"text-danger\" *ngIf=\"flowGroupName && isAddNewFlowGroupButtonDisabled()\">\n      {{ 'com.bmc.arsys.rx.client.approval.configuration.flow.flow-group-exists.warning' | translate }}\n    </div>\n\n    <div class=\"text-right mt-5\">\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"primary\"\n        rx-id=\"add-button\"\n        (click)=\"addNewFlowGroup()\"\n        [disabled]=\"isAddNewFlowGroupButtonDisabled()\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.add.label' | translate }}\n      </button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"secondary\"\n        rx-id=\"cancel-button\"\n        (click)=\"context.close()\"\n        class=\"ml-2\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n      </button>\n    </div>\n  </div>\n</ng-template>\n\n<ng-template #renameFlowGroupTemplate let-context=\"context\">\n  <div class=\"flow-group-template\">\n    <div class=\"text-center mb-3 font-weight-bold\">\n      {{ 'com.bmc.arsys.rx.client.approval.configuration.flow.rename.title' | translate }}\n    </div>\n\n    <adapt-rx-textfield\n      class=\"mb-1 d-block\"\n      rx-id=\"rename-flow-button\"\n      label=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.flow.flow-group-name.label' | translate }}\"\n      required=\"true\"\n      [(ngModel)]=\"flowGroupNewName\"\n      [autofocus]=\"true\"\n      (keydown)=\"onKeyDownRename($event, context)\"\n      maxlength=\"254\"\n    >\n    </adapt-rx-textfield>\n\n    <div class=\"text-danger\" *ngIf=\"flowGroupNewName && isRenameFlowGroupButtonDisabled()\">\n      {{ 'com.bmc.arsys.rx.client.approval.configuration.flow.flow-group-exists.warning' | translate }}\n    </div>\n\n    <div class=\"text-right mt-5\">\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"primary\"\n        rx-id=\"rename-button\"\n        (click)=\"renameFlowGroup(context)\"\n        [disabled]=\"isRenameFlowGroupButtonDisabled()\"\n      >\n        {{ 'com.bmc.arsys.rx.client.approval.update.button.label' | translate }}\n      </button>\n    </div>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}.accordion-wrapper{max-height:540px;overflow:auto}.available-list{overflow:auto}.vertical-center{position:absolute;margin:auto;top:0;bottom:0;left:20px;right:20px;height:130px}.flow-group-template{width:290px}.approver-list{min-height:28px}.wrap-word{word-break:break-all}.left-header-block .d-icon-exclamation_triangle{margin-left:5px}\n"], components: [{ type: i6.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i6.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i6.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i6.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i6.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i6.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i6.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i6.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i6.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i4.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }, { type: i6.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i6.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }], directives: [{ type: i6.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i9.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i8.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i8.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i8.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i9.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i9.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { type: i8.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i8.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i6.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalFlowConfigurationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-flow-configuration',
                    templateUrl: './approval-flow-configuration.component.html',
                    styleUrls: ['./approval-flow-configuration.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i0.ErrorHandler }, { type: i1.RxModalService }, { type: i2.TranslateService }, { type: i3.RxNotificationService }, { type: i4.RxExpressionEditorService }, { type: i5.RxApprovalConfigurationService }]; }, propDecorators: { registeredRecordDefinitionName: [{
                type: Input
            }], adaptPopoverDirective: [{
                type: ViewChild,
                args: [AdaptPopoverDirective]
            }], approvalFlowsForm: [{
                type: ViewChild,
                args: ['approvalFlowsForm']
            }] } });
//# sourceMappingURL=approval-flow-configuration.component.js.map