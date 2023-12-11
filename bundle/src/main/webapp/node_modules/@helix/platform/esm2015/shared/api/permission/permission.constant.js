const publicPermissionType = 'Public';
const viewComponents = {
    menuItem: 'rx-shell-menu-item',
    menuGroup: 'rx-shell-menu-group'
};
export const RX_PERMISSION = {
    instancesWithPermissions: [
        'record',
        'field',
        'process',
        'config',
        'runtimeconfig',
        'view',
        'externalconfig',
        viewComponents.menuItem,
        viewComponents.menuGroup
    ],
    editorContexts: {
        view: 'view',
        field: 'field',
        record: 'record',
        process: 'process'
    },
    haveOverlayLogic: ['record', 'field'],
    permissionType: {
        role: 'role',
        group: 'group',
        securityLabel: 'securityLabel'
    },
    administratorGroup: 'Administrator',
    fieldPermissions: {
        view: 'VIEW',
        change: 'CHANGE'
    },
    permissionDialogMetadata: {
        field: {
            headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.field',
            actions: [
                {
                    value: 'VIEW',
                    label: 'com.bmc.arsys.rx.client.permission-editor.column.view.label'
                },
                {
                    value: 'CHANGE',
                    label: 'com.bmc.arsys.rx.client.permission-editor.column.change.label'
                }
            ],
            uniqueAction: true,
            filterPermissionGroupIDs: [1, 2, 5, 7, 8, 9] // these are admin group ids, that cannot be restricted in access. Therefore should be filtered
        },
        record: {
            headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.record',
            actions: [],
            defaultPermittedAction: 'VISIBLE',
            uniqueAction: true,
            filterPermissionGroupIDs: [1, 2, 5, 7, 8, 9] // these are admin group ids, that cannot be restricted in access. Therefore should be filtered
        },
        config: {
            headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.config',
            actions: [
                {
                    value: 'VIEW',
                    label: 'com.bmc.arsys.rx.client.permission-editor.column.view.label'
                },
                {
                    value: 'CHANGE',
                    label: 'com.bmc.arsys.rx.client.permission-editor.column.change.label'
                }
            ],
            uniqueAction: true
        },
        externalconfig: {
            headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.config',
            actions: [],
            defaultPermittedAction: 'VIEW',
            uniqueAction: true
        },
        runtimeconfig: {
            headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.config',
            actions: [],
            defaultPermittedAction: 'VISIBLE',
            uniqueAction: true
        },
        process: {
            headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.process',
            actions: [
                {
                    value: 'EXECUTE',
                    label: 'com.bmc.arsys.rx.client.permission-editor.column.execute.label'
                },
                {
                    value: 'READ',
                    label: 'com.bmc.arsys.rx.client.permission-editor.column.read.label'
                }
            ],
            uniqueAction: true
        },
        view: {
            actions: [],
            defaultPermittedAction: 'VISIBLE',
            uniqueAction: true
        },
        viewComponent: {
            actions: [],
            defaultPermission: {
                value: 0,
                name: publicPermissionType,
                type: 'GROUP'
            },
            defaultPermittedAction: 'VISIBLE',
            uniqueAction: true
        }
    },
    publicPermissionType: publicPermissionType,
    viewComponents: viewComponents,
    viewComponentsContext: 'viewComponent',
    permissionScope: {
        all: 'all'
    },
    groupCategoryFieldId: 120,
    groupIdFieldId: 106,
    restrictedGroupCategoryForNonFieldPermissions: {
        dynamic: 1
    },
    restrictedGroupIdForNonFieldPermissions: {
        subAdministratorGroup: 5
    }
};
//# sourceMappingURL=permission.constant.js.map