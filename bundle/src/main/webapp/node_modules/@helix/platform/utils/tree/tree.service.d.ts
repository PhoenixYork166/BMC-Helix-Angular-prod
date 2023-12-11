import * as i0 from "@angular/core";
export declare class RxTreeService {
    flatten(tree: any, childrenPropertyName?: string): any[];
    flattenTree(tree: any, ...childrenPropertyNames: string[]): any[];
    flattenBy(tree: any, predicate: (node: any) => any[]): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxTreeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxTreeService>;
}
