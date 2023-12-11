export declare const RX_APPROVAL_CONFIGURATION: {
    selfApproval: {
        apForm: {
            name: string;
            fields: {
                formName: number;
                formRequestId: number;
                notesField: number;
                requester: number;
                summary: number;
                field3: number;
                field4: number;
                field5: number;
                field6: number;
                field7: number;
                securityLabels: number;
            };
        };
        mapping: {
            name: string;
            fields: {
                precedence: number;
                qualification: number;
                auditInformation: number;
                recordDefinition: number;
                approvalFlowName: number;
                approvalFlowGuid: number;
                hiddenQualification: number;
                applicationBundleId: number;
            };
        };
        flowList: {
            name: string;
            fields: {
                recordDefinition: number;
                selfApprovalFlowName: number;
                selfApprovalFlowProcessDefinitionGuid: number;
            };
        };
    };
    flowQualificationProperty: string;
    approverQualificationProperty: string;
    noApproverProvided: string;
    signingCriteriaPercentageList: number[];
    approverCriteria: {
        oneMust: number;
        allMust: number;
        percentage: number;
    };
    approverTypes: {
        functionalRole: string;
        fieldIdentifying: string;
        people: string;
        company: string;
        org: string;
        dept: string;
        supportCompany: string;
        supportOrg: string;
        supportGroup: string;
    };
    approverFields: {
        companyField: number;
        organizationField: number;
        departmentField: number;
        supportOrgField: number;
        supportGroupField: number;
        firstName: number;
        lastName: number;
        remedyLoginId: number;
    };
    valueSeparator: string;
    approverSeparator: string;
    levelSeparator: string;
    approverFormatPrefixes: {
        people: string;
        functionalRole: string;
        company: string;
        companyOrg: string;
        companyOrgDept: string;
        supportCompany: string;
        supportCompanyOrg: string;
        supportCompanyOrgGroup: string;
    };
};
