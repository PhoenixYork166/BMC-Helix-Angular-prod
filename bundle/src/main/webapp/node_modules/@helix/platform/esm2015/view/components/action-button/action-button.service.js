import { Injectable } from '@angular/core';
import { ActionButtonIconAlignment, ActionButtonStyle } from './action-button.types';
import * as i0 from "@angular/core";
export class RxActionButtonService {
    getButtonType(style) {
        let result;
        switch (style) {
            case ActionButtonStyle.Secondary:
                result = 'secondary';
                break;
            case ActionButtonStyle.Tertiary:
                result = 'tertiary';
                break;
            default:
                result = 'primary';
                break;
        }
        return result;
    }
    getIconCssClass(iconClass, iconAlignment = ActionButtonIconAlignment.Left) {
        return iconClass ? `d-icon-${iconAlignment}-${iconClass}` : '';
    }
}
RxActionButtonService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionButtonService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxActionButtonService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionButtonService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionButtonService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=action-button.service.js.map