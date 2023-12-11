import { Injectable } from '@angular/core';
import { RX_BUTTON_BAR } from './button-bar.types';
import { get } from 'lodash';
import * as i0 from "@angular/core";
export class RxButtonBarService {
    getAlignClass(alignment) {
        return get(RX_BUTTON_BAR.alignmentOptions, [alignment, 'cls'], '');
    }
}
RxButtonBarService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxButtonBarService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxButtonBarService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxButtonBarService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxButtonBarService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=button-bar.service.js.map