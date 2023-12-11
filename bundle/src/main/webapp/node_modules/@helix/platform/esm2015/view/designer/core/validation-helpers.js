import { isObject } from 'lodash';
import { RX_AVAILABLE_ON_DEVICES_PROP_NAME, RX_STYLES_PROP_NAME } from '@helix/platform/view/api';
export function validateCssClassName(tag) {
    return !/^[a-z][-\w]+$/gi.test(isObject(tag) ? tag.data.value : tag);
}
export function validateCssClassNames(styles) {
    const validationIssues = [];
    if (styles) {
        const tags = styles.split(' ');
        if (tags.some(validateCssClassName)) {
            validationIssues.push({
                type: 'error',
                propertyName: 'styles',
                description: 'CSS class name is invalid.'
            });
        }
    }
    return validationIssues;
}
export function validateAvailableOnDevicesProp(value) {
    const validationIssues = [];
    if (!(value === null || value === void 0 ? void 0 : value.length)) {
        validationIssues.push({
            type: 'error',
            propertyName: RX_AVAILABLE_ON_DEVICES_PROP_NAME,
            description: 'At least one device must be selected.'
        });
    }
    return validationIssues;
}
export function validateStandardProps(model) {
    return [
        ...validateCssClassNames(model[RX_STYLES_PROP_NAME]),
        ...validateAvailableOnDevicesProp(model[RX_AVAILABLE_ON_DEVICES_PROP_NAME])
    ];
}
//# sourceMappingURL=validation-helpers.js.map