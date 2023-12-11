import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxViewActionDesignAdapterService {
    adaptDefinition(componentDefinition) {
        var _a;
        componentDefinition.propertiesByName.$condition$ = (_a = componentDefinition.propertiesByName.$condition$) !== null && _a !== void 0 ? _a : null;
    }
}
RxViewActionDesignAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionDesignAdapterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxViewActionDesignAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionDesignAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionDesignAdapterService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=view-action-design-adapter.service.js.map