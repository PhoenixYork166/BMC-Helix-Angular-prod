import { ViewComponentPropertyType } from '../registries/view-component-descriptor.types';
import { RxDevice } from '../device/device.types';
export declare const RX_AVAILABLE_ON_DEVICES_ALL_VALUE: RxDevice[];
export declare const RX_AVAILABLE_ON_DEVICES_PROP_NAME = "availableOnDevices";
export declare const RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE: {
    availableOnDevices: RxDevice[];
};
export declare const RX_AVAILABLE_ON_DEVICES_PROP_DESC: {
    name: string;
    type: ViewComponentPropertyType;
    designType: ViewComponentPropertyType;
};
export interface IRxAvailableOnDevicesProp {
    availableOnDevices?: RxDevice[];
}
