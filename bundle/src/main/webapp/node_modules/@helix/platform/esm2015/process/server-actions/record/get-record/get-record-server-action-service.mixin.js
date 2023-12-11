export function RxGetRecordServerActionServiceMixin(Base) {
    return class RxGetRecordServerActionService extends Base {
        constructor(...args) {
            super(...args);
        }
        getDefinitionInputMapParam(inputParamName, inputParamValue) {
            return super.getRecordDefinitionInputMapParam(inputParamName, inputParamValue);
        }
        // TODO-VS: update definition type to use "IServiceTaskDefinition | ICustomRuleAction"
        getInputMapFromDefinition(definition) {
            return super.getRecordInputMapModel(definition);
        }
    };
}
//# sourceMappingURL=get-record-server-action-service.mixin.js.map