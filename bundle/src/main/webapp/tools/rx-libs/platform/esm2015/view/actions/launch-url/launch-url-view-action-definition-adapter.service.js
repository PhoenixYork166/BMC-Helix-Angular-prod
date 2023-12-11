import { Injectable } from '@angular/core';
import { RX_LAUNCH_BEHAVIOR } from '@helix/platform/view/api';
import { get } from 'lodash';
import * as i0 from "@angular/core";
export class RxLaunchUrlViewActionDefinitionAdapterService {
    adaptDefinition(viewComponentDefinition) {
        var _a;
        const propertiesByName = get(viewComponentDefinition, 'propertiesByName', {});
        propertiesByName.launchBehavior = (_a = propertiesByName.launchBehavior) !== null && _a !== void 0 ? _a : RX_LAUNCH_BEHAVIOR.newWindow.value;
    }
}
RxLaunchUrlViewActionDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchUrlViewActionDefinitionAdapterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxLaunchUrlViewActionDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchUrlViewActionDefinitionAdapterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchUrlViewActionDefinitionAdapterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=launch-url-view-action-definition-adapter.service.js.map