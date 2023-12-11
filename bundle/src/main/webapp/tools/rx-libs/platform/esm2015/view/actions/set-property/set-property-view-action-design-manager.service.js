import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxSetPropertyViewActionDesignManagerService {
    validate(actionProperties, propertyName) {
        return of(actionProperties.propertyPath && !/\${view\.components\.([0-9a-z-]+)\..+}/.test(actionProperties.propertyPath)
            ? [
                {
                    type: 'error',
                    description: 'Set property action: Property path is invalid.',
                    propertyName
                }
            ]
            : []);
    }
}
RxSetPropertyViewActionDesignManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSetPropertyViewActionDesignManagerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxSetPropertyViewActionDesignManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSetPropertyViewActionDesignManagerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSetPropertyViewActionDesignManagerService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=set-property-view-action-design-manager.service.js.map