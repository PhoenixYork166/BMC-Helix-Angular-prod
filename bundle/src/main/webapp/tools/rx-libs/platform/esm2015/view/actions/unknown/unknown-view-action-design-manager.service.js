import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxUnknownViewActionDesignManager {
    validate(actionProperties, propertyName) {
        return of([
            {
                type: 'error',
                description: `Unknown action: ${actionProperties.name}`,
                propertyName
            }
        ]);
    }
}
RxUnknownViewActionDesignManager.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownViewActionDesignManager, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxUnknownViewActionDesignManager.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownViewActionDesignManager });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownViewActionDesignManager, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=unknown-view-action-design-manager.service.js.map