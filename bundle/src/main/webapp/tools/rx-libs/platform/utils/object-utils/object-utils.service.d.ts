import * as i0 from "@angular/core";
interface IPlainObject {
    [name: string]: any;
}
export declare class RxObjectUtilsService {
    expandProperties<T = object, TResult = T>(serializedParameters: T): TResult;
    serializeObject<TSource extends IPlainObject, TResult extends IPlainObject>(object: TSource): TResult;
    isEmptyObject(value: any): boolean;
    /**
     * Creates a deep clone of a value using JSON converting. This method is much faster than cloneDeep from lodash,
     * but has some serious limitations. To get more details please check JSON.stringify method description.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description
     */
    cloneDeep<T>(value: T): T;
    mapFromArray<T, K extends keyof T>(collection: T[], propertyName: K): Map<K, T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxObjectUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxObjectUtilsService>;
}
export {};
