import { Observable } from 'rxjs';
import { IDesignerStencilElement, IDesignerStencilElementGroups, IDesignerStencilElementTree } from './designer.types';
import * as i0 from "@angular/core";
export declare class RxDesignerStencilBuilder {
    buildElementsTree(elementsSources: Observable<IDesignerStencilElement[]>[], elementGroups: IDesignerStencilElementGroups): Observable<IDesignerStencilElementTree[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDesignerStencilBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDesignerStencilBuilder>;
}
