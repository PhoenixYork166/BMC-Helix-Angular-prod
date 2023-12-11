import { IDefinitionAdapter } from '@helix/platform/shared/api';
import { IContainerViewComponentDefinition } from '../domain/view-component-definition.types';
import { IViewDefinition } from '../domain/view-definition.interface';
import * as i0 from "@angular/core";
export declare class RxViewActionDesignAdapterService implements IDefinitionAdapter<IContainerViewComponentDefinition, IViewDefinition> {
    adaptDefinition(componentDefinition: IContainerViewComponentDefinition): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewActionDesignAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewActionDesignAdapterService>;
}
