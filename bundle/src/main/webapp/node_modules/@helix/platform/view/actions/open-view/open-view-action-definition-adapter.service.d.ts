import { IDefinitionAdapter } from '@helix/platform/shared/api';
import { IViewComponentDefinition, IViewDefinition } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RxOpenViewDefinitionAdapterService implements IDefinitionAdapter<IViewComponentDefinition, IViewDefinition> {
    private modalSizeMap;
    adaptDefinition(viewComponentDefinition: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxOpenViewDefinitionAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxOpenViewDefinitionAdapterService>;
}
