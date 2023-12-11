import { Tooltip } from '@helix/platform/shared/api';
import { OptionalExpressionInspectorControlComponent, SelectFormControlComponent, TagsFormControlComponent } from '@helix/platform/shared/components';
import { RX_AVAILABLE_ON_DEVICES_PROP_NAME, RX_DISABLED_PROP_NAME, RX_HIDDEN_PROP_NAME, RX_STYLES_PROP_NAME, RxDevice } from '@helix/platform/view/api';
import { validateCssClassName } from '../core';
export const RX_AVAILABLE_ON_DEVICES_OPTIONS = [
    {
        id: RxDevice.Desktop,
        name: 'Desktop'
    },
    {
        id: RxDevice.Tablet,
        name: 'Tablet'
    },
    {
        id: RxDevice.Mobile,
        name: 'Mobile'
    }
];
export function getAvailableOnDevicesInspectorConfig() {
    return {
        name: RX_AVAILABLE_ON_DEVICES_PROP_NAME,
        component: SelectFormControlComponent,
        options: {
            label: 'Available on devices',
            options: RX_AVAILABLE_ON_DEVICES_OPTIONS,
            multiple: true,
            required: true,
            hideSelectAllButton: true,
            hideDeselectAllButton: true
        }
    };
}
export function getHiddenFieldInspectorConfig() {
    return {
        name: RX_HIDDEN_PROP_NAME,
        component: OptionalExpressionInspectorControlComponent,
        options: {
            label: 'Hidden'
        }
    };
}
export function getDisabledFieldInspectorConfig() {
    return {
        name: RX_DISABLED_PROP_NAME,
        component: OptionalExpressionInspectorControlComponent,
        options: {
            label: 'Disabled'
        }
    };
}
export function getStylesFieldInspectorConfig(autocompleteValues = []) {
    return {
        name: RX_STYLES_PROP_NAME,
        component: TagsFormControlComponent,
        options: {
            label: 'CSS classes',
            placeholder: 'Add CSS classes',
            tooltip: new Tooltip('Enter CSS class names to apply to this view component.'),
            errorCheck: validateCssClassName,
            autocompleteValues: autocompleteValues
        }
    };
}
export function getStandardPropsInspectorConfigs() {
    return [getHiddenFieldInspectorConfig(), getAvailableOnDevicesInspectorConfig(), getStylesFieldInspectorConfig()];
}
//# sourceMappingURL=standard-props-design.types.js.map