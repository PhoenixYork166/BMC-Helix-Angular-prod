import * as i0 from "@angular/core";
export declare class RxProcessElementSearchService {
    find(definition: any, predicate: any): any;
    findElementInDefinition(definition: any, predicate: any): unknown;
    findOwner(definition: any, guid: any): any;
    findByGuid(definition: any, guid: any): any;
    filter(definition: any, predicate: any): object[];
    forEach(definition: any, iteratee: any): object[];
    flattenElements(definition: any): object[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxProcessElementSearchService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxProcessElementSearchService>;
}
