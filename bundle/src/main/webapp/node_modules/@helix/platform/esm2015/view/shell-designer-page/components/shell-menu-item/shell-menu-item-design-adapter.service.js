import { Injectable } from '@angular/core';
import { get } from 'lodash';
import { RX_LEGACY_ICONS } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export class RxShellMenuItemDesignAdapterService {
    adaptDefinition(componentDefinition) {
        if (componentDefinition.propertiesByName.menuItemIcon) {
            componentDefinition.propertiesByName.menuItemIcon = get(RX_LEGACY_ICONS, componentDefinition.propertiesByName.menuItemIcon, componentDefinition.propertiesByName.menuItemIcon);
        }
    }
}
RxShellMenuItemDesignAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignAdapterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxShellMenuItemDesignAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignAdapterService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=shell-menu-item-design-adapter.service.js.map