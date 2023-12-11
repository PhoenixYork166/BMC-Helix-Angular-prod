export declare const RX_PERMISSION: {
    instancesWithPermissions: string[];
    editorContexts: {
        view: string;
        field: string;
        record: string;
        process: string;
    };
    haveOverlayLogic: string[];
    permissionType: {
        role: string;
        group: string;
        securityLabel: string;
    };
    administratorGroup: string;
    fieldPermissions: {
        view: string;
        change: string;
    };
    permissionDialogMetadata: {
        field: {
            headerText: string;
            actions: {
                value: string;
                label: string;
            }[];
            uniqueAction: boolean;
            filterPermissionGroupIDs: number[];
        };
        record: {
            headerText: string;
            actions: any[];
            defaultPermittedAction: string;
            uniqueAction: boolean;
            filterPermissionGroupIDs: number[];
        };
        config: {
            headerText: string;
            actions: {
                value: string;
                label: string;
            }[];
            uniqueAction: boolean;
        };
        externalconfig: {
            headerText: string;
            actions: any[];
            defaultPermittedAction: string;
            uniqueAction: boolean;
        };
        runtimeconfig: {
            headerText: string;
            actions: any[];
            defaultPermittedAction: string;
            uniqueAction: boolean;
        };
        process: {
            headerText: string;
            actions: {
                value: string;
                label: string;
            }[];
            uniqueAction: boolean;
        };
        view: {
            actions: any[];
            defaultPermittedAction: string;
            uniqueAction: boolean;
        };
        viewComponent: {
            actions: any[];
            defaultPermission: {
                value: number;
                name: string;
                type: string;
            };
            defaultPermittedAction: string;
            uniqueAction: boolean;
        };
    };
    publicPermissionType: string;
    viewComponents: {
        menuItem: string;
        menuGroup: string;
    };
    viewComponentsContext: string;
    permissionScope: {
        all: string;
    };
    groupCategoryFieldId: number;
    groupIdFieldId: number;
    restrictedGroupCategoryForNonFieldPermissions: {
        dynamic: number;
    };
    restrictedGroupIdForNonFieldPermissions: {
        subAdministratorGroup: number;
    };
};
