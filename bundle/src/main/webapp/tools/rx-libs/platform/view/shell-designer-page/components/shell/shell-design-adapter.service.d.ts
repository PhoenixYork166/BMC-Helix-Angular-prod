import { IDefinitionAdapter } from '@helix/platform/shared/api';
import { IContainerViewComponentDefinition, IViewDefinition } from '@helix/platform/view/api';
import { RxGuidService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class RxShellDesignAdapterService implements IDefinitionAdapter<IContainerViewComponentDefinition, IViewDefinition> {
    private rxGuidService;
    constructor(rxGuidService: RxGuidService);
    adaptDefinition(componentDefinition: IContainerViewComponentDefinition): void;
    addAddUserMenu(componentDefinition: IContainerViewComponentDefinition): void;
    addActionsOutlet(componentDefinition: IContainerViewComponentDefinition): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxShellDesignAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxShellDesignAdapterService>;
}
