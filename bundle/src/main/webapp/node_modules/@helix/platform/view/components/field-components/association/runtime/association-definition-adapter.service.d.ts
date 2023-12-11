import { IDefinitionAdapter } from '@helix/platform/shared/api';
import { IContainerViewComponentDefinition, IViewComponentDefinition, IViewDefinition, RxViewDefinitionParserService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RxAssociationDefinitionAdapterService implements IDefinitionAdapter<IContainerViewComponentDefinition, IViewDefinition> {
    private rxViewDefinitionParserService;
    constructor(rxViewDefinitionParserService: RxViewDefinitionParserService);
    adaptDefinition(associationComponentDefinition: IContainerViewComponentDefinition, viewDefinition: IViewDefinition): void;
    getTargetRecordEditorComponentDefinition(viewDefinition: IViewDefinition, extensionContainerComponentDefinition: IViewComponentDefinition): IContainerViewComponentDefinition;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAssociationDefinitionAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAssociationDefinitionAdapterService>;
}
