import { RX_APPLICATION } from '../application/application.constant';
export const RX_ERROR_HANDLING = {
    optimisticLockErrorHttpStatus: 412,
    ignoredErrors: [
        { status: 404, contains: '/resources/i18n/locale' },
        { status: 404, contains: RX_APPLICATION.shellDefinitionName },
        { status: 412, contains: '"messageNumber":309' },
        { status: 412, contains: '"messageNumber":9965' }
    ],
    maxErrorMessageLength: 500,
    maxArMessageLength: 500,
    arMessagesHeader: 'x-ar-messages',
    arNoteLogInfo: 8914,
    arGuestUserMessageNo: 59,
    messageTypes: {
        warning: 'WARNING',
        success: 'SUCCESS',
        info: 'INFO',
        error: 'ERROR'
    }
};
//# sourceMappingURL=error-handling.constant.js.map