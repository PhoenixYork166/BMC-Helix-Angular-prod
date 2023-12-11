import { IDefinitionAdapter } from '@helix/platform/shared/api';
import { RxJsonParserService } from '@helix/platform/utils';
import { IContainerViewComponentDefinition, IViewDefinition, RxViewDefinitionParserService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RxTabPanelComponentDefinitionAdapterService implements IDefinitionAdapter<IContainerViewComponentDefinition, IViewDefinition> {
    private viewDefinitionParserService;
    private rxJsonParserService;
    constructor(viewDefinitionParserService: RxViewDefinitionParserService, rxJsonParserService: RxJsonParserService);
    adaptDefinition(tabPanelViewComponentDefinition: IContainerViewComponentDefinition): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxTabPanelComponentDefinitionAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxTabPanelComponentDefinitionAdapterService>;
}
