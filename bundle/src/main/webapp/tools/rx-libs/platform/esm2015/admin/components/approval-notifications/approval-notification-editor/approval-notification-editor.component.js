import { Component, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActiveModalRef, DismissReasons, TreeWrap } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, every, filter, find, flow, forEach, groupBy, includes, isEmpty, map as _map, map, values } from 'lodash';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { RxDefinitionPickerScope, RxDefinitionPickerType, RxExpressionEditorService } from '@helix/platform/shared/components';
import { RxApprovalNotificationExpressionConfigurator } from '../approval-notifiction-expression-configurator/approval-notification-expression-configurator.class';
import { ExpressionOperatorGroup, RxDefinitionNameService, RxNotificationService } from '@helix/platform/shared/api';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RxApprovalNotificationsService } from '../approval-notifications.service';
import { RX_APPROVAL_NOTIFICATIONS } from '../approval-notifications.constant';
import { RX_CONNECTION_MAPPING } from '../../connection-mapping/common/connection-mapping.constant';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "../approval-notifications.service";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@helix/platform/shared/api";
import * as i8 from "@angular/common";
export class ApprovalNotificationEditorComponent extends RxModalClass {
    constructor(injector, formBuilder, activeModalRef, rxRecordDefinitionCacheService, rxExpressionEditorService, rxRecordInstanceDataPageService, rxApprovalNotificationsService, translateService, rxNotificationService, rxDefinitionNameService) {
        super(activeModalRef, injector);
        this.injector = injector;
        this.formBuilder = formBuilder;
        this.activeModalRef = activeModalRef;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxApprovalNotificationsService = rxApprovalNotificationsService;
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.recordDefinitions = [];
        this.sendToOtherOptions = [];
        this.emailProfileOptions = [];
        this.emailTemplateOptions = [];
        this.isEditMode = false;
        this.groupedData = {};
        this.processList = [];
        this.treeWrap = TreeWrap.WrapAll;
        this.selectedFlows = [];
        this.availableFlows = [];
        this.processDefinitionPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.process-name-field.label'),
            definitionType: RxDefinitionPickerType.Process,
            required: true,
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RxDefinitionPickerScope.All],
                search: RxDefinitionPickerScope.All
            }
        };
        this.notificationTypeTooltip = {
            popoverMode: true,
            iconName: 'question_circle_o',
            placement: 'right',
            content: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notification-type-field.tooltip')
        };
        this.approverSelectionTooltip = {
            popoverMode: true,
            iconName: 'question_circle_o',
            placement: 'right',
            content: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.send-to.options.approver-selection.tooltip')
        };
        this.sendToOptionValue = {
            allApprovers: '0',
            selectedApprover: '1'
        };
        this.sendToOption = [
            {
                id: this.sendToOptionValue.allApprovers,
                name: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.send-to.options.all-approvers.name')
            },
            {
                id: this.sendToOptionValue.selectedApprover,
                name: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.send-to.options.other.name')
            }
        ];
        this.globalNotificationOptionValue = {
            global: 'global',
            flows: 'flows'
        };
        this.globalNotificationOptions = [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notification-type-field.types.flow.label'),
                value: this.globalNotificationOptionValue.flows
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notification-type-field.types.global.label'),
                value: this.globalNotificationOptionValue.global
            }
        ];
        this.notificationMethodOptions = [
            {
                id: '2',
                name: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notification-method.types.email.name')
            },
            {
                id: '5',
                name: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notification-method.types.process.name')
            }
        ];
        this.notifyOnOptions = [
            {
                id: 0,
                name: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.new-signature.name')
            },
            {
                id: 1,
                name: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.approve.name')
            },
            {
                id: 2,
                name: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.reject.name')
            },
            {
                id: 9,
                name: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.reassign.name')
            },
            {
                id: 11,
                name: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.cancel.name')
            },
            {
                id: 12,
                name: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.more-info-provided.name')
            },
            {
                id: 16,
                name: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.hold.name')
            },
            {
                id: 17,
                name: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.more-info.name')
            }
        ];
    }
    handleTemplateDependentFieldSelection(event) {
        if (event) {
            this.approvalNotificationForm.get('message').disable();
            this.approvalNotificationForm.get('outgoingEmailProfile').enable();
        }
        else {
            this.approvalNotificationForm.get('message').enable();
            this.approvalNotificationForm.get('outgoingEmailProfile').disable();
        }
    }
    optionFormatter(option) {
        return option.name;
    }
    ngOnInit() {
        super.ngOnInit();
        this.approvalNotificationForm = this.createApprovalNotificationForm();
        this.approvalNotificationData = this.activeModalRef.getData();
        this.recordDefinitions = this.approvalNotificationData.recordDefinitions;
        this.emailTemplateOptions = this.approvalNotificationData.templateList;
        this.approvalNotification = this.approvalNotificationData.approvalNotification;
        this.isEditMode = Boolean(this.approvalNotification.notificationName);
        this.expressionConfigurator = new RxApprovalNotificationExpressionConfigurator(this.injector);
        this.recordDefinitionSubject = new BehaviorSubject('');
        this.subjectExpressionConfigurator = new RxApprovalNotificationExpressionConfigurator(this.injector);
        this.subjectExpressionConfigurator.configureForProperty({
            propertyPath: 'subject',
            dataDictionary$: this.recordDefinitionSubject
                .asObservable()
                .pipe(switchMap((recordDefinitionName) => this.subjectExpressionConfigurator.approvalNotificationExpressionDataDictionary(recordDefinitionName, false))),
            operators: null
        });
        this.expressionConfigurator.configureForProperty({
            propertyPath: 'approvalNotification',
            dataDictionary$: this.recordDefinitionSubject
                .asObservable()
                .pipe(switchMap((recordDefinitionName) => this.expressionConfigurator.approvalNotificationExpressionDataDictionary(recordDefinitionName, true))),
            operators: this.expressionConfigurator.getOperatorRowsByGroup(ExpressionOperatorGroup.All)
        });
        this.expressionFormControlOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notification-expression-field.label'),
            dataDictionary$: this.expressionConfigurator.getDataDictionary('approvalNotification'),
            operators: this.expressionConfigurator.getOperators('approvalNotification'),
            isRequired: false,
            tooltip: {
                popoverMode: true,
                iconName: 'question_circle_o',
                placement: 'right',
                content: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notification-expression-field.tooltip')
            }
        };
        this.subjectExpressionFormControlOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.subject-field.label'),
            dataDictionary$: this.subjectExpressionConfigurator.getDataDictionary('subject'),
            operators: this.expressionConfigurator.getOperators('subject'),
            isRequired: this.isRequiredForEmail()
        };
        this.notificationMessageExpressionOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.common.message.label'),
            dataDictionary$: this.subjectExpressionConfigurator.getDataDictionary('subject'),
            operators: this.expressionConfigurator.getOperators('subject'),
            isRequired: this.isRequiredForEmail()
        };
        this.approvalNotificationForm
            .get('primaryRecordName')
            .valueChanges.subscribe((value) => this.onRecordDefinitionChange(value));
        this.approvalNotificationForm
            .get('notificationMethod')
            .valueChanges.subscribe((value) => this.onNotificationMethodChange(value));
        if (this.isEditMode) {
            this.initializeApprovalNotificationForm();
        }
    }
    isDirty() {
        var _a, _b;
        return Boolean(((_a = this.approvalNotificationForm) === null || _a === void 0 ? void 0 : _a.dirty) || ((_b = this.expressionDialogApi) === null || _b === void 0 ? void 0 : _b.isDirty()));
    }
    ngOnDestroy() {
        this.recordDefinitionSubject.complete();
    }
    createApprovalNotificationForm() {
        return this.formBuilder.group({
            primaryRecordName: [[], Validators.required],
            notificationName: ['', Validators.required],
            notifyOn: [[], Validators.required],
            additionalQualification: '',
            notificationType: this.globalNotificationOptionValue.flows,
            useTemplate: false,
            outgoingEmailProfile: [{ value: [], disabled: true }, Validators.required],
            approvalTemplate: [[], Validators.nullValidator],
            sendTo: ['0'],
            subject: '',
            notificationMethod: [[this.notificationMethodOptions[0]], Validators.required],
            status: true,
            message: '',
            approver: [{ value: [], disabled: true }, Validators.required],
            rxProcessName: '',
            check: false
        });
    }
    reset() {
        this.approvalNotificationForm.get('additionalQualification').setValue('');
        this.approvalNotificationForm.get('rxProcessName').setValue('');
        this.approvalNotificationForm.get('subject').setValue('');
        this.approvalNotificationForm.get('message').setValue('');
        this.approvalNotificationForm.get('sendTo').setValue('0');
        this.approvalNotificationForm.get('notifyOn').setValue([]);
        this.approvalNotificationForm.get('notificationType').setValue(this.globalNotificationOptionValue.flows);
        this.approvalNotificationForm.get('useTemplate').setValue(false);
        this.approvalNotificationForm.get('notificationMethod').setValue([this.notificationMethodOptions[0]]);
        this.approvalNotificationForm.get('outgoingEmailProfile').setValue([]);
        this.approvalNotificationForm.get('approvalTemplate').setValue([]);
        this.approvalNotificationForm.get('approver').setValue([]);
        this.approvalNotificationForm.get('status').setValue(true);
    }
    onNotificationMethodChange(value) {
        // check if notification method is process or email i.e '5' or '2'
        if (value[0].id === this.notificationMethodOptions[1].id) {
            this.approvalNotificationForm.get('subject').setValue('');
            this.approvalNotificationForm.get('message').setValue('');
            this.approvalNotificationForm.controls['subject'].disable();
            this.approvalNotificationForm.controls['message'].disable();
            this.approvalNotificationForm.controls['rxProcessName'].enable();
        }
        else if (value[0].id === this.notificationMethodOptions[0].id) {
            this.approvalNotificationForm.get('rxProcessName').setValue('');
            this.approvalNotificationForm.controls['rxProcessName'].disable();
            this.approvalNotificationForm.controls['subject'].enable();
            this.approvalNotificationForm.controls['message'].enable();
        }
    }
    handleSendToOptionSelection() {
        if (this.approvalNotificationForm.get('sendTo').value === this.sendToOptionValue.selectedApprover) {
            this.approvalNotificationForm.get('approver').enable();
        }
        else {
            this.approvalNotificationForm.get('approver').disable();
        }
    }
    initializeApprovalNotification(recordDefinitionName) {
        return forkJoin([
            this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName + ' Detail Signature'),
            this.rxRecordInstanceDataPageService.post({
                params: {
                    recorddefinition: RX_APPROVAL_NOTIFICATIONS.arSystemEmailMailboxConfiguration.name,
                    propertySelection: [RX_RECORD_DEFINITION.coreFieldIds.id],
                    queryExpression: `'${RX_RECORD_DEFINITION.coreFieldIds.status}' = "0" AND '${RX_APPROVAL_NOTIFICATIONS.arSystemEmailMailboxConfiguration.fields.mailboxFunction}' = "1"`
                }
            }),
            this.rxRecordInstanceDataPageService.post({
                params: {
                    recorddefinition: RX_APPROVAL_NOTIFICATIONS.approvalFlowConfiguration.name,
                    propertySelection: values(RX_APPROVAL_NOTIFICATIONS.approvalFlowConfiguration.fields).join(),
                    queryExpression: `'${RX_APPROVAL_NOTIFICATIONS.approvalFlowConfiguration.fields.recordDefinition}' == "${recordDefinitionName}"`
                }
            })
        ]);
    }
    initializeApprovalNotificationForm() {
        this.approvalNotificationForm.get('notificationName').setValue(this.approvalNotification.notificationName);
        this.approvalNotificationForm.get('status').setValue(this.approvalNotification.status === '0');
        this.approvalNotificationForm.get('rxProcessName').setValue(this.approvalNotification.rxProcessName);
        this.approvalNotificationForm
            .get('subject')
            .setValue(this.convertExpressionFromServerFormat(this.approvalNotification.subject));
        this.approvalNotificationForm
            .get('message')
            .setValue(this.convertExpressionFromServerFormat(this.approvalNotification.message));
        this.approvalNotificationForm.get('sendTo').setValue(this.approvalNotification.sendTo);
        this.handleSendToOptionSelection();
        this.approvalNotificationForm
            .get('additionalQualification')
            .setValue(this.approvalNotification.additionalQualification);
        this.approvalNotificationForm
            .get('notifyOn')
            .setValue(filter(this.notifyOnOptions, { id: this.approvalNotification.notifyOn }));
        this.approvalNotificationForm
            .get('notificationType')
            .setValue(this.approvalNotification.notificationType === 1
            ? this.globalNotificationOptionValue.global
            : this.globalNotificationOptionValue.flows);
        this.approvalNotificationForm.get('useTemplate').setValue(this.approvalNotification.useTemplate === '1');
        this.handleTemplateDependentFieldSelection(true);
        this.approvalNotificationForm
            .get('notificationMethod')
            .setValue(filter(this.notificationMethodOptions, { id: this.approvalNotification.notificationMethod }));
        this.approvalNotificationForm.get('outgoingEmailProfile').setValue([
            {
                name: this.approvalNotification.emailProfile,
                id: this.approvalNotification.emailProfileGuid
            }
        ]);
        this.approvalNotificationForm.get('approvalTemplate').setValue([
            {
                name: this.approvalNotification.approvalTemplateName,
                id: this.approvalNotification.approvalTemplateGuid
            }
        ]);
        this.approvalNotificationForm.get('primaryRecordName').setValue(this.approvalNotification.primaryRecordName
            ? [
                {
                    value: this.approvalNotification.primaryRecordName,
                    displayValue: this.rxDefinitionNameService.getDisplayName(this.approvalNotification.primaryRecordName)
                }
            ]
            : []);
    }
    onRecordDefinitionChange(recordDefinitionOption) {
        const oldRecordDefinitionName = this.approvalNotificationForm.value.primaryRecordName.length
            ? this.approvalNotificationForm.value.primaryRecordName[0]
            : '';
        const newRecordDefinitionName = recordDefinitionOption[0].value;
        const threeWayRecordDefinitionName = newRecordDefinitionName + ' Detail Signature';
        if (newRecordDefinitionName !== oldRecordDefinitionName) {
            if (!this.isEditMode) {
                this.reset();
            }
            this.recordDefinitionSubject.next(threeWayRecordDefinitionName);
            if (newRecordDefinitionName) {
                this.initializeApprovalNotification(newRecordDefinitionName).subscribe(([recordDefinition, outgoingMailboxes, recordInstances]) => {
                    this.prepareApprovalFlowTree(recordInstances);
                    this.initializeSendToFromControlOptions(recordDefinition);
                    this.initializeEmailProfiles(outgoingMailboxes, newRecordDefinitionName);
                });
            }
        }
    }
    onSelectionChange() {
        this.isTreeTouched = true;
        this.approvalNotificationForm.markAsDirty();
    }
    isGlobalNotification() {
        return (this.isEditMode &&
            this.approvalNotificationForm.get('notificationType').value === this.globalNotificationOptionValue.global);
    }
    prepareApprovalFlowTree(recordInstances) {
        this.selectedFlows = [];
        this.availableFlows = flow((instanceData) => groupBy(instanceData, RX_APPROVAL_NOTIFICATIONS.approvalFlowConfiguration.fields.flowGroup), (flowsByFlowGroup) => map(flowsByFlowGroup, (flows, flowGroupName) => ({
            label: flowGroupName,
            disallowMultipleNodeSelection: this.isGlobalNotification(),
            expanded: true,
            children: _map(flows, (approvalFlow) => {
                const leafNode = {
                    label: approvalFlow[RX_APPROVAL_NOTIFICATIONS.approvalFlowConfiguration.fields.flowName],
                    key: approvalFlow[RX_APPROVAL_NOTIFICATIONS.approvalFlowConfiguration.fields.arApprovalProcessDefinitionGuid],
                    leaf: true,
                    data: flowGroupName,
                    disallowMultipleNodeSelection: this.isGlobalNotification()
                };
                if (includes(this.approvalNotification.processList, approvalFlow[RX_APPROVAL_NOTIFICATIONS.approvalFlowConfiguration.fields.arApprovalProcessDefinitionGuid])) {
                    this.selectedFlows.push(leafNode);
                }
                return leafNode;
            })
        })))(recordInstances.data);
        this.updateParentNodesForSelectedFlows();
    }
    updateParentNodesForSelectedFlows() {
        forEach(this.selectedFlows, (selectedFlow) => {
            const availableParentNode = find(this.availableFlows, (availableFlow) => availableFlow.label === selectedFlow.data);
            if (every(availableParentNode.children, (node) => includes(this.selectedFlows, node))) {
                this.selectedFlows.push(availableParentNode);
            }
            else {
                availableParentNode.partialSelected = true;
            }
        });
    }
    initializeEmailProfiles(outgoingMailboxes, recordDefinitionName) {
        let additionalExpression = `'${RX_CONNECTION_MAPPING.aliasMapping.fields.aliasType}' = "email"`;
        let expression = '';
        if (recordDefinitionName) {
            additionalExpression += ` AND ('${RX_CONNECTION_MAPPING.aliasMapping.fields.applicationId}' = "${this.rxDefinitionNameService.getBundleId(recordDefinitionName)}" OR '${RX_CONNECTION_MAPPING.aliasMapping.fields.applicationId}' = "None")`;
        }
        forEach(outgoingMailboxes.data, (outgoingMailbox) => {
            if (!isEmpty(expression)) {
                expression += ' OR ';
            }
            expression += `'${RX_CONNECTION_MAPPING.aliasMapping.fields.aliasValue}' = "${outgoingMailbox[RX_RECORD_DEFINITION.coreFieldIds.id]}"`;
        });
        expression = expression ? ' AND ((' + expression + '))' : '';
        this.rxRecordInstanceDataPageService
            .post({
            params: {
                recorddefinition: 'Alias Mapping',
                propertySelection: [
                    RX_CONNECTION_MAPPING.aliasMapping.fields.aliasName,
                    RX_RECORD_DEFINITION.coreFieldIds.id,
                    RX_CONNECTION_MAPPING.aliasMapping.fields.applicationId
                ],
                queryExpression: additionalExpression + expression
            }
        })
            .subscribe((result) => {
            this.emailProfileOptions = result.data.map((emailData) => {
                return {
                    name: emailData[RX_CONNECTION_MAPPING.aliasMapping.fields.aliasName],
                    id: emailData[RX_RECORD_DEFINITION.coreFieldIds.id]
                };
            });
        });
    }
    initializeSendToFromControlOptions(recordDefinition) {
        if (recordDefinition && recordDefinition.fieldDefinitions) {
            this.sendToOtherOptions = this.filterFieldDefinitions(recordDefinition.fieldDefinitions);
            this.approvalNotificationForm
                .get('approver')
                .setValue(filter(this.sendToOtherOptions, { id: this.approvalNotification.sendToOthers }));
        }
    }
    filterFieldDefinitions(fieldDefinitions) {
        return fieldDefinitions
            .filter((fieldDefinition) => {
            var _a;
            return fieldDefinition.resourceType !== RX_RECORD_DEFINITION.dataTypes.attachment.resourceType &&
                ((_a = fieldDefinition.fieldMapping) === null || _a === void 0 ? void 0 : _a.source) === 'PRIMARY_RECORD_DEFINITION' &&
                !includes([
                    RX_RECORD_DEFINITION.coreFieldIds.displayId,
                    RX_RECORD_DEFINITION.coreFieldIds.id,
                    RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields.applicationBundleId
                ], fieldDefinition.id);
        })
            .map((fieldDefinition) => ({
            name: fieldDefinition.name.replace(/ Primary$/, ''),
            id: `'\$\{${fieldDefinition.name}\}'`
        }));
    }
    buildExpression(propertyName) {
        this.selectApprovalNotificationExpression(propertyName);
    }
    selectApprovalNotificationExpression(propertyName) {
        let fieldLabel = '';
        if (propertyName === 'additionalQualification') {
            fieldLabel = this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notification-expression-field.label');
        }
        else if (propertyName === 'subject') {
            fieldLabel = this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.subject-field.label');
        }
        else if (propertyName === 'message') {
            fieldLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.message.label');
        }
        const expressionEditorConfig = {
            property: {
                path: propertyName === 'additionalQualification' ? 'approvalNotification' : 'subject',
                value: this.approvalNotificationForm.get(propertyName).value,
                label: fieldLabel
            },
            expressionConfigurator: propertyName === 'additionalQualification' ? this.expressionConfigurator : this.subjectExpressionConfigurator,
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
        };
        this.rxExpressionEditorService
            .openEditor(expressionEditorConfig, (dialogApi) => (this.expressionDialogApi = dialogApi))
            .subscribe((expression) => {
            this.expressionDialogApi = null;
            this.approvalNotificationForm.get(propertyName).setValue(expression.value);
            this.approvalNotificationForm.get(propertyName).markAsDirty();
        });
    }
    transformFormControlData() {
        var _a, _b;
        const approvalNotificationRecord = cloneDeep(this.approvalNotificationForm.value);
        approvalNotificationRecord.primaryRecordName = approvalNotificationRecord.primaryRecordName[0].value;
        approvalNotificationRecord.notifyOn = approvalNotificationRecord.notifyOn.length
            ? approvalNotificationRecord.notifyOn[0].id
            : '';
        if (approvalNotificationRecord.notificationType === this.globalNotificationOptionValue.flows) {
            approvalNotificationRecord.notificationType = 0;
            approvalNotificationRecord.processList = this.selectedFlows
                .filter((approvalFlow) => approvalFlow.leaf)
                .map((approvalFlow) => approvalFlow.key);
        }
        else {
            approvalNotificationRecord.notificationType = 1;
        }
        if ((_a = approvalNotificationRecord === null || approvalNotificationRecord === void 0 ? void 0 : approvalNotificationRecord.outgoingEmailProfile) === null || _a === void 0 ? void 0 : _a.length) {
            approvalNotificationRecord.emailProfile = approvalNotificationRecord.outgoingEmailProfile[0].name;
            approvalNotificationRecord.emailProfileGuid = approvalNotificationRecord.outgoingEmailProfile[0].id;
        }
        delete approvalNotificationRecord.outgoingEmailProfile;
        if (approvalNotificationRecord.approvalTemplate.length) {
            approvalNotificationRecord.approvalTemplateName = approvalNotificationRecord.approvalTemplate.name;
            approvalNotificationRecord.approvalTemplateGuid = approvalNotificationRecord.approvalTemplate.id;
        }
        delete approvalNotificationRecord.approvalTemplate;
        approvalNotificationRecord.sendToOthers = ((_b = approvalNotificationRecord.approver) === null || _b === void 0 ? void 0 : _b.length)
            ? approvalNotificationRecord.approver[0].id
            : '';
        approvalNotificationRecord.notificationMethod = approvalNotificationRecord.notificationMethod.length
            ? approvalNotificationRecord.notificationMethod[0].id
            : '';
        if (approvalNotificationRecord.notificationMethod === this.notificationMethodOptions[1].id) {
            approvalNotificationRecord.subject = approvalNotificationRecord.notificationName;
            approvalNotificationRecord.message = approvalNotificationRecord.notificationName;
        }
        else if (approvalNotificationRecord.useTemplate) {
            approvalNotificationRecord.message = approvalNotificationRecord.notificationName;
        }
        approvalNotificationRecord.useTemplate = approvalNotificationRecord.useTemplate ? '1' : '0';
        approvalNotificationRecord.status = approvalNotificationRecord.status ? '0' : '1';
        approvalNotificationRecord.subject = this.convertExpressionToServerFormat(approvalNotificationRecord.subject);
        approvalNotificationRecord.message = this.convertExpressionToServerFormat(approvalNotificationRecord.message);
        delete approvalNotificationRecord.approver;
        delete approvalNotificationRecord.check;
        if (this.isEditMode) {
            approvalNotificationRecord.notificationGuid = this.approvalNotification.notificationGuid;
        }
        return approvalNotificationRecord;
    }
    save() {
        this.approvalNotificationForm.markAsPristine();
        const approvalNotificationRecord = this.transformFormControlData();
        this.rxApprovalNotificationsService.createApprovalNotification(approvalNotificationRecord).subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notification-saved.message'));
            this.activeModalRef.close(approvalNotificationRecord);
        });
    }
    update() {
        this.approvalNotificationForm.markAsPristine();
        const approvalNotificationRecord = this.transformFormControlData();
        this.rxApprovalNotificationsService.updateApprovalNotification(approvalNotificationRecord).subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notification-updated.message'));
            this.activeModalRef.close(approvalNotificationRecord);
        });
    }
    closeModal() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    shouldUseTemplate() {
        var _a;
        return ((_a = this.approvalNotificationForm.get('notifyOn').value[0]) === null || _a === void 0 ? void 0 : _a.id) === 0;
    }
    showProcessDefinitionPicker() {
        var _a;
        return ((_a = this.approvalNotificationForm.get('notificationMethod').value[0]) === null || _a === void 0 ? void 0 : _a.id) === '5';
    }
    isRequiredForEmail() {
        var _a;
        return ((_a = this.approvalNotificationForm.get('notificationMethod').value[0]) === null || _a === void 0 ? void 0 : _a.id) === '2';
    }
    onNotifyChange(event) {
        if (event.options[0].id !== 0) {
            this.approvalNotificationForm.get('useTemplate').setValue(false);
        }
    }
    isNotificationOptionInvalid() {
        return this.approvalNotificationForm.get('notificationType').value === this.globalNotificationOptionValue.flows
            ? !this.selectedFlows.length
            : false;
    }
    definitionOptionFormatter(option) {
        return option.displayValue;
    }
    // Convert expression received from server to format supported by expression editor,
    // e.g. $Assignee Primary$ -> '${Assignee Primary}'
    convertExpressionFromServerFormat(expression) {
        const fieldTokenServerFormatRegExp = new RegExp('(\\$' + RX_RECORD_DEFINITION.validDefinitionNameRegExpString + '\\$)', 'g');
        return (expression &&
            expression.replace(fieldTokenServerFormatRegExp, function (match) {
                const expressionEntry = match.replace(/\$/g, '');
                return expressionEntry ? "'${" + expressionEntry + "}'" : match;
            }));
    }
    // Convert expression to format expected by the server,
    // e.g. '${Assignee Primary}' -> $Assignee Primary$
    convertExpressionToServerFormat(expression) {
        const fieldTokenExpressionEditorFormatRegExp = new RegExp("('\\${" + RX_RECORD_DEFINITION.validDefinitionNameRegExpString + "}')", 'g');
        return (expression &&
            expression.replace(fieldTokenExpressionEditorFormatRegExp, function (match) {
                return '$' + match.replace(/['${}]/g, '') + '$';
            }));
    }
}
ApprovalNotificationEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalNotificationEditorComponent, deps: [{ token: i0.Injector }, { token: i1.FormBuilder }, { token: i2.ActiveModalRef }, { token: i3.RxRecordDefinitionCacheService }, { token: i4.RxExpressionEditorService }, { token: i3.RxRecordInstanceDataPageService }, { token: i5.RxApprovalNotificationsService }, { token: i6.TranslateService }, { token: i7.RxNotificationService }, { token: i7.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalNotificationEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalNotificationEditorComponent, selector: "rx-approval-notification-editor", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <form [formGroup]=\"approvalNotificationForm\">\n    <div class=\"row\">\n      <div class=\"col-12 col-md-6\">\n        <adapt-rx-select\n          class=\"d-block form-group\"\n          formControlName=\"primaryRecordName\"\n          [options]=\"recordDefinitions\"\n          rx-id=\"record-definition-name\"\n          [disabled]=\"isEditMode\"\n          label=\"{{ 'com.bmc.arsys.rx.client.approval.record-definition-field.label' | translate }}\"\n          [optionFormatter]=\"definitionOptionFormatter\"\n        >\n        </adapt-rx-select>\n      </div>\n\n      <div class=\"col-12 col-md-6\">\n        <adapt-rx-textfield\n          class=\"d-block form-group\"\n          rx-id=\"notification-name\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.approval.notification-configuration.notification-name-field.label' | translate\n          }}\"\n          formControlName=\"notificationName\"\n        ></adapt-rx-textfield>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-12 col-md-6 d-flex flex-column\">\n        <adapt-rx-select\n          class=\"d-block form-group\"\n          formControlName=\"notifyOn\"\n          [options]=\"notifyOnOptions\"\n          [optionFormatter]=\"optionFormatter\"\n          rx-id=\"notify-on\"\n          (onSelectionChange)=\"onNotifyChange($event)\"\n          label=\"{{ 'com.bmc.arsys.rx.client.approval.notification-configuration.notify-on-field.label' | translate }}\"\n        >\n        </adapt-rx-select>\n\n        <rx-expression-form-control\n          class=\"d-block form-group\"\n          [options]=\"expressionFormControlOptions\"\n          formControlName=\"additionalQualification\"\n          rx-id=\"additional-qualification\"\n          (events)=\"buildExpression('additionalQualification')\"\n          required=\"false\"\n        ></rx-expression-form-control>\n\n        <adapt-rx-radiobutton-group\n          class=\"d-block form-group\"\n          formControlName=\"notificationType\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.approval.notification-configuration.notification-type-field.label' | translate\n          }}\"\n          [tooltip]=\"notificationTypeTooltip\"\n          rx-id=\"notification-type\"\n        >\n          <adapt-rx-radiobutton\n            *ngFor=\"let option of globalNotificationOptions; let index = index\"\n            [label]=\"option.label\"\n            [value]=\"option.value\"\n            [disabled]=\"isEditMode\"\n            class=\"radio-inline m-0\"\n            [ngClass]=\"{ 'mr-3': index === 0 }\"\n          ></adapt-rx-radiobutton>\n        </adapt-rx-radiobutton-group>\n\n        <div\n          class=\"d-flex flex-column h-100\"\n          *ngIf=\"approvalNotificationForm.get('notificationType').value === globalNotificationOptionValue.flows\"\n        >\n          <adapt-rx-control-label\n            label=\"{{\n              'com.bmc.arsys.rx.client.approval.notification-configuration.notification-type-field.types.flow.sub-label'\n                | translate\n            }}\"\n            [showRequiredLabel]=\"true\"\n          >\n          </adapt-rx-control-label>\n\n          <div class=\"card flex-fill\" [ngClass]=\"{ 'border-danger': isTreeTouched && isNotificationOptionInvalid() }\">\n            <div class=\"card-block\">\n              <adapt-empty-state\n                *ngIf=\"!availableFlows.length\"\n                [type]=\"'grid'\"\n                label=\"{{\n                  'com.bmc.arsys.rx.client.approval.notification-configuration.no-flows-available.message' | translate\n                }}\"\n              >\n              </adapt-empty-state>\n\n              <adapt-tree\n                [value]=\"availableFlows\"\n                selectionMode=\"checkbox\"\n                [(selection)]=\"selectedFlows\"\n                *ngIf=\"availableFlows.length\"\n                (selectionChange)=\"onSelectionChange()\"\n                [wrap]=\"treeWrap\"\n              >\n              </adapt-tree>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6\">\n        <adapt-rx-radiobutton-group\n          class=\"d-block form-group\"\n          formControlName=\"sendTo\"\n          label=\"{{ 'com.bmc.arsys.rx.client.approval.notification-configuration.send-to-field.label' | translate }}\"\n        >\n          <adapt-rx-radiobutton\n            *ngFor=\"let option of sendToOption; let index = index\"\n            [value]=\"option.id\"\n            [label]=\"option.name\"\n            class=\"radio-inline m-0\"\n            [ngClass]=\"{ 'mr-3': index === 0 }\"\n            rx-id=\"send-to-option\"\n            (checkedChange)=\"handleSendToOptionSelection()\"\n          ></adapt-rx-radiobutton>\n        </adapt-rx-radiobutton-group>\n\n        <adapt-rx-select\n          class=\"d-block form-group\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.approval.notification-configuration.send-to.options.approver-selection' | translate\n          }}\"\n          *ngIf=\"approvalNotificationForm.get('sendTo').value === '1'\"\n          formControlName=\"approver\"\n          [options]=\"sendToOtherOptions\"\n          [optionFormatter]=\"optionFormatter\"\n          [tooltip]=\"approverSelectionTooltip\"\n          rx-id=\"approver\"\n        >\n        </adapt-rx-select>\n\n        <adapt-rx-select\n          class=\"d-block form-group\"\n          formControlName=\"notificationMethod\"\n          [options]=\"notificationMethodOptions\"\n          [optionFormatter]=\"optionFormatter\"\n          rx-id=\"notification-method\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.approval.notification-configuration.notification-method-field.label' | translate\n          }}\"\n        >\n        </adapt-rx-select>\n\n        <adapt-rx-checkbox\n          *ngIf=\"shouldUseTemplate()\"\n          class=\"d-block form-group\"\n          formControlName=\"useTemplate\"\n          rx-id=\"use-template\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.approval.notification-configuration.email-based-approval-field.label' | translate\n          }}\"\n          (ngModelChange)=\"handleTemplateDependentFieldSelection($event)\"\n        ></adapt-rx-checkbox>\n\n        <div *ngIf=\"approvalNotificationForm.get('useTemplate').value\">\n          <adapt-rx-select\n            class=\"d-block form-group\"\n            formControlName=\"outgoingEmailProfile\"\n            [options]=\"emailProfileOptions\"\n            [optionFormatter]=\"optionFormatter\"\n            rx-id=\"outgoing-email-profile\"\n            label=\"{{\n              'com.bmc.arsys.rx.client.approval.notification-configuration.email-outgoing-profile-field.label'\n                | translate\n            }}\"\n          >\n          </adapt-rx-select>\n\n          <adapt-rx-select\n            class=\"d-block form-group\"\n            formControlName=\"approvalTemplate\"\n            [options]=\"emailTemplateOptions\"\n            [optionFormatter]=\"optionFormatter\"\n            rx-id=\"approval-template\"\n            label=\"{{ 'com.bmc.arsys.rx.client.approval.notification-configuration.template-field.label' | translate }}\"\n          >\n          </adapt-rx-select>\n        </div>\n\n        <rx-expression-form-control\n          class=\"d-block form-group\"\n          *ngIf=\"approvalNotificationForm.get('notificationMethod').value[0]['id'] === '2'\"\n          [options]=\"subjectExpressionFormControlOptions\"\n          formControlName=\"subject\"\n          rx-id=\"subject\"\n          (events)=\"buildExpression('subject')\"\n          required=\"true\"\n        ></rx-expression-form-control>\n\n        <rx-expression-form-control\n          class=\"d-block form-group\"\n          *ngIf=\"\n            approvalNotificationForm.get('notificationMethod').value[0]['id'] === '2' &&\n            !approvalNotificationForm.get('useTemplate').value\n          \"\n          [options]=\"notificationMessageExpressionOptions\"\n          formControlName=\"message\"\n          rx-id=\"message\"\n          (events)=\"buildExpression('message')\"\n          required=\"true\"\n        ></rx-expression-form-control>\n\n        <rx-definition-picker\n          class=\"d-block form-group\"\n          *ngIf=\"showProcessDefinitionPicker()\"\n          [options]=\"processDefinitionPickerOptions\"\n          formControlName=\"rxProcessName\"\n          rx-id=\"definition-field\"\n          required=\"true\"\n        >\n        </rx-definition-picker>\n\n        <adapt-rx-switch\n          formControlName=\"status\"\n          rx-id=\"status\"\n          label=\"{{ 'com.bmc.arsys.rx.client.approval.notification-configuration.enabled-field.label' | translate }}\"\n          [isLabelBefore]=\"false\"\n        ></adapt-rx-switch>\n      </div>\n    </div>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!isEditMode\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    class=\"mr-2\"\n    (click)=\"save()\"\n    [disabled]=\"approvalNotificationForm.pristine || approvalNotificationForm.invalid || isNotificationOptionInvalid()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    *ngIf=\"isEditMode\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    class=\"mr-2\"\n    rx-id=\"save-button\"\n    (click)=\"update()\"\n    [disabled]=\"approvalNotificationForm.pristine || approvalNotificationForm.invalid || isNotificationOptionInvalid()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.approval.update.button.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" class=\"mr-2\" type=\"button\" rx-id=\"cancel-button\" (click)=\"closeModal()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.approval-notification-flow{overflow-y:auto;max-height:320px}adapt-rx-textfield,adapt-rx-select,rx-definition-picker{max-width:400px}:host::ng-deep rx-expression-form-control button{height:2.38rem}:host::ng-deep adapt-rx-radiobutton .radio{margin:8px 0}.card{min-height:152px;max-height:285px;overflow:auto}\n"], components: [{ type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }, { type: i2.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i2.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i2.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i2.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i2.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i4.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i2.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i6.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalNotificationEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-notification-editor',
                    templateUrl: './approval-notification-editor.component.html',
                    styleUrls: ['./approval-notification-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.FormBuilder }, { type: i2.ActiveModalRef }, { type: i3.RxRecordDefinitionCacheService }, { type: i4.RxExpressionEditorService }, { type: i3.RxRecordInstanceDataPageService }, { type: i5.RxApprovalNotificationsService }, { type: i6.TranslateService }, { type: i7.RxNotificationService }, { type: i7.RxDefinitionNameService }]; } });
//# sourceMappingURL=approval-notification-editor.component.js.map