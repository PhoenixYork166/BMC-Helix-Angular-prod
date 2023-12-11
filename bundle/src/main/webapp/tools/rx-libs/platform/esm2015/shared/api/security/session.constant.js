export const RX_SESSION = {
    minutesBeforeLogout: 2,
    keepAliveCommand: 'com.bmc.arsys.rx.application.user.command.KeepAliveCommand',
    userInteractionThrottleTimeMs: 1000,
    userInteractionEvents: ['click', 'keypress'],
    expirationModes: {
        idle: 'idleSessionExpirationMode',
        absolute: 'absoluteSessionExpirationMode'
    },
    expirationHeaders: {
        idle: 'Session-Expiration',
        absolute: 'Absolute-Session-Expiration'
    },
    ssoProviderTypes: {
        rsso: 'RSSO'
    }
};
//# sourceMappingURL=session.constant.js.map