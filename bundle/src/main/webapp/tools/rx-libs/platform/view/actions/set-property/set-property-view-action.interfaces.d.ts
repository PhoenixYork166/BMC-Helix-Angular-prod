import { IViewComponentSetProperty } from '@helix/platform/view/runtime';
import { IViewActionDesignProperties } from '@helix/platform/view/api';
export interface ISetPropertyViewActionParams {
    componentApi: IViewComponentSetProperty;
    propertyPath: string;
    propertyValue: any;
}
export interface ISetPropertyViewActionDesignProperties extends IViewActionDesignProperties {
    componentApi: string;
    propertyPath: string;
    propertyValue: string;
}
