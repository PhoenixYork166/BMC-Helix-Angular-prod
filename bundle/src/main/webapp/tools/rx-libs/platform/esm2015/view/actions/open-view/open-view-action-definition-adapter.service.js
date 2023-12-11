import { Injectable } from '@angular/core';
import { RX_OPEN_VIEW } from './open-view-action.constant';
import { get } from 'lodash';
import * as i0 from "@angular/core";
export class RxOpenViewDefinitionAdapterService {
    constructor() {
        this.modalSizeMap = {
            small: RX_OPEN_VIEW.modalSize.Small,
            medium: RX_OPEN_VIEW.modalSize.Medium,
            large: RX_OPEN_VIEW.modalSize.Large
        };
    }
    adaptDefinition(viewComponentDefinition) {
        const propertiesByName = get(viewComponentDefinition, 'propertiesByName', {});
        if (propertiesByName.name === RX_OPEN_VIEW.actionName) {
            const modalSize = propertiesByName.presentation.modalSize;
            if (this.modalSizeMap[modalSize]) {
                propertiesByName.presentation.modalSize = this.modalSizeMap[modalSize];
            }
        }
    }
}
RxOpenViewDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewDefinitionAdapterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxOpenViewDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewDefinitionAdapterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewDefinitionAdapterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=open-view-action-definition-adapter.service.js.map