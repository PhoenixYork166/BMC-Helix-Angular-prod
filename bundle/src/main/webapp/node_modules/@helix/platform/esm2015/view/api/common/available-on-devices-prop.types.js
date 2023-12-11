import { ViewComponentPropertyType } from '../registries/view-component-descriptor.types';
import { RxDevice } from '../device/device.types';
export const RX_AVAILABLE_ON_DEVICES_ALL_VALUE = Object.values(RxDevice);
export const RX_AVAILABLE_ON_DEVICES_PROP_NAME = 'availableOnDevices';
export const RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE = {
    [RX_AVAILABLE_ON_DEVICES_PROP_NAME]: RX_AVAILABLE_ON_DEVICES_ALL_VALUE
};
export const RX_AVAILABLE_ON_DEVICES_PROP_DESC = {
    name: RX_AVAILABLE_ON_DEVICES_PROP_NAME,
    type: ViewComponentPropertyType.Array,
    designType: ViewComponentPropertyType.Array
};
//# sourceMappingURL=available-on-devices-prop.types.js.map