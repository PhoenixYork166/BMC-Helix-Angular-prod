import { RX_ADMINISTRATION } from '@helix/platform/shared/api';
export const RX_SERVER_LOGS = {
    configUrl: `${RX_ADMINISTRATION.systemConfigurationUrl}/logging/server`,
    downloadUrl: `${RX_ADMINISTRATION.systemConfigurationUrl}/logging/server/download`,
    defaultFormConfig: {
        autoTurnOffDuration: 30,
        ruleLogOn: false,
        timedRuleLogOn: false,
        processLogOn: false,
        sqlLogOn: false,
        apiLogOn: false
    }
};
//# sourceMappingURL=server-logs.constant.js.map