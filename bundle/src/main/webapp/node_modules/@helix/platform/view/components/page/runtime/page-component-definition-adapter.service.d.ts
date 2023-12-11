import { IDefinitionAdapter } from '@helix/platform/shared/api';
import { IContainerViewComponentDefinition, IViewDefinition } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class PageComponentDefinitionAdapterService implements IDefinitionAdapter<IContainerViewComponentDefinition, IViewDefinition> {
    adaptDefinition(componentDefinition: IContainerViewComponentDefinition): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PageComponentDefinitionAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PageComponentDefinitionAdapterService>;
}
