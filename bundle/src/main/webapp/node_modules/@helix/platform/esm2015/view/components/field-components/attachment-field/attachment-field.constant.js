import { UploaderMode, UploaderSelectionMode } from '@bmc-ux/adapt-angular';
export const RX_ATTACHMENT_FIELD = {
    defaultOptions: {
        filesCount: 1,
        mode: UploaderMode.Manual,
        selectionMode: UploaderSelectionMode.File,
        chunkSize: '100KB',
        maxFileSize: '2GB' // Default is 20 MB
    }
};
//# sourceMappingURL=attachment-field.constant.js.map