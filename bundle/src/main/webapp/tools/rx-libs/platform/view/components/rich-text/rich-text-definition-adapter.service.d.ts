import { IDefinitionAdapter } from '@helix/platform/shared/api';
import { IContainerViewComponentDefinition, IViewDefinition, RxCkEditorConfiguratorService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RichTextDefinitionAdapterService implements IDefinitionAdapter<IContainerViewComponentDefinition, IViewDefinition> {
    private rxCkEditorConfiguratorService;
    private filter;
    constructor(rxCkEditorConfiguratorService: RxCkEditorConfiguratorService);
    adaptDefinition(definition: IContainerViewComponentDefinition): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTextDefinitionAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RichTextDefinitionAdapterService>;
}
