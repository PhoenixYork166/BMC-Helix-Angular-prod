const baseGuidPattern = '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
const idPrefix = 'rx-';
export const RX_GUID = {
    baseGuidPattern,
    baseIdPattern: idPrefix + baseGuidPattern,
    idPrefix
};
//# sourceMappingURL=guid.constant.js.map