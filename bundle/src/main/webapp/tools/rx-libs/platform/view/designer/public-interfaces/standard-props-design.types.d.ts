import { IFormControlBuilderConfig } from '@helix/platform/shared/api';
import { ITagAutocompleteValue } from '@helix/platform/shared/components';
import { RxDevice } from '@helix/platform/view/api';
export declare const RX_AVAILABLE_ON_DEVICES_OPTIONS: {
    id: RxDevice;
    name: string;
}[];
export declare function getAvailableOnDevicesInspectorConfig(): IFormControlBuilderConfig;
export declare function getHiddenFieldInspectorConfig(): IFormControlBuilderConfig;
export declare function getDisabledFieldInspectorConfig(): IFormControlBuilderConfig;
export declare function getStylesFieldInspectorConfig(autocompleteValues?: ITagAutocompleteValue[]): IFormControlBuilderConfig;
export declare function getStandardPropsInspectorConfigs(): IFormControlBuilderConfig[];
