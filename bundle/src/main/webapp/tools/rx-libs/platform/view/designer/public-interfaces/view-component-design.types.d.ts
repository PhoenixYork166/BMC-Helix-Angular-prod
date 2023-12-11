import { IPlainObject } from '@helix/platform/shared/api';
import { IAddNewComponentActionPayload } from '../+state/view-component.types';
export interface IViewComponentDesignData<TComponentProperties = IPlainObject> {
    guid: string;
    data: TComponentProperties;
    type: string;
    children?: IViewComponentDesignData<any>[];
}
export interface IViewComponentDesignSetPayload<TComponentProperties = IPlainObject> {
    type: string;
    guid?: string;
    data?: TComponentProperties;
    columnIndex?: number;
    insertIndex?: number;
    outletName?: string;
    children?: IViewComponentDesignSetPayload[];
}
export declare type ViewComponentAddComponentPayload = Omit<IAddNewComponentActionPayload, 'parentGuid'>;
