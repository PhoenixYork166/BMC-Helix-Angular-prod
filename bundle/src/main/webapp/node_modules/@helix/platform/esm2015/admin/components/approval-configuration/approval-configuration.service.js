import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RX_APPROVAL_CONFIGURATION } from './approval-configuration.constant';
import { trim } from 'lodash';
import { RxFunctionalRoleDataPageService } from '@helix/platform/shared/api';
import { map, shareReplay } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@helix/platform/shared/api";
export class RxApprovalConfigurationService {
    constructor(httpClient, rxFunctionalRoleDataPageService) {
        this.httpClient = httpClient;
        this.rxFunctionalRoleDataPageService = rxFunctionalRoleDataPageService;
        this.selfApprovalApi = '/api/com.bmc.arsys.rx.approval/rx/application/approval/approvalmapping';
        this.registrationApi = '/api/com.bmc.arsys.rx.approval/rx/application/approval/registration';
        this.flowConfigurationApi = '/api/com.bmc.arsys.rx.approval/rx/application/approval/flowconfiguration';
    }
    getRegisteredRecordDetails(registeredRecordDefinitionName) {
        return this.httpClient.get(`${this.registrationApi}/${registeredRecordDefinitionName}`);
    }
    registerRecord(approvalRegistrationRecord) {
        return this.httpClient.post(this.registrationApi, approvalRegistrationRecord);
    }
    updateRecord(approvalRegistrationRecord) {
        return this.httpClient.put(`${this.registrationApi}/${approvalRegistrationRecord.recordDefinition}`, approvalRegistrationRecord);
    }
    unRegisterRecord(definitionName) {
        return this.httpClient.delete(`${this.registrationApi}/${encodeURIComponent(definitionName)}`);
    }
    createSelfApprovalConfiguration(configuration) {
        return this.httpClient.post(this.selfApprovalApi, configuration);
    }
    updateSelfApprovalConfiguration(id, configuration) {
        return this.httpClient.put(`${this.selfApprovalApi}/${RX_APPROVAL_CONFIGURATION.selfApproval.mapping.name}/${id}`, configuration);
    }
    deleteSelfApprovalConfiguration(id) {
        return this.httpClient.delete(`${this.selfApprovalApi}/${RX_APPROVAL_CONFIGURATION.selfApproval.mapping.name}/${id}`);
    }
    getFunctionalRoles() {
        if (!this.functionalRoles$) {
            this.functionalRoles$ = this.rxFunctionalRoleDataPageService
                .get({
                params: {
                    pageSize: -1,
                    propertySelection: ['applicationName', 'name']
                }
            })
                .pipe(map((response) => response.data.map((role) => ({
                id: role.id,
                name: role.name,
                applicationName: role.applicationName
            }))), shareReplay(1));
        }
        return this.functionalRoles$;
    }
    getApprovalFlowConfigurations(registeredRecordDefinition) {
        return this.httpClient.get(`${this.flowConfigurationApi}/${registeredRecordDefinition}`);
    }
    updateApprovalFlowGroup(flowGroupName, flowGroupConfiguration, recordDefinitionName) {
        return this.httpClient.put(`${this.flowConfigurationApi}/${encodeURIComponent(recordDefinitionName)}/flowGroupName/${encodeURIComponent(flowGroupName)}`, flowGroupConfiguration);
    }
    saveApprovalFlowGroup(flowGroupConfiguration, recordDefinitionName) {
        return this.httpClient.post(`${this.flowConfigurationApi}/${encodeURIComponent(recordDefinitionName)}/flowGroupName`, flowGroupConfiguration);
    }
    getApprovalFlowGroup(recordDefinitionName, flowGroupName) {
        return this.httpClient.get(`${this.flowConfigurationApi}/${encodeURIComponent(recordDefinitionName)}/flowGroupName/${encodeURIComponent(flowGroupName)}`);
    }
    deleteApprovalFlowGroup(flowGroupName, recordDefinitionName) {
        return this.httpClient.delete(`${this.flowConfigurationApi}/${encodeURIComponent(recordDefinitionName)}/flowGroupName/${encodeURIComponent(flowGroupName)}`);
    }
    getCtmPeopleFormFields(bundleId) {
        return this.httpClient.get(`/api/com.bmc.arsys.rx.approval/rx/application/approval/recorddefinition/people/${bundleId}`);
    }
    isFunctionalRole(approver) {
        return approver.includes(RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.functionalRole);
    }
    getFunctionalRoleGuid(approver) {
        // FR[:]AGGADG2BIX85UAQM80BBQM80BBBM9X -> AGGADG2BIX85UAQM80BBQM80BBBM9X
        return approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[1];
    }
    isApproverPeople(approver) {
        // check if approver is a User, returns true for 'U[:]abc'
        return approver.includes(RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.people);
    }
    getApproverUser(approver) {
        // 'U[:]abc' -> abc
        return approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[1];
    }
    isFieldIdentifyingApprover(approver) {
        // checks if string is surrounded by $ e.g. $Display ID$
        return Boolean(approver.match(/\$(.*?)\$/g));
    }
    getFieldIdentifyingApprover(approver) {
        // $Display ID$ -> Display ID
        return trim(approver, '$');
    }
    getLastLabel(approver) {
        // finds approver name from hierarchy format e.g. returns Payroll from COMORGDEPT[:]Calbro Services[:]Human Resources[:]Payroll
        return approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator).pop();
    }
    isCompany(approver) {
        // true when Approver value is prefixed by COM e.g. COM[:]Calbro Services
        return (approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[0] ===
            RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.company);
    }
    isCompanyOrg(approver) {
        // true when Approver value is prefixed by COMORG e.g. COMORG[:]Calbro Services[:]Human Resources
        return (approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[0] ===
            RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.companyOrg);
    }
    isCompanyOrgDept(approver) {
        // true when Approver value is prefixed by COMORGDEPT i.e. value is a department with hierarchy e.g. COMORGDEPT[:]Calbro Services[:]Human Resources[:]Payroll
        return (approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[0] ===
            RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.companyOrgDept);
    }
    isSupportCompany(approver) {
        // true when Approver value is prefixed by SCOM e.g. SCOM[:]Calbro Services
        return (approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[0] ===
            RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.supportCompany);
    }
    isSupportCompanyOrg(approver) {
        // true when Approver value is prefixed by SCOMSORG e.g. SCOMSORG[:]Calbro Services[:]IT Support
        return (approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[0] ===
            RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.supportCompanyOrg);
    }
    isSupportCompanyOrgGroup(approver) {
        // true when Approver value is prefixed by SCOMSORGSGRP e.g. SCOMSORGSGRP[:]Calbro Services[:]IT Support[:]Backoffice Support
        return (approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[0] ===
            RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.supportCompanyOrgGroup);
    }
}
RxApprovalConfigurationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConfigurationService, deps: [{ token: i1.HttpClient }, { token: i2.RxFunctionalRoleDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApprovalConfigurationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConfigurationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConfigurationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxFunctionalRoleDataPageService }]; } });
//# sourceMappingURL=approval-configuration.service.js.map