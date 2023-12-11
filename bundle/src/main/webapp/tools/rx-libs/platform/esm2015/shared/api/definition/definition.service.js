import { Injectable } from '@angular/core';
import { RX_BUNDLE } from '../bundle/bundle.constant';
import * as i0 from "@angular/core";
export class RxDefinitionService {
    getScopeName(definitionScopeType, bundleDescriptor) {
        return definitionScopeType === RX_BUNDLE.definitionScopeTypes.bundle
            ? bundleDescriptor.isApplication
                ? RX_BUNDLE.definitionScopeNames.application
                : RX_BUNDLE.definitionScopeNames.library
            : RX_BUNDLE.definitionScopeNames.public;
    }
}
RxDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=definition.service.js.map