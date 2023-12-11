import { Injectable } from '@angular/core';
import { RX_SIZE_UNITS } from './size-units.constant';
import * as i0 from "@angular/core";
export class RxUnitService {
    getValueWithUnits(value) {
        const kilobytes = RX_SIZE_UNITS.kilobytes;
        const megabytes = RX_SIZE_UNITS.megabytes;
        const gigabytes = RX_SIZE_UNITS.gigabytes;
        let valueWithUnits = null;
        if (value < kilobytes.value) {
            valueWithUnits = `${value} ${RX_SIZE_UNITS.bytes.unit}`;
        }
        else if (value < megabytes.value) {
            valueWithUnits = `${value / kilobytes.value} ${kilobytes.unit}`;
        }
        else if (value < gigabytes.value) {
            valueWithUnits = `${value / megabytes.value} ${megabytes.unit}`;
        }
        else {
            valueWithUnits = `${value / gigabytes.value} ${gigabytes.unit}`;
        }
        return valueWithUnits;
    }
    getValueWithoutUnitsByUnitType(value, unitType) {
        const kilobytes = RX_SIZE_UNITS.kilobytes;
        const megabytes = RX_SIZE_UNITS.megabytes;
        const gigabytes = RX_SIZE_UNITS.gigabytes;
        let valueWithoutUnits = null;
        if (unitType === kilobytes.unit) {
            valueWithoutUnits = value / kilobytes.value;
        }
        else if (unitType === megabytes.unit) {
            valueWithoutUnits = value / megabytes.value;
        }
        else if (unitType === gigabytes.unit) {
            valueWithoutUnits = value / gigabytes.value;
        }
        else {
            valueWithoutUnits = value;
        }
        return valueWithoutUnits;
    }
}
RxUnitService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnitService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxUnitService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnitService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnitService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=unit.service.js.map