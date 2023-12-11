import { IViewActionDesignProperties } from '@helix/platform/view/api';
export interface ILaunchUrlViewActionParams extends IViewActionDesignProperties {
    url: string;
    launchBehavior: string;
}
