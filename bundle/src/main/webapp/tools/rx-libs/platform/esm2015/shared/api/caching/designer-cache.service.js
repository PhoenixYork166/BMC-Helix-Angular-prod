import { Injectable } from '@angular/core';
import { find } from 'lodash';
import * as i0 from "@angular/core";
export class RxDesignerCacheService {
    getActionTypeByNameSync(actionTypeName) {
        return find(this.actionTypes, { actionTypeName });
    }
    getFunctionDescriptorsSync() {
        return this.functionDescriptors;
    }
    setActionTypes(actionTypes) {
        this.actionTypes = actionTypes;
    }
    setFunctionDescriptors(functionDescriptors) {
        this.functionDescriptors = functionDescriptors;
    }
}
RxDesignerCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCacheService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDesignerCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=designer-cache.service.js.map