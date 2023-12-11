import { IDefinitionAdapter } from '@helix/platform/shared/api';
import { RxJsonParserService } from '@helix/platform/utils';
import { IContainerViewComponentDefinition, IViewDefinition, RxViewComponentType, RxViewDefinitionParserService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class ContainerComponentDefinitionAdapterService implements IDefinitionAdapter<IContainerViewComponentDefinition, IViewDefinition> {
    private viewDefinitionParserService;
    private rxJsonParserService;
    protected componentDefinitionType: RxViewComponentType;
    constructor(viewDefinitionParserService: RxViewDefinitionParserService, rxJsonParserService: RxJsonParserService);
    adaptDefinition(containerComponentDefinition: IContainerViewComponentDefinition): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContainerComponentDefinitionAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ContainerComponentDefinitionAdapterService>;
}
