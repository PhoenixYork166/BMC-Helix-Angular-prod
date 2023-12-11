import { IPlainObject } from '@helix/platform/shared/api';
export interface IProcessInstance {
    activities?: IPlainObject;
    exceptionMessage?: string;
    processVariables?: IPlainObject;
}
export interface IProcessInstanceLog {
    instanceId: string;
    logContent: string;
    processDefinitionName: string;
}
