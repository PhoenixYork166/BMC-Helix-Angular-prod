import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxExtensionContainerHelperService {
    // generate unique expression for 'selectionFieldOptionNamesById' property depending on extension Record editor guid
    getSelectionFieldOptionNamesByIdExpression(guid) {
        return `${guid}:selectionFieldOptionNamesById`;
    }
}
RxExtensionContainerHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExtensionContainerHelperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxExtensionContainerHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExtensionContainerHelperService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExtensionContainerHelperService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=extension-container-helper.service.js.map