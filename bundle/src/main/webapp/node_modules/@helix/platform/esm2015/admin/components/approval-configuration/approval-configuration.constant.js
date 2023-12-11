export const RX_APPROVAL_CONFIGURATION = {
    selfApproval: {
        apForm: {
            name: 'AP:Form',
            fields: {
                formName: 12000,
                formRequestId: 10014,
                notesField: 10009,
                requester: 10015,
                summary: 10002,
                field3: 10004,
                field4: 10005,
                field5: 10006,
                field6: 10007,
                field7: 61001,
                securityLabels: 14850
            }
        },
        mapping: {
            name: 'com.bmc.arsys.rx.approval:SelfApprovalMappingV2',
            fields: {
                precedence: 10004,
                qualification: 10001,
                auditInformation: 12700,
                recordDefinition: 10000,
                approvalFlowName: 10002,
                approvalFlowGuid: 10003,
                hiddenQualification: 10006,
                applicationBundleId: 61001
            }
        },
        flowList: {
            name: 'com.bmc.arsys.rx.approval:SelfApprovalFlowList',
            fields: {
                recordDefinition: 10000,
                selfApprovalFlowName: 10001,
                selfApprovalFlowProcessDefinitionGuid: 10002
            }
        }
    },
    flowQualificationProperty: 'approvalQualification',
    approverQualificationProperty: 'approverQualification',
    noApproverProvided: 'NO_APPROVER_PROVIDED',
    signingCriteriaPercentageList: [50, 60, 70, 80, 90],
    approverCriteria: {
        oneMust: 0,
        allMust: 1,
        percentage: 2
    },
    approverTypes: {
        functionalRole: 'functionalRole',
        fieldIdentifying: 'fieldIdentifying',
        people: 'people',
        company: 'company',
        org: 'org',
        dept: 'dept',
        supportCompany: 'supportCompany',
        supportOrg: 'supportOrg',
        supportGroup: 'supportGroup'
    },
    approverFields: {
        companyField: 1000000001,
        organizationField: 1000000010,
        departmentField: 200000006,
        supportOrgField: 1000000014,
        supportGroupField: 1000000015,
        firstName: 1000000019,
        lastName: 1000000018,
        remedyLoginId: 4
    },
    valueSeparator: '_',
    approverSeparator: ';',
    levelSeparator: '[:]',
    approverFormatPrefixes: {
        people: 'U[:]',
        functionalRole: 'FR[:]',
        company: 'COM',
        companyOrg: 'COMORG',
        companyOrgDept: 'COMORGDEPT',
        supportCompany: 'SCOM',
        supportCompanyOrg: 'SCOMSORG',
        supportCompanyOrgGroup: 'SCOMSORGSGRP'
    }
};
//# sourceMappingURL=approval-configuration.constant.js.map