import { Component, Injector, QueryList, ViewChildren } from '@angular/core';
import { ActiveModalRef, DismissReasons, TreeWrap } from '@bmc-ux/adapt-angular';
import { RxRecordDefinitionCacheService, RxRecordInstanceUtilsService, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RxGlobalCacheService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { RxTreeService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { find, flatten, flow, forEach, get, groupBy, isUndefined, join, map as _map, remove, some, sumBy, take, uniqBy } from 'lodash';
import { forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RX_APPROVAL_CONFIGURATION } from '../approval-configuration.constant';
import { RxApprovalConfigurationService } from '../approval-configuration.service';
import { RxOrganizationDataPageService } from './organization-data-page.service';
import { RxSupportOrganizationDataPageService } from './support-organization-data-page.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/shared/api";
import * as i6 from "@helix/platform/record/api";
import * as i7 from "./organization-data-page.service";
import * as i8 from "./support-organization-data-page.service";
import * as i9 from "../approval-configuration.service";
import * as i10 from "@helix/platform/shared/components";
import * as i11 from "@angular/common";
import * as i12 from "@angular/forms";
export class FlowApproversSelectorComponent extends RxModalClass {
    constructor(rxTreeService, activeModalRef, rxModalService, translateService, rxGlobalCacheService, rxRecordInstanceUtilsService, rxOrganizationDataPageService, rxSupportOrganizationDataPageService, rxApprovalConfigurationService, rxRecordDefinitionCacheService, rxRecordInstanceDataPageService, injector) {
        super(activeModalRef, injector);
        this.rxTreeService = rxTreeService;
        this.activeModalRef = activeModalRef;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
        this.rxOrganizationDataPageService = rxOrganizationDataPageService;
        this.rxSupportOrganizationDataPageService = rxSupportOrganizationDataPageService;
        this.rxApprovalConfigurationService = rxApprovalConfigurationService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.injector = injector;
        this.approverTypes = [];
        this.selectedApproverSelection = [];
        this.selectedApprovers = [];
        this.selectedCompanies = [];
        this.selectedOrganizations = [];
        this.selectedDepartments = [];
        this.selectedSupportCompanies = [];
        this.selectedSupportOrganizations = [];
        this.selectedSupportGroups = [];
        this.loadingMore = false;
        this.pageSize = 50;
        this.loadedUsers = [];
        this.showLoadMoreButton = true;
        this.treeWrap = TreeWrap.WrapAll;
        this.availableFields = [];
        this.availableFunctionRolesByApplication = [];
        this.shouldShowTree = true;
        this.separatorArrow = ' > ';
        this.companyLoaderFunc = this.companyLoader.bind(this);
        this.organizationLoaderFunc = this.organizationLoader.bind(this);
        this.departmentLoaderFunc = this.departmentLoader.bind(this);
        this.supportOrganizationLoaderFunc = this.supportOrganizationLoader.bind(this);
        this.supportGroupLoaderFunc = this.supportGroupLoader.bind(this);
    }
    isDirty() {
        return this.hasUserInteracted;
    }
    ngOnInit() {
        super.ngOnInit();
        this.loadUsers();
        this.loadFunctionalRoles();
        this.loadFieldIdentifyingApproversApprovers();
        this.approverTypes = [
            {
                value: RX_APPROVAL_CONFIGURATION.approverTypes.company,
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.company.label'),
                disabled: this.activeModalRef.getData().isFieldIdentifyingApprover
            },
            {
                value: RX_APPROVAL_CONFIGURATION.approverTypes.fieldIdentifying,
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.field.identifying')
            },
            {
                value: RX_APPROVAL_CONFIGURATION.approverTypes.functionalRole,
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.functional.roles'),
                disabled: this.activeModalRef.getData().isFieldIdentifyingApprover
            },
            {
                value: RX_APPROVAL_CONFIGURATION.approverTypes.people,
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.people.label'),
                disabled: this.activeModalRef.getData().isFieldIdentifyingApprover
            },
            {
                value: RX_APPROVAL_CONFIGURATION.approverTypes.supportCompany,
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.support-company.label'),
                disabled: this.activeModalRef.getData().isFieldIdentifyingApprover
            }
        ];
        this.invalidMsg = this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.field.identifying.warning');
        this.approverType = [
            find(this.approverTypes, {
                value: this.activeModalRef.getData().isFieldIdentifyingApprover
                    ? RX_APPROVAL_CONFIGURATION.approverTypes.fieldIdentifying
                    : RX_APPROVAL_CONFIGURATION.approverTypes.functionalRole
            })
        ];
    }
    switchApproversTree() {
        this.selectedCompanies = [];
        this.selectedOrganizations = [];
        this.selectedDepartments = [];
        this.selectedSupportCompanies = [];
        this.selectedSupportOrganizations = [];
        this.selectedSupportGroups = [];
        this.availableFunctionRolesByApplication.forEach((application) => {
            application.roles.map((role) => (role.selected = false));
        });
        this.loadedUsers.map((user) => (user.selected = false));
        this.availableFields.map((field) => (field.selected = false));
    }
    companyLoader(startIndex, pageSize, searchQuery) {
        const queryParams = {
            startIndex: startIndex,
            pageSize: pageSize,
            recorddefinition: 'COM:Company',
            propertySelection: [RX_APPROVAL_CONFIGURATION.approverFields.companyField]
        };
        if (searchQuery) {
            queryParams.queryExpression = this.getAdditionalQueryExpression(searchQuery, RX_APPROVAL_CONFIGURATION.approverFields.companyField);
        }
        return this.rxRecordInstanceDataPageService
            .post({
            params: Object.assign({ startIndex, pageSize }, queryParams)
        })
            .pipe(map((companyList) => ({
            totalSize: companyList.totalSize,
            options: companyList.data.map((item) => ({
                displayValue: item[RX_APPROVAL_CONFIGURATION.approverFields.companyField],
                value: this.getCompanyDataFormat(item[RX_APPROVAL_CONFIGURATION.approverFields.companyField])
            }))
        })));
    }
    getCompanyDataFormat(companyName) {
        return `${RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.company}${RX_APPROVAL_CONFIGURATION.levelSeparator}${companyName}`;
    }
    onToggleDropdown(isOpen) {
        if (!isOpen) {
            this.resetLoadedOptions();
        }
    }
    resetLoadedOptions() {
        this.paginationComponents
            .toArray()
            .forEach((component) => component.resetLoadedOptions());
    }
    organizationLoader(startIndex, pageSize, searchQuery) {
        const queryParams = {
            startIndex: startIndex,
            pageSize: pageSize
        };
        if (searchQuery) {
            queryParams.organization = searchQuery;
        }
        else {
            queryParams.queryExpression = this.getDefaultSearchExpression();
        }
        if (this.selectedCompanies.length === 1) {
            queryParams.company = this.selectedCompanies[0].displayValue;
        }
        return this.rxOrganizationDataPageService
            .get({
            params: Object.assign({ startIndex, pageSize }, queryParams)
        })
            .pipe(map((response) => ({
            totalSize: response.totalSize,
            options: response.data.map((item) => ({
                displayValue: item.organization,
                value: item.company
            }))
        })));
    }
    departmentLoader(startIndex, pageSize, searchQuery) {
        const queryParams = {
            recorddefinition: 'CTM:People Organization',
            propertySelection: [
                RX_APPROVAL_CONFIGURATION.approverFields.companyField,
                RX_APPROVAL_CONFIGURATION.approverFields.organizationField,
                RX_APPROVAL_CONFIGURATION.approverFields.departmentField
            ]
        };
        const queryList = [];
        if (searchQuery) {
            queryList.push(this.getAdditionalQueryExpression(searchQuery, RX_APPROVAL_CONFIGURATION.approverFields.departmentField));
        }
        if (this.selectedCompanies.length === 1) {
            queryList.push(this.getAdditionalQueryExpression(this.selectedCompanies[0].displayValue, RX_APPROVAL_CONFIGURATION.approverFields.companyField, true));
        }
        if (this.selectedOrganizations.length === 1) {
            queryList.push(this.getAdditionalQueryExpression(this.selectedOrganizations[0].displayValue, RX_APPROVAL_CONFIGURATION.approverFields.organizationField, true));
        }
        queryParams.queryExpression = queryList.join(' AND ');
        return this.rxRecordInstanceDataPageService
            .post({
            params: Object.assign({ startIndex, pageSize }, queryParams)
        })
            .pipe(map((response) => ({
            totalSize: response.totalSize,
            options: response.data.map((item) => ({
                displayValue: item[RX_APPROVAL_CONFIGURATION.approverFields.departmentField],
                value: item[RX_APPROVAL_CONFIGURATION.approverFields.companyField],
                organization: item[RX_APPROVAL_CONFIGURATION.approverFields.organizationField]
            }))
        })));
    }
    supportOrganizationLoader(startIndex, pageSize, searchQuery) {
        const queryParams = {
            startIndex: startIndex,
            pageSize: pageSize
        };
        if (searchQuery) {
            queryParams.supportOrganization = searchQuery;
        }
        else {
            queryParams.queryExpression = this.getDefaultSearchExpression();
        }
        if (this.selectedSupportCompanies.length === 1) {
            queryParams.company = this.selectedSupportCompanies[0].displayValue;
        }
        return this.rxSupportOrganizationDataPageService
            .get({
            params: Object.assign({ startIndex, pageSize }, queryParams)
        })
            .pipe(map((response) => ({
            totalSize: response.totalSize,
            options: response.data.map((item) => ({
                displayValue: item.supportOrganization,
                value: item.company
            }))
        })));
    }
    supportGroupLoader(startIndex, pageSize, searchQuery) {
        const queryParams = {
            recorddefinition: 'CTM:Support Group',
            propertySelection: [
                RX_APPROVAL_CONFIGURATION.approverFields.companyField,
                RX_APPROVAL_CONFIGURATION.approverFields.supportOrgField,
                RX_APPROVAL_CONFIGURATION.approverFields.supportGroupField
            ]
        };
        const queryList = [];
        if (searchQuery) {
            queryList.push(this.getAdditionalQueryExpression(searchQuery, RX_APPROVAL_CONFIGURATION.approverFields.supportGroupField));
        }
        if (this.selectedSupportCompanies.length === 1) {
            queryList.push(this.getAdditionalQueryExpression(this.selectedSupportCompanies[0].displayValue, RX_APPROVAL_CONFIGURATION.approverFields.companyField, true));
        }
        if (this.selectedSupportOrganizations.length === 1) {
            queryList.push(this.getAdditionalQueryExpression(this.selectedSupportOrganizations[0].displayValue, RX_APPROVAL_CONFIGURATION.approverFields.supportOrgField, true));
        }
        queryParams.queryExpression = queryList.join(' AND ');
        return this.rxRecordInstanceDataPageService
            .post({
            params: Object.assign({ startIndex, pageSize }, queryParams)
        })
            .pipe(map((response) => ({
            totalSize: response.totalSize,
            options: response.data.map((item) => ({
                displayValue: item[RX_APPROVAL_CONFIGURATION.approverFields.supportGroupField],
                value: item[RX_APPROVAL_CONFIGURATION.approverFields.companyField],
                organization: item[RX_APPROVAL_CONFIGURATION.approverFields.supportOrgField]
            }))
        })));
    }
    getAdditionalQueryExpression(searchQuery, fieldId, isEqualitySearch) {
        return isEqualitySearch
            ? `('${fieldId}' = "${searchQuery.replace(/"/g, '""')}")`
            : `('${fieldId}' LIKE "%${this.rxRecordInstanceUtilsService.escapeTextWildcards(searchQuery)}%")`;
    }
    loadUsers(inputEvent) {
        const queryParams = {
            recorddefinition: 'CTM:People',
            propertySelection: [
                RX_APPROVAL_CONFIGURATION.approverFields.firstName,
                RX_APPROVAL_CONFIGURATION.approverFields.lastName,
                RX_APPROVAL_CONFIGURATION.approverFields.remedyLoginId
            ],
            sortBy: RX_APPROVAL_CONFIGURATION.approverFields.firstName
        };
        this.startIndex = !isUndefined(this.startIndex) ? this.startIndex + this.pageSize : 0;
        this.loadingMore = true;
        if (!isUndefined(inputEvent)) {
            this.startIndex = 0;
            this.loadedUsers = [];
        }
        if (this.userSearchTextInput) {
            queryParams.queryExpression = this.getUserQueryExpression();
        }
        this.rxRecordInstanceDataPageService
            .post({
            params: Object.assign({ pageSize: this.pageSize, startIndex: this.startIndex }, queryParams)
        })
            .subscribe((response) => {
            this.loadedUsers = this.loadedUsers.concat(response.data);
            this.showLoadMoreButton = response.totalSize > this.loadedUsers.length;
            this.loadingMore = false;
        });
    }
    getUserQueryExpression() {
        return this.userSearchTextInput
            ? `('${RX_APPROVAL_CONFIGURATION.approverFields.firstName}' LIKE "%${this.rxRecordInstanceUtilsService.escapeTextWildcards(this.userSearchTextInput)}%") OR ('${RX_APPROVAL_CONFIGURATION.approverFields.lastName}' LIKE "%${this.rxRecordInstanceUtilsService.escapeTextWildcards(this.userSearchTextInput)}%") OR ('${RX_APPROVAL_CONFIGURATION.approverFields.remedyLoginId}' LIKE "%${this.rxRecordInstanceUtilsService.escapeTextWildcards(this.userSearchTextInput)}%")`
            : null;
    }
    loadFunctionalRoles() {
        forkJoin([
            this.rxApprovalConfigurationService.getFunctionalRoles(),
            this.rxGlobalCacheService.getBundleDescriptors()
        ])
            .pipe(tap(([functionalRoles, bundleDescriptors]) => {
            const globalLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.global-items.label');
            this.addExistingApproversToSelectedTree(functionalRoles);
            this.availableFunctionRolesByApplication = flow((roles) => _map(roles, (role) => {
                const bundleDescriptor = find(bundleDescriptors, { id: role.applicationName });
                return Object.assign(Object.assign({}, role), { applicationName: (bundleDescriptor === null || bundleDescriptor === void 0 ? void 0 : bundleDescriptor.friendlyName) || (bundleDescriptor === null || bundleDescriptor === void 0 ? void 0 : bundleDescriptor.id) || globalLabel });
            }), (roles) => groupBy(roles, 'applicationName'), (rolesByApplicationName) => _map(rolesByApplicationName, (roles, applicationName) => ({
                applicationName,
                roles: _map(roles, (role) => ({
                    id: role.id,
                    name: role.name,
                    selected: false
                })).sort((a, b) => a.name.localeCompare(b.name))
            })).sort((a, b) => a.applicationName.localeCompare(b.applicationName)))(functionalRoles);
        }))
            .subscribe();
    }
    removeApproversFromSelection() {
        this.hasUserInteracted = true;
        forEach(this.selectedApprovers, (node) => {
            remove(node.children, (childNode) => this.tree.first.isSelected(childNode));
        });
        this.selectedApprovers = this.selectedApprovers.filter((node) => node.children.length);
        this.selectedApproverSelection = [];
        this.reloadTree();
    }
    getNode(label, key, data) {
        return {
            label,
            key,
            data
        };
    }
    getFunctionalRoleDataFormat(guid) {
        return `${RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.functionalRole}${guid}`;
    }
    transformFunctionRolesToNodeStructure() {
        const roles = [];
        this.availableFunctionRolesByApplication.forEach((application) => application.roles
            .filter((role) => role.selected)
            .forEach((selectedRole) => roles.push(this.getNode(`${selectedRole.name}`, `${selectedRole.id}`, this.getFunctionalRoleDataFormat(selectedRole.id)))));
        return roles;
    }
    transformFieldsToNodeStructure() {
        return this.availableFields
            .filter((field) => field.selected)
            .map((selectedField) => this.getNode(`${selectedField.name}`, `${selectedField.name}`, `$${selectedField.name}$`));
    }
    getPeopleDataFormat(userId) {
        return `${RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.people}${userId}`;
    }
    transformPeopleToNodeStructure() {
        return this.loadedUsers
            .filter((user) => user.selected)
            .map((selectedUser) => this.getNode(`${selectedUser[RX_APPROVAL_CONFIGURATION.approverFields.firstName]} ${selectedUser[RX_APPROVAL_CONFIGURATION.approverFields.lastName]}`, `${selectedUser[4]}`, this.getPeopleDataFormat(selectedUser[RX_APPROVAL_CONFIGURATION.approverFields.remedyLoginId])));
    }
    getOrgDataFormat(company, org) {
        return `${RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.companyOrg}${RX_APPROVAL_CONFIGURATION.levelSeparator}${company}${RX_APPROVAL_CONFIGURATION.levelSeparator}${org}`;
    }
    getDeptDataFormat(company, org, dept) {
        return `${RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.companyOrgDept}${RX_APPROVAL_CONFIGURATION.levelSeparator}${company}${RX_APPROVAL_CONFIGURATION.levelSeparator}${org}${RX_APPROVAL_CONFIGURATION.levelSeparator}${dept}`;
    }
    getSupportOrgDataFormat(supportCompany, supportOrg) {
        return `${RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.supportCompanyOrg}${RX_APPROVAL_CONFIGURATION.levelSeparator}${supportCompany}${RX_APPROVAL_CONFIGURATION.levelSeparator}${supportOrg}`;
    }
    getSupportGroupDataFormat(supportCompany, supportOrg, supportGroup) {
        return `${RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.supportCompanyOrgGroup}${RX_APPROVAL_CONFIGURATION.levelSeparator}${supportCompany}${RX_APPROVAL_CONFIGURATION.levelSeparator}${supportOrg}${RX_APPROVAL_CONFIGURATION.levelSeparator}${supportGroup}`;
    }
    transformToNodeStructure(selectedItems) {
        return selectedItems.map((option) => {
            let data = '';
            let label = `${option.displayValue} `;
            if (this.shouldMoveCompanies()) {
                data = option.value;
            }
            else if (this.shouldMoveOrganizations()) {
                data = this.getOrgDataFormat(option.value, option.displayValue);
                label += `(${option.value})`;
            }
            else if (this.shouldMoveDepartments()) {
                data = this.getDeptDataFormat(option.value, option.organization, option.displayValue);
                label += `(${option.value}${this.separatorArrow}${option.organization})`;
            }
            else if (this.shouldMoveSupportCompanies()) {
                data = `${RX_APPROVAL_CONFIGURATION.approverFormatPrefixes.supportCompany}${RX_APPROVAL_CONFIGURATION.levelSeparator}${option.displayValue}`;
            }
            else if (this.shouldMoveSupportOrganizations()) {
                data = this.getSupportOrgDataFormat(option.value, option.displayValue);
                label += `(${option.value})`;
            }
            else if (this.shouldMoveSupportGroups()) {
                data = this.getSupportGroupDataFormat(option.value, option.organization, option.displayValue);
                label += `(${option.value}${this.separatorArrow}${option.organization})`;
            }
            return this.getNode(label, option.displayValue, data);
        });
    }
    onCompanySelectionChange() {
        this.selectedOrganizations = [];
        this.selectedDepartments = [];
    }
    onOrganizationSelectionChange() {
        this.selectedDepartments = [];
    }
    onSupportCompanySelectionChange() {
        this.selectedSupportOrganizations = [];
        this.selectedSupportGroups = [];
    }
    onSupportOrganizationSelectionChange() {
        this.selectedSupportGroups = [];
    }
    shouldMoveCompanies() {
        return this.selectedCompanies.length && !this.selectedOrganizations.length && !this.selectedDepartments.length;
    }
    shouldMoveOrganizations() {
        return this.selectedOrganizations.length && this.selectedCompanies.length <= 1 && !this.selectedDepartments.length;
    }
    shouldMoveDepartments() {
        return (this.selectedDepartments.length && this.selectedCompanies.length <= 1 && this.selectedOrganizations.length <= 1);
    }
    shouldMoveSupportCompanies() {
        return (this.selectedSupportCompanies.length &&
            !this.selectedSupportOrganizations.length &&
            !this.selectedSupportGroups.length);
    }
    shouldMoveSupportOrganizations() {
        return (this.selectedSupportOrganizations.length &&
            this.selectedSupportCompanies.length <= 1 &&
            !this.selectedSupportGroups.length);
    }
    shouldMoveSupportGroups() {
        return (this.selectedSupportGroups.length &&
            this.selectedSupportCompanies.length <= 1 &&
            this.selectedSupportOrganizations.length <= 1);
    }
    setFieldIdentifyingApprovers() {
        this.selectedApprovers = [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.field.identifying'),
                type: RX_APPROVAL_CONFIGURATION.approverTypes.fieldIdentifying,
                children: this.transformFieldsToNodeStructure(),
                expanded: true
            }
        ];
    }
    moveToSelectedApprovers() {
        let approverTypeNode = find(this.selectedApprovers, { type: this.approverType[0].value });
        if (this.isFieldIdentifyingSelection()) {
            if (this.selectedApprovers.length &&
                !find(this.selectedApprovers, { type: RX_APPROVAL_CONFIGURATION.approverTypes.fieldIdentifying })) {
                this.rxModalService
                    .confirm({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: RX_MODAL.modalStyles.warning,
                    message: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.field-identifying-select.warning')
                })
                    .then((result) => {
                    if (result) {
                        this.setFieldIdentifyingApprovers();
                    }
                });
            }
            else {
                this.setFieldIdentifyingApprovers();
            }
        }
        else if (this.isFunctionalRoleSelection()) {
            if (!approverTypeNode) {
                this.selectedApprovers.push({
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.functional.roles'),
                    type: RX_APPROVAL_CONFIGURATION.approverTypes.functionalRole,
                    children: this.transformFunctionRolesToNodeStructure(),
                    expanded: true
                });
            }
            else {
                approverTypeNode.children.push(...this.transformFunctionRolesToNodeStructure());
            }
        }
        else if (this.isPeopleSelection()) {
            if (!approverTypeNode) {
                this.selectedApprovers.push({
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.people.label'),
                    type: RX_APPROVAL_CONFIGURATION.approverTypes.people,
                    children: this.transformPeopleToNodeStructure(),
                    expanded: true
                });
            }
            else {
                approverTypeNode.children.push(...this.transformPeopleToNodeStructure());
            }
        }
        else if (this.isCompanySelection()) {
            if (this.shouldMoveCompanies()) {
                if (!approverTypeNode) {
                    this.selectedApprovers.push({
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.company.label'),
                        type: RX_APPROVAL_CONFIGURATION.approverTypes.company,
                        children: this.transformToNodeStructure(this.selectedCompanies),
                        expanded: true
                    });
                }
                else {
                    approverTypeNode.children.push(...this.transformToNodeStructure(this.selectedCompanies));
                }
            }
            else if (this.shouldMoveOrganizations()) {
                approverTypeNode = find(this.selectedApprovers, { type: RX_APPROVAL_CONFIGURATION.approverTypes.org });
                if (!approverTypeNode) {
                    this.selectedApprovers.push({
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.organization.label'),
                        type: RX_APPROVAL_CONFIGURATION.approverTypes.org,
                        children: this.transformToNodeStructure(this.selectedOrganizations),
                        expanded: true
                    });
                }
                else {
                    approverTypeNode.children.push(...this.transformToNodeStructure(this.selectedOrganizations));
                }
            }
            else if (this.shouldMoveDepartments()) {
                approverTypeNode = find(this.selectedApprovers, {
                    type: RX_APPROVAL_CONFIGURATION.approverTypes.dept
                });
                if (!approverTypeNode) {
                    this.selectedApprovers.push({
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.department.label'),
                        type: RX_APPROVAL_CONFIGURATION.approverTypes.dept,
                        children: this.transformToNodeStructure(this.selectedDepartments),
                        expanded: true
                    });
                }
                else {
                    approverTypeNode.children.push(...this.transformToNodeStructure(this.selectedDepartments));
                }
            }
        }
        else if (this.isSupportCompanySelection()) {
            if (this.shouldMoveSupportCompanies()) {
                approverTypeNode = find(this.selectedApprovers, {
                    type: RX_APPROVAL_CONFIGURATION.approverTypes.company
                });
                if (!approverTypeNode) {
                    this.selectedApprovers.push({
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.company.label'),
                        type: RX_APPROVAL_CONFIGURATION.approverTypes.company,
                        children: this.transformToNodeStructure(this.selectedSupportCompanies),
                        expanded: true
                    });
                }
                else {
                    approverTypeNode.children.push(...this.transformToNodeStructure(this.selectedSupportCompanies));
                }
            }
            else if (this.shouldMoveSupportOrganizations()) {
                approverTypeNode = find(this.selectedApprovers, { type: RX_APPROVAL_CONFIGURATION.approverTypes.supportOrg });
                if (!approverTypeNode) {
                    this.selectedApprovers.push({
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.support-org.label'),
                        type: RX_APPROVAL_CONFIGURATION.approverTypes.supportOrg,
                        children: this.transformToNodeStructure(this.selectedSupportOrganizations),
                        expanded: true
                    });
                }
                else {
                    approverTypeNode.children.push(...this.transformToNodeStructure(this.selectedSupportOrganizations));
                }
            }
            else if (this.shouldMoveSupportGroups()) {
                approverTypeNode = find(this.selectedApprovers, { type: RX_APPROVAL_CONFIGURATION.approverTypes.supportGroup });
                if (!approverTypeNode) {
                    this.selectedApprovers.push({
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.support-group.label'),
                        type: RX_APPROVAL_CONFIGURATION.approverTypes.supportGroup,
                        children: this.transformToNodeStructure(this.selectedSupportGroups),
                        expanded: true
                    });
                }
                else {
                    approverTypeNode.children.push(...this.transformToNodeStructure(this.selectedSupportGroups));
                }
            }
        }
        if (!this.isFieldIdentifyingSelection()) {
            remove(this.selectedApprovers, { type: RX_APPROVAL_CONFIGURATION.approverTypes.fieldIdentifying });
        }
        if (approverTypeNode) {
            approverTypeNode.expanded = true;
            approverTypeNode.children = uniqBy(approverTypeNode.children, 'key');
        }
        this.selectedApprovers = this.selectedApprovers
            .filter((approverNode) => approverNode.children.length)
            .map((node) => {
            node.children.sort((a, b) => a.label.localeCompare(b.label));
            return node;
        });
        this.hasUserInteracted = true;
        this.reloadTree();
    }
    reloadTree() {
        this.shouldShowTree = false;
        setTimeout(() => (this.shouldShowTree = true));
    }
    loadFieldIdentifyingApproversApprovers() {
        this.rxRecordDefinitionCacheService
            .getRecordDefinition(this.activeModalRef.getData().registeredRecordDefinitionName)
            .subscribe((fieldIdentifyingResponse) => (this.availableFields = fieldIdentifyingResponse.fieldDefinitions
            .map((field) => ({
            name: field.name,
            selected: false
        }))
            .sort((a, b) => a.name.localeCompare(b.name))));
    }
    noApproverSelected() {
        return ((this.isFieldIdentifyingSelection() && !some(this.availableFields, (field) => field.selected)) ||
            (this.isPeopleSelection() && !some(this.loadedUsers, (user) => user.selected)) ||
            (this.isFunctionalRoleSelection() &&
                !some(this.availableFunctionRolesByApplication, (application) => some(application.roles, (role) => role.selected))) ||
            Boolean(this.isCompanySelection() &&
                !this.selectedCompanies.length &&
                !this.selectedOrganizations.length &&
                !this.selectedDepartments.length));
    }
    isInvalidFieIdentifyingApprover() {
        return this.isFieldIdentifyingSelection() && sumBy(this.availableFields, 'selected') > 1;
    }
    optionFormatter(option) {
        return option.displayValue;
    }
    isFieldIdentifyingSelection() {
        return this.approverType[0].value === RX_APPROVAL_CONFIGURATION.approverTypes.fieldIdentifying;
    }
    isCompanySelection() {
        return this.approverType[0].value === RX_APPROVAL_CONFIGURATION.approverTypes.company;
    }
    isSupportCompanySelection() {
        return this.approverType[0].value === RX_APPROVAL_CONFIGURATION.approverTypes.supportCompany;
    }
    isPeopleSelection() {
        return this.approverType[0].value === RX_APPROVAL_CONFIGURATION.approverTypes.people;
    }
    isFunctionalRoleSelection() {
        return this.approverType[0].value === RX_APPROVAL_CONFIGURATION.approverTypes.functionalRole;
    }
    completeSelection() {
        const approvers = flow((allNodes) => _map(allNodes, 'children'), flatten, (nodes) => _map(nodes, (node) => {
            let label = '';
            if (this.rxApprovalConfigurationService.isCompanyOrg(node.data) ||
                this.rxApprovalConfigurationService.isCompanyOrgDept(node.data) ||
                this.rxApprovalConfigurationService.isSupportCompanyOrg(node.data) ||
                this.rxApprovalConfigurationService.isSupportCompanyOrgGroup(node.data)) {
                label = this.rxApprovalConfigurationService.getLastLabel(node.data);
            }
            return {
                value: node.data,
                displayValue: label || node.label
            };
        }))(this.selectedApprovers);
        const approver = {
            value: approvers.map((node) => node.value).join(RX_APPROVAL_CONFIGURATION.approverSeparator),
            displayValue: flow((items) => take(items, 10), (items) => _map(items, 'displayValue'), (items) => join(items, ', '))(approvers)
        };
        if (approvers.length > 10) {
            approver.displayValue += '...';
        }
        this.activeModalRef.close(approver);
    }
    getEmptyApproverTree() {
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.functional.roles'),
                type: RX_APPROVAL_CONFIGURATION.approverTypes.functionalRole,
                children: []
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.people.label'),
                type: RX_APPROVAL_CONFIGURATION.approverTypes.people,
                children: []
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.company.label'),
                type: RX_APPROVAL_CONFIGURATION.approverTypes.company,
                children: []
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.organization.label'),
                type: RX_APPROVAL_CONFIGURATION.approverTypes.org,
                children: []
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.department.label'),
                type: RX_APPROVAL_CONFIGURATION.approverTypes.dept,
                children: []
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.support-company.label'),
                type: RX_APPROVAL_CONFIGURATION.approverTypes.supportCompany,
                children: []
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.support-group.label'),
                type: RX_APPROVAL_CONFIGURATION.approverTypes.supportGroup,
                children: []
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.support-org.label'),
                type: RX_APPROVAL_CONFIGURATION.approverTypes.supportOrg,
                children: []
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.field.identifying'),
                type: RX_APPROVAL_CONFIGURATION.approverTypes.fieldIdentifying,
                children: []
            }
        ];
    }
    addExistingApproversToSelectedTree(allFunctionalRoles) {
        this.selectedApprovers = this.getEmptyApproverTree();
        const approverList = this.activeModalRef
            .getData()
            .existingApprovers.split(RX_APPROVAL_CONFIGURATION.approverSeparator);
        forEach(approverList, (approver) => {
            if (this.rxApprovalConfigurationService.isFieldIdentifyingApprover(approver)) {
                this.approverType = [
                    find(this.approverTypes, {
                        value: RX_APPROVAL_CONFIGURATION.approverTypes.fieldIdentifying
                    })
                ];
                this.selectedApprovers = [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.field.identifying'),
                        type: RX_APPROVAL_CONFIGURATION.approverTypes.fieldIdentifying,
                        children: [
                            {
                                label: this.rxApprovalConfigurationService.getFieldIdentifyingApprover(approver),
                                key: this.rxApprovalConfigurationService.getFieldIdentifyingApprover(approver),
                                data: `$${this.rxApprovalConfigurationService.getFieldIdentifyingApprover(approver)}$`
                            }
                        ],
                        expanded: true
                    }
                ];
            }
            else if (this.rxApprovalConfigurationService.isFunctionalRole(approver)) {
                find(this.selectedApprovers, { type: RX_APPROVAL_CONFIGURATION.approverTypes.functionalRole }).children.push({
                    key: this.rxApprovalConfigurationService.getFunctionalRoleGuid(approver),
                    data: this.getFunctionalRoleDataFormat(this.rxApprovalConfigurationService.getFunctionalRoleGuid(approver)),
                    label: get(find(allFunctionalRoles, {
                        id: this.rxApprovalConfigurationService.getFunctionalRoleGuid(approver)
                    }), 'name')
                });
            }
            else if (this.rxApprovalConfigurationService.isApproverPeople(approver)) {
                find(this.selectedApprovers, { type: RX_APPROVAL_CONFIGURATION.approverTypes.people }).children.push({
                    key: approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[1],
                    label: approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[1],
                    data: this.getPeopleDataFormat(approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[1])
                });
            }
            else if (this.rxApprovalConfigurationService.isCompany(approver) ||
                this.rxApprovalConfigurationService.isSupportCompany(approver)) {
                find(this.selectedApprovers, { type: RX_APPROVAL_CONFIGURATION.approverTypes.company }).children.push({
                    label: this.rxApprovalConfigurationService.getLastLabel(approver),
                    key: `${this.rxApprovalConfigurationService.getLastLabel(approver)}`,
                    data: this.getCompanyDataFormat(this.rxApprovalConfigurationService.getLastLabel(approver))
                });
            }
            else if (this.rxApprovalConfigurationService.isCompanyOrg(approver)) {
                find(this.selectedApprovers, { type: RX_APPROVAL_CONFIGURATION.approverTypes.org }).children.push({
                    label: `${this.rxApprovalConfigurationService.getLastLabel(approver)}${this.getHierarchyLabel(approver)}`,
                    key: `${this.rxApprovalConfigurationService.getLastLabel(approver)}`,
                    data: this.getOrgDataFormat(approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[1], approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[2])
                });
            }
            else if (this.rxApprovalConfigurationService.isCompanyOrgDept(approver)) {
                find(this.selectedApprovers, { type: RX_APPROVAL_CONFIGURATION.approverTypes.dept }).children.push({
                    label: `${this.rxApprovalConfigurationService.getLastLabel(approver)}${this.getHierarchyLabel(approver)}`,
                    key: `${this.rxApprovalConfigurationService.getLastLabel(approver)}`,
                    data: this.getDeptDataFormat(approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[1], approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[2], approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[3])
                });
            }
            else if (this.rxApprovalConfigurationService.isSupportCompanyOrg(approver)) {
                find(this.selectedApprovers, { type: RX_APPROVAL_CONFIGURATION.approverTypes.supportOrg }).children.push({
                    label: `${this.rxApprovalConfigurationService.getLastLabel(approver)}${this.getHierarchyLabel(approver)}`,
                    key: `${this.rxApprovalConfigurationService.getLastLabel(approver)}`,
                    data: this.getSupportOrgDataFormat(approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[1], approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[2])
                });
            }
            else if (this.rxApprovalConfigurationService.isSupportCompanyOrgGroup(approver)) {
                find(this.selectedApprovers, { type: RX_APPROVAL_CONFIGURATION.approverTypes.supportGroup }).children.push({
                    label: `${this.rxApprovalConfigurationService.getLastLabel(approver)}${this.getHierarchyLabel(approver)}`,
                    key: `${this.rxApprovalConfigurationService.getLastLabel(approver)}`,
                    data: this.getSupportGroupDataFormat(approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[1], approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[2], approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator)[3])
                });
            }
        });
        this.selectedApprovers = this.selectedApprovers
            .filter((node) => node.children.length)
            .map((node) => {
            node.children.sort((a, b) => a.label.localeCompare(b.label));
            return node;
        });
    }
    getHierarchyLabel(approver) {
        const temp = approver.split(RX_APPROVAL_CONFIGURATION.levelSeparator);
        temp.shift();
        temp.pop();
        return `(${temp.join(this.separatorArrow)})`;
    }
    close() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    getDefaultSearchExpression() {
        return `${RX_APPROVAL_CONFIGURATION.approverFields.companyField} != NULL`;
    }
}
FlowApproversSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FlowApproversSelectorComponent, deps: [{ token: i1.RxTreeService }, { token: i2.ActiveModalRef }, { token: i3.RxModalService }, { token: i4.TranslateService }, { token: i5.RxGlobalCacheService }, { token: i6.RxRecordInstanceUtilsService }, { token: i7.RxOrganizationDataPageService }, { token: i8.RxSupportOrganizationDataPageService }, { token: i9.RxApprovalConfigurationService }, { token: i6.RxRecordDefinitionCacheService }, { token: i6.RxRecordInstanceDataPageService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
FlowApproversSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FlowApproversSelectorComponent, selector: "rx-flow-approvers-selector", viewQueries: [{ propertyName: "paginationComponents", predicate: ["paginationComponents"], descendants: true }, { propertyName: "tree", predicate: ["tree"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"approver-modal-body\">\n  <rx-busy-indicator [options]=\"{ busy: busy, loaderType: 'section' }\"></rx-busy-indicator>\n\n  <adapt-alert\n    *ngIf=\"isInvalidFieIdentifyingApprover()\"\n    [config]=\"{\n      variant: 'warning',\n      dismissible: false,\n      content: invalidMsg\n    }\"\n  ></adapt-alert>\n\n  <div class=\"d-flex h-100\">\n    <div class=\"flex-wrapper d-flex flex-column mh-100 wrapper-max-width\">\n      <h5 class=\"mt-1 mb-4\">\n        {{ 'com.bmc.arsys.rx.client.approval.configuration.flow.approvers.available.label' | translate }}\n      </h5>\n\n      <adapt-rx-select\n        class=\"d-block form-group w-75\"\n        rx-id=\"approver-type\"\n        [(ngModel)]=\"approverType\"\n        [options]=\"approverTypes\"\n        (onSelectionChange)=\"switchApproversTree()\"\n        [optionFormatter]=\"optionFormatter\"\n      >\n      </adapt-rx-select>\n\n      <div class=\"flex-fill available-list\">\n        <div *ngIf=\"isCompanySelection()\" class=\"border section-wrapper flex-fill h-100\">\n          <rx-select-with-pagination\n            label=\"{{\n              'com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.company.label' | translate\n            }}\"\n            class=\"form-group d-block\"\n            [(ngModel)]=\"selectedCompanies\"\n            [optionLoader]=\"companyLoaderFunc\"\n            isMultiSelectionMode=\"true\"\n            (selectionChange)=\"onCompanySelectionChange()\"\n          ></rx-select-with-pagination>\n\n          <rx-select-with-pagination\n            label=\"{{\n              'com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.organization.label' | translate\n            }}\"\n            class=\"form-group d-block\"\n            [(ngModel)]=\"selectedOrganizations\"\n            [optionLoader]=\"organizationLoaderFunc\"\n            [template]=\"orgOptionTemplate\"\n            isMultiSelectionMode=\"true\"\n            (selectionChange)=\"onOrganizationSelectionChange()\"\n            #paginationComponents\n            [disabled]=\"selectedCompanies.length > 1\"\n            (toggleDropdown)=\"onToggleDropdown($event)\"\n          ></rx-select-with-pagination>\n\n          <rx-select-with-pagination\n            label=\"{{\n              'com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.department.label' | translate\n            }}\"\n            class=\"form-group d-block\"\n            [(ngModel)]=\"selectedDepartments\"\n            [optionLoader]=\"departmentLoaderFunc\"\n            [template]=\"optionTemplate\"\n            isMultiSelectionMode=\"true\"\n            #paginationComponents\n            [disabled]=\"selectedCompanies.length > 1 || selectedOrganizations.length > 1\"\n            (toggleDropdown)=\"onToggleDropdown($event)\"\n          ></rx-select-with-pagination>\n        </div>\n\n        <div *ngIf=\"isSupportCompanySelection()\" class=\"border section-wrapper flex-fill h-100\">\n          <rx-select-with-pagination\n            label=\"{{\n              'com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.support-company.label' | translate\n            }}\"\n            class=\"form-group d-block\"\n            [(ngModel)]=\"selectedSupportCompanies\"\n            [optionLoader]=\"companyLoaderFunc\"\n            isMultiSelectionMode=\"true\"\n            (selectionChange)=\"onSupportCompanySelectionChange()\"\n          ></rx-select-with-pagination>\n\n          <rx-select-with-pagination\n            label=\"{{\n              'com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.support-org.label' | translate\n            }}\"\n            class=\"form-group d-block\"\n            [(ngModel)]=\"selectedSupportOrganizations\"\n            [optionLoader]=\"supportOrganizationLoaderFunc\"\n            [template]=\"orgOptionTemplate\"\n            isMultiSelectionMode=\"true\"\n            (selectionChange)=\"onSupportOrganizationSelectionChange()\"\n            #paginationComponents\n            [disabled]=\"selectedSupportCompanies.length > 1\"\n            (toggleDropdown)=\"onToggleDropdown($event)\"\n          ></rx-select-with-pagination>\n\n          <rx-select-with-pagination\n            label=\"{{\n              'com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.support-group.label' | translate\n            }}\"\n            class=\"form-group d-block\"\n            [(ngModel)]=\"selectedSupportGroups\"\n            [optionLoader]=\"supportGroupLoaderFunc\"\n            [template]=\"optionTemplate\"\n            isMultiSelectionMode=\"true\"\n            #paginationComponents\n            [disabled]=\"selectedSupportCompanies.length > 1 || selectedSupportOrganizations.length > 1\"\n            (toggleDropdown)=\"onToggleDropdown($event)\"\n          ></rx-select-with-pagination>\n        </div>\n      </div>\n\n      <div\n        class=\"available-list d-flex flex-column flex-fill h-100 border-top functional-roles border\"\n        *ngIf=\"isFunctionalRoleSelection()\"\n      >\n        <adapt-accordion [multiselect]=\"true\">\n          <adapt-accordion-tab\n            *ngFor=\"let application of availableFunctionRolesByApplication\"\n            title=\"{{ application.applicationName }}\"\n            [isOpen]=\"true\"\n          >\n            <adapt-rx-checkbox\n              *ngFor=\"let role of application.roles; let index = index\"\n              label=\"{{ role.name }}\"\n              [(ngModel)]=\"application.roles[index].selected\"\n            ></adapt-rx-checkbox>\n          </adapt-accordion-tab>\n        </adapt-accordion>\n      </div>\n\n      <div class=\"available-list user-list h-100 border section-wrapper\" *ngIf=\"isPeopleSelection()\">\n        <ul class=\"list-unstyled\">\n          <div class=\"border-bottom-0 user-search-wrapper\">\n            <adapt-rx-search\n              [(ngModel)]=\"userSearchTextInput\"\n              placeholder=\"Filter\"\n              [debounceTime]=\"200\"\n              (ngModelChange)=\"loadUsers($event)\"\n            >\n            </adapt-rx-search>\n          </div>\n\n          <li *ngFor=\"let user of loadedUsers; let index = index\">\n            <adapt-rx-checkbox\n              label=\"{{ user[1000000019] + ' ' + user[1000000018] }}\"\n              [(ngModel)]=\"loadedUsers[index].selected\"\n            ></adapt-rx-checkbox>\n          </li>\n\n          <button\n            class=\"py-0\"\n            type=\"button\"\n            adapt-button\n            btn-type=\"tertiary\"\n            rx-id=\"load-more-button\"\n            (click)=\"loadUsers()\"\n            *ngIf=\"showLoadMoreButton && !loadingMore\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.load-more.label' | translate }}\n          </button>\n\n          <div class=\"loader-container\" *ngIf=\"loadingMore\">\n            <div class=\"loader-inline\"></div>\n            <span class=\"ml-2\">{{ 'com.bmc.arsys.rx.client.common.loading-data' | translate }}</span>\n          </div>\n        </ul>\n      </div>\n\n      <div class=\"available-list h-100 border field-identifying section-wrapper\" *ngIf=\"isFieldIdentifyingSelection()\">\n        <ul class=\"list-unstyled\">\n          <li *ngFor=\"let field of availableFields; let index = index\">\n            <adapt-rx-checkbox\n              label=\"{{ field.name }}\"\n              [(ngModel)]=\"availableFields[index].selected\"\n            ></adapt-rx-checkbox>\n          </li>\n        </ul>\n      </div>\n    </div>\n\n    <button\n      type=\"button\"\n      adapt-button\n      class=\"d-icon-right-angle_right form-group move-button\"\n      btn-type=\"secondary\"\n      rx-id=\"move-button\"\n      (click)=\"moveToSelectedApprovers()\"\n      [disabled]=\"isInvalidFieIdentifyingApprover() || noApproverSelected()\"\n    ></button>\n\n    <div class=\"flex-wrapper d-flex flex-column mh-100\">\n      <h5 class=\"mt-1 mb-4\">\n        {{ 'com.bmc.arsys.rx.client.approval.configuration.flow.approvers.selected.label' | translate }}\n      </h5>\n\n      <button\n        type=\"button\"\n        adapt-button\n        class=\"d-icon-left-trash form-group align-self-start\"\n        btn-type=\"secondary\"\n        rx-id=\"remove-button\"\n        (click)=\"removeApproversFromSelection()\"\n        [disabled]=\"!selectedApproverSelection.length\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n      </button>\n\n      <div class=\"card available-list flex-fill\">\n        <div class=\"card-block\">\n          <adapt-tree\n            #tree\n            *ngIf=\"selectedApprovers.length && shouldShowTree\"\n            filter=\"true\"\n            [value]=\"selectedApprovers\"\n            selectionMode=\"checkbox\"\n            [(selection)]=\"selectedApproverSelection\"\n            [wrap]=\"treeWrap\"\n          >\n          </adapt-tree>\n        </div>\n\n        <div class=\"vertical-center\" *ngIf=\"!selectedApprovers.length\">\n          <div class=\"empty-state empty-state--config\"></div>\n          <div class=\"empty-state__label\">\n            {{ 'com.bmc.arsys.rx.client.empty-state.no-items-available.label' | translate }}\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    rx-id=\"save-button\"\n    (click)=\"completeSelection()\"\n    [disabled]=\"!hasUserInteracted\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"close()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n\n<ng-template #optionTemplate let-option>\n  <strong>{{ option.displayValue }}</strong>\n\n  <div class=\"text-secondary\">\n    {{ option.value + separatorArrow + option.organization }}\n  </div>\n</ng-template>\n\n<ng-template #orgOptionTemplate let-option>\n  <strong>{{ option.displayValue }}</strong>\n\n  <div class=\"text-secondary\">\n    {{ option.value }}\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host::ng-deep .checkbox{margin:0}:host::ng-deep .dropdown-item{white-space:normal}.approver-modal-body{padding:15px;height:645px}.available-list{overflow:auto}.section-wrapper{padding:15px}.flex-wrapper{flex-grow:1;flex-basis:0}.vertical-center{position:absolute;margin:auto;top:0;bottom:0;left:20px;right:20px;height:130px}.move-button{margin:325px 20px auto}.wrapper-max-width{max-width:365px}.loader-container{padding:0 16px}.user-search-wrapper{padding-bottom:15px}.user-list li,.field-identifying li{margin-bottom:8px}:host ::ng-deep adapt-rx-checkbox .checkbox__item{white-space:normal;word-break:break-all}:host ::ng-deep .functional-roles .adapt-accordion adapt-accordion-tab:last-child .card{border-bottom:0}:host ::ng-deep .functional-roles .adapt-accordion adapt-accordion-tab .card{border-left:0;border-right:0}\n"], components: [{ type: i3.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i2.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i10.RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: ["label", "required", "isMultiSelectionMode", "optionLoader", "pageSize", "showDefaultTitle", "showUncheckAll", "readonly", "template", "viewToModelValueAdapter", "modelToViewValueAdapter", "optionFormatter"], outputs: ["toggleDropdown", "selectionChange"] }, { type: i2.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i2.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i2.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i2.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }], directives: [{ type: i11.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i12.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i12.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i11.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FlowApproversSelectorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-flow-approvers-selector',
                    templateUrl: './flow-approvers-selector.component.html',
                    styleUrls: ['./flow-approvers-selector.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxTreeService }, { type: i2.ActiveModalRef }, { type: i3.RxModalService }, { type: i4.TranslateService }, { type: i5.RxGlobalCacheService }, { type: i6.RxRecordInstanceUtilsService }, { type: i7.RxOrganizationDataPageService }, { type: i8.RxSupportOrganizationDataPageService }, { type: i9.RxApprovalConfigurationService }, { type: i6.RxRecordDefinitionCacheService }, { type: i6.RxRecordInstanceDataPageService }, { type: i0.Injector }]; }, propDecorators: { paginationComponents: [{
                type: ViewChildren,
                args: ['paginationComponents']
            }], tree: [{
                type: ViewChildren,
                args: ['tree']
            }] } });
//# sourceMappingURL=flow-approvers-selector.component.js.map