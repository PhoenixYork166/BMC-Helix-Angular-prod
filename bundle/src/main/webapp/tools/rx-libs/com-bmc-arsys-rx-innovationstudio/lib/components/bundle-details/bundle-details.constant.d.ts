import { BundleDefinitionTab } from './bundle-details.types';
export declare const AX_BUNDLE_DETAILS: {
    standardDefinitionActionNames: {
        new: string;
        copy: string;
        delete: string;
        rename: string;
        revertCustomization: string;
    };
    standardDefinitionActions: {
        [x: string]: {
            labelKey: string;
            id: string;
            disabled: boolean;
            rxId: string;
            icon: string;
        };
    };
    definitionGridColumns: {
        name: {
            title: string;
            fieldId: string;
        };
        scope: {
            title: string;
            fieldId: string;
            visible: boolean;
        };
        customizationPerspective: {
            title: string;
            fieldId: string;
            visible: boolean;
        };
        lastUpdateTime: {
            title: string;
            fieldId: string;
        };
        lastChangedBy: {
            title: string;
            fieldId: string;
        };
        isEnabled: {
            title: string;
            fieldId: string;
        };
    };
    configurationGridColumns: {
        component: {
            title: string;
            fieldId: string;
        };
        componentType: {
            title: string;
            fieldId: string;
        };
        status: {
            title: string;
            fieldId: string;
        };
    };
    tabs: {
        titleKey: string;
        id: BundleDefinitionTab;
    }[];
    errorCodes: {
        packageCreationAlreadyInProgress: number;
    };
    packageExportStatuses: {
        packageCreated: string;
        pendingPackageCreate: string;
        error: string;
    };
    packageDeployStatuses: {
        error: string;
        deployed: string;
    };
    duplicateDataActions: {
        create: {
            value: string;
            displayName: string;
        };
        ignore: {
            value: string;
            displayName: string;
        };
        merge: {
            value: string;
            displayName: string;
        };
        overwrite: {
            value: string;
            displayName: string;
        };
    };
    definitionTypes: {
        association: string;
        document: string;
        event: string;
        eventStatistics: string;
        namedList: string;
        process: string;
        record: string;
        rule: string;
        view: string;
        webApi: string;
    };
};
