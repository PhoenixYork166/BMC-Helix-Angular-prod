import { reduce } from 'lodash';
import { RX_RECORD_SERVER_ACTION } from './record-server-action.constant';
export function RxRecordServerActionServiceMixin(Base) {
    return class RxRecordServerActionService extends Base {
        constructor(...args) {
            super(...args);
        }
        getRecordDefinitionInputMapParam(inputParamName, inputParamValue) {
            if (inputParamName === 'recordDefinitionName') {
                if (inputParamValue.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                    return {
                        assignTarget: inputParamName,
                        expression: inputParamValue
                    };
                }
                else {
                    return {
                        assignTarget: inputParamName,
                        expression: '"' + inputParamValue + '"'
                    };
                }
            }
            else if (inputParamName === 'sampleRecordDefinitionName') {
                return {
                    assignTarget: inputParamName,
                    expression: '"' + inputParamValue + '"'
                };
            }
            else {
                return super.getDefinitionInputMapParam(inputParamName, inputParamValue);
            }
        }
        getRecordDefinitionNameFromInputMap(inputMap) {
            let recordDefinitionNameFromInputMap = null;
            if (inputMap.recordDefinitionName) {
                if (inputMap.recordDefinitionName.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                    if (inputMap.sampleRecordDefinitionName) {
                        recordDefinitionNameFromInputMap = inputMap.sampleRecordDefinitionName;
                    }
                }
                else {
                    recordDefinitionNameFromInputMap = inputMap.recordDefinitionName;
                }
            }
            return recordDefinitionNameFromInputMap;
        }
        // TODO-VS: update definition type to use "IServiceTaskDefinition | ICustomRuleAction"
        getRecordInputMapModel(definition) {
            return reduce((definition === null || definition === void 0 ? void 0 : definition.inputMap) || [], (inputMap, inputMapField) => {
                const assignTarget = inputMapField.assignTarget;
                if (assignTarget === 'recordDefinitionName') {
                    if (inputMapField.expression.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                        inputMap[assignTarget] = inputMapField.expression;
                    }
                    else {
                        inputMap[assignTarget] = inputMapField.expression.replace(/^"|"$/g, '');
                    }
                }
                else if (assignTarget === 'sampleRecordDefinitionName') {
                    inputMap[assignTarget] = inputMapField.expression.replace(/^"|"$/g, '');
                }
                else {
                    inputMap[assignTarget] = inputMapField.expression;
                }
                return inputMap;
            }, {
                recordDefinitionName: null,
                sampleRecordDefinitionName: null,
                recordID: null
            });
        }
    };
}
//# sourceMappingURL=record-server-action-service.mixin.js.map