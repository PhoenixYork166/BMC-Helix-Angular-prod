import { Store } from '@ngrx/store';
import * as i0 from "@angular/core";
/**
 * Public class for dispatching actions
 * Protects ngrx store$ service from selecting data from the store
 */
export declare class ViewDesignerDispatcher {
    private store$;
    constructor(store$: Store<any>);
    dispatch(action: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewDesignerDispatcher, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ViewDesignerDispatcher>;
}
