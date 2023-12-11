import { IDefinitionAdapter } from '@helix/platform/shared/api';
import { IContainerViewComponentDefinition, IViewDefinition } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class ActionButtonAdapterService implements IDefinitionAdapter<IContainerViewComponentDefinition, IViewDefinition> {
    private deprecatedButtonStyles;
    adaptDefinition(componentDefinition: IContainerViewComponentDefinition): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActionButtonAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ActionButtonAdapterService>;
}
