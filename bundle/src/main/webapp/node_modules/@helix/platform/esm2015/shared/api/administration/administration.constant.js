export const RX_ADMINISTRATION = {
    settingNames: {
        newApplicationUiOptOut: 'New application UI opt out',
        newViewDesignerOptOut: 'New view designer opt out'
    },
    systemConfigurationUrl: '/api/rx/application/systemconfiguration',
    submitterModes: {
        locked: 1
    },
    configurationSettingTypes: {
        shared: {
            configurationType: 'shared-settings',
            value: 'shared'
        },
        inbundle: {
            configurationType: 'in-bundle-settings',
            value: 'inBundle'
        },
        external: {
            configurationType: 'external-settings',
            value: 'external'
        }
    },
    settingAccessOptions: {
        application: {
            value: 'Application'
        },
        innovationStudio: {
            value: 'InnovationStudio'
        },
        both: {
            value: 'Both'
        },
        none: {
            value: 'None'
        }
    }
};
//# sourceMappingURL=administration.constant.js.map