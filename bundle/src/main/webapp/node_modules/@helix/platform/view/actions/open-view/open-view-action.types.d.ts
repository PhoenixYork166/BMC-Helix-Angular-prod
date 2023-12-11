import { IViewActionDesignProperties, IViewDefinition, IViewInputParams, OpenViewActionLaunchBehavior, OpenViewActionModalSize, OpenViewActionType } from '@helix/platform/view/api';
export interface IOpenViewActionParams {
    viewDefinitionName: string | IViewDefinition;
    viewParams: IViewInputParams;
    presentation: IOpenViewActionPresentationParams & {
        notification?: string;
    };
}
export interface IOpenViewActionPresentationParams {
    type: OpenViewActionType;
    launchBehavior?: OpenViewActionLaunchBehavior;
    modalSize?: OpenViewActionModalSize;
    title?: string;
}
export interface IOpenViewActionDesignProperties extends IViewActionDesignProperties {
    viewDefinitionName: string;
    'presentation.type'?: OpenViewActionType;
    'presentation.launchBehavior'?: OpenViewActionLaunchBehavior;
    'presentation.modalSize'?: OpenViewActionModalSize;
    'presentation.title'?: string;
}
export declare const RX_OPEN_VIEW_MODAL_SIZE_OPTIONS: {
    id: OpenViewActionModalSize;
    name: string;
}[];
export declare const RX_OPEN_VIEW_TYPE_OPTIONS: {
    id: OpenViewActionType;
    name: string;
}[];
export declare const RX_OPEN_VIEW_LAUNCH_BEHAVIOR_OPTIONS: {
    id: OpenViewActionLaunchBehavior;
    name: string;
}[];
