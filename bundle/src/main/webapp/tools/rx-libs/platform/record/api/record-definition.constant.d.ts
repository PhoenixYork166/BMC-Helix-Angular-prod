export declare enum RecordFieldOption {
    System = "SYSTEM",
    Required = "REQUIRED",
    Optional = "OPTIONAL"
}
export declare const RX_RECORD_DEFINITION: {
    coreFieldIds: {
        displayId: number;
        createdBy: number;
        createdDate: number;
        assignee: number;
        modifiedBy: number;
        modifiedDate: number;
        status: number;
        description: number;
        notifierListening: number;
        id: number;
    };
    specialFieldIds: {
        dataProviderId: number;
    };
    alwaysRequiredNonSystemFieldIds: number[];
    AR_AUDIT_FIELD_IDS: number[];
    AR_MAX_RESERVED_FIELD_ID: number;
    AR_MIN_CUSTOM_FIELD_ID: number;
    AR_CORE_FIELD_IDS: number[];
    keyFieldIds: number[];
    coreFields: ({
        resourceType: string;
        name: string;
        description: any;
        id: number;
        fieldOption: RecordFieldOption;
        maxLength: number;
        defaultValue: any;
        anyUserAllowedToSubmit: boolean;
        allowPermissionsOverlay: boolean;
        allowOtherPropertiesOverlay: boolean;
    } | {
        resourceType: string;
        name: string;
        description: any;
        id: number;
        fieldOption: RecordFieldOption;
        defaultValue: any;
        anyUserAllowedToSubmit: boolean;
        allowPermissionsOverlay: boolean;
        allowOtherPropertiesOverlay: boolean;
        optionNamesById?: undefined;
        displayType?: undefined;
    } | {
        resourceType: string;
        name: string;
        description: any;
        id: number;
        fieldOption: RecordFieldOption;
        optionNamesById: {
            0: string;
            1: string;
            2: string;
            3: string;
            4: string;
        };
        displayType: any;
        defaultValue: number;
        anyUserAllowedToSubmit: boolean;
        allowPermissionsOverlay: boolean;
        allowOtherPropertiesOverlay: boolean;
    } | {
        resourceType: string;
        name: string;
        description: any;
        id: number;
        fieldOption: RecordFieldOption;
        optionNamesById: {
            0: string;
            1: string;
            2?: undefined;
            3?: undefined;
            4?: undefined;
        };
        displayType: any;
        defaultValue: number;
        anyUserAllowedToSubmit: boolean;
        allowPermissionsOverlay: boolean;
        allowOtherPropertiesOverlay: boolean;
    })[];
    sortableCharacterFieldMaxLength: number;
    fieldOptions: {
        system: RecordFieldOption;
        required: RecordFieldOption;
        optional: RecordFieldOption;
    };
    resourceTypes: {
        character: string;
        localizedCharacter: string;
        dateTime: string;
        selection: string;
        integer: string;
        decimal: string;
        real: string;
        timeOnly: string;
        dateOnly: string;
        attachment: string;
        boolean: string;
        recordInstance: string;
        object: string;
        recordInstanceProcessVariable: string;
        localizedFieldInstance: string;
        list: string;
    };
    resourceTypesByFullName: {
        [resourceTypeFullName: string]: string;
    };
    dataTypes: {
        character: {
            displayName: string;
            labelKey: string;
            resourceType: string;
            shortName: string;
        };
        localizedCharacter: {
            displayName: string;
            labelKey: string;
            resourceType: string;
            shortName: string;
        };
        integer: {
            displayName: string;
            labelKey: string;
            resourceType: string;
            shortName: string;
        };
        dateTime: {
            displayName: string;
            labelKey: string;
            resourceType: string;
            shortName: string;
        };
        selection: {
            displayName: string;
            labelKey: string;
            resourceType: string;
            shortName: string;
        };
        decimal: {
            displayName: string;
            labelKey: string;
            resourceType: string;
            shortName: string;
        };
        real: {
            displayName: string;
            labelKey: string;
            resourceType: string;
            shortName: string;
        };
        timeOnly: {
            displayName: string;
            labelKey: string;
            resourceType: string;
            shortName: string;
        };
        dateOnly: {
            displayName: string;
            labelKey: string;
            resourceType: string;
            shortName: string;
        };
        attachment: {
            displayName: string;
            labelKey: string;
            resourceType: string;
            shortName: string;
        };
        boolean: {
            displayName: string;
            labelKey: string;
            resourceType: string;
            shortName: string;
            options: {
                value: string;
                content: string;
            }[];
        };
        recordInstance: {
            displayName: string;
            resourceType: string;
            skipDefaultValue: boolean;
        };
        object: {
            displayName: string;
            resourceType: string;
            skipDefaultValue: boolean;
        };
    };
    recordDefinitionTypes: {
        regular: {
            recordDefinitionType: string;
            displayName: string;
        };
        join: {
            recordDefinitionType: string;
            displayName: string;
        };
        external: {
            recordDefinitionType: string;
            displayName: string;
        };
    };
    externalRecordDefinitionDataSourceTypes: {
        webApi: string;
    };
    externalRecordDefinitionTypes: {
        custom: string;
    };
    passwordFieldIds: number[];
    arCoreFieldIds: number[];
    recordInstanceAttachment: string;
    supportedSystemLocales: {
        recordDefinitionName: string;
        nameFieldId: number;
        codeFieldId: number;
    };
    fieldPermissionTypes: {
        view: string;
        change: string;
    };
    groupIds: {
        assigneeGroup: number;
    };
    securityLabelIds: {
        assigneeGroup: number;
    };
    joinTypes: {
        inner: {
            value: string;
            displayName: string;
        };
        outer: {
            value: string;
            displayName: string;
        };
    };
    joinRecordDefinitionCoreFieldIds: number[];
    sourceRecordTypes: {
        primary: string;
        secondary: string;
    };
    joinRecordDefinitionCoreFields: ({
        resourceType: string;
        name: string;
        description: any;
        id: number;
        fieldOption: RecordFieldOption;
        maxLength: number;
        defaultValue: any;
        anyUserAllowedToSubmit: boolean;
        allowPermissionsOverlay: boolean;
        allowOtherPropertiesOverlay: boolean;
    } & {
        maxLength: number;
        fieldMapping: {
            resourceType: string;
            sourceFieldId: number;
            source: string;
        };
    })[];
    joinFieldMapping: string;
    externalFieldMapping: string;
    externalRecordDefinitionCoreFieldIds: number[];
    validDefinitionNameRegExpString: string;
    validDefinitionNameRegex: RegExp;
    validFullDefinitionName: RegExp;
};
