import { IDefinitionAdapter } from '@helix/platform/shared/api';
import { IContainerViewComponentDefinition, IViewDefinition } from '@helix/platform/view/api';
import { IAssociationProperties } from './association-design.types';
import * as i0 from "@angular/core";
export declare class AssociationDesignAdapterService implements IDefinitionAdapter<IContainerViewComponentDefinition<IAssociationProperties>, IViewDefinition> {
    adaptDefinition(componentDefinition: IContainerViewComponentDefinition<IAssociationProperties>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AssociationDesignAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AssociationDesignAdapterService>;
}
