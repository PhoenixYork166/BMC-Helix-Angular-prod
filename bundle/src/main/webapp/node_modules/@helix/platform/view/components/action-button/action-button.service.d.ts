import { AdaptButtonComponent } from '@bmc-ux/adapt-angular';
import { ActionButtonIconAlignment, ActionButtonStyle } from './action-button.types';
import * as i0 from "@angular/core";
export declare class RxActionButtonService {
    getButtonType(style: ActionButtonStyle): AdaptButtonComponent['type'];
    getIconCssClass(iconClass: string, iconAlignment?: ActionButtonIconAlignment): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxActionButtonService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxActionButtonService>;
}
