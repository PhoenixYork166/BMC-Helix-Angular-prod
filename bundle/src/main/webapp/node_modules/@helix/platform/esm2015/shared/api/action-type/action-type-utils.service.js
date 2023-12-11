import { Injectable } from '@angular/core';
import { find, includes, isString, upperFirst, words } from 'lodash';
import { RxDefinitionNameService } from '../definition/definition-name.service';
import * as i0 from "@angular/core";
import * as i1 from "../definition/definition-name.service";
export class RxActionTypeUtilsService {
    constructor(rxDefinitionNameService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
    }
    getActionTypeBundleFriendlyName(bundleDescriptors, actionType) {
        var _a;
        const bundleId = this.rxDefinitionNameService.getBundleId(actionType.actionTypeName);
        return (bundleId && ((_a = find(bundleDescriptors, { id: bundleId })) === null || _a === void 0 ? void 0 : _a.friendlyName)) || '';
    }
    isActionParameterArrayOrList(actionParameter) {
        return isString(actionParameter.dataType) && /^java\.util\.List.*|.*\[.*].*/.test(actionParameter.dataType);
    }
    prettifyActionTypeName(actionTypeName) {
        let result = this.rxDefinitionNameService.getDisplayName(actionTypeName);
        if (!includes(actionTypeName, ' ')) {
            result = words(result, /[a-z|A-Z|0-9]+?([A-Z|0-9]*)+?([-_a-z|0-9]*)+/g)
                .map((value, index) => (index === 0 ? upperFirst(value) : value))
                .join(' ');
        }
        return result;
    }
}
RxActionTypeUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionTypeUtilsService, deps: [{ token: i1.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Injectable });
RxActionTypeUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionTypeUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionTypeUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionNameService }]; } });
//# sourceMappingURL=action-type-utils.service.js.map