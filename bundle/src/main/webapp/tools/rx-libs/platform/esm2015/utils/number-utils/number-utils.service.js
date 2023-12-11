import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import { isFinite, isString } from 'lodash';
import * as i0 from "@angular/core";
export class RxNumberUtilsService {
    isFinite(value) {
        return BigNumber.isBigNumber(value) || isFinite(value);
    }
    isFiniteOrNumberString(value) {
        return this.isFinite(value) || this.isFiniteNumberString(value);
    }
    isFiniteNumberString(value) {
        return isString(value) && value.trim() !== '' && isFinite(Number(value));
    }
}
RxNumberUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumberUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxNumberUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumberUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumberUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=number-utils.service.js.map