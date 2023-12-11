import { INamedListDefinition } from '@helix/platform/named-list/api';
import { INamedListDefinitionModel } from './named-list-designer.types';
import * as i0 from "@angular/core";
export declare class NamedListDesignerService {
    getDefinitionFromDefinitionModel(model: INamedListDefinitionModel, bundleId: string): INamedListDefinition;
    static ɵfac: i0.ɵɵFactoryDeclaration<NamedListDesignerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NamedListDesignerService>;
}
