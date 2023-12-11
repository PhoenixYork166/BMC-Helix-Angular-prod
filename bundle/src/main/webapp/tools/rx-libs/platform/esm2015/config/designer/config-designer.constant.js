import { ShowInLocationOptions } from '@helix/platform/config/api';
export const RX_CONFIG_DESIGNER = {
    featureSelector: 'configDesigner',
    settingAccessOptions: {
        application: {
            label: 'Application',
            value: ShowInLocationOptions.Application
        },
        innovationStudio: {
            label: 'Innovation Studio',
            value: ShowInLocationOptions.InnovationStudio
        },
        both: {
            value: ShowInLocationOptions.Both
        },
        none: {
            value: ShowInLocationOptions.None
        }
    },
    dataTypes: {
        attachment: {
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.attachment.label',
            resourceType: 'com.bmc.arsys.rx.admin-settings.AttachmentFieldDefinition'
        },
        color: {
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.color.label',
            resourceType: 'com.bmc.arsys.rx.admin-settings.ColorChooserFieldDefinition'
        },
        secure: {
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.secure.label',
            resourceType: 'com.bmc.arsys.rx.admin-settings.SecureDataFieldDefinition'
        }
    }
};
//# sourceMappingURL=config-designer.constant.js.map