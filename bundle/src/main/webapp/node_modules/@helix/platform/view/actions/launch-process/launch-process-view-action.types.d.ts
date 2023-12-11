import { IPlainObject } from '@helix/platform/shared/api';
import { IViewActionDesignProperties } from '@helix/platform/view/api';
export interface ILaunchProcessViewActionParams {
    processDefinitionName: string;
    waitForProcessCompletion: boolean;
    actionProcessInputParams: IPlainObject;
}
export interface ILaunchProcessViewDesignProperties extends IViewActionDesignProperties {
    processDefinitionName: string;
    waitForProcessCompletion: boolean;
    actionProcessInputParams?: IPlainObject;
}
