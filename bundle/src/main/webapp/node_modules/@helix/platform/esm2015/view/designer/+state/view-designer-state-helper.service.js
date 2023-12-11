import { Injectable } from '@angular/core';
import { isFunction } from 'lodash';
import * as i0 from "@angular/core";
export class RxViewDesignerStateHelperService {
    getInitialComponentProperties(initialProperties, componentDescriptor) {
        var _a;
        let result = initialProperties;
        if (isFunction((_a = componentDescriptor.designComponentModel) === null || _a === void 0 ? void 0 : _a.getInitialProperties)) {
            result = componentDescriptor.designComponentModel.getInitialProperties(initialProperties);
        }
        return result;
    }
    getDefaultComponentPermissions(componentDescriptor) {
        var _a;
        let permissions = null;
        if (isFunction((_a = componentDescriptor.designComponentModel) === null || _a === void 0 ? void 0 : _a.getDefaultPermissions)) {
            permissions = componentDescriptor.designComponentModel.getDefaultPermissions();
        }
        return permissions;
    }
}
RxViewDesignerStateHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerStateHelperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDesignerStateHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerStateHelperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerStateHelperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=view-designer-state-helper.service.js.map