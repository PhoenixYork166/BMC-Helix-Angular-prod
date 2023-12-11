import { IDefinitionAdapter } from '@helix/platform/shared/api';
import { RxJsonParserService } from '@helix/platform/utils';
import { IContainerViewComponentDefinition, IViewDefinition, RxViewDefinitionParserService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RxRecordGridDesignAdapterService implements IDefinitionAdapter<IContainerViewComponentDefinition, IViewDefinition> {
    private rxJsonParserService;
    private rxViewDefinitionParserService;
    constructor(rxJsonParserService: RxJsonParserService, rxViewDefinitionParserService: RxViewDefinitionParserService);
    adaptDefinition(elementDefinition: IContainerViewComponentDefinition): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordGridDesignAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordGridDesignAdapterService>;
}
