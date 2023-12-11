import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxDefinitionNameService {
    getDisplayName(definitionName) {
        const name = definitionName || '';
        return name.substring(name.lastIndexOf(':') + 1);
    }
    getDisplayNameForValidation(definitionName) {
        const name = definitionName || '';
        return name.substring(name.indexOf(':') + 1);
    }
    getDefinitionName(bundleId, displayName) {
        return `${bundleId}:${displayName}`;
    }
    getBundleId(definitionName) {
        const name = definitionName || '';
        const matches = name.match(/(.+):/);
        return (matches && matches.pop()) || '';
    }
}
RxDefinitionNameService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionNameService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDefinitionNameService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionNameService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionNameService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=definition-name.service.js.map