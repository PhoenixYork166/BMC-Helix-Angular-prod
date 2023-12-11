import { BundleDefinitionTab } from './bundle-details.types';
const standardDefinitionActionNames = {
    new: 'new',
    copy: 'copy',
    delete: 'delete',
    rename: 'rename',
    revertCustomization: 'revert-customization'
};
export const AX_BUNDLE_DETAILS = {
    standardDefinitionActionNames,
    standardDefinitionActions: {
        [standardDefinitionActionNames.copy]: {
            labelKey: 'com.bmc.arsys.rx.client.common.copy.label',
            id: standardDefinitionActionNames.copy,
            disabled: true,
            rxId: 'copy-button',
            icon: 'files_copy_o'
        },
        [standardDefinitionActionNames.new]: {
            labelKey: 'com.bmc.arsys.rx.client.common.new.label',
            id: standardDefinitionActionNames.new,
            disabled: true,
            rxId: 'new-button',
            icon: 'plus_circle'
        },
        [standardDefinitionActionNames.delete]: {
            labelKey: 'com.bmc.arsys.rx.client.common.delete.label',
            id: standardDefinitionActionNames.delete,
            disabled: true,
            rxId: 'delete-button',
            icon: 'trash'
        },
        [standardDefinitionActionNames.rename]: {
            labelKey: 'com.bmc.arsys.rx.client.common.rename.label',
            id: standardDefinitionActionNames.rename,
            disabled: true,
            rxId: 'rename-button',
            icon: 'field_text'
        },
        [standardDefinitionActionNames.revertCustomization]: {
            labelKey: 'com.bmc.arsys.rx.innovation-studio.definition-actions.revert-customization.label',
            id: standardDefinitionActionNames.revertCustomization,
            disabled: true,
            rxId: 'revert-button',
            icon: 'undo'
        }
    },
    definitionGridColumns: {
        name: {
            title: 'com.bmc.arsys.rx.client.common.name.label',
            fieldId: 'name'
        },
        scope: {
            title: 'com.bmc.arsys.rx.client.admin.web-api-connections.scope.label',
            fieldId: 'scope',
            visible: false
        },
        customizationPerspective: {
            title: 'com.bmc.arsys.rx.client.admin.cognitive-search.status.label',
            fieldId: 'customizationPerspective',
            visible: false
        },
        lastUpdateTime: {
            title: 'com.bmc.arsys.rx.client.admin.cognitive-training.modified-date.label',
            fieldId: 'lastUpdateTime'
        },
        lastChangedBy: {
            title: 'com.bmc.arsys.rx.client.common.modified-by.label',
            fieldId: 'lastChangedBy'
        },
        isEnabled: {
            title: 'com.bmc.arsys.rx.client.approval.notification-configuration.enabled-field.label',
            fieldId: 'isEnabled'
        }
    },
    configurationGridColumns: {
        component: {
            title: 'com.bmc.arsys.rx.client.common.name.label',
            fieldId: 'component'
        },
        componentType: {
            title: 'com.bmc.arsys.rx.client.common.item-type.label',
            fieldId: 'componentType'
        },
        status: {
            title: 'com.bmc.arsys.rx.client.common.status.label',
            fieldId: 'status'
        }
    },
    tabs: [
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.records.label',
            id: BundleDefinitionTab.Records
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.views.label',
            id: BundleDefinitionTab.Views
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.processes.label',
            id: BundleDefinitionTab.Processes
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.rules.label',
            id: BundleDefinitionTab.Rules
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.associations.label',
            id: BundleDefinitionTab.Associations
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.named-lists.label',
            id: BundleDefinitionTab.NamedLists
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.documents.label',
            id: BundleDefinitionTab.Documents
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.web-apis.label',
            id: BundleDefinitionTab.WebAPIs
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.events.label',
            id: BundleDefinitionTab.Events
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.event-statistics.label',
            id: BundleDefinitionTab.EventStatistics
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.chatbots.label',
            id: BundleDefinitionTab.Chatbots
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.label',
            id: BundleDefinitionTab.Configurations
        }
    ],
    errorCodes: {
        packageCreationAlreadyInProgress: 6117
    },
    packageExportStatuses: {
        packageCreated: 'PackageCreated',
        pendingPackageCreate: 'PendingPackageCreate',
        error: 'Error'
    },
    packageDeployStatuses: {
        error: 'Error',
        deployed: 'Deployed'
    },
    duplicateDataActions: {
        create: {
            value: 'CREATE_NEW_RECORD',
            displayName: 'Create New'
        },
        ignore: {
            value: 'THROW_ERROR',
            displayName: 'Ignore'
        },
        merge: {
            value: 'MERGE',
            displayName: 'Merge'
        },
        overwrite: {
            value: 'REPLACE',
            displayName: 'Overwrite'
        }
    },
    definitionTypes: {
        association: 'ASSOCIATION',
        document: 'DOCUMENT',
        event: 'EVENT',
        eventStatistics: 'EVENT_STATISTICS',
        namedList: 'NAMED_LIST',
        process: 'PROCESS',
        record: 'RECORD',
        rule: 'RULE',
        view: 'VIEW',
        webApi: 'WEBAPI'
    }
};
//# sourceMappingURL=bundle-details.constant.js.map