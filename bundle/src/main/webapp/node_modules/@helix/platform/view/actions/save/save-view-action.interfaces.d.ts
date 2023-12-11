import { IRuntimeViewApi, IViewComponentSave } from '@helix/platform/view/runtime';
import { IViewActionDesignProperties } from '@helix/platform/view/api';
export interface ISaveViewActionParams {
    targetApi: IViewComponentSave;
    viewApi: Pick<IRuntimeViewApi, 'close'>;
    closeAfterSave: boolean;
}
export interface ISaveViewActionDesignProperties extends IViewActionDesignProperties {
    targetApi: string;
    viewApi: string;
    closeAfterSave: boolean;
}
