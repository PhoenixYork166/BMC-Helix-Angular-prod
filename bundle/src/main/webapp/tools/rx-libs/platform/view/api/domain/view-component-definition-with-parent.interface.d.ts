import { AnyViewComponentDefinition, IContainerViewComponentDefinition } from './view-component-definition.types';
export interface IViewComponentDefinitionWithParent {
    componentDefinition: AnyViewComponentDefinition;
    parentComponentDefinition: IContainerViewComponentDefinition;
}
