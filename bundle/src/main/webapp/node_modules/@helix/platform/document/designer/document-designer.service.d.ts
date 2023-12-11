import { IDocumentDefinition } from '@helix/platform/document/api';
import { IDocumentDefinitionModel } from './document-designer.types';
import * as i0 from "@angular/core";
export declare class DocumentDesignerService {
    getDefinitionFromDefinitionModel(model: IDocumentDefinitionModel, bundleId: string): IDocumentDefinition;
    static ɵfac: i0.ɵɵFactoryDeclaration<DocumentDesignerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DocumentDesignerService>;
}
