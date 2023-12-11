import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { IAssociationTree } from '@helix/platform/association/api';
import { IRecordDefinition } from '@helix/platform/record/api';
import { JustificationRequirement } from '@helix/platform/shared/api';
import { HttpErrorResponse } from '@angular/common/http';
export interface ISelfApprovalConfiguration {
    id?: string;
    auditText: string;
    precedence: number;
    description: string;
    qualification: string;
    approvalFlowName: string;
    recordDefinition: string;
    approvalMappingRecordDefinition: string;
    approvalFlowProcessDefinitionGUID: string;
}
export interface IFieldResponse {
    [fieldId: number]: string;
}
export interface IAssociationsByDefinitionName {
    [definitionName: string]: IAssociationTree[];
}
export interface IDataParams {
    definitionName: string;
    definitions: IRecordDefinition[];
    association?: IAssociationTree;
    associationsByDefinition?: IAssociationsByDefinitionName;
    parentAssociationExpression?: string;
}
export interface IRecordRegistration {
    justificationRequired: RxSelectOption | JustificationRequirement;
    recordDefinition: string;
    requestIDField: string;
    requestorField: string;
    approverExclusionField: string;
    summaryField: string;
    justificationFieldName?: string;
    notesField?: string;
    permissionsFromSecurityLabels?: number[];
    field3Mapping?: IAdditionalField;
    field4Mapping?: IAdditionalField;
    field5Mapping?: IAdditionalField;
    field6Mapping?: IAdditionalField;
    isNewConfiguration?: boolean;
}
export interface IAdditionalField {
    fieldID: string;
    label: string;
}
export interface IApprovalFlowOutcomeAction {
    guid?: string;
    action: string;
    processName: string;
    statusOutcome: string;
}
export interface IApprovalFlow {
    isOpen?: boolean;
    hasError?: boolean;
    guid?: string;
    flowName: string;
    precedence: number;
    approvers: string;
    applyApproverExclusion: boolean;
    approversDisplayValue?: string;
    isFieldIdentifyingApprover?: boolean;
    qualification: string;
    approverQualification: string;
    formattedQualification: string;
    isLevelUp: boolean;
    levels: number;
    approvalProcessId: string;
    processType: string;
    signingCriteria: number | RxSelectOption;
    signingCriteriaList?: RxSelectOption[];
    approvalOverridePercentage: number | RxSelectOption;
    approvalFlowOutcomeMappingList: IApprovalFlowOutcomeAction[];
}
export interface IApprovalFlowGroup {
    flowGroupOldName?: string;
    isDirty?: boolean;
    flowGroup: string;
    approvalFlowConfigurationList: IApprovalFlow[];
    hasError?: boolean;
}
export interface IApprovalFlowGroupConfigurationResponse {
    approvalFlowGroupConfigurations: IApprovalFlowGroup[];
}
export interface ISelectedApprover {
    value: string;
    displayValue: string;
}
export interface IUserInfo {
    [fieldId: number]: string;
    selected: boolean;
}
export interface IField {
    name: string;
    selected: boolean;
}
export interface IOrgInfo {
    company: string;
    organization?: string;
    supportOrganization?: string;
}
export interface IRole {
    id: string;
    name: string;
    selected: boolean;
}
export interface IAppRoles {
    applicationName: string;
    roles: IRole[];
}
export interface IFlowGroupRequestResponse {
    status: 'Failed' | 'Success';
    error?: HttpErrorResponse;
}
