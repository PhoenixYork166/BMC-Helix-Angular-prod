import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
/**
 * Public class for dispatching actions
 * Protects ngrx store$ service from selecting data from the store
 */
export class ViewDesignerDispatcher {
    constructor(store$) {
        this.store$ = store$;
    }
    dispatch(action) {
        this.store$.dispatch(action);
    }
}
ViewDesignerDispatcher.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerDispatcher, deps: [{ token: i1.Store }], target: i0.ɵɵFactoryTarget.Injectable });
ViewDesignerDispatcher.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerDispatcher, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerDispatcher, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }]; } });
//# sourceMappingURL=view-designer-dispatcher.service.js.map