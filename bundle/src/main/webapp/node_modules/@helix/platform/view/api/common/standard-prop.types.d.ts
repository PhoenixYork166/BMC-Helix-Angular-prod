import { IRxAvailableOnDevicesProp } from './available-on-devices-prop.types';
import { IRxHiddenProp } from './hidden-prop.types';
import { IRxStylesProp } from './styles-prop.types';
export declare const RX_STANDARD_PROPS_DESC: {
    name: string;
}[];
export declare const RX_STANDARD_PROPS_DEFAULT_VALUES: {
    availableOnDevices: import("@helix/platform/view/api").RxDevice[];
    styles: any;
    hidden: string;
};
export interface IRxStandardProps extends IRxHiddenProp, IRxStylesProp, IRxAvailableOnDevicesProp {
}
