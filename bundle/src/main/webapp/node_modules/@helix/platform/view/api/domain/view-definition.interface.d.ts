import { AnyViewComponentDefinition } from './view-component-definition.types';
import { IViewDefinitionPermission } from './view-definition-permission.interface';
import { ViewDefinitionType } from './view-definition-type.enum';
import { IDefinition } from '@helix/platform/shared/api';
export interface IViewDefinition extends IDefinition {
    readonly guid: string;
    readonly type?: ViewDefinitionType;
    componentDefinitions: Array<AnyViewComponentDefinition>;
    allowOverlay?: boolean;
    inputParams: any[];
    layout: string;
    localizableStringsByComponentId?: IViewLocalizableStrings;
    localizablePropertyToStringGuidMap?: IComponentPropertyNameToStringGuid;
    outputParams: any[];
    permissions?: IViewDefinitionPermission[];
    styles?: string;
    targetViewDefinitionName?: string;
    targetExtensionContainerGuid?: string;
    viewComponentExpressions?: string[];
}
export interface IViewLocalizableStrings {
    [componentGuid: string]: {
        [stringGuid: string]: string;
    };
}
export interface IComponentPropertyNameToStringGuid {
    [componentGuid: string]: {
        [propertyName: string]: string;
    };
}
