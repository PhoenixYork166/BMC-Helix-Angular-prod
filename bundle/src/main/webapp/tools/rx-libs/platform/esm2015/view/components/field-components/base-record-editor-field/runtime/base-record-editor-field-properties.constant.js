import { RX_AVAILABLE_ON_DEVICES_PROP_DESC, ViewComponentPropertyType } from '@helix/platform/view/api';
export const RX_BASE_FIELD_PROPERTIES = [
    'api',
    'disabled',
    'recordDefinition',
    'recordInstance',
    'hidden',
    'inReadState',
    'value'
].map((propertyName) => {
    const result = {
        name: propertyName,
        enableExpressionEvaluation: true
    };
    if (['hidden', 'disabled'].includes(propertyName)) {
        result.type = ViewComponentPropertyType.Boolean;
    }
    return result;
});
RX_BASE_FIELD_PROPERTIES.push({
    name: 'label',
    localizable: true
}, {
    name: 'fieldId'
}, RX_AVAILABLE_ON_DEVICES_PROP_DESC);
//# sourceMappingURL=base-record-editor-field-properties.constant.js.map