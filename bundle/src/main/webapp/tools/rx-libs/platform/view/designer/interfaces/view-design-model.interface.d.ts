import { IOverlayDescriptor } from '@helix/platform/shared/api';
import { IViewDefinitionPermission, IViewLocalizableStrings, ViewDefinitionType } from '@helix/platform/view/api';
import { IViewComponentDesignOutlet } from './view-component-design-outlet.interface';
export interface IViewDesignModel {
    readonly guid: string;
    readonly type?: ViewDefinitionType;
    name: string;
    displayName: string;
    description: string;
    inputParams: {
        name: string;
    }[];
    outputParams: {
        name: string;
        source: string;
    }[];
    layout: {
        outlets: IViewComponentDesignOutlet[];
    };
    allowOverlay?: boolean;
    localizableStringsByComponentId?: IViewLocalizableStrings;
    overlayDescriptor?: IOverlayDescriptor;
    permissions?: IViewDefinitionPermission[];
    styles?: string;
    scope?: string;
    version?: string;
    lastUpdateTime?: string;
    lastChangedBy?: string;
    owner?: string;
    tags?: string[];
    overlayGroupId?: string;
    pageComponent?: string;
    targetViewDefinitionName?: string;
    targetExtensionContainerGuid?: string;
    childDataComponentGuids?: string[];
    layoutName?: string;
    isAngularJsView: boolean;
}
