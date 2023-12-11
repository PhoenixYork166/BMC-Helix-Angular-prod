import { IDefinition, IPlainObject } from '@helix/platform/shared/api';
import { IViewDefinitionPermission } from './view-definition-permission.interface';
export interface IViewComponentDefinition<TPropertiesByName = IPlainObject> extends IDefinition {
    readonly guid: string;
    readonly resourceType: string;
    readonly type: string;
    propertiesByName: TPropertiesByName;
    permissions?: IViewDefinitionPermission[];
}
export interface IContainerViewComponentDefinition<TPropertiesByName = IPlainObject, TChildPropertiesByName = IPlainObject> extends IViewComponentDefinition<TPropertiesByName> {
    layout: string;
    componentDefinitions: AnyViewComponentDefinition<TChildPropertiesByName>[];
}
export declare type AnyViewComponentDefinition<TPropertiesByName = IPlainObject> = IViewComponentDefinition<TPropertiesByName> | IContainerViewComponentDefinition<TPropertiesByName>;
