import { Injectable } from '@angular/core';
import { includes, get } from 'lodash';
import { RX_LEGACY_ICONS } from '@helix/platform/view/api';
import { ActionButtonSize, ActionButtonStyle, DeprecatedActionButtonStyle } from './action-button.types';
import * as i0 from "@angular/core";
export class ActionButtonAdapterService {
    constructor() {
        this.deprecatedButtonStyles = [DeprecatedActionButtonStyle.Link, DeprecatedActionButtonStyle.Clear];
    }
    adaptDefinition(componentDefinition) {
        if (includes(this.deprecatedButtonStyles, componentDefinition.propertiesByName.style)) {
            componentDefinition.propertiesByName.style = ActionButtonStyle.Tertiary;
        }
        if (!componentDefinition.propertiesByName.size) {
            componentDefinition.propertiesByName.size = ActionButtonSize.Small;
        }
        if (componentDefinition.propertiesByName.icon) {
            componentDefinition.propertiesByName.icon = get(RX_LEGACY_ICONS, componentDefinition.propertiesByName.icon, componentDefinition.propertiesByName.icon);
        }
    }
}
ActionButtonAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonAdapterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ActionButtonAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonAdapterService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=action-button-adapter.service.js.map