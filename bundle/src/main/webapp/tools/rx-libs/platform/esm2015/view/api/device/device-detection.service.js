import { Injectable } from '@angular/core';
import { AdaptDeviceDetectionService } from '@bmc-ux/adapt-angular';
import { RxDevice } from './device.types';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class RxDeviceDetectionService {
    constructor(adaptDeviceDetectionService) {
        var _a;
        this.adaptDeviceDetectionService = adaptDeviceDetectionService;
        this.devices = [
            {
                type: RxDevice.Desktop,
                isDetected: this.adaptDeviceDetectionService.deviceDesktop()
            },
            {
                type: RxDevice.Tablet,
                isDetected: this.adaptDeviceDetectionService.deviceTablet()
            },
            {
                type: RxDevice.Mobile,
                isDetected: this.adaptDeviceDetectionService.deviceMobile()
            }
        ];
        this.currentDevice = (_a = this.devices.find((item) => item.isDetected)) === null || _a === void 0 ? void 0 : _a.type;
    }
}
RxDeviceDetectionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDeviceDetectionService, deps: [{ token: i1.AdaptDeviceDetectionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDeviceDetectionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDeviceDetectionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDeviceDetectionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptDeviceDetectionService }]; } });
//# sourceMappingURL=device-detection.service.js.map