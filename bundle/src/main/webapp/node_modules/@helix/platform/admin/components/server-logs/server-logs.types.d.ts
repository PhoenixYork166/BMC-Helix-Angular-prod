export interface IServerLogsConfig {
    apiLogOn: boolean;
    autoTurnOffDuration: number;
    processLogOn: boolean;
    ruleLogOn: boolean;
    sqlLogOn: boolean;
    timedRuleLogOn: boolean;
}
export interface ILogFileNames {
    fileNames: string[];
}
