import { AdaptDeviceDetectionService } from '@bmc-ux/adapt-angular';
import { RxDevice } from './device.types';
import * as i0 from "@angular/core";
export declare class RxDeviceDetectionService {
    private adaptDeviceDetectionService;
    private devices;
    currentDevice: RxDevice;
    constructor(adaptDeviceDetectionService: AdaptDeviceDetectionService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDeviceDetectionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDeviceDetectionService>;
}
