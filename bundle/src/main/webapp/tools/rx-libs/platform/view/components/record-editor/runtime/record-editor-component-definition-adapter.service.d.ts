import { IDefinitionAdapter } from '@helix/platform/shared/api';
import { IContainerViewComponentDefinition, IViewDefinition, RxViewDefinitionParserService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RecordEditorComponentDefinitionAdapterService implements IDefinitionAdapter<IContainerViewComponentDefinition, IViewDefinition> {
    private viewDefinitionParserService;
    constructor(viewDefinitionParserService: RxViewDefinitionParserService);
    adaptDefinition(recordEditorComponentDefinition: IContainerViewComponentDefinition): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordEditorComponentDefinitionAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RecordEditorComponentDefinitionAdapterService>;
}
