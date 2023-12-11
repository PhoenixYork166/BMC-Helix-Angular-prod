import { IViewActionDesignProperties } from '@helix/platform/view/api';
export interface ILaunchProcessDesignerActionParams {
    paletteElements: string;
    processDefinitionName: string;
}
export interface ILaunchProcessDesignerViewActionDesignProperties extends IViewActionDesignProperties {
    paletteElements: string;
    processDefinitionName: string;
}
