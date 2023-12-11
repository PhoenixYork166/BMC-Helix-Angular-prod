import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
export const RX_ADMIN = {
    defaultImages: {
        'rx-theme-favicon-logo': {
            name: 'favicon.ico',
            type: 'image/x-icon'
        },
        'rx-theme-large-logo-light': {
            name: 'company.svg',
            type: 'image/svg+xml'
        },
        'rx-theme-large-logo-dark': {
            name: 'company-dark.svg',
            type: 'image/svg+xml'
        },
        'rx-theme-small-logo-light': {
            name: 'company.svg',
            type: 'image/svg+xml'
        },
        'rx-theme-small-logo-dark': {
            name: 'company-dark.svg',
            type: 'image/svg+xml'
        }
    },
    settingResourceTypes: {
        character: RX_RECORD_DEFINITION.resourceTypes.character,
        selection: RX_RECORD_DEFINITION.resourceTypes.selection,
        integer: RX_RECORD_DEFINITION.resourceTypes.integer,
        decimal: RX_RECORD_DEFINITION.resourceTypes.decimal,
        boolean: RX_RECORD_DEFINITION.resourceTypes.boolean,
        dateOnly: RX_RECORD_DEFINITION.resourceTypes.dateOnly,
        color: 'com.bmc.arsys.rx.admin-settings.ColorChooserFieldDefinition',
        attachment: 'com.bmc.arsys.rx.admin-settings.AttachmentFieldDefinition',
        secure: 'com.bmc.arsys.rx.admin-settings.SecureDataFieldDefinition'
    }
};
//# sourceMappingURL=admin.constant.js.map